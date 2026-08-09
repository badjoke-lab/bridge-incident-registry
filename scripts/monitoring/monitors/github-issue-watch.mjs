import crypto from "node:crypto";

function labelsOf(issue) {
  return (issue.labels ?? []).map((label) => typeof label === "string" ? label : label?.name).filter(Boolean).sort();
}

function normalize(value) {
  return String(value ?? "").replace(/\r\n/g, "\n").trim();
}

function issueState(issue) {
  return normalize(issue.state).toLowerCase() === "closed" ? "closed" : "open";
}

function isMonitoringIssue(issue) {
  const haystack = `${issue.title ?? ""}\n${issue.body ?? ""}`.toLowerCase();
  return haystack.includes("monitoring signal") ||
    haystack.includes("needs evidence") ||
    haystack.includes("review for canonical") ||
    /^review\b/i.test(issue.title ?? "");
}

function openFingerprint(issue) {
  const payload = JSON.stringify({
    title: normalize(issue.title),
    body: normalize(issue.body),
    labels: labelsOf(issue)
  });
  return crypto.createHash("sha256").update(payload).digest("hex");
}

function closedFingerprint(issue) {
  return `closed:${openFingerprint(issue)}`;
}

function canonicalName(issue) {
  return normalize(issue.title).replace(/^review\s+/i, "").replace(/\s+20\d{2}.*$/i, "").trim() || `Issue #${issue.number}`;
}

function openFinding(issue, fp, key) {
  return {
    finding_id: `issue_${issue.number}_${fp.slice(0, 10)}`,
    monitor: "github-issue-watch",
    severity: "medium",
    category: "review_signal",
    title: normalize(issue.title),
    summary: normalize(issue.body).slice(0, 800),
    source_urls: [issue.url].filter(Boolean),
    confidence: "medium",
    dedupe_key: key
  };
}

function openCandidate(issue) {
  return {
    candidate_id: `github_issue_${issue.number}`,
    canonical_name: canonicalName(issue),
    aliases: [],
    candidate_class: "B",
    likely_type: "unknown",
    likely_status: "unknown",
    likely_incident_type: "unknown",
    record_shape: "hold",
    headline: normalize(issue.title),
    bir_relevance: "Repository issue is explicitly marked for monitoring/review and requires evidence review before canonical inclusion.",
    duplicate_check: {
      matched_existing_record: null,
      method: "not-run-in-foundation"
    },
    source_urls: [issue.url].filter(Boolean),
    source_quality: "review_required",
    next_action: "review_for_canonical_boundary"
  };
}

function resolvedFinding(issue, key) {
  return {
    finding_id: `issue_${issue.number}_resolved`,
    monitor: "github-issue-watch",
    severity: "low",
    category: "review_signal_resolved",
    title: `Issue #${issue.number} monitoring signal closed`,
    summary: "A previously observed repository monitoring/review issue is now closed. The monitoring state is marked resolved; canonical data is unchanged. Reopening the issue rearms the review signal.",
    source_urls: [issue.url].filter(Boolean),
    confidence: "high",
    recommended_action: "retain_resolved_monitoring_state_until_reopened_or_replaced",
    dedupe_key: key
  };
}

export function watchGithubIssues(issues, state, applySignal, observedAt) {
  const findings = [];
  const candidates = [];

  for (const issue of issues) {
    if (!isMonitoringIssue(issue)) continue;
    const key = `github-issue:${issue.number}`;
    const status = issueState(issue);
    const previous = state.signals[key];

    if (status === "closed") {
      // Do not create historical noise for closed monitoring issues that were never observed while open.
      if (!previous) continue;
      const fp = closedFingerprint(issue);
      const signal = applySignal(state, { key, fingerprint: fp, observedAt });
      if (!signal.changed) continue;
      findings.push(resolvedFinding(issue, key));
      continue;
    }

    // Open fingerprints intentionally preserve the original pre-lifecycle format so existing
    // live state such as Issue #171 does not re-emit during this migration.
    const fp = openFingerprint(issue);
    const signal = applySignal(state, { key, fingerprint: fp, observedAt });
    if (!signal.changed) continue;

    findings.push(openFinding(issue, fp, key));
    candidates.push(openCandidate(issue));
  }

  return { findings, candidates };
}
