import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readText = (p) => fs.readFileSync(path.join(root, p), "utf8");
const writeText = (p, value) => fs.writeFileSync(path.join(root, p), value);
const readJson = (p) => JSON.parse(readText(p));
const writeArray = (p, records) => writeText(p, `[\n${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const BRIDGE_ID = "bir_bridge_000040";
const INCIDENT_ID = "bir_inc_000043";
const EVENT_IDS = ["bir_ev_000200", "bir_ev_000201", "bir_ev_000202", "bir_ev_000203"];
const SOURCE_IDS = ["bir_src_000326", "bir_src_000327", "bir_src_000328", "bir_src_000329", "bir_src_000330", "bir_src_000331"];

const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const events = readJson("data/events.json");
const evidence = readJson("data/evidence.json");
const assets = readJson("data/reference/assets.json");

assert(bridges.length === 39, `expected 39 bridges, found ${bridges.length}`);
assert(incidents.length === 42, `expected 42 incidents, found ${incidents.length}`);
assert(events.length === 199, `expected 199 events, found ${events.length}`);
assert(evidence.length === 325, `expected 325 evidence, found ${evidence.length}`);
assert(bridges.at(-1)?.id === "bir_bridge_000039", "unexpected bridge tail id");
assert(incidents.at(-1)?.id === "bir_inc_000042", "unexpected incident tail id");
assert(events.at(-1)?.id === "bir_ev_000199", "unexpected event tail id");
assert(evidence.at(-1)?.id === "bir_src_000325", "unexpected evidence tail id");
assert(!bridges.some((record) => record.slug === "taiko-bridge"), "Taiko bridge already exists");
assert(!incidents.some((record) => record.slug.includes("taiko") && record.incident_date.startsWith("2026-06")), "Taiko June incident already exists");

for (const key of ["crvusd", "crv", "izi", "weeth", "taiko"]) {
  assert(!assets[key], `asset reference ${key} already exists; re-review current main before application`);
}
assets.crvusd = { display_name: "crvUSD", aliases: ["Curve USD"] };
assets.crv = { display_name: "CRV", aliases: ["Curve DAO Token"] };
assets.izi = { display_name: "iZi", aliases: ["iZUMi Finance token"] };
assets.weeth = { display_name: "weETH", aliases: ["Wrapped eETH"] };
assets.taiko = { display_name: "TAIKO", aliases: ["Taiko token"] };
writeText("data/reference/assets.json", `${JSON.stringify(assets, null, 2)}\n`);

const affectedAssets = ["eth", "weth", "usdc", "crvusd", "usdt", "crv", "izi", "wbtc", "weeth", "taiko"];

const bridge = {
  id: BRIDGE_ID,
  slug: "taiko-bridge",
  previous_slugs: [],
  redirect_from: [],
  canonical_name: "Taiko Bridge",
  type: "canonical_bridge",
  status: "active",
  summary: "Taiko Bridge is Taiko's canonical asset-transfer path between Ethereum and Taiko. In June 2026, forged L2 proof/state data enabled fraudulent withdrawals from the canonical Bridge and ERC20Vault. Taiko paused the affected contracts, restored the pre-attack state, fully recollateralized the bridge in kind, made users whole, and reopened normal bridge operations on July 2 under conservative quotas.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-20",
  last_verified_at: "2026-08-20",
  aliases: ["Taiko canonical bridge", "Taiko Ethereum bridge"],
  launch_date: "2024-05-27",
  launch_date_precision: "day",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://bridge.taiko.xyz/",
  official_domain: "taiko.xyz",
  official_url_status: "live_verified",
  archived_url: null,
  primary_chains: ["ethereum", "taiko"],
  primary_assets: affectedAssets,
  operator_name: "Taiko Foundation / Taiko Labs",
  operator_type: "foundation",
  ecosystem_name: "Taiko",
  related_protocols: ["Taiko Alethia", "Taiko Inbox", "SignalService", "ERC20Vault"],
  brand_history_notes: "BIR models the official Taiko Bridge and its ERC20Vault withdrawal path as one canonical bridge entity for this incident. The incident did not establish a defect in the Bridge contracts themselves; the forged finalized L2 state was consumed by the normal withdrawal path.",
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: true,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "Current active status follows Taiko's first-party July 2 reopening statement. Attacker-fund recovery remains partial, while user backing/compensation and operational restart are complete."
};

const incident = {
  id: INCIDENT_ID,
  bridge_id: BRIDGE_ID,
  slug: "taiko-bridge-2026-forged-proof-state-exploit",
  previous_slugs: [],
  redirect_from: [],
  title: "Taiko Bridge June 2026 forged proof/state exploit",
  incident_date: "2026-06-21",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "On June 21, 2026, an attacker used an exposed SGX prover signing key together with an attestation check that failed to reject debug-mode enclaves to produce accepted proofs over a fake Taiko L2 state. The forged state enabled fraudulent withdrawals from Taiko's canonical Bridge and ERC20Vault. Taiko reports about $1.75 million of actual loss. The bridge was paused, remediated, recollateralized 1:1, and reopened on July 2; users were made whole while attacker-fund recovery remained partial.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 5,
  last_reviewed_at: "2026-08-20",
  last_verified_at: "2026-08-20",
  is_major_incident: true,
  reported_loss_usd_display: "about $1.75 million",
  reported_loss_usd: 1750000,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "Taiko's first-party postmortem reports about $1.75 million of tokens actually withdrawn from the canonical Bridge and ERC20Vault. Larger fraudulent claims that never paid are excluded from the loss total.",
  reported_loss_assets: affectedAssets,
  usd_valuation_date: "2026-06-21",
  loss_amount_basis: "reported_by_project",
  amount_confidence: "high",
  amount_note: "The canonical figure is Taiko's approximate first-party aggregate. BIR does not derive a more precise USD value from historical token prices and does not count unpaid fraudulent claims as loss.",
  amount_claims: [
    {
      amount_text: "actual successful withdrawals across ETH, stablecoins, TAIKO and other ERC-20 assets",
      amount_usd_text: "about $1.75 million",
      source_id: "bir_src_000327",
      basis: "first-party postmortem aggregate and itemized successful withdrawals",
      usd_valuation_date: "2026-06-21",
      notes: "Excludes the 999 ETH and large TAIKO claims that never paid and were later force-resolved."
    }
  ],
  recovery_status: "partial_recovery",
  reimbursement_status: "completed",
  restart_status: "reopened",
  current_outcome: "active_after_incident",
  is_unresolved: true,
  unresolved_reason: [
    "Attacker-fund recovery remains incomplete: Taiko reported only 17 ETH returned to treasury, additional TAIKO frozen at MEXC pending law-enforcement process, and other stolen ETH moved through Tornado Cash or remained in known attacker wallets.",
    "The approximate $1.75 million first-party loss total is not converted into an invented exact recovered-USD figure."
  ],
  affected_chains: ["ethereum", "taiko"],
  affected_assets: affectedAssets,
  attack_vector_category: "message_verification_failure",
  postmortem_available: "available",
  known_unknowns: [
    "The first-party postmortem does not establish completed recovery of all attacker-controlled assets.",
    "Frozen TAIKO at MEXC is not treated as recovered until returned through the law-enforcement process.",
    "BIR intentionally keeps the public mechanism at a non-operational forged-proof/state-acceptance boundary and does not reproduce exploit payload construction."
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
    event_type: "exploit_occurred", event_date: "2026-06-21", event_date_precision: "day",
    title: "Forged Taiko proof/state enables bridge withdrawals",
    description: "An attacker registered rogue debug-mode prover instances and submitted accepted proofs over a fake L2 state after an exposed SGX signing key and deficient debug-mode attestation check undermined the prover trust boundary. Fraudulent withdrawals were then claimed from the canonical Bridge and ERC20Vault. Taiko reports about $1.75 million of actual loss.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "critical",
    status_effect: "canonical bridge and vault suffered fraudulent withdrawals from a forged finalized L2 state",
    source_count: 2, sort_order: 10, amount_text: "about $1.75 million", recovered_amount_text: null,
    reimbursement_status: "unknown", restart_status: "never_paused",
    affected_chains: ["ethereum", "taiko"], affected_assets: affectedAssets,
    notes: "Public description is intentionally non-operational. The first-party postmortem says the ZK math and Bridge contracts themselves were not broken.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[1], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "bridge_paused", event_date: "2026-06-22", event_date_precision: "day",
    title: "Taiko Bridge and ERC20Vault paused after containment",
    description: "Taiko's Security Council executed emergency Proposal #31 at 05:40 UTC, pausing the canonical Bridge and ERC20Vault and preventing further withdrawals. A second emergency action later disabled additional permissionless proving/proposing paths while remediation proceeded.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "critical",
    status_effect: "Bridge and ERC20Vault paused; no further withdrawals possible",
    source_count: 1, sort_order: 20, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "announced", restart_status: "paused",
    affected_chains: ["ethereum", "taiko"], affected_assets: affectedAssets,
    notes: "Pause is first-party documented and distinct from later July 2 reopening.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[2], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "reimbursement_completed", event_date: "2026-06-30", event_date_precision: "day",
    title: "Taiko completes 1:1 bridge recollateralization and user backfill",
    description: "After restoring the pre-attack state, Taiko recollateralized the Bridge in kind to 1:1 backing using Foundation and Taiko Labs operating cash. The first-party postmortem states that every user was made whole and that attacker-fund recovery was not a prerequisite for restoring user backing.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "high",
    status_effect: "complete user backfill and 1:1 bridge backing restored",
    source_count: 1, sort_order: 30, amount_text: null, recovered_amount_text: "17 ETH later reported returned to treasury; other attacker-fund recovery remained incomplete",
    reimbursement_status: "completed", restart_status: "paused",
    affected_chains: ["ethereum", "taiko"], affected_assets: affectedAssets,
    notes: "Completed user compensation/backfill is not classified as full attacker-fund recovery.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[3], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "bridge_reopened", event_date: "2026-07-02", event_date_precision: "day",
    title: "Taiko Bridge and ERC20Vault reopen under conservative quotas",
    description: "After remediation contracts, state restoration and 1:1 recollateralization, Taiko executed Proposal #35 and unpaused the Bridge and ERC20Vault. Normal operations resumed under deliberately conservative withdrawal quotas.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "high",
    status_effect: "normal bridge operations resumed under conservative quotas",
    source_count: 1, sort_order: 40, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "completed", restart_status: "reopened",
    affected_chains: ["ethereum", "taiko"], affected_assets: affectedAssets,
    notes: "This first-party reopening establishes current active bridge status despite incomplete attacker-fund recovery.", duplicate_of: null, merged_into: null
  }
];

const common = {
  bridge_id: BRIDGE_ID,
  reliability: "high",
  url_status: "live",
  accessed_at: "2026-08-20",
  language: "en",
  quote_excerpt: null,
  is_paywalled: false,
  supports_migration: false
};
const postmortemUrl = "https://paragraph.com/@taiko-labs/taiko-security-incident-a-postmortem-and-next-steps";

const newEvidence = [
  {
    id: SOURCE_IDS[0], ...common, incident_id: null, event_id: null,
    source_type: "official_blog", title: "Taiko is live on Ethereum mainnet!", url: "https://paragraph.com/@taiko-labs/taiko-is-live-on-ethereum-mainnet", publisher: "Taiko Labs",
    published_at: "2024-05-27", published_at_precision: "day", source_tier: "tier_1", claim_scope: "bridge_entity",
    author: "Taiko Labs", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "First-party Taiko Labs mainnet material supporting the Ethereum↔Taiko official bridge identity, launch boundary, quota model and canonical bridge role. Hosted on Paragraph rather than taiko.xyz."
  },
  {
    id: SOURCE_IDS[1], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[0],
    source_type: "postmortem", title: "Taiko Security Incident: A Postmortem and Next Steps", url: postmortemUrl, publisher: "Taiko Labs",
    published_at: "2026-07", published_at_precision: "month", source_tier: "tier_1", claim_scope: "incident_case",
    author: "Taiko Labs", is_primary: true, is_official_domain: false,
    supports_amount: true, supports_recovery: true, supports_reimbursement: true, supports_reopen: true, supports_shutdown: true,
    notes: "Core first-party incident authority for June 21 attack existence, forged proof/state mechanism, approximate $1.75M actual loss, itemized successful withdrawals, partial recovery, complete user backfill, remediation and July 2 reopening. Day-level publication metadata was not exposed in the reviewed page, so BIR preserves only the supported July 2026 month boundary."
  },
  {
    id: SOURCE_IDS[2], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[0],
    source_type: "news_article", title: "Taiko halts its Ethereum layer-2 network after a bridge exploit, token dives", url: "https://www.coindesk.com/tech/2026/06/22/taiko-halts-its-ethereum-layer-2-network-after-a-bridge-exploit-token-dives-10", publisher: "CoinDesk",
    published_at: "2026-06-22", published_at_precision: "day", source_tier: "tier_2", claim_scope: "incident_case",
    author: null, is_primary: false, is_official_domain: false,
    supports_amount: true, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "Contemporaneous independent corroboration for the Taiko bridge incident and approximate loss. Later first-party postmortem terminology controls root-cause classification where early reporting used broader shorthand."
  },
  {
    id: SOURCE_IDS[3], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[1],
    source_type: "postmortem", title: "Taiko postmortem — emergency pause and containment", url: postmortemUrl, publisher: "Taiko Labs",
    published_at: "2026-07", published_at_precision: "month", source_tier: "tier_1", claim_scope: "status",
    author: "Taiko Labs", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "Event-scoped first-party copy supporting June 22 05:40 UTC emergency pause of Bridge/ERC20Vault and containment of further withdrawals."
  },
  {
    id: SOURCE_IDS[4], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[2],
    source_type: "postmortem", title: "Taiko postmortem — 1:1 recollateralization and users made whole", url: postmortemUrl, publisher: "Taiko Labs",
    published_at: "2026-07", published_at_precision: "month", source_tier: "tier_1", claim_scope: "reimbursement",
    author: "Taiko Labs", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: true, supports_reimbursement: true, supports_reopen: false, supports_shutdown: false,
    notes: "Event-scoped first-party copy supporting June 30 1:1 in-kind bridge recollateralization and the completed Foundation/Taiko Labs shortfall backfill. Does not imply full attacker-fund recovery."
  },
  {
    id: SOURCE_IDS[5], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[3],
    source_type: "postmortem", title: "Taiko postmortem — Bridge and ERC20Vault reopened", url: postmortemUrl, publisher: "Taiko Labs",
    published_at: "2026-07", published_at_precision: "month", source_tier: "tier_1", claim_scope: "restart",
    author: "Taiko Labs", is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: false, supports_reimbursement: true, supports_reopen: true, supports_shutdown: false,
    notes: "Event-scoped first-party copy supporting July 2 Proposal #35 unpause and resumption of normal bridge operations under conservative quotas."
  }
];

bridges.push(bridge);
incidents.push(incident);
events.push(...newEvents);
evidence.push(...newEvidence);

writeArray("data/bridges.json", bridges);
writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);

assert(readJson("data/bridges.json").length === 40, "expected 40 bridges after Taiko application");
assert(readJson("data/incidents.json").length === 43, "expected 43 incidents after Taiko application");
assert(readJson("data/events.json").length === 203, "expected 203 events after Taiko application");
assert(readJson("data/evidence.json").length === 331, "expected 331 evidence after Taiko application");
assert(readJson("data/evidence.json").filter((source) => source.incident_id === INCIDENT_ID).length === 5, "Taiko incident source_count must equal 5");
for (const [index, eventId] of EVENT_IDS.entries()) {
  const expected = [2, 1, 1, 1][index];
  assert(readJson("data/evidence.json").filter((source) => source.event_id === eventId).length === expected, `${eventId} source_count must equal ${expected}`);
}

console.log("Applied bounded Taiko June 2026 canonical package.");
console.log("Counts: 40 bridges / 43 incidents / 203 events / 331 evidence.");
console.log(`IDs: ${BRIDGE_ID}; ${INCIDENT_ID}; ${EVENT_IDS[0]}-${EVENT_IDS.at(-1)}; ${SOURCE_IDS[0]}-${SOURCE_IDS.at(-1)}`);
