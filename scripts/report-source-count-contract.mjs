import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const eventsByIncident = new Map(incidents.map((i) => [i.id, []]));
for (const event of events) if (event.incident_id) eventsByIncident.get(event.incident_id)?.push(event);

const evidenceByIncident = new Map(incidents.map((i) => [i.id, []]));
const evidenceByEvent = new Map(events.map((e) => [e.id, []]));
for (const source of evidence) {
  if (source.incident_id) evidenceByIncident.get(source.incident_id)?.push(source);
  if (source.event_id) evidenceByEvent.get(source.event_id)?.push(source);
}

const unique = (items, key) => new Set(items.map((item) => item[key]).filter(Boolean)).size;
const rows = [];

for (const incident of incidents) {
  const direct = evidenceByIncident.get(incident.id) ?? [];
  const eventIds = new Set((eventsByIncident.get(incident.id) ?? []).map((e) => e.id));
  const eventLinked = evidence.filter((s) => eventIds.has(s.event_id));
  const union = [...new Map([...direct, ...eventLinked].map((s) => [s.id, s])).values()];
  rows.push({
    kind: "incident",
    id: incident.id,
    stored: incident.source_count,
    direct_records: direct.length,
    event_union_records: union.length,
    direct_unique_urls: unique(direct, "url"),
    union_unique_urls: unique(union, "url"),
    matches_direct_records: incident.source_count === direct.length,
    matches_union_records: incident.source_count === union.length,
    matches_direct_urls: incident.source_count === unique(direct, "url"),
    matches_union_urls: incident.source_count === unique(union, "url")
  });
}

for (const event of events) {
  const direct = evidenceByEvent.get(event.id) ?? [];
  rows.push({
    kind: "event",
    id: event.id,
    stored: event.source_count,
    direct_records: direct.length,
    direct_unique_urls: unique(direct, "url"),
    matches_direct_records: event.source_count === direct.length,
    matches_direct_urls: event.source_count === unique(direct, "url")
  });
}

const mismatches = rows.filter((row) => !row.matches_direct_records);
const summary = {
  counts: {
    incidents: incidents.length,
    events: events.length,
    evidence: evidence.length,
    mismatches: mismatches.length,
    incident_mismatches: mismatches.filter((r) => r.kind === "incident").length,
    event_mismatches: mismatches.filter((r) => r.kind === "event").length
  },
  pattern_counts: {
    incident_matches_direct_records: rows.filter((r) => r.kind === "incident" && r.matches_direct_records).length,
    incident_matches_union_records: rows.filter((r) => r.kind === "incident" && r.matches_union_records).length,
    incident_matches_direct_urls: rows.filter((r) => r.kind === "incident" && r.matches_direct_urls).length,
    incident_matches_union_urls: rows.filter((r) => r.kind === "incident" && r.matches_union_urls).length,
    event_matches_direct_records: rows.filter((r) => r.kind === "event" && r.matches_direct_records).length,
    event_matches_direct_urls: rows.filter((r) => r.kind === "event" && r.matches_direct_urls).length
  },
  mismatches
};

const outDir = path.join(root, "docs/audits");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, ".source-count-contract.json"), `${JSON.stringify(summary, null, 2)}\n`);

const md = [
  "# Source-count contract inventory",
  "",
  "```json",
  JSON.stringify(summary.counts, null, 2),
  "```",
  "",
  "## Pattern counts",
  "",
  "```json",
  JSON.stringify(summary.pattern_counts, null, 2),
  "```",
  "",
  "## Mismatches",
  "",
  "| Kind | ID | Stored | Direct records | Event-union records | Direct URLs | Union URLs |",
  "|---|---|---:|---:|---:|---:|---:|",
  ...mismatches.map((r) => `| ${r.kind} | ${r.id} | ${r.stored} | ${r.direct_records} | ${r.event_union_records ?? "—"} | ${r.direct_unique_urls} | ${r.union_unique_urls ?? "—"} |`)
].join("\n");
fs.writeFileSync(path.join(outDir, ".source-count-contract.md"), `${md}\n`);
console.log(JSON.stringify(summary.counts));
