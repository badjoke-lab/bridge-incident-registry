import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.BIR_SOURCE_COUNT_ROOT ?? process.cwd());
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const incidentCounts = new Map(incidents.map((incident) => [incident.id, 0]));
const eventCounts = new Map(events.map((event) => [event.id, 0]));

for (const source of evidence) {
  if (source.incident_id && incidentCounts.has(source.incident_id)) {
    incidentCounts.set(source.incident_id, incidentCounts.get(source.incident_id) + 1);
  }
  if (source.event_id && eventCounts.has(source.event_id)) {
    eventCounts.set(source.event_id, eventCounts.get(source.event_id) + 1);
  }
}

const errors = [];
for (const incident of incidents) {
  const direct = incidentCounts.get(incident.id);
  if (incident.source_count !== direct) {
    errors.push(`incident ${incident.id}: stored ${incident.source_count}, directly linked ${direct}`);
  }
}
for (const event of events) {
  const direct = eventCounts.get(event.id);
  if (event.source_count !== direct) {
    errors.push(`event ${event.id}: stored ${event.source_count}, directly linked ${direct}`);
  }
}

if (errors.length > 0) {
  console.error("Source-count equality check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Source-count equality check passed.");
console.log(JSON.stringify({
  incidents: incidents.length,
  events: events.length,
  evidence: evidence.length,
  incident_mismatches: 0,
  event_mismatches: 0
}, null, 2));
