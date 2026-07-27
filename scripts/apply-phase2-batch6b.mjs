import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const writeArray = (relativePath, records) => {
  fs.writeFileSync(path.join(root, relativePath), `[\n${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`);
};
const writeObject = (relativePath, value) => {
  fs.writeFileSync(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);
};

const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const events = readJson("data/events.json");
const evidence = readJson("data/evidence.json");
const assets = readJson("data/reference/assets.json");

const targetIds = ["bir_bridge_000029", "bir_bridge_000030", "bir_inc_000030", "bir_inc_000031", "bir_inc_000032"];
const allIds = new Set([...bridges, ...incidents, ...events, ...evidence].map((record) => record.id));
if (targetIds.every((id) => allIds.has(id))) {
  console.log("Phase 2 Batch 6B canonical records are already present.");
  process.exit(0);
}
if (targetIds.some((id) => allIds.has(id))) throw new Error("Phase 2 Batch 6B is partially applied.");
if (bridges.length !== 28 || incidents.length !== 29 || events.length !== 134 || evidence.length !== 160) {
  throw new Error(`Unexpected canonical baseline: ${bridges.length}/${incidents.length}/${events.length}/${evidence.length}`);
}

const reviewedAt = "2026-07-28";
assets.rbc ??= { display_name: "RBC", aliases: ["Rubic token", "Rubic Classic"] };
assets.brbc ??= { display_name: "BRBC", aliases: ["Wrapped RBC", "BNB Chain Rubic token"] };

bridges.push(
  {
    id: "bir_bridge_000029",
    slug: "rubic",
    previous_slugs: [],
    redirect_from: ["rubic-exchange"],
    canonical_name: "Rubic",
    type: "bridge_aggregator",
    status: "active",
    summary: "Rubic is a cross-chain swap and bridge aggregator. It is included because a November 2022 private-key compromise affected the wallet used by its former RBC/BRBC bridge and a separate December 2022 RubicProxy flaw exposed approved user USDC, followed by contract suspension, replacement, audits, and continuing operation.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    aliases: ["Rubic Exchange", "Rubic Cross-Chain Tech Aggregator", "CryptoRubic"],
    launch_date: "2020-09",
    launch_date_precision: "month",
    end_date: null,
    end_date_precision: "unknown",
    terminal_reason: null,
    official_url: "https://rubic.exchange/",
    official_domain: "rubic.exchange",
    official_url_status: "live_verified",
    archived_url: null,
    primary_chains: ["ethereum", "bnb-chain", "polygon", "avalanche", "arbitrum", "optimism", "fantom", "unknown"],
    primary_assets: ["eth", "weth", "usdc", "usdt", "rbc", "brbc", "unknown"],
    operator_name: "Rubic team",
    operator_type: "protocol_team",
    ecosystem_name: "Rubic",
    related_protocols: [],
    brand_history_notes: "The former native RBC/BRBC bridge was disabled and replaced by external bridge infrastructure. That historical component is not treated as currently active merely because the Rubic aggregator remains active.",
    major_incident_count: 2,
    has_unresolved_incident: true,
    has_reimbursement_history: false,
    successor_id: null,
    predecessor_id: null,
    replacement_bridge_id: null,
    duplicate_of: null,
    merged_into: null,
    notes: "The November and December 2022 cases have different targets, causes, loss scopes, and aftermath and remain separate incidents."
  },
  {
    id: "bir_bridge_000030",
    slug: "unizen",
    previous_slugs: [],
    redirect_from: ["unizen-trade"],
    canonical_name: "Unizen",
    type: "bridge_aggregator",
    status: "active",
    summary: "Unizen is a trade and cross-chain aggregator whose Unizen Interoperability Protocol routes through third-party interoperability providers. It is included because a March 2024 external-call flaw exposed approved user assets, followed by a bounty and law-enforcement response, reimbursement commencement, partial recovery, contract changes, audits, and continuing operation.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    aliases: ["Unizen Trade", "Unizen Trade Aggregator", "Unizen Interoperability Protocol", "UIP"],
    launch_date: null,
    launch_date_precision: "unknown",
    end_date: null,
    end_date_precision: "unknown",
    terminal_reason: null,
    official_url: "https://unizen.io/",
    official_domain: "unizen.io",
    official_url_status: "live_verified",
    archived_url: null,
    primary_chains: ["ethereum", "bnb-chain", "polygon", "avalanche", "arbitrum", "optimism", "unknown"],
    primary_assets: ["eth", "usdt", "usdc", "dai", "unknown"],
    operator_name: "Unizen team",
    operator_type: "protocol_team",
    ecosystem_name: "Unizen",
    related_protocols: ["Unizen Interoperability Protocol"],
    brand_history_notes: null,
    major_incident_count: 1,
    has_unresolved_incident: true,
    has_reimbursement_history: true,
    successor_id: null,
    predecessor_id: null,
    replacement_bridge_id: null,
    duplicate_of: null,
    merged_into: null,
    notes: "The March 2024 incident affected Unizen's trade-aggregation contract and approved user assets. Integrated UIP providers are not classified as compromised."
  }
);

incidents.push(
  {
    id: "bir_inc_000030",
    bridge_id: "bir_bridge_000029",
    slug: "rubic-2022-rbc-brbc-bridge-wallet-compromise",
    previous_slugs: [],
    redirect_from: [],
    title: "Rubic 2022 RBC/BRBC bridge wallet compromise",
    incident_date: "2022-11-02",
    incident_date_precision: "day",
    incident_type: "abnormal_transfers",
    summary: "A private key for an administrative wallet used by Rubic's former RBC/BRBC bridge and staking rewards was compromised. Rubic reported that approximately 35 million RBC/BRBC were sold and that the former native bridge had already been disabled and replaced by an external bridge.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    source_count: 4,
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    is_major_incident: true,
    reported_loss_usd_display: "35 million RBC/BRBC sold; approximately 138 ETH proceeds reported",
    reported_loss_usd: null,
    reported_loss_usd_min: null,
    reported_loss_usd_max: null,
    reported_loss_text: "Rubic reported approximately 35 million locked RBC corresponding to previously minted BRBC were sold and approximately 138 ETH proceeds remained in the attacker wallet. No canonical USD loss is assigned.",
    reported_loss_assets: ["rbc", "brbc", "eth"],
    usd_valuation_date: null,
    loss_amount_basis: "reported_by_project",
    amount_confidence: "medium",
    amount_note: "Token quantity, realized attacker proceeds, broken bridge collateral relationship, and market-price impact measure different scopes and are not collapsed into one USD figure.",
    amount_claims: [
      {
        amount_text: "approximately 35 million RBC/BRBC sold",
        amount_usd_text: null,
        source_id: "bir_src_000161",
        basis: "reported_by_project",
        usd_valuation_date: null,
        notes: "Primary token-quantity claim."
      },
      {
        amount_text: "approximately 138 ETH obtained and still held at the update time",
        amount_usd_text: null,
        source_id: "bir_src_000161",
        basis: "reported_by_project",
        usd_valuation_date: "2022-11-04",
        notes: "Reported realized proceeds, not a canonical valuation of all released tokens."
      }
    ],
    recovery_status: "unknown",
    reimbursement_status: "not_applicable",
    restart_status: "replaced",
    current_outcome: "deprecated_after_incident",
    is_unresolved: true,
    unresolved_reason: [
      "The final disposition of the attacker proceeds is not established in reviewed sources.",
      "A complete recovery outcome for the released RBC/BRBC supply is not established."
    ],
    affected_chains: ["ethereum", "bnb-chain"],
    affected_assets: ["rbc", "brbc", "eth"],
    attack_vector_category: "operator_or_governance_issue",
    postmortem_available: "unclear",
    known_unknowns: [
      "The exact USD value realized across all token sales is not established.",
      "The former bridge was already disabled before disclosure, but the exact final disablement day is reported only as the end of October.",
      "User swap and staking funds were reported safe; this record does not infer user reimbursement."
    ],
    conflicting_claims: [],
    duplicate_of: null,
    merged_into: null,
    split_from: null,
    split_reason: null
  },
  {
    id: "bir_inc_000031",
    bridge_id: "bir_bridge_000029",
    slug: "rubic-2022-rubicproxy-approval-exploit",
    previous_slugs: [],
    redirect_from: [],
    title: "Rubic 2022 RubicProxy approval exploit",
    incident_date: "2022-12-25",
    incident_date_precision: "day",
    incident_type: "exploit",
    summary: "A RubicProxy routing flaw allowed arbitrary calls through a whitelisted USDC address and exposed user allowances. Security reports placed the stolen user funds around USD 1.4–1.5 million, after which affected contracts were stopped and later replaced with rewritten and audited contracts.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    source_count: 7,
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    is_major_incident: true,
    reported_loss_usd_display: "Approximately USD 1.4–1.5 million",
    reported_loss_usd: 1450000,
    reported_loss_usd_min: 1400000,
    reported_loss_usd_max: 1500000,
    reported_loss_text: "Independent technical reports generally place stolen approved-user USDC around USD 1.4–1.5 million before conversion to approximately 1,188 ETH.",
    reported_loss_assets: ["usdc", "weth", "eth"],
    usd_valuation_date: "2022-12-25",
    loss_amount_basis: "mixed_sources",
    amount_confidence: "medium",
    amount_note: "The canonical range excludes an erroneous USD 14.47 million rendering in one article describing approximately 1,188 ETH.",
    amount_claims: [
      {
        amount_text: "approved-user USDC transferred and converted to approximately 1,188 ETH",
        amount_usd_text: "approximately USD 1.45 million",
        source_id: "bir_src_000166",
        basis: "security_firm_report",
        usd_valuation_date: "2022-12-25",
        notes: "Used as the midpoint display amount."
      }
    ],
    recovery_status: "none",
    reimbursement_status: "unknown",
    restart_status: "replaced",
    current_outcome: "active_after_incident",
    is_unresolved: true,
    unresolved_reason: [
      "Reviewed sources do not establish attacker return or protocol recovery.",
      "Reviewed sources do not establish completed reimbursement for every affected wallet."
    ],
    affected_chains: ["ethereum"],
    affected_assets: ["usdc", "weth", "eth"],
    attack_vector_category: "smart_contract_bug",
    postmortem_available: "unclear",
    known_unknowns: [
      "The final user-by-user restitution outcome is not established.",
      "The exact transition date from stopped affected contracts to all rewritten production contracts is recorded only at month precision."
    ],
    conflicting_claims: [],
    duplicate_of: null,
    merged_into: null,
    split_from: null,
    split_reason: null
  },
  {
    id: "bir_inc_000032",
    bridge_id: "bir_bridge_000030",
    slug: "unizen-2024-external-call-approval-exploit",
    previous_slugs: [],
    redirect_from: [],
    title: "Unizen 2024 external-call approval exploit",
    incident_date: "2024-03-08",
    incident_date_precision: "day",
    incident_type: "exploit",
    summary: "An unsafe external-call path in an Ethereum Unizen trade-aggregation contract exposed approved user assets. Security reports estimated approximately USD 2.1–2.18 million stolen, followed by a bounty and law-enforcement response, reimbursement commencement, partial recovery, contract updates, and resumed active operation.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    source_count: 10,
    last_reviewed_at: reviewedAt,
    last_verified_at: reviewedAt,
    is_major_incident: true,
    reported_loss_usd_display: "Approximately USD 2.1–2.18 million",
    reported_loss_usd: 2100000,
    reported_loss_usd_min: 2100000,
    reported_loss_usd_max: 2180000,
    reported_loss_text: "SlowMist and other security reporting described approximately USD 2.1 million stolen, while later tracking described about USD 2.18 million in DAI-equivalent stolen funds.",
    reported_loss_assets: ["usdt", "dai", "usdc"],
    usd_valuation_date: "2024-03-08",
    loss_amount_basis: "mixed_sources",
    amount_confidence: "medium",
    amount_note: "Retain a narrow range because reports use different transaction snapshots and later stolen-fund totals.",
    amount_claims: [
      {
        amount_text: "USDT drained and converted to DAI",
        amount_usd_text: "approximately USD 2.1 million",
        source_id: "bir_src_000175",
        basis: "security_firm_report",
        usd_valuation_date: "2024-03-08",
        notes: "Conservative display amount."
      },
      {
        amount_text: "later tracked stolen DAI-equivalent funds",
        amount_usd_text: "approximately USD 2.18 million",
        source_id: "bir_src_000181",
        basis: "reported_by_news",
        usd_valuation_date: "2024-08-07",
        notes: "Upper tracked amount after later attacker movement."
      }
    ],
    recovery_status: "partial_recovery",
    reimbursement_status: "in_progress",
    restart_status: "reopened",
    current_outcome: "active_after_incident",
    is_unresolved: true,
    unresolved_reason: [
      "The official reimbursement post proves commencement for more than 99 percent of affected users, not final settlement for every wallet.",
      "Wallets above USD 750,000 were to be handled case by case and no reviewed completion statement was located.",
      "Most remaining stolen funds were later moved through Tornado Cash, so full attacker return is not established."
    ],
    affected_chains: ["ethereum"],
    affected_assets: ["usdt", "dai", "usdc"],
    attack_vector_category: "smart_contract_bug",
    postmortem_available: "unclear",
    known_unknowns: [
      "The final total reimbursed across all wallets is not established.",
      "The final recovered amount beyond the approximately USD 185,000 reported in March is not established.",
      "Current active operation does not establish reimbursement completion."
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
  ev("bir_ev_000135", "bir_bridge_000029", "bir_inc_000030", "deprecated", "2022-10", "month", "Rubic native RBC/BRBC bridge disabled", "Rubic reported that its native RBC/BRBC bridge was disabled at the end of October and replaced in practice by an external bridge solution.", { status_effect: "deprecated", restart_status: "replaced", affected_chains: ["ethereum", "bnb-chain"], affected_assets: ["rbc", "brbc"], sort_order: 10 }),
  ev("bir_ev_000136", "bir_bridge_000029", "bir_inc_000030", "hack_disclosed", "2022-11-02", "day", "RBC/BRBC bridge wallet compromise occurred", "Unauthorized actions using a compromised administrative-wallet private key released assets associated with the former RBC/BRBC bridge.", { status_effect: "deprecated", amount_text: "approximately 35 million RBC/BRBC", affected_chains: ["ethereum", "bnb-chain"], affected_assets: ["rbc", "brbc", "eth"], sort_order: 20 }),
  ev("bir_ev_000137", "bir_bridge_000029", "bir_inc_000030", "funds_lost", "2022-11-04", "day", "Rubic disclosed token sales and attacker proceeds", "Rubic reported approximately 35 million RBC/BRBC sold and approximately 138 ETH proceeds remaining in the marked attacker wallet.", { status_effect: "deprecated", amount_text: "35 million RBC/BRBC; approximately 138 ETH proceeds", affected_chains: ["ethereum", "bnb-chain"], affected_assets: ["rbc", "brbc", "eth"], sort_order: 30 }),
  ev("bir_ev_000138", "bir_bridge_000029", "bir_inc_000030", "migration_announced", "2022-11-29", "day", "Rubic announced tokenomics relaunch after collateral break", "Rubic stated that the additional RBC supply broke the RBC/BRBC collateral relationship and proposed relaunching the token with new tokenomics.", { status_effect: "deprecated", restart_status: "replaced", amount_text: "35 million additional RBC", affected_chains: ["ethereum", "bnb-chain"], affected_assets: ["rbc", "brbc"], sort_order: 40 }),
  ev("bir_ev_000139", "bir_bridge_000029", "bir_inc_000031", "exploit_occurred", "2022-12-25", "day", "RubicProxy approval exploit occurred", "An attacker abused RubicProxy routing validation and approved user allowances to transfer USDC and convert it to ETH.", { impact_level: "critical", status_effect: "paused", amount_text: "approximately USD 1.4–1.5 million", restart_status: "paused", reimbursement_status: "unknown", affected_chains: ["ethereum"], affected_assets: ["usdc", "weth", "eth"], sort_order: 10 }),
  ev("bir_ev_000140", "bir_bridge_000029", "bir_inc_000031", "transfers_suspended", "2022-12-25", "day", "Rubic stopped affected contracts and warned users", "Rubic stopped affected contracts and advised users to revoke approvals while the exploit was investigated.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "unknown", affected_chains: ["ethereum"], affected_assets: ["usdc"], sort_order: 20 }),
  ev("bir_ev_000141", "bir_bridge_000029", "bir_inc_000031", "bridge_reopened", "2023-04", "month", "Rewritten Rubic contracts entered production", "Later first-party contract documentation stated that rewritten and audited Rubic contracts launched in April 2023.", { status_effect: "active", restart_status: "replaced", reimbursement_status: "unknown", affected_chains: ["ethereum", "bnb-chain", "polygon", "avalanche", "arbitrum", "optimism", "fantom", "unknown"], affected_assets: ["unknown"], sort_order: 30 }),
  ev("bir_ev_000142", "bir_bridge_000029", "bir_inc_000031", "audit_published", "2024-02-16", "day", "Rubic published updated security architecture", "Rubic described rewritten contracts, audits, multisignature management, server hardening, monitoring, a CISO function, and a planned bug bounty.", { status_effect: "active", restart_status: "replaced", reimbursement_status: "unknown", affected_chains: ["unknown"], affected_assets: ["unknown"], sort_order: 40 }),
  ev("bir_ev_000143", "bir_bridge_000030", "bir_inc_000032", "exploit_occurred", "2024-03-08", "day", "Unizen external-call approval exploit occurred", "An unsafe external-call path exposed assets approved to the affected Ethereum trade-aggregation contract.", { impact_level: "critical", status_effect: "paused", amount_text: "approximately USD 2.1–2.18 million", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["ethereum"], affected_assets: ["usdt", "dai"], sort_order: 10 }),
  ev("bir_ev_000144", "bir_bridge_000030", "bir_inc_000032", "hack_disclosed", "2024-03-09", "day", "Unizen incident and approval risk disclosed", "PeckShield and Unizen communications warned users about the approval issue and the need to revoke the affected contract allowance.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["ethereum"], affected_assets: ["usdt", "dai"], sort_order: 20 }),
  ev("bir_ev_000145", "bir_bridge_000030", "bir_inc_000032", "legal_action", "2024-03-10", "day", "Unizen offered bounty and engaged investigators", "Unizen sent an on-chain message offering a 20 percent bounty and stated that law-enforcement and forensic specialists were involved.", { status_effect: "paused", restart_status: "paused", reimbursement_status: "not_announced", affected_chains: ["ethereum"], affected_assets: ["dai"], sort_order: 30 }),
  ev("bir_ev_000146", "bir_bridge_000030", "bir_inc_000032", "reimbursement_announced", "2024-03-11", "day", "Unizen announced immediate reimbursement plan", "Unizen announced that more than 99 percent of affected users would be made whole, beginning with wallets losing USD 750,000 or less, while larger cases would be handled individually.", { status_effect: "limited", restart_status: "paused", reimbursement_status: "announced", amount_text: "wallets at or below USD 750,000 prioritized", affected_chains: ["ethereum"], affected_assets: ["usdt", "usdc"], sort_order: 40 }),
  ev("bir_ev_000147", "bir_bridge_000030", "bir_inc_000032", "reimbursement_started", "2024-03-11", "day", "Unizen reimbursement distributions began", "The official announcement stated that distributions would begin immediately using USDT or USDC and would be reviewed wallet by wallet.", { status_effect: "limited", restart_status: "paused", reimbursement_status: "in_progress", affected_chains: ["ethereum"], affected_assets: ["usdt", "usdc"], sort_order: 50 }),
  ev("bir_ev_000148", "bir_bridge_000030", "bir_inc_000032", "funds_recovered", "2024-03-12", "day", "Unizen reported partial recovery from four hackers", "SlowMist reported that Unizen's CTO announced approximately USD 185,000 recovered from four hackers.", { status_effect: "limited", restart_status: "paused", reimbursement_status: "in_progress", recovered_amount_text: "approximately USD 185,000", affected_chains: ["ethereum"], affected_assets: ["dai", "unknown"], sort_order: 60 }),
  ev("bir_ev_000149", "bir_bridge_000030", "bir_inc_000032", "bridge_reopened", "2024-03", "month", "Unizen deployed critical updates and resumed operation", "First-party and contemporaneous reporting described critical contract and application updates, while current documentation and audits support continued active operation.", { confidence: "medium", status_effect: "active", restart_status: "reopened", reimbursement_status: "in_progress", affected_chains: ["ethereum", "unknown"], affected_assets: ["unknown"], sort_order: 70 }),
  ev("bir_ev_000150", "bir_bridge_000030", "bir_inc_000032", "other", "2024-08-07", "day", "Remaining stolen funds moved through Tornado Cash", "Later tracking reported the exploiter moving approximately USD 2.16 million in stolen funds through Tornado Cash, preventing any inference of full attacker return.", { status_effect: "active", restart_status: "reopened", reimbursement_status: "in_progress", amount_text: "approximately USD 2.16 million moved", affected_chains: ["ethereum"], affected_assets: ["dai", "eth"], sort_order: 80 })
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
  src("bir_src_000161", "bir_bridge_000029", "bir_inc_000030", "bir_ev_000137", "official_blog", "Rubic Weekly Report 11/04/2022", "https://cryptorubic.medium.com/rubic-weekly-report-11-04-2022-ce6196be68b8", "Rubic", "2022-11-04", "day", "incident_case", { is_primary: true, is_official_domain: true, supports_amount: true, supports_recovery: true, supports_shutdown: true, supports_migration: true, notes: "Primary source for wallet scope, private-key cause, 35 million RBC/BRBC, 138 ETH proceeds, user-fund exclusion, and external-bridge replacement." }),
  src("bir_src_000162", "bir_bridge_000029", "bir_inc_000030", "bir_ev_000138", "official_blog", "Introducing the New Rubic Tokenomics — The Way Forward", "https://cryptorubic.medium.com/introducing-the-new-rubic-tokenomics-the-way-forward-abca6cf11d8d", "Rubic", "2022-11-29", "day", "migration", { is_primary: true, is_official_domain: true, supports_amount: true, supports_migration: true, notes: "Primary source for collateral break, increased supply, price effect, and token relaunch plan." }),
  src("bir_src_000163", "bir_bridge_000029", "bir_inc_000030", "bir_ev_000135", "official_blog", "Cross-chain bridge RBC — BRBC and BRBC tutorial", "https://cryptorubic.medium.com/cross-chain-bridge-rbc-brbc-and-brbc-tutorial-92158999cabe", "Rubic", "2021-03", "month", "bridge_entity", { is_primary: true, is_official_domain: true, supports_amount: false, supports_shutdown: false, notes: "Historical first-party bridge design and RBC/BRBC relationship context." }),
  src("bir_src_000164", "bir_bridge_000029", "bir_inc_000030", "bir_ev_000136", "security_firm_report", "November 2022 Kickstart with USD 32+ Million in DeFi Hacks", "https://quillaudits.medium.com/november-2022-kickstart-with-32-million-in-defi-hacks-7898032cb7c0", "QuillAudits", "2022-11", "month", "incident_case", { source_tier: "tier_2", supports_amount: true, notes: "Independent summary of the administrative-key compromise and token transfer." }),
  src("bir_src_000165", "bir_bridge_000029", "bir_inc_000031", "bir_ev_000140", "official_social", "Rubic incident announcement", "https://x.com/CryptoRubic/status/1606970530032230403", "Rubic", "2022-12-25", "day", "incident_case", { is_primary: true, is_official_domain: true, supports_amount: true, supports_shutdown: true, notes: "Official incident notice referenced by multiple technical analyses." }),
  src("bir_src_000166", "bir_bridge_000029", "bir_inc_000031", "bir_ev_000139", "security_firm_report", "Decoding Rubic Exchange Exploit", "https://quillaudits.medium.com/decoding-rubic-exchange-exploit-quillaudits-44828e71c417", "QuillAudits", "2022-12-27", "day", "incident_case", { source_tier: "tier_2", supports_amount: true, supports_shutdown: true, notes: "Technical analysis of RubicProxy arbitrary-call and approved-USDC loss." }),
  src("bir_src_000167", "bir_bridge_000029", "bir_inc_000031", "bir_ev_000139", "security_firm_report", "Dcentralab Diligence Analysis: Rubic DEX Aggregator Hack", "https://medium.com/dcentralab-diligence/dcentralab-diligence-analysis-rubic-dex-aggregator-hack-d5ffd2505239", "Dcentralab Diligence", "2022-12-26", "day", "incident_case", { source_tier: "tier_2", supports_amount: true, supports_shutdown: true, notes: "Independent root-cause and user-approval analysis." }),
  src("bir_src_000168", "bir_bridge_000029", "bir_inc_000031", "bir_ev_000139", "security_firm_report", "How Was Rubic Protocol Hacked?", "https://medium.com/neptune-mutual/how-was-rubic-protocol-hacked-a39f4e9d8e00", "Neptune Mutual", "2023-01-02", "day", "incident_case", { source_tier: "tier_2", supports_amount: true, notes: "Independent technical and amount confirmation." }),
  src("bir_src_000169", "bir_bridge_000029", "bir_inc_000031", "bir_ev_000142", "official_blog", "Rubic’s New Security Architecture", "https://rubic.exchange/blog/rubics-new-security-architecture/", "Rubic", "2024-02-16", "day", "restart", { is_primary: true, is_official_domain: true, supports_reopen: true, supports_migration: true, notes: "First-party security architecture, rewritten contracts, audits, management controls, and monitoring context." }),
  src("bir_src_000170", "bir_bridge_000029", "bir_inc_000031", "bir_ev_000141", "official_blog", "How to Swap Using Rubic’s Contracts", "https://cryptorubic.medium.com/how-to-swap-using-rubic-contracts-3da46f0c830c", "Rubic", "2023-12-07", "day", "restart", { is_primary: true, is_official_domain: true, supports_reopen: true, supports_migration: true, notes: "States that new audited contracts launched in April 2023 and supports current active operation." }),
  src("bir_src_000171", "bir_bridge_000029", null, null, "official_statement", "Rubic cross-chain swap aggregator", "https://rubic.exchange/", "Rubic", "2026", "year", "status", { is_primary: true, is_official_domain: true, supports_reopen: true, notes: "Current active product evidence." }),
  src("bir_src_000172", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000147", "official_social", "Unizen reimbursement announcement", "https://x.com/unizen_io/status/1767075963475505522", "Unizen", "2024-03-11", "day", "reimbursement", { is_primary: true, is_official_domain: true, supports_reimbursement: true, supports_reopen: true, notes: "Official announcement of immediate reimbursement for more than 99 percent of affected users and threshold handling." }),
  src("bir_src_000173", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000144", "blockchain_analytics_report", "PeckShield Unizen approval-issue alert", "https://x.com/peckshield/status/1766210445415727608", "PeckShield", "2024-03-08", "day", "incident_case", { source_tier: "tier_1", supports_amount: true, supports_shutdown: true, notes: "Contemporaneous detection and revoke-approval warning." }),
  src("bir_src_000174", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000145", "official_social", "Unizen CTO incident-response update", "https://twitter.com/MartinGranstrom/status/1766898480386101440", "Martin Granström / Unizen", "2024-03-10", "day", "incident_case", { is_primary: true, is_official_domain: true, supports_recovery: true, supports_reopen: true, notes: "First-party technical-response, investigator, and security-update context." }),
  src("bir_src_000175", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000143", "security_firm_report", "Explained: The Unizen Hack, March 2024", "https://www.halborn.com/blog/post/explained-the-unizen-hack-march-2024", "Halborn", "2024-03", "month", "incident_case", { source_tier: "tier_1", supports_amount: true, supports_recovery: true, supports_reimbursement: true, notes: "Independent technical root-cause and outcome analysis." }),
  src("bir_src_000176", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000148", "security_firm_report", "SlowMist Monthly Security Report — March 2024", "https://slowmist.medium.com/slowmist-monthly-security-report-web3-security-loss-at-approximately-139-million-665dd2c75dcc", "SlowMist", "2024-04-01", "day", "recovery", { source_tier: "tier_1", supports_amount: true, supports_recovery: true, notes: "Reports approximately USD 2.1 million loss and approximately USD 185,000 recovery from four hackers." }),
  src("bir_src_000177", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000146", "news_article", "Unizen Pledges Reimbursements After USD 2.1M Loss", "https://cryptonews.com/news/unizen-security-breach-results-1m-loss-vows-reimbursments/", "Cryptonews", "2024-03-11", "day", "reimbursement", { source_tier: "tier_2", supports_amount: true, supports_reimbursement: true, supports_reopen: true, notes: "Preserves the official embedded reimbursement statement and threshold details." }),
  src("bir_src_000178", "bir_bridge_000030", null, null, "official_statement", "Unizen documentation", "https://docs.unizen.io/", "Unizen", "2026", "year", "status", { is_primary: true, is_official_domain: true, supports_reopen: true, notes: "Current active product and documentation evidence." }),
  src("bir_src_000179", "bir_bridge_000030", null, null, "official_statement", "Unizen Interoperability Protocol", "https://docs.unizen.io/introduction-to-unizen/unizen-overview/unizen-interoperability-protocol-uip", "Unizen", "2026", "year", "bridge_entity", { is_primary: true, is_official_domain: true, notes: "Supports UIP component and third-party-provider boundary." }),
  src("bir_src_000180", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000149", "audit_report", "Unizen Security Audits", "https://docs.unizen.io/other/security-audits", "Unizen", "2026", "year", "restart", { is_primary: true, is_official_domain: true, supports_reopen: true, notes: "Current audit listing and post-incident active-operation evidence." }),
  src("bir_src_000181", "bir_bridge_000030", "bir_inc_000032", "bir_ev_000150", "news_article", "Unizen hacker transfers USD 2.1M stolen funds to Tornado Cash", "https://www.tradingview.com/news/cointelegraph%3Af66d5f9aa094b%3A0-unizen-hacker-transfers-2-1m-stolen-funds-to-tornado-cash/", "Cointelegraph / TradingView", "2024-08-07", "day", "recovery", { source_tier: "tier_2", supports_amount: true, supports_recovery: true, supports_reimbursement: true, notes: "Later stolen-fund movement and unresolved recovery context." })
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
    .replaceAll(/Bridges\s+28/g, "Bridges     30")
    .replaceAll(/Incidents\s+29/g, "Incidents   32")
    .replaceAll(/Events\s+134/g, "Events      150")
    .replaceAll(/Evidence\s+160/g, "Evidence    181")
    .replaceAll(/data\/bridges\.json\s+28/g, "data/bridges.json       30")
    .replaceAll(/data\/incidents\.json\s+29/g, "data/incidents.json     32")
    .replaceAll(/data\/events\.json\s+134/g, "data/events.json        150")
    .replaceAll(/data\/evidence\.json\s+160/g, "data/evidence.json      181");
  fs.writeFileSync(target, text);
}

const changelogPath = path.join(root, "CHANGELOG.md");
let changelog = fs.readFileSync(changelogPath, "utf8");
changelog = changelog.replace(
  "### Added\n",
  "### Added\n\n- Phase 2 Batch 6B records for Rubic and Unizen\n- Three incident cases covering a deprecated native-bridge wallet compromise and two aggregator approval exploits\n- RBC and BRBC asset reference definitions\n"
);
changelog = changelog
  .replaceAll(/Bridges\s+28/g, "Bridges     30")
  .replaceAll(/Incidents\s+29/g, "Incidents   32")
  .replaceAll(/Events\s+134/g, "Events      150")
  .replaceAll(/Evidence\s+160/g, "Evidence    181");
fs.writeFileSync(changelogPath, changelog);

console.log("Applied Phase 2 Batch 6B canonical records.");
console.log(`Records: ${bridges.length} bridges, ${incidents.length} incidents, ${events.length} events, ${evidence.length} evidence sources.`);
