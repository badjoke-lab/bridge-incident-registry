import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');
const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const expected = { bridges: 58, incidents: 51, events: 232, evidence: 383 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
for (const key of Object.keys(expected)) {
  if (actual[key] !== expected[key]) throw new Error(`baseline mismatch ${key}: ${actual[key]} != ${expected[key]}`);
}

const duplicate = bridges.find((b) =>
  b.id === 'bir_bridge_000059' ||
  b.slug === 'rango-exchange' ||
  b.canonical_name?.toLowerCase() === 'rango exchange' ||
  b.official_domain === 'rango.exchange' ||
  (b.aliases ?? []).some((a) => /rango/i.test(a))
);
if (duplicate) throw new Error(`Rango duplicate candidate found: ${duplicate.id} ${duplicate.slug}`);
if (events.some((e) => e.id === 'bir_ev_000233')) throw new Error('event id already exists');
if (evidence.some((e) => ['bir_src_000385','bir_src_000386'].includes(e.id))) throw new Error('evidence id already exists');

bridges.push({
  id: 'bir_bridge_000059',
  slug: 'rango-exchange',
  previous_slugs: [],
  redirect_from: [],
  canonical_name: 'Rango Exchange',
  type: 'interoperability_protocol',
  status: 'active',
  summary: 'Rango Exchange is cross-chain DEX and bridge aggregation infrastructure. First-party project material states that Rango launched in August 2021 and its roadmap places the v0.9 origin and bridge integrations in 2021 Q3.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  last_reviewed_at: '2026-08-29',
  last_verified_at: '2026-08-29',
  end_date: null,
  end_date_precision: 'unknown',
  terminal_reason: null,
  archived_url: null,
  major_incident_count: 0,
  has_unresolved_incident: false,
  has_reimbursement_history: false,
  successor_id: null,
  predecessor_id: null,
  replacement_bridge_id: null,
  duplicate_of: null,
  merged_into: null,
  aliases: ['Rango', 'Rango DEX', 'Rango Bridge Aggregator'],
  launch_date: '2021-08',
  launch_date_precision: 'month',
  official_url: 'https://rango.exchange/',
  official_domain: 'rango.exchange',
  official_url_status: 'live_verified',
  primary_chains: ['unknown'],
  primary_assets: ['unknown'],
  operator_name: 'Rango Exchange',
  operator_type: 'protocol_team',
  ecosystem_name: 'Rango',
  related_protocols: ['Rango Exchange', 'Rango Smart Routing'],
  brand_history_notes: 'BIR treats Rango Exchange, Rango DEX, and its bridge-aggregation routing product as one protocol lineage unless future first-party evidence establishes a separate canonical product identity.',
  notes: 'The reviewed first-party material supports August 2021 month precision, not an exact launch day. No incident or safety conclusion is inferred from the bridge aggregation architecture.'
});

events.push({
  id: 'bir_ev_000233',
  bridge_id: 'bir_bridge_000059',
  incident_id: null,
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  impact_level: 'lifecycle',
  status_effect: 'active',
  sort_order: 10,
  amount_text: null,
  recovered_amount_text: null,
  reimbursement_status: 'not_applicable',
  restart_status: 'not_applicable',
  affected_assets: ['unknown'],
  notes: null,
  duplicate_of: null,
  merged_into: null,
  event_type: 'launched',
  event_date: '2021-08',
  event_date_precision: 'month',
  title: 'Rango launches as cross-chain DEX and bridge aggregator',
  description: 'Rango first-party project material states that the cross-chain DEX and bridge aggregator launched in August 2021; the official roadmap independently places its v0.9 origin and bridge integrations in 2021 Q3.',
  source_count: 2,
  affected_chains: ['unknown']
});

evidence.push(
  {
    id: 'bir_src_000385', bridge_id: 'bir_bridge_000059', event_id: 'bir_ev_000233', incident_id: null,
    reliability: 'high', source_tier: 'tier_1', url_status: 'live', accessed_at: '2026-08-29', claim_scope: 'event', language: 'en', author: null, quote_excerpt: null,
    is_primary: true, is_paywalled: false, is_official_domain: false,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false, supports_migration: false,
    source_type: 'official_statement', title: 'Rango Exchange GitHub organization', url: 'https://github.com/rango-exchange', publisher: 'Rango Exchange', published_at: null, published_at_precision: 'unknown', archived_url: null,
    notes: 'Verified project GitHub organization describes Rango as a universal cross-chain DEX and bridge aggregator launched in August 2021.'
  },
  {
    id: 'bir_src_000386', bridge_id: 'bir_bridge_000059', event_id: 'bir_ev_000233', incident_id: null,
    reliability: 'high', source_tier: 'tier_1', url_status: 'live', accessed_at: '2026-08-29', claim_scope: 'event', language: 'en', author: null, quote_excerpt: null,
    is_primary: true, is_paywalled: false, is_official_domain: true,
    supports_amount: false, supports_recovery: false, supports_reimbursement: false, supports_reopen: false, supports_shutdown: false, supports_migration: false,
    source_type: 'official_statement', title: 'Rango roadmap', url: 'https://docs.rango.exchange/roadmap', publisher: 'Rango Exchange', published_at: null, published_at_precision: 'unknown', archived_url: null,
    notes: 'First-party roadmap independently places the v0.9 origin and bridge integrations in 2021 Q3, corroborating the launch-era bridge lifecycle.'
  }
);

write('data/bridges.json', bridges);
write('data/events.json', events);
write('data/evidence.json', evidence);

for (const cmd of ['validate:data','validate:enums','audit:full-corpus','audit:source-count','audit:source-quality']) {
  execFileSync('npm', ['run', cmd], { stdio: 'inherit' });
}

execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', 'data/bridges.json', 'data/events.json', 'data/evidence.json']);
execFileSync('git', ['rm', 'scripts/apply-batch-07-rango.mjs', '.github/workflows/temp-batch-07-rango.yml']);
execFileSync('git', ['commit', '-m', 'data: add Rango Exchange lifecycle record']);
execFileSync('git', ['push', 'origin', 'HEAD:canonical/growth-batch-07-rango']);
