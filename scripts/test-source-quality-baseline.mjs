import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const checker = path.join(root, "scripts/check-source-quality-baseline.mjs");

function runCheck(fixtureRoot) {
  return spawnSync(process.execPath, [checker], {
    cwd: root,
    env: { ...process.env, BIR_QUALITY_ROOT: fixtureRoot },
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
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), `bir-quality-${name}-`));
  try {
    fs.cpSync(path.join(root, "data"), path.join(fixtureRoot, "data"), { recursive: true });
    mutate(fixtureRoot);
    const result = runCheck(fixtureRoot);
    const output = `${result.stdout}\n${result.stderr}`;
    if (result.status === 0) {
      throw new Error(`${name}: checker unexpectedly passed`);
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
  throw new Error(`baseline source-quality check failed\n${baseline.stdout}\n${baseline.stderr}`);
}

withFixture(
  "bridge-primary-regression",
  (fixtureRoot) => {
    const bridges = readJson(fixtureRoot, "data/bridges.json");
    const evidence = readJson(fixtureRoot, "data/evidence.json");
    const target = bridges.find((bridge) => evidence.some((source) => source.bridge_id === bridge.id && source.is_primary === true));
    if (!target) throw new Error("fixture requires a bridge with primary evidence");
    for (const source of evidence) {
      if (source.bridge_id === target.id) source.is_primary = false;
    }
    writeJson(fixtureRoot, "data/evidence.json", evidence);
  },
  "bridges_without_primary"
);

withFixture(
  "event-tier-one-regression",
  (fixtureRoot) => {
    const events = readJson(fixtureRoot, "data/events.json");
    const evidence = readJson(fixtureRoot, "data/evidence.json");
    const target = events.find((event) => {
      const sources = evidence.filter((source) => source.event_id === event.id);
      return sources.some((source) => source.source_tier === "tier_1" && source.is_primary !== true);
    });
    if (!target) throw new Error("fixture requires an event with non-primary tier-1 evidence");
    for (const source of evidence) {
      if (source.event_id === target.id && source.source_tier === "tier_1" && source.is_primary !== true) {
        source.source_tier = "tier_2";
      }
    }
    writeJson(fixtureRoot, "data/evidence.json", evidence);
  },
  "events_without_tier_1"
);

withFixture(
  "risky-host-archive-regression",
  (fixtureRoot) => {
    const evidence = readJson(fixtureRoot, "data/evidence.json");
    const source = evidence.find((item) => {
      try {
        const host = new URL(item.url).hostname.replace(/^www\./, "").toLowerCase();
        return ["x.com", "twitter.com", "medium.com"].includes(host) && !item.archived_url;
      } catch {
        return false;
      }
    });
    if (!source) throw new Error("fixture requires unarchived risky-host evidence");
    evidence.push({ ...source, id: "bir_src_fixture_quality_regression" });
    writeJson(fixtureRoot, "data/evidence.json", evidence);
  },
  "risky_host_unarchived"
);

console.log("Source-quality baseline controlled failure tests passed (3 fixtures).");
