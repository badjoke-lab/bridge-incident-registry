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
  ["bridges", bridges, 35, "bir_bridge_000035"],
  ["incidents", incidents, 37, "bir_inc_000037"],
  ["events", events, 187, "bir_ev_000187"],
  ["evidence", evidence, 295, "bir_src_000295"]
];
for (const [name, rows, count, lastId] of expected) {
  if (rows.length !== count || rows.at(-1)?.id !== lastId) {
    throw new Error(`unexpected ${name} baseline: length=${rows.length}, last=${rows.at(-1)?.id}`);
  }
}

const reservedIds = [
  "bir_bridge_000036",
  "bir_inc_000038",
  "bir_ev_000188",
  "bir_src_000296",
  "bir_src_000297"
];
const allIds = new Set([...bridges, ...incidents, ...events, ...evidence].map((item) => item.id));
for (const id of reservedIds) {
  if (allIds.has(id)) throw new Error(`reserved canonical ID already exists: ${id}`);
}
if (bridges.some((item) => item.slug === "xrpl-tx-bridge" || item.canonical_name.toLowerCase().includes("xrpl-tx"))) {
  throw new Error("XRPL-TX Bridge already exists in canonical registry");
}
for (const key of ["xrpl", "tx"]) {
  if (Object.hasOwn(chains, key)) throw new Error(`chain reference key already exists unexpectedly: ${key}`);
}
if (Object.hasOwn(assets, "xrp")) throw new Error("asset reference key already exists unexpectedly: xrp");

chains.xrpl = {
  display_name: "XRP Ledger",
  aliases: ["XRPL", "XRP Ledger mainnet"]
};
chains.tx = {
  display_name: "TX Chain",
  aliases: ["TX blockchain", "Coreum", "Coreum Network"]
};
assets.xrp = {
  display_name: "XRP",
  aliases: ["XRP Ledger native asset"]
};

bridges.push({
  id: "bir_bridge_000036",
  slug: "xrpl-tx-bridge",
  previous_slugs: ["xrpl-coreum-bridge"],
  redirect_from: ["xrpl-coreum-bridge", "coreum-xrpl-bridge"],
  canonical_name: "XRPL-TX Bridge",
  type: "interoperability_protocol",
  status: "paused",
  summary: "XRPL-TX Bridge is the current TX-era identity of the bridge historically documented as XRPL-Coreum Bridge. It connects XRP Ledger and TX through an XRPL multi-signing account, a TX-side bridge contract, and a relayer set. Independent on-chain reporting says approximately 200,000 XRP left the bridge on August 9, 2026; the bridge was reported halted while the incident remained unresolved.",
  confidence: "medium",
  record_maturity: "reviewed",
  update_status: "current",
  last_reviewed_at: "2026-08-12",
  last_verified_at: "2026-08-12",
  aliases: ["XRPL-Coreum Bridge", "Coreum XRPL Bridge", "Coreum Bridge XRPL"],
  launch_date: null,
  launch_date_precision: "unknown",
  end_date: null,
  end_date_precision: "unknown",
  terminal_reason: null,
  official_url: "https://docs.tx.org/docs-bridge/introduction",
  official_domain: "docs.tx.org",
  official_url_status: "live",
  archived_url: null,
  primary_chains: ["xrpl", "tx"],
  primary_assets: ["xrp"],
  operator_name: "XRPL-TX Bridge relayer set",
  operator_type: "protocol ecosystem",
  ecosystem_name: "TX",
  related_protocols: ["Coreum", "Sologenic"],
  brand_history_notes: "Current TX documentation names the system XRPL-TX Bridge; historical Coreum documentation names the same relayer / multisig / bridge-contract architecture XRPL-Coreum Bridge. BIR models this as one lifecycle entity unless later first-party material establishes a technically separate redeployment.",
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: "The August 2026 incident is public with medium confidence while root cause, recovery, reimbursement, and final restart outcome remain under review. The presence of a relayer signature quorum is not treated as proof of relayer-key compromise."
});

incidents.push({
  id: "bir_inc_000038",
  bridge_id: "bir_bridge_000036",
  slug: "xrpl-tx-bridge-2026-xrp-loss",
  previous_slugs: [],
  redirect_from: [],
  title: "XRPL-TX Bridge August 2026 XRP loss",
  incident_date: "2026-08-09",
  incident_date_precision: "day",
  incident_type: "exploit",
  summary: "Independent on-chain reporting says 199,916.3 XRP left the XRPL-Coreum / current XRPL-TX Bridge through 94 payments over 97 minutes on August 9, 2026. Current public relayer source code contains a validation path consistent with the reported relayer-logic hypothesis, but BIR does not treat that code observation as proof of the production exploit path. No first-party incident postmortem was located at this review point.",
  confidence: "medium",
  record_maturity: "reviewed",
  update_status: "current",
  source_count: 2,
  last_reviewed_at: "2026-08-12",
  last_verified_at: "2026-08-12",
  is_major_incident: true,
  reported_loss_usd_display: null,
  reported_loss_usd: null,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: "199,916.3 XRP were reported transferred out of the bridge in 94 payments over 97 minutes.",
  reported_loss_assets: ["xrp"],
  usd_valuation_date: null,
  loss_amount_basis: "reported_by_news",
  amount_confidence: "medium",
  amount_note: "The XRP quantity is retained from contemporaneous secondary on-chain reporting. No USD value is canonicalized without a sourced valuation basis. The amount may be revised if a first-party postmortem or reproducible transaction package becomes available.",
  amount_claims: [
    {
      amount_text: "199,916.3 XRP reported transferred out in 94 payments over 97 minutes",
      source_id: "bir_src_000297",
      basis: "reported_by_news",
      notes: "Contemporaneous secondary report summarizing on-chain analysis; no unsourced USD conversion is added."
    }
  ],
  recovery_status: "unknown",
  reimbursement_status: "unknown",
  restart_status: "paused",
  current_outcome: "unknown",
  is_unresolved: true,
  unresolved_reason: [
    "No first-party TX/Coreum incident postmortem, recovery statement, reimbursement statement, or reopening statement was located at the 2026-08-12 review point.",
    "The exact production exploit path has not been established by an admitted first-party incident source.",
    "Final recovery and bridge restart outcomes remain unknown."
  ],
  affected_chains: ["xrpl", "tx"],
  affected_assets: ["xrp"],
  attack_vector_category: "unknown",
  postmortem_available: "not_found",
  known_unknowns: [
    "Whether the missing destination-address check visible in the reviewed relayer path was the exact production root cause is not established.",
    "Relayer-key compromise is not established; the reported 17-of-28 signatures are not treated as proof that private keys were stolen.",
    "The exact authoritative loss amount may change if TX/Coreum publishes a first-party report or a complete reproducible on-chain transaction set is admitted.",
    "Recovery, reimbursement, and reopening status after the reported halt remain unverified."
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
});

events.push({
  id: "bir_ev_000188",
  bridge_id: "bir_bridge_000036",
  incident_id: "bir_inc_000038",
  event_type: "exploit_disclosed",
  event_date: "2026-08-09",
  event_date_precision: "day",
  title: "XRPL-TX Bridge loses XRP and is reported halted",
  description: "Contemporaneous on-chain reporting says 199,916.3 XRP left the bridge through 94 payments over 97 minutes on August 9, 2026. The same reporting described the bridge as halted after the incident. BIR keeps the technical root cause provisional because no first-party incident postmortem has yet been admitted.",
  confidence: "medium",
  record_maturity: "reviewed",
  update_status: "current",
  impact_level: "major",
  status_effect: "bridge reported halted",
  source_count: 2,
  sort_order: 10,
  amount_text: "199,916.3 XRP reported transferred out",
  recovered_amount_text: null,
  reimbursement_status: "unknown",
  restart_status: "paused",
  affected_chains: ["xrpl", "tx"],
  affected_assets: ["xrp"],
  notes: "The incident occurrence and amount are supported by contemporaneous secondary reporting. The pinned first-party relayer source is attached as technical context only and does not independently prove that the reviewed code path was the production exploit path.",
  duplicate_of: null,
  merged_into: null
});

evidence.push(
  {
    id: "bir_src_000296",
    bridge_id: "bir_bridge_000036",
    incident_id: "bir_inc_000038",
    event_id: "bir_ev_000188",
    source_type: "other",
    title: "XRPL-to-Coreum relayer incoming-transaction process",
    url: "https://github.com/CoreumFoundation/coreumbridge-xrpl/blob/c0e94a322a11b5f6fa8fb27a64f6ed6be2da2f85/relayer/processes/xrpl_to_coreum.go",
    publisher: "CoreumFoundation",
    published_at: "2025-09-05",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_1",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-12",
    claim_scope: "incident_case",
    notes: "Pinned first-party technical artifact. The reviewed incoming-payment path checks final/successful Payment transactions, decodes the bridge memo, reads DeliveredAmount, and submits transfer evidence while no explicit payment Destination equality check against BridgeXRPLAddress is visible in that branch. This supports a verification-gap hypothesis but does not prove that the August 9 production exploit used this exact path.",
    language: "en",
    author: "CoreumFoundation contributors",
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: false,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false
  },
  {
    id: "bir_src_000297",
    bridge_id: "bir_bridge_000036",
    incident_id: "bir_inc_000038",
    event_id: "bir_ev_000188",
    source_type: "news_article",
    title: "XRP bridge loses 200K XRP after relayer logic flaw",
    url: "https://crypto.news/xrp-bridge-loses-200k-xrp-after-relayer-logic-flaw/",
    publisher: "crypto.news",
    published_at: "2026-08-11",
    published_at_precision: "day",
    reliability: "high",
    source_tier: "tier_2",
    url_status: "live",
    archived_url: null,
    accessed_at: "2026-08-12",
    claim_scope: "incident_case",
    notes: "Contemporaneous secondary report summarizing on-chain analysis: 199,916.3 XRP left the bridge through 94 payments over 97 minutes; withdrawals carried 17-of-28 relayer signatures; the bridge was halted. Its relayer-logic explanation remains a hypothesis in BIR until first-party incident evidence establishes the production root cause.",
    language: "en",
    author: "crypto.news",
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
  ["Bridges", 35, 36],
  ["Incidents", 37, 38],
  ["Events", 187, 188],
  ["Evidence", 295, 297]
];
for (const file of documentCountFiles) {
  const target = path.join(root, file);
  let text = fs.readFileSync(target, "utf8");
  for (const [label, from, to] of countUpdates) {
    const pattern = new RegExp(`(^|\\n)(${label})(\\s+)${from}(?=\\r?\\n|$)`, "g");
    text = text.replace(pattern, `$1$2$3${to}`);
  }
  fs.writeFileSync(target, text);
}

console.log("Applied bounded XRPL-TX Bridge August 2026 canonical records.");
console.log(JSON.stringify({ bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length }, null, 2));
