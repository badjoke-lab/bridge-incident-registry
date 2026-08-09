import fs from "node:fs";
import path from "node:path";
import { OUTPUT_ROOT, WATCHLIST_ROOT } from "../config.mjs";

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function writeMonitoringOutputs({ dateKey, runId, observedAt, findings, candidates, health, monitorReports = {} }) {
  const runDir = path.join(OUTPUT_ROOT, dateKey, runId);
  const watchlistPath = path.join(WATCHLIST_ROOT, `recent-candidates-${dateKey}-${runId}.json`);
  fs.mkdirSync(runDir, { recursive: true });

  const manifest = {
    version: 1,
    run_id: runId,
    observed_at: observedAt,
    findings_count: findings.length,
    candidate_count: candidates.length,
    monitors: Object.keys(monitorReports).sort(),
    canonical_counts: health.counts,
    unknown_url_status: health.unknown_url_status,
    reference_errors: health.reference_errors.length
  };

  writeJson(path.join(runDir, "manifest.json"), manifest);
  for (const [name, report] of Object.entries(monitorReports)) {
    writeJson(path.join(runDir, `${name}.json`), report);
  }
  writeJson(watchlistPath, { run_id: runId, observed_at: observedAt, candidates });

  const lines = [
    `# BIR Auto Monitoring Report — ${dateKey}`,
    "",
    `Run: \`${runId}\``,
    "",
    "## Canonical guard",
    "",
    `- Bridges: ${health.counts.bridges}`,
    `- Incidents: ${health.counts.incidents}`,
    `- Events: ${health.counts.events}`,
    `- Evidence: ${health.counts.evidence}`,
    `- Unknown URL status: ${health.unknown_url_status}`,
    `- Reference errors: ${health.reference_errors.length}`,
    "",
    "## New or changed findings",
    ""
  ];

  if (findings.length === 0) lines.push("None.");
  for (const finding of findings) {
    lines.push(`- **${finding.title}** — ${finding.severity} — ${finding.category}`);
    if (finding.summary) lines.push(`  - ${finding.summary}`);
    if (finding.source_urls?.length) lines.push(`  - ${finding.source_urls.join(" ")}`);
    if (finding.recommended_action) lines.push(`  - Next: ${finding.recommended_action}`);
  }

  lines.push("", "## Candidate watchlist", "");
  if (candidates.length === 0) lines.push("None.");
  for (const candidate of candidates) {
    lines.push(`- **${candidate.canonical_name}** — ${candidate.candidate_class} — ${candidate.headline}`);
    if (candidate.source_urls?.length) lines.push(`  - ${candidate.source_urls.join(" ")}`);
    lines.push(`  - Next: ${candidate.next_action}`);
  }

  lines.push("", "## Safety", "", "Monitoring output is review material only. No canonical record was changed or published automatically.", "");
  fs.writeFileSync(path.join(runDir, "summary.md"), `${lines.join("\n")}\n`);

  return { runDir, watchlistPath, manifest };
}
