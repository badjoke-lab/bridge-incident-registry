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
const SOURCE_IDS = ["bir_src_000328", "bir_src_000329", "bir_src_000330", "bir_src_000331", "bir_src_000332", "bir_src_000333", "bir_src_000334", "bir_src_000335"];

const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const events = readJson("data/events.json");
const evidence = readJson("data/evidence.json");
const chains = readJson("data/reference/chains.json");
const assets = readJson("data/reference/assets.json");

assert(bridges.length === 39, `expected 39 bridges, found ${bridges.length}`);
assert(incidents.length === 42, `expected 42 incidents, found ${incidents.length}`);
assert(events.length === 199, `expected 199 events, found ${events.length}`);
assert(evidence.length === 327, `expected 327 evidence, found ${evidence.length}`);
assert(bridges.at(-1)?.id === "bir_bridge_000039", "unexpected bridge tail id");
assert(incidents.at(-1)?.id === "bir_inc_000042", "unexpected incident tail id");
assert(events.at(-1)?.id === "bir_ev_000199", "unexpected event tail id");
assert(evidence.at(-1)?.id === "bir_src_000327", "unexpected evidence tail id");
assert(!bridges.some((record) => record.slug === "axelar-secret-ibc-bridge" || record.aliases?.some((alias) => /secret tunnel|ics20-for-axelar/i.test(alias))), "Axelar-Secret bridge duplicate exists");
assert(!incidents.some((record) => record.incident_date === "2026-06-10" && /axelar|secret/i.test(`${record.slug} ${record.title}`)), "Axelar-Secret June incident duplicate exists");
for (const id of [BRIDGE_ID, INCIDENT_ID, ...EVENT_IDS, ...SOURCE_IDS]) {
  assert(!bridges.some((r) => r.id === id) && !incidents.some((r) => r.id === id) && !events.some((r) => r.id === id) && !evidence.some((r) => r.id === id), `ID collision: ${id}`);
}

for (const key of ["secret-network", "axelar"]) {
  assert(!chains[key], `chain reference ${key} already exists; re-review current main`);
}
chains["secret-network"] = { display_name: "Secret Network", aliases: ["Secret", "SCRT Network"] };
chains.axelar = { display_name: "Axelar", aliases: ["Axelar Network"] };
writeText("data/reference/chains.json", `${JSON.stringify(chains, null, 2)}\n`);

for (const key of ["wbnb", "wsteth"]) {
  assert(!assets[key], `asset reference ${key} already exists; re-review current main`);
}
assets.wbnb = { display_name: "WBNB", aliases: ["Wrapped BNB"] };
assets.wsteth = { display_name: "wstETH", aliases: ["Wrapped stETH", "Wrapped liquid staked Ether 2.0"] };
writeText("data/reference/assets.json", `${JSON.stringify(assets, null, 2)}\n`);

const affectedAssets = ["usdt", "usdc", "weth", "wbtc", "dai", "wbnb", "wsteth"];

const bridge = {
  id: BRIDGE_ID,
  slug: "axelar-secret-ibc-bridge",
  previous_slugs: [],
  redirect_from: ["secret-tunnel", "axelar-secret-bridge"],
  canonical_name: "Axelar–Secret IBC Bridge",
  type: "asset_bridge",
  status: "paused",
  summary: "Axelar–Secret IBC Bridge is the asset-transfer connection used by Secret Tunnel for Axelar-wrapped assets on Secret Network. In June 2026, the Secret-side ics20-for-axelar contract accepted inbound token messages without authenticating the legitimate source channel, enabling unbacked wrapped-asset minting and redemption against real Axelar-side reserves. The affected connection was disabled and remains non-operational at the latest review.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-21",
  last_verified_at: "2026-08-21",
  aliases: ["Secret Tunnel", "Axelar<>Secret IBC Bridge", "ics20-for-axelar"],
  launch_date: "2023-03-30",
  launch_date_precision: "day",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://tunnel.scrt.network/",
  official_domain: "tunnel.scrt.network",
  official_url_status: "live_verified",
  archived_url: null,
  primary_chains: ["secret-network", "axelar"],
  primary_assets: affectedAssets,
  operator_name: "Secret Network ecosystem / Axelar integration",
  operator_type: "ecosystem",
  ecosystem_name: "Secret Network",
  related_protocols: ["Axelar", "IBC", "Secret Tunnel"],
  brand_history_notes: "BIR scopes this record to the Axelar–Secret asset-transfer connection and Secret-side ics20-for-axelar contract. The June 2026 incident did not establish compromise of Axelar core, IBC generally, Secret Network consensus/privacy, or unrelated Secret IBC connections.",
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: true,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "Current paused status is supported by Secret Tunnel's continuing non-operational incident notice. Axelar governance Proposal #490 is a non-binding recovery/distribution signal and is not evidence of completed recovery or reimbursement."
};

const incident = {
  id: INCIDENT_ID,
  bridge_id: BRIDGE_ID,
  slug: "axelar-secret-ibc-bridge-2026-source-channel-validation-exploit",
  previous_slugs: [],
  redirect_from: [],
  title: "Axelar–Secret IBC Bridge 2026 source-channel validation exploit",
  incident_date: "2026-06-10",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "On June 10, 2026, the Secret-side ics20-for-axelar contract accepted inbound cross-chain token messages without authenticating the expected source IBC channel. An attacker used that verification gap to mint unbacked Axelar-wrapped assets on Secret and redeem them through the legitimate Axelar connection against real reserves. Secret reported approximately USD 4.67 million stolen. The connection was disabled, no returned attacker funds are established in the admitted record, and a later Axelar governance vote only signaled a non-binding future freeze/recustody and victim-distribution path.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 6,
  last_reviewed_at: "2026-08-21",
  last_verified_at: "2026-08-21",
  is_major_incident: true,
  reported_loss_usd_display: "about USD 4.67 million",
  reported_loss_usd: 4670000,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "Secret Network's first-party incident report states that approximately USD 4.67 million of genuine Axelar-side reserves were drained after unbacked Axelar-wrapped assets were minted on Secret and redeemed through the legitimate bridge path.",
  reported_loss_assets: affectedAssets,
  usd_valuation_date: "2026-06-10",
  loss_amount_basis: "reported_by_project",
  amount_confidence: "high",
  amount_note: "Use the first-party approximate aggregate. Identifiable attacker-held assets, changing market valuations, potential future freezes and victim-distribution proposals are separate from the incident loss and are not subtracted from this amount.",
  amount_claims: [{
    amount_text: "unbacked saUSDT, saUSDC, saWETH, saWBTC, saDAI, saWBNB and sawstETH redeemed against genuine reserves",
    amount_usd_text: "about USD 4.67 million",
    source_id: "bir_src_000329",
    basis: "reported_by_project",
    usd_valuation_date: "2026-06-10",
    notes: "Canonical aggregate from Secret Network's first-party incident report."
  }],
  recovery_status: "none",
  reimbursement_status: "announced",
  restart_status: "not_reopened",
  current_outcome: "paused_long_term",
  is_unresolved: true,
  unresolved_reason: [
    "No admitted source establishes return, freeze execution, recustody, or protocol control of the remaining attacker-held assets.",
    "Axelar Proposal #490 passed only as a non-binding signaling proposal and did not itself move, freeze, seize, recustody, or distribute funds.",
    "Final affected-user reimbursement amount and completion are not established.",
    "Secret Tunnel remains non-operational due to the security incident and no bridge reopening is established."
  ],
  affected_chains: ["secret-network", "axelar"],
  affected_assets: affectedAssets,
  attack_vector_category: "message_verification_failure",
  postmortem_available: "available",
  known_unknowns: [
    "The final disposition of attacker-held assets remains unresolved.",
    "No binding execution of the governance-signaled freeze/recustody/distribution path was located at review time.",
    "BIR does not infer impact to Axelar core, IBC generally, Secret consensus/privacy, native SCRT, unrelated SNIP-20 assets, Noble USDC or other bridge connections."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
};

const newEvents = [
  {
    id: EVENT_IDS[0], bridge_id: BRIDGE_ID, incident_id: null,
    event_type: "launched", event_date: "2023-03-30", event_date_precision: "day",
    title: "Secret-side Axelar IBC bridge contract instantiated",
    description: "Secret Network's incident report identifies March 30, 2023 as the first instantiation date of the affected Secret-side ics20-for-axelar contract used for Axelar-wrapped asset transfers.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "medium",
    status_effect: "Axelar–Secret IBC asset connection available",
    source_count: 1, sort_order: 10, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "not_applicable", restart_status: "not_applicable",
    affected_chains: ["secret-network", "axelar"], affected_assets: affectedAssets,
    notes: "Axelar and Secret announced their integration in 2022; the affected deployed contract was instantiated in 2023.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[1], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "exploit_occurred", event_date: "2026-06-10", event_date_precision: "day",
    title: "Unbacked Axelar-wrapped assets minted and redeemed",
    description: "The Secret-side bridge contract accepted token messages without authenticating the legitimate source IBC channel. Unbacked Axelar-wrapped assets were minted on Secret and redeemed through the valid Axelar connection against real reserves, producing an approximately USD 4.67 million loss.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "critical",
    status_effect: "Axelar-wrapped Secret assets became under-collateralized",
    source_count: 3, sort_order: 20, amount_text: "about USD 4.67 million", recovered_amount_text: null,
    reimbursement_status: "not_announced", restart_status: "never_paused",
    affected_chains: ["secret-network", "axelar"], affected_assets: affectedAssets,
    notes: "Public mechanism description intentionally stops at the missing source-channel authentication boundary and omits exploit reproduction steps.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[2], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "bridge_paused", event_date: "2026-06", event_date_precision: "month",
    title: "Axelar–Secret bridge connection disabled after discovery",
    description: "After the June exploit was discovered, Secret disabled bridging through Secret Tunnel and Axelar paused the Secret and Secret-SNIP connections. The service remains non-operational at the latest review.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "critical",
    status_effect: "affected Axelar–Secret bridge connection paused",
    source_count: 2, sort_order: 30, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "not_announced", restart_status: "paused",
    affected_chains: ["secret-network", "axelar"], affected_assets: affectedAssets,
    notes: "Month precision avoids inventing a single exact disable timestamp from a multi-step discovery and containment sequence.", duplicate_of: null, merged_into: null
  },
  {
    id: EVENT_IDS[3], bridge_id: BRIDGE_ID, incident_id: INCIDENT_ID,
    event_type: "reimbursement_announced", event_date: "2026-07-05", event_date_precision: "day",
    title: "Axelar governance signals future hacker-fund recustody and victim distribution",
    description: "Axelar governance Proposal #490 passed as an explicitly non-binding signaling proposal supporting a future process to freeze identified hacker funds and later recustody them to a trusted distributor for affected users.",
    confidence: "high", record_maturity: "reviewed", update_status: "current", impact_level: "high",
    status_effect: "non-binding victim-distribution intent approved; no fund transfer executed by the proposal",
    source_count: 1, sort_order: 40, amount_text: null, recovered_amount_text: null,
    reimbursement_status: "announced", restart_status: "not_reopened",
    affected_chains: ["secret-network", "axelar"], affected_assets: affectedAssets,
    notes: "The proposal itself does not move, freeze, seize, recustody or distribute funds and is not a recovery-completion event.", duplicate_of: null, merged_into: null
  }
];

const secretPostmortem = "https://forum.scrt.network/t/security-incident-axelar-secret-ibc-bridge-exploit-june-10-2026/7995";
const common = {
  bridge_id: BRIDGE_ID,
  reliability: "high",
  url_status: "live",
  accessed_at: "2026-08-21",
  language: "en",
  quote_excerpt: null,
  is_paywalled: false,
  supports_migration: false
};

const newEvidence = [
  {
    id: SOURCE_IDS[0], ...common, incident_id: null, event_id: EVENT_IDS[0],
    source_type: "postmortem", title: "Security Incident: Axelar<>Secret IBC Bridge Exploit — June 10, 2026", url: secretPostmortem, publisher: "Secret Network",
    published_at: "2026-06-19", published_at_precision: "day", source_tier: "tier_1", claim_scope: "bridge_entity",
    author: null, is_primary: true, is_official_domain: true,
    supports_amount: true, supports_recovery: true, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "First-party Secret Network incident report; event-scoped copy supports the March 30, 2023 instantiation date and affected bridge-component identity."
  },
  {
    id: SOURCE_IDS[1], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[1],
    source_type: "postmortem", title: "Security Incident: Axelar<>Secret IBC Bridge Exploit — June 10, 2026", url: secretPostmortem, publisher: "Secret Network",
    published_at: "2026-06-19", published_at_precision: "day", source_tier: "tier_1", claim_scope: "incident_case",
    author: null, is_primary: true, is_official_domain: true,
    supports_amount: true, supports_recovery: true, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "Core first-party incident authority for exploit date, source-channel validation defect, affected assets, approximately USD 4.67M loss, containment, attacker-held residual and unaffected-system boundary."
  },
  {
    id: SOURCE_IDS[2], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[1],
    source_type: "security_firm_report", title: "The Secret Network Exploit", url: "https://commonprefix.com/blog/secret-network-exploit", publisher: "Common Prefix",
    published_at: "2026-06-19", published_at_precision: "day", source_tier: "tier_2", claim_scope: "incident_case",
    author: null, is_primary: false, is_official_domain: false,
    supports_amount: true, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "Independent technical reconstruction corroborating the Secret-side contract failure and loss scope. Public BIR prose remains non-operational."
  },
  {
    id: SOURCE_IDS[3], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[1],
    source_type: "news_article", title: "Secret Network's Axelar bridge drained for $4.67 million in exploit", url: "https://www.theblock.co/news/ecosystems/2026-06-20-secret-networks-axelar-bridge-drained-for-4-67-million-in-infinite-mint-exploit-that-went-unnoticed-for-seven-days-405459", publisher: "The Block",
    published_at: "2026-06-20", published_at_precision: "day", source_tier: "tier_2", claim_scope: "amount",
    author: null, is_primary: false, is_official_domain: false,
    supports_amount: true, supports_recovery: true, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "Independent contemporaneous corroboration for amount, detection/containment context and the boundary that Axelar core was not compromised."
  },
  {
    id: SOURCE_IDS[4], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[2],
    source_type: "postmortem", title: "Security Incident: Axelar<>Secret IBC Bridge Exploit — June 10, 2026", url: secretPostmortem, publisher: "Secret Network",
    published_at: "2026-06-19", published_at_precision: "day", source_tier: "tier_1", claim_scope: "shutdown",
    author: null, is_primary: true, is_official_domain: true,
    supports_amount: true, supports_recovery: true, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "Event-scoped primary copy supporting disabling Secret bridging and pausing Axelar Secret / Secret-SNIP connections after discovery."
  },
  {
    id: SOURCE_IDS[5], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[2],
    source_type: "official_statement", title: "Secret Tunnel", url: "https://tunnel.scrt.network/", publisher: "Secret Network",
    published_at: "2026", published_at_precision: "year", source_tier: "tier_1", claim_scope: "status",
    author: null, is_primary: true, is_official_domain: true,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: true,
    notes: "Current first-party service state reviewed 2026-08-21: Secret Tunnel states it is not operational due to a security incident. Year precision avoids inventing a publication date for the live status page."
  },
  {
    id: SOURCE_IDS[6], ...common, incident_id: INCIDENT_ID, event_id: EVENT_IDS[3],
    source_type: "official_statement", title: "Axelar governance Proposal #490", url: "https://axelar.valopers.com/proposals/490", publisher: "Axelar governance",
    published_at: "2026-07-05", published_at_precision: "day", source_tier: "tier_1", claim_scope: "reimbursement",
    author: null, is_primary: true, is_official_domain: false,
    supports_amount: false, supports_recovery: true, supports_reimbursement: true, supports_reopen: false, supports_shutdown: false,
    notes: "Direct governance proposal record. Proposal #490 passed as explicitly non-binding signaling for a future hacker-fund freeze/recustody and victim-distribution path; it does not itself execute those actions."
  },
  {
    id: SOURCE_IDS[7], ...common, incident_id: null, event_id: null,
    source_type: "official_blog", title: "Axelar and Secret Network Announcement", url: "https://www.axelar.network/blog/axelar-and-secret-network-announcement", publisher: "Axelar",
    published_at: "2022-07-13", published_at_precision: "day", source_tier: "tier_1", claim_scope: "bridge_entity",
    author: null, is_primary: true, is_official_domain: true,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "First-party integration-history evidence for the Axelar / Secret Network relationship. The affected deployed contract launch boundary is separately taken from the Secret incident report."
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

assert(bridges.length === 40, "post-apply bridge count mismatch");
assert(incidents.length === 43, "post-apply incident count mismatch");
assert(events.length === 203, "post-apply event count mismatch");
assert(evidence.length === 335, "post-apply evidence count mismatch");

console.log("Applied bounded Axelar-Secret June 2026 canonical package.");
console.log("Counts: 40 bridges / 43 incidents / 203 events / 335 evidence.");
console.log(`IDs: ${BRIDGE_ID}; ${INCIDENT_ID}; ${EVENT_IDS[0]}-${EVENT_IDS.at(-1)}; ${SOURCE_IDS[0]}-${SOURCE_IDS.at(-1)}`);
