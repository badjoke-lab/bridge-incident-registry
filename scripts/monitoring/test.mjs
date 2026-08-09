import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { applySignal } from "./core/state.mjs";
import { watchEvidenceHealth } from "./monitors/evidence-health-watch.mjs";
import { watchExternalBridgeCandidates } from "./monitors/external-bridge-candidate-watch.mjs";
import { parseGdeltArticleList, watchGdeltNews } from "./monitors/gdelt-news-watch.mjs";

const root = process.cwd();
const runner = path.join(root, "scripts/monitoring/run.mjs");
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "bir-monitoring-test-"));

function sha(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function run(observedAt, issueBody) {
  const inputDir = path.join(fixtureRoot, ".monitor-input");
  fs.mkdirSync(inputDir, { recursive: true });
  const issueFile = path.join(inputDir, "issues.json");
  fs.writeFileSync(issueFile, `${JSON.stringify([{
    number: 171,
    title: "Review Example 2026 monitoring signal",
    body: issueBody,
    url: "https://github.com/example/repo/issues/171",
    labels: [{ name: "monitoring" }]
  }], null, 2)}\n`);

  const result = spawnSync(process.execPath, [
    runner,
    "--issues", issueFile,
    "--observed-at", observedAt,
    "--date", "20260809",
    "--run-id", `fixture-${observedAt.slice(11, 19).replaceAll(":", "")}`,
    "--result", ".monitor-output/result.json"
  ], { cwd: fixtureRoot, encoding: "utf8" });

  if (result.status !== 0) throw new Error(`monitor runner failed\n${result.stdout}\n${result.stderr}`);
  return JSON.parse(fs.readFileSync(path.join(fixtureRoot, ".monitor-output/result.json"), "utf8"));
}

async function testEvidenceHealth() {
  const evidence = [{
    id: "bir_src_fixture_001",
    bridge_id: "bir_bridge_000001",
    incident_id: "bir_inc_000001",
    event_id: "bir_ev_000001",
    title: "Fixture primary source",
    publisher: "Fixture Protocol",
    url: "https://example.invalid/source",
    url_status: "live",
    source_tier: "tier_1",
    is_primary: true,
    archived_url: "https://web.archive.org/web/20260101000000/https://example.invalid/source"
  }];
  const state = { version: 1, signals: {} };
  const hard404 = async () => ({ ok: false, status: 404, final_url: evidence[0].url, error: null });
  const healthy = async () => ({ ok: true, status: 200, final_url: evidence[0].url, error: null });
  const blocked = async () => ({ ok: false, status: 403, final_url: evidence[0].url, error: null });

  const first = await watchEvidenceHealth({ evidence, state, applySignal, observedAt: "2026-08-09T07:30:00.000Z", limit: 10, probe: hard404 });
  if (first.findings.length !== 1 || first.findings[0].category !== "evidence_hard_failure" || first.findings[0].severity !== "high") {
    throw new Error(`two-pass 404 should emit one high finding: ${JSON.stringify(first)}`);
  }

  const repeated = await watchEvidenceHealth({ evidence, state, applySignal, observedAt: "2026-08-09T07:31:00.000Z", limit: 10, probe: hard404 });
  if (repeated.findings.length !== 0) throw new Error(`unchanged 404 failure should be deduped: ${JSON.stringify(repeated)}`);

  const recovered = await watchEvidenceHealth({ evidence, state, applySignal, observedAt: "2026-08-09T07:32:00.000Z", limit: 10, probe: healthy });
  if (recovered.findings.length !== 1 || recovered.findings[0].category !== "evidence_recovered") {
    throw new Error(`healthy two-pass probe should rearm previous failure: ${JSON.stringify(recovered)}`);
  }

  const blockedState = { version: 1, signals: {} };
  const blockedResult = await watchEvidenceHealth({ evidence, state: blockedState, applySignal, observedAt: "2026-08-09T07:33:00.000Z", limit: 10, probe: blocked });
  if (blockedResult.findings.length !== 0 || Object.keys(blockedState.signals).length !== 0) {
    throw new Error(`403 bot/access blocking must not become a dead-link signal: ${JSON.stringify(blockedResult)}`);
  }
}

function testExternalCandidateDiscovery() {
  const canonicalBridges = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "data/bridges.json"), "utf8"));
  const state = { version: 1, signals: {} };
  const sourceUrl = "https://raw.githubusercontent.com/DefiLlama/bridges-server/master/src/data/bridgeNetworkData.ts";
  const source = `
export default [
  {
    id: 1,
    displayName: "Ronin Bridge",
    bridgeDbName: "ronin",
    url: "https://bridge.roninchain.com/",
    chains: ["Ethereum", "Ronin"],
  },
  // { id: 998, displayName: "Commented Bridge", bridgeDbName: "commented", url: "https://commented.invalid/", chains: ["Ethereum"] },
  {
    id: 999,
    displayName: "Fixture Bridge",
    bridgeDbName: "fixture",
    slug: "fixture-bridge",
    url: "https://fixture.invalid/",
    chains: ["Ethereum", "Fixture"],
  },
];
`;

  const baseline = watchExternalBridgeCandidates({ sourceText: source, sourceUrl, canonicalBridges, state, applySignal, observedAt: "2026-08-09T07:40:00.000Z", limit: 8 });
  if (baseline.parsed_count !== 2 || baseline.matched_existing_count !== 1 || baseline.baseline_seeded_count !== 1) {
    throw new Error(`external baseline should parse two active rows, match Ronin, and seed one unmatched row: ${JSON.stringify(baseline)}`);
  }
  if (!baseline.baseline_initialized || !baseline.state_changed || baseline.candidates.length !== 0) {
    throw new Error(`initial external universe must seed state without emitting candidates: ${JSON.stringify(baseline)}`);
  }

  const repeated = watchExternalBridgeCandidates({ sourceText: source, sourceUrl, canonicalBridges, state, applySignal, observedAt: "2026-08-09T07:41:00.000Z", limit: 8 });
  if (repeated.candidates.length !== 0 || repeated.unchanged_count !== 1 || repeated.state_changed) {
    throw new Error(`unchanged external universe should be silent after baseline: ${JSON.stringify(repeated)}`);
  }

  const addedSource = source.replace("\n];", `
  {
    id: 1000,
    displayName: "New Fixture Bridge",
    bridgeDbName: "new-fixture",
    slug: "new-fixture-bridge",
    url: "https://new-fixture.invalid/",
    chains: ["Ethereum", "NewFixture"],
  },
];`);
  const added = watchExternalBridgeCandidates({ sourceText: addedSource, sourceUrl, canonicalBridges, state, applySignal, observedAt: "2026-08-09T07:42:00.000Z", limit: 8 });
  if (added.candidates.length !== 1 || added.candidates[0].canonical_name !== "New Fixture Bridge" || added.candidates[0].candidate_class !== "C") {
    throw new Error(`new post-baseline external row should emit one class C hold candidate: ${JSON.stringify(added)}`);
  }

  const changedSource = addedSource.replace("https://fixture.invalid/", "https://fixture.invalid/v2/");
  const changed = watchExternalBridgeCandidates({ sourceText: changedSource, sourceUrl, canonicalBridges, state, applySignal, observedAt: "2026-08-09T07:43:00.000Z", limit: 8 });
  if (changed.candidates.length !== 1 || changed.candidates[0].canonical_name !== "Fixture Bridge") {
    throw new Error(`materially changed post-baseline metadata should re-emit: ${JSON.stringify(changed)}`);
  }
}

function gdeltPayload(articles) {
  return JSON.stringify({ articles });
}

function testGdeltNews() {
  const canonicalBridges = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "data/bridges.json"), "utf8"));
  const canonicalEvidence = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "data/evidence.json"), "utf8"));
  const canonicalUrl = canonicalEvidence[0].url;
  const state = { version: 1, signals: {} };

  let malformedFailed = false;
  try {
    parseGdeltArticleList("not-json", "security");
  } catch {
    malformedFailed = true;
  }
  if (!malformedFailed) throw new Error("malformed GDELT input must fail closed");

  const baselineSecurity = gdeltPayload([
    { url: "https://news.example/old-crypto-bridge", title: "Crypto bridge hacked in old coverage", domain: "news.example", seendate: "20260801010000" }
  ]);
  const baselineOperations = gdeltPayload([
    { url: "https://news.example/old-crypto-bridge", title: "Crypto bridge hacked in old coverage", domain: "news.example", seendate: "20260801010000" },
    { url: "https://local.example/physical", title: "City bridge paused for road repairs", domain: "local.example", seendate: "20260801020000" }
  ]);

  const baseline = watchGdeltNews({
    securityPayload: baselineSecurity,
    operationsPayload: baselineOperations,
    canonicalBridges,
    canonicalEvidence,
    state,
    applySignal,
    observedAt: "2026-08-09T08:00:00.000Z",
    sourceWindow: "fixture-window",
    limit: 8
  });
  if (!baseline.baseline_initialized || baseline.unique_rows !== 2 || baseline.baseline_seeded_count !== 2 || baseline.candidates.length !== 0) {
    throw new Error(`GDELT first run must seed a zero-candidate baseline with cross-family URL dedupe: ${JSON.stringify(baseline)}`);
  }

  const repeat = watchGdeltNews({
    securityPayload: baselineSecurity,
    operationsPayload: baselineOperations,
    canonicalBridges,
    canonicalEvidence,
    state,
    applySignal,
    observedAt: "2026-08-09T08:01:00.000Z",
    sourceWindow: "fixture-window",
    limit: 8
  });
  if (repeat.state_changed || repeat.emitted_count !== 0 || repeat.unchanged_count !== 2) {
    throw new Error(`unchanged GDELT baseline should be silent: ${JSON.stringify(repeat)}`);
  }

  const security = gdeltPayload([
    { url: "https://security.example/ronin", title: "Ronin Bridge hacked after new exploit", domain: "security.example", seendate: "20260809080000" },
    { url: "https://security.example/unknown", title: "Cross-chain bridge hacked and drained overnight", domain: "security.example", seendate: "20260809080100" },
    { url: "https://security.example/quiet", title: "Ronin Bridge publishes a new developer guide", domain: "security.example", seendate: "20260809080200" },
    { url: "https://local.example/new-physical", title: "City bridge attacked by corrosion report", domain: "local.example", seendate: "20260809080300" },
    { url: canonicalUrl, title: "Ronin Bridge hacked in duplicate canonical evidence", domain: "canonical.example", seendate: "20260809080400" }
  ]);
  const operations = gdeltPayload([
    { url: "https://security.example/ronin", title: "Ronin Bridge hacked after new exploit", domain: "security.example", seendate: "20260809080000" },
    { url: "https://ops.example/unknown", title: "Crypto bridge paused after security alert", domain: "ops.example", seendate: "20260809080500" }
  ]);

  const changed = watchGdeltNews({
    securityPayload: security,
    operationsPayload: operations,
    canonicalBridges,
    canonicalEvidence,
    state,
    applySignal,
    observedAt: "2026-08-09T08:02:00.000Z",
    sourceWindow: "fixture-window-2",
    limit: 8
  });
  if (changed.emitted_count !== 3) throw new Error(`GDELT should emit three relevant unique articles: ${JSON.stringify(changed)}`);
  const classes = changed.candidates.map((candidate) => candidate.candidate_class).sort();
  if (JSON.stringify(classes) !== JSON.stringify(["B", "C", "C"])) throw new Error(`GDELT candidate classes should be B/C/C: ${JSON.stringify(changed.candidates)}`);
  const known = changed.candidates.find((candidate) => candidate.candidate_class === "B");
  if (!known || known.canonical_name !== "Ronin Bridge") throw new Error(`known bridge exploit title should resolve to Ronin Bridge B/hold: ${JSON.stringify(known)}`);
  if (changed.canonical_evidence_duplicates !== 1 || changed.irrelevant_count !== 2) {
    throw new Error(`GDELT should suppress one canonical URL and two irrelevant titles: ${JSON.stringify(changed)}`);
  }
  if (known.news_source.query_families.length !== 2) throw new Error("same article across query families must dedupe to one candidate retaining both families");

  const capState = { version: 1, signals: { "news:gdelt-doc-2:baseline-v1": { fingerprint: "initialized-v1", first_seen_at: "x", last_seen_at: "x" } } };
  const capped = watchGdeltNews({
    securityPayload: gdeltPayload([
      { url: "https://cap.example/a", title: "Cross-chain bridge hacked in exploit", seendate: "20260809090000" },
      { url: "https://cap.example/b", title: "Crypto bridge hacked in exploit", seendate: "20260809090100" }
    ]),
    operationsPayload: gdeltPayload([]),
    canonicalBridges,
    canonicalEvidence,
    state: capState,
    applySignal,
    observedAt: "2026-08-09T08:03:00.000Z",
    sourceWindow: "fixture-window-3",
    limit: 1
  });
  if (capped.emitted_count !== 1 || capped.deferred_changed_count !== 1) throw new Error(`GDELT candidate ceiling must defer overflow: ${JSON.stringify(capped)}`);
}

try {
  fs.cpSync(path.join(root, "data"), path.join(fixtureRoot, "data"), { recursive: true });
  const canonicalFiles = ["bridges.json", "incidents.json", "events.json", "evidence.json"];
  const before = Object.fromEntries(canonicalFiles.map((name) => [name, sha(path.join(fixtureRoot, "data", name))]));

  const first = run("2026-08-09T07:20:00.000Z", "Monitoring signal / needs evidence. First observation.");
  if (!first.has_changes || first.candidate_count !== 1 || first.findings_count !== 1) throw new Error(`first run should emit one signal: ${JSON.stringify(first)}`);
  const second = run("2026-08-09T07:21:00.000Z", "Monitoring signal / needs evidence. First observation.");
  if (second.has_changes || second.candidate_count !== 0 || second.findings_count !== 0) throw new Error(`unchanged signal should be suppressed: ${JSON.stringify(second)}`);
  const third = run("2026-08-09T07:22:00.000Z", "Monitoring signal / needs evidence. Materially changed source boundary.");
  if (!third.has_changes || third.candidate_count !== 1) throw new Error(`changed signal should re-emit: ${JSON.stringify(third)}`);

  await testEvidenceHealth();
  testExternalCandidateDiscovery();
  testGdeltNews();

  const after = Object.fromEntries(canonicalFiles.map((name) => [name, sha(path.join(fixtureRoot, "data", name))]));
  if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error("monitoring changed canonical fixture data");

  const state = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "data-staging/monitoring/state.json"), "utf8"));
  if (!state.signals["github-issue:171"]) throw new Error("monitoring state did not retain issue signal");

  console.log("Monitoring controlled tests passed (issue dedupe, evidence health, external baseline, GDELT baseline/classification/dedupe/ceiling, canonical guard).");
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
