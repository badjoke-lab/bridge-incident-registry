import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const targetIds = ["bir_ev_000136", "bir_ev_000146", "bir_ev_000150", "bir_ev_000156", "bir_ev_000164"];
const bridgeById = new Map(bridges.map((record) => [record.id, record]));
const incidentById = new Map(incidents.map((record) => [record.id, record]));
const eventById = new Map(events.map((record) => [record.id, record]));

const missingTierOne = events.filter((event) => !evidence.some((source) => source.event_id === event.id && source.source_tier === "tier_1"));
if (missingTierOne.length !== 11) throw new Error(`unexpected Tier 1 gap baseline: ${missingTierOne.length}`);
for (const id of targetIds) {
  if (!missingTierOne.some((event) => event.id === id)) throw new Error(`target is not a current Tier 1 gap: ${id}`);
}

const intentionalSecondary = missingTierOne.filter((event) => !targetIds.includes(event.id));
if (intentionalSecondary.length !== 6) throw new Error(`unexpected intentional-secondary count: ${intentionalSecondary.length}`);

const esc = (value) => String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
function table(records, includeEvent = false) {
  if (!records.length) return "_None._\n";
  const header = includeEvent
    ? "| ID | Event | Tier | Primary | Official | Scope | Supports | Title | URL |\n|---|---|---|---|---|---|---|---|---|"
    : "| ID | Tier | Primary | Official | Scope | Supports | Title | URL |\n|---|---|---|---|---|---|---|---|";
  const rows = records.map((source) => {
    const supports = [
      source.supports_amount && "amount",
      source.supports_recovery && "recovery",
      source.supports_reimbursement && "reimbursement",
      source.supports_reopen && "reopen",
      source.supports_shutdown && "shutdown",
      source.supports_migration && "migration"
    ].filter(Boolean).join(", ") || "—";
    const values = [
      `\`${source.id}\``,
      source.source_tier,
      source.is_primary ? "yes" : "no",
      source.is_official_domain ? "yes" : "no",
      source.claim_scope,
      supports,
      esc(source.title),
      source.url
    ];
    if (includeEvent) values.splice(1, 0, source.event_id ? `\`${source.event_id}\`` : "—");
    return `| ${values.join(" | ")} |`;
  });
  return `${header}\n${rows.join("\n")}\n`;
}

const lines = [
  "# Final event Tier 1 review inventory",
  "",
  "Status: temporary generated inventory",
  "",
  "## Baseline",
  "",
  "```text",
  `Events                         ${events.length}`,
  `Evidence                       ${evidence.length}`,
  `Events without Tier 1 evidence ${missingTierOne.length}`,
  `Previously intentional gaps    ${intentionalSecondary.length}`,
  `Final unreviewed targets        ${targetIds.length}`,
  "```",
  ""
];

for (const id of targetIds) {
  const event = eventById.get(id);
  const bridge = bridgeById.get(event.bridge_id);
  const incident = event.incident_id ? incidentById.get(event.incident_id) : null;
  const direct = evidence.filter((source) => source.event_id === id);
  const alternatives = evidence.filter((source) => {
    if (source.source_tier !== "tier_1" || source.event_id === id) return false;
    return event.incident_id ? source.incident_id === event.incident_id : source.bridge_id === event.bridge_id;
  });
  lines.push(
    `## ${event.id} — ${event.title}`,
    "",
    `- Bridge: \`${event.bridge_id}\` — ${bridge?.canonical_name ?? "unknown"}`,
    `- Bridge status: \`${bridge?.status ?? "unknown"}\``,
    `- Incident: ${incident ? `\`${incident.id}\` — ${incident.title}` : "none"}`,
    `- Event type: \`${event.event_type}\``,
    `- Date: ${event.event_date} (${event.event_date_precision})`,
    `- Impact: \`${event.impact_level}\``,
    `- Stored source_count: ${event.source_count}`,
    `- Description: ${event.description}`,
    "",
    "### Direct evidence",
    "",
    table(direct),
    "### Tier 1 evidence linked elsewhere",
    "",
    table(alternatives, true),
    ""
  );
}

lines.push(
  "## Previously documented intentional secondary gaps",
  "",
  "```text",
  ...intentionalSecondary.map((event) => event.id).sort(),
  "```",
  ""
);

const output = "docs/audits/.event-tier1-review-final.md";
fs.writeFileSync(path.join(root, output), `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote ${output}.`);
console.log(`Targets: ${targetIds.join(", ")}`);
