import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const writeArray = (relativePath, records) => {
  const body = records.map((record) => `  ${JSON.stringify(record)}`).join(",\n");
  fs.writeFileSync(path.join(root, relativePath), `[\n${body}\n]\n`);
};

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const expected = { bridges: 33, incidents: 34, events: 173, evidence: 199 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
for (const [key, value] of Object.entries(expected)) {
  if (actual[key] !== value) throw new Error(`Expected ${key}=${value}, received ${actual[key]}`);
}

const byId = (records, id, label) => {
  const record = records.find((item) => item.id === id);
  if (!record) throw new Error(`Missing ${label} ${id}`);
  return record;
};

const incident = (id) => byId(incidents, id, "incident");
const event = (id) => byId(events, id, "event");
const source = (id) => byId(evidence, id, "evidence");
const reviewDate = "2026-07-28";

const normalizedReopenEvents = {
  bir_ev_000032: "network_reopened",
  bir_ev_000038: "bridge_upgrade",
  bir_ev_000042: "bridge_relaunched",
  bir_ev_000056: "bridge_relaunched",
  bir_ev_000060: "frontend_restored",
  bir_ev_000063: "service_restored",
  bir_ev_000085: "bridge_restored_and_liquidity_migration_started"
};

for (const [id, expectedType] of Object.entries(normalizedReopenEvents)) {
  const item = event(id);
  if (item.event_type !== expectedType) throw new Error(`${id}: expected ${expectedType}, received ${item.event_type}`);
  item.event_type = "bridge_reopened";
  item.restart_status = "reopened";
  item.update_status = "current";
  item.notes = item.notes
    ? `${item.notes} Event type normalized from legacy descriptive value ${expectedType}.`
    : `Event type normalized from legacy descriptive value ${expectedType}.`;
}

const roninAftermath = event("bir_ev_000003");
if (roninAftermath.event_type !== "aftermath_summary") throw new Error("Unexpected Ronin aftermath event type");
Object.assign(roninAftermath, {
  event_type: "reimbursement_completed",
  event_date: "2022-06-28",
  event_date_precision: "day",
  title: "Ronin users made whole and bridge liabilities reimbursed",
  description: "Sky Mavis reported that the remaining bridge liabilities were fully reimbursed, user-backed wETH and USDC were restored 1:1, and affected users were made whole.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "high",
  status_effect: "active",
  source_count: 1,
  sort_order: 30,
  amount_text: null,
  recovered_amount_text: "71,600 ETH and 25.5 million USDC liabilities fully reimbursed by Sky Mavis",
  reimbursement_status: "completed",
  restart_status: "reopened",
  notes: "Operator-funded reimbursement is recorded separately from partial attacker-fund recovery."
});

const wormholeBackfill = event("bir_ev_000005");
if (wormholeBackfill.event_type !== "deficit_backfilled") throw new Error("Unexpected Wormhole backfill event type");
Object.assign(wormholeBackfill, {
  event_type: "reimbursement_completed",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "high",
  status_effect: "active",
  reimbursement_status: "completed",
  restart_status: "reopened",
  notes: "Sponsor-funded deficit backfill is classified as completed reimbursement; it is not attacker-fund recovery."
});

function addEvent(record) {
  if (events.some((item) => item.id === record.id)) throw new Error(`Duplicate event ID ${record.id}`);
  events.push(record);
}

function newEvent({ id, incidentId, eventType, date, precision = "day", title, description, impact = "high", statusEffect = "active", sourceCount = 1, sortOrder, reimbursementStatus, restartStatus, recoveredAmountText = null, notes = null }) {
  const parent = incident(incidentId);
  return {
    id,
    bridge_id: parent.bridge_id,
    incident_id: parent.id,
    event_type: eventType,
    event_date: date,
    event_date_precision: precision,
    title,
    description,
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    impact_level: impact,
    status_effect: statusEffect,
    source_count: sourceCount,
    sort_order: sortOrder,
    amount_text: null,
    recovered_amount_text: recoveredAmountText,
    reimbursement_status: reimbursementStatus,
    restart_status: restartStatus,
    affected_chains: [...parent.affected_chains],
    affected_assets: [...parent.affected_assets],
    notes,
    duplicate_of: null,
    merged_into: null
  };
}

addEvent(newEvent({
  id: "bir_ev_000174",
  incidentId: "bir_inc_000001",
  eventType: "bridge_reopened",
  date: "2022-06-28",
  title: "Ronin Bridge reopened after audits and recapitalization",
  description: "Ronin reported that the rebuilt bridge was open for deposits and withdrawals after internal and external audits and full backing of user balances.",
  sortOrder: 40,
  reimbursementStatus: "completed",
  restartStatus: "reopened"
}));

addEvent(newEvent({
  id: "bir_ev_000175",
  incidentId: "bir_inc_000002",
  eventType: "bridge_reopened",
  date: "2022-02-03",
  title: "Wormhole service restored after deficit backfill",
  description: "Wormhole announced that funds had been restored and the bridge service was operational again after the sponsor-funded deficit backfill.",
  sortOrder: 30,
  reimbursementStatus: "completed",
  restartStatus: "reopened",
  notes: "Reopening is recorded separately from the deficit-backfill reimbursement event."
}));

addEvent(newEvent({
  id: "bir_ev_000176",
  incidentId: "bir_inc_000005",
  eventType: "bridge_partially_reopened",
  date: "2021-08-16",
  title: "Poly Network upgraded mainnet and began restoring cross-chain service",
  description: "Poly Network reported that its upgraded mainnet was live and cross-chain functionality had begun returning for supported assets under a staged restoration process.",
  statusEffect: "limited",
  sortOrder: 25,
  reimbursementStatus: "not_applicable",
  restartStatus: "partially_reopened"
}));

addEvent(newEvent({
  id: "bir_ev_000177",
  incidentId: "bir_inc_000005",
  eventType: "bridge_reopened",
  date: "2021-09",
  precision: "month",
  title: "Poly Network completed its operations-resumption roadmap",
  description: "Poly Network later reported that the roadmap for resuming operations and restoring user assets had been completed, after cross-chain services and advanced functions were progressively restored.",
  sortOrder: 40,
  reimbursementStatus: "not_applicable",
  restartStatus: "reopened"
}));

addEvent(newEvent({
  id: "bir_ev_000178",
  incidentId: "bir_inc_000006",
  eventType: "bridge_reopened",
  date: "2022-10-12",
  title: "BSC Token Hub cross-chain transfers re-enabled after urgent patch",
  description: "BNB Chain deployed an urgent cross-chain infrastructure patch and reported that previously paused cross-chain transfers would be re-enabled after the upgrade took effect.",
  sourceCount: 2,
  sortOrder: 25,
  reimbursementStatus: "not_applicable",
  restartStatus: "reopened",
  notes: "This bridge-specific event is separate from the BNB Smart Chain validator pause and resume."
}));

addEvent(newEvent({
  id: "bir_ev_000179",
  incidentId: "bir_inc_000010",
  eventType: "bridge_reopened",
  date: "2021-10",
  precision: "month",
  title: "THORChain returned to staged trading after 2021 remediation",
  description: "THORChain returned to staged trading after the July exploit response and protocol hardening work; this event links the shared operational restart to the first ETH Router incident.",
  sortOrder: 40,
  reimbursementStatus: "completed",
  restartStatus: "reopened",
  notes: "The same operational restart period also applies to the second July 2021 ETH Router incident."
}));

addEvent(newEvent({
  id: "bir_ev_000180",
  incidentId: "bir_inc_000010",
  eventType: "reimbursement_completed",
  date: "2022-05-11",
  title: "THORChain reported 2021 exploit users fully reimbursed",
  description: "THORChain stated that after the chain restarted, liquidity providers and node operators affected by the 2021 exploits were fully reimbursed approximately 16 million dollars in aggregate.",
  sortOrder: 50,
  reimbursementStatus: "completed",
  restartStatus: "reopened",
  recoveredAmountText: "approximately $16 million reimbursed across the combined 2021 exploit aftermath",
  notes: "The official aggregate amount is not split between the two July incidents."
}));

addEvent(newEvent({
  id: "bir_ev_000181",
  incidentId: "bir_inc_000011",
  eventType: "reimbursement_completed",
  date: "2022-05-11",
  title: "THORChain reported 2021 exploit users fully reimbursed",
  description: "THORChain stated that after the chain restarted, liquidity providers and node operators affected by the 2021 exploits were fully reimbursed approximately 16 million dollars in aggregate.",
  sortOrder: 30,
  reimbursementStatus: "completed",
  restartStatus: "reopened",
  recoveredAmountText: "approximately $16 million reimbursed across the combined 2021 exploit aftermath",
  notes: "The official aggregate amount is not split between the two July incidents."
}));

addEvent(newEvent({
  id: "bir_ev_000182",
  incidentId: "bir_inc_000014",
  eventType: "reimbursement_completed",
  date: "2023-05-30",
  title: "Allbridge recovery payments completed for submitted claims",
  description: "Allbridge reported that recovery payments had been provided to all affected users who submitted the application form after most stolen funds were recovered.",
  sortOrder: 50,
  reimbursementStatus: "completed",
  restartStatus: "reopened",
  recoveredAmountText: "recovery payments to all affected users who submitted the application form",
  notes: "The completion scope remains qualified to users who submitted the application form."
}));

function addEvidence(record) {
  if (evidence.some((item) => item.id === record.id)) throw new Error(`Duplicate evidence ID ${record.id}`);
  evidence.push(record);
}

function newEvidence({ id, incidentId, eventId, sourceType, title, url, publisher, publishedAt, precision = "day", claimScope, supportsReimbursement = false, supportsReopen = false, notes = null, officialDomain = true }) {
  const parent = incident(incidentId);
  return {
    id,
    bridge_id: parent.bridge_id,
    incident_id: parent.id,
    event_id: eventId,
    source_type: sourceType,
    title,
    url,
    publisher,
    published_at: publishedAt,
    published_at_precision: precision,
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: reviewDate,
    claim_scope: claimScope,
    language: "en",
    author: null,
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: officialDomain,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: supportsReimbursement,
    supports_reopen: supportsReopen,
    supports_shutdown: false,
    supports_migration: false,
    notes
  };
}

const roninUrl = "https://blog.roninchain.com/p/the-ronin-bridge-is-open-";
addEvidence(newEvidence({ id: "bir_src_000200", incidentId: "bir_inc_000001", eventId: "bir_ev_000003", sourceType: "official_statement", title: "The Ronin Bridge Is Open", url: roninUrl, publisher: "Ronin", publishedAt: "2022-06-28", claimScope: "reimbursement", supportsReimbursement: true, supportsReopen: true, notes: "Primary source for full liability reimbursement, 1:1 backing, and users made whole." }));
addEvidence(newEvidence({ id: "bir_src_000201", incidentId: "bir_inc_000001", eventId: "bir_ev_000174", sourceType: "official_statement", title: "The Ronin Bridge Is Open", url: roninUrl, publisher: "Ronin", publishedAt: "2022-06-28", claimScope: "restart", supportsReimbursement: true, supportsReopen: true, notes: "Duplicate URL retained as a separate event-scoped evidence record for reopening." }));

const wormholeRestoration = source("bir_src_000064");
addEvidence({ ...wormholeRestoration, id: "bir_src_000202", event_id: "bir_ev_000175", claim_scope: "restart", accessed_at: reviewDate, supports_reimbursement: true, supports_reopen: true, notes: "Duplicate official source retained as a separate event-scoped evidence record for service restoration." });

addEvidence(newEvidence({ id: "bir_src_000203", incidentId: "bir_inc_000005", eventId: "bir_ev_000176", sourceType: "official_blog", title: "Poly Network mainnet upgrade went live", url: "https://medium.com/poly-network/poly-network-mainnet-upgrade-goes-live-d708f4fa2cf1", publisher: "Poly Network", publishedAt: "2021-08-16", claimScope: "restart", supportsReopen: true, notes: "Primary source for the start of staged cross-chain service restoration." }));
addEvidence(newEvidence({ id: "bir_src_000204", incidentId: "bir_inc_000005", eventId: "bir_ev_000177", sourceType: "official_blog", title: "Poly Network Monthly Report (Sep)", url: "https://medium.com/poly-network/poly-network-monthly-report-sep-a4cdd9f3fb7a", publisher: "Poly Network", publishedAt: "2021-10-09", claimScope: "restart", supportsReopen: true, notes: "Primary retrospective statement that the operations-resumption roadmap was completed in September." }));

addEvidence(newEvidence({ id: "bir_src_000205", incidentId: "bir_inc_000006", eventId: "bir_ev_000178", sourceType: "official_blog", title: "BNB Chain: A Decentralized Response", url: "https://www.bnbchain.org/en/blog/bnb-chain-a-decentralized-response", publisher: "BNB Chain", publishedAt: "2022-10-11", claimScope: "restart", supportsReopen: true, notes: "Primary source distinguishing chain resumption from bridge transfer re-enablement and describing the October 12 upgrade." }));
addEvidence(newEvidence({ id: "bir_src_000206", incidentId: "bir_inc_000006", eventId: "bir_ev_000178", sourceType: "official_blog", title: "Technology Update of BNB Chain in Oct 2022", url: "https://www.bnbchain.org/en/blog/technology-update-of-bnb-chain-in-october-2022", publisher: "BNB Chain", publishedAt: "2022-11-08", claimScope: "restart", supportsReopen: true, notes: "Primary retrospective confirmation that the urgent patch re-enabled cross-chain infrastructure." }));

const thorUrl = "https://medium.com/thorchain/thorchains-layers-of-security-e308d537acf1";
addEvidence(newEvidence({ id: "bir_src_000207", incidentId: "bir_inc_000010", eventId: "bir_ev_000179", sourceType: "official_blog", title: "THORChain's Layers of Security", url: thorUrl, publisher: "THORChain", publishedAt: "2022-05-11", claimScope: "restart", supportsReimbursement: true, supportsReopen: true, notes: "Primary retrospective source confirming that the chain restarted after the 2021 incidents." }));
addEvidence(newEvidence({ id: "bir_src_000208", incidentId: "bir_inc_000010", eventId: "bir_ev_000180", sourceType: "official_blog", title: "THORChain's Layers of Security", url: thorUrl, publisher: "THORChain", publishedAt: "2022-05-11", claimScope: "reimbursement", supportsReimbursement: true, supportsReopen: true, notes: "Incident-scoped evidence for the combined approximately $16 million reimbursement statement." }));
addEvidence(newEvidence({ id: "bir_src_000209", incidentId: "bir_inc_000011", eventId: "bir_ev_000181", sourceType: "official_blog", title: "THORChain's Layers of Security", url: thorUrl, publisher: "THORChain", publishedAt: "2022-05-11", claimScope: "reimbursement", supportsReimbursement: true, supportsReopen: true, notes: "Incident-scoped evidence for the combined approximately $16 million reimbursement statement." }));

addEvidence(newEvidence({ id: "bir_src_000210", incidentId: "bir_inc_000014", eventId: "bir_ev_000182", sourceType: "official_blog", title: "Allbridge Core Updates Following the Relaunch", url: "https://allbridge.medium.com/allbridge-core-updates-following-the-relaunch-9f7716eeb5da", publisher: "Allbridge", publishedAt: "2023-05-30", claimScope: "reimbursement", supportsReimbursement: true, supportsReopen: true, notes: "Primary qualified completion source: recovery payments to all affected users who submitted the application form." }));

const evidenceAdditions = {
  bir_inc_000001: 2,
  bir_inc_000002: 1,
  bir_inc_000005: 2,
  bir_inc_000006: 2,
  bir_inc_000010: 2,
  bir_inc_000011: 1,
  bir_inc_000014: 1
};

for (const [id, count] of Object.entries(evidenceAdditions)) {
  const item = incident(id);
  item.source_count += count;
  item.last_reviewed_at = reviewDate;
  item.last_verified_at = reviewDate;
}

incident("bir_inc_000001").known_unknowns = incident("bir_inc_000001").known_unknowns.filter(
  (item) => item !== "This seed record does not yet include a full reimbursement timeline."
);

if (events.length !== 182) throw new Error(`Expected 182 events, received ${events.length}`);
if (evidence.length !== 210) throw new Error(`Expected 210 evidence records, received ${evidence.length}`);

writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);

const specPath = path.join(root, "SPEC.md");
let spec = fs.readFileSync(specPath, "utf8");
const reimbursementMarker = `### restart_status\n`;
if (!spec.includes(reimbursementMarker)) throw new Error("SPEC reimbursement insertion marker not found");
const reimbursementSemantics = `### reimbursement semantics\n\n\`reimbursement_status\` records whether affected user claims or bridge liabilities were made whole. Completion may occur through direct claim payments, treasury or sponsor funding, investor funding, or a full deficit backfill. The event description must identify the mechanism and scope.\n\nReimbursement does not imply attacker-fund recovery. Qualified completion claims, such as payments to all users who submitted a claim form, must remain qualified in canonical text.\n\n`;
spec = spec.replace(reimbursementMarker, `${reimbursementSemantics}${reimbursementMarker}`);
fs.writeFileSync(specPath, spec);

const methodologyPath = path.join(root, "src/pages/methodology/index.astro");
let methodology = fs.readFileSync(methodologyPath, "utf8");
const methodologyMarker = `  <SectionHeader kicker="Uncertainty"`;
if (!methodology.includes(methodologyMarker)) throw new Error("Methodology insertion marker not found");
const methodologyBlock = `  <SectionHeader kicker="Aftermath" title="Recovery, reimbursement, and restart" description="BIR keeps different aftermath mechanisms separate." />\n\n  <KeyValueList items={[\n    { label: "Recovery", value: "Attacker-controlled or otherwise lost assets were returned, frozen, seized, or recovered." },\n    { label: "Reimbursement", value: "Affected user claims or bridge liabilities were made whole through claim payments, treasury or sponsor funding, investor funding, or a full deficit backfill." },\n    { label: "Restart", value: "The affected bridge, frontend, or transfer path resumed. Chain resumption alone does not prove bridge reopening." },\n    { label: "Qualified scope", value: "A statement covering submitted claims or a defined user group is not broadened to every possible affected address." }\n  ]} />\n\n`;
methodology = methodology.replace(methodologyMarker, `${methodologyBlock}${methodologyMarker}`);
fs.writeFileSync(methodologyPath, methodology);

console.log("Applied Phase 3 aftermath canonical migration.");
console.log(JSON.stringify({ bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length }, null, 2));
