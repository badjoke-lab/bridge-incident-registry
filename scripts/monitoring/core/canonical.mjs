import crypto from "node:crypto";
import fs from "node:fs";
import { CANONICAL_PATHS } from "../config.mjs";

function readBuffer(path) {
  return fs.readFileSync(path);
}

export function loadCanonicalData() {
  const [bridges, incidents, events, evidence] = CANONICAL_PATHS.map((path) =>
    JSON.parse(fs.readFileSync(path, "utf8"))
  );
  return { bridges, incidents, events, evidence };
}

export function canonicalFingerprints() {
  return Object.fromEntries(
    CANONICAL_PATHS.map((path) => [
      path,
      crypto.createHash("sha256").update(readBuffer(path)).digest("hex")
    ])
  );
}

export function assertCanonicalUnchanged(before, after) {
  for (const path of CANONICAL_PATHS) {
    if (before[path] !== after[path]) {
      throw new Error(`monitoring must not modify canonical data: ${path}`);
    }
  }
}

export function canonicalHealthSummary(data) {
  const ids = {
    bridge: new Set(data.bridges.map((item) => item.id)),
    incident: new Set(data.incidents.map((item) => item.id)),
    event: new Set(data.events.map((item) => item.id))
  };

  const errors = [];
  const unknownUrlStatuses = data.evidence.filter((item) => item.url_status === "unknown").length;
  for (const incident of data.incidents) {
    if (!ids.bridge.has(incident.bridge_id)) errors.push(`incident ${incident.id} missing bridge ${incident.bridge_id}`);
  }
  for (const event of data.events) {
    if (event.incident_id && !ids.incident.has(event.incident_id)) {
      errors.push(`event ${event.id} missing incident ${event.incident_id}`);
    }
    if (event.bridge_id && !ids.bridge.has(event.bridge_id)) {
      errors.push(`event ${event.id} missing bridge ${event.bridge_id}`);
    }
  }
  for (const source of data.evidence) {
    if (source.bridge_id && !ids.bridge.has(source.bridge_id)) errors.push(`evidence ${source.id} missing bridge ${source.bridge_id}`);
    if (source.incident_id && !ids.incident.has(source.incident_id)) errors.push(`evidence ${source.id} missing incident ${source.incident_id}`);
    if (source.event_id && !ids.event.has(source.event_id)) errors.push(`evidence ${source.id} missing event ${source.event_id}`);
  }

  return {
    counts: {
      bridges: data.bridges.length,
      incidents: data.incidents.length,
      events: data.events.length,
      evidence: data.evidence.length
    },
    unknown_url_status: unknownUrlStatuses,
    reference_errors: errors
  };
}
