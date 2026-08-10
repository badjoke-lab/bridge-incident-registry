import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const writeCompact = (file, value) => {
  const body = value.map((item) => `  ${JSON.stringify(item)}`).join(",\n");
  fs.writeFileSync(path.join(root, file), `[\n${body}\n]\n`);
};

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");

const expected = [
  ["bridges", bridges, 33, "bir_bridge_000033"],
  ["incidents", incidents, 34, "bir_inc_000034"],
  ["events", events, 183, "bir_ev_000183"],
  ["evidence", evidence, 287, "bir_src_000287"]
];
for (const [name, rows, count, lastId] of expected) {
  if (rows.length !== count || rows.at(-1)?.id !== lastId) {
    throw new Error(`unexpected ${name} baseline: length=${rows.length}, last=${rows.at(-1)?.id}`);
  }
}

const reservedIds = [
  "bir_inc_000035",
  "bir_ev_000184",
  "bir_src_000288",
  "bir_src_000289",
  "bir_src_000290",
  "bir_src_000291"
];
const allIds = new Set([...incidents, ...events, ...evidence].map((item) => item.id));
for (const id of reservedIds) {
  if (allIds.has(id)) throw new Error(`reserved canonical ID already exists: ${id}`);
}

const bridge = bridges.find((item) => item.id === "bir_bridge_000012");
if (!bridge) throw new Error("Allbridge Core canonical entity missing");
if (bridge.slug !== "allbridge-core" || bridge.major_incident_count !== 1 || bridge.has_unresolved_incident !== false) {
  throw new Error("Allbridge Core baseline changed since review");
}

bridge.status = "active";
bridge.summary = "Allbridge Core is a native stablecoin bridge connecting EVM and non-EVM networks. It is included because its BNB Chain liquidity pools were exploited in April 2023 and its Solana stablecoin pools were exploited in July 2026. After the 2026 incident, Core was paused and then relaunched without liquidity pools using CCTP and LayerZero transfer routes.";
bridge.last_reviewed_at = "2026-08-10";
bridge.last_verified_at = "2026-08-10";
bridge.major_incident_count = 2;
bridge.has_unresolved_incident = true;
bridge.notes = "The April 2023 incident affected the earlier BNB Chain liquidity-pool design. On July 19, 2026, Allbridge reported a second Core security incident involving a $1.65 million withdrawal from liquidity pools on Solana. Core was paused and later relaunched without liquidity pools using CCTP and LayerZero while the team accelerated its transition toward Allbridge Next. Final attacker-fund recovery and affected-LP compensation remain unverified in this reviewed batch.";

const incident = {
  id: "bir_inc_000035",
  bridge_id: "bir_bridge_000012",
  slug: "allbridge-core-2026-solana-pool-exploit",
  previous_slugs: [],
  redirect_from: [],
  title: "Allbridge Core 2026 Solana pool exploit",
  incident_date: "2026-07-19",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "On July 19, 2026, Allbridge Core's Solana stablecoin liquidity pools were exploited. Allbridge confirmed that an attacker withdrew $1.65 million, paused Core during the investigation, and later relaunched Core without liquidity pools using CCTP and LayerZero transfer routes.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 4,
  last_reviewed_at: "2026-08-10",
  last_verified_at: "2026-08-10",
  is_major_incident: true,
  reported_loss_usd_display: "$1.65 million",
  reported_loss_usd: 1650000,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "Allbridge's official statement confirmed that an attacker withdrew $1.65 million from Allbridge Core liquidity pools; contemporaneous reporting located the affected USDC/USDT pools on Solana.",
  reported_loss_assets: ["usdc", "usdt"],
  usd_valuation_date: "2026-07-19",
  loss_amount_basis: "reported_by_project",
  amount_confidence: "high",
  amount_note: "Use the first-party $1.65 million withdrawal figure as canonical. Secondary technical reporting is retained for chain, asset, and mechanism corroboration rather than used to increase the amount.",
  amount_claims: [
    {
      amount_text: "$1.65 million withdrawn from Allbridge Core liquidity pools",
      amount_usd_text: "$1.65 million",
      source_id: "bir_src_000289",
      basis: "reported_by_project",
      usd_valuation_date: "2026-07-19",
      notes: "Canonical incident amount from Allbridge's official statement."
    }
  ],
  recovery_status: "unknown",
  reimbursement_status: "unknown",
  restart_status: "reopened",
  current_outcome: "active_after_incident",
  is_unresolved: true,
  unresolved_reason: [
    "Final attacker-fund recovery is not established in the admitted reviewed sources.",
    "Final affected-liquidity-provider compensation and reconciliation are not established.",
    "The announced longer-term transition away from the then-current Core and Classic form was not yet a completed shutdown or migration at review time."
  ],
  affected_chains: ["solana"],
  affected_assets: ["usdc", "usdt"],
  attack_vector_category: "liquidity_or_accounting_failure",
  postmortem_available: "available",
  known_unknowns: [
    "A first-party technical post-mortem exists on X, but its unarchived X URL is not admitted in this batch because the accepted risky-host ceiling must not regress.",
    "The implementation-level failure is therefore not promoted beyond the broader reviewed liquidity/accounting category.",
    "The final recovery, LP compensation, and transition outcomes require later review."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
};
incidents.push(incident);

const event = {
  id: "bir_ev_000184",
  bridge_id: "bir_bridge_000012",
  incident_id: "bir_inc_000035",
  event_type: "exploit_disclosed",
  event_date: "2026-07-19",
  event_date_precision: "day",
  title: "Allbridge Core Solana pool exploit disclosed",
  description: "Allbridge disclosed a security incident affecting Core, paused the protocol, told affected liquidity providers to withdraw, and subsequently confirmed that an attacker had withdrawn $1.65 million from Core liquidity pools.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "major",
  status_effect: "protocol paused",
  source_count: 3,
  sort_order: 10,
  amount_text: "$1.65 million",
  recovered_amount_text: null,
  reimbursement_status: "unknown",
  restart_status: "paused",
  affected_chains: ["solana"],
  affected_assets: ["usdc", "usdt"],
  notes: "The later relaunch is represented at incident level in this batch because the first-party Telegram rendering proves reopening but does not expose an independently stable calendar date for a separate reopen event.",
  duplicate_of: null,
  merged_into: null
};
events.push(event);

const evidenceBase = {
  bridge_id: "bir_bridge_000012",
  incident_id: "bir_inc_000035",
  publisher: "Allbridge",
  reliability: "high",
  source_tier: "tier_1",
  url_status: "live",
  archived_url: null,
  accessed_at: "2026-08-10",
  language: "en",
  author: null,
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: false,
  supports_recovery: false,
  supports_migration: false
};

evidence.push(
  {
    id: "bir_src_000288",
    ...evidenceBase,
    event_id: "bir_ev_000184",
    source_type: "official_social",
    title: "Allbridge Core security incident and protocol pause",
    url: "https://t.me/allbridge_announcements/969",
    published_at: "2026-07-19",
    published_at_precision: "day",
    claim_scope: "event",
    notes: "First-party incident notice supporting the Core pause, affected liquidity pools, resulting pool imbalance, and the stated intention to direct returned arbitrage funds toward affected LPs.",
    supports_amount: false,
    supports_reimbursement: true,
    supports_reopen: false,
    supports_shutdown: true
  },
  {
    id: "bir_src_000289",
    ...evidenceBase,
    event_id: "bir_ev_000184",
    source_type: "official_statement",
    title: "Official Statement from the Allbridge team",
    url: "https://t.me/allbridge_announcements/970",
    published_at: "2026-07-20",
    published_at_precision: "approximate",
    claim_scope: "amount",
    notes: "First-party statement confirming the $1.65 million attacker withdrawal, the planned pool-less Core relaunch through CCTP and LayerZero, and the accelerated transition toward Allbridge Next.",
    supports_amount: true,
    supports_reimbursement: false,
    supports_reopen: true,
    supports_shutdown: true,
    supports_migration: true
  },
  {
    id: "bir_src_000290",
    ...evidenceBase,
    event_id: null,
    source_type: "official_social",
    title: "Allbridge Core relaunch on CCTP and LayerZero",
    url: "https://t.me/allbridge_announcements/971",
    published_at: "2026-07-20",
    published_at_precision: "approximate",
    claim_scope: "restart",
    notes: "First-party relaunch notice stating that Allbridge Core was back up on CCTP and LayerZero without liquidity pools and that a technical post-mortem was available on X.",
    supports_amount: false,
    supports_reimbursement: false,
    supports_reopen: true,
    supports_shutdown: false
  },
  {
    id: "bir_src_000291",
    bridge_id: "bir_bridge_000012",
    incident_id: "bir_inc_000035",
    event_id: "bir_ev_000184",
    source_type: "news_article",
    title: "Allbridge Pauses Cross-Chain Protocol After $1.65M Flash Loan Attack",
    url: "https://decrypt.co/373831/allbridge-pauses-cross-chain-protocol-after-1-65m-flash-loan-attack",
    publisher: "Decrypt",
    published_at: "2026-07-20",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-10",
    claim_scope: "incident_case",
    notes: "Secondary corroboration for the July 19 incident date, Solana deployment, USDC/USDT pool impact, flash-loan-funded pool-ratio manipulation, and movement of proceeds toward Ethereum.",
    language: "en",
    author: "Decrypt Agent",
    quote_excerpt: null,
    is_primary: false,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: true,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: true,
    supports_migration: false
  }
);

writeCompact("data/bridges.json", bridges);
writeCompact("data/incidents.json", incidents);
writeCompact("data/events.json", events);
writeCompact("data/evidence.json", evidence);

const documentCountFiles = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md"
];
const countUpdates = [
  ["Incidents", 34, 35],
  ["Events", 183, 184],
  ["Evidence", 287, 291]
];
for (const file of documentCountFiles) {
  const target = path.join(root, file);
  let text = fs.readFileSync(target, "utf8");
  for (const [label, from, to] of countUpdates) {
    const pattern = new RegExp(`(^|\\n)(${label})(\\s+)${from}(?=\\r?\\n)`);
    if (!pattern.test(text)) throw new Error(`${file}: current ${label} ${from} baseline not found`);
    text = text.replace(pattern, (_match, prefix, name, spacing) => `${prefix}${name}${spacing}${to}`);
  }
  fs.writeFileSync(target, text);
}

console.log("Applied approved Allbridge Core 2026 canonical incident: 33 bridges / 35 incidents / 184 events / 291 evidence.");
