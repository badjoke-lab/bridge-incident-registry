import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const writeArray = (relativePath, records) => {
  fs.writeFileSync(path.join(root, relativePath), `[\n${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`);
};
const writeObject = (relativePath, value) => fs.writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);

const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const events = readJson("data/events.json");
const evidence = readJson("data/evidence.json");
const assets = readJson("data/reference/assets.json");

const targetIds = ["bir_bridge_000031", "bir_bridge_000032", "bir_bridge_000033", "bir_inc_000033", "bir_inc_000034"];
const allIds = new Set([...bridges, ...incidents, ...events, ...evidence].map((record) => record.id));
if (targetIds.every((id) => allIds.has(id))) {
  console.log("Phase 2 Batch 7 canonical records are already present.");
  process.exit(0);
}
if (targetIds.some((id) => allIds.has(id))) throw new Error("Phase 2 Batch 7 is partially applied.");
if (bridges.length !== 30 || incidents.length !== 32 || events.length !== 150 || evidence.length !== 181) {
  throw new Error(`Unexpected canonical baseline: ${bridges.length}/${incidents.length}/${events.length}/${evidence.length}`);
}

const reviewedAt = "2026-07-28";
assets.synd ??= { display_name: "SYND", aliases: ["Syndicate token"] };
assets.clear ??= { display_name: "CLEAR", aliases: ["Everclear token"] };
assets.next ??= { display_name: "NEXT", aliases: ["Connext token"] };

bridges.push(
  {
    id: "bir_bridge_000031",
    slug: "taiko-bridge",
    previous_slugs: [],
    redirect_from: ["taiko-l1-bridge"],
    canonical_name: "Taiko Bridge",
    type: "canonical_bridge",
    status: "active",
    summary: "Taiko Bridge is Taiko's first-party canonical bridge between Ethereum and the Taiko network. It is included because a June 2026 message-proof verification compromise enabled fraudulent bridge withdrawals, followed by a halt, recollateralization, user reimbursement, network restoration, and bridge reopening.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    aliases: ["Taiko L1 Bridge", "Taiko canonical bridge"],
    launch_date: null,
    launch_date_precision: "unknown",
    end_date: null,
    end_date_precision: "unknown",
    terminal_reason: null,
    official_url: "https://taiko.xyz/",
    official_domain: "taiko.xyz",
    official_url_status: "live_verified",
    archived_url: null,
    primary_chains: ["ethereum", "taiko"],
    primary_assets: ["eth", "unknown"],
    operator_name: "Taiko Labs and Taiko protocol contributors",
    operator_type: "protocol_team",
    ecosystem_name: "Taiko",
    related_protocols: [],
    brand_history_notes: null,
    major_incident_count: 1,
    has_unresolved_incident: false,
    has_reimbursement_history: true,
    successor_id: null,
    predecessor_id: null,
    replacement_bridge_id: null,
    duplicate_of: null,
    merged_into: null,
    notes: "The canonical entity covers the first-party Ethereum-facing bridge and vault system. Third-party bridges deployed on Taiko are not automatically included in the incident boundary."
  },
  {
    id: "bir_bridge_000032",
    slug: "everclear",
    previous_slugs: ["connext"],
    redirect_from: ["connext-network", "connext-bridge"],
    canonical_name: "Everclear",
    type: "interoperability_protocol",
    status: "dead",
    summary: "Everclear, previously known as Connext, was a cross-chain interoperability and clearing protocol. It is included as a lifecycle record covering Connext bridge history, the Everclear rebrand and clearing-layer launch, and the 2026 shutdown of the protocol, UI, chain, Foundation, and Labs operations.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    aliases: ["Connext", "Connext Network", "Connext Bridge", "Everclear Protocol"],
    launch_date: "2018",
    launch_date_precision: "year",
    end_date: "2026-05",
    end_date_precision: "month",
    terminal_reason: "The operator announced the wind-down after the protocol, UI, and chain had been sunset and commercial operations were not sustainable.",
    official_url: "https://www.everclear.org/",
    official_domain: "everclear.org",
    official_url_status: "live_verified",
    archived_url: null,
    primary_chains: ["ethereum", "arbitrum", "optimism", "polygon", "bnb-chain", "unknown"],
    primary_assets: ["clear", "next", "usdc", "unknown"],
    operator_name: "Everclear Foundation and Everclear Labs",
    operator_type: "foundation",
    ecosystem_name: "Everclear",
    related_protocols: ["Connext", "xPollinate"],
    brand_history_notes: "Connext evolved into Everclear in 2024. The rebrand and protocol evolution are represented within one canonical entity rather than predecessor and successor entities.",
    major_incident_count: 0,
    has_unresolved_incident: false,
    has_reimbursement_history: false,
    successor_id: null,
    predecessor_id: null,
    replacement_bridge_id: null,
    duplicate_of: null,
    merged_into: null,
    notes: "This is a lifecycle-only record. Publicly accessible documentation after shutdown is retained as historical evidence and is not proof of active protocol operation."
  },
  {
    id: "bir_bridge_000033",
    slug: "commons-bridge",
    previous_slugs: [],
    redirect_from: ["syndicate-commons-bridge"],
    canonical_name: "Commons Bridge",
    type: "canonical_bridge",
    status: "dead",
    summary: "Commons Bridge was the official bridge for moving SYND among Ethereum, Base, and Commons Chain. It is included because an April 2026 bridge-proxy compromise was followed by automatic treasury-funded reimbursement, an additional 15 percent payment, and the permanent wind-down of Commons network and bridge operations.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    aliases: ["Syndicate Commons Bridge"],
    launch_date: null,
    launch_date_precision: "unknown",
    end_date: "2026-05-21",
    end_date_precision: "day",
    terminal_reason: "Commons network and its bridge were wound down after the bridge compromise and reimbursement process.",
    official_url: "https://commons.syndicate.io/",
    official_domain: "commons.syndicate.io",
    official_url_status: "live_verified",
    archived_url: null,
    primary_chains: ["ethereum", "base", "commons-chain"],
    primary_assets: ["synd"],
    operator_name: "Syndicate Labs",
    operator_type: "company",
    ecosystem_name: "Syndicate Commons",
    related_protocols: ["Syndicate Bridge", "Syndicate Network Collective"],
    brand_history_notes: "Commons Bridge is separated from the broader Syndicate Bridge family because the compromised Commons route and network were permanently wound down while other Syndicate route descriptions may remain available.",
    major_incident_count: 1,
    has_unresolved_incident: false,
    has_reimbursement_history: true,
    successor_id: null,
    predecessor_id: null,
    replacement_bridge_id: null,
    duplicate_of: null,
    merged_into: null,
    notes: "The Syndicate Labs wind-down is related operator context, not the asserted cause of the bridge compromise."
  }
);

incidents.push(
  {
    id: "bir_inc_000033",
    bridge_id: "bir_bridge_000031",
    slug: "taiko-bridge-2026-message-proof-exploit",
    previous_slugs: [],
    redirect_from: [],
    title: "Taiko Bridge 2026 message-proof exploit",
    incident_date: "2026-06-21",
    incident_date_precision: "day",
    incident_type: "exploit",
    summary: "A compromise of Taiko's chain-state and bridge message-proof verification allowed forged messages to be accepted on Ethereum L1 and enabled fraudulent bridge withdrawals. Taiko estimated approximately USD 1.7 million lost before containment, restored one-to-one backing, reopened the bridge, and stated that all affected users were made whole.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    source_count: 5,
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    is_major_incident: true,
    reported_loss_usd_display: "Approximately USD 1.7 million",
    reported_loss_usd: 1700000,
    reported_loss_usd_min: 1700000,
    reported_loss_usd_max: 1700000,
    reported_loss_text: "Taiko estimated losses at approximately USD 1.7 million before the network and bridge pause.",
    reported_loss_assets: ["unknown"],
    usd_valuation_date: "2026-06-21",
    loss_amount_basis: "reported_by_project",
    amount_confidence: "medium",
    amount_note: "The project estimate is retained without treating it as a final audited asset-level loss. Recollateralization and user reimbursement are separate from attacker-fund recovery.",
    amount_claims: [
      {
        amount_text: "fraudulent bridge withdrawals before containment",
        amount_usd_text: "approximately USD 1.7 million",
        source_id: "bir_src_000182",
        basis: "reported_by_project",
        usd_valuation_date: "2026-06-21",
        notes: "Project-reported aggregate estimate."
      }
    ],
    recovery_status: "none",
    reimbursement_status: "completed",
    restart_status: "reopened",
    current_outcome: "active_after_incident",
    is_unresolved: false,
    unresolved_reason: [],
    affected_chains: ["ethereum", "taiko"],
    affected_assets: ["unknown"],
    attack_vector_category: "message_verification_failure",
    postmortem_available: "unclear",
    known_unknowns: [
      "A final public asset-by-asset loss table was not located.",
      "The reviewed sources do not establish attacker-fund recovery.",
      "The narrow relationship among signing material, prover enrollment, source-signal validation, and final message-proof acceptance remains subject to a future postmortem review."
    ],
    conflicting_claims: [],
    duplicate_of: null,
    merged_into: null,
    split_from: null,
    split_reason: null
  },
  {
    id: "bir_inc_000034",
    bridge_id: "bir_bridge_000033",
    slug: "commons-bridge-2026-proxy-compromise",
    previous_slugs: [],
    redirect_from: [],
    title: "Commons Bridge 2026 proxy compromise",
    incident_date: "2026-04-29",
    incident_date_precision: "day",
    incident_type: "exploit",
    summary: "The Commons Bridge proxy on Base was compromised and approximately 18.45 million SYND were drained or controlled through the affected path. Public reporting placed realized sale proceeds around USD 330,000–400,000. Commons was later wound down and all users were automatically reimbursed with their SYND plus an additional 15 percent.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    source_count: 5,
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    is_major_incident: true,
    reported_loss_usd_display: "Approximately USD 330,000–400,000 realized proceeds",
    reported_loss_usd: 365000,
    reported_loss_usd_min: 330000,
    reported_loss_usd_max: 400000,
    reported_loss_text: "Approximately 18.45 million SYND were reported drained or controlled through the compromised bridge proxy and sold for roughly USD 330,000–400,000.",
    reported_loss_assets: ["synd"],
    usd_valuation_date: "2026-04-29",
    loss_amount_basis: "mixed_sources",
    amount_confidence: "medium",
    amount_note: "Token quantity, realized attacker proceeds, user loss, market-price impact, and treasury-funded reimbursement measure different scopes and remain separate.",
    amount_claims: [
      {
        amount_text: "approximately 18.45 million SYND",
        amount_usd_text: "approximately USD 330,000–400,000 realized proceeds",
        source_id: "bir_src_000197",
        basis: "reported_by_news",
        usd_valuation_date: "2026-04-29",
        notes: "Retained as a range rather than one exact USD amount."
      }
    ],
    recovery_status: "none",
    reimbursement_status: "completed",
    restart_status: "not_reopened",
    current_outcome: "dead_after_incident",
    is_unresolved: false,
    unresolved_reason: [],
    affected_chains: ["base", "commons-chain", "ethereum"],
    affected_assets: ["synd"],
    attack_vector_category: "unknown",
    postmortem_available: "unclear",
    known_unknowns: [
      "A first-party final technical postmortem was not located.",
      "Independent analysis attributes the incident to a privileged proxy-upgrade compromise, but BIR does not promote that narrow category as final without primary confirmation.",
      "The exact direct user-loss amount before treasury reimbursement is not separately established."
    ],
    conflicting_claims: [],
    duplicate_of: null,
    merged_into: null,
    split_from: null,
    split_reason: null
  }
);

const ev = (id, bridge_id, incident_id, event_type, event_date, event_date_precision, title, description, extra = {}) => ({
  id, bridge_id, incident_id, event_type, event_date, event_date_precision, title, description,
  confidence: extra.confidence ?? "high",
  record_maturity: extra.record_maturity ?? "reviewed",
  update_status: "current",
  impact_level: extra.impact_level ?? "high",
  status_effect: extra.status_effect ?? "none",
  source_count: extra.source_count ?? 1,
  sort_order: extra.sort_order ?? 10,
  amount_text: extra.amount_text ?? null,
  recovered_amount_text: extra.recovered_amount_text ?? null,
  reimbursement_status: extra.reimbursement_status ?? "not_applicable",
  restart_status: extra.restart_status ?? "not_applicable",
  affected_chains: extra.affected_chains ?? ["unknown"],
  affected_assets: extra.affected_assets ?? ["unknown"],
  notes: extra.notes ?? null,
  duplicate_of: null,
  merged_into: null
});

events.push(
  ev("bir_ev_000151", "bir_bridge_000031", "bir_inc_000033", "exploit_occurred", "2026-06-21", "day", "Forged Taiko bridge messages accepted on Ethereum", "Compromised verification allowed fraudulent messages without legitimate source-chain events to release assets through the first-party bridge path.", { impact_level: "critical", status_effect: "paused", amount_text: "approximately USD 1.7 million", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["ethereum", "taiko"], sort_order: 10 }),
  ev("bir_ev_000152", "bir_bridge_000031", "bir_inc_000033", "bridge_paused", "2026-06-22", "day", "Taiko halted network and bridge operations", "Taiko halted block production and stopped first-party bridge and ERC20Vault withdrawals during containment.", { impact_level: "critical", status_effect: "paused", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["ethereum", "taiko"], sort_order: 20 }),
  ev("bir_ev_000153", "bir_bridge_000031", "bir_inc_000033", "transfers_suspended", "2026-06-22", "day", "Bridge withdrawals suspended", "Taiko warned that bridge withdrawals were not secure during containment and suspended the affected first-party paths.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["ethereum", "taiko"], sort_order: 30 }),
  ev("bir_ev_000154", "bir_bridge_000031", "bir_inc_000033", "funds_lost", "2026-06-22", "day", "Taiko estimated losses before containment", "Taiko estimated approximately USD 1.7 million in losses before the pause stopped further fraudulent withdrawals.", { status_effect: "paused", amount_text: "approximately USD 1.7 million", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["ethereum", "taiko"], sort_order: 40 }),
  ev("bir_ev_000155", "bir_bridge_000031", "bir_inc_000033", "other", "2026-06", "month", "Taiko recollateralized bridge and reviewed fixes", "Taiko closed the attack path, reviewed fixes with independent specialists, and restored one-to-one backing before reopening.", { status_effect: "paused", recovered_amount_text: "one-to-one backing restored through recollateralization", restart_status: "paused", reimbursement_status: "in_progress", affected_chains: ["ethereum", "taiko"], notes: "Recollateralization is not attacker-fund recovery.", sort_order: 50 }),
  ev("bir_ev_000156", "bir_bridge_000031", "bir_inc_000033", "bridge_reopened", "2026-07-02", "day", "Taiko Bridge reopened", "Taiko stated that the network and bridge were restored and the bridge was open with conservative withdrawal quotas.", { status_effect: "active", restart_status: "reopened", reimbursement_status: "completed", affected_chains: ["ethereum", "taiko"], sort_order: 60 }),
  ev("bir_ev_000157", "bir_bridge_000031", "bir_inc_000033", "reimbursement_completed", "2026-07-02", "day", "Taiko stated all affected users were made whole", "The first-party reopening statement said every affected user had been made whole.", { status_effect: "active", recovered_amount_text: "all affected users made whole", restart_status: "reopened", reimbursement_status: "completed", affected_chains: ["ethereum", "taiko"], sort_order: 70 }),
  ev("bir_ev_000158", "bir_bridge_000031", "bir_inc_000033", "other", "2026-07-02", "day", "Conservative withdrawal quotas retained", "Taiko retained temporary withdrawal quotas as a post-reopening safeguard.", { impact_level: "medium", status_effect: "active", restart_status: "reopened", reimbursement_status: "completed", affected_chains: ["ethereum", "taiko"], notes: "The safeguard does not by itself establish current limited status after later active verification.", sort_order: 80 }),
  ev("bir_ev_000159", "bir_bridge_000032", null, "launched", "2018", "year", "Connext protocol launched", "Connext began as cross-chain and payment-channel infrastructure and later evolved into a broader interoperability protocol.", { confidence: "medium", impact_level: "medium", status_effect: "active", affected_chains: ["ethereum", "unknown"], affected_assets: ["unknown"], sort_order: 10 }),
  ev("bir_ev_000160", "bir_bridge_000032", null, "other", "2022-03-08", "day", "xPollinate renamed Connext Bridge", "Connext consolidated its flagship xPollinate bridge interface under the Connext Bridge name.", { impact_level: "medium", status_effect: "active", affected_chains: ["ethereum", "bnb-chain", "polygon", "unknown"], affected_assets: ["unknown"], sort_order: 20 }),
  ev("bir_ev_000161", "bir_bridge_000032", null, "other", "2024-06", "month", "Connext adopted the Everclear identity", "Connext announced its evolution into Everclear and a clearing-layer model for cross-chain liquidity and solver rebalancing.", { impact_level: "high", status_effect: "active", affected_chains: ["unknown"], affected_assets: ["next", "clear"], sort_order: 30 }),
  ev("bir_ev_000162", "bir_bridge_000032", null, "launched", "2024-09-18", "day", "Everclear Mainnet Beta launched", "Everclear launched Mainnet Beta for its clearing-layer protocol.", { impact_level: "high", status_effect: "active", affected_chains: ["unknown"], affected_assets: ["clear", "usdc", "unknown"], sort_order: 40 }),
  ev("bir_ev_000163", "bir_bridge_000032", null, "launched", "2025-04-07", "day", "Everclear full mainnet launched", "Everclear announced full mainnet operation with additional chain support and protocol incentives.", { impact_level: "high", status_effect: "active", affected_chains: ["unknown"], affected_assets: ["clear", "usdc", "unknown"], sort_order: 50 }),
  ev("bir_ev_000164", "bir_bridge_000032", null, "shutdown_effective", "2026-05", "month", "Everclear protocol, UI, and chain sunset", "The wind-down announcement described the protocol, user interface, and chain as already sunset and no longer operational.", { impact_level: "critical", status_effect: "dead", restart_status: "not_reopened", affected_chains: ["unknown"], affected_assets: ["clear", "unknown"], notes: "Month precision avoids assigning one unsupported exact effective day to every component.", sort_order: 60 }),
  ev("bir_ev_000165", "bir_bridge_000032", null, "shutdown_announced", "2026-05-21", "day", "Everclear Foundation and Labs wind-down announced", "Everclear announced the wind-down of Foundation, Labs, and product-development operations after failing to reach sustainable commercial depth.", { impact_level: "critical", status_effect: "dead", restart_status: "not_reopened", affected_chains: ["unknown"], affected_assets: ["clear", "unknown"], sort_order: 70 }),
  ev("bir_ev_000166", "bir_bridge_000033", "bir_inc_000034", "exploit_occurred", "2026-04-29", "day", "Commons Bridge proxy compromised", "The Commons Bridge proxy on Base was compromised, enabling unauthorized control or removal of approximately 18.45 million SYND.", { impact_level: "critical", status_effect: "paused", amount_text: "approximately 18.45 million SYND", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["base", "commons-chain", "ethereum"], affected_assets: ["synd"], sort_order: 10 }),
  ev("bir_ev_000167", "bir_bridge_000033", "bir_inc_000034", "hack_disclosed", "2026-04-29", "day", "Syndicate disclosed Commons Bridge compromise", "Syndicate disclosed the bridge compromise, began tracing the attacker, and advised users not to provide liquidity during response.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "announced", affected_chains: ["base", "commons-chain", "ethereum"], affected_assets: ["synd"], sort_order: 20 }),
  ev("bir_ev_000168", "bir_bridge_000033", "bir_inc_000034", "bridge_paused", "2026-04-29", "day", "Commons Bridge operations paused", "Commons Bridge operation and related liquidity activity were paused during containment and investigation.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "announced", affected_chains: ["base", "commons-chain", "ethereum"], affected_assets: ["synd"], sort_order: 30 }),
  ev("bir_ev_000169", "bir_bridge_000033", "bir_inc_000034", "other", "2026-04-29", "day", "Syndicate began tracing and security investigation", "Syndicate engaged security firms and began tracing attacker activity while assessing reserves and affected users.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "announced", affected_chains: ["base", "commons-chain", "ethereum"], affected_assets: ["synd"], sort_order: 40 }),
  ev("bir_ev_000170", "bir_bridge_000033", "bir_inc_000034", "reimbursement_announced", "2026-04-29", "day", "Syndicate committed reserves for affected users", "Syndicate stated that sufficient SYND reserves were available to help affected users while the incident response continued.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "announced", affected_chains: ["base", "commons-chain"], affected_assets: ["synd"], sort_order: 50 }),
  ev("bir_ev_000171", "bir_bridge_000033", "bir_inc_000034", "reimbursement_completed", "2026-05-21", "day", "Commons users automatically reimbursed", "The official shutdown page states that every SYND balance on Commons, including staked SYND and unclaimed rewards, was returned to the corresponding Base wallet plus an additional 15 percent.", { status_effect: "dead", recovered_amount_text: "full automatic reimbursement plus 15 percent", restart_status: "not_reopened", reimbursement_status: "completed", affected_chains: ["base", "commons-chain"], affected_assets: ["synd"], sort_order: 60 }),
  ev("bir_ev_000172", "bir_bridge_000033", "bir_inc_000034", "shutdown_announced", "2026-05-21", "day", "Commons network and bridge wind-down announced", "Syndicate announced the Commons wind-down alongside the Labs lifecycle update and reimbursement outcome.", { impact_level: "critical", status_effect: "dead", restart_status: "not_reopened", reimbursement_status: "completed", affected_chains: ["base", "commons-chain", "ethereum"], affected_assets: ["synd"], notes: "The operator stated that the bridge compromise did not cause the separate Labs wind-down decision.", sort_order: 70 }),
  ev("bir_ev_000173", "bir_bridge_000033", "bir_inc_000034", "shutdown_effective", "2026-05-21", "day", "Commons Bridge permanently shut down", "The official Commons page states that Commons has shut down and no user claim action is required.", { impact_level: "critical", status_effect: "dead", restart_status: "not_reopened", reimbursement_status: "completed", affected_chains: ["base", "commons-chain", "ethereum"], affected_assets: ["synd"], sort_order: 80 })
);

const src = (id, bridge_id, incident_id, event_id, source_type, title, url, publisher, published_at, published_at_precision, claim_scope, extra = {}) => ({
  id, bridge_id, incident_id, event_id, source_type, title, url, publisher, published_at, published_at_precision,
  reliability: extra.reliability ?? "high",
  source_tier: extra.source_tier ?? "tier_1",
  url_status: extra.url_status ?? "live",
  archived_url: extra.archived_url ?? null,
  accessed_at: reviewedAt,
  claim_scope,
  language: extra.language ?? "en",
  author: extra.author ?? null,
  quote_excerpt: null,
  is_primary: extra.is_primary ?? false,
  is_paywalled: false,
  is_official_domain: extra.is_official_domain ?? false,
  supports_amount: extra.supports_amount ?? false,
  supports_recovery: extra.supports_recovery ?? false,
  supports_reimbursement: extra.supports_reimbursement ?? false,
  supports_reopen: extra.supports_reopen ?? false,
  supports_shutdown: extra.supports_shutdown ?? false,
  supports_migration: extra.supports_migration ?? false,
  notes: extra.notes ?? null
});

evidence.push(
  src("bir_src_000182", "bir_bridge_000031", "bir_inc_000033", "bir_ev_000152", "official_social", "Taiko incident and containment statement", "https://x.com/taikoxyz/status/2068858818352865626", "Taiko", "2026-06-22", "day", "incident_case", { is_primary: true, is_official_domain: true, supports_amount: true, supports_shutdown: true, notes: "Primary source for verification compromise, bridge withdrawals, halt, and approximate USD 1.7 million estimate." }),
  src("bir_src_000183", "bir_bridge_000031", "bir_inc_000033", "bir_ev_000157", "official_social", "Taiko bridge reopening and make-whole statement", "https://x.com/taikoxyz/status/2072533556224548918", "Taiko", "2026-07-02", "day", "reimbursement", { is_primary: true, is_official_domain: true, supports_reimbursement: true, supports_reopen: true, notes: "Primary source for restored backing, reopening, all users made whole, and temporary quotas." }),
  src("bir_src_000184", "bir_bridge_000031", null, null, "official_statement", "Taiko Alethia Network status", "https://status.taiko.xyz/", "Taiko", "2026-07-28", "day", "status", { is_primary: true, is_official_domain: true, supports_reopen: true, notes: "Current operational network status evidence." }),
  src("bir_src_000185", "bir_bridge_000031", "bir_inc_000033", "bir_ev_000151", "news_article", "Taiko confirms exploit and halts block production", "https://www.theblock.co/post/405486/taiko-confirms-exploit", "The Block", "2026-06-22", "day", "incident_case", { source_tier: "tier_2", supports_amount: true, supports_shutdown: true, notes: "Independent contemporaneous incident context." }),
  src("bir_src_000186", "bir_bridge_000031", "bir_inc_000033", "bir_ev_000156", "news_article", "Taiko reopens bridge after USD 1.7M exploit", "https://crypto-economy.com/taiko-reopens-bridge-after-1-7m-exploit/", "Crypto Economy", "2026-07-02", "day", "restart", { reliability: "medium", source_tier: "tier_3", supports_amount: true, supports_reimbursement: true, supports_reopen: true, notes: "Secondary reopening and make-whole context." }),
  src("bir_src_000187", "bir_bridge_000032", null, "bir_ev_000165", "official_social", "Everclear wind-down announcement", "https://twitter.com/EverclearOrg/status/2057488000003477886", "Everclear", "2026-05-21", "day", "shutdown", { is_primary: true, is_official_domain: true, supports_shutdown: true, notes: "Primary wind-down and qualified user-withdrawal statement." }),
  src("bir_src_000188", "bir_bridge_000032", null, "bir_ev_000161", "official_statement", "Everclear getting started — Everclear prev Connext", "https://docs.everclear.org/developers/getting-started", "Everclear", "2024", "year", "bridge_entity", { is_primary: true, is_official_domain: true, supports_migration: true, notes: "Primary same-entity rebrand and clearing-layer description." }),
  src("bir_src_000189", "bir_bridge_000032", null, "bir_ev_000163", "official_statement", "Everclear blog archive", "https://www.everclear.org/blog", "Everclear", "2026", "year", "url_history", { is_primary: true, is_official_domain: true, supports_reopen: true, supports_shutdown: false, notes: "Historical launch and product-publication chronology; accessible archive is not proof of current operation." }),
  src("bir_src_000190", "bir_bridge_000032", null, "bir_ev_000160", "official_blog", "xPollinate is now Connext Bridge", "https://medium.com/connext/xpollinate-is-now-connext-bridge-d294baea94c2", "Connext", "2022-03-08", "day", "migration", { is_primary: true, is_official_domain: true, supports_migration: true, notes: "Primary bridge-product naming history." }),
  src("bir_src_000191", "bir_bridge_000032", null, "bir_ev_000162", "official_blog", "Mainnet Beta and Beyond — Everclear Q3 recap", "https://www.everclear.org/blog/q3-recap", "Everclear", "2024-10-25", "day", "bridge_entity", { is_primary: true, is_official_domain: true, supports_reopen: true, notes: "Primary Mainnet Beta launch date and clearing-layer operation context." }),
  src("bir_src_000192", "bir_bridge_000032", null, "bir_ev_000164", "news_article", "Everclear winds down protocol, Foundation and Labs", "https://www.theblock.co/post/402252/clear-token-tanks-48-everclear-winds-down-protocol-foundation-labs-unit", "The Block", "2026-05-22", "day", "shutdown", { source_tier: "tier_2", supports_shutdown: true, notes: "Independent report based on the first-party announcement, including already-sunset protocol, UI, and chain context." }),
  src("bir_src_000193", "bir_bridge_000033", "bir_inc_000034", "bir_ev_000167", "official_social", "Syndicate Commons Bridge compromise statement", "https://twitter.com/syndicateio/status/2049352309784904187", "Syndicate", "2026-04-29", "day", "incident_case", { is_primary: true, is_official_domain: true, supports_amount: true, supports_reimbursement: true, supports_shutdown: true, notes: "Primary compromise, response, liquidity warning, and reserve-availability statement." }),
  src("bir_src_000194", "bir_bridge_000033", "bir_inc_000034", "bir_ev_000172", "official_social", "Syndicate Labs wind-down and Commons reimbursement thread", "https://x.com/syndicateio/status/2057291537860706672", "Syndicate", "2026-05-21", "day", "shutdown", { is_primary: true, is_official_domain: true, supports_reimbursement: true, supports_shutdown: true, notes: "Primary source separating Labs wind-down cause from the compromise and reporting users made whole." }),
  src("bir_src_000195", "bir_bridge_000033", "bir_inc_000034", "bir_ev_000173", "official_statement", "Commons has shut down", "https://commons.syndicate.io/", "Syndicate", "2026-05-21", "day", "reimbursement", { is_primary: true, is_official_domain: true, supports_reimbursement: true, supports_shutdown: true, notes: "Current official terminal page: all SYND returned automatically to Base wallets plus 15 percent; no user action required." }),
  src("bir_src_000196", "bir_bridge_000033", null, null, "official_statement", "Syndicate bridging documentation", "https://docs.syndicate.io/en/docs/synd/bridging", "Syndicate", "2026", "year", "bridge_entity", { is_primary: true, is_official_domain: true, supports_migration: true, notes: "Bridge-family and route context supporting separation of Commons Bridge from broader Syndicate routes." }),
  src("bir_src_000197", "bir_bridge_000033", "bir_inc_000034", "bir_ev_000166", "news_article", "Syndicate exploit linked to Commons Bridge compromise", "https://www.theblock.co/post/399318/syndicate-exploit", "The Block", "2026-04-30", "day", "amount", { source_tier: "tier_2", supports_amount: true, notes: "Independent amount and attacker-sale context." }),
  src("bir_src_000198", "bir_bridge_000033", "bir_inc_000034", "bir_ev_000169", "security_firm_report", "Syndicate Commons Bridge Upgrade Compromise", "https://www.darknavy.org/web3/exploits/syndicate-commons-bridge-upgrade-compromise/", "DARKNAVY", "2026", "year", "incident_case", { source_tier: "tier_2", supports_amount: true, notes: "Technical privileged-upgrade-path interpretation retained as analysis rather than final primary-source root cause." }),
  src("bir_src_000199", "bir_bridge_000033", "bir_inc_000034", "bir_ev_000172", "news_article", "Syndicate Labs to wind down operations", "https://www.theblock.co/post/402130/syndicate-labs-wind-down", "The Block", "2026-05-21", "day", "shutdown", { source_tier: "tier_2", supports_reimbursement: true, supports_shutdown: true, notes: "Independent operator-lifecycle and make-whole context." })
);

writeArray("data/bridges.json", bridges);
writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);
writeObject("data/reference/assets.json", assets);

const countFiles = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md"
];
for (const relativePath of countFiles) {
  const target = path.join(root, relativePath);
  let text = fs.readFileSync(target, "utf8");
  text = text
    .replaceAll(/Bridges\s+30/g, "Bridges     33")
    .replaceAll(/Incidents\s+32/g, "Incidents   34")
    .replaceAll(/Events\s+150/g, "Events      173")
    .replaceAll(/Evidence\s+181/g, "Evidence    199")
    .replaceAll(/data\/bridges\.json\s+30/g, "data/bridges.json       33")
    .replaceAll(/data\/incidents\.json\s+32/g, "data/incidents.json     34")
    .replaceAll(/data\/events\.json\s+150/g, "data/events.json        173")
    .replaceAll(/data\/evidence\.json\s+181/g, "data/evidence.json      199");
  fs.writeFileSync(target, text);
}

const changelogPath = path.join(root, "CHANGELOG.md");
let changelog = fs.readFileSync(changelogPath, "utf8");
changelog = changelog.replace(
  "### Added\n",
  "### Added\n\n- Phase 2 Batch 7 records for Taiko Bridge, Everclear / Connext, and Commons Bridge\n- Two incident cases covering message-proof exploitation and a route-specific bridge proxy compromise\n- SYND, CLEAR, and NEXT asset reference definitions\n"
);
changelog = changelog
  .replaceAll(/Bridges\s+30/g, "Bridges     33")
  .replaceAll(/Incidents\s+32/g, "Incidents   34")
  .replaceAll(/Events\s+150/g, "Events      173")
  .replaceAll(/Evidence\s+181/g, "Evidence    199");
fs.writeFileSync(changelogPath, changelog);

console.log("Applied Phase 2 Batch 7 canonical records.");
console.log(`Records: ${bridges.length} bridges, ${incidents.length} incidents, ${events.length} events, ${evidence.length} evidence sources.`);
