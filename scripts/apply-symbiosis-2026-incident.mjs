import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const write = (path, value) => fs.writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const bridgeId = 'bir_bridge_000084';
const incidentId = 'bir_inc_000065';
const eventId = 'bir_ev_000274';
const sourceIds = ['bir_src_000443', 'bir_src_000444', 'bir_src_000445'];

if (bridges.some((x) => x.id === bridgeId || /symbiosis/i.test(`${x.canonical_name || ''} ${x.slug || ''} ${(x.aliases || []).join(' ')}`))) {
  throw new Error('Symbiosis bridge already present or bridge ID collision');
}
if (incidents.some((x) => x.id === incidentId || /symbiosis.*2026/i.test(`${x.slug || ''} ${x.title || ''}`))) {
  throw new Error('Symbiosis incident already present or incident ID collision');
}
if (events.some((x) => x.id === eventId)) throw new Error('event ID collision');
if (evidence.some((x) => sourceIds.includes(x.id))) throw new Error('evidence ID collision');

bridges.push({
  id: bridgeId,
  slug: 'symbiosis-finance',
  previous_slugs: [],
  redirect_from: [],
  canonical_name: 'Symbiosis Finance',
  type: 'cross_chain_router',
  status: 'active',
  summary: 'Symbiosis Finance is cross-chain routing and bridge infrastructure supporting native Bitcoin and EVM routes through an internal syBTC settlement layer. On September 11, 2026, security-monitoring reports identified anomalous BridgeV2-signed syBTC activity on BNB Smart Chain followed by WBTC cash-out on Ethereum. The incident remains under investigation and BIR does not infer a root cause from the protocol architecture alone.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  last_reviewed_at: '2026-09-11',
  last_verified_at: '2026-09-11',
  aliases: ['Symbiosis', 'Symbiosis Protocol', 'Symbiosis Bitcoin Bridge'],
  launch_date: null,
  launch_date_precision: 'unknown',
  end_date: null,
  end_date_precision: 'unknown',
  terminal_reason: null,
  official_url: 'https://symbiosis.finance/bridge-btc',
  official_domain: 'symbiosis.finance',
  official_url_status: 'live_verified',
  archived_url: null,
  primary_chains: ['bitcoin', 'bnb-chain', 'ethereum'],
  primary_assets: ['btc', 'wbtc', 'unknown'],
  operator_name: 'Symbiosis Finance',
  operator_type: 'protocol_team',
  ecosystem_name: 'Symbiosis',
  related_protocols: ['Symbiosis Bitcoin Bridge', 'BridgeV2', 'syBTC'],
  brand_history_notes: null,
  major_incident_count: 0,
  has_unresolved_incident: true,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: 'syBTC has no dedicated BIR asset-reference key, so it is preserved in prose and represented as unknown in keyed asset arrays. The current public evidence establishes the incident and realized WBTC cash-out but does not establish the underlying compromise mechanism, total final loss, recovery outcome, or a canonical service-pause/reopen boundary.'
});

incidents.push({
  id: incidentId,
  bridge_id: bridgeId,
  slug: 'symbiosis-2026-bsc-bridgev2-sybtc-incident',
  previous_slugs: [],
  redirect_from: [],
  title: 'Symbiosis 2026 BSC BridgeV2 syBTC incident',
  incident_date: '2026-09-11',
  incident_date_precision: 'day',
  incident_type: 'exploit',
  summary: 'On September 11, 2026, Blockaid-derived reporting identified anomalous Symbiosis BridgeV2-signed activity on BNB Smart Chain that transferred an extremely large raw syBTC amount to a newly created externally owned account. The same beneficiary later sold approximately 4.39 WBTC on Ethereum through Uniswap V4, with contemporaneous reports placing realized cash-out at about $336,000. The full loss, root cause, recovery state, and final operational impact were not yet established by the reviewed public evidence.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  source_count: 3,
  last_reviewed_at: '2026-09-11',
  last_verified_at: '2026-09-11',
  is_major_incident: false,
  reported_loss_usd_display: 'At least about $336,000 realized; total loss unresolved',
  reported_loss_usd: null,
  reported_loss_usd_min: 336000,
  reported_loss_usd_max: null,
  reported_loss_text: 'Two contemporaneous reports citing Blockaid monitoring state that the beneficiary sold approximately 4.39 WBTC on Ethereum Uni V4 and had cashed out about $336,000 at the reporting horizon. BIR treats this as a lower-bound realized amount rather than a verified final protocol loss.',
  reported_loss_assets: ['wbtc', 'unknown'],
  usd_valuation_date: '2026-09-11',
  loss_amount_basis: 'reported_by_news',
  amount_confidence: 'medium',
  amount_note: 'The approximately $336,000 figure describes reported realized WBTC cash-out at an early incident horizon. The enormous nominal syBTC quantity is not treated as realized loss, and larger circulating loss estimates are not promoted without stronger corroboration.',
  amount_claims: [
    {
      amount_text: 'approximately 4.39 WBTC sold on Ethereum Uni V4',
      amount_usd_text: 'approximately $336,000 cashed out',
      source_id: 'bir_src_000444',
      basis: 'contemporaneous reporting citing Blockaid monitoring',
      usd_valuation_date: '2026-09-11',
      notes: 'Used as a lower-bound realized amount, not a verified final protocol loss.'
    }
  ],
  recovery_status: 'unknown',
  reimbursement_status: 'unknown',
  restart_status: 'unknown',
  current_outcome: 'unknown',
  is_unresolved: true,
  unresolved_reason: [
    'The underlying compromise mechanism and whether signing authority itself was compromised are not established by the admitted evidence.',
    'The final direct protocol loss is not established; only an early realized WBTC cash-out amount is corroborated.',
    'Recovery, reimbursement, and attacker-fund disposition are not established by the admitted evidence.',
    'A first-party incident statement establishing any service pause, restart, or final operational scope has not yet been admitted.'
  ],
  affected_chains: ['bnb-chain', 'ethereum'],
  affected_assets: ['wbtc', 'unknown'],
  attack_vector_category: 'unknown',
  postmortem_available: 'not_found',
  known_unknowns: [
    'Exact root cause and initial access path.',
    'Final realized and unrecovered loss.',
    'Whether the affected path was formally paused and, if so, the restart boundary.',
    'Final recovery or reimbursement outcome.'
  ],
  conflicting_claims: [],
  notes: 'The incident is scoped to the reported BridgeV2/syBTC path. BIR does not treat Symbiosis MPC/TSS architecture as evidence that MPC keys or validators were compromised.',
  duplicate_of: null,
  merged_into: null,
  split_from: null,
  split_reason: null
});

events.push({
  id: eventId,
  bridge_id: bridgeId,
  incident_id: incidentId,
  event_type: 'exploit_occurred',
  event_date: '2026-09-11',
  event_date_precision: 'day',
  title: 'BridgeV2-signed syBTC anomaly followed by WBTC cash-out',
  description: 'Security-monitoring reports described a BridgeV2-signed transaction on BNB Smart Chain transferring an anomalously large raw syBTC amount to a newly created EOA. The same beneficiary later sold approximately 4.39 WBTC on Ethereum Uni V4. The underlying exploit path and total final loss remained unresolved at the reviewed evidence horizon.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  impact_level: 'high',
  status_effect: 'Anomalous syBTC issuance/transfer and WBTC cash-out reported; full service impact remains under investigation',
  source_count: 3,
  sort_order: 10,
  amount_text: 'approximately 4.39 WBTC sold; about $336,000 realized at the early reporting horizon',
  recovered_amount_text: null,
  reimbursement_status: 'unknown',
  restart_status: 'unknown',
  affected_chains: ['bnb-chain', 'ethereum'],
  affected_assets: ['wbtc', 'unknown'],
  notes: 'The nominal raw syBTC amount is not converted into canonical loss. No signing-key or MPC compromise is inferred.',
  duplicate_of: null,
  merged_into: null
});

const baseEvidence = {
  bridge_id: bridgeId,
  incident_id: incidentId,
  event_id: eventId,
  archived_url: null,
  accessed_at: '2026-09-11',
  language: 'en',
  author: null,
  quote_excerpt: null,
  is_paywalled: false,
  supports_recovery: false,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: false,
  supports_migration: false
};

evidence.push(
  {
    ...baseEvidence,
    id: 'bir_src_000443',
    source_type: 'official_blog',
    title: 'Bitcoin bridge: bridge native BTC to DeFi & Ethereum',
    url: 'https://symbiosis.finance/blog/symbiosis-goes-full-bitcoin-btc-bridge-is-here',
    publisher: 'Symbiosis Finance',
    published_at: '2024-09-23',
    published_at_precision: 'day',
    reliability: 'high',
    source_tier: 'tier_1',
    url_status: 'live',
    claim_scope: 'bridge_entity',
    is_primary: true,
    is_official_domain: true,
    supports_amount: false,
    notes: 'First-party architecture and scope authority for the Symbiosis native Bitcoin bridge, syBTC settlement role, BNB/EVM support, relayer network and MPC-threshold-signature context. It is linked to the incident package only as architecture/context evidence and does not prove the September 2026 exploit or its root cause.'
  },
  {
    ...baseEvidence,
    id: 'bir_src_000444',
    source_type: 'news_article',
    title: 'Symbiosis Cross-Chain Protocol Attacked on BSC; 33.6K USD WBTC Stolen',
    url: 'https://www.kucoin.com/news/flash/symbiosis-cross-chain-protocol-attacked-on-bsc-33-6k-usd-wbtc-stolen',
    publisher: 'KuCoin News',
    published_at: '2026-09-11',
    published_at_precision: 'day',
    reliability: 'medium',
    source_tier: 'tier_2',
    url_status: 'live',
    claim_scope: 'incident_case',
    is_primary: false,
    is_official_domain: false,
    supports_amount: true,
    notes: 'Contemporaneous aggregation citing Blockaid/MetaEra/Foresight reporting. The body states approximately 4.39 WBTC was sold on Ethereum Uni V4 and about $336,000 was cashed out. The headline says 33.6K, so BIR follows the repeated body figure only as a lower-bound reported realization, not a verified final loss.'
  },
  {
    ...baseEvidence,
    id: 'bir_src_000445',
    source_type: 'news_article',
    title: '461億美元syBTC疑遭違規鑄造 Symbiosis Finance在BSC遇駭',
    url: 'https://tw.tokenpost.com/news/blockchain/43596',
    publisher: 'TokenPost',
    published_at: '2026-09-11',
    published_at_precision: 'day',
    reliability: 'medium',
    source_tier: 'tier_2',
    url_status: 'live',
    claim_scope: 'incident_case',
    is_primary: false,
    is_official_domain: false,
    supports_amount: true,
    notes: 'Independent contemporaneous report citing Blockaid monitoring and corroborating the anomalous syBTC activity and approximately $336,000 realized cash-out. It explicitly states that the attack path, later loss scale and Symbiosis response were not yet confirmed.'
  }
);

write('data/bridges.json', bridges);
write('data/incidents.json', incidents);
write('data/events.json', events);
write('data/evidence.json', evidence);

console.log({
  bridges: bridges.length,
  incidents: incidents.length,
  events: events.length,
  evidence: evidence.length,
  added: { bridgeId, incidentId, eventId, sourceIds }
});
