import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const writeArray = (path, items) => {
  fs.writeFileSync(path, `[\n  ${items.map((item) => JSON.stringify(item)).join(',\n  ')}\n]\n`);
};
const writeObject = (path, value) => {
  fs.writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const bridgesPath = 'data/bridges.json';
const incidentsPath = 'data/incidents.json';
const eventsPath = 'data/events.json';
const evidencePath = 'data/evidence.json';
const chainsPath = 'data/reference/chains.json';
const assetsPath = 'data/reference/assets.json';

const bridges = read(bridgesPath);
const incidents = read(incidentsPath);
const events = read(eventsPath);
const evidence = read(evidencePath);
const chains = read(chainsPath);
const assets = read(assetsPath);

assert(bridges.length === 36, `expected 36 bridges, got ${bridges.length}`);
assert(incidents.length === 38, `expected 38 incidents, got ${incidents.length}`);
assert(events.length === 190, `expected 190 events, got ${events.length}`);
assert(evidence.length === 299, `expected 299 evidence, got ${evidence.length}`);
assert(bridges.at(-1)?.id === 'bir_bridge_000036', 'unexpected bridge tail');
assert(incidents.at(-1)?.id === 'bir_inc_000038', 'unexpected incident tail');
assert(events.at(-1)?.id === 'bir_ev_000190', 'unexpected event tail');
assert(evidence.at(-1)?.id === 'bir_src_000299', 'unexpected evidence tail');
assert(!bridges.some((r) => r.id === 'bir_bridge_000037' || r.slug === 'wanbridge'), 'WanBridge bridge already exists');
assert(!incidents.some((r) => r.id === 'bir_inc_000039'), 'Wanchain incident already exists');
assert(!events.some((r) => r.id === 'bir_ev_000191'), 'Wanchain event already exists');
assert(!evidence.some((r) => r.id === 'bir_src_000300'), 'Wanchain evidence already exists');
assert(!chains.cardano, 'cardano chain reference already exists');
assert(!assets.night, 'NIGHT asset reference already exists');

chains.cardano = {
  display_name: 'Cardano',
  aliases: ['Cardano mainnet', 'ADA network'],
};
assets.night = {
  display_name: 'NIGHT',
  aliases: ['Midnight NIGHT', 'NIGHT token'],
};

bridges.push({
  id: 'bir_bridge_000037',
  slug: 'wanbridge',
  previous_slugs: [],
  redirect_from: ['wanchain-bridge'],
  canonical_name: 'WanBridge',
  type: 'asset_bridge',
  status: 'active',
  summary: "WanBridge is Wanchain's decentralised non-custodial cross-chain value-transfer bridge. It is included because a Cardano-side Wanchain Bridge smart contract on the Cardano–BNB Chain NIGHT route was exploited on July 20, 2026 through an ambiguous signed-message serialization flaw, leading to an unauthorized withdrawal of approximately 515 million NIGHT. Wanchain's broader bridge service remains publicly available, while the affected route's recovery and redeployment outcome remains unresolved in the latest incident-specific first-party source.",
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  last_reviewed_at: '2026-08-18',
  last_verified_at: '2026-08-18',
  aliases: ['Wanchain Bridge', 'Wanchain Cardano Bridge'],
  launch_date: null,
  launch_date_precision: 'unknown',
  end_date: null,
  end_date_precision: 'unknown',
  terminal_reason: null,
  official_url: 'https://bridge.wanchain.org/',
  official_domain: 'bridge.wanchain.org',
  official_url_status: 'live_verified',
  archived_url: null,
  primary_chains: ['cardano', 'bnb-chain'],
  primary_assets: ['night'],
  operator_name: 'Wanchain',
  operator_type: 'protocol_team',
  ecosystem_name: 'Wanchain',
  related_protocols: ['Wanchain Bridge Node Group', 'Midnight'],
  brand_history_notes: 'Wanchain documentation brands the direct value-transfer product as WanBridge, while the July 2026 incident postmortem refers to the affected system as Wanchain Bridge. BIR treats those names as one bridge entity unless later first-party material establishes a separate route-specific product identity.',
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: 'Entity status reflects the broader WanBridge service, not proof that the affected Cardano–BNB NIGHT route reopened. Route-specific restart remains unresolved in the incident record.',
});

incidents.push({
  id: 'bir_inc_000039',
  bridge_id: 'bir_bridge_000037',
  slug: 'wanbridge-2026-cardano-bnb-night-exploit',
  previous_slugs: [],
  redirect_from: [],
  title: 'WanBridge 2026 Cardano–BNB NIGHT exploit',
  incident_date: '2026-07-20',
  incident_date_precision: 'day',
  incident_type: 'exploit',
  summary: "On July 20, 2026, a malicious actor exploited a Wanchain Bridge smart contract on Cardano and withdrew approximately 515 million NIGHT. Wanchain's postmortem attributes the incident to ambiguous serialization of two adjacent numeric fields in the Cardano smart contract's signed-message verification path. The MPC relayer, private keys, hashing algorithm, and signatures were not compromised. The bridge became unavailable, funds were being traced, and a fix was still undergoing implementation and review in the latest incident-specific first-party source.",
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  source_count: 1,
  last_reviewed_at: '2026-08-18',
  last_verified_at: '2026-08-18',
  is_major_incident: true,
  reported_loss_usd_display: null,
  reported_loss_usd: null,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: 'Approximately 515 million NIGHT were withdrawn from the Cardano-side Wanchain Bridge smart contract.',
  reported_loss_assets: ['night'],
  usd_valuation_date: null,
  loss_amount_basis: 'reported_by_project',
  amount_confidence: 'high',
  amount_note: 'The first-party postmortem supports the approximate 515 million NIGHT quantity. BIR does not add a USD conversion because the admitted first-party source does not establish one and secondary valuations vary by valuation point.',
  amount_claims: [{
    amount_text: 'approximately 515 million NIGHT withdrawn',
    source_id: 'bir_src_000300',
    basis: 'reported_by_project',
    notes: 'First-party Wanchain postmortem quantity; no unsourced USD conversion is canonicalized.',
  }],
  recovery_status: 'unknown',
  reimbursement_status: 'unknown',
  restart_status: 'paused',
  current_outcome: 'unknown',
  is_unresolved: true,
  unresolved_reason: [
    'Wanchain reported active tracing and exchange coordination but did not report a completed recovery amount in the admitted postmortem.',
    'The admitted postmortem said developers were implementing a fix subject to internal and external review and did not establish completed redeployment of the affected route.',
    'Reimbursement or liability treatment for affected bridged NIGHT was not established in the admitted first-party source.',
  ],
  affected_chains: ['cardano', 'bnb-chain'],
  affected_assets: ['night'],
  attack_vector_category: 'smart_contract_bug',
  postmortem_available: 'available',
  known_unknowns: [
    "Maestro's dedicated Ogmios forwarding logs were not available to Wanchain at postmortem time, leaving part of the end-to-end transaction timing unresolved.",
    'The exact amount, if any, ultimately recovered or frozen after exchange coordination is not established in the admitted source.',
    'A dated restart or redeployment of the affected Cardano–BNB NIGHT route is not established by the admitted incident-specific first-party source.',
    'A canonical USD loss value is intentionally omitted because first-party valuation support was not located.',
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null,
});

events.push({
  id: 'bir_ev_000191',
  bridge_id: 'bir_bridge_000037',
  incident_id: 'bir_inc_000039',
  event_type: 'exploit_occurred',
  event_date: '2026-07-20',
  event_date_precision: 'day',
  title: 'WanBridge Cardano contract exploited and NIGHT withdrawn',
  description: 'Wanchain reported that a malicious actor exploited an ambiguous signed-message serialization flaw in a Cardano-side bridge smart contract and withdrew approximately 515 million NIGHT. The affected bridge became unavailable while Wanchain investigated, traced funds, and prepared a reviewed fix.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  impact_level: 'major',
  status_effect: 'affected bridge route became unavailable',
  source_count: 1,
  sort_order: 10,
  amount_text: 'approximately 515 million NIGHT withdrawn',
  recovered_amount_text: null,
  reimbursement_status: 'unknown',
  restart_status: 'paused',
  affected_chains: ['cardano', 'bnb-chain'],
  affected_assets: ['night'],
  notes: 'The broader WanBridge service being reachable is not treated as proof that the affected Cardano–BNB NIGHT route reopened.',
  duplicate_of: null,
  merged_into: null,
});

evidence.push({
  id: 'bir_src_000300',
  bridge_id: 'bir_bridge_000037',
  incident_id: 'bir_inc_000039',
  event_id: 'bir_ev_000191',
  source_type: 'postmortem',
  title: 'Cardano ↔ BNB Chain Bridge Incident Post-Mortem',
  url: 'https://medium.com/@wanchain_org/cardano-bnb-chain-bridge-incident-post-mortem-353e465276e7',
  publisher: 'Wanchain',
  published_at: '2026-07-28',
  published_at_precision: 'day',
  reliability: 'high',
  source_tier: 'tier_1',
  url_status: 'live',
  archived_url: null,
  accessed_at: '2026-08-18',
  claim_scope: 'incident_case',
  notes: 'First-party technical postmortem supporting the incident date, approximate 515 million NIGHT withdrawal, Cardano-side serialization flaw, explicit non-compromise of MPC/private keys/signatures, bridge unavailability, recovery pursuit, and fix/review status. It does not establish completed recovery, reimbursement, or route redeployment.',
  language: 'en',
  author: 'Wanchain',
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: false,
  supports_amount: true,
  supports_recovery: false,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: true,
  supports_migration: false,
});

writeArray(bridgesPath, bridges);
writeArray(incidentsPath, incidents);
writeArray(eventsPath, events);
writeArray(evidencePath, evidence);
writeObject(chainsPath, chains);
writeObject(assetsPath, assets);

console.log('Applied bounded Wanchain 2026 canonical draft.');
console.log(`Counts: ${bridges.length} bridges / ${incidents.length} incidents / ${events.length} events / ${evidence.length} evidence`);
