import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { canonicalFingerprints, assertCanonicalUnchanged, canonicalHealthSummary, loadCanonicalData } from "./core/canonical.mjs";
import { applySignal, loadState, writeState } from "./core/state.mjs";
import { writeMonitoringOutputs } from "./core/report.mjs";
import { watchGithubIssues } from "./monitors/github-issue-watch.mjs";

function arg(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function readIssues(file) {
  if (!file) return [];
  if (!fs.existsSync(file)) throw new Error(`issue input not found: ${file}`);
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(parsed)) throw new Error("GitHub issue input must be an array");
  return parsed;
}

const observedAt = arg("observed-at", new Date().toISOString());
const dateKey = arg("date", observedAt.slice(0, 10).replaceAll("-", ""));
const runId = arg("run-id", `run-${observedAt.replace(/[-:.TZ]/g, "").slice(0, 14)}`);
const issuesPath = arg("issues");
const resultPath = arg("result", ".monitor-output/result.json");

const before = canonicalFingerprints();
const canonical = loadCanonicalData();
const health = canonicalHealthSummary(canonical);
if (health.reference_errors.length > 0) {
  throw new Error(`canonical reference errors detected: ${health.reference_errors.join("; ")}`);
}
if (health.unknown_url_status > 0) {
  throw new Error(`canonical unknown URL statuses detected: ${health.unknown_url_status}`);
}

const state = loadState();
const issues = readIssues(issuesPath);
const issueResult = watchGithubIssues(issues, state, applySignal, observedAt);
const findings = issueResult.findings;
const candidates = issueResult.candidates;
const hasChanges = findings.length > 0 || candidates.length > 0;
let outputs = null;

if (hasChanges) {
  writeState(state);
  outputs = writeMonitoringOutputs({ dateKey, runId, observedAt, findings, candidates, health, state });
}

const after = canonicalFingerprints();
assertCanonicalUnchanged(before, after);

const result = {
  version: 1,
  run_id: runId,
  observed_at: observedAt,
  has_changes: hasChanges,
  findings_count: findings.length,
  candidate_count: candidates.length,
  canonical_counts: health.counts,
  outputs
};

fs.mkdirSync(path.dirname(resultPath), { recursive: true });
fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(result)}\n`);
