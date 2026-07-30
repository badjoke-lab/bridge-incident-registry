import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const bridgeById = new Map(bridges.map((record) => [record.id, record]));
const incidentById = new Map(incidents.map((record) => [record.id, record]));
const evidenceByEvent = new Map(events.map((record) => [record.id, []]));
for (const source of evidence) {
  if (source.event_id && evidenceByEvent.has(source.event_id)) evidenceByEvent.get(source.event_id).push(source);
}

const intentionalSecondary = new Set([
  "bir_ev_000006",
  "bir_ev_000009",
  "bir_ev_000012",
  "bir_ev_000051"
]);
const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const impactRank = new Map([["critical", 0], ["major", 1], ["high", 2], ["medium", 3], ["low", 4]]);

const missingTierOne = events.filter((event) =>
  !(evidenceByEvent.get(event.id) ?? []).some((source) => source.source_tier === "tier_1")
);
if (missingTierOne.length !== 19) {
  throw new Error(`unexpected event Tier 1 gap baseline: ${missingTierOne.length}`);
}

const unreviewed = missingTierOne.filter((event) => !intentionalSecondary.has(event.id));
if (unreviewed.length !== 15) {
  throw new Error(`unexpected unreviewed gap baseline: ${unreviewed.length}`);
}

function priority(event) {
  const incident = event.incident_id ? incidentById.get(event.incident_id) : null;
  const bridge = bridgeById.get(event.bridge_id);
  return [
    incident ? 0 : 1,
    incident?.is_major_incident ? 0 : 1,
    terminalStatuses.has(bridge?.status) ? 0 : 1,
    impactRank.get(event.impact_level) ?? 9,
    Number(event.id.match(/(\d+)$/)?.[1] ?? 999999)
  ];
}

function comparePriority(a, b) {
  const left = priority(a);
  const right = priority(b);
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return a.id.localeCompare(b.id);
}

const targets = [...unreviewed].sort(comparePriority).slice(0, 10);
const remaining = unreviewed.filter((event) => !targets.some((target) => target.id === event.id));

function esc(value) {
  return String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function evidenceTable(records, includeCurrentEvent = false) {
  if (records.length === 0) return "_None._\n";
  const header = includeCurrentEvent
    ? "| ID | Current event | Tier | Primary | Official | Scope | Supports | Title | URL |\n|---|---|---|---|---|---|---|---|---|"
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
    const common = [
      `\`${source.id}\``,
      source.source_tier,
      source.is_primary ? "yes" : "no",
      source.is_official_domain ? "yes" : "no",
      source.claim_scope,
      supports,
      esc(source.title),
      source.url
    ];
    if (includeCurrentEvent) common.splice(1, 0, source.event_id ? `\`${source.event_id}\`` : "—");
    return `| ${common.join(" | ")} |`;
  });
  return `${header}\n${rows.join("\n")}\n`;
}

const lines = [
  "# Event Tier 1 review Batch 2 inventory",
  "",
  "Status: temporary generated inventory",
  "",
  "## Baseline",
  "",
  "```text",
  `Events                         ${events.length}`,
  `Evidence                       ${evidence.length}`,
  `Events without Tier 1 evidence ${missingTierOne.length}`,
  `Intentional secondary events    ${intentionalSecondary.size}`,
  `Unreviewed gaps                 ${unreviewed.length}`,
  `Batch targets                   ${targets.length}`,
  `Remaining after target window   ${remaining.length}`,
  "```",
  "",
  "## Targets",
  "",
  "```text",
  ...targets.map((event) => event.id),
  "```",
  ""
];

for (const event of targets) {
  const bridge = bridgeById.get(event.bridge_id);
  const incident = event.incident_id ? incidentById.get(event.incident_id) : null;
  const direct = evidenceByEvent.get(event.id) ?? [];
  const alternatives = evidence.filter((source) => {
    if (source.source_tier !== "tier_1" || source.event_id === event.id) return false;
    if (event.incident_id) return source.incident_id === event.incident_id;
    return source.bridge_id === event.bridge_id;
  });

  lines.push(
    `## ${event.id} — ${event.title}`,
    "",
    `- Bridge: \`${event.bridge_id}\` — ${bridge?.canonical_name ?? "unknown"}`,
    `- Bridge status: \`${bridge?.status ?? "unknown"}\``,
    `- Incident: ${incident ? `\`${incident.id}\` — ${incident.title}` : "none"}`,
    `- Major incident: ${incident?.is_major_incident ? "yes" : "no"}`,
    `- Event type: \`${event.event_type}\``,
    `- Date: ${event.event_date} (${event.event_date_precision})`,
    `- Impact: \`${event.impact_level}\``,
    `- Stored source_count: ${event.source_count}`,
    `- Direct evidence: ${direct.length}`,
    `- Tier 1 alternatives in ${event.incident_id ? "same incident" : "same bridge"}: ${alternatives.length}`,
    `- Description: ${event.description}`,
    "",
    "### Direct evidence",
    "",
    evidenceTable(direct),
    "### Tier 1 evidence linked elsewhere",
    "",
    evidenceTable(alternatives, true),
    ""
  );
}

lines.push(
  "## Remaining unreviewed event Tier 1 gaps",
  "",
  "```text",
  ...remaining.map((event) => event.id),
  "```",
  "",
  "## Intentional secondary events retained from Batch 1",
  "",
  "```text",
  ...[...intentionalSecondary].sort(),
  "```",
  ""
);

const target = path.join(root, "docs/audits/.event-tier1-review-batch2.md");
fs.writeFileSync(target, `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote ${path.relative(root, target)} with ${targets.length} targets.`);
console.log(`Targets: ${targets.map((event) => event.id).join(", ")}`);
