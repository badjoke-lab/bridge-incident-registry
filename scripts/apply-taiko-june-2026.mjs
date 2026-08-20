import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readText = (p) => fs.readFileSync(path.join(root, p), "utf8");
const writeText = (p, value) => fs.writeFileSync(path.join(root, p), value);
const readJson = (p) => JSON.parse(readText(p));
const writeArray = (p, records) => writeText(p, `[\n${records.map((record) => `  ${JSON.stringify(record)}`).join(",\n")}\n]\n`);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const BRIDGE_ID = "bir_bridge_000031";
const INCIDENT_ID = "bir_inc_000033";
const EVENT_IDS = ["bir_ev_000151", "bir_ev_000152", "bir_ev_000153", "bir_ev_000154", "bir_ev_000155", "bir_ev_000156", "bir_ev_000157", "bir_ev_000158"];
const NEW_SOURCE_IDS = ["bir_src_000326", "bir_src_000327"];

const bridges = readJson("data/bridges.json");
const incidents = readJson("data/incidents.json");
const events = readJson("data/events.json");
const evidence = readJson("data/evidence.json");
const assets = readJson("data/reference/assets.json");

assert(bridges.length === 39, `expected 39 bridges, found ${bridges.length}`);
assert(incidents.length === 42, `expected 42 incidents, found ${incidents.length}`);
assert(events.length === 199, `expected 199 events, found ${events.length}`);
assert(evidence.length === 325, `expected 325 evidence, found ${evidence.length}`);
assert(evidence.at(-1)?.id === "bir_src_000325", "unexpected evidence tail id");

const bridge = bridges.find((record) => record.id === BRIDGE_ID);
const incident = incidents.find((record) => record.id === INCIDENT_ID);
assert(bridge?.slug === "taiko-bridge", "existing Taiko bridge identity mismatch");
assert(incident?.slug === "taiko-bridge-2026-message-proof-exploit", "existing Taiko incident identity mismatch");
assert(bridge.major_incident_count === 1, "unexpected Taiko major incident count");
assert(bridge.has_unresolved_incident === false, "expected pre-enrichment bridge unresolved flag false");
assert(incident.source_count === 10, "expected pre-enrichment Taiko source_count 10");
assert(incident.reported_loss_usd === 1700000, "expected pre-enrichment Taiko amount 1.7M");
assert(incident.recovery_status === "none", "expected pre-enrichment Taiko recovery none");
assert(incident.is_unresolved === false, "expected pre-enrichment Taiko incident resolved flag false");
for (const id of EVENT_IDS) assert(events.some((record) => record.id === id && record.incident_id === INCIDENT_ID), `missing Taiko event ${id}`);

for (const key of ["crvusd", "crv", "izi", "weeth", "taiko"]) {
  assert(!assets[key], `asset reference ${key} already exists; re-review current main before enrichment`);
}
assets.crvusd = { display_name: "crvUSD", aliases: ["Curve USD"] };
assets.crv = { display_name: "CRV", aliases: ["Curve DAO Token"] };
assets.izi = { display_name: "iZi", aliases: ["iZUMi Finance token"] };
assets.weeth = { display_name: "weETH", aliases: ["Wrapped eETH"] };
assets.taiko = { display_name: "TAIKO", aliases: ["Taiko token"] };
writeText("data/reference/assets.json", `${JSON.stringify(assets, null, 2)}\n`);

const affectedAssets = ["eth", "weth", "usdc", "crvusd", "usdt", "crv", "izi", "wbtc", "weeth", "taiko"];

Object.assign(bridge, {
  summary: "Taiko Bridge is Taiko's first-party canonical bridge between Ethereum and Taiko. In June 2026, forged L2 proof/state data enabled fraudulent withdrawals from the canonical Bridge and ERC20Vault after an exposed SGX prover signing key and an attestation check that failed to reject debug-enabled enclaves undermined the prover trust boundary. Taiko paused the affected paths, restored the pre-attack state, recollateralized the bridge 1:1, made users whole, and reopened the bridge on July 2 under conservative quotas.",
  last_reviewed_at: "2026-08-20",
  last_verified_at: "2026-08-20",
  launch_date: "2024-05-27",
  launch_date_precision: "day",
  official_url: "https://bridge.taiko.xyz/",
  official_domain: "taiko.xyz",
  official_url_status: "live_verified",
  primary_assets: affectedAssets,
  related_protocols: ["Taiko Alethia", "Taiko Inbox", "SignalService", "ERC20Vault"],
  brand_history_notes: "The canonical entity covers Taiko's official Ethereum-facing Bridge and ERC20Vault withdrawal path. The first-party postmortem says the ZK proving math and Bridge contracts themselves were not the exploited bug; forged finalized L2 state was accepted upstream and then consumed by the normal withdrawal path.",
  has_unresolved_incident: true,
  notes: "Current active status follows the July 2 reopening. User backing and compensation are complete, while attacker-fund recovery remains partial and law-enforcement recovery remains open."
});

Object.assign(incident, {
  title: "Taiko Bridge June 2026 forged proof/state exploit",
  summary: "On June 21, 2026, an attacker used an exposed SGX prover signing key together with an attestation check that failed to reject debug-enabled enclaves to produce accepted proofs over a fake Taiko L2 state. The forged finalized state enabled fraudulent withdrawals from the canonical Bridge and ERC20Vault. Taiko's first-party postmortem reports about $1.75 million of actual loss. The bridge was paused, remediated, recollateralized 1:1, and reopened on July 2; users were made whole while attacker-fund recovery remained partial.",
  source_count: 11,
  last_reviewed_at: "2026-08-20",
  last_verified_at: "2026-08-20",
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
  amount_claims: [{
    amount_text: "actual successful withdrawals across ETH, stablecoins, TAIKO and other ERC-20 assets",
    amount_usd_text: "about $1.75 million",
    source_id: "bir_src_000326",
    basis: "first-party postmortem aggregate and itemized successful withdrawals",
    usd_valuation_date: "2026-06-21",
    notes: "Excludes larger fraudulent claims that never paid and were later force-resolved."
  }],
  recovery_status: "partial_recovery",
  reimbursement_status: "completed",
  restart_status: "reopened",
  current_outcome: "active_after_incident",
  is_unresolved: true,
  unresolved_reason: [
    "Attacker-fund recovery remains incomplete: Taiko reported 17 ETH returned to treasury, additional TAIKO frozen at MEXC pending law-enforcement process, and other stolen ETH moved through Tornado Cash or remained in known attacker wallets.",
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
  conflicting_claims: []
});

const byEvent = new Map(events.map((record) => [record.id, record]));
Object.assign(byEvent.get("bir_ev_000151"), {
  title: "Forged Taiko proof/state enables bridge withdrawals",
  description: "An exposed SGX prover signing key and an attestation check that failed to reject debug-enabled enclaves allowed accepted proofs over a fake L2 state. The resulting forged finalized state enabled fraudulent withdrawals through the canonical Bridge and ERC20Vault. Taiko reports about $1.75 million of actual loss.",
  source_count: 3,
  amount_text: "about $1.75 million",
  affected_assets: affectedAssets,
  notes: "Public description is intentionally non-operational. Taiko states that the ZK proving math and Bridge contracts themselves were not the exploited bug."
});
Object.assign(byEvent.get("bir_ev_000152"), {
  description: "Taiko's Security Council paused the canonical Bridge and ERC20Vault during containment, preventing further withdrawals while additional permissionless proving/proposing paths were disabled and remediation proceeded.",
  affected_assets: affectedAssets,
  notes: "Pause is first-party documented and distinct from the later July 2 reopening."
});
Object.assign(byEvent.get("bir_ev_000153"), { affected_assets: affectedAssets });
Object.assign(byEvent.get("bir_ev_000154"), {
  title: "Taiko reports about $1.75 million of actual withdrawals",
  description: "Taiko's postmortem reports about $1.75 million of actual successful withdrawals before containment. Larger fraudulent claims that never paid are excluded.",
  amount_text: "about $1.75 million",
  affected_assets: affectedAssets
});
Object.assign(byEvent.get("bir_ev_000155"), {
  description: "Taiko closed the attack path, restored the pre-attack state, recollateralized the bridge 1:1 in kind, and reviewed fixes with independent specialists before reopening. This restoration is separate from attacker-fund recovery.",
  affected_assets: affectedAssets,
  notes: "Recollateralization and Foundation backfill are not classified as attacker-fund recovery."
});
Object.assign(byEvent.get("bir_ev_000156"), {
  description: "After remediation, state restoration and 1:1 recollateralization, Taiko reopened the Bridge and ERC20Vault on July 2 under deliberately conservative withdrawal quotas.",
  affected_assets: affectedAssets
});
Object.assign(byEvent.get("bir_ev_000157"), {
  description: "Taiko states that the Foundation and Taiko Labs covered the complete shortfall, restored 1:1 backing, and made every affected user whole without waiting for attacker-fund recovery.",
  affected_assets: affectedAssets,
  notes: "Completed user backfill is distinct from still-partial attacker-fund recovery."
});
Object.assign(byEvent.get("bir_ev_000158"), { affected_assets: affectedAssets });

const postmortemUrl = "https://paragraph.com/@taiko-labs/taiko-security-incident-a-postmortem-and-next-steps";
const common = {
  bridge_id: BRIDGE_ID,
  reliability: "high",
  source_tier: "tier_1",
  url_status: "live",
  accessed_at: "2026-08-20",
  language: "en",
  author: "Taiko Labs",
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: false,
  supports_migration: false
};

evidence.push(
  {
    id: NEW_SOURCE_IDS[0], ...common, incident_id: INCIDENT_ID, event_id: "bir_ev_000151",
    source_type: "postmortem", title: "Taiko Security Incident: A Postmortem and Next Steps", url: postmortemUrl, publisher: "Taiko Labs",
    published_at: "2026-07", published_at_precision: "month", claim_scope: "incident_case",
    supports_amount: true, supports_recovery: true, supports_reimbursement: true, supports_reopen: true, supports_shutdown: true,
    notes: "Core first-party incident authority for the forged proof/state mechanism, approximate $1.75M actual loss, itemized successful withdrawals, partial attacker-fund recovery, complete user backfill, remediation and July 2 reopening. The reviewed page does not expose a reliable day-level publication date, so BIR preserves only month precision."
  },
  {
    id: NEW_SOURCE_IDS[1], ...common, incident_id: null, event_id: null,
    source_type: "official_blog", title: "Taiko is live on Ethereum mainnet!", url: "https://paragraph.com/@taiko-labs/taiko-is-live-on-ethereum-mainnet", publisher: "Taiko Labs",
    published_at: "2024-05-27", published_at_precision: "day", claim_scope: "bridge_entity",
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false,
    notes: "First-party mainnet launch material supporting the May 27, 2024 launch boundary, official Ethereum-to-Taiko bridge identity, and initial quota-controlled bridge model. Hosted on Paragraph rather than taiko.xyz."
  }
);

writeArray("data/bridges.json", bridges);
writeArray("data/incidents.json", incidents);
writeArray("data/events.json", events);
writeArray("data/evidence.json", evidence);

assert(readJson("data/bridges.json").length === 39, "bridge count must remain 39");
assert(readJson("data/incidents.json").length === 42, "incident count must remain 42");
assert(readJson("data/events.json").length === 199, "event count must remain 199");
assert(readJson("data/evidence.json").length === 327, "evidence count must become 327");
assert(readJson("data/evidence.json").filter((source) => source.incident_id === INCIDENT_ID).length === 11, "Taiko incident source_count must equal 11");
assert(readJson("data/evidence.json").filter((source) => source.event_id === "bir_ev_000151").length === 3, "Taiko exploit event source_count must equal 3");

console.log("Applied bounded Taiko June 2026 enrichment.");
console.log("Counts: 39 bridges / 42 incidents / 199 events / 327 evidence.");
console.log("Updated bir_bridge_000031 / bir_inc_000033 / bir_ev_000151-000158; added bir_src_000326-000327.");
