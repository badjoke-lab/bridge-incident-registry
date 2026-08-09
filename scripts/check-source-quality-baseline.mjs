import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.BIR_QUALITY_ROOT ?? process.cwd());
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const bridgesById = new Map(bridges.map((item) => [item.id, item]));
const evidenceByBridge = new Map(bridges.map((item) => [item.id, []]));
const evidenceByIncident = new Map(incidents.map((item) => [item.id, []]));
const evidenceByEvent = new Map(events.map((item) => [item.id, []]));

for (const source of evidence) {
  evidenceByBridge.get(source.bridge_id)?.push(source);
  if (source.incident_id) evidenceByIncident.get(source.incident_id)?.push(source);
  if (source.event_id) evidenceByEvent.get(source.event_id)?.push(source);
}

const terminalStatuses = new Set(["dead", "deprecated", "migrated"]);
const riskyHosts = [
  "x.com",
  "twitter.com",
  "medium.com",
  "mirror.xyz",
  "substack.com",
  "docs.google.com",
  "notion.site"
];

const limits = {
  bridges_without_primary: 0,
  bridges_without_tier_1: 0,
  incidents_without_primary: 1,
  incidents_without_tier_1: 1,
  events_without_primary: 16,
  events_without_tier_1: 6,
  terminal_unarchived: 15,
  risky_host_unarchived: 16,
  unknown_url_status: 0
};

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "invalid-url";
  }
}

function isRiskyHost(host) {
  return riskyHosts.some((base) => host === base || host.endsWith(`.${base}`));
}

function normalizedUrl(url) {
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

function uniqueByUrl(records) {
  const unique = new Map();
  for (const record of records) {
    const key = normalizedUrl(record.url) ?? `invalid:${record.id}`;
    if (!unique.has(key)) unique.set(key, record);
  }
  return [...unique.values()];
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

function countMissing(records, evidenceMap, predicate) {
  return records.filter((record) => !(evidenceMap.get(record.id) ?? []).some(predicate));
}

const invalidUrls = evidence.filter((source) => hostOf(source.url) === "invalid-url");
const invalidArchiveUrls = evidence.filter((source) => {
  if (!hasArchive(source)) return false;
  try {
    const url = new URL(source.archived_url);
    return !["http:", "https:"].includes(url.protocol);
  } catch {
    return true;
  }
});

const terminalUnarchivedRecords = evidence.filter((source) => {
  const bridge = bridgesById.get(source.bridge_id);
  return bridge && terminalStatuses.has(bridge.status) && !hasArchive(source);
});
const riskyHostUnarchivedRecords = evidence.filter(
  (source) => isRiskyHost(hostOf(source.url)) && !hasArchive(source)
);

const metrics = {
  bridges_without_primary: countMissing(bridges, evidenceByBridge, isPrimary),
  bridges_without_tier_1: countMissing(bridges, evidenceByBridge, isTierOne),
  incidents_without_primary: countMissing(incidents, evidenceByIncident, isPrimary),
  incidents_without_tier_1: countMissing(incidents, evidenceByIncident, isTierOne),
  events_without_primary: countMissing(events, evidenceByEvent, isPrimary),
  events_without_tier_1: countMissing(events, evidenceByEvent, isTierOne),
  terminal_unarchived: uniqueByUrl(terminalUnarchivedRecords),
  risky_host_unarchived: uniqueByUrl(riskyHostUnarchivedRecords),
  unknown_url_status: evidence.filter((source) => source.url_status === "unknown")
};

const errors = [];

for (const [metric, records] of Object.entries(metrics)) {
  const limit = limits[metric];
  if (records.length > limit) {
    const ids = records.map((record) => record.id).join(", ");
    errors.push(`${metric}: observed ${records.length}, baseline limit ${limit}; records: ${ids}`);
  }
}

if (invalidUrls.length > 0) {
  errors.push(`invalid_source_urls: ${invalidUrls.map((source) => source.id).join(", ")}`);
}

if (invalidArchiveUrls.length > 0) {
  errors.push(`invalid_archived_urls: ${invalidArchiveUrls.map((source) => source.id).join(", ")}`);
}

const summary = {
  record_counts: {
    bridges: bridges.length,
    incidents: incidents.length,
    events: events.length,
    evidence: evidence.length
  },
  baseline_limits: limits,
  observed: Object.fromEntries(Object.entries(metrics).map(([key, records]) => [key, records.length])),
  archive_risk_unit: "unique_source_url",
  archive_risk_host_matching: "exact_or_subdomain",
  archive_risk_record_counts: {
    terminal_unarchived: terminalUnarchivedRecords.length,
    risky_host_unarchived: riskyHostUnarchivedRecords.length
  },
  archive_count: evidence.filter(hasArchive).length,
  primary_evidence: evidence.filter(isPrimary).length,
  tier_1_evidence: evidence.filter(isTierOne).length,
  invalid_source_urls: invalidUrls.length,
  invalid_archived_urls: invalidArchiveUrls.length
};

if (errors.length > 0) {
  console.error("Source-quality baseline regression detected:");
  for (const error of errors) console.error(`- ${error}`);
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}

console.log("Source-quality no-regression baseline passed.");
console.log(JSON.stringify(summary, null, 2));
