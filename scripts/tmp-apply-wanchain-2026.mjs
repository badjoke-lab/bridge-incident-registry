import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const writeArray = (path, items) => fs.writeFileSync(path, `[\n  ${items.map((item) => JSON.stringify(item)).join(',\n  ')}\n]\n`);
const writeObject = (path, value) => fs.writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

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
for (const id of ['bir_src_000300', 'bir_src_000301', 'bir_src_000302', 'bir_src_000303']) {
  assert(!evidence.some((r) => r.id === id), `${id} already exists`);
}
assert(!chains.cardano, 'cardano chain reference already exists');
assert(!assets.night, 'NIGHT asset reference already exists');

chains.cardano = { display_name: 'Cardano', aliases: ['Cardano mainnet', 'ADA network'] };
assets.night = { display_name: 'NIGHT', aliases: ['Midnight NIGHT', 'NIGHT token'] };

bridges.push({
  id: 'bir_bridge_000037',
  slug: 'wanbridge',
  previous_slugs: [],
  redirect_from: ['wanchain-bridge'],
  canonical_name: 'WanBridge',
  type: 'asset_bridge',
  status: 'active',
  summary: "WanBridge is Wanchain's decentralized non-custodial cross-chain value-transfer bridge. A Cardano–BNB Chain route carrying NIGHT suffered a major July 2026 incident in which roughly 515 million NIGHT were reported drained from the Cardano side. The broader WanBridge product remains documented and publicly available, but that does not establish that the affected NIGHT route itself reopened.",
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
  brand_history_notes: 'Wanchain documentation brands the direct value-transfer product as WanBridge, while incident reporting refers to Wanchain Bridge. BIR treats those names as one bridge entity unless later first-party material establishes a separate route-specific product identity.',
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: 'Entity status reflects the broader WanBridge service, not proof that the affected Cardano–BNB NIGHT route reopened. Route-specific restart remains unresolved in the incident record.'
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
  summary: 'Approximately 515 million NIGHT were reported drained from the Cardano side of the third-party Wanchain Cardano–BNB Chain bridge on July 20, 2026. Midnight Foundation confirmed that the incident was isolated to Wanchain bridge infrastructure rather than the Midnight network or NIGHT supply. Independent security tracking classifies the bridge incident as a smart-contract vulnerability and records a bridge suspension; detailed reporting describes a signed-message verification design failure. Recovery, reimbursement, and a dated restart of the affected route remain unresolved.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  source_count: 3,
  last_reviewed_at: '2026-08-18',
  last_verified_at: '2026-08-18',
  is_major_incident: true,
  reported_loss_usd_display: null,
  reported_loss_usd: null,
  reported_loss_usd_min: null,
  reported_loss_usd_max: null,
  reported_loss_text: 'Independent security and technical reporting records approximately 515 million NIGHT drained from the Cardano side of the bridge.',
  reported_loss_assets: ['night'],
  usd_valuation_date: null,
  loss_amount_basis: 'independent security database and technical incident reporting',
  amount_confidence: 'medium',
  amount_note: 'BIR retains the token-denominated amount and does not canonicalize a USD conversion because contemporaneous dollar estimates vary materially by valuation point.',
  amount_claims: [{
    amount_text: 'approximately 515 million NIGHT drained',
    amount_usd_text: null,
    source_id: 'bir_src_000301',
    basis: 'independent security incident database',
    usd_valuation_date: null,
    notes: 'SlowMist reports the approximate token quantity; no USD amount is promoted into the canonical loss field.'
  }],
  recovery_status: 'unknown',
  reimbursement_status: 'unknown',
  restart_status: 'paused',
  current_outcome: 'unknown',
  is_unresolved: true,
  unresolved_reason: [
    'Midnight Foundation described an ongoing coordinated investigation and exchange restrictions but did not establish a completed recovery amount.',
    'The admitted evidence package does not establish reimbursement or liability treatment for affected bridged NIGHT.',
    'Independent security tracking records a bridge suspension, but a dated restart or redeployment of the affected Cardano–BNB NIGHT route is not established.'
  ],
  affected_chains: ['cardano', 'bnb-chain'],
  affected_assets: ['night'],
  attack_vector_category: 'smart_contract_bug',
  postmortem_available: 'full',
  known_unknowns: [
    'The exact amount, if any, ultimately recovered or frozen after exchange coordination is not established in the admitted evidence package.',
    'A dated restart or redeployment of the affected Cardano–BNB NIGHT route is not established by the admitted evidence package.',
    'A canonical USD loss value is intentionally omitted because contemporaneous valuations vary.',
    'Wanchain published a first-party technical postmortem, but its Medium URL had zero reproducible Wayback captures in the bounded 2026-08-18 archive review. The postmortem remains review authority in Issue #304 but is not admitted as canonical evidence until it satisfies the existing preservation gate.'
  ],
  conflicting_claims: [],
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
});

events.push({
  id: 'bir_ev_000191',
  bridge_id: 'bir_bridge_000037',
  incident_id: 'bir_inc_000039',
  event_type: 'exploit_occurred',
  event_date: '2026-07-20',
  event_date_precision: 'day',
  title: 'WanBridge Cardano–BNB NIGHT route exploited',
  description: 'Technical reporting places the drain on July 20, 2026 and records roughly 515 million NIGHT leaving the Cardano side of the Wanchain bridge. Midnight Foundation confirmed that the incident was isolated to Wanchain bridge infrastructure, while independent security tracking classifies the incident as a smart-contract vulnerability and records a bridge suspension.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  impact_level: 'major',
  status_effect: 'affected bridge route suspended',
  source_count: 3,
  sort_order: 10,
  amount_text: 'approximately 515 million NIGHT drained',
  recovered_amount_text: null,
  reimbursement_status: 'unknown',
  restart_status: 'paused',
  affected_chains: ['cardano', 'bnb-chain'],
  affected_assets: ['night'],
  notes: 'The broader WanBridge service being reachable is not treated as proof that the affected Cardano–BNB NIGHT route reopened.',
  duplicate_of: null,
  merged_into: null
});

evidence.push(
  {
    id: 'bir_src_000300',
    bridge_id: 'bir_bridge_000037',
    incident_id: 'bir_inc_000039',
    event_id: 'bir_ev_000191',
    source_type: 'official_blog',
    title: 'Update on the Wanchain Cardano–BNB Bridge Incident',
    url: 'https://midnight.foundation/news/update-on-the-wanchain-cardano-bnb-bridge-incident',
    publisher: 'Midnight Foundation',
    published_at: '2026-07-21',
    published_at_precision: 'day',
    reliability: 'high',
    source_tier: 'tier_1',
    url_status: 'live',
    archived_url: null,
    accessed_at: '2026-08-18',
    claim_scope: 'incident_case',
    notes: 'First-party affected-ecosystem statement confirming that NIGHT was stolen through Wanchain third-party bridge infrastructure, the incident was isolated to the Wanchain bridge rather than Midnight protocol/network/supply, and multiple exchanges restricted or froze incident-linked assets while investigation continued.',
    language: 'en',
    author: 'Midnight Foundation',
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false
  },
  {
    id: 'bir_src_000301',
    bridge_id: 'bir_bridge_000037',
    incident_id: 'bir_inc_000039',
    event_id: 'bir_ev_000191',
    source_type: 'security_analysis',
    title: 'Wanchain Cardano-BNB Chain Bridge',
    url: 'https://hacked.slowmist.io/?c=Bridge&page=1',
    publisher: 'SlowMist',
    published_at: '2026-07-21',
    published_at_precision: 'day',
    reliability: 'high',
    source_tier: 'tier_2',
    url_status: 'live',
    archived_url: null,
    accessed_at: '2026-08-18',
    claim_scope: 'incident_case',
    notes: 'Independent security-incident database entry supporting the approximately 515 million NIGHT drain, Cardano-side bridge scope, bridge suspension, and smart-contract-vulnerability classification. Its USD valuation is not promoted because contemporaneous valuations vary.',
    language: 'en',
    author: 'SlowMist',
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
  },
  {
    id: 'bir_src_000302',
    bridge_id: 'bir_bridge_000037',
    incident_id: 'bir_inc_000039',
    event_id: 'bir_ev_000191',
    source_type: 'news_article',
    title: 'Weekly Brief #16 — the thing that broke was a bridge',
    url: 'https://sipo.tokyo/language/en/weekly-brief-16-en/',
    publisher: 'SIPO',
    published_at: '2026-07-25',
    published_at_precision: 'day',
    reliability: 'medium',
    source_tier: 'tier_2',
    url_status: 'live',
    archived_url: null,
    accessed_at: '2026-08-18',
    claim_scope: 'incident_case',
    notes: 'Dated technical incident account supporting the July 20 transaction boundary, approximately 515 million NIGHT drain, Cardano-to-BNB route scope, signature-verification design failure, and bridge-offline state. It explicitly distinguishes July 20 on-chain activity from July 21 publication dates used by some reports.',
    language: 'en',
    author: 'SIPO',
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
  },
  {
    id: 'bir_src_000303',
    bridge_id: 'bir_bridge_000037',
    incident_id: null,
    event_id: null,
    source_type: 'official_documentation',
    title: 'WanBridge',
    url: 'https://docs.wanchain.org/products/wanbridge',
    publisher: 'Wanchain',
    published_at: '2026-08-18',
    published_at_precision: 'approximate',
    reliability: 'high',
    source_tier: 'tier_1',
    url_status: 'live',
    archived_url: null,
    accessed_at: '2026-08-18',
    claim_scope: 'entity_architecture',
    notes: 'Current first-party product documentation supporting the WanBridge product identity and decentralized non-custodial cross-chain value-transfer architecture. It is not incident-aftermath evidence and does not prove that the affected Cardano–BNB NIGHT route reopened.',
    language: 'en',
    author: 'Wanchain',
    quote_excerpt: null,
    is_primary: true,
    is_paywalled: false,
    is_official_domain: true,
    supports_amount: false,
    supports_recovery: false,
    supports_reimbursement: false,
    supports_reopen: false,
    supports_shutdown: false,
    supports_migration: false
  }
);

writeArray(bridgesPath, bridges);
writeArray(incidentsPath, incidents);
writeArray(eventsPath, events);
writeArray(evidencePath, evidence);
writeObject(chainsPath, chains);
writeObject(assetsPath, assets);

console.log('Applied bounded Wanchain 2026 canonical draft.');
console.log(`Counts: ${bridges.length} bridges / ${incidents.length} incidents / ${events.length} events / ${evidence.length} evidence`);
