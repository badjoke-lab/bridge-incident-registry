import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const bridgesById = new Map(bridges.map((item) => [item.id, item]));
const incidentsById = new Map(incidents.map((item) => [item.id, item]));
const eventsById = new Map(events.map((item) => [item.id, item]));

const evidenceByBridge = new Map(bridges.map((item) => [item.id, []]));
const evidenceByIncident = new Map(incidents.map((item) => [item.id, []]));
const evidenceByEvent = new Map(events.map((item) => [item.id, []]));

for (const source of evidence) {
  evidenceByBridge.get(source.bridge_id)?.push(source);
  if (source.incident_id) evidenceByIncident.get(source.incident_id)?.push(source);
  if (source.event_id) evidenceByEvent.get(source.event_id)?.push(source);
}

const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const riskyHosts = new Set([
  "x.com",
  "twitter.com",
  "medium.com",
  "mirror.xyz",
  "substack.com",
  "docs.google.com",
  "notion.site"
]);

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "invalid-url";
  }
}

function hasArchive(source) {
  return typeof source.archived_url === "string" && source.archived_url.trim().length > 0;
}

function isPrimary(source) {
  return source.is_primary === true;
}

function isTierOne(source) {
  return source.source_tier === "tier_1";
}

function isOfficial(source) {
  return source.is_official_domain === true;
}

function countBy(values, keyFn) {
  const counts = new Map();
  for (const value of values) {
    const key = keyFn(value);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Object.fromEntries([...counts.entries()].sort(([a], [b]) => String(a).localeCompare(String(b))));
}

function coverage(records, evidenceMap) {
  const withoutPrimary = [];
  const withoutTierOne = [];
  const withoutOfficial = [];
  const withArchivedEvidence = [];

  for (const record of records) {
    const sources = evidenceMap.get(record.id) ?? [];
    if (!sources.some(isPrimary)) withoutPrimary.push(record.id);
    if (!sources.some(isTierOne)) withoutTierOne.push(record.id);
    if (!sources.some(isOfficial)) withoutOfficial.push(record.id);
    if (sources.some(hasArchive)) withArchivedEvidence.push(record.id);
  }

  return {
    total: records.length,
    withoutPrimary,
    withoutTierOne,
    withoutOfficial,
    withArchivedEvidence
  };
}

function listBlock(items, limit = 100) {
  if (items.length === 0) return "None.";
  const shown = items.slice(0, limit);
  const lines = shown.map((item) => `- \`${item}\``);
  if (items.length > shown.length) lines.push(`- ... ${items.length - shown.length} more`);
  return lines.join("\n");
}

function recordLine(record, sources) {
  const primary = sources.filter(isPrimary).length;
  const tierOne = sources.filter(isTierOne).length;
  const official = sources.filter(isOfficial).length;
  const archived = sources.filter(hasArchive).length;
  const title = record.title ?? record.name ?? "untitled";
  return `| \`${record.id}\` | ${String(title).replaceAll("|", "\\|")} | ${sources.length} | ${primary} | ${tierOne} | ${official} | ${archived} |`;
}

const bridgeCoverage = coverage(bridges, evidenceByBridge);
const incidentCoverage = coverage(incidents, evidenceByIncident);
const eventCoverage = coverage(events, evidenceByEvent);

const primaryCount = evidence.filter(isPrimary).length;
const tierOneCount = evidence.filter(isTierOne).length;
const officialCount = evidence.filter(isOfficial).length;
const archivedCount = evidence.filter(hasArchive).length;

const terminalUnarchived = evidence.filter((source) => {
  const bridge = bridgesById.get(source.bridge_id);
  return bridge && terminalStatuses.has(bridge.status) && !hasArchive(source);
});

const riskyUnarchived = evidence.filter((source) => riskyHosts.has(hostOf(source.url)) && !hasArchive(source));
const socialUnarchived = evidence.filter((source) => ["x.com", "twitter.com"].includes(hostOf(source.url)) && !hasArchive(source));
const nonLiveWithoutArchive = evidence.filter((source) => source.url_status !== "live" && !hasArchive(source));

const urlGroups = new Map();
for (const source of evidence) {
  const normalized = String(source.url).trim().replace(/\/$/, "");
  if (!urlGroups.has(normalized)) urlGroups.set(normalized, []);
  urlGroups.get(normalized).push(source);
}
const repeatedUrls = [...urlGroups.entries()]
  .filter(([, sources]) => sources.length > 1)
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

const primaryGapEvents = events
  .filter((event) => !(evidenceByEvent.get(event.id) ?? []).some(isPrimary))
  .sort((a, b) => {
    const aTier = (evidenceByEvent.get(a.id) ?? []).some(isTierOne) ? 1 : 0;
    const bTier = (evidenceByEvent.get(b.id) ?? []).some(isTierOne) ? 1 : 0;
    return aTier - bTier || a.id.localeCompare(b.id);
  });

const tierOneGapEvents = events
  .filter((event) => !(evidenceByEvent.get(event.id) ?? []).some(isTierOne))
  .sort((a, b) => a.id.localeCompare(b.id));

const primaryGapIncidents = incidents
  .filter((incident) => !(evidenceByIncident.get(incident.id) ?? []).some(isPrimary))
  .sort((a, b) => a.id.localeCompare(b.id));

const archivePriority = [...new Map(
  [...terminalUnarchived, ...riskyUnarchived].map((source) => [source.id, source])
).values()].sort((a, b) => {
  const aTerminal = terminalStatuses.has(bridgesById.get(a.bridge_id)?.status) ? 0 : 1;
  const bTerminal = terminalStatuses.has(bridgesById.get(b.bridge_id)?.status) ? 0 : 1;
  return aTerminal - bTerminal || a.id.localeCompare(b.id);
});

const lines = [];
lines.push("# Phase 3 source-quality baseline inventory");
lines.push("");
lines.push("Status: temporary generated inventory");
lines.push("");
lines.push("## Corpus totals");
lines.push("");
lines.push("```text");
lines.push(`Bridges                 ${bridges.length}`);
lines.push(`Incidents               ${incidents.length}`);
lines.push(`Events                 ${events.length}`);
lines.push(`Evidence               ${evidence.length}`);
lines.push(`Primary evidence        ${primaryCount}`);
lines.push(`Tier 1 evidence         ${tierOneCount}`);
lines.push(`Official-domain evidence ${officialCount}`);
lines.push(`Evidence with archive   ${archivedCount}`);
lines.push("```");
lines.push("");
lines.push("## Evidence distributions");
lines.push("");
lines.push("```json");
lines.push(JSON.stringify({
  source_tier: countBy(evidence, (source) => source.source_tier),
  reliability: countBy(evidence, (source) => source.reliability),
  url_status: countBy(evidence, (source) => source.url_status),
  source_type: countBy(evidence, (source) => source.source_type)
}, null, 2));
lines.push("```");
lines.push("");
lines.push("## Coverage gaps");
lines.push("");
lines.push("```text");
lines.push(`Bridges without primary evidence    ${bridgeCoverage.withoutPrimary.length}`);
lines.push(`Bridges without tier 1 evidence     ${bridgeCoverage.withoutTierOne.length}`);
lines.push(`Bridges without official evidence   ${bridgeCoverage.withoutOfficial.length}`);
lines.push(`Incidents without primary evidence  ${incidentCoverage.withoutPrimary.length}`);
lines.push(`Incidents without tier 1 evidence   ${incidentCoverage.withoutTierOne.length}`);
lines.push(`Incidents without official evidence ${incidentCoverage.withoutOfficial.length}`);
lines.push(`Events without primary evidence     ${eventCoverage.withoutPrimary.length}`);
lines.push(`Events without tier 1 evidence      ${eventCoverage.withoutTierOne.length}`);
lines.push(`Events without official evidence    ${eventCoverage.withoutOfficial.length}`);
lines.push("```");
lines.push("");
lines.push("## Archive-risk summary");
lines.push("");
lines.push("```text");
lines.push(`Terminal-bridge evidence without archive ${terminalUnarchived.length}`);
lines.push(`Risky-host evidence without archive      ${riskyUnarchived.length}`);
lines.push(`X/Twitter evidence without archive       ${socialUnarchived.length}`);
lines.push(`Non-live evidence without archive        ${nonLiveWithoutArchive.length}`);
lines.push(`Unique archive-priority evidence         ${archivePriority.length}`);
lines.push("```");
lines.push("");
lines.push("## Incidents without primary evidence");
lines.push("");
lines.push("| ID | Title | Sources | Primary | Tier 1 | Official | Archived |");
lines.push("|---|---|---:|---:|---:|---:|---:|");
for (const incident of primaryGapIncidents) {
  lines.push(recordLine(incident, evidenceByIncident.get(incident.id) ?? []));
}
if (primaryGapIncidents.length === 0) lines.push("| — | None | 0 | 0 | 0 | 0 | 0 |");
lines.push("");
lines.push("## Events without tier 1 evidence");
lines.push("");
lines.push("| ID | Title | Sources | Primary | Tier 1 | Official | Archived |");
lines.push("|---|---|---:|---:|---:|---:|---:|");
for (const event of tierOneGapEvents) {
  lines.push(recordLine(event, evidenceByEvent.get(event.id) ?? []));
}
if (tierOneGapEvents.length === 0) lines.push("| — | None | 0 | 0 | 0 | 0 | 0 |");
lines.push("");
lines.push("## Events without primary evidence");
lines.push("");
lines.push("| ID | Title | Sources | Primary | Tier 1 | Official | Archived |");
lines.push("|---|---|---:|---:|---:|---:|---:|");
for (const event of primaryGapEvents) {
  lines.push(recordLine(event, evidenceByEvent.get(event.id) ?? []));
}
if (primaryGapEvents.length === 0) lines.push("| — | None | 0 | 0 | 0 | 0 | 0 |");
lines.push("");
lines.push("## Archive-priority evidence");
lines.push("");
lines.push("| ID | Bridge | Status | Host | Source type | Event | Incident | URL |");
lines.push("|---|---|---|---|---|---|---|---|");
for (const source of archivePriority) {
  const bridge = bridgesById.get(source.bridge_id);
  const event = source.event_id ? eventsById.get(source.event_id) : null;
  const incident = source.incident_id ? incidentsById.get(source.incident_id) : null;
  lines.push(`| \`${source.id}\` | ${bridge?.name ?? source.bridge_id} | ${bridge?.status ?? "unknown"} | ${hostOf(source.url)} | ${source.source_type} | ${event?.id ?? "—"} | ${incident?.id ?? "—"} | ${source.url} |`);
}
if (archivePriority.length === 0) lines.push("| — | None | — | — | — | — | — | — |");
lines.push("");
lines.push("## Reused URLs");
lines.push("");
lines.push("```text");
lines.push(`Repeated normalized URLs ${repeatedUrls.length}`);
lines.push("```");
lines.push("");
for (const [url, sources] of repeatedUrls) {
  lines.push(`- ${url}`);
  lines.push(`  - evidence: ${sources.map((source) => source.id).join(", ")}`);
  lines.push(`  - events: ${[...new Set(sources.map((source) => source.event_id).filter(Boolean))].join(", ") || "none"}`);
}
lines.push("");
lines.push("## Raw gap IDs");
lines.push("");
lines.push("### Bridges without primary evidence");
lines.push("");
lines.push(listBlock(bridgeCoverage.withoutPrimary));
lines.push("");
lines.push("### Incidents without tier 1 evidence");
lines.push("");
lines.push(listBlock(incidentCoverage.withoutTierOne));
lines.push("");
lines.push("### Events without tier 1 evidence");
lines.push("");
lines.push(listBlock(eventCoverage.withoutTierOne));
lines.push("");

const outputPath = path.join(root, "docs/audits/.source-quality-baseline-inventory.md");
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);
console.log(`Wrote ${path.relative(root, outputPath)}`);
