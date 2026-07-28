import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");
const bridges = read("data/bridges.json");

const reimbursementTargets = new Set([
  "bir_inc_000001",
  "bir_inc_000002",
  "bir_inc_000010",
  "bir_inc_000011",
  "bir_inc_000014"
]);

const reopenTargets = new Set([
  "bir_inc_000001",
  "bir_inc_000002",
  "bir_inc_000005",
  "bir_inc_000006",
  "bir_inc_000010",
  "bir_inc_000011",
  "bir_inc_000013",
  "bir_inc_000014",
  "bir_inc_000015",
  "bir_inc_000016",
  "bir_inc_000017",
  "bir_inc_000018",
  "bir_inc_000019",
  "bir_inc_000020",
  "bir_inc_000025"
]);

const targetIds = new Set([...reimbursementTargets, ...reopenTargets]);
const incidentById = new Map(incidents.map((item) => [item.id, item]));
const bridgeById = new Map(bridges.map((item) => [item.id, item]));
const eventsByIncident = new Map();
const evidenceByIncident = new Map();
const evidenceByEvent = new Map();

for (const id of targetIds) {
  eventsByIncident.set(id, []);
  evidenceByIncident.set(id, []);
}

for (const event of events) {
  if (targetIds.has(event.incident_id)) eventsByIncident.get(event.incident_id).push(event);
}

for (const source of evidence) {
  if (targetIds.has(source.incident_id)) evidenceByIncident.get(source.incident_id).push(source);
  if (source.event_id) {
    if (!evidenceByEvent.has(source.event_id)) evidenceByEvent.set(source.event_id, []);
    evidenceByEvent.get(source.event_id).push(source);
  }
}

function safe(value) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value).replaceAll("|", "\\|");
}

const lines = [
  "# Phase 3 aftermath source inventory",
  "",
  "Generated from the canonical 33 / 34 / 173 / 199 corpus.",
  "",
  "This is a temporary source-reading inventory. It is not a canonical-data decision.",
  ""
];

for (const id of [...targetIds].sort()) {
  const incident = incidentById.get(id);
  if (!incident) throw new Error(`Missing target incident ${id}`);
  const bridge = bridgeById.get(incident.bridge_id);
  const linkedEvents = [...(eventsByIncident.get(id) ?? [])].sort((a, b) => {
    const dateCompare = String(a.event_date ?? "").localeCompare(String(b.event_date ?? ""));
    return dateCompare || a.id.localeCompare(b.id);
  });
  const directEvidence = evidenceByIncident.get(id) ?? [];
  const evidenceMap = new Map(directEvidence.map((source) => [source.id, source]));
  for (const event of linkedEvents) {
    for (const source of evidenceByEvent.get(event.id) ?? []) evidenceMap.set(source.id, source);
  }
  const linkedEvidence = [...evidenceMap.values()].sort((a, b) => a.id.localeCompare(b.id));

  lines.push(`## ${id} — ${incident.title}`);
  lines.push("");
  lines.push(`- Bridge: ${bridge?.canonical_name ?? incident.bridge_id} (${incident.bridge_id})`);
  lines.push(`- Incident date: ${incident.incident_date}`);
  lines.push(`- Reimbursement: ${incident.reimbursement_status}`);
  lines.push(`- Restart: ${incident.restart_status}`);
  lines.push(`- Recovery: ${incident.recovery_status}`);
  lines.push(`- Needs reimbursement-completed review: ${reimbursementTargets.has(id) ? "yes" : "no"}`);
  lines.push(`- Needs reopened-event review: ${reopenTargets.has(id) ? "yes" : "no"}`);
  lines.push(`- Known unknowns: ${(incident.known_unknowns ?? []).join(" / ") || "—"}`);
  lines.push("");
  lines.push("### Existing events");
  lines.push("");
  lines.push("| ID | Date | Type | Title | Sources |");
  lines.push("|---|---|---|---|---:|");
  if (linkedEvents.length === 0) lines.push("| — | — | — | — | 0 |");
  for (const event of linkedEvents) {
    lines.push(`| ${event.id} | ${safe(event.event_date)} | ${safe(event.event_type)} | ${safe(event.title)} | ${safe(event.source_count)} |`);
  }
  lines.push("");
  lines.push("### Linked evidence");
  lines.push("");
  lines.push("| ID | Event | Primary | Tier | Publisher | Title | URL | Archive |");
  lines.push("|---|---|---|---|---|---|---|---|");
  if (linkedEvidence.length === 0) lines.push("| — | — | — | — | — | — | — | — |");
  for (const source of linkedEvidence) {
    lines.push(`| ${source.id} | ${safe(source.event_id)} | ${safe(source.is_primary)} | ${safe(source.source_tier)} | ${safe(source.publisher)} | ${safe(source.title)} | ${safe(source.url)} | ${safe(source.archived_url)} |`);
  }
  lines.push("");
}

const output = path.join(root, "docs/audits/.phase3-aftermath-source-inventory.md");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${lines.join("\n")}\n`);
console.log(`Wrote ${output}`);
