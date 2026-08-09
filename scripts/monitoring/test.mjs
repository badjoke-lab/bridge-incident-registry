import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

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

  const after = Object.fromEntries(canonicalFiles.map((name) => [name, sha(path.join(fixtureRoot, "data", name))]));
  if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error("monitoring changed canonical fixture data");

  const state = JSON.parse(fs.readFileSync(path.join(fixtureRoot, "data-staging/monitoring/state.json"), "utf8"));
  if (!state.signals["github-issue:171"]) throw new Error("monitoring state did not retain issue signal");

  console.log("Monitoring foundation controlled tests passed (new signal, dedupe, changed signal, canonical guard).");
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
