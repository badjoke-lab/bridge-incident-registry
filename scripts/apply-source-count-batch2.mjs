import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const writeArray = (file, records) => {
  const body = records.map((record) => `  ${JSON.stringify(record)}`).join(",\n");
  fs.writeFileSync(path.join(root, file), `[\n${body}\n]\n`);
};

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const expected = { bridges: 33, incidents: 34, events: 183, evidence: 221 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
for (const [key, value] of Object.entries(expected)) {
  if (actual[key] !== value) throw new Error(`Expected ${key}=${value}, received ${actual[key]}`);
}

const evidenceById = new Map(evidence.map((item) => [item.id, item]));
const eventById = new Map(events.map((item) => [item.id, item]));
const numericIds = evidence.map((item) => Number(item.id.match(/(\d+)$/)?.[1] ?? NaN));
if (numericIds.some(Number.isNaN) || Math.max(...numericIds) !== 221) throw new Error("Expected max evidence ID 221");

const additions = [
  { id: "bir_src_000222", source: "bir_src_000053", event: "bir_ev_000039", claim_scope: "incident_case", notes: "Event-scoped duplicate of bir_src_000053: Allbridge's official relaunch analysis documents the pool-accounting exploit, amount, shutdown, remediation, and return to service." },
  { id: "bir_src_000223", source: "bir_src_000055", event: "bir_ev_000039", claim_scope: "incident_case", notes: "Event-scoped duplicate of bir_src_000055: contemporaneous reporting independently supports the initial Allbridge exploit amount and attacker-return context." },
  { id: "bir_src_000224", source: "bir_src_000053", event: "bir_ev_000040", claim_scope: "recovery", notes: "Event-scoped duplicate of bir_src_000053: the official analysis confirms that most stolen funds were recovered and used in the recovery process." },
  { id: "bir_src_000225", source: "bir_src_000058", event: "bir_ev_000043", claim_scope: "incident_case", notes: "Event-scoped duplicate of bir_src_000058: contemporaneous reporting supports the LI.FI 2022 drain, affected-wallet count, amount, patching, and reimbursement split." },
  { id: "bir_src_000226", source: "bir_src_000057", event: "bir_ev_000044", claim_scope: "restart", notes: "Event-scoped duplicate of bir_src_000057: Knownsec's technical reconstruction supports redeployment, protocol restoration, and compensation handling." },
  { id: "bir_src_000227", source: "bir_src_000060", event: "bir_ev_000045", claim_scope: "incident_case", notes: "Event-scoped duplicate of bir_src_000060: LI.FI's official report supports the 2024 exploit mechanism, affected wallets, amount, containment, and compensation review." },
  { id: "bir_src_000228", source: "bir_src_000071", event: "bir_ev_000053", claim_scope: "reimbursement", notes: "Event-scoped duplicate of bir_src_000071: ChainSwap's official July 2 postmortem announces treasury-funded compensation and describes progress." },
  { id: "bir_src_000229", source: "bir_src_000079", event: "bir_ev_000059", claim_scope: "reimbursement", notes: "Event-scoped duplicate of bir_src_000079: contemporaneous reporting based on Celer's updates supports the commitment to compensate affected users." },
  { id: "bir_src_000230", source: "bir_src_000086", event: "bir_ev_000068", claim_scope: "restart", notes: "Event-scoped duplicate of bir_src_000086: pNetwork's official postmortem supports the deployed fix and gradual reactivation of unaffected bridges." },
  { id: "bir_src_000231", source: "bir_src_000086", event: "bir_ev_000069", claim_scope: "reimbursement", notes: "Event-scoped duplicate of bir_src_000086: pNetwork's official postmortem supports the DAO-led compensation process for pBTC-on-BSC holders." }
];

const existingIds = new Set(evidence.map((item) => item.id));
for (const addition of additions) {
  if (existingIds.has(addition.id)) throw new Error(`Evidence ID exists: ${addition.id}`);
  const source = evidenceById.get(addition.source);
  const event = eventById.get(addition.event);
  if (!source || !event) throw new Error(`Missing source or event for ${addition.id}`);
  if (source.incident_id !== event.incident_id) throw new Error(`${addition.id}: incident mismatch`);
  evidence.push({ ...source, id: addition.id, event_id: addition.event, claim_scope: addition.claim_scope, accessed_at: "2026-07-28", notes: addition.notes });
}
if (evidence.length !== 231) throw new Error(`Expected evidence 231, received ${evidence.length}`);

const eventCorrections = new Map([["bir_ev_000044", 2], ["bir_ev_000054", 1]]);
for (const event of events) {
  if (eventCorrections.has(event.id)) event.source_count = eventCorrections.get(event.id);
}

const directIncidentCounts = new Map(incidents.map((item) => [item.id, 0]));
const directEventCounts = new Map(events.map((item) => [item.id, 0]));
for (const source of evidence) {
  if (source.incident_id && directIncidentCounts.has(source.incident_id)) directIncidentCounts.set(source.incident_id, directIncidentCounts.get(source.incident_id) + 1);
  if (source.event_id && directEventCounts.has(source.event_id)) directEventCounts.set(source.event_id, directEventCounts.get(source.event_id) + 1);
}

const affectedIncidentIds = new Set(additions.map((addition) => eventById.get(addition.event).incident_id));
const incidentChanges = [];
for (const incident of incidents) {
  const direct = directIncidentCounts.get(incident.id);
  if (incident.source_count === direct) continue;
  if (!affectedIncidentIds.has(incident.id)) throw new Error(`${incident.id}: unexpected incident mismatch`);
  incidentChanges.push({ id: incident.id, from: incident.source_count, to: direct });
  incident.source_count = direct;
}
if (incidentChanges.length !== 6) throw new Error(`Expected 6 incident changes, received ${incidentChanges.length}`);

const incidentMismatches = incidents.filter((item) => item.source_count !== directIncidentCounts.get(item.id));
const eventMismatches = events.filter((item) => item.source_count !== directEventCounts.get(item.id));
if (incidentMismatches.length !== 0) throw new Error(`Expected zero incident mismatches, received ${incidentMismatches.length}`);
if (eventMismatches.length !== 27) throw new Error(`Expected 27 event mismatches, received ${eventMismatches.length}`);

for (const addition of additions) {
  const event = eventById.get(addition.event);
  if (event.source_count !== directEventCounts.get(event.id)) throw new Error(`${event.id}: target event mismatch remains`);
}
for (const [id, count] of eventCorrections) {
  const event = eventById.get(id);
  if (event.source_count !== count || directEventCounts.get(id) !== count) throw new Error(`${id}: correction failed`);
}

writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);
console.log(JSON.stringify({ evidence: 231, incident_changes: incidentChanges, event_corrections: [...eventCorrections], remaining_event_mismatches: 27 }, null, 2));
