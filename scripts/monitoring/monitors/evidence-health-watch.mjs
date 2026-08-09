const HARD_FAILURE_STATUS = new Set([404, 410]);
const BLOCKED_STATUS = new Set([401, 403, 405, 429]);

function classifyProbe(result) {
  if (result.ok || (result.status >= 200 && result.status < 400)) return "healthy";
  if (HARD_FAILURE_STATUS.has(result.status)) return "hard_failure";
  if (BLOCKED_STATUS.has(result.status)) return "blocked";
  return "soft_failure";
}

function severityFor(source) {
  return source.is_primary === true || source.source_tier === "tier_1" ? "high" : "medium";
}

function monitoringBatch(evidence, observedAt, limit) {
  const live = evidence
    .filter((source) => source.url_status === "live" && /^https?:\/\//i.test(source.url ?? ""))
    .sort((a, b) => a.id.localeCompare(b.id));
  if (live.length === 0 || limit <= 0) return [];
  if (limit >= live.length) return live;

  const week = Math.floor(Date.parse(observedAt) / (7 * 24 * 60 * 60 * 1000));
  const chunks = Math.ceil(live.length / limit);
  const chunk = ((week % chunks) + chunks) % chunks;
  const start = chunk * limit;
  return live.slice(start, Math.min(start + limit, live.length));
}

export async function defaultHttpProbe(url, { timeoutMs = 6000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "BIR-Evidence-Health/1.0 (+https://github.com/badjoke-lab/bridge-incident-registry)",
        accept: "text/html,application/json,text/plain;q=0.8,*/*;q=0.5",
        range: "bytes=0-1023"
      }
    });
    const result = {
      ok: response.ok,
      status: response.status,
      final_url: response.url || url,
      error: null
    };
    try {
      await response.body?.cancel();
    } catch {
      // Response headers are sufficient for this health probe.
    }
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

export async function watchEvidenceHealth({
  evidence,
  state,
  applySignal,
  observedAt,
  limit = 12,
  probe = defaultHttpProbe
}) {
  const selected = monitoringBatch(evidence, observedAt, limit);
  const findings = [];
  const probes = [];

  for (const source of selected) {
    const first = await probe(source.url, { source, pass: 1 });
    const second = await probe(source.url, { source, pass: 2 });
    const firstClass = classifyProbe(first);
    const secondClass = classifyProbe(second);
    const key = `evidence-health:${source.id}`;
    const previous = state.signals[key];

    probes.push({
      evidence_id: source.id,
      url: source.url,
      first,
      second,
      classification: firstClass === secondClass ? firstClass : "mixed"
    });

    if (firstClass === "hard_failure" && secondClass === "hard_failure") {
      const fingerprint = `failure:${source.url}:${first.status}:${second.status}`;
      const signal = applySignal(state, { key, fingerprint, observedAt });
      if (!signal.changed) continue;
      findings.push({
        finding_id: `evidence_${source.id}_hard_failure`,
        monitor: "evidence-health-watch",
        severity: severityFor(source),
        category: "evidence_hard_failure",
        title: `${source.id} returned ${first.status}/${second.status}`,
        summary: `Canonical evidence URL failed two independent probes with terminal HTTP status codes. Review the source URL and archived fallback; do not change canonical evidence automatically.`,
        affected_evidence: {
          id: source.id,
          bridge_id: source.bridge_id ?? null,
          incident_id: source.incident_id ?? null,
          event_id: source.event_id ?? null,
          title: source.title,
          publisher: source.publisher,
          source_tier: source.source_tier,
          is_primary: source.is_primary,
          archived_url: source.archived_url ?? null
        },
        source_urls: [source.url],
        confidence: "high",
        recommended_action: "review_evidence_url_and_archive",
        dedupe_key: key
      });
      continue;
    }

    if (firstClass === "healthy" && secondClass === "healthy" && previous?.fingerprint?.startsWith("failure:")) {
      const fingerprint = `healthy:${source.url}`;
      const signal = applySignal(state, { key, fingerprint, observedAt });
      if (!signal.changed) continue;
      findings.push({
        finding_id: `evidence_${source.id}_recovered`,
        monitor: "evidence-health-watch",
        severity: "low",
        category: "evidence_recovered",
        title: `${source.id} is reachable again`,
        summary: `A previously recorded terminal evidence-link failure now passed two independent probes. Canonical data is unchanged; this finding only rearms future degradation detection.`,
        affected_evidence: {
          id: source.id,
          title: source.title,
          publisher: source.publisher
        },
        source_urls: [source.url],
        confidence: "high",
        recommended_action: "retain_current_canonical_source",
        dedupe_key: key
      });
    }
  }

  return {
    findings,
    probes,
    selected_count: selected.length,
    live_evidence_count: evidence.filter((source) => source.url_status === "live").length
  };
}
