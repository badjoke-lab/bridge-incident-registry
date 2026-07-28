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

const incidentTargets = new Set([
  "bir_inc_000019",
  "bir_inc_000020",
  "bir_inc_000027",
  "bir_inc_000031",
  "bir_inc_000032",
  "bir_inc_000033",
  "bir_inc_000034"
]);

const eventTargets = new Set([
  "bir_ev_000010",
  "bir_ev_000015",
  "bir_ev_000067",
  "bir_ev_000070",
  "bir_ev_000139",
  "bir_ev_000172"
]);

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

const changes = [];
for (const item of incidents) {
  if (!incidentTargets.has(item.id)) continue;
  const next = directIncidentCounts.get(item.id);
  if (item.source_count === next) throw new Error(`${item.id}: source_count already normalized`);
  changes.push({ kind: "incident", id: item.id, from: item.source_count, to: next });
  item.source_count = next;
}

for (const item of events) {
  if (!eventTargets.has(item.id)) continue;
  const next = directEventCounts.get(item.id);
  if (item.source_count >= next) throw new Error(`${item.id}: expected stored count below direct count`);
  changes.push({ kind: "event", id: item.id, from: item.source_count, to: next });
  item.source_count = next;
}

if (changes.length !== 13) throw new Error(`Expected 13 changes, received ${changes.length}`);

const remainingIncidentMismatches = incidents.filter((item) => item.source_count !== directIncidentCounts.get(item.id));
const remainingEventMismatches = events.filter((item) => item.source_count !== directEventCounts.get(item.id));
if (remainingIncidentMismatches.length !== 0) {
  throw new Error(`Expected zero incident mismatches, received ${remainingIncidentMismatches.length}`);
}
if (remainingEventMismatches.length !== 47) {
  throw new Error(`Expected 47 event mismatches, received ${remainingEventMismatches.length}`);
}
if (remainingEventMismatches.some((item) => item.source_count <= directEventCounts.get(item.id))) {
  throw new Error("Remaining event mismatch is not a stored-count-above-direct-count case");
}

writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);

console.log(JSON.stringify({ changes, remaining_event_mismatches: 47 }, null, 2));
