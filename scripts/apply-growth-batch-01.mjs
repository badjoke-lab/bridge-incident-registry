import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const bridgesPath = 'data/bridges.json';
const incidentsPath = 'data/incidents.json';
const eventsPath = 'data/events.json';
const evidencePath = 'data/evidence.json';

const bridges = read(bridgesPath);
const incidents = read(incidentsPath);
const events = read(eventsPath);
const evidence = read(evidencePath);

if (bridges.length !== 42 || incidents.length !== 45 || events.length !== 210 || evidence.length !== 347) {
  throw new Error(`unexpected baseline ${bridges.length}/${incidents.length}/${events.length}/${evidence.length}`);
}
for (const id of ['bir_inc_000046','bir_inc_000047','bir_ev_000211','bir_ev_000212','bir_ev_000213','bir_ev_000214','bir_src_000348','bir_src_000349','bir_src_000350','bir_src_000351','bir_src_000352']) {
  if ([...incidents, ...events, ...evidence].some((x) => x.id === id)) throw new Error(`ID already exists: ${id}`);
}

const poly = bridges.find((x) => x.id === 'bir_bridge_000005');
const multi = bridges.find((x) => x.id === 'bir_bridge_000007');
if (!poly || !multi) throw new Error('expected Poly Network and Multichain bridge records');
poly.major_incident_count = 2;
poly.has_unresolved_incident = true;
poly.last_reviewed_at = '2026-08-23';
poly.last_verified_at = '2026-08-23';
multi.major_incident_count = 2;
multi.has_unresolved_incident = true;
multi.last_reviewed_at = '2026-08-23';
multi.last_verified_at = '2026-08-23';

incidents.push(
  {
    id: 'bir_inc_000046', bridge_id: 'bir_bridge_000005', slug: 'poly-network-2023-validator-key-exploit', previous_slugs: [], redirect_from: [],
    title: 'Poly Network 2023 validator-key exploit', incident_date: '2023-07-02', incident_date_precision: 'day', incident_type: 'exploit',
    summary: 'In July 2023, Poly Network suffered a second major cross-chain incident in which unauthorized cross-chain messages enabled large notional token minting across multiple chains. Independent technical analysis and affected-ecosystem reporting support a validator-key compromise boundary, while realized economic loss was far below the notional minted value.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', source_count: 3, last_reviewed_at: '2026-08-23', last_verified_at: '2026-08-23', is_major_incident: true,
    reported_loss_usd_display: null, reported_loss_usd: null, reported_loss_usd_min: null, reported_loss_usd_max: null,
    reported_loss_text: 'Notional unauthorized minting was extremely large, but realized loss/profit estimates vary materially by source and liquidity; no single canonical USD loss is asserted.',
    reported_loss_assets: ['unknown'], usd_valuation_date: null, loss_amount_basis: 'notional minting and realized-loss estimates are kept separate', amount_confidence: 'low',
    amount_note: 'Metis documented affected assets in its ecosystem; security analyses describe very large notional issuance but much smaller realized extraction. BIR does not collapse those concepts.', amount_claims: [],
    recovery_status: 'unknown', reimbursement_status: 'unknown', restart_status: 'partially_reopened', current_outcome: 'limited_after_incident', is_unresolved: true,
    unresolved_reason: ['A single realized USD loss figure is not reconciled across affected assets and chains.', 'Final project-by-project recovery and reimbursement outcomes remain incomplete.'],
    affected_chains: ['ethereum','bnb-chain','metis','unknown'], affected_assets: ['unknown'], attack_vector_category: 'validator_key_compromise', postmortem_available: 'full',
    known_unknowns: ['Exact realized loss across all 58 affected assets and 11 blockchains remains unresolved.', 'Recovery and compensation outcomes differ by affected asset ecosystem.'], conflicting_claims: [], duplicate_of: null, merged_into: null, split_from: null, split_reason: null
  },
  {
    id: 'bir_inc_000047', bridge_id: 'bir_bridge_000007', slug: 'multichain-2022-router-approval-vulnerability', previous_slugs: [], redirect_from: [],
    title: 'Multichain 2022 router approval vulnerability', incident_date: '2022-01-18', incident_date_precision: 'day', incident_type: 'exploit',
    summary: 'In January 2022, attackers exploited vulnerable Multichain/Anyswap router approval paths after a critical vulnerability disclosure. Independent technical reports document the flawed permit/underlying-token validation boundary and subsequent whitehat rescue activity.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', source_count: 2, last_reviewed_at: '2026-08-23', last_verified_at: '2026-08-23', is_major_incident: true,
    reported_loss_usd_display: null, reported_loss_usd: null, reported_loss_usd_min: null, reported_loss_usd_max: null,
    reported_loss_text: 'Stolen, rescued, at-risk and later reimbursed amounts are distinct; this bounded record does not collapse them into a single USD loss.',
    reported_loss_assets: ['weth','avax','unknown'], usd_valuation_date: null, loss_amount_basis: 'technical incident reports; conservative amount boundary', amount_confidence: 'low',
    amount_note: 'The review authority preserves separate stolen/rescued/reimbursement figures; canonical amount remains unset until those claims are reconciled against stable preserved sources.', amount_claims: [],
    recovery_status: 'partial_recovery', reimbursement_status: 'announced', restart_status: 'reopened', current_outcome: 'active_after_incident', is_unresolved: true,
    unresolved_reason: ['Final completion of the announced 100% reimbursement program is not established in this bounded package.'],
    affected_chains: ['ethereum','avalanche','unknown'], affected_assets: ['weth','avax','unknown'], attack_vector_category: 'unknown', postmortem_available: 'full',
    known_unknowns: ['Final reimbursed amount and completion date remain outside this bounded evidence package.'], conflicting_claims: [], duplicate_of: null, merged_into: null, split_from: null, split_reason: null
  }
);

events.push(
  { id:'bir_ev_000211', bridge_id:'bir_bridge_000005', incident_id:'bir_inc_000046', event_type:'exploit_disclosed', event_date:'2023-07-02', event_date_precision:'day', title:'Poly Network 2023 exploit disclosed', description:'A second major Poly Network cross-chain exploit affected many assets and chains; analyses distinguish enormous notional token issuance from much smaller realized extraction.', confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'major', status_effect:'bridge incident disclosed', source_count:2, sort_order:10, amount_text:'notional minting and realized loss kept separate', recovered_amount_text:null, reimbursement_status:'unknown', restart_status:'unknown', affected_chains:['ethereum','bnb-chain','metis','unknown'], affected_assets:['unknown'], notes:'No single USD loss is asserted.', duplicate_of:null, merged_into:null },
  { id:'bir_ev_000212', bridge_id:'bir_bridge_000005', incident_id:'bir_inc_000046', event_type:'bridge_paused', event_date:'2023-07-02', event_date_precision:'day', title:'Poly Network cross-chain contracts paused', description:'Poly Network cross-chain activity was halted during containment; independent reconstruction attributes the incident boundary to compromised or misused keeper/validator keys rather than a simple target-chain contract bug.', confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'major', status_effect:'paused', source_count:1, sort_order:20, amount_text:null, recovered_amount_text:null, reimbursement_status:'unknown', restart_status:'not_reopened', affected_chains:['ethereum','bnb-chain','metis','unknown'], affected_assets:['unknown'], notes:null, duplicate_of:null, merged_into:null },
  { id:'bir_ev_000213', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000047', event_type:'exploit_disclosed', event_date:'2022-01-18', event_date_precision:'day', title:'Multichain router vulnerability exploitation begins', description:'Attackers exploited vulnerable Multichain/Anyswap router approval paths after disclosure of critical permit-handling vulnerabilities.', confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'major', status_effect:'bridge incident disclosed', source_count:1, sort_order:10, amount_text:null, recovered_amount_text:null, reimbursement_status:'unknown', restart_status:'unknown', affected_chains:['ethereum','avalanche','unknown'], affected_assets:['weth','avax','unknown'], notes:null, duplicate_of:null, merged_into:null },
  { id:'bir_ev_000214', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000047', event_type:'partial_recovery_reported', event_date:'2022-01', event_date_precision:'month', title:'Whitehat rescue and mitigation reduce Multichain exposure', description:'Security responders carried out whitehat rescue activity while users were urged to revoke vulnerable approvals and affected contracts were migrated or upgraded.', confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'major', status_effect:'partial recovery and mitigation reported', source_count:1, sort_order:20, amount_text:null, recovered_amount_text:'partial whitehat rescue documented', reimbursement_status:'announced', restart_status:'reopened', affected_chains:['ethereum','avalanche','unknown'], affected_assets:['weth','avax','unknown'], notes:'Reimbursement completion is not asserted.', duplicate_of:null, merged_into:null }
);

evidence.push(
  { id:'bir_src_000348', bridge_id:'bir_bridge_000005', incident_id:'bir_inc_000046', event_id:'bir_ev_000211', source_type:'other', title:'Post Mortem — PolyNetwork’s Exploit', url:'https://www.metis.io/blog/post-mortem-polynetworks-exploit', publisher:'Metis', published_at:'2023-07-03', published_at_precision:'day', reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:'2026-08-23', claim_scope:'incident_case', language:'en', author:null, quote_excerpt:null, is_primary:true, is_paywalled:false, is_official_domain:true, supports_amount:false, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:true, supports_migration:false, notes:'First-party affected-ecosystem postmortem establishing the PolyNetwork exploit, affected Metis assets, bridge closure and mitigation context.' },
  { id:'bir_src_000349', bridge_id:'bir_bridge_000005', incident_id:'bir_inc_000046', event_id:'bir_ev_000211', source_type:'security_report', title:'Poly Network Incident Analysis', url:'https://www.certik.com/ko/blog/poly-network-incident-analysis', publisher:'CertiK', published_at:'2023-07-03', published_at_precision:'day', reliability:'high', source_tier:'tier_2', url_status:'live', accessed_at:'2026-08-23', claim_scope:'incident_case', language:'en', author:null, quote_excerpt:null, is_primary:false, is_paywalled:false, is_official_domain:false, supports_amount:true, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false, notes:'Independent security analysis distinguishing notional token issuance from much smaller realized extraction.' },
  { id:'bir_src_000350', bridge_id:'bir_bridge_000005', incident_id:'bir_inc_000046', event_id:'bir_ev_000212', source_type:'security_report', title:'Poly Network Hack Postmortem', url:'https://dedaub.com/blog/poly-network-hack/', publisher:'Dedaub', published_at:'2023-07-07', published_at_precision:'day', reliability:'high', source_tier:'tier_2', url_status:'live', accessed_at:'2026-08-23', claim_scope:'root_cause', language:'en', author:'Neville Grech', quote_excerpt:null, is_primary:false, is_paywalled:false, is_official_domain:false, supports_amount:false, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:true, supports_migration:false, notes:'Independent reconstruction supporting compromised or misused keeper private keys and contract pausing.' },
  { id:'bir_src_000351', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000047', event_id:'bir_ev_000213', source_type:'security_report', title:'Phantom Functions and the Billion-dollar No-op', url:'https://dedaub.com/blog/phantom-functions-and-the-billion-dollar-no-op/', publisher:'Dedaub', published_at:'2022-01-24', published_at_precision:'day', reliability:'high', source_tier:'tier_2', url_status:'live', accessed_at:'2026-08-23', claim_scope:'root_cause', language:'en', author:'Yannis Smaragdakis', quote_excerpt:null, is_primary:false, is_paywalled:false, is_official_domain:false, supports_amount:true, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false, notes:'Technical disclosure establishing the Multichain/AnySwap permit/fallback vulnerability family and scale of exposed approvals.' },
  { id:'bir_src_000352', bridge_id:'bir_bridge_000007', incident_id:'bir_inc_000047', event_id:'bir_ev_000214', source_type:'security_report', title:'The Race Against Time and Strategy: About the AnySwap Rescue and Things We Have Learnt', url:'https://blocksec.com/blog/AnySwap-Rescue-Analysis-Lessons-from-a-DeFi-Security-Triumph', publisher:'BlockSec', published_at:'2022-04-04', published_at_precision:'day', reliability:'high', source_tier:'tier_2', url_status:'live', accessed_at:'2026-08-23', claim_scope:'recovery', language:'en', author:null, quote_excerpt:null, is_primary:false, is_paywalled:false, is_official_domain:false, supports_amount:false, supports_recovery:true, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false, notes:'Independent incident-response account documenting exploitation after Jan 18 and whitehat rescue activity.' }
);

write(bridgesPath, bridges);
write(incidentsPath, incidents);
write(eventsPath, events);
write(evidencePath, evidence);

console.log(`Applied Batch 01: ${bridges.length} bridges / ${incidents.length} incidents / ${events.length} events / ${evidence.length} evidence`);
