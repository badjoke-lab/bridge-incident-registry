import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const writeRecords = (relativePath, records) => {
  const body = `[
${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}
]\n`;
  fs.writeFileSync(path.join(root, relativePath), body, "utf8");
};

const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

if (incidents.length !== 34 || events.length !== 183 || evidence.length !== 279) {
  throw new Error(`unexpected baseline: ${incidents.length} incidents, ${events.length} events, ${evidence.length} evidence`);
}

const incidentById = new Map(incidents.map((record) => [record.id, record]));
const eventById = new Map(events.map((record) => [record.id, record]));
const sourceById = new Map(evidence.map((record) => [record.id, record]));
const targetEventIds = ["bir_ev_000136", "bir_ev_000146", "bir_ev_000150", "bir_ev_000156", "bir_ev_000164"];

for (const eventId of targetEventIds) {
  const event = eventById.get(eventId);
  if (!event) throw new Error(`missing event ${eventId}`);
  const directCount = evidence.filter((source) => source.event_id === eventId).length;
  if (event.source_count !== directCount) throw new Error(`event baseline mismatch ${eventId}`);
  if (evidence.some((source) => source.event_id === eventId && source.source_tier === "tier_1")) {
    throw new Error(`target already has Tier 1 evidence: ${eventId}`);
  }
}

const affectedIncidentIds = ["bir_inc_000030", "bir_inc_000032", "bir_inc_000033"];
for (const incidentId of affectedIncidentIds) {
  const incident = incidentById.get(incidentId);
  if (!incident) throw new Error(`missing incident ${incidentId}`);
  const directCount = evidence.filter((source) => source.incident_id === incidentId).length;
  if (incident.source_count !== directCount) throw new Error(`incident baseline mismatch ${incidentId}`);
}

for (let number = 280; number <= 284; number += 1) {
  const id = `bir_src_${String(number).padStart(6, "0")}`;
  if (sourceById.has(id)) throw new Error(`evidence id already exists: ${id}`);
}

function eventScopedCopy(sourceId, id, eventId, note) {
  const source = sourceById.get(sourceId);
  if (!source) throw new Error(`missing source ${sourceId}`);
  return { ...source, id, event_id: eventId, accessed_at: "2026-07-30", notes: note };
}

const additions = [
  eventScopedCopy(
    "bir_src_000161",
    "bir_src_000280",
    "bir_ev_000136",
    "Event-scoped primary copy supporting the RBC/BRBC administrative-wallet compromise, released assets, approximate amount, suspension, and migration response."
  ),
  eventScopedCopy(
    "bir_src_000172",
    "bir_src_000281",
    "bir_ev_000146",
    "Event-scoped primary copy supporting Unizen's immediate reimbursement plan, more-than-99-percent coverage statement, threshold, and case-by-case handling."
  ),
  {
    id: "bir_src_000282",
    bridge_id: "bir_bridge_000030",
    incident_id: "bir_inc_000032",
    event_id: "bir_ev_000150",
    source_type: "blockchain_analytics_report",
    title: "PeckShieldAlert Unizen exploiter Tornado Cash transfer",
    url: "https://x.com/PeckShieldAlert/status/1821065531073724876",
    publisher: "PeckShieldAlert",
    published_at: "2024-08-07",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "recovery",
    language: "en",
    author: null,
    quote_excerpt: null,
    is_primary: false,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "Direct security-monitoring observation that the Unizen exploiter-labeled address transferred 865.4 ETH, worth approximately USD 2.16 million, to Tornado Cash."
  },
  eventScopedCopy(
    "bir_src_000183",
    "bir_src_000283",
    "bir_ev_000156",
    "Event-scoped primary copy supporting restoration of the Taiko network and bridge, reopening with conservative withdrawal quotas, and the make-whole commitment."
  ),
  eventScopedCopy(
    "bir_src_000187",
    "bir_src_000284",
    "bir_ev_000164",
    "Event-scoped primary copy supporting the effective sunset and non-operational state of the Everclear protocol, user interface, and chain."
  )
];

for (const addition of additions) {
  eventById.get(addition.event_id).source_count += 1;
  if (addition.incident_id) incidentById.get(addition.incident_id).source_count += 1;
}

evidence.push(...additions);
if (evidence.length !== 284) throw new Error(`unexpected evidence total ${evidence.length}`);

for (const eventId of targetEventIds) {
  const event = eventById.get(eventId);
  const directCount = evidence.filter((source) => source.event_id === eventId).length;
  if (event.source_count !== directCount) throw new Error(`event count not synchronized: ${eventId}`);
  if (!evidence.some((source) => source.event_id === eventId && source.source_tier === "tier_1")) {
    throw new Error(`event lacks Tier 1 evidence: ${eventId}`);
  }
}
for (const incidentId of affectedIncidentIds) {
  const incident = incidentById.get(incidentId);
  const directCount = evidence.filter((source) => source.incident_id === incidentId).length;
  if (incident.source_count !== directCount) throw new Error(`incident count not synchronized: ${incidentId}`);
}

writeRecords("data/incidents.json", incidents);
writeRecords("data/events.json", events);
writeRecords("data/evidence.json", evidence);

console.log("Applied final event Tier 1 canonical migration.");
console.log("Evidence: 279 -> 284");
console.log("Affected incidents: bir_inc_000030, bir_inc_000032 (+2), bir_inc_000033");
