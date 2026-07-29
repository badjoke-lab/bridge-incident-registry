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
const evidenceByEvent = new Map(events.map((record) => [record.id, []]));
const evidenceByIncident = new Map(incidents.map((record) => [record.id, []]));
const evidenceByBridge = new Map(bridges.map((record) => [record.id, []]));

for (const source of evidence) {
  if (source.event_id) evidenceByEvent.get(source.event_id)?.push(source);
  if (source.incident_id) evidenceByIncident.get(source.incident_id)?.push(source);
  evidenceByBridge.get(source.bridge_id)?.push(source);
}

const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const tierOneGaps = events
  .filter((event) => !(evidenceByEvent.get(event.id) ?? []).some((source) => source.source_tier === "tier_1"))
  .sort((a, b) => {
    const aIncident = a.incident_id ? incidentById.get(a.incident_id) : null;
    const bIncident = b.incident_id ? incidentById.get(b.incident_id) : null;
    const aMajor = aIncident?.is_major_incident === true ? 0 : 1;
    const bMajor = bIncident?.is_major_incident === true ? 0 : 1;
    if (aMajor !== bMajor) return aMajor - bMajor;
    const aHasIncident = a.incident_id ? 0 : 1;
    const bHasIncident = b.incident_id ? 0 : 1;
    if (aHasIncident !== bHasIncident) return aHasIncident - bHasIncident;
    const aTerminal = terminalStatuses.has(bridgeById.get(a.bridge_id)?.status) ? 0 : 1;
    const bTerminal = terminalStatuses.has(bridgeById.get(b.bridge_id)?.status) ? 0 : 1;
    if (aTerminal !== bTerminal) return aTerminal - bTerminal;
    return a.id.localeCompare(b.id);
  });

if (tierOneGaps.length !== 25) {
  throw new Error(`expected 25 event Tier 1 gaps, received ${tierOneGaps.length}`);
}

const targets = tierOneGaps.slice(0, 10);
const remaining = tierOneGaps.slice(10);

function escapeCell(value) {
  return String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function sourceTable(sources, includeCurrentEvent = false) {
  if (sources.length === 0) return "None.\n";
  const lines = [];
  if (includeCurrentEvent) {
    lines.push("| ID | Current event | Tier | Primary | Official | Scope | Supports | Title | URL |");
    lines.push("|---|---|---|---|---|---|---|---|---|");
  } else {
    lines.push("| ID | Tier | Primary | Official | Scope | Supports | Title | URL |");
    lines.push("|---|---|---|---|---|---|---|---|");
  }
  for (const source of sources) {
    const supports = [
      source.supports_amount ? "amount" : null,
      source.supports_recovery ? "recovery" : null,
      source.supports_reimbursement ? "reimbursement" : null,
      source.supports_reopen ? "reopen" : null,
      source.supports_shutdown ? "shutdown" : null,
      source.supports_migration ? "migration" : null
    ].filter(Boolean).join(", ") || "—";
    const cells = [
      `\`${source.id}\``,
      ...(includeCurrentEvent ? [source.event_id ? `\`${source.event_id}\`` : "—"] : []),
      source.source_tier,
      source.is_primary === true ? "yes" : "no",
      source.is_official_domain === true ? "yes" : "no",
      source.claim_scope,
      supports,
      escapeCell(source.title),
      source.url
    ];
    lines.push(`| ${cells.join(" | ")} |`);
  }
  return `${lines.join("\n")}\n`;
}

const lines = [];
lines.push("# Event Tier 1 review Batch 1 inventory");
lines.push("");
lines.push("Status: temporary generated inventory");
lines.push("");
lines.push("## Baseline");
lines.push("");
lines.push("```text");
lines.push(`Events                         ${events.length}`);
lines.push(`Evidence                       ${evidence.length}`);
lines.push(`Events without Tier 1 evidence ${tierOneGaps.length}`);
lines.push(`Batch targets                  ${targets.length}`);
lines.push(`Remaining after target window  ${remaining.length}`);
lines.push("```");
lines.push("");
lines.push("## Targets");
lines.push("");
lines.push("```text");
for (const event of targets) lines.push(event.id);
lines.push("```");
lines.push("");

for (const event of targets) {
  const bridge = bridgeById.get(event.bridge_id);
  const incident = event.incident_id ? incidentById.get(event.incident_id) : null;
  const direct = evidenceByEvent.get(event.id) ?? [];
  const alternatives = (incident
    ? evidenceByIncident.get(incident.id) ?? []
    : evidenceByBridge.get(event.bridge_id) ?? [])
    .filter((source) => source.source_tier === "tier_1" && source.event_id !== event.id)
    .sort((a, b) => a.id.localeCompare(b.id));

  lines.push(`## ${event.id} — ${event.title}`);
  lines.push("");
  lines.push(`- Bridge: \`${event.bridge_id}\` — ${bridge?.name ?? "unknown"}`);
  lines.push(`- Bridge status: \`${bridge?.status ?? "unknown"}\``);
  lines.push(`- Incident: ${incident ? `\`${incident.id}\` — ${incident.title}` : "not applicable"}`);
  lines.push(`- Major incident: ${incident?.is_major_incident === true ? "yes" : "no"}`);
  lines.push(`- Event type: \`${event.event_type}\``);
  lines.push(`- Date: ${event.event_date} (${event.event_date_precision})`);
  lines.push(`- Stored source_count: ${event.source_count ?? "null"}`);
  lines.push(`- Direct evidence: ${direct.length}`);
  lines.push(`- Tier 1 alternatives in ${incident ? "same incident" : "same bridge"}: ${alternatives.length}`);
  lines.push(`- Description: ${event.description}`);
  lines.push("");
  lines.push("### Direct evidence");
  lines.push("");
  lines.push(sourceTable(direct));
  lines.push("### Tier 1 evidence linked elsewhere");
  lines.push("");
  lines.push(sourceTable(alternatives, true));
}

lines.push("## Remaining event Tier 1 gaps");
lines.push("");
lines.push("```text");
for (const event of remaining) lines.push(event.id);
lines.push("```");
lines.push("");

const output = path.join(root, "docs/audits/.event-tier1-review-batch1.md");
fs.writeFileSync(output, `${lines.join("\n")}\n`);
console.log(`Wrote ${path.relative(root, output)}`);
console.log(`Targets: ${targets.map((event) => event.id).join(", ")}`);
