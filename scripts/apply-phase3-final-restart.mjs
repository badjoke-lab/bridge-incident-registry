import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const writeArray = (relativePath, records) => {
  const body = records.map((record) => `  ${JSON.stringify(record)}`).join(",\n");
  fs.writeFileSync(path.join(root, relativePath), `[\n${body}\n]\n`);
};

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const expected = { bridges: 33, incidents: 34, events: 182, evidence: 210 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
for (const [key, value] of Object.entries(expected)) {
  if (actual[key] !== value) throw new Error(`Expected ${key}=${value}, received ${actual[key]}`);
}

const get = (records, id, label) => {
  const record = records.find((item) => item.id === id);
  if (!record) throw new Error(`Missing ${label} ${id}`);
  return record;
};

const liFi2022 = get(events, "bir_ev_000044", "event");
if (liFi2022.event_type !== "patch_and_reimbursement") {
  throw new Error(`bir_ev_000044 expected patch_and_reimbursement, received ${liFi2022.event_type}`);
}
liFi2022.event_type = "bridge_reopened";
liFi2022.notes = liFi2022.notes
  ? `${liFi2022.notes} Event type normalized from legacy descriptive value patch_and_reimbursement.`
  : "Event type normalized from legacy descriptive value patch_and_reimbursement.";

const liFi2024Incident = get(incidents, "bir_inc_000016", "incident");
if (liFi2024Incident.restart_status !== "reopened") {
  throw new Error(`bir_inc_000016 expected reopened, received ${liFi2024Incident.restart_status}`);
}
liFi2024Incident.restart_status = "unknown";
liFi2024Incident.last_reviewed_at = "2026-07-28";
liFi2024Incident.last_verified_at = "2026-07-28";
if (!liFi2024Incident.known_unknowns.includes("The exact incident-era service-restoration point is not established in the reviewed corpus.")) {
  liFi2024Incident.known_unknowns.push("The exact incident-era service-restoration point is not established in the reviewed corpus.");
}

const liFi2024Report = get(events, "bir_ev_000046", "event");
if (liFi2024Report.restart_status !== "reopened") {
  throw new Error(`bir_ev_000046 expected reopened, received ${liFi2024Report.restart_status}`);
}
liFi2024Report.restart_status = "unknown";
liFi2024Report.notes = liFi2024Report.notes
  ? `${liFi2024Report.notes} The official report establishes containment, not the exact service-restoration point.`
  : "The official report establishes containment, not the exact service-restoration point.";

const chainSwapIncident = get(incidents, "bir_inc_000017", "incident");
if (events.some((item) => item.id === "bir_ev_000183")) throw new Error("Duplicate event bir_ev_000183");
events.push({
  id: "bir_ev_000183",
  bridge_id: chainSwapIncident.bridge_id,
  incident_id: chainSwapIncident.id,
  event_type: "bridge_reopened",
  event_date: "2021-08-20",
  event_date_precision: "day",
  title: "ChainSwap bridge relaunched after the July incident period",
  description: "ChainSwap announced that its bridge was live again after integrating with Anyswap and completing the post-July remediation period.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "major",
  status_effect: "active operation resumed",
  source_count: 1,
  sort_order: 30,
  amount_text: null,
  recovered_amount_text: null,
  reimbursement_status: "in_progress",
  restart_status: "reopened",
  affected_chains: [...chainSwapIncident.affected_chains],
  affected_assets: [...chainSwapIncident.affected_assets],
  notes: "This records the later final relaunch after the combined July remediation period; it does not claim a durable reopening before the second exploit.",
  duplicate_of: null,
  merged_into: null
});

const source74 = get(evidence, "bir_src_000074", "evidence");
if (evidence.some((item) => item.id === "bir_src_000211")) throw new Error("Duplicate evidence bir_src_000211");
evidence.push({
  ...source74,
  id: "bir_src_000211",
  incident_id: "bir_inc_000017",
  event_id: "bir_ev_000183",
  accessed_at: "2026-07-28",
  notes: "Duplicate official relaunch URL retained as separate event-scoped evidence for the first July incident."
});

chainSwapIncident.source_count += 1;
chainSwapIncident.last_reviewed_at = "2026-07-28";
chainSwapIncident.last_verified_at = "2026-07-28";

if (events.length !== 183) throw new Error(`Expected 183 events, received ${events.length}`);
if (evidence.length !== 211) throw new Error(`Expected 211 evidence records, received ${evidence.length}`);

writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);

console.log("Applied final Phase 3 restart migration.");
console.log(JSON.stringify({ bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length }, null, 2));
