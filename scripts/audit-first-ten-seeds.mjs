import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const events = readJson("data/events.json");
const evidence = readJson("data/evidence.json");

const targetBridgeIds = Array.from(
  { length: 10 },
  (_, index) => `bir_bridge_${String(index + 1).padStart(6, "0")}`
);
const targetBridgeIdSet = new Set(targetBridgeIds);
const targetBridges = bridges.filter((bridge) => targetBridgeIdSet.has(bridge.id));
const targetIncidents = incidents.filter((incident) => targetBridgeIdSet.has(incident.bridge_id));
const targetEvents = events.filter((event) => targetBridgeIdSet.has(event.bridge_id));
const targetEvidence = evidence.filter((source) => targetBridgeIdSet.has(source.bridge_id));

const bridgeById = new Map(bridges.map((bridge) => [bridge.id, bridge]));
const incidentById = new Map(incidents.map((incident) => [incident.id, incident]));
const eventById = new Map(events.map((event) => [event.id, event]));
const evidenceById = new Map(evidence.map((source) => [source.id, source]));

const errors = [];
const warnings = [];
const error = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

function incidentEvidence(incidentId) {
  return targetEvidence.filter((source) => source.incident_id === incidentId);
}

function supportingEvidenceForEvent(event) {
  return targetEvidence.filter((source) => {
    if (source.event_id === event.id) return true;
    return Boolean(event.incident_id && source.incident_id === event.incident_id);
  });
}

function hasConfirmedReimbursement(status) {
  return ["announced", "in_progress", "completed", "partial"].includes(status);
}

if (targetBridges.length !== 10) {
  error(`Expected 10 target bridges, found ${targetBridges.length}.`);
}

for (const expectedId of targetBridgeIds) {
  if (!bridgeById.has(expectedId)) error(`Missing target bridge ${expectedId}.`);
}

for (const bridge of targetBridges) {
  const bridgeIncidents = targetIncidents.filter((incident) => incident.bridge_id === bridge.id);
  const majorIncidents = bridgeIncidents.filter((incident) => incident.is_major_incident === true);
  const unresolvedIncidents = bridgeIncidents.filter((incident) => incident.is_unresolved === true);
  const confirmedReimbursement = bridgeIncidents.some((incident) =>
    hasConfirmedReimbursement(incident.reimbursement_status)
  );
  const reimbursementUnknown = bridgeIncidents.some(
    (incident) => incident.reimbursement_status === "unknown"
  );

  if (bridgeIncidents.length === 0) error(`${bridge.id}: no incident records.`);

  if (bridge.major_incident_count !== majorIncidents.length) {
    error(`${bridge.id}: major_incident_count=${bridge.major_incident_count}, actual=${majorIncidents.length}.`);
  }

  if (bridge.has_unresolved_incident !== (unresolvedIncidents.length > 0)) {
    error(`${bridge.id}: has_unresolved_incident does not match incident records.`);
  }

  if (confirmedReimbursement && bridge.has_reimbursement_history !== true) {
    error(`${bridge.id}: confirmed reimbursement history exists but bridge flag is false.`);
  }

  if (!confirmedReimbursement && bridge.has_reimbursement_history === true) {
    if (reimbursementUnknown) {
      warn(`${bridge.id}: reimbursement-history flag is true while incident outcome remains unknown; retain for manual review.`);
    } else {
      error(`${bridge.id}: reimbursement-history flag is true without supporting incident status.`);
    }
  }

  if (["dead", "deprecated", "migrated"].includes(bridge.status)) {
    if (!bridge.end_date) error(`${bridge.id}: terminal/semi-terminal bridge has no end_date.`);
    if (!bridge.terminal_reason) error(`${bridge.id}: terminal/semi-terminal bridge has no terminal_reason.`);
  }

  const latestIncident = [...bridgeIncidents].sort((a, b) =>
    b.incident_date.localeCompare(a.incident_date)
  )[0];
  if (!latestIncident) continue;

  if (bridge.status === "paused") {
    if (latestIncident.restart_status !== "paused") {
      error(`${bridge.id}: paused bridge latest incident must have restart_status=paused.`);
    }
    if (latestIncident.current_outcome !== "paused_long_term") {
      error(`${bridge.id}: paused bridge latest incident must have current_outcome=paused_long_term.`);
    }
  }

  if (latestIncident.current_outcome === "paused_long_term" && bridge.status !== "paused") {
    error(`${bridge.id}: paused_long_term incident requires parent bridge status=paused.`);
  }

  if (bridge.status === "limited" && latestIncident.current_outcome !== "limited_after_incident") {
    error(`${bridge.id}: limited bridge latest incident must have current_outcome=limited_after_incident.`);
  }

  if (bridge.status === "deprecated" && latestIncident.current_outcome !== "deprecated_after_incident") {
    error(`${bridge.id}: deprecated bridge latest incident must have current_outcome=deprecated_after_incident.`);
  }

  if (bridge.status === "dead" && latestIncident.current_outcome !== "dead_after_incident") {
    error(`${bridge.id}: dead bridge latest incident must have current_outcome=dead_after_incident.`);
  }
}

for (const incident of targetIncidents) {
  const sources = incidentEvidence(incident.id);
  const highQualitySources = sources.filter(
    (source) => source.source_tier === "tier_1" || source.is_primary === true
  );

  if (incident.source_count !== sources.length) {
    error(`${incident.id}: source_count=${incident.source_count}, actual incident evidence=${sources.length}.`);
  }
  if (sources.length < 2) error(`${incident.id}: fewer than two evidence records.`);
  if (highQualitySources.length === 0) warn(`${incident.id}: no tier_1 or primary evidence source.`);

  if (
    incident.is_unresolved &&
    (!Array.isArray(incident.unresolved_reason) || incident.unresolved_reason.length === 0)
  ) {
    error(`${incident.id}: unresolved incident has no unresolved_reason.`);
  }

  if (incident.is_unresolved && incident.current_outcome === "active_after_incident") {
    error(`${incident.id}: unresolved incident cannot use current_outcome=active_after_incident.`);
  }

  for (const claim of incident.amount_claims ?? []) {
    const source = evidenceById.get(claim.source_id);
    if (!source) {
      error(`${incident.id}: amount claim references missing evidence ${claim.source_id}.`);
      continue;
    }
    if (source.bridge_id !== incident.bridge_id || source.incident_id !== incident.id) {
      error(`${incident.id}: amount claim evidence ${claim.source_id} belongs to another record.`);
    }
  }

  for (const conflict of incident.conflicting_claims ?? []) {
    for (const sourceId of conflict.source_ids ?? []) {
      const source = evidenceById.get(sourceId);
      if (!source) {
        error(`${incident.id}: conflicting claim references missing evidence ${sourceId}.`);
        continue;
      }
      if (source.bridge_id !== incident.bridge_id || source.incident_id !== incident.id) {
        error(`${incident.id}: conflicting-claim evidence ${sourceId} belongs to another record.`);
      }
    }
  }
}

for (const event of targetEvents) {
  if (!bridgeById.has(event.bridge_id)) error(`${event.id}: missing bridge ${event.bridge_id}.`);

  if (event.incident_id) {
    const incident = incidentById.get(event.incident_id);
    if (!incident) {
      error(`${event.id}: missing incident ${event.incident_id}.`);
    } else if (incident.bridge_id !== event.bridge_id) {
      error(`${event.id}: event and incident belong to different bridges.`);
    }
  }

  const supporting = supportingEvidenceForEvent(event);
  if (event.source_count > supporting.length) {
    error(`${event.id}: source_count=${event.source_count}, but only ${supporting.length} incident/event evidence records are available.`);
  }
}

for (const source of targetEvidence) {
  if (!bridgeById.has(source.bridge_id)) error(`${source.id}: missing bridge ${source.bridge_id}.`);

  if (source.incident_id) {
    const incident = incidentById.get(source.incident_id);
    if (!incident) {
      error(`${source.id}: missing incident ${source.incident_id}.`);
    } else if (incident.bridge_id !== source.bridge_id) {
      error(`${source.id}: evidence and incident belong to different bridges.`);
    }
  }

  if (source.event_id) {
    const event = eventById.get(source.event_id);
    if (!event) {
      error(`${source.id}: missing event ${source.event_id}.`);
    } else {
      if (event.bridge_id !== source.bridge_id) {
        error(`${source.id}: evidence and event belong to different bridges.`);
      }
      if (source.incident_id && event.incident_id && source.incident_id !== event.incident_id) {
        error(`${source.id}: evidence incident_id and event incident_id disagree.`);
      }
    }
  }
}

const summary = {
  bridges: targetBridges.length,
  incidents: targetIncidents.length,
  events: targetEvents.length,
  evidence: targetEvidence.length,
  errors: errors.length,
  warnings: warnings.length
};

console.log("First-ten seed audit");
console.log(JSON.stringify(summary, null, 2));

if (warnings.length > 0) {
  console.warn("Warnings:");
  for (const message of warnings) console.warn(`- ${message}`);
}

if (errors.length > 0) {
  console.error("Errors:");
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log("First-ten seed audit passed.");
