import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, `${JSON.stringify(v, null, 2)}\n`);
const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const baseline = { bridges: 62, incidents: 51, events: 236, evidence: 387 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
if (JSON.stringify(actual) !== JSON.stringify(baseline)) throw new Error(`baseline mismatch: ${JSON.stringify(actual)}`);

const haystack = JSON.stringify(bridges).toLowerCase();
for (const token of ['starkgate', 'starknet.io', 'starkware']) {
  if (haystack.includes(token)) throw new Error(`duplicate/alias/domain guard hit: ${token}`);
}
for (const id of ['bir_bridge_000063']) if (bridges.some((x) => x.id === id)) throw new Error(`existing id ${id}`);
for (const id of ['bir_ev_000237']) if (events.some((x) => x.id === id)) throw new Error(`existing id ${id}`);
for (const id of ['bir_src_000389']) if (evidence.some((x) => x.id === id)) throw new Error(`existing id ${id}`);

bridges.push({
  id: 'bir_bridge_000063',
  slug: 'starkgate',
  previous_slugs: [],
  redirect_from: [],
  canonical_name: 'StarkGate',
  type: 'canonical_bridge',
  status: 'active',
  summary: 'StarkGate is the official native bridge between Ethereum and Starknet. Starknet first-party material records StarkGate as live on mainnet on May 9, 2022, and current Starknet documentation continues to identify and document the bridge.',
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
  aliases: ['Starknet Bridge', 'StarkGate Bridge'],
  launch_date: '2022-05-09',
  launch_date_precision: 'day',
  official_url: 'https://www.starknet.io/bridges-and-onramps/',
  official_domain: 'starknet.io',
  official_url_status: 'live_verified',
  primary_chains: ['ethereum', 'unknown'],
  primary_assets: ['eth', 'unknown'],
  operator_name: 'StarkWare',
  operator_type: 'protocol_team',
  ecosystem_name: 'Starknet',
  related_protocols: ['StarkGate 2.0'],
  brand_history_notes: 'StarkGate 2.0, legacy per-token bridge contracts, and later bridge integrations are retained as lifecycle/version evolution within the StarkGate lineage unless later primary evidence establishes a separate canonical product.',
  notes: 'Starknet lacks a dedicated BIR chain-reference key at this checkpoint, so the Starknet side is conservatively represented as unknown rather than creating an unreviewed reference entry. No incident is inferred.'
});

events.push({
  id: 'bir_ev_000237',
  bridge_id: 'bir_bridge_000063',
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
  affected_assets: ['eth', 'unknown'],
  notes: null,
  duplicate_of: null,
  merged_into: null,
  event_type: 'launched',
  event_date: '2022-05-09',
  event_date_precision: 'day',
  title: 'StarkGate goes live on mainnet',
  description: 'Starknet first-party launch material includes a May 9, 2022 update stating that StarkGate was live on mainnet as the first version of the Starknet bridge.',
  source_count: 1,
  affected_chains: ['ethereum', 'unknown']
});

evidence.push({
  id: 'bir_src_000389',
  bridge_id: 'bir_bridge_000063',
  event_id: 'bir_ev_000237',
  incident_id: null,
  reliability: 'high',
  source_tier: 'tier_1',
  url_status: 'live',
  accessed_at: '2026-08-29',
  claim_scope: 'event',
  language: 'en',
  author: null,
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: true,
  supports_amount: false,
  supports_recovery: false,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: false,
  supports_migration: false,
  source_type: 'official_blog',
  title: 'StarkGate Alpha',
  url: 'https://www.starknet.io/blog/starkgate-alpha/',
  publisher: 'Starknet',
  published_at: '2022-04-04',
  published_at_precision: 'day',
  archived_url: null,
  notes: 'First-party launch article contains an explicit May 9, 2022 update stating StarkGate is live on Mainnet.'
});

write('data/bridges.json', bridges);
write('data/events.json', events);
write('data/evidence.json', evidence);

for (const args of [
  ['run', 'validate:data'], ['run', 'validate:enums'], ['run', 'audit:full-corpus'], ['run', 'audit:source-count'], ['run', 'audit:source-quality']
]) execFileSync('npm', args, { stdio: 'inherit' });

execFileSync('git', ['rm', '-f', 'scripts/apply-batch-09-starkgate.mjs', '.github/workflows/temp-batch-09-starkgate.yml'], { stdio: 'inherit' });
execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', 'data/bridges.json', 'data/events.json', 'data/evidence.json']);
execFileSync('git', ['commit', '-m', 'data: add Batch 09 StarkGate lifecycle record']);
execFileSync('git', ['push', 'origin', 'HEAD:canonical/growth-batch-09-starkgate']);
