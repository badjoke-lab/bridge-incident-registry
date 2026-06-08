import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const files = {
  bridges: "data/bridges.json",
  incidents: "data/incidents.json",
  events: "data/events.json",
  evidence: "data/evidence.json",
  chains: "data/reference/chains.json",
  assets: "data/reference/assets.json"
};

const bridgeStatuses = new Set(["active", "limited", "paused", "inactive", "deprecated", "migrated", "dead", "unknown"]);
const bridgeTypes = new Set([
  "asset_bridge",
  "wrapped_asset_bridge",
  "canonical_bridge",
  "third_party_bridge",
  "cross_chain_router",
  "cross_chain_messaging",
  "interoperability_protocol",
  "bridge_aggregator",
  "hybrid",
  "unknown"
]);
const recordMaturities = new Set(["stub", "reviewed", "full"]);
const updateStatuses = new Set(["current", "stale", "needs_review", "under_revision"]);
const confidences = new Set(["high", "medium", "low"]);
const datePrecisions = new Set(["day", "month", "year", "approximate", "unknown"]);
const sourceTiers = new Set(["tier_1", "tier_2", "tier_3", "unknown"]);
const urlStatuses = new Set(["live", "archived", "dead", "redirected", "paywalled", "unknown"]);

const errors = [];
const warnings = [];

function readJson(label, filePath) {
  const absolute = path.join(root, filePath);
  try {
    return JSON.parse(fs.readFileSync(absolute, "utf8"));
  } catch (error) {
    errors.push(`${label}: failed to read or parse ${filePath}: ${error.message}`);
    return null;
  }
}

function expectArray(label, value) {
  if (!Array.isArray(value)) {
    errors.push(`${label}: expected an array`);
    return [];
  }
  return value;
}

function expectObject(label, value) {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    errors.push(`${label}: expected an object`);
    return {};
  }
  return value;
}

function checkRequired(record, fields, context) {
  for (const field of fields) {
    if (record[field] === undefined || record[field] === null || record[field] === "") {
      errors.push(`${context}: missing required field ${field}`);
    }
  }
}

function checkEnum(value, allowed, context, field) {
  if (value === undefined || value === null) return;
  if (!allowed.has(value)) {
    errors.push(`${context}: invalid ${field}: ${value}`);
  }
}

function checkDuplicateIds(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (!record.id) continue;
    if (seen.has(record.id)) {
      errors.push(`${label}: duplicate id ${record.id}`);
    }
    seen.add(record.id);
  }
}

function checkDuplicateSlugs(records, label) {
  const seen = new Set();
  for (const record of records) {
    if (!record.slug) continue;
    if (seen.has(record.slug)) {
      errors.push(`${label}: duplicate slug ${record.slug}`);
    }
    seen.add(record.slug);
  }
}

function checkDateShape(value, precision, context, field) {
  if (!value || precision === "unknown") return;
  const patterns = {
    day: /^\d{4}-\d{2}-\d{2}$/,
    month: /^\d{4}-\d{2}(-\d{2})?$/,
    year: /^\d{4}(-\d{2}-\d{2})?$/,
    approximate: /^\d{4}(-\d{2})?(-\d{2})?$/
  };
  const pattern = patterns[precision];
  if (pattern && !pattern.test(value)) {
    errors.push(`${context}: ${field} does not match ${precision} precision: ${value}`);
  }
}

function checkUrl(value, context, field) {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      errors.push(`${context}: ${field} must be http or https: ${value}`);
    }
  } catch {
    errors.push(`${context}: invalid URL in ${field}: ${value}`);
  }
}

function checkReferenceKeys(keys, dictionary, context, field) {
  if (!Array.isArray(keys)) return;
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(dictionary, key)) {
      errors.push(`${context}: unknown ${field} reference key: ${key}`);
    }
  }
}

const bridges = expectArray("bridges", readJson("bridges", files.bridges));
const incidents = expectArray("incidents", readJson("incidents", files.incidents));
const events = expectArray("events", readJson("events", files.events));
const evidence = expectArray("evidence", readJson("evidence", files.evidence));
const chains = expectObject("chains", readJson("chains", files.chains));
const assets = expectObject("assets", readJson("assets", files.assets));

checkDuplicateIds(bridges, "bridges");
checkDuplicateSlugs(bridges, "bridges");
checkDuplicateIds(incidents, "incidents");
checkDuplicateSlugs(incidents, "incidents");
checkDuplicateIds(events, "events");
checkDuplicateIds(evidence, "evidence");

const bridgeIds = new Set(bridges.map((record) => record.id));
const incidentIds = new Set(incidents.map((record) => record.id));
const eventIds = new Set(events.map((record) => record.id));
const evidenceIds = new Set(evidence.map((record) => record.id));

for (const [key, entry] of Object.entries(chains)) {
  if (!entry || typeof entry.display_name !== "string" || !Array.isArray(entry.aliases)) {
    errors.push(`chains.${key}: expected display_name string and aliases array`);
  }
}

for (const [key, entry] of Object.entries(assets)) {
  if (!entry || typeof entry.display_name !== "string" || !Array.isArray(entry.aliases)) {
    errors.push(`assets.${key}: expected display_name string and aliases array`);
  }
}

for (const bridge of bridges) {
  const context = `bridge ${bridge.id ?? "<missing id>"}`;
  checkRequired(bridge, [
    "id",
    "slug",
    "previous_slugs",
    "redirect_from",
    "canonical_name",
    "type",
    "status",
    "summary",
    "confidence",
    "record_maturity",
    "update_status",
    "last_reviewed_at",
    "last_verified_at"
  ], context);
  checkEnum(bridge.type, bridgeTypes, context, "type");
  checkEnum(bridge.status, bridgeStatuses, context, "status");
  checkEnum(bridge.confidence, confidences, context, "confidence");
  checkEnum(bridge.record_maturity, recordMaturities, context, "record_maturity");
  checkEnum(bridge.update_status, updateStatuses, context, "update_status");
  checkEnum(bridge.launch_date_precision, datePrecisions, context, "launch_date_precision");
  checkEnum(bridge.end_date_precision, datePrecisions, context, "end_date_precision");
  checkDateShape(bridge.launch_date, bridge.launch_date_precision, context, "launch_date");
  checkDateShape(bridge.end_date, bridge.end_date_precision, context, "end_date");
  checkUrl(bridge.official_url, context, "official_url");
  checkUrl(bridge.archived_url, context, "archived_url");
  checkReferenceKeys(bridge.primary_chains, chains, context, "primary_chains");
  checkReferenceKeys(bridge.primary_assets, assets, context, "primary_assets");
  if ((bridge.status === "dead" || bridge.status === "deprecated" || bridge.status === "migrated") && !bridge.terminal_reason) {
    warnings.push(`${context}: terminal or semi-terminal bridge should have terminal_reason`);
  }
}

for (const incident of incidents) {
  const context = `incident ${incident.id ?? "<missing id>"}`;
  checkRequired(incident, [
    "id",
    "bridge_id",
    "slug",
    "previous_slugs",
    "redirect_from",
    "title",
    "incident_date",
    "incident_date_precision",
    "incident_type",
    "summary",
    "confidence",
    "record_maturity",
    "update_status",
    "source_count",
    "last_reviewed_at",
    "last_verified_at"
  ], context);
  if (incident.bridge_id && !bridgeIds.has(incident.bridge_id)) {
    errors.push(`${context}: missing referenced bridge ${incident.bridge_id}`);
  }
  checkEnum(incident.incident_date_precision, datePrecisions, context, "incident_date_precision");
  checkEnum(incident.confidence, confidences, context, "confidence");
  checkEnum(incident.record_maturity, recordMaturities, context, "record_maturity");
  checkEnum(incident.update_status, updateStatuses, context, "update_status");
  checkDateShape(incident.incident_date, incident.incident_date_precision, context, "incident_date");
  checkReferenceKeys(incident.affected_chains, chains, context, "affected_chains");
  checkReferenceKeys(incident.affected_assets, assets, context, "affected_assets");
  checkReferenceKeys(incident.reported_loss_assets, assets, context, "reported_loss_assets");
  if (incident.is_unresolved && (!Array.isArray(incident.unresolved_reason) || incident.unresolved_reason.length === 0)) {
    errors.push(`${context}: unresolved incident requires unresolved_reason`);
  }
  for (const claim of incident.amount_claims ?? []) {
    if (!claim.source_id || !evidenceIds.has(claim.source_id)) {
      errors.push(`${context}: amount claim references missing evidence ${claim.source_id}`);
    }
  }
  for (const conflict of incident.conflicting_claims ?? []) {
    for (const sourceId of conflict.source_ids ?? []) {
      if (!evidenceIds.has(sourceId)) {
        errors.push(`${context}: conflicting claim references missing evidence ${sourceId}`);
      }
    }
  }
}

for (const event of events) {
  const context = `event ${event.id ?? "<missing id>"}`;
  checkRequired(event, [
    "id",
    "bridge_id",
    "event_type",
    "event_date",
    "event_date_precision",
    "title",
    "description",
    "confidence",
    "record_maturity",
    "update_status"
  ], context);
  if (event.bridge_id && !bridgeIds.has(event.bridge_id)) {
    errors.push(`${context}: missing referenced bridge ${event.bridge_id}`);
  }
  if (event.incident_id && !incidentIds.has(event.incident_id)) {
    errors.push(`${context}: missing referenced incident ${event.incident_id}`);
  }
  checkEnum(event.event_date_precision, datePrecisions, context, "event_date_precision");
  checkEnum(event.confidence, confidences, context, "confidence");
  checkEnum(event.record_maturity, recordMaturities, context, "record_maturity");
  checkEnum(event.update_status, updateStatuses, context, "update_status");
  checkDateShape(event.event_date, event.event_date_precision, context, "event_date");
  checkReferenceKeys(event.affected_chains, chains, context, "affected_chains");
  checkReferenceKeys(event.affected_assets, assets, context, "affected_assets");
}

for (const source of evidence) {
  const context = `evidence ${source.id ?? "<missing id>"}`;
  checkRequired(source, [
    "id",
    "bridge_id",
    "source_type",
    "title",
    "url",
    "publisher",
    "published_at",
    "published_at_precision",
    "reliability",
    "source_tier",
    "url_status"
  ], context);
  if (source.bridge_id && !bridgeIds.has(source.bridge_id)) {
    errors.push(`${context}: missing referenced bridge ${source.bridge_id}`);
  }
  if (source.incident_id && !incidentIds.has(source.incident_id)) {
    errors.push(`${context}: missing referenced incident ${source.incident_id}`);
  }
  if (source.event_id && !eventIds.has(source.event_id)) {
    errors.push(`${context}: missing referenced event ${source.event_id}`);
  }
  checkEnum(source.published_at_precision, datePrecisions, context, "published_at_precision");
  checkEnum(source.reliability, confidences, context, "reliability");
  checkEnum(source.source_tier, sourceTiers, context, "source_tier");
  checkEnum(source.url_status, urlStatuses, context, "url_status");
  checkDateShape(source.published_at, source.published_at_precision, context, "published_at");
  checkUrl(source.url, context, "url");
  checkUrl(source.archived_url, context, "archived_url");
  if ((source.url_status === "dead" || source.url_status === "archived") && !source.archived_url) {
    warnings.push(`${context}: ${source.url_status} source should include archived_url when possible`);
  }
}

if (warnings.length > 0) {
  console.warn("Data validation warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("Data validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Data validation passed.");
console.log(`Records: ${bridges.length} bridges, ${incidents.length} incidents, ${events.length} events, ${evidence.length} evidence sources.`);
