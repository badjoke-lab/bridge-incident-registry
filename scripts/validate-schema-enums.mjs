import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const strictEnums = {
  amount_confidence: new Set(["high", "medium", "low", "disputed", "unknown", "not_applicable"])
};

const targetEnums = {
  incident_type: new Set([
    "exploit",
    "hack",
    "vulnerability_disclosure",
    "funds_loss",
    "abnormal_transfers",
    "bridge_pause",
    "shutdown",
    "migration",
    "reimbursement",
    "legal_or_regulatory",
    "other"
  ]),
  recovery_status: new Set(["none", "partial_recovery", "full_recovery", "unknown", "not_applicable"]),
  reimbursement_status: new Set([
    "not_announced",
    "announced",
    "in_progress",
    "completed",
    "partial",
    "denied",
    "unknown",
    "not_applicable"
  ]),
  restart_status: new Set([
    "never_paused",
    "paused",
    "reopened",
    "partially_reopened",
    "replaced",
    "not_reopened",
    "unknown",
    "not_applicable"
  ]),
  current_outcome: new Set([
    "active_after_incident",
    "limited_after_incident",
    "paused_long_term",
    "migrated_after_incident",
    "deprecated_after_incident",
    "dead_after_incident",
    "unknown",
    "not_applicable"
  ]),
  attack_vector_category: new Set([
    "validator_key_compromise",
    "message_verification_failure",
    "smart_contract_bug",
    "relayer_or_oracle_issue",
    "configuration_error",
    "frontend_or_dns_compromise",
    "liquidity_or_accounting_failure",
    "operator_or_governance_issue",
    "unknown",
    "not_applicable"
  ]),
  postmortem_available: new Set(["available", "not_found", "unclear", "not_applicable"]),
  loss_amount_basis: new Set([
    "reported_by_project",
    "estimated_by_analytics",
    "reported_by_news",
    "reported_by_security_firm",
    "mixed_sources",
    "unknown",
    "not_applicable"
  ]),
  event_type: new Set([
    "launched",
    "exploit_occurred",
    "hack_disclosed",
    "vulnerability_disclosed",
    "bridge_paused",
    "deposits_suspended",
    "withdrawals_suspended",
    "transfers_suspended",
    "funds_lost",
    "funds_recovered",
    "funds_returned",
    "reimbursement_announced",
    "reimbursement_started",
    "reimbursement_completed",
    "bridge_reopened",
    "bridge_partially_reopened",
    "audit_published",
    "postmortem_published",
    "migration_announced",
    "migration_completed",
    "deprecated",
    "shutdown_announced",
    "shutdown_effective",
    "legal_action",
    "successor_announced",
    "other"
  ]),
  impact_level: new Set(["low", "medium", "high", "critical"]),
  source_type: new Set([
    "official_statement",
    "official_blog",
    "official_social",
    "postmortem",
    "audit_report",
    "security_firm_report",
    "blockchain_analytics_report",
    "news_article",
    "court_document",
    "regulatory_notice",
    "archive_capture",
    "database_reference",
    "community_reference",
    "other"
  ]),
  claim_scope: new Set([
    "bridge_entity",
    "incident_case",
    "event",
    "amount",
    "recovery",
    "reimbursement",
    "restart",
    "shutdown",
    "migration",
    "status",
    "url_history",
    "ownership"
  ]),
  official_url_status: new Set([
    "live_verified",
    "live_unverified",
    "dead_domain",
    "redirected",
    "repurposed",
    "unsafe",
    "unknown"
  ]),
  operator_type: new Set(["company", "foundation", "dao", "protocol_team", "ecosystem", "unknown", "not_applicable"])
};

const errors = [];
const legacyValues = new Map();
const snakeCase = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;

function requireEnum(record, field, allowed, context) {
  const value = record[field];
  if (typeof value !== "string" || value.length === 0) {
    errors.push(`${context}: missing ${field}`);
    return;
  }
  if (!allowed.has(value)) errors.push(`${context}: invalid ${field}: ${value}`);
}

function checkMigrationValue(record, field, allowed, context, options = {}) {
  const value = record[field];
  if (value === undefined || value === null) {
    if (options.required) errors.push(`${context}: missing ${field}`);
    return;
  }
  if (typeof value !== "string" || value.length === 0) {
    errors.push(`${context}: ${field} must be a non-empty string when present`);
    return;
  }
  if (options.snakeCase && !snakeCase.test(value)) {
    errors.push(`${context}: ${field} must use snake_case: ${value}`);
    return;
  }
  if (!allowed.has(value)) {
    if (!legacyValues.has(field)) legacyValues.set(field, new Set());
    legacyValues.get(field).add(value);
  }
}

for (const incident of incidents) {
  const context = `incident ${incident.id ?? "<missing id>"}`;
  checkMigrationValue(incident, "incident_type", targetEnums.incident_type, context, { required: true, snakeCase: true });
  checkMigrationValue(incident, "recovery_status", targetEnums.recovery_status, context, { required: true, snakeCase: true });
  checkMigrationValue(incident, "reimbursement_status", targetEnums.reimbursement_status, context, { required: true, snakeCase: true });
  checkMigrationValue(incident, "restart_status", targetEnums.restart_status, context, { required: true, snakeCase: true });
  checkMigrationValue(incident, "current_outcome", targetEnums.current_outcome, context, { required: true, snakeCase: true });
  requireEnum(incident, "amount_confidence", strictEnums.amount_confidence, context);
  checkMigrationValue(incident, "attack_vector_category", targetEnums.attack_vector_category, context, { snakeCase: true });
  checkMigrationValue(incident, "postmortem_available", targetEnums.postmortem_available, context, { snakeCase: true });
  checkMigrationValue(incident, "loss_amount_basis", targetEnums.loss_amount_basis, context);
}

for (const event of events) {
  const context = `event ${event.id ?? "<missing id>"}`;
  checkMigrationValue(event, "event_type", targetEnums.event_type, context, { required: true, snakeCase: true });
  checkMigrationValue(event, "impact_level", targetEnums.impact_level, context, { snakeCase: true });
  if (typeof event.status_effect !== "string" || event.status_effect.trim().length === 0) {
    errors.push(`${context}: status_effect must be a non-empty descriptive string`);
  }
  checkMigrationValue(event, "reimbursement_status", targetEnums.reimbursement_status, context, { snakeCase: true });
  checkMigrationValue(event, "restart_status", targetEnums.restart_status, context, { snakeCase: true });
}

for (const source of evidence) {
  const context = `evidence ${source.id ?? "<missing id>"}`;
  checkMigrationValue(source, "source_type", targetEnums.source_type, context, { required: true, snakeCase: true });
  checkMigrationValue(source, "claim_scope", targetEnums.claim_scope, context, { snakeCase: true });
}

for (const bridge of bridges) {
  const context = `bridge ${bridge.id ?? "<missing id>"}`;
  checkMigrationValue(bridge, "official_url_status", targetEnums.official_url_status, context, { snakeCase: true });
  checkMigrationValue(bridge, "operator_type", targetEnums.operator_type, context, { snakeCase: true });
}

if (legacyValues.size > 0) {
  console.warn("Schema migration warnings:");
  for (const [field, values] of [...legacyValues.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    console.warn(`- ${field}: ${[...values].sort().join(", ")}`);
  }
}

if (errors.length > 0) {
  console.error("Schema enum validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Schema enum validation passed.");
console.log(`Strict amount-confidence checks: ${incidents.length}`);
console.log(`Target-vocabulary migration checks: ${bridges.length} bridges, ${incidents.length} incidents, ${events.length} events, ${evidence.length} evidence records.`);
