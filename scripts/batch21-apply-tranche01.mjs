import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, `${JSON.stringify(v, null, 2)}\n`);

const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const mustNotExist = [
  ['bridge', bridges, 'bir_bridge_000076'], ['bridge', bridges, 'bir_bridge_000077'],
  ['incident', incidents, 'bir_inc_000055'], ['incident', incidents, 'bir_inc_000056'],
  ['event', events, 'bir_ev_000253'], ['event', events, 'bir_ev_000254'], ['event', events, 'bir_ev_000255'], ['event', events, 'bir_ev_000256'], ['event', events, 'bir_ev_000257'],
  ['evidence', evidence, 'bir_src_000412'], ['evidence', evidence, 'bir_src_000413'], ['evidence', evidence, 'bir_src_000414'], ['evidence', evidence, 'bir_src_000415'], ['evidence', evidence, 'bir_src_000416']
];
for (const [kind, list, id] of mustNotExist) if (list.some((x) => x.id === id)) throw new Error(`${kind} ${id} already exists`);

const reviewed = '2026-09-03';

bridges.push(
  {
    id: 'bir_bridge_000076', slug: 'dusk-evm-bridge', previous_slugs: [], redirect_from: [],
    canonical_name: 'Dusk to EVM Bridge', type: 'asset_bridge', status: 'active',
    summary: 'Dusk operated a bridge service for EVM migration events. On January 16, 2026, an attacker gained unauthorized access to the bridge signing wallet, drained DUSK on Dusk, and moved part of the funds through the bridge to BNB Smart Chain. Dusk shut the bridge down and later redesigned the service with stronger isolation and reduced hot-wallet exposure.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', last_reviewed_at: reviewed, last_verified_at: reviewed,
    aliases: ['Dusk Bridge', 'Dusk to EVM bridge service'], launch_date: null, launch_date_precision: 'unknown', end_date: null, end_date_precision: 'unknown', terminal_reason: null,
    official_url: 'https://dusk.network/news/bridge-incident-post-mortem', official_domain: 'dusk.network', official_url_status: 'live_verified', archived_url: null,
    primary_chains: ['unknown', 'bnb-chain'], primary_assets: ['unknown'], operator_name: 'Dusk', operator_type: 'protocol_team', ecosystem_name: 'Dusk', related_protocols: [],
    brand_history_notes: null, major_incident_count: 1, has_unresolved_incident: true, has_reimbursement_history: false,
    successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    notes: 'Dusk says the redesigned bridge has been stable since release, but the reviewed post-mortem does not provide a dated reopening boundary or a quantified final recovery/reimbursement outcome.'
  },
  {
    id: 'bir_bridge_000077', slug: 'hyperbridge-token-gateway', previous_slugs: [], redirect_from: [],
    canonical_name: 'Hyperbridge Token Gateway', type: 'interoperability_protocol', status: 'deprecated',
    summary: 'Hyperbridge Token Gateway was the shared settlement gateway used for cross-chain token transfers. On April 13, 2026, a forged Merkle Mountain Range proof was accepted by the verifier and used to extract funds from the Token Gateway. Hyperbridge paused bridging, patched and audited the stack, then relaunched bridging in June with a redesigned architecture that deprecated the shared Token Gateway in favor of issuer-owned Hyperfungible Token logic.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', last_reviewed_at: reviewed, last_verified_at: reviewed,
    aliases: ['Hyperbridge TokenGateway', 'Token Gateway'], launch_date: null, launch_date_precision: 'unknown', end_date: '2026-06-15', end_date_precision: 'day',
    terminal_reason: 'The shared TokenGateway was deprecated when Hyperbridge relaunched with issuer-owned Hyperfungible Token applications after the April 2026 exploit.',
    official_url: 'https://blog.hyperbridge.network/april-13-post-mortem/', official_domain: 'blog.hyperbridge.network', official_url_status: 'live_verified', archived_url: null,
    primary_chains: ['ethereum', 'base', 'bnb-chain', 'arbitrum', 'unknown'], primary_assets: ['unknown'], operator_name: 'Polytope Labs', operator_type: 'protocol_team', ecosystem_name: 'Hyperbridge', related_protocols: ['ISMP'],
    brand_history_notes: 'The June 2026 relaunch replaced the shared TokenGateway model with issuer-owned Hyperfungible Token logic rather than restoring the same shared gateway design.',
    major_incident_count: 1, has_unresolved_incident: true, has_reimbursement_history: false,
    successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    notes: 'The first-party recovery update reports realized losses above $2 million after revising the initial Ethereum-only estimate. Final recovery remains incomplete in the reviewed material.'
  }
);

incidents.push(
  {
    id: 'bir_inc_000055', bridge_id: 'bir_bridge_000076', slug: 'dusk-evm-bridge-2026-signing-wallet-compromise', previous_slugs: [], redirect_from: [],
    title: 'Dusk to EVM Bridge 2026 signing-wallet compromise', incident_date: '2026-01-16', incident_date_precision: 'day', incident_type: 'exploit',
    summary: 'An unauthorized actor gained access to a Dusk signing wallet used by the bridge, stole DUSK directly on Dusk, and moved part of the stolen amount through the bridge to BNB Smart Chain. Dusk states this was a bridge-wallet compromise, not a Dusk consensus failure or protocol exploit.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', source_count: 2, last_reviewed_at: reviewed, last_verified_at: reviewed,
    is_major_incident: true, reported_loss_usd_display: null, reported_loss_usd: null, reported_loss_usd_min: null, reported_loss_usd_max: null,
    reported_loss_text: 'The reviewed first-party post-mortem enumerates stolen DUSK amounts but does not establish a canonical USD loss total.', reported_loss_assets: ['unknown'], usd_valuation_date: null,
    loss_amount_basis: 'reported_by_project', amount_confidence: 'unknown', amount_note: 'BIR does not invent a USD valuation from the token quantities in the post-mortem.', amount_claims: [],
    recovery_status: 'unknown', reimbursement_status: 'unknown', restart_status: 'unknown', current_outcome: 'active_after_incident', is_unresolved: true,
    unresolved_reason: ['The reviewed post-mortem does not establish a final attacker-fund recovery or reimbursement outcome.', 'The redesigned bridge is described as stable since release, but the post-mortem does not provide a dated reopening boundary.'],
    affected_chains: ['unknown', 'bnb-chain'], affected_assets: ['unknown'], attack_vector_category: 'validator_key_compromise', postmortem_available: 'available',
    known_unknowns: ['Exact mechanism by which the signing wallet credential became accessible was not established in the reviewed post-mortem.', 'Canonical USD loss remains unquantified.'], conflicting_claims: [], duplicate_of: null, merged_into: null, split_from: null, split_reason: null
  },
  {
    id: 'bir_inc_000056', bridge_id: 'bir_bridge_000077', slug: 'hyperbridge-token-gateway-2026-mmr-verifier-exploit', previous_slugs: [], redirect_from: [],
    title: 'Hyperbridge Token Gateway 2026 MMR verifier exploit', incident_date: '2026-04-13', incident_date_precision: 'day', incident_type: 'exploit',
    summary: 'An attacker submitted a forged Merkle Mountain Range proof containing an out-of-bounds leaf index that the verifier accepted. Downstream handlers treated the forged leaf as a valid Hyperbridge message and funds were extracted from Token Gateway. Hyperbridge paused bridging, patched and audited the stack, and later relaunched with a redesigned architecture.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', source_count: 3, last_reviewed_at: reviewed, last_verified_at: reviewed,
    is_major_incident: true, reported_loss_usd_display: 'over $2 million', reported_loss_usd: null, reported_loss_usd_min: 2000000, reported_loss_usd_max: null,
    reported_loss_text: 'Hyperbridge later reported realized loss of over $2 million, concentrated in DeFi Singularity incentive pools across Ethereum, Base, BNB Chain, and Arbitrum.', reported_loss_assets: ['unknown'], usd_valuation_date: '2026-04-13',
    loss_amount_basis: 'reported_by_project', amount_confidence: 'high', amount_note: 'Use the later revised first-party assessment rather than the initial Ethereum-only estimate of roughly $237,000.', amount_claims: [{amount_text: 'realized loss', amount_usd_text: 'over $2 million', source_id: 'bir_src_000414', basis: 'reported_by_project', usd_valuation_date: '2026-04-13', notes: 'Revised first-party scope after tracing across four EVM networks.'}],
    recovery_status: 'partial_recovery', reimbursement_status: 'unknown', restart_status: 'reopened', current_outcome: 'migrated_after_incident', is_unresolved: true,
    unresolved_reason: ['Reviewed first-party updates establish partial voluntary returns but not full recovery.', 'Final reimbursement or loss-allocation completion is not established.'],
    affected_chains: ['ethereum', 'base', 'bnb-chain', 'arbitrum', 'unknown'], affected_assets: ['unknown'], attack_vector_category: 'message_verification_failure', postmortem_available: 'available',
    known_unknowns: ['Final recovered amount and final net unrecovered loss are not established in the reviewed sources.'], conflicting_claims: [], duplicate_of: null, merged_into: null, split_from: null, split_reason: null
  }
);

events.push(
  {id:'bir_ev_000253',bridge_id:'bir_bridge_000076',incident_id:'bir_inc_000055',event_type:'exploit_occurred',event_date:'2026-01-16',event_date_precision:'day',title:'Dusk bridge signing wallet compromised',description:'An unauthorized actor gained access to the Dusk bridge signing wallet and stole DUSK, with part of the stolen amount moved through the bridge to BNB Smart Chain.',confidence:'high',record_maturity:'reviewed',update_status:'current',impact_level:'high',status_effect:'bridge signing path compromised',source_count:1,sort_order:10,amount_text:null,recovered_amount_text:null,reimbursement_status:'unknown',restart_status:'unknown',affected_chains:['unknown','bnb-chain'],affected_assets:['unknown'],notes:'First-party post-mortem explicitly excludes a Dusk consensus failure or protocol exploit.',duplicate_of:null,merged_into:null},
  {id:'bir_ev_000254',bridge_id:'bir_bridge_000076',incident_id:'bir_inc_000055',event_type:'bridge_paused',event_date:'2026-01-16',event_date_precision:'day',title:'Dusk bridge shut down during containment',description:'Dusk shut the bridge down at 23:12 UTC after an internal compromise report, causing a later 8.91 million DUSK bridge attempt to fail.',confidence:'high',record_maturity:'reviewed',update_status:'current',impact_level:'high',status_effect:'bridge paused for incident containment',source_count:1,sort_order:20,amount_text:null,recovered_amount_text:null,reimbursement_status:'unknown',restart_status:'paused',affected_chains:['unknown','bnb-chain'],affected_assets:['unknown'],notes:null,duplicate_of:null,merged_into:null},
  {id:'bir_ev_000255',bridge_id:'bir_bridge_000077',incident_id:'bir_inc_000056',event_type:'exploit_occurred',event_date:'2026-04-13',event_date_precision:'day',title:'Hyperbridge Token Gateway MMR verifier exploited',description:'A forged proof with an out-of-bounds leaf index was accepted by the MMR verifier and downstream handlers treated it as a valid Hyperbridge message, enabling extraction from Token Gateway.',confidence:'high',record_maturity:'reviewed',update_status:'current',impact_level:'critical',status_effect:'Token Gateway settlement layer exploited',source_count:1,sort_order:10,amount_text:'over $2 million realized loss in later revised assessment',recovered_amount_text:null,reimbursement_status:'unknown',restart_status:'unknown',affected_chains:['ethereum','base','bnb-chain','arbitrum','unknown'],affected_assets:['unknown'],notes:'The later post-mortem supersedes the initial Ethereum-only scope.',duplicate_of:null,merged_into:null},
  {id:'bir_ev_000256',bridge_id:'bir_bridge_000077',incident_id:'bir_inc_000056',event_type:'bridge_paused',event_date:'2026-04-13',event_date_precision:'day',title:'Hyperbridge bridging operations paused',description:'Hyperbridge paused its messaging and bridging infrastructure within hours of detecting the Token Gateway exploit.',confidence:'high',record_maturity:'reviewed',update_status:'current',impact_level:'high',status_effect:'all bridging operations paused',source_count:1,sort_order:20,amount_text:null,recovered_amount_text:null,reimbursement_status:'unknown',restart_status:'paused',affected_chains:['ethereum','base','bnb-chain','arbitrum','unknown'],affected_assets:['unknown'],notes:null,duplicate_of:null,merged_into:null},
  {id:'bir_ev_000257',bridge_id:'bir_bridge_000077',incident_id:'bir_inc_000056',event_type:'bridge_reopened',event_date:'2026-06-15',event_date_precision:'day',title:'Hyperbridge bridging relaunched with redesigned architecture',description:'Hyperbridge announced that bridging had resumed after a redesign that replaced centralized proving and deprecated the shared TokenGateway in favor of issuer-owned Hyperfungible Token applications.',confidence:'high',record_maturity:'reviewed',update_status:'current',impact_level:'high',status_effect:'bridging resumed under redesigned architecture',source_count:1,sort_order:30,amount_text:null,recovered_amount_text:null,reimbursement_status:'unknown',restart_status:'reopened',affected_chains:['ethereum','base','bnb-chain','arbitrum','unknown'],affected_assets:['unknown'],notes:'This is a protocol relaunch; the shared TokenGateway itself is recorded as deprecated.',duplicate_of:null,merged_into:null}
);

const common = { reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:reviewed, language:'en', author:null, quote_excerpt:null, is_primary:true, is_paywalled:false, is_official_domain:true, supports_amount:false, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false, archived_url:null };
evidence.push(
  {...common,id:'bir_src_000412',bridge_id:'bir_bridge_000076',incident_id:'bir_inc_000055',event_id:'bir_ev_000253',source_type:'postmortem',title:'Bridge Incident Post-Mortem',url:'https://dusk.network/news/bridge-incident-post-mortem',publisher:'Dusk',published_at:'2026-03-10',published_at_precision:'day',claim_scope:'incident_case',supports_shutdown:true,notes:'First-party root-cause and on-chain sequence for the January 16 signing-wallet compromise.'},
  {...common,id:'bir_src_000413',bridge_id:'bir_bridge_000076',incident_id:'bir_inc_000055',event_id:'bir_ev_000254',source_type:'postmortem',title:'Bridge Incident Post-Mortem',url:'https://dusk.network/news/bridge-incident-post-mortem',publisher:'Dusk',published_at:'2026-03-10',published_at_precision:'day',claim_scope:'shutdown',supports_shutdown:true,notes:'Duplicate event-scoped first-party evidence for the 23:12 UTC bridge shutdown.'},
  {...common,id:'bir_src_000414',bridge_id:'bir_bridge_000077',incident_id:'bir_inc_000056',event_id:'bir_ev_000255',source_type:'postmortem',title:'Post-Mortem: Hyperbridge MMR Verifier Exploit, April 13, 2026',url:'https://blog.hyperbridge.network/april-13-post-mortem/',publisher:'Hyperbridge',published_at:'2026-05-14',published_at_precision:'day',claim_scope:'incident_case',supports_amount:true,notes:'First-party technical post-mortem establishing the forged-proof verifier failure and Token Gateway boundary.'},
  {...common,id:'bir_src_000415',bridge_id:'bir_bridge_000077',incident_id:'bir_inc_000056',event_id:'bir_ev_000256',source_type:'official_statement',title:'Update on Recovery Efforts and Next Steps',url:'https://blog.hyperbridge.network/recovery-and-next-steps/',publisher:'Hyperbridge',published_at:'2026-04-16',published_at_precision:'day',claim_scope:'shutdown',supports_amount:true,supports_recovery:true,supports_shutdown:true,notes:'First-party update confirming the bridging pause and revised multi-chain loss assessment/recovery work.'},
  {...common,id:'bir_src_000416',bridge_id:'bir_bridge_000077',incident_id:'bir_inc_000056',event_id:'bir_ev_000257',source_type:'official_blog',title:'Hyperbridge Relaunches as an Interoperability Hyperstructure',url:'https://blog.hyperbridge.network/hyperbridge-relaunches-as-an-interoperability-hyperstructure/',publisher:'Hyperbridge',published_at:'2026-06-15',published_at_precision:'day',claim_scope:'restart',supports_reopen:true,supports_migration:true,notes:'First-party relaunch notice establishing resumed bridging and deprecation of the shared TokenGateway model.'}
);

write('data/bridges.json', bridges);
write('data/incidents.json', incidents);
write('data/events.json', events);
write('data/evidence.json', evidence);

console.log(`Batch 21 tranche 01 applied: ${bridges.length} bridges / ${incidents.length} incidents / ${events.length} events / ${evidence.length} evidence`);
