import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { applySignal } from "./core/state.mjs";
import { watchEvidenceHealth } from "./monitors/evidence-health-watch.mjs";
import { watchExternalBridgeCandidates } from "./monitors/external-bridge-candidate-watch.mjs";

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

  const first = watchExternalBridgeCandidates({
    sourceText: source,
    sourceUrl,
    canonicalBridges,
    state,
    applySignal,
    observedAt: "2026-08-09T07:40:00.000Z",
    limit: 8
  });
  if (first.parsed_count !== 2 || first.matched_existing_count !== 1 || first.candidates.length !== 1) {
    throw new Error(`external discovery should suppress canonical match and emit one new candidate: ${JSON.stringify(first)}`);
  }
  if (first.candidates[0].candidate_class !== "C" || first.candidates[0].canonical_name !== "Fixture Bridge") {
    throw new Error(`external discovery candidate classification mismatch: ${JSON.stringify(first.candidates[0])}`);
  }
  if (!state.signals["external-bridge:defillama-bridges-server:999"]) {
    throw new Error("external discovery did not persist its dedupe fingerprint");
  }

  const repeated = watchExternalBridgeCandidates({
    sourceText: source,
    sourceUrl,
    canonicalBridges,
    state,
    applySignal,
    observedAt: "2026-08-09T07:41:00.000Z",
    limit: 8
  });
  if (repeated.candidates.length !== 0 || repeated.unchanged_count !== 1) {
    throw new Error(`unchanged external candidate should be suppressed: ${JSON.stringify(repeated)}`);
  }

  const changedSource = source.replace("https://fixture.invalid/", "https://fixture.invalid/v2/");
  const changed = watchExternalBridgeCandidates({
    sourceText: changedSource,
    sourceUrl,
    canonicalBridges,
    state,
    applySignal,
    observedAt: "2026-08-09T07:42:00.000Z",
    limit: 8
  });
  if (changed.candidates.length !== 1 || changed.candidates[0].canonical_name !== "Fixture Bridge") {
    throw new Error(`materially changed external metadata should re-emit: ${JSON.stringify(changed)}`);
  }
}

try {
  fs.cpSync(path.join(root, "data"), path.join(fixtureRoot, "data"), { recursive: true });
  const canonicalFiles = ["bridges.json", "incidents.json", "events.json", "evidence.json"];
  const before = Object.fromEntries(canonicalFiles.map((name) => [name, sha(path.join(fixtureRoot, "data", name))]));

  const first = run("2026-08-09T07:20:00.000Z", "Monitoring signal / needs evidence. First observation.");
  if (!first.has_changes || first.candidate_count !== 1 || first.findings_count !== 1) {
    throw new Error(`first run should emit one signal: ${JSON.stringify(first)}`);
  }

  const second = run("2026-08-09T07:21:00.000Z", "Monitoring signal / needs evidence. First observation.");
  if (second.has_changes || second.candidate_count !== 0 || second.findings_count !== 0) {
    throw new Error(`unchanged signal should be suppressed: ${JSON.stringify(second)}`);
  }

  const third = run("2026-08-09T07:22:00.000Z", "Monitoring signal / needs evidence. Materially changed source boundary.");
  if (!third.has_changes || third.candidate_count !== 1) {
    throw new Error(`changed signal should re-emit: ${JSON.stringify(third)}`);
  }

  await testEvidenceHealth();
  testExternalCandidateDiscovery();

  const after = Object.fromEntries(canonicalFiles.map((name) => [name, sha(path.join(fixtureRoot, "data", name))]));
  if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error("monitoring changed canonical fixture data");

  const state = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "data-staging/monitoring/state.json"), "utf8"));
  if (!state.signals["github-issue:171"]) throw new Error("monitoring state did not retain issue signal");

  console.log("Monitoring controlled tests passed (issue dedupe, evidence health, external candidate dedupe/change detection, canonical guard).");
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
