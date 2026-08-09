import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { canonicalFingerprints, assertCanonicalUnchanged, canonicalHealthSummary, loadCanonicalData } from "./core/canonical.mjs";
import { applySignal, loadState, writeState } from "./core/state.mjs";
import { writeMonitoringOutputs } from "./core/report.mjs";
import { watchGithubIssues } from "./monitors/github-issue-watch.mjs";
import { watchEvidenceHealth } from "./monitors/evidence-health-watch.mjs";
import { watchExternalBridgeCandidates } from "./monitors/external-bridge-candidate-watch.mjs";

const DEFAULT_EXTERNAL_BRIDGE_SOURCE_URL = "https://raw.githubusercontent.com/DefiLlama/bridges-server/master/src/data/bridgeNetworkData.ts";

function arg(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function flag(name) {
  return process.argv.includes(`--${name}`);
}

function readIssues(file) {
  if (!file) return [];
  if (!fs.existsSync(file)) throw new Error(`issue input not found: ${file}`);
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(parsed)) throw new Error("GitHub issue input must be an array");
  return parsed;
}

function readTextInput(file, label) {
  if (!file) return null;
  if (!fs.existsSync(file)) throw new Error(`${label} input not found: ${file}`);
  const text = fs.readFileSync(file, "utf8");
  if (!text.trim()) throw new Error(`${label} input is empty: ${file}`);
  return text;
}

const observedAt = arg("observed-at", new Date().toISOString());
const dateKey = arg("date", observedAt.slice(0, 10).replaceAll("-", ""));
const runId = arg("run-id", `run-${observedAt.replace(/[-:.TZ]/g, "").slice(0, 14)}`);
const issuesPath = arg("issues");
const resultPath = arg("result", ".monitor-output/result.json");
const evidenceHealthEnabled = flag("evidence-health");
const evidenceProbeLimit = Number.parseInt(arg("evidence-probe-limit", "12"), 10);
const externalBridgeSourcePath = arg("external-bridge-source");
const externalBridgeSourceUrl = arg("external-bridge-source-url", DEFAULT_EXTERNAL_BRIDGE_SOURCE_URL);
const externalCandidateLimit = Number.parseInt(arg("external-candidate-limit", "8"), 10);

if (!Number.isInteger(evidenceProbeLimit) || evidenceProbeLimit < 0 || evidenceProbeLimit > 50) {
  throw new Error(`invalid evidence probe limit: ${evidenceProbeLimit}`);
}
if (!Number.isInteger(externalCandidateLimit) || externalCandidateLimit < 0 || externalCandidateLimit > 50) {
  throw new Error(`invalid external candidate limit: ${externalCandidateLimit}`);
}

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
const evidenceResult = evidenceHealthEnabled
  ? await watchEvidenceHealth({ evidence: canonical.evidence, state, applySignal, observedAt, limit: evidenceProbeLimit })
  : { findings: [], probes: [], selected_count: 0, live_evidence_count: canonical.evidence.filter((source) => source.url_status === "live").length };

const externalSourceText = readTextInput(externalBridgeSourcePath, "external bridge registry");
const externalBridgeResult = externalSourceText
  ? watchExternalBridgeCandidates({
      sourceText: externalSourceText,
      sourceUrl: externalBridgeSourceUrl,
      canonicalBridges: canonical.bridges,
      state,
      applySignal,
      observedAt,
      limit: externalCandidateLimit
    })
  : {
      source: null,
      baseline_initialized: false,
      state_changed: false,
      parsed_count: 0,
      matched_existing_count: 0,
      baseline_seeded_count: 0,
      unchanged_count: 0,
      deferred_changed_count: 0,
      emitted_count: 0,
      candidates: []
    };

const findings = [...issueResult.findings, ...evidenceResult.findings];
const candidates = [...issueResult.candidates, ...externalBridgeResult.candidates];
const reviewSignalsChanged = findings.length > 0 || candidates.length > 0;
const stateChanged = reviewSignalsChanged || externalBridgeResult.state_changed;
const hasChanges = stateChanged;
let outputs = null;

if (hasChanges) {
  writeState(state);
  outputs = writeMonitoringOutputs({
    dateKey,
    runId,
    observedAt,
    findings,
    candidates,
    health,
    monitorReports: {
      "github-issue-watch": issueResult,
      "evidence-health-watch": evidenceResult,
      ...(externalSourceText ? { "external-bridge-candidate-watch": externalBridgeResult } : {})
    }
  });
}

const after = canonicalFingerprints();
assertCanonicalUnchanged(before, after);

const result = {
  version: 1,
  run_id: runId,
  observed_at: observedAt,
  has_changes: hasChanges,
  review_signals_changed: reviewSignalsChanged,
  state_changed: stateChanged,
  findings_count: findings.length,
  candidate_count: candidates.length,
  evidence_health: {
    enabled: evidenceHealthEnabled,
    selected_count: evidenceResult.selected_count,
    live_evidence_count: evidenceResult.live_evidence_count,
    finding_count: evidenceResult.findings.length
  },
  external_candidate_discovery: {
    enabled: Boolean(externalSourceText),
    baseline_initialized: externalBridgeResult.baseline_initialized,
    state_changed: externalBridgeResult.state_changed,
    parsed_count: externalBridgeResult.parsed_count,
    matched_existing_count: externalBridgeResult.matched_existing_count,
    baseline_seeded_count: externalBridgeResult.baseline_seeded_count,
    unchanged_count: externalBridgeResult.unchanged_count,
    deferred_changed_count: externalBridgeResult.deferred_changed_count,
    emitted_count: externalBridgeResult.emitted_count,
    source: externalBridgeResult.source
  },
  canonical_counts: health.counts,
  outputs
};

fs.mkdirSync(path.dirname(resultPath), { recursive: true });
fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(result)}\n`);
