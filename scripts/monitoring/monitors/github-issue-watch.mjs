import crypto from "node:crypto";

function labelsOf(issue) {
  return (issue.labels ?? []).map((label) => typeof label === "string" ? label : label?.name).filter(Boolean).sort();
}

function normalize(value) {
  return String(value ?? "").replace(/\r\n/g, "\n").trim();
}

function isMonitoringIssue(issue) {
  const haystack = `${issue.title ?? ""}\n${issue.body ?? ""}`.toLowerCase();
  return haystack.includes("monitoring signal") ||
    haystack.includes("needs evidence") ||
    haystack.includes("review for canonical") ||
    /^review\b/i.test(issue.title ?? "");
}

function fingerprint(issue) {
  const payload = JSON.stringify({
    title: normalize(issue.title),
    body: normalize(issue.body),
    labels: labelsOf(issue)
  });
  return crypto.createHash("sha256").update(payload).digest("hex");
}

export function watchGithubIssues(issues, state, applySignal, observedAt) {
  const findings = [];
  const candidates = [];

  for (const issue of issues) {
    if (!isMonitoringIssue(issue)) continue;
    const key = `github-issue:${issue.number}`;
    const fp = fingerprint(issue);
    const signal = applySignal(state, { key, fingerprint: fp, observedAt });
    if (!signal.changed) continue;

    const canonicalName = normalize(issue.title).replace(/^review\s+/i, "").replace(/\s+20\d{2}.*$/i, "").trim() || `Issue #${issue.number}`;
    const finding = {
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

    const candidate = {
      candidate_id: `github_issue_${issue.number}`,
      canonical_name: canonicalName,
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

    findings.push(finding);
    candidates.push(candidate);
  }

  return { findings, candidates };
}
