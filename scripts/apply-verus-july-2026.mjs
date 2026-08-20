import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readText = (p) => fs.readFileSync(path.join(root, p), "utf8");
const writeText = (p, value) => fs.writeFileSync(path.join(root, p), value);
const readJson = (p) => JSON.parse(readText(p));

const BRIDGE_ID = "bir_bridge_000039";
const INCIDENT_ID = "bir_inc_000041";
const EVENT_ID = "bir_ev_000194";
const SOURCE_IDS = [
  "bir_src_000312",
  "bir_src_000313",
  "bir_src_000314",
  "bir_src_000315",
  "bir_src_000316"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function appendArrayRecords(file, records, idField = "id") {
  const existing = readJson(file);
  const existingIds = new Set(existing.map((record) => record[idField]));
  for (const record of records) {
    assert(!existingIds.has(record[idField]), `${file}: ${record[idField]} already exists`);
  }
  const text = readText(file);
  const close = text.lastIndexOf("]");
  assert(close >= 0, `${file}: closing array bracket not found`);
  const before = text.slice(0, close).trimEnd();
  const separator = before.endsWith("[") ? "" : ",";
  const added = records.map((record) => `  ${JSON.stringify(record)}`).join(",\n");
  writeText(file, `${before}${separator}\n${added}\n]\n`);
}

const bridgesBefore = readJson("data/bridges.json");
const incidentsBefore = readJson("data/incidents.json");
const eventsBefore = readJson("data/events.json");
const evidenceBefore = readJson("data/evidence.json");
assert(bridgesBefore.length === 38, `expected 38 bridges, found ${bridgesBefore.length}`);
assert(incidentsBefore.length === 40, `expected 40 incidents, found ${incidentsBefore.length}`);
assert(eventsBefore.length === 193, `expected 193 events, found ${eventsBefore.length}`);
assert(evidenceBefore.length === 311, `expected 311 evidence, found ${evidenceBefore.length}`);
assert(bridgesBefore.at(-1)?.id === "bir_bridge_000038", "unexpected bridge tail id");
assert(incidentsBefore.at(-1)?.id === "bir_inc_000040", "unexpected incident tail id");
assert(eventsBefore.at(-1)?.id === "bir_ev_000193", "unexpected event tail id");
assert(evidenceBefore.at(-1)?.id === "bir_src_000311", "unexpected evidence tail id");

const bridge = {
  id: BRIDGE_ID,
  slug: "verus-ethereum-bridge",
  previous_slugs: [],
  redirect_from: [],
  canonical_name: "Verus-Ethereum Bridge",
  type: "asset_bridge",
  status: "paused",
  summary: "Verus-Ethereum Bridge is Verus's non-custodial bridge between Verus and Ethereum. A second 2026 exploit on July 23 used the Ethereum import path to trigger unbacked payouts from bridge reserves. Verus later referenced the latest Ethereum bridge hack in its v1.2.17-3 security release while stating that Ethereum contracts were not yet ready for upgrade; a dated post-incident reopening has not been established.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-20",
  last_verified_at: "2026-08-20",
  aliases: ["Verus Ethereum Bridge"],
  launch_date: "2023-10-20",
  launch_date_precision: "day",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://www.verus.io/ethereum-bridge",
  official_domain: "verus.io",
  official_url_status: "live_verified",
  archived_url: null,
  primary_chains: ["verus", "ethereum"],
  primary_assets: ["eth", "tbtc", "usdc", "usdt", "mkr", "scrvusd", "eurc"],
  operator_name: "Verus protocol contributors / Verus community",
  operator_type: "protocol_team",
  ecosystem_name: "Verus",
  related_protocols: ["Verus Protocol", "Bridge.vETH", "Verus Bridgekeeper"],
  brand_history_notes: null,
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "This canonical record currently contains the July 2026 incident only. The separate May 2026 exploit remains a distinct future review/application target and is not collapsed into this incident or counted as a second canonical incident here."
};

const incident = {
  id: INCIDENT_ID,
  bridge_id: BRIDGE_ID,
  slug: "verus-ethereum-bridge-2026-july-import-verification-exploit",
  previous_slugs: [],
  redirect_from: [],
  title: "Verus-Ethereum Bridge July 2026 import verification exploit",
  incident_date: "2026-07-23",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "On July 23, 2026, the Verus-Ethereum Bridge was exploited through the Ethereum import path, causing unbacked payouts from bridge reserves. Reproducible Ethereum analysis and contemporaneous reporting place the drain at about $7.54 million across ETH, tBTC, USDC, USDT, MKR, scrvUSD, and EURC. Verus's August 1 security release explicitly references the latest Ethereum bridge hack while saying Ethereum contracts were not yet ready for upgrade. Recovery, reimbursement, and post-incident reopening remain unverified.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 4,
  last_reviewed_at: "2026-08-20",
  last_verified_at: "2026-08-20",
  is_major_incident: true,
  reported_loss_usd_display: "about $7.54 million",
  reported_loss_usd: 7540000,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "Independent full-chain analysis and contemporaneous reporting converge on approximately $7.54 million drained from Ethereum-side bridge reserves.",
  reported_loss_assets: ["eth", "tbtc", "usdc", "usdt", "mkr", "scrvusd", "eurc"],
  usd_valuation_date: "2026-07-23",
  loss_amount_basis: "mixed_sources",
  amount_confidence: "medium",
  amount_note: "The approximately $7.54 million figure is not a first-party exact accounting statement. Reproducible token outflows and contemporaneous reporting support the approximate total, whose USD value depends on valuation timing.",
  amount_claims: [
    {
      amount_text: "ETH, tBTC, USDC, USDT, MKR, scrvUSD, and EURC drained from Ethereum bridge reserves",
      amount_usd_text: "about $7.54 million",
      source_id: "bir_src_000314",
      basis: "independent full-chain analysis with contemporaneous valuation",
      usd_valuation_date: "2026-07-23",
      notes: "Used as the approximate canonical display amount; individual token outflows remain independently reproducible."
    }
  ],
  recovery_status: "unknown",
  reimbursement_status: "unknown",
  restart_status: "paused",
  current_outcome: "paused_long_term",
  is_unresolved: true,
  unresolved_reason: [
    "No admitted reviewed source establishes a completed July-specific attacker-fund recovery.",
    "No admitted reviewed source establishes July-specific user or protocol reimbursement.",
    "A dated post-July bridge or cross-chain reopening has not been established; the August 1 first-party release said Ethereum contracts were not yet ready for upgrade."
  ],
  affected_chains: ["verus", "ethereum"],
  affected_assets: ["eth", "tbtc", "usdc", "usdt", "mkr", "scrvusd", "eurc"],
  attack_vector_category: "message_verification_failure",
  postmortem_available: "available",
  known_unknowns: [
    "The first-party long-form security writeup remains review authority only because no admissible archive capture was found under BIR's existing risky-host preservation boundary; it is not added as canonical evidence in this application.",
    "Canonical displayed mechanism language is intentionally limited to the independently supported import-verification / unbacked-payout boundary rather than reproducing implementation-level details supported only by the unadmitted long-form source.",
    "The separate May 2026 exploit has its own recovery and restoration history and is not reused as evidence for July recovery, reimbursement, or restart.",
    "The exact USD valuation can vary with contemporaneous token prices even though the transaction and token outflows are reproducible."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
};

const event = {
  id: EVENT_ID,
  bridge_id: BRIDGE_ID,
  incident_id: INCIDENT_ID,
  event_type: "exploit_occurred",
  event_date: "2026-07-23",
  event_date_precision: "day",
  title: "Verus-Ethereum Bridge exploited through Ethereum import path",
  description: "A July 23 Ethereum transaction drained approximately $7.54 million in ETH, tBTC, USDC, USDT, MKR, scrvUSD, and EURC after an import-verification failure allowed unbacked payouts from bridge reserves. Verus later referenced the latest bridge hack in its August 1 security release; post-incident Ethereum bridge reopening remained unverified.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "critical",
  status_effect: "bridge reserves drained; post-incident Ethereum bridge reopening unverified",
  source_count: 4,
  sort_order: 10,
  amount_text: "about $7.54 million",
  recovered_amount_text: null,
  reimbursement_status: "unknown",
  restart_status: "paused",
  affected_chains: ["verus", "ethereum"],
  affected_assets: ["eth", "tbtc", "usdc", "usdt", "mkr", "scrvusd", "eurc"],
  notes: "Safe high-level mechanism only. The May and July 2026 incidents remain separate, and May recovery/restoration figures are not imported into this event.",
  duplicate_of: null,
  merged_into: null
};

const evidence = [
  {
    id: "bir_src_000312",
    bridge_id: BRIDGE_ID,
    incident_id: null,
    event_id: null,
    source_type: "other",
    title: "What is the Verus-Ethereum Bridge",
    url: "https://docs.verus.io/eth-bridge/",
    publisher: "Verus",
    published_at: "2026-08-20",
    published_at_precision: "approximate",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    accessed_at: "2026-08-20",
    claim_scope: "bridge_entity",
    language: "en",
    author: "Verus",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "First-party bridge documentation supporting Verus↔Ethereum identity, non-custodial scope, operational history, bridge reserve context, and the published Ethereum mainnet bridge contract address. The approximate publication date represents the current reviewed documentation state, not the original page launch date."
  },
  {
    id: "bir_src_000313",
    bridge_id: BRIDGE_ID,
    incident_id: INCIDENT_ID,
    event_id: EVENT_ID,
    source_type: "official_statement",
    title: "Verus v1.2.17-3 — critical security upgrade",
    url: "https://github.com/VerusCoin/VerusCoin/releases/tag/v1.2.17-3",
    publisher: "VerusCoin",
    published_at: "2026-08-01",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    accessed_at: "2026-08-20",
    claim_scope: "incident_case",
    language: "en",
    author: "VerusCoin contributors",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "Stable first-party incident-specific authority explicitly referring to the latest Ethereum bridge hack and continuing hardening work while stating that Ethereum contracts were not yet ready for upgrade. It links the long-form Google Doc, which remains review authority only and is not admitted here."
  },
  {
    id: "bir_src_000314",
    bridge_id: BRIDGE_ID,
    incident_id: INCIDENT_ID,
    event_id: EVENT_ID,
    source_type: "blockchain_analytics_report",
    title: "The missing check: a full-chain post-mortem of the $7.54M Verus bridge exploit",
    url: "https://sirenbow.com/research/verus-missing-check/",
    publisher: "SIRENBOW",
    published_at: "2026-07",
    published_at_precision: "month",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    accessed_at: "2026-08-20",
    claim_scope: "incident_case",
    language: "en",
    author: null,
    quote_excerpt: null,
    is_primary: false,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "Independent reproducible full-chain analysis supporting the July 23 ~03:45 UTC transaction boundary, bridge/implementation/verification-contract identifiers, approximate $7.54 million total, affected ERC-20 outflows, and the high-level unbacked-import verification failure."
  },
  {
    id: "bir_src_000315",
    bridge_id: BRIDGE_ID,
    incident_id: INCIDENT_ID,
    event_id: EVENT_ID,
    source_type: "news_article",
    title: "Bitcoin, Ethereum-linked protocols lose $35 million in multiple attacks hours apart",
    url: "https://www.coindesk.com/tech/2026/07/23/bitcoin-ethereum-linked-protocols-lose-usd35-million-in-multiple-attacks-hours-apart",
    publisher: "CoinDesk",
    published_at: "2026-07-23",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    accessed_at: "2026-08-20",
    claim_scope: "amount",
    language: "en",
    author: "Shaurya Malwa",
    quote_excerpt: null,
    is_primary: false,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "Contemporaneous reporting corroborating the second July incident, approximate $7.54 million drain, affected asset classes, and separation from the earlier May exploit."
  },
  {
    id: "bir_src_000316",
    bridge_id: BRIDGE_ID,
    incident_id: INCIDENT_ID,
    event_id: EVENT_ID,
    source_type: "other",
    title: "Verus-Ethereum Bridge July 2026 exploit transaction",
    url: "https://etherscan.io/tx/0xa1f1e65c1cea4dba4ae439cd4dcdba6cc2dbda0ed1228e61f29ae9c9324eb099",
    publisher: "Etherscan",
    published_at: "2026-07-23",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    accessed_at: "2026-08-20",
    claim_scope: "incident_case",
    language: "en",
    author: null,
    quote_excerpt: null,
    is_primary: false,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "Direct Ethereum transaction reference for the July 23 drain. Used to anchor the on-chain incident boundary; aggregate USD valuation remains sourced through the reviewed technical/reporting package."
  }
];

appendArrayRecords("data/bridges.json", [bridge]);
appendArrayRecords("data/incidents.json", [incident]);
appendArrayRecords("data/events.json", [event]);
appendArrayRecords("data/evidence.json", evidence);

const chains = readJson("data/reference/chains.json");
assert(!chains.verus, "reference chain verus already exists");
chains.verus = {
  display_name: "Verus",
  aliases: ["Verus Network", "VRSC network"]
};
writeText("data/reference/chains.json", `${JSON.stringify(chains, null, 2)}\n`);

const assets = readJson("data/reference/assets.json");
for (const key of ["tbtc", "mkr", "scrvusd", "eurc"]) {
  assert(!assets[key], `reference asset ${key} already exists`);
}
assets.tbtc = { display_name: "tBTC", aliases: ["Threshold Bitcoin"] };
assets.mkr = { display_name: "MKR", aliases: ["Maker"] };
assets.scrvusd = { display_name: "scrvUSD", aliases: ["Savings crvUSD"] };
assets.eurc = { display_name: "EURC", aliases: ["Euro Coin"] };
writeText("data/reference/assets.json", `${JSON.stringify(assets, null, 2)}\n`);

const countDocs = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md",
  "docs/runbooks/recovery-checkpoint.md"
];
for (const file of countDocs) {
  let text = readText(file);
  text = text
    .replace(/Bridges(\s+)38\b/g, (_, ws) => `Bridges${ws}39`)
    .replace(/Incidents(\s+)40\b/g, (_, ws) => `Incidents${ws}41`)
    .replace(/Events(\s+)193\b/g, (_, ws) => `Events${ws}194`)
    .replace(/Evidence(\s+)311\b/g, (_, ws) => `Evidence${ws}316`)
    .replace(/Canonical evidence is now 311\./g, "Canonical evidence is now 316.")
    .replace(/Primary evidence is 222 \/ 311/g, "Primary evidence is 224 / 316")
    .replace(/Tier 1 evidence is 239 \/ 311/g, "Tier 1 evidence is 241 / 316");
  writeText(file, text);
}

const bridgesAfter = readJson("data/bridges.json");
const incidentsAfter = readJson("data/incidents.json");
const eventsAfter = readJson("data/events.json");
const evidenceAfter = readJson("data/evidence.json");
assert(bridgesAfter.length === 39, `expected 39 bridges, found ${bridgesAfter.length}`);
assert(incidentsAfter.length === 41, `expected 41 incidents, found ${incidentsAfter.length}`);
assert(eventsAfter.length === 194, `expected 194 events, found ${eventsAfter.length}`);
assert(evidenceAfter.length === 316, `expected 316 evidence, found ${evidenceAfter.length}`);
assert(evidenceAfter.filter((source) => source.incident_id === INCIDENT_ID).length === 4, "Verus incident source_count must be 4");
assert(evidenceAfter.filter((source) => source.event_id === EVENT_ID).length === 4, "Verus event source_count must be 4");
assert(!evidenceAfter.some((source) => source.url.includes("docs.google.com/document/d/1R5kxmTa01gHJ5V7XdjyFphG_q5V02mtkyK7lOR6lV3w")), "risky unarchived Verus Google Doc must not be canonical evidence");

console.log("Applied bounded Verus July 2026 canonical package.");
console.log("Counts: 39 bridges / 41 incidents / 194 events / 316 evidence.");
console.log(`IDs: ${BRIDGE_ID} / ${INCIDENT_ID} / ${EVENT_ID} / ${SOURCE_IDS[0]}-${SOURCE_IDS.at(-1)}`);
