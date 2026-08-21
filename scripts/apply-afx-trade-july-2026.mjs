import fs from "node:fs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const write = (path, rows) => fs.writeFileSync(path, `[\n${rows.map((row) => `  ${JSON.stringify(row)}`).join(",\n")}\n]\n`);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const bridgesPath = "data/bridges.json";
const incidentsPath = "data/incidents.json";
const eventsPath = "data/events.json";
const evidencePath = "data/evidence.json";
const bridges = read(bridgesPath);
const incidents = read(incidentsPath);
const events = read(eventsPath);
const evidence = read(evidencePath);

assert(bridges.length === 40, `expected 40 bridges, found ${bridges.length}`);
assert(incidents.length === 43, `expected 43 incidents, found ${incidents.length}`);
assert(events.length === 203, `expected 203 events, found ${events.length}`);
assert(evidence.length === 334, `expected 334 evidence records, found ${evidence.length}`);
assert(!bridges.some((row) => row.slug === "afx-bridge" || row.canonical_name === "AFX Bridge"), "AFX bridge already exists");
assert(!incidents.some((row) => row.slug === "afx-bridge-2026-validator-infrastructure-compromise"), "AFX incident already exists");
for (const id of ["bir_bridge_000041", "bir_inc_000044", "bir_ev_000204", "bir_ev_000205", "bir_ev_000206", "bir_src_000336", "bir_src_000337", "bir_src_000338", "bir_src_000339", "bir_src_000340", "bir_src_000341", "bir_src_000342"]) {
  assert(![...bridges, ...incidents, ...events, ...evidence].some((row) => row.id === id), `${id} already exists`);
}

const bridgeId = "bir_bridge_000041";
const incidentId = "bir_inc_000044";
const detailedUrl = "https://medium.com/@AFXTrade/a-detailed-post-mortem-on-the-afx-security-incident-57d564ef812f";

bridges.push({
  id: bridgeId,
  slug: "afx-bridge",
  previous_slugs: [],
  redirect_from: [],
  canonical_name: "AFX Bridge",
  type: "asset_bridge",
  status: "paused",
  summary: "AFX Bridge is the AFX-operated custody bridge associated with AFX Trade's Arbitrum-based trading infrastructure. On July 22, 2026, a software-supply-chain and internal-infrastructure compromise reached a subset of AFX validator nodes, which then co-signed a bridge-contract transfer of 24,150,000 USDC. AFX suspended bridge operations and froze the bridge contract; a dated post-incident reopening has not been established.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-21",
  last_verified_at: "2026-08-21",
  aliases: ["AFX-operated custody bridge", "AFXBridge"],
  launch_date: null,
  launch_date_precision: "unknown",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://medium.com/@AFXTrade",
  official_domain: "medium.com",
  official_url_status: "live_verified",
  archived_url: null,
  primary_chains: ["arbitrum", "ethereum"],
  primary_assets: ["usdc"],
  operator_name: "AFX Trade",
  operator_type: "protocol_team",
  ecosystem_name: "AFX Trade",
  related_protocols: ["Arbitrum"],
  brand_history_notes: "BIR uses AFXTrade's verified first-party Medium publication channel as the public operator locator. The incident is scoped to AFX-operated custody-bridge and validator infrastructure and not to Arbitrum or Arbitrum's native bridge.",
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "Latest explicit first-party incident-era state is suspended/frozen. Infrastructure rebuilding and hardening are not treated as bridge-reopen evidence."
});

incidents.push({
  id: incidentId,
  bridge_id: bridgeId,
  slug: "afx-bridge-2026-validator-infrastructure-compromise",
  previous_slugs: [],
  redirect_from: [],
  title: "AFX Bridge 2026 validator infrastructure compromise",
  incident_date: "2026-07-22",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "On July 22, 2026, a software-supply-chain and internal-infrastructure compromise reached a subset of AFX validator nodes. The affected validators co-signed a transaction that transferred assets from the AFX-operated custody bridge. The reviewed Arbitrum transaction records 24,150,000 USDC, while contemporaneous reporting values the withdrawal at about $24.15 million. AFX states that no smart-contract vulnerability, Arbitrum-network compromise, or native-Arbitrum-bridge compromise occurred. Recovery, reimbursement completion, and bridge reopening remain unverified.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 6,
  last_reviewed_at: "2026-08-21",
  last_verified_at: "2026-08-21",
  is_major_incident: true,
  reported_loss_usd_display: "about $24.15 million",
  reported_loss_usd: 24150000,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "The reviewed Arbitrum transaction records a 24,150,000 USDC transfer from the AFX bridge path. Contemporaneous CoinDesk reporting describes the same withdrawal at about USD 24.15 million.",
  reported_loss_assets: ["usdc"],
  usd_valuation_date: "2026-07-22",
  loss_amount_basis: "mixed_sources",
  amount_confidence: "high",
  amount_note: "The exact token-denominated amount is anchored to the reviewed on-chain transaction. The approximately USD 24.15 million display uses contemporaneous reporting and is not a later explorer-rendered valuation.",
  amount_claims: [
    {
      amount_text: "24,150,000 USDC",
      amount_usd_text: null,
      source_id: "bir_src_000341",
      basis: "on_chain_transaction",
      usd_valuation_date: "2026-07-22",
      notes: "Stable token-denominated transaction amount; no current explorer USD rendering is used."
    },
    {
      amount_text: "24,150,000 USDC bridge withdrawal",
      amount_usd_text: "about $24.15 million",
      source_id: "bir_src_000340",
      basis: "contemporaneous_reporting",
      usd_valuation_date: "2026-07-22",
      notes: "Contemporaneous valuation corroborating the exact on-chain stablecoin quantity."
    }
  ],
  recovery_status: "unknown",
  reimbursement_status: "unknown",
  restart_status: "paused",
  current_outcome: "unknown",
  is_unresolved: true,
  unresolved_reason: [
    "A final attacker-fund recovery amount or percentage is not established in the admitted evidence.",
    "The preliminary first-party article that mentioned an affected-user recovery plan is not admitted because adding a second unarchived Medium URL would exceed the unchanged risky-host ceiling.",
    "A dated post-incident bridge reopening is not established.",
    "Infrastructure rebuilding and security hardening do not establish bridge restart or completed reimbursement."
  ],
  affected_chains: ["arbitrum", "ethereum"],
  affected_assets: ["usdc"],
  attack_vector_category: "validator_key_compromise",
  postmortem_available: "available",
  known_unknowns: [
    "The final recovered attacker-fund amount and custody disposition remain unresolved.",
    "Completed user reimbursement is not established by the admitted source package.",
    "No dated post-incident bridge reopening is established.",
    "Five-validator quorum details remain secondary corroboration and are not promoted into the canonical root-cause summary.",
    "The incident is confined to AFX-operated bridge and validator infrastructure; Arbitrum and its native bridge are explicitly excluded."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
});

const newEvents = [
  {
    id: "bir_ev_000204",
    bridge_id: bridgeId,
    incident_id: incidentId,
    event_type: "exploit_occurred",
    event_date: "2026-07-22",
    event_date_precision: "day",
    title: "Compromised AFX validator path authorizes custody-bridge transfer",
    description: "AFX reports that a software-supply-chain and internal-infrastructure compromise reached a subset of validator nodes, after which affected validators co-signed a bridge-contract call. The reviewed transaction moved 24,150,000 USDC from the AFX-operated custody-bridge path. The incident is not classified as a smart-contract or Arbitrum-native-bridge exploit.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    impact_level: "critical",
    status_effect: "AFX custody bridge compromised",
    source_count: 4,
    sort_order: 10,
    amount_text: "24,150,000 USDC; about $24.15 million contemporaneous value",
    recovered_amount_text: null,
    reimbursement_status: "unknown",
    restart_status: "paused",
    affected_chains: ["arbitrum", "ethereum"],
    affected_assets: ["usdc"],
    notes: "Public mechanism wording is intentionally bounded to supply-chain/infrastructure compromise reaching validators and does not reproduce operational attack instructions.",
    duplicate_of: null,
    merged_into: null
  },
  {
    id: "bir_ev_000205",
    bridge_id: bridgeId,
    incident_id: incidentId,
    event_type: "bridge_paused",
    event_date: "2026-07-22",
    event_date_precision: "day",
    title: "AFX suspends bridge operations and freezes bridge contract",
    description: "AFX states that all bridge-related operations were suspended platform-wide, the affected validator cluster was isolated, quorum collapsed, and the bridge contract was put into a frozen state during containment.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    impact_level: "critical",
    status_effect: "bridge operations suspended and contract frozen",
    source_count: 1,
    sort_order: 20,
    amount_text: null,
    recovered_amount_text: null,
    reimbursement_status: "unknown",
    restart_status: "paused",
    affected_chains: ["arbitrum", "ethereum"],
    affected_assets: ["usdc"],
    notes: "Infrastructure rebuilding after containment is not treated as a bridge reopening.",
    duplicate_of: null,
    merged_into: null
  },
  {
    id: "bir_ev_000206",
    bridge_id: bridgeId,
    incident_id: incidentId,
    event_type: "postmortem_published",
    event_date: "2026-07-31",
    event_date_precision: "day",
    title: "AFX publishes detailed incident post-mortem",
    description: "AFX published a detailed first-party post-mortem documenting the off-chain supply-chain and infrastructure compromise, validator impact, custody-bridge asset transfer, containment actions, and continuing fund tracking.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    impact_level: "high",
    status_effect: "root cause and response publicly documented",
    source_count: 1,
    sort_order: 30,
    amount_text: null,
    recovered_amount_text: null,
    reimbursement_status: "unknown",
    restart_status: "paused",
    affected_chains: ["arbitrum", "ethereum"],
    affected_assets: ["usdc"],
    notes: "The admitted first-party post-mortem states that stolen funds were moving and being tracked, but does not establish final recovery, completed reimbursement, or a bridge reopening.",
    duplicate_of: null,
    merged_into: null
  }
];
events.push(...newEvents);

const primaryBase = {
  bridge_id: bridgeId,
  reliability: "high",
  url_status: "live",
  archived_url: null,
  accessed_at: "2026-08-21",
  language: "en",
  quote_excerpt: null,
  is_paywalled: false,
  supports_migration: false,
  source_type: "postmortem",
  title: "A Detailed Post-Mortem on the AFX Security Incident",
  url: detailedUrl,
  publisher: "AFXTrade",
  published_at: "2026-07-31",
  published_at_precision: "day",
  source_tier: "tier_1",
  author: "AFXTrade",
  is_primary: true,
  is_official_domain: false,
  supports_amount: false,
  supports_recovery: true,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: true
};

evidence.push(
  {
    id: "bir_src_000336",
    ...primaryBase,
    incident_id: null,
    event_id: null,
    claim_scope: "bridge_entity",
    notes: "First-party AFX post-mortem establishes the affected AFX-operated custody-bridge identity and explicitly excludes Arbitrum and its native bridge. The same Medium URL is reused for bounded event-scoped primary evidence; archive-risk accounting is by unique URL."
  },
  {
    id: "bir_src_000337",
    ...primaryBase,
    incident_id: incidentId,
    event_id: "bir_ev_000204",
    claim_scope: "incident_case",
    notes: "Core first-party authority for July 22 date, supply-chain/internal-infrastructure path, validator compromise, custody-bridge transfer, explicit no-smart-contract/no-native-Arbitrum-bridge boundary, containment, and continuing fund tracking. It does not independently establish the exact 24,150,000 USDC amount."
  },
  {
    id: "bir_src_000338",
    ...primaryBase,
    incident_id: incidentId,
    event_id: "bir_ev_000205",
    claim_scope: "shutdown",
    notes: "Event-scoped first-party copy supporting platform-wide bridge suspension, validator isolation, quorum collapse, and bridge-contract freeze on July 22."
  },
  {
    id: "bir_src_000339",
    ...primaryBase,
    incident_id: incidentId,
    event_id: "bir_ev_000206",
    claim_scope: "postmortem",
    notes: "Event-scoped first-party copy supporting publication of the detailed July 31 post-mortem and its root-cause/response boundary."
  },
  {
    id: "bir_src_000340",
    bridge_id: bridgeId,
    incident_id: incidentId,
    event_id: "bir_ev_000204",
    source_type: "news_article",
    title: "Arbitrum-based AFX Trade drained of $24 million after bridge keys compromised",
    url: "https://www.coindesk.com/tech/2026/07/23/arbitrum-based-afx-trade-drained-of-usd24-million-after-bridge-keys-compromised",
    publisher: "CoinDesk",
    published_at: "2026-07-23",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-21",
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
    notes: "Contemporaneous reporting supporting the approximately $24.15M scale, validator-signature/quorum context, and explicit exclusion of Arbitrum's native bridge."
  },
  {
    id: "bir_src_000341",
    bridge_id: bridgeId,
    incident_id: incidentId,
    event_id: "bir_ev_000204",
    source_type: "other",
    title: "AFX Bridge July 22, 2026 USDC transfer transaction",
    url: "https://arbiscan.io/tx/0x50d0b3ec6c3f5fce0f10abf81540bbb508f421494aa2b3480c4a264b0436547b",
    publisher: "Arbiscan",
    published_at: "2026-07-22",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-21",
    claim_scope: "amount",
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
    notes: "Reproducible Arbitrum transaction anchor for the exact 24,150,000 USDC movement. Current explorer fiat rendering is not used as the incident-time valuation."
  },
  {
    id: "bir_src_000342",
    bridge_id: bridgeId,
    incident_id: incidentId,
    event_id: "bir_ev_000204",
    source_type: "security_firm_report",
    title: "Explained: The AFX Bridge Hack (July 2026)",
    url: "https://www.halborn.com/blog/post/explained-the-afxbridge-hack-july-2026",
    publisher: "Halborn",
    published_at: "2026-07-31",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-21",
    claim_scope: "incident_case",
    language: "en",
    author: "Rob Behnke",
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
    notes: "Independent security analysis corroborating validator-key/quorum mechanics, approximately $24.15M USDC transfer scale, off-chain key compromise, and absence of a smart-contract vulnerability. Canonical root-cause text follows AFX's deeper first-party supply-chain/infrastructure account."
  }
);

assert(bridges.length === 41, `expected 41 bridges after apply, found ${bridges.length}`);
assert(incidents.length === 44, `expected 44 incidents after apply, found ${incidents.length}`);
assert(events.length === 206, `expected 206 events after apply, found ${events.length}`);
assert(evidence.length === 341, `expected 341 evidence after apply, found ${evidence.length}`);

write(bridgesPath, bridges);
write(incidentsPath, incidents);
write(eventsPath, events);
write(evidencePath, evidence);
console.log("Applied bounded AFX July 2026 canonical package: 41 bridges / 44 incidents / 206 events / 341 evidence.");
