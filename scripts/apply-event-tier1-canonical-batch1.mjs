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

if (incidents.length !== 34 || events.length !== 183 || evidence.length !== 265) {
  throw new Error(`unexpected baseline: ${incidents.length} incidents, ${events.length} events, ${evidence.length} evidence`);
}

const incidentById = new Map(incidents.map((record) => [record.id, record]));
const eventById = new Map(events.map((record) => [record.id, record]));
const sourceById = new Map(evidence.map((record) => [record.id, record]));

const expectedEventCounts = {
  bir_ev_000001: 1,
  bir_ev_000007: 2,
  bir_ev_000015: 2,
  bir_ev_000059: 1,
  bir_ev_000166: 1,
  bir_ev_000169: 1
};
const expectedIncidentCounts = {
  bir_inc_000001: 6,
  bir_inc_000003: 7,
  bir_inc_000005: 8,
  bir_inc_000019: 4,
  bir_inc_000034: 9
};

for (const [id, count] of Object.entries(expectedEventCounts)) {
  const record = eventById.get(id);
  if (!record || record.source_count !== count) throw new Error(`unexpected event baseline for ${id}`);
}
for (const [id, count] of Object.entries(expectedIncidentCounts)) {
  const record = incidentById.get(id);
  if (!record || record.source_count !== count) throw new Error(`unexpected incident baseline for ${id}`);
}
for (const id of ["bir_src_000266", "bir_src_000267", "bir_src_000268", "bir_src_000269", "bir_src_000270", "bir_src_000271"]) {
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
    "bir_src_000193",
    "bir_src_000266",
    "bir_ev_000166",
    "Event-scoped primary copy supporting the Commons Bridge proxy compromise, approximate token amount, containment response, and pause."
  ),
  eventScopedCopy(
    "bir_src_000193",
    "bir_src_000267",
    "bir_ev_000169",
    "Event-scoped primary copy supporting Syndicate's investigation, attacker tracing, liquidity warning, and reserve assessment."
  ),
  {
    id: "bir_src_000268",
    bridge_id: "bir_bridge_000001",
    incident_id: "bir_inc_000001",
    event_id: "bir_ev_000001",
    source_type: "official_blog",
    title: "Community Alert: Ronin Validators Compromised",
    url: "https://roninblockchain.substack.com/p/community-alert-ronin-validators",
    publisher: "Ronin Network",
    published_at: "2022-03-29",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "incident_case",
    language: "en",
    author: "Ronin Network",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: true,
    supports_reopen: false,
    supports_shutdown: true,
    supports_migration: false,
    notes: "First-party disclosure of the compromised validator set, drained ETH and USDC, bridge halt, and commitment to recover or reimburse lost funds."
  },
  eventScopedCopy(
    "bir_src_000065",
    "bir_src_000269",
    "bir_ev_000007",
    "Event-scoped primary copy supporting the Nomad exploit case and unsafe message-verification condition."
  ),
  {
    id: "bir_src_000270",
    bridge_id: "bir_bridge_000005",
    incident_id: "bir_inc_000005",
    event_id: "bir_ev_000015",
    source_type: "official_blog",
    title: "Poly Network — Asset Recovery Complete",
    url: "https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4",
    publisher: "Poly Network",
    published_at: "2021-08-26",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "recovery",
    language: "en",
    author: "Poly Network",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: true,
    supports_shutdown: false,
    supports_migration: false,
    notes: "First-party notice that all affected user assets worth USD 610 million had been recovered and that the project was moving from asset recovery to service resumption."
  },
  {
    id: "bir_src_000271",
    bridge_id: "bir_bridge_000015",
    incident_id: "bir_inc_000019",
    event_id: "bir_ev_000059",
    source_type: "official_social",
    title: "Celer cBridge DNS incident update and compensation commitment",
    url: "https://x.com/CelerNetwork/status/1560123830844411904",
    publisher: "Celer Network",
    published_at: "2022-08-18",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-07-30",
    claim_scope: "reimbursement",
    language: "en",
    author: "Celer Network",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: true,
    supports_reopen: true,
    supports_shutdown: true,
    supports_migration: false,
    notes: "First-party update describing the DNS cache-poisoning incident, planned frontend restoration with added monitoring, and full compensation commitment for affected users."
  }
];

const additionIds = new Set(additions.map((record) => record.id));
if (additionIds.size !== additions.length) throw new Error("duplicate addition ids");

for (const id of Object.keys(expectedEventCounts)) eventById.get(id).source_count += 1;
incidentById.get("bir_inc_000001").source_count += 1;
incidentById.get("bir_inc_000003").source_count += 1;
incidentById.get("bir_inc_000005").source_count += 1;
incidentById.get("bir_inc_000019").source_count += 1;
incidentById.get("bir_inc_000034").source_count += 2;

evidence.push(...additions);

if (evidence.length !== 271) throw new Error(`unexpected evidence total ${evidence.length}`);

for (const [id, count] of Object.entries(expectedEventCounts)) {
  if (eventById.get(id).source_count !== count + 1) throw new Error(`event count not incremented: ${id}`);
}
for (const [id, count] of Object.entries(expectedIncidentCounts)) {
  const expected = count + (id === "bir_inc_000034" ? 2 : 1);
  if (incidentById.get(id).source_count !== expected) throw new Error(`incident count not incremented: ${id}`);
}

writeRecords("data/incidents.json", incidents);
writeRecords("data/events.json", events);
writeRecords("data/evidence.json", evidence);

console.log("Applied event Tier 1 canonical Batch 1.");
console.log("Evidence: 265 -> 271");
console.log("Event Tier 1 targets: 6");
