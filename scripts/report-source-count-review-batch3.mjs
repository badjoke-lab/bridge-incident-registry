import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const events = read("data/events.json");
const incidents = read("data/incidents.json");
const evidence = read("data/evidence.json");

const directCounts = new Map(events.map((event) => [event.id, 0]));
for (const source of evidence) {
  if (source.event_id && directCounts.has(source.event_id)) directCounts.set(source.event_id, directCounts.get(source.event_id) + 1);
}
const mismatches = events.filter((event) => event.source_count !== directCounts.get(event.id));
if (mismatches.length !== 27) throw new Error(`Expected 27 mismatches, received ${mismatches.length}`);
const targets = mismatches.slice(0, 10);
const incidentById = new Map(incidents.map((incident) => [incident.id, incident]));
const escape = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
const flags = (source) => [source.supports_amount && "amount", source.supports_recovery && "recovery", source.supports_reimbursement && "reimbursement", source.supports_reopen && "reopen", source.supports_shutdown && "shutdown", source.supports_migration && "migration"].filter(Boolean).join(", ") || "—";

const lines = ["# Source-count review Batch 3 inventory", "", "Status: temporary generated inventory", "", `Remaining mismatch baseline: ${mismatches.length}`, "", "## Targets", "", "```text", ...targets.map((event) => event.id), "```", ""];
for (const event of targets) {
  const direct = evidence.filter((source) => source.event_id === event.id);
  const scopeLabel = event.incident_id ? "Same-incident" : "Same-bridge";
  const alternatives = evidence.filter((source) => {
    if (source.event_id === event.id) return false;
    return event.incident_id
      ? source.incident_id === event.incident_id
      : source.bridge_id === event.bridge_id;
  });
  lines.push(`## ${event.id} — ${event.title}`, "", `- Bridge: \`${event.bridge_id}\``, `- Incident: \`${event.incident_id}\` — ${incidentById.get(event.incident_id)?.title ?? "not applicable"}`, `- Event type: \`${event.event_type}\``, `- Date: ${event.event_date} (${event.event_date_precision})`, `- Stored source_count: ${event.source_count}`, `- Direct evidence: ${direct.length}`, `- ${scopeLabel} alternatives: ${alternatives.length}`, `- Description: ${event.description}`, "", "### Direct evidence", "");
  if (!direct.length) lines.push("None.");
  else {
    lines.push("| ID | Scope | Supports | Title | URL |", "|---|---|---|---|---|");
    for (const source of direct) lines.push(`| ${escape(source.id)} | ${escape(source.claim_scope)} | ${escape(flags(source))} | ${escape(source.title)} | ${escape(source.url)} |`);
  }
  lines.push("", `### ${scopeLabel} evidence linked elsewhere`, "");
  if (!alternatives.length) lines.push("None.");
  else {
    lines.push("| ID | Current event | Incident | Scope | Supports | Title | URL |", "|---|---|---|---|---|---|---|");
    for (const source of alternatives) lines.push(`| ${escape(source.id)} | ${escape(source.event_id)} | ${escape(source.incident_id)} | ${escape(source.claim_scope)} | ${escape(flags(source))} | ${escape(source.title)} | ${escape(source.url)} |`);
  }
  lines.push("");
}
fs.writeFileSync(path.join(root, "docs/audits/.source-count-review-batch3.md"), `${lines.join("\n")}\n`);
console.log(JSON.stringify({ mismatch_total: mismatches.length, targets: targets.map((event) => event.id) }, null, 2));
