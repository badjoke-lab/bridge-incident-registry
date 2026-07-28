import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const auditScript = path.join(root, "scripts/audit-full-corpus.mjs");

function runAudit(auditRoot) {
  return spawnSync(process.execPath, [auditScript], {
    cwd: root,
    env: { ...process.env, BIR_AUDIT_ROOT: auditRoot },
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
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), `bir-${name}-`));
  try {
    fs.cpSync(path.join(root, "data"), path.join(fixtureRoot, "data"), { recursive: true });
    mutate(fixtureRoot);
    const result = runAudit(fixtureRoot);
    const output = `${result.stdout}\n${result.stderr}`;
    if (result.status === 0) {
      throw new Error(`${name}: audit unexpectedly passed`);
    }
    if (!output.includes(expectedText)) {
      throw new Error(`${name}: expected output containing ${JSON.stringify(expectedText)}\n${output}`);
    }
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
}

const baseline = runAudit(root);
if (baseline.status !== 0) {
  throw new Error(`baseline audit failed\n${baseline.stdout}\n${baseline.stderr}`);
}

withFixture(
  "negative-loss",
  (fixtureRoot) => {
    const incidents = readJson(fixtureRoot, "data/incidents.json");
    incidents[0].reported_loss_usd = -1;
    writeJson(fixtureRoot, "data/incidents.json", incidents);
  },
  "reported_loss_usd must be a non-negative finite number or null"
);

withFixture(
  "inverted-range",
  (fixtureRoot) => {
    const incidents = readJson(fixtureRoot, "data/incidents.json");
    incidents[0].reported_loss_usd_min = 10;
    incidents[0].reported_loss_usd_max = 5;
    writeJson(fixtureRoot, "data/incidents.json", incidents);
  },
  "reported_loss_usd_min exceeds reported_loss_usd_max"
);

withFixture(
  "missing-unresolved-reason",
  (fixtureRoot) => {
    const incidents = readJson(fixtureRoot, "data/incidents.json");
    incidents[0].is_unresolved = true;
    incidents[0].unresolved_reason = [];
    writeJson(fixtureRoot, "data/incidents.json", incidents);
  },
  "unresolved incident has no unresolved_reason"
);

withFixture(
  "bridge-without-evidence",
  (fixtureRoot) => {
    const bridges = readJson(fixtureRoot, "data/bridges.json");
    const evidence = readJson(fixtureRoot, "data/evidence.json");
    const targetBridgeId = bridges[0].id;
    writeJson(
      fixtureRoot,
      "data/evidence.json",
      evidence.filter((source) => source.bridge_id !== targetBridgeId)
    );
  },
  "bridge has no evidence records"
);

withFixture(
  "bridge-aggregate-drift",
  (fixtureRoot) => {
    const bridges = readJson(fixtureRoot, "data/bridges.json");
    bridges[0].major_incident_count += 1;
    writeJson(fixtureRoot, "data/bridges.json", bridges);
  },
  "major_incident_count"
);

withFixture(
  "active-bridge-end-date",
  (fixtureRoot) => {
    const bridges = readJson(fixtureRoot, "data/bridges.json");
    const bridge = bridges.find((item) => item.status === "active");
    if (!bridge) throw new Error("fixture requires an active bridge");
    bridge.end_date = "2026-07-28";
    writeJson(fixtureRoot, "data/bridges.json", bridges);
  },
  "active entity must not have end_date"
);

withFixture(
  "primary-source-tier",
  (fixtureRoot) => {
    const evidence = readJson(fixtureRoot, "data/evidence.json");
    const source = evidence.find((item) => item.is_primary === true);
    if (!source) throw new Error("fixture requires a primary source");
    source.source_tier = "tier_2";
    writeJson(fixtureRoot, "data/evidence.json", evidence);
  },
  "primary source must use tier_1"
);

withFixture(
  "event-evidence-incident-mismatch",
  (fixtureRoot) => {
    const incidents = readJson(fixtureRoot, "data/incidents.json");
    const events = readJson(fixtureRoot, "data/events.json");
    const evidence = readJson(fixtureRoot, "data/evidence.json");
    const source = evidence.find((item) => item.event_id);
    if (!source) throw new Error("fixture requires event-linked evidence");
    const event = events.find((item) => item.id === source.event_id);
    if (!event) throw new Error("fixture requires a valid linked event");
    source.incident_id = event.incident_id ? null : incidents[0].id;
    writeJson(fixtureRoot, "data/evidence.json", evidence);
  },
  "event evidence incident mismatch"
);

console.log("Full-corpus audit controlled failure tests passed (8 fixtures).");
