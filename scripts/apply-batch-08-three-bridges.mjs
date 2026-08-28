import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');
const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const expected = { bridges: 59, incidents: 51, events: 233, evidence: 384 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
for (const key of Object.keys(expected)) {
  if (actual[key] !== expected[key]) throw new Error(`baseline mismatch ${key}: ${actual[key]} != ${expected[key]}`);
}

const candidates = [
  { id: 'bir_bridge_000060', slug: 'skale-ima-bridge', names: ['skale ima bridge','ima bridge'], domain: 'skale.space' },
  { id: 'bir_bridge_000061', slug: 'cronos-bridge', names: ['cronos bridge'], domain: 'cronos.org' },
  { id: 'bir_bridge_000062', slug: 'findora-rialto-bridge', names: ['findora rialto bridge','rialto bridge'], domain: 'docs.findora.org' },
];
for (const c of candidates) {
  const dup = bridges.find((b) => b.id === c.id || b.slug === c.slug || c.names.includes((b.canonical_name ?? '').toLowerCase()) || b.official_domain === c.domain || (b.aliases ?? []).some((a) => c.names.includes(a.toLowerCase())));
  if (dup) throw new Error(`duplicate candidate ${c.slug}: ${dup.id} ${dup.slug}`);
}
for (const id of ['bir_ev_000234','bir_ev_000235','bir_ev_000236']) if (events.some((e) => e.id === id)) throw new Error(`event id exists ${id}`);
for (const id of ['bir_src_000386','bir_src_000387','bir_src_000388']) if (evidence.some((e) => e.id === id)) throw new Error(`evidence id exists ${id}`);

bridges.push(
  {
    id: 'bir_bridge_000060', slug: 'skale-ima-bridge', previous_slugs: [], redirect_from: [], canonical_name: 'SKALE IMA Bridge', type: 'interoperability_protocol', status: 'active',
    summary: 'SKALE IMA Bridge is the Interchain Messaging Agent bridge used for token and message transfer between Ethereum and SKALE chains. SKALE introduced the bridge on July 20, 2021, and current SKALE Portal/documentation continues the bridge lineage.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', last_reviewed_at: '2026-08-29', last_verified_at: '2026-08-29', end_date: null, end_date_precision: 'unknown', terminal_reason: null, archived_url: null,
    major_incident_count: 0, has_unresolved_incident: false, has_reimbursement_history: false, successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    aliases: ['IMA Bridge','SKALE Bridge','Interchain Messaging Agent'], launch_date: '2021-07-20', launch_date_precision: 'day', official_url: 'https://portal.skale.space/', official_domain: 'skale.space', official_url_status: 'live_verified',
    primary_chains: ['ethereum','unknown'], primary_assets: ['eth','unknown'], operator_name: 'SKALE Network', operator_type: 'protocol_team', ecosystem_name: 'SKALE', related_protocols: ['SKALE IMA','SKALE Portal'],
    brand_history_notes: 'BIR preserves IMA Bridge, SKALE Bridge, and the later Portal bridge experience as one bridge lineage unless future first-party evidence establishes a separate canonical product.',
    notes: 'Launch day is directly supported by SKALE first-party material. No incident or safety conclusion is inferred.'
  },
  {
    id: 'bir_bridge_000061', slug: 'cronos-bridge', previous_slugs: [], redirect_from: [], canonical_name: 'Cronos Bridge', type: 'canonical_bridge', status: 'active',
    summary: 'Cronos Bridge is the first-party bridge for transfers involving Cronos and its connected ecosystem. Cronos mainnet launch material states that the bridge was available from day one on November 8, 2021, and the current official bridge interface remains available.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', last_reviewed_at: '2026-08-29', last_verified_at: '2026-08-29', end_date: null, end_date_precision: 'unknown', terminal_reason: null, archived_url: null,
    major_incident_count: 0, has_unresolved_incident: false, has_reimbursement_history: false, successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    aliases: ['Cronos EVM Bridge'], launch_date: '2021-11-08', launch_date_precision: 'day', official_url: 'https://cronos.org/bridge/', official_domain: 'cronos.org', official_url_status: 'live_verified',
    primary_chains: ['unknown'], primary_assets: ['unknown'], operator_name: 'Cronos Labs', operator_type: 'company', ecosystem_name: 'Cronos', related_protocols: ['Cronos EVM','Cronos POS','IBC'],
    brand_history_notes: 'The first-party Cronos Bridge lineage is kept distinct from third-party bridge integrations and from individual later IBC channel additions.',
    notes: 'Launch day is directly supported by Cronos first-party mainnet material. No incident is inferred.'
  },
  {
    id: 'bir_bridge_000062', slug: 'findora-rialto-bridge', previous_slugs: [], redirect_from: [], canonical_name: 'Findora Rialto Bridge', type: 'asset_bridge', status: 'active',
    summary: 'Rialto Bridge is Findora cross-chain bridge infrastructure derived from ChainBridge. A Findora-issued release states that Rialto launched on Findora mainnet on March 22, 2022, connecting Findora with BNB Chain, while current Findora documentation continues to identify Rialto as a bridge.',
    confidence: 'high', record_maturity: 'reviewed', update_status: 'current', last_reviewed_at: '2026-08-29', last_verified_at: '2026-08-29', end_date: null, end_date_precision: 'unknown', terminal_reason: null, archived_url: null,
    major_incident_count: 0, has_unresolved_incident: false, has_reimbursement_history: false, successor_id: null, predecessor_id: null, replacement_bridge_id: null, duplicate_of: null, merged_into: null,
    aliases: ['Rialto Bridge','Rialto'], launch_date: '2022-03-22', launch_date_precision: 'day', official_url: 'https://docs.findora.org/general-user-materials/bridge-tokens-to-findora', official_domain: 'docs.findora.org', official_url_status: 'live_verified',
    primary_chains: ['bnb-chain','unknown'], primary_assets: ['unknown'], operator_name: 'Findora', operator_type: 'protocol_team', ecosystem_name: 'Findora', related_protocols: ['ChainBridge'],
    brand_history_notes: 'Rialto is retained as one Findora bridge lineage; its ChainBridge-derived architecture does not create a separate canonical entity.',
    notes: 'The March 22, 2022 mainnet launch boundary is supported by a company-issued Findora release. No incident is inferred.'
  }
);

events.push(
  { id:'bir_ev_000234', bridge_id:'bir_bridge_000060', incident_id:null, confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'lifecycle', status_effect:'active', sort_order:10, amount_text:null, recovered_amount_text:null, reimbursement_status:'not_applicable', restart_status:'not_applicable', affected_assets:['eth','unknown'], notes:null, duplicate_of:null, merged_into:null, event_type:'launched', event_date:'2021-07-20', event_date_precision:'day', title:'SKALE introduces IMA Bridge', description:'SKALE introduced the IMA Bridge for token and arbitrary-message transfer between Ethereum and SKALE chains.', source_count:1, affected_chains:['ethereum','unknown'] },
  { id:'bir_ev_000235', bridge_id:'bir_bridge_000061', incident_id:null, confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'lifecycle', status_effect:'active', sort_order:10, amount_text:null, recovered_amount_text:null, reimbursement_status:'not_applicable', restart_status:'not_applicable', affected_assets:['unknown'], notes:null, duplicate_of:null, merged_into:null, event_type:'launched', event_date:'2021-11-08', event_date_precision:'day', title:'Cronos Bridge goes live with Cronos mainnet', description:'Cronos first-party mainnet launch material states the Cronos Bridge was available from day one for Crypto.org Chain to Cronos transfers.', source_count:1, affected_chains:['unknown'] },
  { id:'bir_ev_000236', bridge_id:'bir_bridge_000062', incident_id:null, confidence:'high', record_maturity:'reviewed', update_status:'current', impact_level:'lifecycle', status_effect:'active', sort_order:10, amount_text:null, recovered_amount_text:null, reimbursement_status:'not_applicable', restart_status:'not_applicable', affected_assets:['unknown'], notes:null, duplicate_of:null, merged_into:null, event_type:'launched', event_date:'2022-03-22', event_date_precision:'day', title:'Rialto Bridge launches on Findora mainnet', description:'A Findora-issued launch release states that Rialto launched on Findora mainnet and connected Findora with BNB Chain.', source_count:1, affected_chains:['bnb-chain','unknown'] }
);

evidence.push(
  { id:'bir_src_000386', bridge_id:'bir_bridge_000060', event_id:'bir_ev_000234', incident_id:null, reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:'2026-08-29', claim_scope:'event', language:'en', author:null, quote_excerpt:null, is_primary:true, is_paywalled:false, is_official_domain:true, supports_amount:false, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false, source_type:'official_blog', title:'Introduction of the SKALE IMA Bridge', url:'https://www.skale.space/blog/introduction-of-the-skale-ima-bridge', publisher:'SKALE Network', published_at:'2021-07-20', published_at_precision:'day', archived_url:null, notes:'First-party launch article introduces the IMA Bridge and its token/message transfer role between Ethereum and SKALE.' },
  { id:'bir_src_000387', bridge_id:'bir_bridge_000061', event_id:'bir_ev_000235', incident_id:null, reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:'2026-08-29', claim_scope:'event', language:'en', author:null, quote_excerpt:null, is_primary:true, is_paywalled:false, is_official_domain:true, supports_amount:false, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false, source_type:'official_blog', title:'Cronos Mainnet Beta is now live', url:'https://blog.cronos.org/p/cronos-mainnet-beta-is-now-live-def60afb5148', publisher:'Cronos Labs', published_at:'2021-11-08', published_at_precision:'day', archived_url:null, notes:'First-party launch article states Cronos Bridge was available from mainnet day one on November 8, 2021.' },
  { id:'bir_src_000388', bridge_id:'bir_bridge_000062', event_id:'bir_ev_000236', incident_id:null, reliability:'high', source_tier:'tier_1', url_status:'live', accessed_at:'2026-08-29', claim_scope:'event', language:'en', author:null, quote_excerpt:null, is_primary:true, is_paywalled:false, is_official_domain:false, supports_amount:false, supports_recovery:false, supports_reimbursement:false, supports_reopen:false, supports_shutdown:false, supports_migration:false, source_type:'official_statement', title:"Findora Celebrates Launch of Rialto Bridge With $10M Campaign to Pay User's Gas Fees and Reward Bug Hunters", url:'https://www.prweb.com/releases/findora-celebrates-launch-of-rialto-bridge-with-10m-campaign-to-pay-user-s-gas-fees-and-reward-bug-hunters-844795912.html', publisher:'Findora', published_at:'2022-03-22', published_at_precision:'day', archived_url:null, notes:'Company-issued Findora release states Rialto launched on Findora mainnet and connected Findora with BNB Chain.' }
);

write('data/bridges.json', bridges);
write('data/events.json', events);
write('data/evidence.json', evidence);

for (const cmd of ['validate:data','validate:enums','audit:full-corpus','audit:source-count','audit:source-quality']) execFileSync('npm', ['run', cmd], { stdio: 'inherit' });

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', 'data/bridges.json', 'data/events.json', 'data/evidence.json']);
execFileSync('git', ['rm', '-f', 'scripts/apply-batch-08-three-bridges.mjs', '.github/workflows/temp-batch-08-three-bridges.yml']);
execFileSync('git', ['commit', '-m', 'data: add Batch 08 bridge lifecycle records']);
execFileSync('git', ['push', 'origin', 'HEAD:canonical/growth-batch-08-three-bridges']);
