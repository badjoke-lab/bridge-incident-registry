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
  for (const [name, report] of Object.entries(monitorReports)) writeJson(path.join(runDir, `${name}.json`), report);
  writeJson(watchlistPath, { run_id: runId, observed_at: observedAt, candidates });

  const domain = monitorReports["active-bridge-domain-watch"];
  const external = monitorReports["external-bridge-candidate-watch"];
  const hacks = monitorReports["defillama-hacks-page-watch"];
  const gdelt = monitorReports["gdelt-news-watch"];
  const rss = monitorReports["rss-status-news-watch"];
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
    `- Reference errors: ${health.reference_errors.length}`
  ];

  if (domain?.baseline_seeded_count > 0) {
    lines.push("", "## Monitoring state change", "", "Active bridge official-domain baseline advanced.", "",
      `- Eligible active/limited/paused bridges: ${domain.eligible_count}`,
      `- Bridges selected this run: ${domain.selected_count}`,
      `- Healthy domain baselines seeded: ${domain.baseline_seeded_count}`,
      `- Domain findings: ${domain.findings.length}`,
      "- Baseline state records observed final domains only; it does not modify canonical bridge metadata.");
  }

  if (external?.baseline_initialized) {
    lines.push("", "## Monitoring state change", "", "External bridge discovery baseline initialized.", "",
      `- External rows parsed: ${external.parsed_count}`,
      `- Existing canonical matches: ${external.matched_existing_count}`,
      `- Unmatched rows fingerprinted as baseline: ${external.baseline_seeded_count}`,
      `- Candidates emitted from baseline: ${external.emitted_count}`,
      "- Baseline registry presence is not treated as an incident candidate.");
  }

  if (hacks?.baseline_initialized) {
    lines.push("", "## Monitoring state change", "", "DefiLlama bridge-hack discovery baseline initialized.", "",
      `- Hacks rows parsed: ${hacks.parsed_count}`,
      `- Bridge-relevant rows fingerprinted: ${hacks.baseline_seeded_count}`,
      `- Exact canonical bridge-name matches: ${hacks.exact_canonical_matches}`,
      `- Rows carrying the upstream bridge flag: ${hacks.bridge_flag_rows}`,
      `- Candidates emitted from baseline: ${hacks.emitted_count}`,
      "- Historical secondary-database rows are not treated as new BIR incidents.");
  }

  if (gdelt?.baseline_initialized) {
    lines.push("", "## Monitoring state change", "", "GDELT news discovery baseline initialized.", "",
      `- Security-family rows: ${gdelt.security_rows}`,
      `- Operations-family rows: ${gdelt.operations_rows}`,
      `- Unique article URLs fingerprinted: ${gdelt.baseline_seeded_count}`,
      `- Candidates emitted from baseline: ${gdelt.emitted_count}`,
      "- Baseline news coverage is not treated as an incident candidate.");
  }

  if (rss?.sources?.some((source) => source.baseline_initialized)) {
    lines.push("", "## Monitoring state change", "", "RSS status-news baselines initialized or advanced.", "",
      `- Feeds available: ${rss.source_count}`,
      `- Feed rows parsed: ${rss.parsed_count}`,
      `- Bridge + trigger rows: ${rss.relevant_count}`,
      `- Relevant rows fingerprinted as baseline: ${rss.baseline_seeded_count}`,
      `- Candidates emitted from baseline: ${rss.emitted_count}`,
      "- Publisher RSS items are secondary discovery material only; first-party review is still required.");
  }

  lines.push("", "## New or changed findings", "");
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
