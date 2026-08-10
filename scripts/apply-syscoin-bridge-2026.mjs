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
  ["incidents", incidents, 35, "bir_inc_000035"],
  ["events", events, 184, "bir_ev_000184"],
  ["evidence", evidence, 291, "bir_src_000291"]
];
for (const [name, rows, count, lastId] of expected) {
  if (rows.length !== count || rows.at(-1)?.id !== lastId) {
    throw new Error(`unexpected ${name} baseline: length=${rows.length}, last=${rows.at(-1)?.id}`);
  }
}

const reservedIds = [
  "bir_bridge_000034",
  "bir_inc_000036",
  "bir_ev_000185",
  "bir_src_000292",
  "bir_src_000293"
];
const allIds = new Set([...bridges, ...incidents, ...events, ...evidence].map((item) => item.id));
for (const id of reservedIds) {
  if (allIds.has(id)) throw new Error(`reserved canonical ID already exists: ${id}`);
}
if (bridges.some((item) => item.slug === "syscoin-utxo-nevm-bridge" || item.canonical_name.toLowerCase().includes("syscoin"))) {
  throw new Error("Syscoin bridge already exists in canonical registry");
}

bridges.push({
  id: "bir_bridge_000034",
  slug: "syscoin-utxo-nevm-bridge",
  previous_slugs: [],
  redirect_from: [],
  canonical_name: "Syscoin UTXO–NEVM Bridge",
  type: "canonical_bridge",
  status: "paused",
  summary: "Syscoin UTXO–NEVM Bridge is Syscoin's native asset bridge between its UTXO and NEVM layers. It is included because a June 2026 cross-layer interpretation exploit released 5 billion unauthorized SYS; the full amount was later returned and burned, while the bridge remained paused in the latest explicit reviewed first-party status.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-10",
  last_verified_at: "2026-08-10",
  aliases: ["Syscoin Bridge", "Syscoin UTXO-to-NEVM bridge"],
  launch_date: null,
  launch_date_precision: "unknown",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://bridge.syscoin.org/",
  official_domain: "bridge.syscoin.org",
  official_url_status: "live",
  archived_url: null,
  primary_chains: ["syscoin-utxo", "syscoin-nevm"],
  primary_assets: ["sys"],
  operator_name: "Syscoin Core and ecosystem contributors",
  operator_type: "protocol ecosystem",
  ecosystem_name: "Syscoin",
  related_protocols: ["Syscoin Core", "NEVM"],
  brand_history_notes: "This record is the UTXO–NEVM bridge affected in June 2026. It is distinct from Syscoin's separate trustless Bitcoin bridge work and UTXO-to-Rollux bridge development.",
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "The June 2026 unauthorized 5 billion SYS release was fully returned and burned, restoring the reported coin supply. Financial recovery is complete, but bridge operations remained paused in the latest explicit reviewed first-party status."
});

incidents.push({
  id: "bir_inc_000036",
  bridge_id: "bir_bridge_000034",
  slug: "syscoin-utxo-nevm-2026-bridge-exploit",
  previous_slugs: [],
  redirect_from: [],
  title: "Syscoin UTXO–NEVM Bridge 2026 exploit",
  incident_date: "2026-06-07",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "On June 7, 2026, the Syscoin UTXO-to-NEVM bridge was exploited through a cross-layer interpretation mismatch involving duplicate asset commitments. The incident caused an unauthorized release of 5 billion SYS on the UTXO side. The full amount was later returned and burned, while the bridge remained paused in the latest explicit reviewed first-party status.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 2,
  last_reviewed_at: "2026-08-10",
  last_verified_at: "2026-08-10",
  is_major_incident: true,
  reported_loss_usd_display: "about $10 million",
  reported_loss_usd: 10000000,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "5 billion SYS were released without authorization; Halborn estimated the tokens at about $10 million at the time of the exploit. The full 5 billion SYS were later returned and burned.",
  reported_loss_assets: ["sys"],
  usd_valuation_date: "2026-06-07",
  loss_amount_basis: "secondary_valuation",
  amount_confidence: "medium",
  amount_note: "The first-party canonical quantity is 5 billion SYS. The approximately $10 million USD value is a secondary contemporaneous estimate from Halborn and must not be confused with permanent net loss because the full token quantity was returned and burned.",
  amount_claims: [
    {
      amount_text: "5 billion SYS unauthorized release",
      source_id: "bir_src_000292",
      basis: "reported_by_project",
      notes: "First-party Syscoin quantity; later fully returned and burned."
    },
    {
      amount_text: "5 billion SYS",
      amount_usd_text: "about $10 million",
      source_id: "bir_src_000293",
      basis: "secondary_valuation",
      usd_valuation_date: "2026-06-07",
      notes: "Halborn contemporaneous USD estimate; retained as secondary valuation only."
    }
  ],
  recovery_status: "full_recovery",
  reimbursement_status: "not_applicable",
  restart_status: "paused",
  current_outcome: "paused_long_term",
  is_unresolved: true,
  unresolved_reason: [
    "The unauthorized 5 billion SYS release was fully returned and burned, but the bridge remained paused in the latest explicit reviewed first-party status.",
    "No later first-party reopening date or completed operational restoration was admitted in this reviewed source set through 2026-08-10."
  ],
  affected_chains: ["syscoin-utxo", "syscoin-nevm"],
  affected_assets: ["sys"],
  attack_vector_category: "message_verification_failure",
  postmortem_available: "available",
  known_unknowns: [
    "The exact calendar date on which the full return and burn milestone completed is not assigned by the admitted postmortem; it is known to have occurred by the June 15 publication.",
    "A later bridge reopening may have occurred outside the admitted source set, but no stronger later first-party reopening notice was located during the 2026-08-10 review.",
    "The approximately $10 million valuation is secondary; the first-party invariant is the 5 billion SYS quantity."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
});

events.push({
  id: "bir_ev_000185",
  bridge_id: "bir_bridge_000034",
  incident_id: "bir_inc_000036",
  event_type: "funds_returned",
  event_date: "2026-06",
  event_date_precision: "month",
  title: "Five billion SYS returned and burned after bridge exploit",
  description: "Syscoin's June 15 technical postmortem confirmed that the 5 billion SYS released without authorization on June 7 had been returned to the official recovery address and then burned to a standard OP_RETURN, restoring the reported coin supply, while the bridge remained paused.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "major",
  status_effect: "full fund recovery; bridge remained paused",
  source_count: 1,
  sort_order: 10,
  amount_text: "5 billion SYS unauthorized release",
  recovered_amount_text: "5 billion SYS returned and burned",
  reimbursement_status: "not_applicable",
  restart_status: "paused",
  affected_chains: ["syscoin-utxo", "syscoin-nevm"],
  affected_assets: ["sys"],
  notes: "Month precision is intentional: the postmortem proves the full recovery/burn by June 15 but does not assign one exact calendar date to the completed milestone.",
  duplicate_of: null,
  merged_into: null
});

evidence.push(
  {
    id: "bir_src_000292",
    bridge_id: "bir_bridge_000034",
    incident_id: "bir_inc_000036",
    event_id: "bir_ev_000185",
    source_type: "postmortem",
    title: "Technical Postmortem: Syscoin Bridge Incident, Recovery, and Remediation",
    url: "https://syscoin.org/news/technical-postmortem-syscoin-bridge-incident-recovery-and-remediation",
    publisher: "Syscoin",
    published_at: "2026-06-15",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-10",
    claim_scope: "recovery",
    notes: "First-party final technical postmortem. Authority for the June 7 incident, 5 billion SYS quantity, duplicate-asset cross-layer interpretation mismatch, full return and burn, remediation, and continued bridge pause.",
    language: "en",
    author: "Syscoin Core",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: true,
    supports_migration: false
  },
  {
    id: "bir_src_000293",
    bridge_id: "bir_bridge_000034",
    incident_id: "bir_inc_000036",
    event_id: null,
    source_type: "security_firm_report",
    title: "Explained: The Syscoin Bridge Hack (June 2026)",
    url: "https://www.halborn.com/blog/post/explained-the-syscoin-bridge-hack-june-2026",
    publisher: "Halborn",
    published_at: "2026-06-08",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-10",
    claim_scope: "amount",
    notes: "Secondary security-firm analysis supporting bridge classification, the 5 billion SYS scale, and an approximately $10 million contemporaneous valuation. Its earlier broad parser/proof shorthand does not override Syscoin's later first-party root-cause description.",
    language: "en",
    author: "Rob Behnke",
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
  ["Bridges", 33, 34],
  ["Incidents", 35, 36],
  ["Events", 184, 185],
  ["Evidence", 291, 293]
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

console.log("Applied approved Syscoin UTXO–NEVM Bridge 2026 canonical incident: 34 bridges / 36 incidents / 185 events / 293 evidence.");
