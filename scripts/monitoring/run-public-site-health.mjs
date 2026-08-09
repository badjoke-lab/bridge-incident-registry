import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { canonicalFingerprints, assertCanonicalUnchanged, canonicalHealthSummary, loadCanonicalData } from "./core/canonical.mjs";
import { applySignal } from "./core/state.mjs";
import { watchPublicSiteHealth } from "./monitors/public-site-health-watch.mjs";

const STATE_PATH = "data-staging/monitoring/public-site-state.json";
const OUTPUT_ROOT = "data-staging/monitoring";

function arg(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function loadState() {
  if (!fs.existsSync(STATE_PATH)) return { version: 1, signals: {} };
  const parsed = JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  if (!parsed || parsed.version !== 1 || !parsed.signals || typeof parsed.signals !== "object") {
    throw new Error("public site monitoring state must be version 1 with a signals object");
  }
  return parsed;
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

const observedAt = arg("observed-at", new Date().toISOString());
const dateKey = arg("date", observedAt.slice(0, 10).replaceAll("-", ""));
const runId = arg("run-id", `site-${observedAt.replace(/[-:.TZ]/g, "").slice(0, 14)}`);
const resultPath = arg("result", ".monitor-output/public-site-result.json");
const publicConfig = JSON.parse(fs.readFileSync("config/public-data.json", "utf8"));
const origin = arg("origin", publicConfig.canonical_origin);

const before = canonicalFingerprints();
const canonical = loadCanonicalData();
const health = canonicalHealthSummary(canonical);
if (health.reference_errors.length > 0) throw new Error(`canonical reference errors detected: ${health.reference_errors.join("; ")}`);
if (health.unknown_url_status > 0) throw new Error(`canonical unknown URL statuses detected: ${health.unknown_url_status}`);

const state = loadState();
const siteResult = await watchPublicSiteHealth({
  origin,
  bridges: canonical.bridges,
  incidents: canonical.incidents,
  counts: health.counts,
  state,
  applySignal,
  observedAt
});

const hasChanges = siteResult.state_changed;
let outputs = null;
if (hasChanges) {
  writeJson(STATE_PATH, state);
  const runDir = path.join(OUTPUT_ROOT, dateKey, runId);
  writeJson(path.join(runDir, "public-site-health-watch.json"), siteResult);
  const manifest = {
    version: 1,
    run_id: runId,
    observed_at: observedAt,
    monitor: "public-site-health-watch",
    origin: siteResult.origin,
    target_count: siteResult.target_count,
    baseline_seeded_count: siteResult.baseline_seeded_count,
    findings_count: siteResult.findings.length,
    canonical_counts: health.counts,
    unknown_url_status: health.unknown_url_status,
    reference_errors: health.reference_errors.length
  };
  writeJson(path.join(runDir, "manifest.json"), manifest);
  const lines = [
    `# BIR Public Site Health — ${dateKey}`,
    "",
    `Run: \`${runId}\``,
    "",
    `- Origin: ${siteResult.origin}`,
    `- Targets probed twice: ${siteResult.target_count}`,
    `- Healthy baselines seeded: ${siteResult.baseline_seeded_count}`,
    `- Findings: ${siteResult.findings.length}`,
    `- Sampled bridge: ${siteResult.sampled_bridge_id ?? "none"}`,
    `- Sampled incident: ${siteResult.sampled_incident_id ?? "none"}`,
    "",
    "## Findings",
    ""
  ];
  if (siteResult.findings.length === 0) lines.push("None.");
  for (const finding of siteResult.findings) {
    lines.push(`- **${finding.title}** — ${finding.severity} — ${finding.category}`);
    lines.push(`  - ${finding.summary}`);
    if (finding.source_urls?.length) lines.push(`  - ${finding.source_urls.join(" ")}`);
  }
  lines.push("", "## Safety", "", "This is review-only production health state. Canonical records were not changed.", "");
  fs.writeFileSync(path.join(runDir, "summary.md"), `${lines.join("\n")}\n`);
  outputs = { run_dir: runDir, state_path: STATE_PATH };
}

const after = canonicalFingerprints();
assertCanonicalUnchanged(before, after);

const result = {
  version: 1,
  run_id: runId,
  observed_at: observedAt,
  has_changes: hasChanges,
  findings_count: siteResult.findings.length,
  public_site_health: {
    origin: siteResult.origin,
    target_count: siteResult.target_count,
    sampled_bridge_id: siteResult.sampled_bridge_id,
    sampled_incident_id: siteResult.sampled_incident_id,
    baseline_seeded_count: siteResult.baseline_seeded_count,
    finding_count: siteResult.findings.length,
    state_changed: siteResult.state_changed
  },
  canonical_counts: health.counts,
  outputs
};

fs.mkdirSync(path.dirname(resultPath), { recursive: true });
fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(result)}\n`);
