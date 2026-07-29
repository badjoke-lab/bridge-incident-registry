import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const bridgeById = new Map(bridges.map((record) => [record.id, record]));
const incidentById = new Map(incidents.map((record) => [record.id, record]));
const eventById = new Map(events.map((record) => [record.id, record]));

const directCountByEvent = new Map(events.map((event) => [event.id, 0]));
for (const source of evidence) {
  if (source.event_id && directCountByEvent.has(source.event_id)) {
    directCountByEvent.set(source.event_id, directCountByEvent.get(source.event_id) + 1);
  }
}

const mismatches = events.filter((event) => event.source_count !== directCountByEvent.get(event.id));
if (mismatches.length !== 17) {
  throw new Error(`Expected 17 remaining event mismatches after Batch 3, received ${mismatches.length}`);
}

const targets = mismatches.slice(0, 10);
const supportFlags = [
  ["supports_amount", "amount"],
  ["supports_recovery", "recovery"],
  ["supports_reimbursement", "reimbursement"],
  ["supports_reopen", "reopen"],
  ["supports_shutdown", "shutdown"],
  ["supports_migration", "migration"],
];
const safe = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const supports = (source) => {
  const values = supportFlags.filter(([field]) => source[field] === true).map(([, label]) => label);
  return values.length ? values.join(", ") : "—";
};
const evidenceRow = (source, includeLinkage) => {
  const currentEvent = source.event_id ?? "—";
  const incident = source.incident_id ?? "—";
  const prefix = includeLinkage
    ? `| ${source.id} | ${currentEvent} | ${incident} |`
    : `| ${source.id} |`;
  return `${prefix} ${safe(source.claim_scope)} | ${supports(source)} | ${safe(source.title)} | ${safe(source.url)} |`;
};

const lines = [];
lines.push("# Source-count review Batch 4 inventory", "", "Status: temporary generated inventory", "");
lines.push(`Remaining mismatch baseline: ${mismatches.length}`, "");
lines.push("## Targets", "", "```text", ...targets.map((event) => event.id), "```", "");

for (const event of targets) {
  const bridge = bridgeById.get(event.bridge_id);
  const incident = event.incident_id ? incidentById.get(event.incident_id) : null;
  const direct = evidence.filter((source) => source.event_id === event.id);
  const alternatives = incident
    ? evidence.filter((source) => source.incident_id === incident.id && source.event_id !== event.id)
    : evidence.filter((source) => source.bridge_id === event.bridge_id && source.event_id !== event.id);
  const sameLabel = incident ? "Same-incident" : "Same-bridge";

  lines.push(`## ${event.id} — ${event.title}`, "");
  lines.push(`- Bridge: \`${event.bridge_id}\`${bridge ? ` — ${bridge.canonical_name ?? bridge.name ?? bridge.slug}` : ""}`);
  lines.push(`- Incident: ${incident ? `\`${incident.id}\` — ${incident.title}` : "\`null\` — not applicable"}`);
  lines.push(`- Event type: \`${event.event_type}\``);
  lines.push(`- Date: ${event.event_date} (${event.event_date_precision})`);
  lines.push(`- Stored source_count: ${event.source_count}`);
  lines.push(`- Direct evidence: ${direct.length}`);
  lines.push(`- ${sameLabel} alternatives: ${alternatives.length}`);
  lines.push(`- Description: ${event.description}`, "");

  lines.push("### Direct evidence", "");
  if (direct.length === 0) {
    lines.push("None.", "");
  } else {
    lines.push("| ID | Scope | Supports | Title | URL |", "|---|---|---|---|---|");
    for (const source of direct) lines.push(evidenceRow(source, false));
    lines.push("");
  }

  lines.push(`### ${sameLabel} evidence linked elsewhere`, "");
  if (alternatives.length === 0) {
    lines.push("None.", "");
  } else {
    lines.push("| ID | Current event | Incident | Scope | Supports | Title | URL |", "|---|---|---|---|---|---|---|");
    for (const source of alternatives) lines.push(evidenceRow(source, true));
    lines.push("");
  }
}

lines.push("## Remaining after this target window", "", "```text", ...mismatches.slice(10).map((event) => event.id), "```", "");

const output = path.join(root, "docs/audits/.source-count-review-batch4.md");
fs.writeFileSync(output, `${lines.join("\n")}\n`);
console.log(JSON.stringify({ mismatches: mismatches.length, targets: targets.map((event) => event.id), output }, null, 2));
