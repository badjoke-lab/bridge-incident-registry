const HARD_FAILURE_STATUS = new Set([404, 410]);
const BLOCKED_STATUS = new Set([401, 403, 405, 429]);
const ELIGIBLE_STATUS = new Set(["active", "limited", "paused"]);

function safeHttpUrl(value) {
  try {
    const url = new URL(String(value ?? ""));
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function hostname(value) {
  const normalized = safeHttpUrl(value);
  if (!normalized) return null;
  return new URL(normalized).hostname.toLowerCase().replace(/^www\./, "");
}

function classifyProbe(result) {
  if (result.ok || (result.status >= 200 && result.status < 400)) return "healthy";
  if (HARD_FAILURE_STATUS.has(result.status)) return "hard_failure";
  if (BLOCKED_STATUS.has(result.status)) return "blocked";
  return "soft_failure";
}

function eligibleBridges(bridges) {
  return bridges
    .filter((bridge) => ELIGIBLE_STATUS.has(bridge.status) && safeHttpUrl(bridge.official_url))
    .sort((a, b) => a.id.localeCompare(b.id));
}

function monitoringBatch(bridges, observedAt, limit) {
  const eligible = eligibleBridges(bridges);
  if (eligible.length === 0 || limit <= 0) return [];
  if (limit >= eligible.length) return eligible;
  const week = Math.floor(Date.parse(observedAt) / (7 * 24 * 60 * 60 * 1000));
  const chunks = Math.ceil(eligible.length / limit);
  const chunk = ((week % chunks) + chunks) % chunks;
  const start = chunk * limit;
  return eligible.slice(start, Math.min(start + limit, eligible.length));
}

export async function defaultBridgeDomainProbe(url, { timeoutMs = 7000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "BIR-Bridge-Domain-Watch/1.0 (+https://github.com/badjoke-lab/bridge-incident-registry)",
        accept: "text/html,application/json,text/plain;q=0.8,*/*;q=0.5",
        range: "bytes=0-1023"
      }
    });
    const result = { ok: response.ok, status: response.status, final_url: response.url || url, error: null };
    try { await response.body?.cancel(); } catch { /* headers are sufficient */ }
    return result;
  } catch (error) {
    return {
      ok: false,
      status: 0,
      final_url: url,
      error: error?.name === "AbortError" ? "timeout" : String(error?.message ?? error)
    };
  } finally {
    clearTimeout(timer);
  }
}

function healthyFingerprint(bridge, finalHost) {
  return `healthy:${hostname(bridge.official_url) ?? "unknown"}->${finalHost ?? "unknown"}`;
}

function previousHealthyFinalHost(previous) {
  const fingerprint = previous?.fingerprint ?? "";
  if (!fingerprint.startsWith("healthy:")) return null;
  const marker = fingerprint.indexOf("->");
  return marker >= 0 ? fingerprint.slice(marker + 2) : null;
}

export async function watchActiveBridgeDomains({
  bridges,
  state,
  applySignal,
  observedAt,
  limit = 8,
  probe = defaultBridgeDomainProbe
}) {
  if (!Number.isInteger(limit) || limit < 0 || limit > 50) throw new Error(`invalid active bridge domain probe limit: ${limit}`);
  const eligible = eligibleBridges(bridges);
  const selected = monitoringBatch(bridges, observedAt, limit);
  const findings = [];
  const probes = [];
  let baselineSeeded = 0;
  let stateChanged = false;

  for (const bridge of selected) {
    const first = await probe(bridge.official_url, { bridge, pass: 1 });
    const second = await probe(bridge.official_url, { bridge, pass: 2 });
    const firstClass = classifyProbe(first);
    const secondClass = classifyProbe(second);
    const classification = firstClass === secondClass ? firstClass : "mixed";
    const key = `bridge-domain:${bridge.id}`;
    const previous = state.signals[key];
    const expectedHost = String(bridge.official_domain ?? hostname(bridge.official_url) ?? "").toLowerCase().replace(/^www\./, "") || null;
    const firstHost = hostname(first.final_url);
    const secondHost = hostname(second.final_url);

    probes.push({
      bridge_id: bridge.id,
      canonical_name: bridge.canonical_name,
      status: bridge.status,
      official_url: bridge.official_url,
      official_domain: bridge.official_domain ?? null,
      first,
      second,
      classification,
      final_host_consistent: Boolean(firstHost && secondHost && firstHost === secondHost),
      observed_final_host: firstHost === secondHost ? firstHost : null
    });

    if (firstClass === "hard_failure" && secondClass === "hard_failure") {
      const fingerprint = `failure:${bridge.official_url}:${first.status}:${second.status}`;
      const signal = applySignal(state, { key, fingerprint, observedAt });
      stateChanged ||= signal.changed;
      if (!signal.changed) continue;
      findings.push({
        finding_id: `bridge_${bridge.id}_official_url_hard_failure`,
        monitor: "active-bridge-domain-watch",
        severity: "high",
        category: "bridge_official_url_hard_failure",
        title: `${bridge.canonical_name} official URL returned ${first.status}/${second.status}`,
        summary: "A non-terminal canonical bridge official URL failed two independent probes with terminal HTTP status codes. Review bridge status and the official URL; do not change canonical data automatically.",
        affected_bridge: { id: bridge.id, canonical_name: bridge.canonical_name, status: bridge.status, official_domain: bridge.official_domain ?? null },
        source_urls: [bridge.official_url],
        confidence: "high",
        recommended_action: "review_bridge_status_and_official_url",
        dedupe_key: key
      });
      continue;
    }

    if (firstClass !== "healthy" || secondClass !== "healthy" || !firstHost || firstHost !== secondHost) continue;

    const fingerprint = healthyFingerprint(bridge, firstHost);
    if (!previous) {
      const signal = applySignal(state, { key, fingerprint, observedAt });
      stateChanged ||= signal.changed;
      if (signal.changed) baselineSeeded += 1;
      if (expectedHost && firstHost !== expectedHost) {
        findings.push({
          finding_id: `bridge_${bridge.id}_official_domain_mismatch`,
          monitor: "active-bridge-domain-watch",
          severity: "medium",
          category: "bridge_official_domain_redirect_mismatch",
          title: `${bridge.canonical_name} resolves to ${firstHost}`,
          summary: `Two healthy probes consistently resolved the canonical official URL to a different host than the stored official_domain (${expectedHost}). Review whether this is an intentional migration or stale canonical metadata.`,
          affected_bridge: { id: bridge.id, canonical_name: bridge.canonical_name, status: bridge.status, official_domain: bridge.official_domain ?? null },
          source_urls: [bridge.official_url, first.final_url].filter((item, index, all) => item && all.indexOf(item) === index),
          confidence: "high",
          recommended_action: "review_official_domain_redirect",
          dedupe_key: key
        });
      }
      continue;
    }

    if (previous.fingerprint?.startsWith("failure:")) {
      const signal = applySignal(state, { key, fingerprint, observedAt });
      stateChanged ||= signal.changed;
      if (!signal.changed) continue;
      findings.push({
        finding_id: `bridge_${bridge.id}_official_url_recovered`,
        monitor: "active-bridge-domain-watch",
        severity: "low",
        category: "bridge_official_url_recovered",
        title: `${bridge.canonical_name} official URL is reachable again`,
        summary: "A previously recorded two-pass terminal failure now passed two healthy probes. Canonical data is unchanged; the recovery only rearms future status monitoring.",
        affected_bridge: { id: bridge.id, canonical_name: bridge.canonical_name, status: bridge.status },
        source_urls: [bridge.official_url],
        confidence: "high",
        recommended_action: "retain_or_recheck_current_bridge_status",
        dedupe_key: key
      });
      continue;
    }

    const previousHost = previousHealthyFinalHost(previous);
    if (previousHost && previousHost !== firstHost) {
      const signal = applySignal(state, { key, fingerprint, observedAt });
      stateChanged ||= signal.changed;
      if (!signal.changed) continue;
      findings.push({
        finding_id: `bridge_${bridge.id}_official_domain_changed`,
        monitor: "active-bridge-domain-watch",
        severity: "medium",
        category: "bridge_official_domain_changed",
        title: `${bridge.canonical_name} final domain changed to ${firstHost}`,
        summary: `Two healthy probes now resolve to ${firstHost}, while the last accepted monitoring state resolved to ${previousHost}. Review for an intentional domain migration, redirect change, or stale canonical metadata.`,
        affected_bridge: { id: bridge.id, canonical_name: bridge.canonical_name, status: bridge.status, previous_final_domain: previousHost, observed_final_domain: firstHost },
        source_urls: [bridge.official_url, first.final_url].filter((item, index, all) => item && all.indexOf(item) === index),
        confidence: "high",
        recommended_action: "review_official_domain_change",
        dedupe_key: key
      });
    }
  }

  return {
    findings,
    probes,
    eligible_count: eligible.length,
    selected_count: selected.length,
    baseline_seeded_count: baselineSeeded,
    state_changed: stateChanged
  };
}
