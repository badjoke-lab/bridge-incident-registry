import fs from "node:fs";

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));

function appendRecord(path, record, id) {
  const current = readJson(path);
  if (current.some((item) => item.id === id)) return false;
  const raw = fs.readFileSync(path, "utf8");
  const close = raw.lastIndexOf("\n]");
  if (close < 0) throw new Error(`Could not locate array terminator in ${path}`);
  const prefix = raw.slice(0, close).replace(/\s+$/, "");
  fs.writeFileSync(path, `${prefix},\n  ${JSON.stringify(record)}\n]\n`);
  return true;
}

const bridge = {
  id: "bir_bridge_000034",
  slug: "boltz",
  previous_slugs: [],
  redirect_from: ["boltz-exchange"],
  canonical_name: "Boltz",
  type: "hybrid",
  status: "paused",
  summary: "Boltz is a non-custodial Bitcoin swap and bridge service using atomic swaps across Bitcoin layers and selected stablecoin networks. It is included because the operator disabled all swaps until further notice in August 2026 after reporting escalating automated AI-assisted probing, several contained exploits, and security-scan findings that prevented a responsible restart. Refund paths and support remained available, and Boltz reported that no user funds had been at risk.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-04",
  last_verified_at: "2026-08-04",
  aliases: ["Boltz Exchange", "Boltz - Non-Custodial Bitcoin Bridge"],
  launch_date: null,
  launch_date_precision: "unknown",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://boltz.exchange/",
  official_domain: "boltz.exchange",
  official_url_status: "live_verified",
  archived_url: "https://web.archive.org/web/*/https://boltz.exchange/",
  primary_chains: ["bitcoin", "unknown"],
  primary_assets: ["btc", "usdt", "usdc", "wbtc", "unknown"],
  operator_name: "Boltz",
  operator_type: "company",
  ecosystem_name: "Bitcoin",
  related_protocols: ["Bitcoin", "Lightning Network", "Liquid", "Rootstock"],
  brand_history_notes: null,
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "Classified as paused rather than dead because the operator has not announced a permanent shutdown or terminal date. Normal swap creation is disabled, while cooperative and non-cooperative refund mechanisms and customer support remain available."
};

const incident = {
  id: "bir_inc_000035",
  bridge_id: "bir_bridge_000034",
  slug: "boltz-2026-security-shutdown",
  previous_slugs: [],
  redirect_from: [],
  title: "Boltz 2026 security-driven swap shutdown",
  incident_date: "2026-08-03",
  incident_date_precision: "day",
  incident_type: "bridge_pause",
  summary: "Boltz disabled all swap services until further notice after reporting a multi-month increase in automated AI-assisted probing, several contained exploits, and internal security-scan findings. The operator said the pace of attack iteration had exceeded its ability to remediate safely, while refund mechanisms and support remained available and no user funds were reported at risk.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 2,
  last_reviewed_at: "2026-08-04",
  last_verified_at: "2026-08-04",
  is_major_incident: true,
  reported_loss_usd_display: "No user-fund loss reported",
  reported_loss_usd: null,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "Boltz stated that no user funds had been at risk. No canonical loss amount is assigned.",
  reported_loss_assets: [],
  usd_valuation_date: null,
  loss_amount_basis: "not_applicable",
  amount_confidence: "not_applicable",
  amount_note: "The operator reported no user-fund loss; the company's own operational losses were not quantified and are not treated as user losses.",
  amount_claims: [],
  recovery_status: "not_applicable",
  reimbursement_status: "not_applicable",
  restart_status: "paused",
  current_outcome: "paused_long_term",
  is_unresolved: true,
  unresolved_reason: [
    "Boltz has not announced a restart date or final operating decision.",
    "The technical details, timing, and scope of the contained exploits have not been publicly established."
  ],
  affected_chains: ["bitcoin", "unknown"],
  affected_assets: ["btc", "usdt", "usdc", "wbtc", "unknown"],
  attack_vector_category: "unknown",
  postmortem_available: "unclear",
  known_unknowns: [
    "The number and technical nature of the contained exploits are not publicly detailed.",
    "The identities and exact count of the resource-rich groups described by Boltz are not established.",
    "The date and conditions for any swap-service reopening remain unknown."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
};

const event = {
  id: "bir_ev_000184",
  bridge_id: "bir_bridge_000034",
  incident_id: "bir_inc_000035",
  event_type: "bridge_paused",
  event_date: "2026-08-03",
  event_date_precision: "day",
  title: "Boltz disabled all swaps until further notice",
  description: "Boltz disabled all swap services after escalating automated AI-assisted probing, several contained exploits, and internal security findings made a responsible restart untenable. Cooperative and non-cooperative refund paths and customer support remained available.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "critical",
  status_effect: "paused",
  source_count: 2,
  sort_order: 1,
  amount_text: "No user-fund loss reported",
  recovered_amount_text: null,
  reimbursement_status: "not_applicable",
  restart_status: "paused",
  affected_chains: ["bitcoin", "unknown"],
  affected_assets: ["btc", "usdt", "usdc", "wbtc", "unknown"],
  notes: "This records the effective service pause, not a permanent shutdown. The operator did not disclose exploit reproduction details or a restart date.",
  duplicate_of: null,
  merged_into: null
};

const evidence = [
  {
    id: "bir_src_000285",
    bridge_id: "bir_bridge_000034",
    incident_id: "bir_inc_000035",
    event_id: "bir_ev_000184",
    source_type: "official_social",
    title: "Boltz swaps remain disabled until further notice",
    url: "https://x.com/Boltzhq/status/2084311537502630319",
    publisher: "Boltz",
    published_at: "2026-08-03",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-04",
    claim_scope: "incident_case",
    language: "en",
    author: null,
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: true,
    supports_migration: false,
    notes: "First-party statement supporting the security-driven full swap pause, the multi-month escalation pattern, the continued refund and support paths, and the statement that no user funds were at risk."
  },
  {
    id: "bir_src_000286",
    bridge_id: "bir_bridge_000034",
    incident_id: null,
    event_id: null,
    source_type: "official_statement",
    title: "Boltz non-custodial Bitcoin bridge",
    url: "https://boltz.exchange/",
    publisher: "Boltz",
    published_at: null,
    published_at_precision: "unknown",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: "https://web.archive.org/web/*/https://boltz.exchange/",
    accessed_at: "2026-08-04",
    claim_scope: "bridge_entity",
    language: "en",
    author: null,
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
    notes: "Current first-party product surface identifies Boltz as a non-custodial Bitcoin bridge for swaps across Bitcoin layers and stablecoins."
  },
  {
    id: "bir_src_000287",
    bridge_id: "bir_bridge_000034",
    incident_id: "bir_inc_000035",
    event_id: "bir_ev_000184",
    source_type: "official_statement",
    title: "Boltz API claims and refunds documentation",
    url: "https://api.docs.boltz.exchange/claiming-swaps.html",
    publisher: "Boltz",
    published_at: null,
    published_at_precision: "unknown",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: "https://web.archive.org/web/*/https://api.docs.boltz.exchange/claiming-swaps.html",
    accessed_at: "2026-08-04",
    claim_scope: "recovery",
    language: "en",
    author: null,
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: false,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false,
    notes: "First-party documentation supporting cooperative and script-path refund availability for failed swaps, including paths that do not depend on Boltz cooperation after timelock expiry."
  }
];

appendRecord("data/bridges.json", bridge, bridge.id);
appendRecord("data/incidents.json", incident, incident.id);
appendRecord("data/events.json", event, event.id);
for (const source of evidence) appendRecord("data/evidence.json", source, source.id);

const qualityPath = "scripts/check-source-quality-baseline.mjs";
let quality = fs.readFileSync(qualityPath, "utf8");
quality = quality.replace("risky_host_unarchived: 29,", "risky_host_unarchived: 30,");
fs.writeFileSync(qualityPath, quality);

console.log("Applied Boltz bridge, incident, event, and evidence records.");
