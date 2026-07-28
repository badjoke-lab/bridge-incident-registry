import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

const events = read("data/events.json");
const incidents = read("data/incidents.json");
const evidence = read("data/evidence.json");

const targetIds = [
  "bir_ev_000013",
  "bir_ev_000014",
  "bir_ev_000016",
  "bir_ev_000017",
  "bir_ev_000021",
  "bir_ev_000030",
  "bir_ev_000032",
  "bir_ev_000034",
  "bir_ev_000035",
  "bir_ev_000037"
];

const eventById = new Map(events.map((item) => [item.id, item]));
const incidentById = new Map(incidents.map((item) => [item.id, item]));

const escape = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const boolFlags = (source) => [
  source.supports_amount && "amount",
  source.supports_recovery && "recovery",
  source.supports_reimbursement && "reimbursement",
  source.supports_reopen && "reopen",
  source.supports_shutdown && "shutdown",
  source.supports_migration && "migration"
].filter(Boolean).join(", ") || "—";

const lines = [
  "# Source-count review Batch 1 inventory",
  "",
  "Status: generated review inventory",
  "",
  "This document lists direct and incident-scoped canonical evidence for the first ten unresolved event `source_count` mismatches. It does not authorize canonical changes.",
  ""
];

for (const id of targetIds) {
  const event = eventById.get(id);
  if (!event) throw new Error(`Missing target event ${id}`);
  const incident = incidentById.get(event.incident_id);
  const direct = evidence.filter((source) => source.event_id === event.id);
  const incidentScoped = evidence.filter((source) => source.incident_id === event.incident_id);
  const candidates = incidentScoped.filter((source) => source.event_id !== event.id);

  lines.push(`## ${event.id} — ${event.title}`);
  lines.push("");
  lines.push(`- Incident: \`${event.incident_id}\` — ${incident?.title ?? "unknown"}`);
  lines.push(`- Event type: \`${event.event_type}\``);
  lines.push(`- Date: ${event.event_date} (${event.event_date_precision})`);
  lines.push(`- Stored source_count: ${event.source_count}`);
  lines.push(`- Direct evidence records: ${direct.length}`);
  lines.push(`- Incident-scoped evidence records: ${incidentScoped.length}`);
  lines.push(`- Description: ${event.description}`);
  lines.push("");
  lines.push("### Direct evidence");
  lines.push("");
  if (direct.length === 0) {
    lines.push("None.");
  } else {
    lines.push("| ID | Type | Claim scope | Supports | Title | URL |");
    lines.push("|---|---|---|---|---|---|");
    for (const source of direct) {
      lines.push(`| ${escape(source.id)} | ${escape(source.source_type)} | ${escape(source.claim_scope)} | ${escape(boolFlags(source))} | ${escape(source.title)} | ${escape(source.url)} |`);
    }
  }
  lines.push("");
  lines.push("### Same-incident evidence linked elsewhere or unscoped");
  lines.push("");
  if (candidates.length === 0) {
    lines.push("None.");
  } else {
    lines.push("| ID | Current event | Type | Claim scope | Supports | Title | URL |");
    lines.push("|---|---|---|---|---|---|---|");
    for (const source of candidates) {
      lines.push(`| ${escape(source.id)} | ${escape(source.event_id)} | ${escape(source.source_type)} | ${escape(source.claim_scope)} | ${escape(boolFlags(source))} | ${escape(source.title)} | ${escape(source.url)} |`);
    }
  }
  lines.push("");
}

lines.push("## Review rule");
lines.push("");
lines.push("For each event, decide whether to add an event-scoped evidence record, relink an incorrectly scoped record, reduce the stale count, or revise the event. A source URL may be duplicated only when the new evidence record has a distinct event or claim-scope linkage.");
lines.push("");

fs.writeFileSync(path.join(root, "docs/audits/.source-count-review-batch1.md"), `${lines.join("\n")}\n`);
console.log(JSON.stringify({ targets: targetIds.length, output: "docs/audits/.source-count-review-batch1.md" }));
