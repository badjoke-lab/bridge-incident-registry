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

const expected = { bridges: 33, incidents: 34, events: 183, evidence: 211 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
for (const [key, value] of Object.entries(expected)) {
  if (actual[key] !== value) throw new Error(`Expected ${key}=${value}, received ${actual[key]}`);
}

const evidenceById = new Map(evidence.map((item) => [item.id, item]));
const eventById = new Map(events.map((item) => [item.id, item]));
const existingIds = new Set(evidence.map((item) => item.id));

const numericIds = evidence.map((item) => Number(item.id.match(/(\d+)$/)?.[1] ?? NaN));
if (numericIds.some(Number.isNaN)) throw new Error("Evidence ID format is invalid");
if (Math.max(...numericIds) !== 211) throw new Error(`Expected max evidence ID 211, received ${Math.max(...numericIds)}`);

const additions = [
  { id: "bir_src_000212", source: "bir_src_000018", event: "bir_ev_000013", claim_scope: "incident_case", notes: "Event-scoped duplicate of bir_src_000018: independently supports the Poly Network exploit disclosure, approximate amount, and cross-chain incident context; the original record remains recovery-scoped to bir_ev_000014." },
  { id: "bir_src_000213", source: "bir_src_000017", event: "bir_ev_000014", claim_scope: "recovery", notes: "Event-scoped duplicate of bir_src_000017: directly supports the staged return of stolen Poly Network assets; the original record remains incident-scoped to bir_ev_000013." },
  { id: "bir_src_000214", source: "bir_src_000022", event: "bir_ev_000016", claim_scope: "incident_case", notes: "Event-scoped duplicate of bir_src_000022: the official retrospective supports the BSC Token Hub exploit, nominal mint, validator response, and unrecovered amount; the original record remains recovery-scoped to bir_ev_000017." },
  { id: "bir_src_000215", source: "bir_src_000021", event: "bir_ev_000017", claim_scope: "restart", notes: "Event-scoped duplicate of bir_src_000021: the official update supports the emergency suspension and return of BNB Smart Chain operation; the original record remains incident-scoped to bir_ev_000016." },
  { id: "bir_src_000216", source: "bir_src_000028", event: "bir_ev_000021", claim_scope: "shutdown", notes: "Event-scoped duplicate of bir_src_000028: the official indefinite-stop statement is a separate shutdown-stage source supporting the later cessation event; the original record remains status-scoped to bir_ev_000020." },
  { id: "bir_src_000217", source: "bir_src_000040", event: "bir_ev_000030", claim_scope: "recovery", notes: "Event-scoped duplicate of bir_src_000040: the primary postmortem assigns losses to treasury coverage and describes the staged recovery and reopening plan; the original record remains incident-scoped to bir_ev_000029." },
  { id: "bir_src_000218", source: "bir_src_000209", event: "bir_ev_000032", claim_scope: "restart", notes: "Event-scoped duplicate of bir_src_000209: the official retrospective confirms that THORChain restarted after the 2021 incidents; the original record remains reimbursement-scoped to bir_ev_000181." },
  { id: "bir_src_000219", source: "bir_src_000045", event: "bir_ev_000034", claim_scope: "recovery", notes: "Event-scoped duplicate of bir_src_000045: the primary report supports the TSS patch and governance recovery-review state; the original record remains incident-scoped to bir_ev_000033." },
  { id: "bir_src_000220", source: "bir_src_000048", event: "bir_ev_000035", claim_scope: "incident_case", notes: "Event-scoped duplicate of bir_src_000048: the primary postmortem supports the Meter Passport exploit mechanism, liability amount, shutdown, and response; the original record remains attached to bir_ev_000036." },
  { id: "bir_src_000221", source: "bir_src_000048", event: "bir_ev_000037", claim_scope: "reimbursement", notes: "Event-scoped duplicate of bir_src_000048: the primary postmortem supports the PASS compensation structure and distribution context; the original record remains incident-scoped to bir_ev_000036." }
];

for (const addition of additions) {
  if (existingIds.has(addition.id)) throw new Error(`Evidence ID already exists: ${addition.id}`);
  const source = evidenceById.get(addition.source);
  if (!source) throw new Error(`Missing source template ${addition.source}`);
  const event = eventById.get(addition.event);
  if (!event) throw new Error(`Missing target event ${addition.event}`);
  if (source.incident_id !== event.incident_id) throw new Error(`${addition.id}: source and target incident differ`);
  evidence.push({
    ...source,
    id: addition.id,
    event_id: addition.event,
    claim_scope: addition.claim_scope,
    accessed_at: "2026-07-28",
    notes: addition.notes
  });
}

if (evidence.length !== 221) throw new Error(`Expected evidence=221, received ${evidence.length}`);

const directIncidentCounts = new Map(incidents.map((item) => [item.id, 0]));
const directEventCounts = new Map(events.map((item) => [item.id, 0]));
for (const source of evidence) {
  if (source.incident_id && directIncidentCounts.has(source.incident_id)) {
    directIncidentCounts.set(source.incident_id, directIncidentCounts.get(source.incident_id) + 1);
  }
  if (source.event_id && directEventCounts.has(source.event_id)) {
    directEventCounts.set(source.event_id, directEventCounts.get(source.event_id) + 1);
  }
}

const affectedIncidentIds = new Set(additions.map((addition) => eventById.get(addition.event).incident_id));
const incidentChanges = [];
for (const incident of incidents) {
  const direct = directIncidentCounts.get(incident.id);
  if (incident.source_count === direct) continue;
  if (!affectedIncidentIds.has(incident.id)) {
    throw new Error(`${incident.id}: unexpected incident source_count mismatch ${incident.source_count} -> ${direct}`);
  }
  incidentChanges.push({ id: incident.id, from: incident.source_count, to: direct });
  incident.source_count = direct;
}
if (incidentChanges.length !== 7) throw new Error(`Expected 7 incident source_count changes, received ${incidentChanges.length}`);

const incidentMismatches = incidents.filter((item) => item.source_count !== directIncidentCounts.get(item.id));
const eventMismatches = events.filter((item) => item.source_count !== directEventCounts.get(item.id));
if (incidentMismatches.length !== 0) throw new Error(`Expected zero incident mismatches, received ${incidentMismatches.length}`);
if (eventMismatches.length !== 37) throw new Error(`Expected 37 event mismatches, received ${eventMismatches.length}`);

for (const addition of additions) {
  const event = eventById.get(addition.event);
  const direct = directEventCounts.get(addition.event);
  if (event.source_count !== direct) throw new Error(`${addition.event}: stored=${event.source_count}, direct=${direct}`);
}

writeArray("data/incidents.json", incidents);
writeArray("data/evidence.json", evidence);
console.log(JSON.stringify({ additions: additions.map(({ id, source, event, claim_scope }) => ({ id, source, event, claim_scope })), incident_changes: incidentChanges, evidence: evidence.length, incident_mismatches: 0, event_mismatches: 37 }, null, 2));
