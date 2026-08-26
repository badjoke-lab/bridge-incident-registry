import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const byId = (arr, id) => arr.find((x) => x.id === id);
const ensureMissing = (arr, id) => {
  if (byId(arr, id)) throw new Error(`ID already exists: ${id}`);
};

for (const id of ['bir_bridge_000043']) ensureMissing(bridges, id);
for (const id of ['bir_inc_000048','bir_inc_000049']) ensureMissing(incidents, id);
for (const id of ['bir_ev_000215','bir_ev_000216','bir_ev_000217','bir_ev_000218']) ensureMissing(events, id);
for (const id of ['bir_src_000354','bir_src_000355','bir_src_000356','bir_src_000357']) ensureMissing(evidence, id);

const multichain = byId(bridges, 'bir_bridge_000007');
if (!multichain) throw new Error('Multichain bridge missing');
multichain.major_incident_count = 3;
multichain.has_reimbursement_history = true;
multichain.last_reviewed_at = '2026-08-26';
multichain.last_verified_at = '2026-08-26';

const bridgeTemplate = structuredClone(bridges[0]);
const qanBridge = {
  ...bridgeTemplate,
  id: 'bir_bridge_000043',
  slug: 'qanplatform-qanx-bridge',
  previous_slugs: [],
  redirect_from: [],
  canonical_name: 'QANplatform QANX Bridge',
  type: 'asset_bridge',
  status: 'unknown',
  summary: 'QANplatform operated a QANX bridge between Ethereum and BNB Smart Chain. The bridge wallet was hacked on 2022-10-11, after which QANplatform replaced the affected QANX token contract and opened a recovery and compensation process.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  last_reviewed_at: '2026-08-26',
  last_verified_at: '2026-08-26',
  aliases: ['QANX Bridge', 'QANplatform Bridge'],
  launch_date: null,
  launch_date_precision: 'unknown',
  end_date: null,
  end_date_precision: 'unknown',
  terminal_reason: null,
  official_url: 'https://claim.qanplatform.com/',
  official_domain: 'claim.qanplatform.com',
  official_url_status: 'live',
  archived_url: null,
  primary_chains: ['ethereum','bnb-chain'],
  primary_assets: ['unknown'],
  operator_name: 'QANplatform',
  operator_type: 'protocol ecosystem',
  ecosystem_name: 'QANplatform',
  related_protocols: ['QANX'],
  brand_history_notes: null,
  major_incident_count: 1,
  has_unresolved_incident: true,
  has_reimbursement_history: true,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  notes: 'Current bridge operating status is kept unknown; the reviewed sources establish the 2022 bridge-wallet hack and token replacement/compensation process, not a later bridge restart.'
};
bridges.push(qanBridge);

const incidentTemplate = structuredClone(incidents[0]);
const commonIncident = {
  previous_slugs: [], redirect_from: [], confidence: 'high', record_maturity: 'reviewed', update_status: 'current',
  last_reviewed_at: '2026-08-26', last_verified_at: '2026-08-26', is_major_incident: true,
  reported_loss_usd_display: null, reported_loss_usd: null, reported_loss_usd_min: null, reported_loss_usd_max: null,
  usd_valuation_date: null, amount_confidence: 'high', amount_claims: [], conflicting_claims: [], duplicate_of: null, merged_into: null, split_from: null, split_reason: null
};

incidents.push({
  ...incidentTemplate, ...commonIncident,
  id: 'bir_inc_000048', bridge_id: 'bir_bridge_000007', slug: 'anyswap-v3-2021-mpc-key-exploit',
  title: 'Anyswap / Multichain Router V3 2021 MPC key exploit', incident_date: '2021-07-10', incident_date_precision: 'day', incident_type: 'exploit',
  summary: 'Anyswap disclosed exploitation of prototype V3 cross-chain liquidity pools after repeated ECDSA R values exposed an MPC private key. Four malicious transactions across Ethereum, BNB Smart Chain and Fantom stole 2,398,496.02 USDC and 5,509,222.73 MIM. The operator stated that its V1/V2 bridge was not affected.',
  source_count: 2,
  reported_loss_text: '2,398,496.02 USDC and 5,509,222.73 MIM reported stolen; no USD aggregate is asserted here.',
  reported_loss_assets: ['usdc','unknown'],
  loss_amount_basis: 'official incident statement; token amounts preserved without USD conversion',
  amount_note: 'The official statement provides token-denominated amounts. This record intentionally does not manufacture a USD total.',
  amount_claims: [{ amount_text: '2,398,496.02 USDC and 5,509,222.73 MIM', amount_usd_text: null, source_id: 'bir_src_000354', basis: 'official incident statement', usd_valuation_date: null, notes: 'Exact token amounts from the operator statement.' }],
  recovery_status: 'none_confirmed', reimbursement_status: 'announced', restart_status: 'unknown', current_outcome: 'limited_after_incident',
  is_unresolved: true, unresolved_reason: ['The operator committed to compensate user losses, but completion is not established in the reviewed canonical evidence.'],
  affected_chains: ['ethereum','bnb-chain','fantom'], affected_assets: ['usdc','unknown'],
  attack_vector_category: 'private_key_compromise', postmortem_available: 'partial',
  known_unknowns: ['Final compensation completion is not established by the reviewed evidence.', 'A USD conversion of the stolen token amounts is intentionally not asserted.']
});

incidents.push({
  ...incidentTemplate, ...commonIncident,
  id: 'bir_inc_000049', bridge_id: 'bir_bridge_000043', slug: 'qanplatform-qanx-bridge-2022-wallet-hack',
  title: 'QANplatform QANX Bridge 2022 wallet hack', incident_date: '2022-10-11', incident_date_precision: 'day', incident_type: 'exploit',
  summary: 'QANplatform states that its bridge wallet was hacked beginning on BNB Smart Chain at 08:16:39 UTC on 2022-10-11 and immediately afterward on Ethereum. The project replaced the affected QANX token contract and created a recovery and compensation process.',
  source_count: 2,
  reported_loss_text: 'No reviewed canonical source supports one reconciled stolen USD amount.',
  reported_loss_assets: ['unknown'],
  loss_amount_basis: 'first-party recovery material; amount intentionally unresolved',
  amount_note: 'Token replacement and compensation rules are documented, but this record does not infer a stolen USD total.',
  recovery_status: 'none_confirmed', reimbursement_status: 'announced', restart_status: 'token_replacement_planned', current_outcome: 'affected_token_deprecated',
  is_unresolved: true, unresolved_reason: ['The reviewed material establishes replacement and compensation eligibility, not final completion for all affected holders.', 'Current bridge operating status is not established.'],
  affected_chains: ['bnb-chain','ethereum'], affected_assets: ['unknown'],
  attack_vector_category: 'private_key_compromise', postmortem_available: 'partial',
  known_unknowns: ['Exact stolen-value total is not asserted.', 'Current bridge operating status remains unknown.']
});

const eventTemplate = structuredClone(events[0]);
const mkEvent = (o) => ({ ...eventTemplate, confidence: 'high', record_maturity: 'reviewed', update_status: 'current', source_count: 1, recovered_amount_text: null, duplicate_of: null, merged_into: null, ...o });
events.push(mkEvent({ id:'bir_ev_000215', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000048', event_type:'exploit_disclosed', event_date:'2021-07-10', event_date_precision:'day', title:'Anyswap V3 exploit disclosed', description:'Anyswap disclosed exploitation of prototype V3 cross-chain liquidity pools after MPC private-key exposure caused by repeated ECDSA R values.', impact_level:'major', status_effect:'prototype V3 pools exploited', sort_order:10, amount_text:'2,398,496.02 USDC and 5,509,222.73 MIM', reimbursement_status:'unknown', restart_status:'unknown', affected_chains:['ethereum','bnb-chain','fantom'], affected_assets:['usdc','unknown'], notes:'The operator explicitly stated that its V1/V2 bridge was not affected.' }));
events.push(mkEvent({ id:'bir_ev_000216', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000048', event_type:'compensation_commitment', event_date:'2021-07', event_date_precision:'month', title:'Anyswap commits to compensate affected users', description:'The operator committed to compensate user losses connected to the V3 exploit.', impact_level:'high', status_effect:'compensation announced', sort_order:20, amount_text:null, reimbursement_status:'announced', restart_status:'unknown', affected_chains:['ethereum','bnb-chain','fantom'], affected_assets:['usdc','unknown'], notes:'Compensation completion is not asserted.' }));
events.push(mkEvent({ id:'bir_ev_000217', bridge_id:'bir_bridge_000043', incident_id:'bir_inc_000049', event_type:'exploit_disclosed', event_date:'2022-10-11', event_date_precision:'day', title:'QANX bridge wallet hack begins', description:'QANplatform identifies the bridge-wallet hack as beginning on BNB Smart Chain at 08:16:39 UTC and immediately afterward on Ethereum.', impact_level:'major', status_effect:'bridge wallet compromised', sort_order:10, amount_text:null, reimbursement_status:'unknown', restart_status:'unknown', affected_chains:['bnb-chain','ethereum'], affected_assets:['unknown'], notes:null }));
events.push(mkEvent({ id:'bir_ev_000218', bridge_id:'bir_bridge_000043', incident_id:'bir_inc_000049', event_type:'token_replacement_and_compensation', event_date:'2022-10', event_date_precision:'month', title:'QANplatform replaces QANX token and opens compensation process', description:'QANplatform replaced the affected QANX token contract and published replacement and compensation rules, including 100% replacement eligibility for pre-hack holders.', impact_level:'major', status_effect:'affected token replaced; compensation process opened', sort_order:20, amount_text:null, reimbursement_status:'announced', restart_status:'token_replacement_planned', affected_chains:['bnb-chain','ethereum'], affected_assets:['unknown'], notes:'Eligibility and process are documented; final completion for every affected holder is not asserted.' }));

const evidenceTemplate = structuredClone(evidence[0]);
const mkEvidence = (o) => ({ ...evidenceTemplate, reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:'2026-08-26', language:'en', author:null, quote_excerpt:null, is_primary:true, is_paywalled:false, supports_shutdown:false, supports_migration:false, ...o });
const anyswapUrl = 'https://medium.com/multichainorg/anyswap-multichain-router-v3-exploit-statement-6833f1b7e6fb';
const anyswapArchive = 'https://web.archive.org/web/*/' + anyswapUrl;
evidence.push(mkEvidence({ id:'bir_src_000354', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000048', event_id:'bir_ev_000215', source_type:'other', title:'Anyswap Multichain Router V3 Exploit Statement', url:anyswapUrl, publisher:'Multichain / Anyswap', published_at:'2021-07', published_at_precision:'month', claim_scope:'incident_case', is_official_domain:false, supports_amount:true, supports_recovery:false, supports_reimbursement:true, supports_reopen:false, notes:'First-party exploit statement covering affected V3 pools, chains, stolen token amounts, MPC-key root cause and compensation commitment.', archived_url:anyswapArchive }));
evidence.push(mkEvidence({ id:'bir_src_000355', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000048', event_id:'bir_ev_000216', source_type:'other', title:'Anyswap Multichain Router V3 Exploit Statement', url:anyswapUrl, publisher:'Multichain / Anyswap', published_at:'2021-07', published_at_precision:'month', claim_scope:'reimbursement', is_official_domain:false, supports_amount:false, supports_recovery:false, supports_reimbursement:true, supports_reopen:false, notes:'First-party statement used specifically for the compensation commitment; completion is not inferred.', archived_url:anyswapArchive }));
evidence.push(mkEvidence({ id:'bir_src_000356', bridge_id:'bir_bridge_000043', incident_id:'bir_inc_000049', event_id:'bir_ev_000217', source_type:'official_website', title:'QANplatform QANX Recovery Claim', url:'https://claim.qanplatform.com/', publisher:'QANplatform', published_at:null, published_at_precision:'unknown', claim_scope:'incident_case', is_official_domain:true, supports_amount:false, supports_recovery:true, supports_reimbursement:true, supports_reopen:false, notes:'First-party recovery material identifying the bridge-wallet hack timing and affected chains.' }));
evidence.push(mkEvidence({ id:'bir_src_000357', bridge_id:'bir_bridge_000043', incident_id:'bir_inc_000049', event_id:'bir_ev_000218', source_type:'official_repository', title:'QANplatform QANX Bridge repository', url:'https://github.com/QANplatform/qanx-bridge', publisher:'QANplatform', published_at:null, published_at_precision:'unknown', claim_scope:'recovery', is_official_domain:true, supports_amount:false, supports_recovery:true, supports_reimbursement:true, supports_reopen:false, supports_migration:true, notes:'Official incident-specific bridge repository retained as first-party technical/recovery evidence for the QANX bridge.' }));

write('data/bridges.json', bridges);
write('data/incidents.json', incidents);
write('data/events.json', events);
write('data/evidence.json', evidence);

console.log(`Applied Batch 02: ${bridges.length} bridges / ${incidents.length} incidents / ${events.length} events / ${evidence.length} evidence`);
