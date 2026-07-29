import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const checker = path.join(root, "scripts/check-source-count-equality.mjs");

function runCheck(checkRoot) {
  return spawnSync(process.execPath, [checker], {
    cwd: root,
    env: { ...process.env, BIR_SOURCE_COUNT_ROOT: checkRoot },
    encoding: "utf8"
  });
}

function readJson(fixtureRoot, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(fixtureRoot, relativePath), "utf8"));
}

function writeJson(fixtureRoot, relativePath, value) {
  fs.writeFileSync(path.join(fixtureRoot, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

function withFixture(name, mutate, expectedText) {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), `bir-source-count-${name}-`));
  try {
    fs.cpSync(path.join(root, "data"), path.join(fixtureRoot, "data"), { recursive: true });
    mutate(fixtureRoot);
    const result = runCheck(fixtureRoot);
    const output = `${result.stdout}\n${result.stderr}`;
    if (result.status === 0) {
      throw new Error(`${name}: equality check unexpectedly passed`);
    }
    if (!output.includes(expectedText)) {
      throw new Error(`${name}: expected output containing ${JSON.stringify(expectedText)}\n${output}`);
    }
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
}

const baseline = runCheck(root);
if (baseline.status !== 0) {
  throw new Error(`baseline equality check failed\n${baseline.stdout}\n${baseline.stderr}`);
}

withFixture(
  "incident-drift",
  (fixtureRoot) => {
    const incidents = readJson(fixtureRoot, "data/incidents.json");
    incidents[0].source_count += 1;
    writeJson(fixtureRoot, "data/incidents.json", incidents);
  },
  "incident bir_inc_000001"
);

withFixture(
  "event-drift",
  (fixtureRoot) => {
    const events = readJson(fixtureRoot, "data/events.json");
    events[0].source_count += 1;
    writeJson(fixtureRoot, "data/events.json", events);
  },
  "event bir_ev_000001"
);

console.log("Source-count equality controlled failure tests passed (2 fixtures).");
