import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { canonicalFingerprints, assertCanonicalUnchanged, canonicalHealthSummary, loadCanonicalData } from "./core/canonical.mjs";
import { applySignal, loadState, writeState } from "./core/state.mjs";
import { writeMonitoringOutputs } from "./core/report.mjs";
import { watchGithubIssues } from "./monitors/github-issue-watch.mjs";
import { watchEvidenceHealth } from "./monitors/evidence-health-watch.mjs";
import { watchActiveBridgeDomains } from "./monitors/active-bridge-domain-watch.mjs";
import { watchExternalBridgeCandidates } from "./monitors/external-bridge-candidate-watch.mjs";
import { watchDefillamaHacksPage } from "./monitors/defillama-hacks-page-watch.mjs";
import { watchGdeltNews } from "./monitors/gdelt-news-watch.mjs";
import { watchRssStatusNews } from "./monitors/rss-status-news-watch.mjs";

const DEFAULT_EXTERNAL_BRIDGE_SOURCE_URL = "https://raw.githubusercontent.com/DefiLlama/bridges-server/master/src/data/bridgeNetworkData.ts";
const DEFAULT_DEFILLAMA_HACKS_SOURCE_URL = "https://defillama.com/hacks";

function arg(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}
function flag(name) { return process.argv.includes(`--${name}`); }
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
  const value = fs.readFileSync(file, "utf8");
  if (!value.trim()) throw new Error(`${label} input is empty: ${file}`);
  return value;
}
function readRssFeedBundle(file) {
  if (!file) return [];
  if (!fs.existsSync(file)) throw new Error(`RSS status news input not found: ${file}`);
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(parsed)) throw new Error("RSS status news input must be an array");
  for (const [index, feed] of parsed.entries()) {
    if (!feed || typeof feed !== "object" || Array.isArray(feed)) throw new Error(`invalid RSS feed bundle row ${index}`);
    if (!String(feed.source_id ?? "").trim() || !String(feed.source_url ?? "").trim() || !String(feed.xml ?? "").trim()) {
      throw new Error(`RSS feed bundle row ${index} is missing source_id, source_url, or xml`);
    }
  }
  return parsed;
}

const observedAt = arg("observed-at", new Date().toISOString());
const dateKey = arg("date", observedAt.slice(0, 10).replaceAll("-", ""));
const runId = arg("run-id", `run-${observedAt.replace(/[-:.TZ]/g, "").slice(0, 14)}`);
const issuesPath = arg("issues");
const resultPath = arg("result", ".monitor-output/result.json");
const evidenceHealthEnabled = flag("evidence-health");
const evidenceProbeLimit = Number.parseInt(arg("evidence-probe-limit", "12"), 10);
const activeBridgeDomainEnabled = flag("active-bridge-domain-health");
const activeBridgeDomainLimit = Number.parseInt(arg("active-bridge-domain-probe-limit", "8"), 10);
const externalBridgeSourcePath = arg("external-bridge-source");
const externalBridgeSourceUrl = arg("external-bridge-source-url", DEFAULT_EXTERNAL_BRIDGE_SOURCE_URL);
const externalCandidateLimit = Number.parseInt(arg("external-candidate-limit", "8"), 10);
const defillamaHacksPagePath = arg("defillama-hacks-page-input");
const defillamaHacksSourceUrl = arg("defillama-hacks-source-url", DEFAULT_DEFILLAMA_HACKS_SOURCE_URL);
const defillamaHacksSourceKind = arg("defillama-hacks-source-kind", "public_page");
const defillamaHacksSourceSha256 = arg("defillama-hacks-source-sha256");
const defillamaHacksCandidateLimit = Number.parseInt(arg("defillama-hacks-candidate-limit", "8"), 10);
const gdeltSecurityPath = arg("gdelt-security-input");
const gdeltOperationsPath = arg("gdelt-operations-input");
const gdeltSourceWindow = arg("gdelt-source-window");
const gdeltCandidateLimit = Number.parseInt(arg("gdelt-candidate-limit", "8"), 10);
const rssStatusNewsPath = arg("rss-status-news-input");
const rssStatusNewsCandidateLimit = Number.parseInt(arg("rss-status-news-candidate-limit", "8"), 10);

for (const [label, limit] of [
  ["evidence probe", evidenceProbeLimit],
  ["active bridge domain probe", activeBridgeDomainLimit],
  ["external candidate", externalCandidateLimit],
  ["DefiLlama hacks candidate", defillamaHacksCandidateLimit],
  ["GDELT candidate", gdeltCandidateLimit],
  ["RSS status news candidate", rssStatusNewsCandidateLimit]
]) {
  if (!Number.isInteger(limit) || limit < 0 || limit > 50) throw new Error(`invalid ${label} limit: ${limit}`);
}
if (Boolean(gdeltSecurityPath) !== Boolean(gdeltOperationsPath)) throw new Error("GDELT monitoring requires both security and operations inputs or neither");

const before = canonicalFingerprints();
const canonical = loadCanonicalData();
const health = canonicalHealthSummary(canonical);
if (health.reference_errors.length > 0) throw new Error(`canonical reference errors detected: ${health.reference_errors.join("; ")}`);
if (health.unknown_url_status > 0) throw new Error(`canonical unknown URL statuses detected: ${health.unknown_url_status}`);

const state = loadState();
const issues = readIssues(issuesPath);
const issueResult = watchGithubIssues(issues, state, applySignal, observedAt);
const evidenceResult = evidenceHealthEnabled
  ? await watchEvidenceHealth({ evidence: canonical.evidence, state, applySignal, observedAt, limit: evidenceProbeLimit })
  : { findings: [], probes: [], selected_count: 0, live_evidence_count: canonical.evidence.filter((source) => source.url_status === "live").length };
const activeBridgeDomainResult = activeBridgeDomainEnabled
  ? await watchActiveBridgeDomains({ bridges: canonical.bridges, state, applySignal, observedAt, limit: activeBridgeDomainLimit })
  : { findings: [], probes: [], eligible_count: 0, selected_count: 0, baseline_seeded_count: 0, state_changed: false };

const externalSourceText = readTextInput(externalBridgeSourcePath, "external bridge registry");
const externalBridgeResult = externalSourceText
  ? watchExternalBridgeCandidates({ sourceText: externalSourceText, sourceUrl: externalBridgeSourceUrl, canonicalBridges: canonical.bridges, state, applySignal, observedAt, limit: externalCandidateLimit })
  : { source: null, baseline_initialized: false, state_changed: false, parsed_count: 0, matched_existing_count: 0, baseline_seeded_count: 0, unchanged_count: 0, deferred_changed_count: 0, emitted_count: 0, candidates: [] };

const defillamaHacksHtml = readTextInput(defillamaHacksPagePath, "DefiLlama hacks discovery input");
const defillamaHacksResult = defillamaHacksHtml
  ? watchDefillamaHacksPage({
      html: defillamaHacksHtml,
      canonicalBridges: canonical.bridges,
      canonicalEvidence: canonical.evidence,
      state,
      applySignal,
      observedAt,
      limit: defillamaHacksCandidateLimit,
      sourceUrl: defillamaHacksSourceUrl,
      sourceKind: defillamaHacksSourceKind,
      sourceSha256: defillamaHacksSourceSha256
    })
  : { source: null, baseline_initialized: false, state_changed: false, parsed_count: 0, relevant_count: 0, baseline_seeded_count: 0, exact_canonical_matches: 0, bridge_flag_rows: 0, unchanged_count: 0, canonical_evidence_duplicates: 0, deferred_changed_count: 0, emitted_count: 0, candidates: [] };

const gdeltEnabled = Boolean(gdeltSecurityPath && gdeltOperationsPath);
const gdeltResult = gdeltEnabled
  ? watchGdeltNews({ securityPayload: readTextInput(gdeltSecurityPath, "GDELT security"), operationsPayload: readTextInput(gdeltOperationsPath, "GDELT operations"), canonicalBridges: canonical.bridges, canonicalEvidence: canonical.evidence, state, applySignal, observedAt, sourceWindow: gdeltSourceWindow, limit: gdeltCandidateLimit })
  : { source: null, baseline_initialized: false, state_changed: false, security_rows: 0, operations_rows: 0, unique_rows: 0, baseline_seeded_count: 0, canonical_evidence_duplicates: 0, irrelevant_count: 0, unchanged_count: 0, deferred_changed_count: 0, emitted_count: 0, candidates: [] };

const rssFeeds = readRssFeedBundle(rssStatusNewsPath);
const rssStatusNewsResult = rssFeeds.length > 0
  ? watchRssStatusNews({ feeds: rssFeeds, canonicalBridges: canonical.bridges, canonicalEvidence: canonical.evidence, state, applySignal, observedAt, limit: rssStatusNewsCandidateLimit })
  : { enabled: false, state_changed: false, source_count: 0, parsed_count: 0, relevant_count: 0, baseline_seeded_count: 0, unchanged_count: 0, canonical_evidence_duplicates: 0, deferred_changed_count: 0, emitted_count: 0, sources: [], candidates: [] };

const findings = [...issueResult.findings, ...evidenceResult.findings, ...activeBridgeDomainResult.findings];
const candidates = [...issueResult.candidates, ...externalBridgeResult.candidates, ...defillamaHacksResult.candidates, ...gdeltResult.candidates, ...rssStatusNewsResult.candidates];
const reviewSignalsChanged = findings.length > 0 || candidates.length > 0;
const stateChanged = reviewSignalsChanged || activeBridgeDomainResult.state_changed || externalBridgeResult.state_changed || defillamaHacksResult.state_changed || gdeltResult.state_changed || rssStatusNewsResult.state_changed;
const hasChanges = stateChanged;
let outputs = null;

if (hasChanges) {
  writeState(state);
  outputs = writeMonitoringOutputs({
    dateKey, runId, observedAt, findings, candidates, health,
    monitorReports: {
      "github-issue-watch": issueResult,
      "evidence-health-watch": evidenceResult,
      ...(activeBridgeDomainEnabled ? { "active-bridge-domain-watch": activeBridgeDomainResult } : {}),
      ...(externalSourceText ? { "external-bridge-candidate-watch": externalBridgeResult } : {}),
      ...(defillamaHacksHtml ? { "defillama-hacks-page-watch": defillamaHacksResult } : {}),
      ...(gdeltEnabled ? { "gdelt-news-watch": gdeltResult } : {}),
      ...(rssFeeds.length > 0 ? { "rss-status-news-watch": rssStatusNewsResult } : {})
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
  evidence_health: { enabled: evidenceHealthEnabled, selected_count: evidenceResult.selected_count, live_evidence_count: evidenceResult.live_evidence_count, finding_count: evidenceResult.findings.length },
  active_bridge_domains: { enabled: activeBridgeDomainEnabled, eligible_count: activeBridgeDomainResult.eligible_count, selected_count: activeBridgeDomainResult.selected_count, baseline_seeded_count: activeBridgeDomainResult.baseline_seeded_count, finding_count: activeBridgeDomainResult.findings.length, state_changed: activeBridgeDomainResult.state_changed },
  external_candidate_discovery: { enabled: Boolean(externalSourceText), baseline_initialized: externalBridgeResult.baseline_initialized, state_changed: externalBridgeResult.state_changed, parsed_count: externalBridgeResult.parsed_count, matched_existing_count: externalBridgeResult.matched_existing_count, baseline_seeded_count: externalBridgeResult.baseline_seeded_count, unchanged_count: externalBridgeResult.unchanged_count, deferred_changed_count: externalBridgeResult.deferred_changed_count, emitted_count: externalBridgeResult.emitted_count, source: externalBridgeResult.source },
  defillama_hacks: { enabled: Boolean(defillamaHacksHtml), baseline_initialized: defillamaHacksResult.baseline_initialized, state_changed: defillamaHacksResult.state_changed, parsed_count: defillamaHacksResult.parsed_count, relevant_count: defillamaHacksResult.relevant_count, baseline_seeded_count: defillamaHacksResult.baseline_seeded_count, exact_canonical_matches: defillamaHacksResult.exact_canonical_matches, bridge_flag_rows: defillamaHacksResult.bridge_flag_rows, unchanged_count: defillamaHacksResult.unchanged_count, canonical_evidence_duplicates: defillamaHacksResult.canonical_evidence_duplicates, deferred_changed_count: defillamaHacksResult.deferred_changed_count, emitted_count: defillamaHacksResult.emitted_count, source: defillamaHacksResult.source },
  gdelt_news: { enabled: gdeltEnabled, baseline_initialized: gdeltResult.baseline_initialized, state_changed: gdeltResult.state_changed, security_rows: gdeltResult.security_rows, operations_rows: gdeltResult.operations_rows, unique_rows: gdeltResult.unique_rows, baseline_seeded_count: gdeltResult.baseline_seeded_count, canonical_evidence_duplicates: gdeltResult.canonical_evidence_duplicates, irrelevant_count: gdeltResult.irrelevant_count, unchanged_count: gdeltResult.unchanged_count, deferred_changed_count: gdeltResult.deferred_changed_count, emitted_count: gdeltResult.emitted_count, source: gdeltResult.source },
  rss_status_news: { enabled: rssStatusNewsResult.enabled, state_changed: rssStatusNewsResult.state_changed, source_count: rssStatusNewsResult.source_count, parsed_count: rssStatusNewsResult.parsed_count, relevant_count: rssStatusNewsResult.relevant_count, baseline_seeded_count: rssStatusNewsResult.baseline_seeded_count, unchanged_count: rssStatusNewsResult.unchanged_count, canonical_evidence_duplicates: rssStatusNewsResult.canonical_evidence_duplicates, deferred_changed_count: rssStatusNewsResult.deferred_changed_count, emitted_count: rssStatusNewsResult.emitted_count, sources: rssStatusNewsResult.sources },
  canonical_counts: health.counts,
  outputs
};

fs.mkdirSync(path.dirname(resultPath), { recursive: true });
fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(result)}\n`);
