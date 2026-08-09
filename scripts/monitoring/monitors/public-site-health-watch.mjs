const HARD_FAILURE_STATUS = new Set([404, 410]);
const BLOCKED_STATUS = new Set([401, 403, 405, 429]);

function safeOrigin(value) {
  const url = new URL(String(value ?? ""));
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error(`invalid public site origin: ${value}`);
  return url.toString().replace(/\/$/, "");
}

function absolute(origin, route) {
  return new URL(route.replace(/^\//, ""), `${origin}/`).toString();
}

function classifyHttp(result) {
  if (result.ok || (result.status >= 200 && result.status < 300)) return "healthy";
  if (HARD_FAILURE_STATUS.has(result.status)) return "hard_failure";
  if (BLOCKED_STATUS.has(result.status)) return "blocked";
  return "soft_failure";
}

function extract(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

function validateHtml({ route, text, origin }) {
  const errors = [];
  const expectedCanonical = absolute(origin, route);
  const title = extract(text, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = extract(text, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    ?? extract(text, /<meta\b[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
  const canonical = extract(text, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (!title) errors.push("missing_title");
  if (!description) errors.push("missing_description");
  if (canonical !== expectedCanonical) errors.push("canonical_mismatch");
  if (!/name=["']robots["'][^>]*content=["']index,\s*follow["']/i.test(text)) errors.push("robots_meta_mismatch");
  if (!text.includes(`${origin}/data/manifest.json`)) errors.push("manifest_discovery_missing");
  if (!text.includes(`${origin}/version.json`)) errors.push("version_discovery_missing");
  return errors;
}

function validateRobots({ text, origin }) {
  const errors = [];
  if (!/(?:^|\n)Allow:\s*\/(?:\s|$)/i.test(text)) errors.push("allow_root_missing");
  if (!text.includes(`Sitemap: ${origin}/sitemap.xml`)) errors.push("sitemap_directive_mismatch");
  return errors;
}

function validateSitemap({ text, origin, expectedCount, sampledRoutes }) {
  const errors = [];
  const urls = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (urls.length !== expectedCount) errors.push("sitemap_count_mismatch");
  for (const route of ["/", "/bridges/", "/incidents/", "/methodology/", "/about/", ...sampledRoutes]) {
    if (!urls.includes(absolute(origin, route))) errors.push(`sitemap_missing:${route}`);
  }
  return errors;
}

function validateVersion({ text, origin, counts }) {
  const errors = [];
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return ["version_invalid_json"];
  }
  if (parsed?.canonical_only !== true) errors.push("version_canonical_only_mismatch");
  if (parsed?.canonical_origin !== origin) errors.push("version_origin_mismatch");
  for (const key of ["bridges", "incidents", "events", "evidence"]) {
    if (parsed?.record_counts?.[key] !== counts[key]) errors.push(`version_count_mismatch:${key}`);
  }
  return errors;
}

function validationErrors(target, response, context) {
  if (response.status < 200 || response.status >= 300) return [];
  if (target.kind === "html") return validateHtml({ route: target.route, text: response.text, origin: context.origin });
  if (target.kind === "robots") return validateRobots({ text: response.text, origin: context.origin });
  if (target.kind === "sitemap") return validateSitemap({ text: response.text, origin: context.origin, expectedCount: context.expectedSitemapCount, sampledRoutes: context.sampledRoutes });
  if (target.kind === "version") return validateVersion({ text: response.text, origin: context.origin, counts: context.counts });
  return ["unknown_target_kind"];
}

function signature(errors) {
  return [...new Set(errors)].sort().join("|");
}

function selectSample(records, observedAt) {
  if (records.length === 0) return null;
  const week = Math.floor(Date.parse(observedAt) / (7 * 24 * 60 * 60 * 1000));
  const index = ((week % records.length) + records.length) % records.length;
  return records[index];
}

function targetsFor({ bridges, incidents, observedAt }) {
  const bridge = selectSample([...bridges].sort((a, b) => a.id.localeCompare(b.id)), observedAt);
  const incident = selectSample([...incidents].sort((a, b) => a.id.localeCompare(b.id)), observedAt);
  const targets = [
    { id: "home", route: "/", kind: "html", severity: "medium" },
    { id: "robots", route: "/robots.txt", kind: "robots", severity: "medium" },
    { id: "sitemap", route: "/sitemap.xml", kind: "sitemap", severity: "medium" },
    { id: "version", route: "/version.json", kind: "version", severity: "high" }
  ];
  if (bridge) targets.push({ id: `bridge:${bridge.id}`, route: `/bridge/${bridge.slug}/`, kind: "html", severity: "medium", record_id: bridge.id });
  if (incident) targets.push({ id: `incident:${incident.id}`, route: `/incident/${incident.slug}/`, kind: "html", severity: "medium", record_id: incident.id });
  return targets;
}

export async function defaultPublicSiteProbe(url, { timeoutMs = 8000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "BIR-Public-Site-Health/1.0 (+https://github.com/badjoke-lab/bridge-incident-registry)",
        accept: "text/html,application/json,application/xml,text/xml,text/plain;q=0.9,*/*;q=0.5",
        "cache-control": "no-cache"
      }
    });
    const text = await response.text();
    return { ok: response.ok, status: response.status, final_url: response.url || url, text, error: null };
  } catch (error) {
    return { ok: false, status: 0, final_url: url, text: "", error: error?.name === "AbortError" ? "timeout" : String(error?.message ?? error) };
  } finally {
    clearTimeout(timer);
  }
}

export async function watchPublicSiteHealth({
  origin,
  bridges,
  incidents,
  counts,
  state,
  applySignal,
  observedAt,
  probe = defaultPublicSiteProbe
}) {
  const normalizedOrigin = safeOrigin(origin);
  const targets = targetsFor({ bridges, incidents, observedAt });
  const sampledRoutes = targets.filter((target) => target.record_id).map((target) => target.route);
  const context = {
    origin: normalizedOrigin,
    counts,
    expectedSitemapCount: 5 + bridges.length + incidents.length,
    sampledRoutes
  };
  const findings = [];
  const probes = [];
  let baselineSeeded = 0;
  let stateChanged = false;

  for (const target of targets) {
    const url = absolute(normalizedOrigin, target.route);
    const first = await probe(url, { target, pass: 1 });
    const second = await probe(url, { target, pass: 2 });
    const firstClass = classifyHttp(first);
    const secondClass = classifyHttp(second);
    const firstErrors = validationErrors(target, first, context);
    const secondErrors = validationErrors(target, second, context);
    const firstSignature = signature(firstErrors);
    const secondSignature = signature(secondErrors);
    const key = `public-site-health:${target.id}`;
    const previous = state.signals[key];

    probes.push({
      target_id: target.id,
      route: target.route,
      kind: target.kind,
      first: { ok: first.ok, status: first.status, final_url: first.final_url, error: first.error, validation_errors: firstErrors },
      second: { ok: second.ok, status: second.status, final_url: second.final_url, error: second.error, validation_errors: secondErrors }
    });

    let failureFingerprint = null;
    let category = null;
    let title = null;
    let summary = null;

    if (firstClass === "hard_failure" && secondClass === "hard_failure") {
      failureFingerprint = `http-failure:${first.status}:${second.status}`;
      category = "public_site_hard_failure";
      title = `${target.route} returned ${first.status}/${second.status}`;
      summary = "A production public route returned terminal HTTP status codes on two independent probes. Review deployment and routing; canonical data is unchanged.";
    } else if (firstClass === "healthy" && secondClass === "healthy" && firstSignature && firstSignature === secondSignature) {
      failureFingerprint = `content-failure:${firstSignature}`;
      category = target.kind === "version" ? "public_machine_contract_regression" : "public_site_metadata_regression";
      title = `${target.route} failed repeated public contract checks`;
      summary = `Two independent healthy HTTP responses produced the same validation failures: ${firstSignature}. Review production output before changing canonical data.`;
    }

    if (failureFingerprint) {
      const signal = applySignal(state, { key, fingerprint: failureFingerprint, observedAt });
      stateChanged ||= signal.changed;
      if (!signal.changed) continue;
      findings.push({
        finding_id: `site_${target.id.replace(/[^a-z0-9]+/gi, "_")}_${category}`,
        monitor: "public-site-health-watch",
        severity: target.severity,
        category,
        title,
        summary,
        affected_route: { route: target.route, kind: target.kind, record_id: target.record_id ?? null },
        source_urls: [url],
        confidence: "high",
        recommended_action: "review_production_public_contract",
        dedupe_key: key
      });
      continue;
    }

    const fullyHealthy = firstClass === "healthy" && secondClass === "healthy" && firstErrors.length === 0 && secondErrors.length === 0;
    if (!fullyHealthy) continue;
    const healthyFingerprint = "healthy:v1";
    const signal = applySignal(state, { key, fingerprint: healthyFingerprint, observedAt });
    stateChanged ||= signal.changed;
    if (!previous && signal.changed) {
      baselineSeeded += 1;
      continue;
    }
    if (previous?.fingerprint?.startsWith("http-failure:") || previous?.fingerprint?.startsWith("content-failure:")) {
      if (!signal.changed) continue;
      findings.push({
        finding_id: `site_${target.id.replace(/[^a-z0-9]+/gi, "_")}_recovered`,
        monitor: "public-site-health-watch",
        severity: "low",
        category: "public_site_recovered",
        title: `${target.route} public contract recovered`,
        summary: "A previously recorded production route or content regression now passed two independent public-contract probes. Canonical data remains unchanged.",
        affected_route: { route: target.route, kind: target.kind, record_id: target.record_id ?? null },
        source_urls: [url],
        confidence: "high",
        recommended_action: "retain_current_public_contract_and_rearm",
        dedupe_key: key
      });
    }
  }

  return {
    findings,
    probes,
    origin: normalizedOrigin,
    target_count: targets.length,
    sampled_bridge_id: targets.find((target) => target.id.startsWith("bridge:"))?.record_id ?? null,
    sampled_incident_id: targets.find((target) => target.id.startsWith("incident:"))?.record_id ?? null,
    baseline_seeded_count: baselineSeeded,
    state_changed: stateChanged
  };
}
