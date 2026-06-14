import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const load = (name) => JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", name), "utf8"));
const bridges = load("bridges.json");
const incidents = load("incidents.json");
const events = load("events.json");
const evidence = load("evidence.json");
const ids = Array.from({ length: 10 }, (_, i) => `bir_bridge_${String(i + 1).padStart(6, "0")}`);
const idSet = new Set(ids);
const b = bridges.filter((x) => idSet.has(x.id));
const i = incidents.filter((x) => idSet.has(x.bridge_id));
const e = events.filter((x) => idSet.has(x.bridge_id));
const s = evidence.filter((x) => idSet.has(x.bridge_id));
const B = new Map(bridges.map((x) => [x.id, x]));
const I = new Map(incidents.map((x) => [x.id, x]));
const E = new Map(events.map((x) => [x.id, x]));
const S = new Map(evidence.map((x) => [x.id, x]));
const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const incidentSources = (id) => s.filter((x) => x.incident_id === id);
const reimbursed = (x) => ["announced", "in_progress", "completed", "partial"].includes(x);

if (b.length !== 10) fail(`expected 10 bridges, found ${b.length}`);
for (const id of ids) if (!B.has(id)) fail(`missing bridge ${id}`);

for (const bridge of b) {
  const related = i.filter((x) => x.bridge_id === bridge.id);
  const latest = [...related].sort((x, y) => y.incident_date.localeCompare(x.incident_date))[0];
  const modeledReimbursement = related.some((x) => reimbursed(x.reimbursement_status));
  if (!related.length) fail(`${bridge.id}: no incidents`);
  if (bridge.major_incident_count !== related.filter((x) => x.is_major_incident).length) fail(`${bridge.id}: major_incident_count mismatch`);
  if (bridge.has_unresolved_incident !== related.some((x) => x.is_unresolved)) fail(`${bridge.id}: unresolved flag mismatch`);
  if (!bridge.has_reimbursement_history && modeledReimbursement) fail(`${bridge.id}: reimbursement flag omits modeled history`);
  if (bridge.has_reimbursement_history && !modeledReimbursement) warn(`${bridge.id}: reimbursement history is not yet expanded in incident status`);
  if (["dead", "deprecated", "migrated"].includes(bridge.status) && (!bridge.end_date || !bridge.terminal_reason)) fail(`${bridge.id}: terminal metadata incomplete`);
  if (!latest) continue;
  if (bridge.status === "paused") {
    if (!["paused", "not_reopened"].includes(latest.restart_status)) fail(`${bridge.id}: paused parent has incompatible restart_status`);
    if (latest.current_outcome !== "paused_long_term") warn(`${bridge.id}: parent paused, incident outcome still ${latest.current_outcome}`);
  }
  if (latest.current_outcome === "paused_long_term" && bridge.status !== "paused") fail(`${bridge.id}: paused_long_term requires paused parent`);
  if (bridge.status === "limited" && latest.current_outcome !== "limited_after_incident") fail(`${bridge.id}: limited outcome mismatch`);
  if (bridge.status === "deprecated" && latest.current_outcome !== "deprecated_after_incident") fail(`${bridge.id}: deprecated outcome mismatch`);
  if (bridge.status === "dead" && latest.current_outcome !== "dead_after_incident") fail(`${bridge.id}: dead outcome mismatch`);
}

for (const incident of i) {
  const sources = incidentSources(incident.id);
  if (incident.source_count !== sources.length) fail(`${incident.id}: source_count ${incident.source_count} != ${sources.length}`);
  if (sources.length < 2) fail(`${incident.id}: fewer than two evidence records`);
  if (!sources.some((x) => x.source_tier === "tier_1" || x.is_primary)) warn(`${incident.id}: no tier_1 or primary source`);
  if (incident.is_unresolved && !(incident.unresolved_reason?.length > 0)) fail(`${incident.id}: unresolved without reason`);
  if (incident.is_unresolved && incident.current_outcome === "active_after_incident") fail(`${incident.id}: unresolved but active outcome`);
  for (const claim of incident.amount_claims ?? []) {
    const source = S.get(claim.source_id);
    if (!source || source.bridge_id !== incident.bridge_id || source.incident_id !== incident.id) fail(`${incident.id}: bad amount source ${claim.source_id}`);
  }
  for (const claim of incident.conflicting_claims ?? []) {
    for (const id of claim.source_ids ?? []) {
      const source = S.get(id);
      if (!source || source.bridge_id !== incident.bridge_id || source.incident_id !== incident.id) fail(`${incident.id}: bad conflict source ${id}`);
    }
  }
}

for (const event of e) {
  const incident = event.incident_id ? I.get(event.incident_id) : null;
  if (!B.has(event.bridge_id)) fail(`${event.id}: missing bridge`);
  if (event.incident_id && (!incident || incident.bridge_id !== event.bridge_id)) fail(`${event.id}: incident mismatch`);
  const support = s.filter((x) => x.event_id === event.id || (event.incident_id && x.incident_id === event.incident_id));
  if (event.source_count > support.length) fail(`${event.id}: source_count exceeds available support`);
}

for (const source of s) {
  const incident = source.incident_id ? I.get(source.incident_id) : null;
  const event = source.event_id ? E.get(source.event_id) : null;
  if (!B.has(source.bridge_id)) fail(`${source.id}: missing bridge`);
  if (source.incident_id && (!incident || incident.bridge_id !== source.bridge_id)) fail(`${source.id}: incident mismatch`);
  if (source.event_id && (!event || event.bridge_id !== source.bridge_id)) fail(`${source.id}: event mismatch`);
  if (incident && event?.incident_id && event.incident_id !== incident.id) fail(`${source.id}: event/incident disagreement`);
}

console.log("First-ten seed audit");
console.log(JSON.stringify({ bridges: b.length, incidents: i.length, events: e.length, evidence: s.length, errors: errors.length, warnings: warnings.length }, null, 2));
if (warnings.length) console.warn(`Warnings:\n- ${warnings.join("\n- ")}`);
if (errors.length) {
  console.error(`Errors:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("First-ten seed audit passed.");
