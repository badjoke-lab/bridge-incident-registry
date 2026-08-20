import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readText = (p) => fs.readFileSync(path.join(root, p), "utf8");
const writeText = (p, value) => fs.writeFileSync(path.join(root, p), value);
const readJson = (p) => JSON.parse(readText(p));
const writeArray = (p, records) => writeText(p, `[\n${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const BRIDGE_ID = "bir_bridge_000039";
const JULY_INCIDENT_ID = "bir_inc_000041";
const INCIDENT_ID = "bir_inc_000042";
const EVENT_IDS = ["bir_ev_000195", "bir_ev_000196", "bir_ev_000197", "bir_ev_000198", "bir_ev_000199"];
const SOURCE_IDS = ["bir_src_000317", "bir_src_000318", "bir_src_000319", "bir_src_000320", "bir_src_000321", "bir_src_000322", "bir_src_000323", "bir_src_000324", "bir_src_000325"];

const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const events = readJson("data/events.json");
const evidence = readJson("data/evidence.json");

assert(bridges.length === 39, `expected 39 bridges, found ${bridges.length}`);
assert(incidents.length === 41, `expected 41 incidents, found ${incidents.length}`);
assert(events.length === 194, `expected 194 events, found ${events.length}`);
assert(evidence.length === 316, `expected 316 evidence, found ${evidence.length}`);
assert(incidents.at(-1)?.id === JULY_INCIDENT_ID, "unexpected incident tail id");
assert(events.at(-1)?.id === "bir_ev_000194", "unexpected event tail id");
assert(evidence.at(-1)?.id === "bir_src_000316", "unexpected evidence tail id");

const bridge = bridges.find((record) => record.id === BRIDGE_ID);
assert(bridge, `${BRIDGE_ID} missing`);
assert(bridge.status === "paused", "Verus bridge current status must remain paused");
assert(bridge.major_incident_count === 1, "expected Verus major_incident_count 1 before May application");
assert(bridge.has_reimbursement_history === false, "expected Verus reimbursement history false before May application");
const julyBefore = JSON.stringify(incidents.find((record) => record.id === JULY_INCIDENT_ID));
assert(julyBefore, `${JULY_INCIDENT_ID} missing`);

bridge.major_incident_count = 2;
bridge.has_reimbursement_history = true;
bridge.notes = "This bridge has separate May and July 2026 canonical incidents. May attacker-fund recovery, restitution and reopen evidence is scoped only to the May incident; July recovery, reimbursement and post-incident reopening remain unresolved. Current bridge status remains paused after the later July incident.";

const incident = {
  id: INCIDENT_ID,
  bridge_id: BRIDGE_ID,
  slug: "verus-ethereum-bridge-2026-may-import-verification-exploit",
  previous_slugs: [],
  redirect_from: [],
  title: "Verus-Ethereum Bridge May 2026 import verification exploit",
  incident_date: "2026-05-18",
  incident_date_precision: "approximate",
  incident_type: "exploit",
  summary: "In May 2026, the Verus-Ethereum Bridge suffered a separate Ethereum-side cross-chain import verification exploit before the later July incident. Independent incident reporting and transaction analysis place the gross drain at about $11.4–11.6 million across ETH, tBTC and USDC. Verus later documented partial asset recovery, a restoration and restitution process, and a July 12 bridge reopen process. A separate unexploited vulnerability caused another precautionary pause on July 16. These May-aftermath facts do not resolve the later July exploit.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 9,
  last_reviewed_at: "2026-08-20",
  last_verified_at: "2026-08-20",
  is_major_incident: true,
  reported_loss_usd_display: "about $11.4–11.6 million",
  reported_loss_usd: null,
  reported_loss_usd_min: 11400000,
  reported_loss_usd_max: 11600000,
  reported_loss_text: "Contemporaneous security reporting described approximately 1,625 ETH, 103.6 tBTC and about 147,000 USDC drained, with gross contemporaneous valuation around $11.4–11.6 million.",
  reported_loss_assets: ["eth", "tbtc", "usdc"],
  usd_valuation_date: "2026-05-18",
  loss_amount_basis: "mixed_sources",
  amount_confidence: "medium",
  amount_note: "The gross USD value is a mixed-source contemporaneous estimate, not a first-party exact accounting figure. Keep it distinct from later attacker-fund returns, residual backing loss, restitution credits and bounty treatment.",
  amount_claims: [
    {
      amount_text: "approximately 1,625 ETH, 103.6 tBTC and about 147,000 USDC drained",
      amount_usd_text: "about $11.4–11.6 million",
      source_id: "bir_src_000320",
      basis: "contemporaneous security reporting summarized by news coverage",
      usd_valuation_date: "2026-05-18",
      notes: "Used only as a mixed-source gross-loss range; no exact first-party USD loss is inferred."
    }
  ],
  recovery_status: "partial_recovery",
  reimbursement_status: "in_progress",
  restart_status: "reopened",
  current_outcome: "active_after_incident",
  is_unresolved: true,
  unresolved_reason: [
    "The reviewed first-party restoration release establishes partial recovery and restitution mechanics but does not prove that every restitution credit was fully distributed to completion.",
    "The gross USD loss remains an approximate mixed-source range rather than an exact first-party accounting value.",
    "Later July 16 and July 23 lifecycle states belong to separate subsequent security events and do not convert May recovery or reopening into July recovery or reopening evidence."
  ],
  affected_chains: ["verus", "ethereum"],
  affected_assets: ["eth", "tbtc", "usdc"],
  attack_vector_category: "message_verification_failure",
  postmortem_available: "available",
  known_unknowns: [
    "Reviewed public sources straddle May 17 and May 18 date labeling across time zones, so BIR uses an approximate May 18 incident boundary rather than claiming a more precise timestamp.",
    "The exact realized economic loss and exact attacker-fund recovery in USD are not normalized from the later residual-backing percentage.",
    "The completion state of every user restitution credit remains unverified in the admitted first-party release package.",
    "Public canonical text intentionally stops at a high-level import/message-verification failure and omits exploit reproduction instructions."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
};

const newEvents = [
  {
    id: EVENT_IDS[0], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "exploit_occurred", event_date: "2026-05-18", event_date_precision: "approximate",
    title: "Verus-Ethereum Bridge May exploit drains Ethereum-side reserves",
    description: "A separate May exploit caused unauthorized release of Ethereum-side bridge reserves after a cross-chain import/message verification failure. Contemporaneous reporting placed the gross drain around $11.4–11.6 million across ETH, tBTC and USDC. BIR keeps the public mechanism description non-operational.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "critical",
    status_effect: "bridge reserves drained; cross-chain operation entered recovery and restoration response",
    source_count: 4, sort_order: 10, amount_text: "about $11.4–11.6 million",
    recovered_amount_text: null, reimbursement_status: "unknown", restart_status: "paused",
    affected_chains: ["verus", "ethereum"], affected_assets: ["eth", "tbtc", "usdc"],
    notes: "Separate from the July 23 incident. No exploit reproduction instructions are included.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[1], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "funds_recovered", event_date: "2026-05-22", event_date_precision: "day",
    title: "Partial attacker-fund return and residual backing loss established",
    description: "Contemporaneous reporting recorded a return of about 4,052.4 ETH under a negotiated bounty arrangement. Verus later stated that, after some asset recovery, about 26.6% of the ETH and tBTC backing held in the Ethereum contract remained lost. These are different recovery scopes and are not converted into an invented recovered-USD total.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "high",
    status_effect: "partial recovery established; bridge restoration still required",
    source_count: 2, sort_order: 20, amount_text: null,
    recovered_amount_text: "about 4,052.4 ETH reported returned; Verus later reported about 26.6% ETH/tBTC backing loss remaining after some recovery",
    reimbursement_status: "unknown", restart_status: "paused",
    affected_chains: ["verus", "ethereum"], affected_assets: ["eth", "tbtc", "usdc"],
    notes: "Attacker-fund return, residual backing loss and bounty are preserved as distinct claims.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[2], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "reimbursement_started", event_date: "2026-07-03", event_date_precision: "day",
    title: "Verus publishes restoration and restitution process",
    description: "Verus v1.2.17 described a deterministic restoration process for affected holdings and restitution credits intended to represent reduced vETH and tBTC.vETH value. The reviewed source supports restitution in progress but does not prove completion for every affected user.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "high",
    status_effect: "restoration and restitution process in progress",
    source_count: 1, sort_order: 30, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "in_progress", restart_status: "paused",
    affected_chains: ["verus", "ethereum"], affected_assets: ["eth", "tbtc", "usdc"],
    notes: "Restitution is separate from attacker-fund recovery and from the bounty arrangement.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[3], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "bridge_reopened", event_date: "2026-07-12", event_date_precision: "day",
    title: "Verus begins Ethereum bridge upgrade and reopen process",
    description: "Verus v1.2.17-1 enabled voting to upgrade the Ethereum bridge contracts and reopen the Verus↔Ethereum connection, establishing a May-aftermath reopen milestone before later security events.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "high",
    status_effect: "May-aftermath bridge connection reopened or entered explicit reopen process",
    source_count: 1, sort_order: 40, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "in_progress", restart_status: "reopened",
    affected_chains: ["verus", "ethereum"], affected_assets: ["eth", "tbtc", "usdc"],
    notes: "This is May-aftermath reopen evidence only; it is not post-July-23 reopen evidence.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[4], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "bridge_paused", event_date: "2026-07-16", event_date_precision: "day",
    title: "Cross-chain functions paused again for separate unexploited vulnerability",
    description: "Verus v1.2.17-2 said a researcher found a potential cross-chain exploit that was confirmed not to have been exploited; an oracle notification disabled cross-chain functions again until nodes upgraded. BIR records this as a later security re-pause, not as another exploit and not as the July 23 incident.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "high",
    status_effect: "cross-chain functions paused for separate unexploited vulnerability",
    source_count: 1, sort_order: 50, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "in_progress", restart_status: "paused",
    affected_chains: ["verus", "ethereum"], affected_assets: ["eth", "tbtc", "usdc"],
    notes: "Later lifecycle event only. It does not change the classification of the May exploit or the separate July 23 exploit.", duplicate_of: null, merged_into: null
  }
];

const common = {
  bridge_id: BRIDGE_ID,
  incident_id: INCIDENT_ID,
  reliability: "high",
  url_status: "live",
  accessed_at: "2026-08-20",
  language: "en",
  quote_excerpt: null,
  is_paywalled: false,
  supports_migration: false
};

const newEvidence = [
  {
    id: SOURCE_IDS[0], ...common, event_id: EVENT_IDS[0], source_type: "official_statement",
    title: "Verus v1.2.17 — bridge restoration and recovery update",
    url: "https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17", publisher: "VerusCoin",
    published_at: "2026-07-03", published_at_precision: "day", source_tier: "tier_1", claim_scope: "incident_case",
    author: "VerusCoin contributors", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: true, supports_reimbursement: true, supports_reopen: false, supports_shutdown: false,
    notes: "Stable first-party authority naming the May 17 exploit and establishing the later recovery/restoration boundary. Used here for incident existence and lifecycle, not for an exact gross USD loss."
  },
  {
    id: SOURCE_IDS[1], ...common, event_id: EVENT_IDS[0], source_type: "blockchain_analytics_report",
    title: "Verus Bridge Exploit — May 2026 independent transaction analysis",
    url: "https://u0.rs/verus-bridge-exploit-2026-05", publisher: "u0",
    published_at: "2026-05-18", published_at_precision: "approximate", source_tier: "tier_2", claim_scope: "incident_case",
    author: null, is_primary: false, is_official_domain: false,
    supports_amount: true, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "Independent reproducible transaction/root-cause analysis. BIR uses it only to support the high-level import/message-verification failure and transaction package; operational exploit reproduction detail is not promoted into canonical text."
  },
  {
    id: SOURCE_IDS[2], ...common, event_id: EVENT_IDS[0], source_type: "other",
    title: "Verus-Ethereum Bridge May 2026 exploit transaction",
    url: "https://etherscan.io/tx/0x6990f01720f57fc515d0e976a0c4f8157e0a9529194c4c15d190e98d087eb321", publisher: "Etherscan",
    published_at: "2026-05-18", published_at_precision: "approximate", source_tier: "tier_2", claim_scope: "incident_case",
    author: null, is_primary: false, is_official_domain: false,
    supports_amount: true, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "Direct Ethereum transaction anchor for the reviewed May exploit boundary."
  },
  {
    id: SOURCE_IDS[3], ...common, event_id: EVENT_IDS[0], source_type: "news_article",
    title: "Ongoing exploit drains $11.6 million from Verus-Ethereum bridge: Blockaid",
    url: "https://www.theblock.co/amp/post/401571/verus-ethereum-bridge-exploit", publisher: "The Block",
    published_at: "2026-05-17", published_at_precision: "day", source_tier: "tier_2", claim_scope: "amount",
    author: "Timmy Shen", is_primary: false, is_official_domain: false,
    supports_amount: true, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "Contemporaneous reporting supporting the approximate $11.4–11.6 million gross range and the reported ETH, tBTC and USDC quantities."
  },
  {
    id: SOURCE_IDS[4], ...common, event_id: EVENT_IDS[1], source_type: "official_statement",
    title: "Verus v1.2.17 — partial recovery and residual backing-loss statement",
    url: "https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17", publisher: "VerusCoin",
    published_at: "2026-07-03", published_at_precision: "day", source_tier: "tier_1", claim_scope: "recovery",
    author: "VerusCoin contributors", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: true, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "First-party statement that after some asset recovery about 26.6% of ETH and tBTC backing held in the Ethereum contract remained lost. This is not converted into a recovered-USD amount."
  },
  {
    id: SOURCE_IDS[5], ...common, event_id: EVENT_IDS[1], source_type: "news_article",
    title: "Verus bridge exploiter returns 4,052 ETH, retains $2.8 million bounty: onchain analyst",
    url: "https://www.theblock.co/news/ecosystems/2026-05-22-verus-bridge-exploiter-returns-4052-eth-402319", publisher: "The Block",
    published_at: "2026-05-22", published_at_precision: "day", source_tier: "tier_2", claim_scope: "recovery",
    author: "Brian Danga", is_primary: false, is_official_domain: false,
    supports_amount: true, supports_recovery: true, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "Contemporaneous recovery reporting for the approximately 4,052.4 ETH return and separately retained bounty; neither is treated as proof of user restitution completion."
  },
  {
    id: SOURCE_IDS[6], ...common, event_id: EVENT_IDS[2], source_type: "official_statement",
    title: "Verus v1.2.17 — restoration and restitution mechanics",
    url: "https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17", publisher: "VerusCoin",
    published_at: "2026-07-03", published_at_precision: "day", source_tier: "tier_1", claim_scope: "reimbursement",
    author: "VerusCoin contributors", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: true, supports_reimbursement: true, supports_reopen: false, supports_shutdown: false,
    notes: "First-party authority for the restoration/restitution process. It supports in-progress restitution, not completion for every affected user."
  },
  {
    id: SOURCE_IDS[7], ...common, event_id: EVENT_IDS[3], source_type: "official_statement",
    title: "Verus v1.2.17-1 — Ethereum bridge contract upgrade and reopen process",
    url: "https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17-1", publisher: "VerusCoin",
    published_at: "2026-07-12", published_at_precision: "day", source_tier: "tier_1", claim_scope: "restart",
    author: "VerusCoin contributors", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: true, supports_shutdown: false,
    notes: "First-party May-aftermath authority for the Ethereum contract-upgrade vote and explicit reopen process. Not post-July-23 reopen evidence."
  },
  {
    id: SOURCE_IDS[8], ...common, event_id: EVENT_IDS[4], source_type: "official_statement",
    title: "Verus v1.2.17-2 — precautionary cross-chain pause for separate unexploited vulnerability",
    url: "https://github.com/VerusCoin/Verus-Desktop/releases/tag/v1.2.17-2", publisher: "VerusCoin",
    published_at: "2026-07-16", published_at_precision: "day", source_tier: "tier_1", claim_scope: "status",
    author: "VerusCoin contributors", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "First-party statement that a potential cross-chain exploit was confirmed not ever exploited and cross-chain functions were disabled again as a precaution. This is not another exploit record."
  }
];

incidents.push(incident);
events.push(...newEvents);
evidence.push(...newEvidence);

writeArray("data/bridges.json", bridges);
writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);

const julyAfter = JSON.stringify(readJson("data/incidents.json").find((record) => record.id === JULY_INCIDENT_ID));
assert(julyAfter === julyBefore, "July incident changed during May application");
assert(bridge.status === "paused", "May application must not alter current bridge pause state");
assert(bridge.major_incident_count === 2, "Verus bridge major incident count must be 2");
assert(bridge.has_reimbursement_history === true, "Verus bridge reimbursement history must be true");
assert(readJson("data/bridges.json").length === 39, "bridge count changed unexpectedly");
assert(readJson("data/incidents.json").length === 42, "expected 42 incidents after May application");
assert(readJson("data/events.json").length === 199, "expected 199 events after May application");
assert(readJson("data/evidence.json").length === 325, "expected 325 evidence after May application");
assert(readJson("data/evidence.json").filter((source) => source.incident_id === INCIDENT_ID).length === 9, "May incident source_count must equal 9");
for (const [index, eventId] of EVENT_IDS.entries()) {
  const expected = [4, 2, 1, 1, 1][index];
  assert(readJson("data/evidence.json").filter((source) => source.event_id === eventId).length === expected, `${eventId} source_count must equal ${expected}`);
}

console.log("Applied bounded Verus May 2026 canonical package.");
console.log("Counts: 39 bridges / 42 incidents / 199 events / 325 evidence.");
console.log(`IDs: ${INCIDENT_ID}; ${EVENT_IDS[0]}-${EVENT_IDS.at(-1)}; ${SOURCE_IDS[0]}-${SOURCE_IDS.at(-1)}`);
