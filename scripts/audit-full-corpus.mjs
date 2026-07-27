import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.BIR_AUDIT_ROOT ?? process.cwd());
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const errors = [];
const warnings = new Map();

function warn(category, message) {
  if (!warnings.has(category)) warnings.set(category, []);
  warnings.get(category).push(message);
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function isTerminalStatus(status) {
  return ["dead", "deprecated", "migrated"].includes(status);
}

function reimbursementHistory(incident) {
  return ![undefined, null, "not_announced", "not_applicable", "denied", "unknown"].includes(incident.reimbursement_status);
}

const incidentsById = new Map(incidents.map((incident) => [incident.id, incident]));
const eventsById = new Map(events.map((event) => [event.id, event]));
const incidentsByBridge = new Map();
const eventsByBridge = new Map();
const eventsByIncident = new Map();
const evidenceByBridge = new Map();
const evidenceByIncident = new Map();
const evidenceByEvent = new Map();

for (const bridge of bridges) {
  incidentsByBridge.set(bridge.id, []);
  eventsByBridge.set(bridge.id, []);
  evidenceByBridge.set(bridge.id, []);
}
for (const incident of incidents) {
  eventsByIncident.set(incident.id, []);
  evidenceByIncident.set(incident.id, []);
  incidentsByBridge.get(incident.bridge_id)?.push(incident);
}
for (const event of events) {
  eventsByBridge.get(event.bridge_id)?.push(event);
  if (event.incident_id) eventsByIncident.get(event.incident_id)?.push(event);
  evidenceByEvent.set(event.id, []);
}
for (const source of evidence) {
  evidenceByBridge.get(source.bridge_id)?.push(source);
  if (source.incident_id) evidenceByIncident.get(source.incident_id)?.push(source);
  if (source.event_id) evidenceByEvent.get(source.event_id)?.push(source);
}

for (const bridge of bridges) {
  const linkedIncidents = incidentsByBridge.get(bridge.id) ?? [];
  const linkedEvents = eventsByBridge.get(bridge.id) ?? [];
  const linkedEvidence = evidenceByBridge.get(bridge.id) ?? [];
  const majorCount = linkedIncidents.filter((incident) => incident.is_major_incident === true).length;
  const unresolved = linkedIncidents.some((incident) => incident.is_unresolved === true);
  const reimbursed = linkedIncidents.some(reimbursementHistory);

  if (bridge.major_incident_count !== majorCount) {
    errors.push(`${bridge.id}: major_incident_count ${bridge.major_incident_count} does not match linked incidents ${majorCount}`);
  }
  if (bridge.has_unresolved_incident !== unresolved) {
    errors.push(`${bridge.id}: has_unresolved_incident ${bridge.has_unresolved_incident} does not match linked incidents ${unresolved}`);
  }
  if (bridge.has_reimbursement_history !== reimbursed) {
    errors.push(`${bridge.id}: has_reimbursement_history ${bridge.has_reimbursement_history} does not match linked incidents ${reimbursed}`);
  }
  if (linkedEvidence.length === 0) errors.push(`${bridge.id}: bridge has no evidence records`);
  if (linkedIncidents.length > 0 && linkedEvents.length === 0) errors.push(`${bridge.id}: bridge has incidents but no timeline events`);
  if (isTerminalStatus(bridge.status) && !bridge.end_date && !bridge.terminal_reason) {
    errors.push(`${bridge.id}: ${bridge.status} entity requires end_date or terminal_reason`);
  }
  if (bridge.status === "active" && bridge.end_date) {
    errors.push(`${bridge.id}: active entity must not have end_date ${bridge.end_date}`);
  }
}

for (const incident of incidents) {
  const linkedEvents = eventsByIncident.get(incident.id) ?? [];
  const linkedEvidence = evidenceByIncident.get(incident.id) ?? [];
  const values = [
    ["reported_loss_usd", incident.reported_loss_usd],
    ["reported_loss_usd_min", incident.reported_loss_usd_min],
    ["reported_loss_usd_max", incident.reported_loss_usd_max]
  ];

  for (const [field, value] of values) {
    if (value !== null && value !== undefined && (!isFiniteNumber(value) || value < 0)) {
      errors.push(`${incident.id}: ${field} must be a non-negative finite number or null`);
    }
  }
  if (isFiniteNumber(incident.reported_loss_usd_min) && isFiniteNumber(incident.reported_loss_usd_max)
      && incident.reported_loss_usd_min > incident.reported_loss_usd_max) {
    errors.push(`${incident.id}: reported_loss_usd_min exceeds reported_loss_usd_max`);
  }
  if (isFiniteNumber(incident.reported_loss_usd) && isFiniteNumber(incident.reported_loss_usd_min)
      && incident.reported_loss_usd < incident.reported_loss_usd_min) {
    errors.push(`${incident.id}: reported_loss_usd is below reported_loss_usd_min`);
  }
  if (isFiniteNumber(incident.reported_loss_usd) && isFiniteNumber(incident.reported_loss_usd_max)
      && incident.reported_loss_usd > incident.reported_loss_usd_max) {
    errors.push(`${incident.id}: reported_loss_usd exceeds reported_loss_usd_max`);
  }
  if (linkedEvents.length === 0) errors.push(`${incident.id}: incident has no timeline events`);
  if (linkedEvidence.length === 0) errors.push(`${incident.id}: incident has no evidence records`);
  if (incident.source_count !== linkedEvidence.length) {
    warn("incident_source_count", `${incident.id}: stored ${incident.source_count}, directly linked ${linkedEvidence.length}`);
  }
  if (incident.reimbursement_status === "completed"
      && !linkedEvents.some((event) => event.event_type === "reimbursement_completed")) {
    warn("completed_reimbursement_event", `${incident.id}: completed without reimbursement_completed event`);
  }
  if (incident.restart_status === "reopened"
      && !linkedEvents.some((event) => event.event_type === "bridge_reopened")) {
    warn("reopened_event", `${incident.id}: reopened without bridge_reopened event`);
  }
  if (incident.recovery_status === "full_recovery"
      && !linkedEvents.some((event) => ["funds_recovered", "funds_returned"].includes(event.event_type))) {
    errors.push(`${incident.id}: full_recovery requires funds_recovered or funds_returned event`);
  }
  if (incident.is_unresolved === false && Array.isArray(incident.unresolved_reason) && incident.unresolved_reason.length > 0) {
    errors.push(`${incident.id}: resolved incident must not retain unresolved_reason entries`);
  }
  if (incident.is_unresolved === true && (!Array.isArray(incident.unresolved_reason) || incident.unresolved_reason.length === 0)) {
    errors.push(`${incident.id}: unresolved incident has no unresolved_reason`);
  }
}

for (const event of events) {
  const linkedEvidence = evidenceByEvent.get(event.id) ?? [];
  if (event.source_count !== undefined && event.source_count !== null && event.source_count !== linkedEvidence.length) {
    warn("event_source_count", `${event.id}: stored ${event.source_count}, directly linked ${linkedEvidence.length}`);
  }
  const incident = event.incident_id ? incidentsById.get(event.incident_id) : null;
  if (event.event_type === "reimbursement_completed" && incident?.reimbursement_status !== "completed") {
    errors.push(`${event.id}: reimbursement_completed requires incident reimbursement_status completed`);
  }
  if (event.event_type === "bridge_reopened" && incident
      && !["reopened", "partially_reopened", "replaced"].includes(incident.restart_status)) {
    errors.push(`${event.id}: bridge_reopened conflicts with incident restart_status ${incident.restart_status}`);
  }
  if (["funds_recovered", "funds_returned"].includes(event.event_type) && incident
      && !["partial_recovery", "full_recovery", "unknown"].includes(incident.recovery_status)) {
    errors.push(`${event.id}: ${event.event_type} conflicts with incident recovery_status ${incident.recovery_status}`);
  }
}

for (const source of evidence) {
  if (source.is_primary === true && source.source_tier !== "tier_1") {
    errors.push(`${source.id}: primary source must use tier_1, received ${source.source_tier}`);
  }
  if (["dead", "archived"].includes(source.url_status) && !source.archived_url) {
    errors.push(`${source.id}: ${source.url_status} source requires archived_url`);
  }
  if (source.event_id) {
    const event = eventsById.get(source.event_id);
    if (event) {
      const expectedIncidentId = event.incident_id ?? null;
      const actualIncidentId = source.incident_id ?? null;
      if (expectedIncidentId !== actualIncidentId) {
        errors.push(
          `${source.id}: event evidence incident mismatch; event ${source.event_id} expects ${expectedIncidentId ?? "null"}, evidence has ${actualIncidentId ?? "null"}`
        );
      }
    }
  }
}

const warningSummary = Object.fromEntries(
  [...warnings.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, messages]) => [category, { count: messages.length, records: messages }])
);

if (warnings.size > 0) {
  console.warn("Full-corpus audit warnings:");
  for (const [category, details] of Object.entries(warningSummary)) {
    console.warn(`- ${category}: ${details.count}`);
    for (const message of details.records) console.warn(`  - ${message}`);
  }
}

if (errors.length > 0) {
  console.error("Full-corpus audit failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Full-corpus audit passed blocking checks.");
console.log(JSON.stringify({
  record_counts: {
    bridges: bridges.length,
    incidents: incidents.length,
    events: events.length,
    evidence: evidence.length
  },
  blocking_errors: 0,
  warning_categories: warningSummary
}, null, 2));
