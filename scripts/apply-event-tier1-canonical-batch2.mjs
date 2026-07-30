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

if (incidents.length !== 34 || events.length !== 183 || evidence.length !== 271) {
  throw new Error(`unexpected baseline: ${incidents.length} incidents, ${events.length} events, ${evidence.length} evidence`);
}

const incidentById = new Map(incidents.map((record) => [record.id, record]));
const eventById = new Map(events.map((record) => [record.id, record]));
const sourceById = new Map(evidence.map((record) => [record.id, record]));

const targetEventIds = [
  "bir_ev_000139",
  "bir_ev_000151",
  "bir_ev_000060",
  "bir_ev_000064",
  "bir_ev_000084",
  "bir_ev_000093",
  "bir_ev_000126",
  "bir_ev_000127"
];

for (const eventId of targetEventIds) {
  const event = eventById.get(eventId);
  if (!event) throw new Error(`missing event ${eventId}`);
  const directCount = evidence.filter((source) => source.event_id === eventId).length;
  if (event.source_count !== directCount) {
    throw new Error(`event baseline mismatch ${eventId}: stored ${event.source_count}, direct ${directCount}`);
  }
  if (evidence.some((source) => source.event_id === eventId && source.source_tier === "tier_1")) {
    throw new Error(`target already has Tier 1 evidence: ${eventId}`);
  }
}

const affectedIncidentIds = [...new Set(targetEventIds.map((id) => eventById.get(id).incident_id).filter(Boolean))];
for (const incidentId of affectedIncidentIds) {
  const incident = incidentById.get(incidentId);
  if (!incident) throw new Error(`missing incident ${incidentId}`);
  const directCount = evidence.filter((source) => source.incident_id === incidentId).length;
  if (incident.source_count !== directCount) {
    throw new Error(`incident baseline mismatch ${incidentId}: stored ${incident.source_count}, direct ${directCount}`);
  }
}

for (let number = 272; number <= 279; number += 1) {
  const id = `bir_src_${String(number).padStart(6, "0")}`;
  if (sourceById.has(id)) throw new Error(`evidence id already exists: ${id}`);
}

function eventScopedCopy(sourceId, id, eventId, note) {
  const source = sourceById.get(sourceId);
  if (!source) throw new Error(`missing source ${sourceId}`);
  return {
    ...source,
    id,
    event_id: eventId,
    accessed_at: "2026-07-30",
    notes: note
  };
}

const additions = [
  eventScopedCopy(
    "bir_src_000165",
    "bir_src_000272",
    "bir_ev_000139",
    "Event-scoped primary copy supporting the RubicProxy approval exploit, approximate amount, affected approval path, and containment response."
  ),
  eventScopedCopy(
    "bir_src_000182",
    "bir_src_000273",
    "bir_ev_000151",
    "Event-scoped primary copy supporting fraudulent Taiko bridge-message acceptance, affected assets, and immediate containment."
  ),
  eventScopedCopy(
    "bir_src_000271",
    "bir_src_000274",
    "bir_ev_000060",
    "Event-scoped primary copy supporting restoration of the cBridge frontend with additional monitoring after mitigation."
  ),
  {
    id: "bir_src_000275",
    bridge_id: "bir_bridge_000016",
    incident_id: "bir_inc_000020",
    event_id: "bir_ev_000064",
    source_type: "official_social",
    title: "SOCKET fund recovery update",
    url: "https://x.com/SocketDotTech/status/1749734794320363802",
    publisher: "SOCKET",
    published_at: "2024-01-23",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "recovery",
    language: "en",
    author: "SOCKET",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "First-party update reporting recovery of 1,032 ETH from the January 16 incident and a forthcoming recovery and distribution plan."
  },
  eventScopedCopy(
    "bir_src_000104",
    "bir_src_000276",
    "bir_ev_000084",
    "Event-scoped primary copy supporting validator rejection of the malicious nUSD bridge transaction and preservation of affected LP funds."
  ),
  {
    id: "bir_src_000277",
    bridge_id: "bir_bridge_000021",
    incident_id: "bir_inc_000027",
    event_id: "bir_ev_000093",
    source_type: "official_social",
    title: "Holograph incident postmortem announcement",
    url: "https://x.com/holographxyz/status/1807946057235718349",
    publisher: "Holograph",
    published_at: "2024-07-02",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "root_cause",
    language: "en",
    author: "Holograph",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: true,
    supports_shutdown: false,
    supports_migration: false,
    notes: "First-party announcement of the completed postmortem with Halborn, including the former-contractor access path and the protocol response."
  },
  {
    id: "bir_src_000278",
    bridge_id: "bir_bridge_000027",
    incident_id: "bir_inc_000028",
    event_id: "bir_ev_000126",
    source_type: "official_social",
    title: "Transit Finance recovery update: approximately 70 percent returned",
    url: "https://x.com/TransitFinance/status/1576463550557483008",
    publisher: "Transit Finance",
    published_at: "2022-10-02",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "recovery",
    language: "en",
    author: "Transit Finance",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "First-party update reporting that approximately 70 percent of stolen assets had been returned to identified addresses."
  },
  {
    id: "bir_src_000279",
    bridge_id: "bir_bridge_000027",
    incident_id: "bir_inc_000028",
    event_id: "bir_ev_000127",
    source_type: "official_blog",
    title: "Updates about TransitFinance",
    url: "https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897",
    publisher: "Transit Finance",
    published_at: "2022-10-12",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "recovery",
    language: "en",
    author: "Transit Finance",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: true,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "First-party update recording a second returned-funds batch including 10,000 BNB and the cumulative recovery and reimbursement plan."
  }
];

if (new Set(additions.map((record) => record.id)).size !== additions.length) {
  throw new Error("duplicate addition ids");
}

for (const addition of additions) {
  const event = eventById.get(addition.event_id);
  event.source_count += 1;
  const incident = incidentById.get(addition.incident_id);
  incident.source_count += 1;
}

evidence.push(...additions);
if (evidence.length !== 279) throw new Error(`unexpected evidence total ${evidence.length}`);

for (const eventId of targetEventIds) {
  const event = eventById.get(eventId);
  const directCount = evidence.filter((source) => source.event_id === eventId).length;
  if (event.source_count !== directCount) throw new Error(`event count not synchronized: ${eventId}`);
  if (!evidence.some((source) => source.event_id === eventId && source.source_tier === "tier_1" && source.is_primary === true)) {
    throw new Error(`event lacks approved primary Tier 1 evidence: ${eventId}`);
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

console.log("Applied event Tier 1 canonical Batch 2.");
console.log("Evidence: 271 -> 279");
console.log(`Affected incidents: ${affectedIncidentIds.join(", ")}`);
