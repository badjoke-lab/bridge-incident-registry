import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const writeCompact = (file, value) => {
  const body = value.map((item) => `  ${JSON.stringify(item)}`).join(",\n");
  fs.writeFileSync(path.join(root, file), `[\n${body}\n]\n`);
};
const writePrettyObject = (file, value) => {
  fs.writeFileSync(path.join(root, file), `${JSON.stringify(value, null, 2)}\n`);
};

const bridges = read("data/bridges.json");
const incidents = read("data/incidents.json");
const events = read("data/events.json");
const evidence = read("data/evidence.json");
const chains = read("data/reference/chains.json");
const assets = read("data/reference/assets.json");

const expected = [
  ["bridges", bridges, 34, "bir_bridge_000034"],
  ["incidents", incidents, 36, "bir_inc_000036"],
  ["events", events, 185, "bir_ev_000185"],
  ["evidence", evidence, 293, "bir_src_000293"]
];
for (const [name, rows, count, lastId] of expected) {
  if (rows.length !== count || rows.at(-1)?.id !== lastId) {
    throw new Error(`unexpected ${name} baseline: length=${rows.length}, last=${rows.at(-1)?.id}`);
  }
}

const reservedIds = [
  "bir_bridge_000035",
  "bir_inc_000037",
  "bir_ev_000186",
  "bir_ev_000187",
  "bir_src_000294",
  "bir_src_000295"
];
const allIds = new Set([...bridges, ...incidents, ...events, ...evidence].map((item) => item.id));
for (const id of reservedIds) {
  if (allIds.has(id)) throw new Error(`reserved canonical ID already exists: ${id}`);
}
if (bridges.some((item) => item.slug === "tac-inner-bridge" || item.canonical_name.toLowerCase().includes("tac inner bridge"))) {
  throw new Error("TAC Inner Bridge already exists in canonical registry");
}
for (const key of ["ton", "tac"]) {
  if (Object.hasOwn(chains, key)) throw new Error(`chain reference key already exists unexpectedly: ${key}`);
}
for (const key of ["blum", "tston"]) {
  if (Object.hasOwn(assets, key)) throw new Error(`asset reference key already exists unexpectedly: ${key}`);
}

chains.ton = {
  display_name: "TON",
  aliases: ["The Open Network", "TON Blockchain"]
};
chains.tac = {
  display_name: "TAC",
  aliases: ["TAC EVM", "TAC Network"]
};
assets.blum = {
  display_name: "BLUM",
  aliases: ["Blum"]
};
assets.tston = {
  display_name: "tsTON",
  aliases: []
};

bridges.push({
  id: "bir_bridge_000035",
  slug: "tac-inner-bridge",
  previous_slugs: [],
  redirect_from: [],
  canonical_name: "TAC Inner Bridge",
  type: "canonical_bridge",
  status: "paused",
  summary: "TAC Inner Bridge is TAC's native lock-and-mint cross-chain framework connecting TON and TAC. It is included because its sequencer message-validation path was exploited in May 2026, causing unbacked minting on TAC and release of real locked assets on TON. TAC reported partial attacker-fund recovery and a Foundation backstop for the remaining shortfall, while the latest explicit reviewed first-party bridge state remained paused pending patched sequencer review and staged redeployment.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-11",
  last_verified_at: "2026-08-11",
  aliases: ["TAC Bridge", "TON/TAC Crosschain Framework", "TON ↔ TAC asset bridge"],
  launch_date: null,
  launch_date_precision: "unknown",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://tac.build/",
  official_domain: "tac.build",
  official_url_status: "live",
  archived_url: null,
  primary_chains: ["ton", "tac"],
  primary_assets: ["usdt", "blum", "tston"],
  operator_name: "TAC",
  operator_type: "protocol_team",
  ecosystem_name: "TAC",
  related_protocols: ["TAC EVM", "TAC sequencer set"],
  brand_history_notes: "This record covers TAC's first-party TON ↔ TAC Inner Bridge / cross-chain framework. Third-party TAC routes such as Stargate, Hyperlane, or LayerZero are not included in the incident boundary merely because the attacker later used external cross-chain infrastructure.",
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: true,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "The May 2026 incident had approximately $2.854 million protocol loss and $2.291 million final net recovery. TAC announced a treasury backstop for the remaining shortfall, but reviewed first-party evidence did not establish completed reimbursement/liquidity restoration or bridge reopening."
});

incidents.push({
  id: "bir_inc_000037",
  bridge_id: "bir_bridge_000035",
  slug: "tac-inner-bridge-2026-jetton-verification-exploit",
  previous_slugs: [],
  redirect_from: [],
  title: "TAC Inner Bridge 2026 jetton verification exploit",
  incident_date: "2026-05-11",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "On May 11, 2026, TAC's TON-to-TAC sequencer path accepted messages from a counterfeit TON jetton wallet because canonical wallet code-hash and expected-minter provenance were not verified. The attacker minted unbacked equivalents on TAC and bridged them back through the legitimate return path to release real locked USD₮, BLUM, and tsTON assets on TON. TAC reported approximately $2.854 million protocol loss, approximately $2.291 million final net recovery, a Foundation commitment to cover the remaining shortfall, and a continued bridge pause pending patched sequencer review.",
  confidence: "high",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 2,
  last_reviewed_at: "2026-08-11",
  last_verified_at: "2026-08-11",
  is_major_incident: true,
  reported_loss_usd_display: "about $2.85 million",
  reported_loss_usd: 2854486.22,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "TAC's first-party post-mortem reported total protocol loss of approximately $2,854,486.22, consisting of USD₮, BLUM, and tsTON affected through the exploit path.",
  reported_loss_assets: ["usdt", "blum", "tston"],
  usd_valuation_date: "2026-05-12",
  loss_amount_basis: "reported_by_project",
  amount_confidence: "high",
  amount_note: "Keep the approximately $2.854 million total protocol loss distinct from TAC's $2.2906879 million final net attacker-fund recovery and from the separately announced Foundation treasury backstop for any remaining shortfall.",
  amount_claims: [
    {
      amount_text: "total protocol loss",
      amount_usd_text: "$2,854,486.22",
      source_id: "bir_src_000294",
      basis: "reported_by_project",
      usd_valuation_date: "2026-05-12",
      notes: "First-party headline protocol-loss figure from TAC's technical post-mortem."
    },
    {
      amount_text: "final net recovered funds",
      amount_usd_text: "$2,290,687.90 (about 80.2% of total protocol loss)",
      source_id: "bir_src_000294",
      basis: "reported_by_project",
      notes: "First-party recovery figure; this is partial recovery, not reimbursement completion."
    }
  ],
  recovery_status: "partial_recovery",
  reimbursement_status: "announced",
  restart_status: "paused",
  current_outcome: "paused_long_term",
  is_unresolved: true,
  unresolved_reason: [
    "The final net attacker-fund recovery was $2,290,687.90, approximately 80.2% of the reported $2,854,486.22 protocol loss, so recovery was not full.",
    "TAC announced that the Foundation treasury would cover the remaining shortfall, but the admitted sources do not establish completed reimbursement or completed bridge-liquidity restoration.",
    "The TON/TAC cross-chain framework remained paused in the latest explicit reviewed first-party status, with patched sequencer review and staged redeployment still pending."
  ],
  affected_chains: ["ton", "tac"],
  affected_assets: ["usdt", "blum", "tston"],
  attack_vector_category: "message_verification_failure",
  postmortem_available: "available",
  known_unknowns: [
    "A later first-party reopening notice was not located in the official TAC site results reviewed through 2026-08-11.",
    "Completion of TAC Foundation treasury deployment and any final user/protocol restoration transactions is not established by the admitted sources.",
    "TAC's recovery section distinguishes approximately 90% of assets accessible during the incident-response negotiation from a final net recovery equal to 80.2% of total protocol loss; BIR uses the final net 80.2% figure for canonical recovery status."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
});

events.push(
  {
    id: "bir_ev_000186",
    bridge_id: "bir_bridge_000035",
    incident_id: "bir_inc_000037",
    event_type: "exploit_disclosed",
    event_date: "2026-05-11",
    event_date_precision: "day",
    title: "TAC Inner Bridge exploited and TON/TAC framework paused",
    description: "TAC's sequencer set accepted a bridge message from a counterfeit TON jetton wallet because the software did not verify canonical code-hash and expected-minter provenance. Unbacked equivalents were minted on TAC and used through the legitimate return path to release real locked assets on TON; TAC halted the TON/TAC cross-chain framework after confirming the breach.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    impact_level: "major",
    status_effect: "TON/TAC cross-chain framework paused",
    source_count: 1,
    sort_order: 10,
    amount_text: "approximately $2.85 million protocol loss",
    recovered_amount_text: null,
    reimbursement_status: "announced",
    restart_status: "paused",
    affected_chains: ["ton", "tac"],
    affected_assets: ["usdt", "blum", "tston"],
    notes: "The event date follows TAC's incident timeline. Foundation shortfall coverage was announced later and is represented at incident level rather than treated as completed reimbursement.",
    duplicate_of: null,
    merged_into: null
  },
  {
    id: "bir_ev_000187",
    bridge_id: "bir_bridge_000035",
    incident_id: "bir_inc_000037",
    event_type: "funds_returned",
    event_date: "2026-05-14",
    event_date_precision: "day",
    title: "TAC recovery arrangement returns majority of affected assets",
    description: "TAC's tracing appendix records May 14 refund transactions after a negotiated recovery arrangement. TAC later reported final net recovered funds of $2,290,687.90, approximately 80.2% of the $2,854,486.22 protocol loss; the bridge remained paused and the Foundation committed to cover the remaining shortfall.",
    confidence: "high",
    record_maturity: "reviewed",
    update_status: "current",
    impact_level: "major",
    status_effect: "partial fund recovery; bridge remained paused",
    source_count: 1,
    sort_order: 20,
    amount_text: "$2,854,486.22 total protocol loss",
    recovered_amount_text: "$2,290,687.90 final net recovery (about 80.2%)",
    reimbursement_status: "announced",
    restart_status: "paused",
    affected_chains: ["ton", "tac"],
    affected_assets: ["usdt", "blum", "tston"],
    notes: "May 14 is the first-party refund-transaction date from Appendix II. The later final net recovery calculation is retained in the event description without converting the Foundation backstop into completed reimbursement.",
    duplicate_of: null,
    merged_into: null
  }
);

evidence.push(
  {
    id: "bir_src_000294",
    bridge_id: "bir_bridge_000035",
    incident_id: "bir_inc_000037",
    event_id: "bir_ev_000186",
    source_type: "postmortem",
    title: "Post-Mortem Report: TAC Bridge",
    url: "https://tac.build/blog/post-mortem-report-tac-bridge",
    publisher: "TAC",
    published_at: "2026-05-20",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-11",
    claim_scope: "incident_case",
    notes: "First-party technical post-mortem and authority for the May 11 incident, counterfeit-jetton validation failure, $2,854,486.22 protocol loss, $2,290,687.90 final net recovery / 80.2% recovery rate, bridge pause, Foundation shortfall commitment, and pending patched-sequencer redeployment.",
    language: "en",
    author: "TAC",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: true,
    supports_reopen: false,
    supports_shutdown: true,
    supports_migration: false
  },
  {
    id: "bir_src_000295",
    bridge_id: "bir_bridge_000035",
    incident_id: "bir_inc_000037",
    event_id: "bir_ev_000187",
    source_type: "postmortem",
    title: "Post-Mortem Report: TAC Bridge Appendix II - Onchain Tracing",
    url: "https://tac.build/blog/post-mortem-report-tac-bridge-appendix-ii---onchain-tracing",
    publisher: "TAC",
    published_at: "2026-05-20",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-11",
    claim_scope: "recovery",
    notes: "First-party tracing appendix supporting the exploit transaction path, May 14 negotiated refund transactions, recovered-asset custody, and multi-chain tracing details.",
    language: "en",
    author: "TAC",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: true,
    supports_recovery: true,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false
  }
);

writeCompact("data/bridges.json", bridges);
writeCompact("data/incidents.json", incidents);
writeCompact("data/events.json", events);
writeCompact("data/evidence.json", evidence);
writePrettyObject("data/reference/chains.json", chains);
writePrettyObject("data/reference/assets.json", assets);

const documentCountFiles = [
  "README.md",
  "docs/runbooks/current-status.md",
  "docs/runbooks/recovery-checkpoint.md",
  "docs/runbooks/development-roadmap.md",
  "docs/runbooks/public-consistency-remediation.md"
];
const countUpdates = [
  ["Bridges", 34, 35],
  ["Incidents", 36, 37],
  ["Events", 185, 187],
  ["Evidence", 293, 295]
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

console.log("Applied approved TAC Inner Bridge 2026 canonical incident: 35 bridges / 37 incidents / 187 events / 295 evidence.");
