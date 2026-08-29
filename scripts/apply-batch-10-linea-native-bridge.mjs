import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, `${JSON.stringify(v, null, 2)}\n`);
const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const baseline = { bridges: 63, incidents: 51, events: 237, evidence: 388 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
if (JSON.stringify(actual) !== JSON.stringify(baseline)) throw new Error(`baseline mismatch: ${JSON.stringify(actual)}`);

const haystack = JSON.stringify(bridges).toLowerCase();
for (const token of ['linea native bridge', 'bridge.linea.build', 'linea.build/bridge']) {
  if (haystack.includes(token)) throw new Error(`duplicate/alias/domain guard hit: ${token}`);
}
for (const id of ['bir_bridge_000064']) if (bridges.some((x) => x.id === id)) throw new Error(`existing id ${id}`);
for (const id of ['bir_ev_000238']) if (events.some((x) => x.id === id)) throw new Error(`existing id ${id}`);
for (const id of ['bir_src_000390']) if (evidence.some((x) => x.id === id)) throw new Error(`existing id ${id}`);

bridges.push({
  id: 'bir_bridge_000064',
  slug: 'linea-native-bridge',
  previous_slugs: [],
  redirect_from: [],
  canonical_name: 'Linea Native Bridge',
  type: 'canonical_bridge',
  status: 'active',
  summary: 'Linea Native Bridge is Linea’s official native bridge between Ethereum and Linea. Linea’s July 18, 2023 public-mainnet announcement explicitly directed users to the bridge to onboard, and the current first-party Linea bridge page continues to expose the native bridge.',
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
  aliases: ['Linea Bridge', 'Linea Official Bridge'],
  launch_date: '2023-07-18',
  launch_date_precision: 'day',
  official_url: 'https://linea.build/bridge',
  official_domain: 'linea.build',
  official_url_status: 'live_verified',
  primary_chains: ['ethereum', 'unknown'],
  primary_assets: ['eth', 'unknown'],
  operator_name: 'Linea',
  operator_type: 'protocol_team',
  ecosystem_name: 'Linea',
  related_protocols: [],
  brand_history_notes: 'Later native-bridge UI moves, aggregator additions, and bridge-component evolution are retained as lifecycle/product evolution within the Linea native bridge lineage unless later first-party evidence establishes a separate canonical product.',
  notes: 'Linea lacks a dedicated BIR chain-reference key at this checkpoint, so the Linea side is conservatively represented as unknown rather than creating an unreviewed reference entry. No incident is inferred.'
});

events.push({
  id: 'bir_ev_000238',
  bridge_id: 'bir_bridge_000064',
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
  event_date: '2023-07-18',
  event_date_precision: 'day',
  title: 'Linea Native Bridge opens to the public',
  description: 'Linea’s official July 18, 2023 mainnet announcement opened access to the wider community and explicitly directed users to the Linea bridge to onboard to mainnet.',
  source_count: 1,
  affected_chains: ['ethereum', 'unknown']
});

evidence.push({
  id: 'bir_src_000390',
  bridge_id: 'bir_bridge_000064',
  event_id: 'bir_ev_000238',
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
  source_type: 'official_statement',
  title: 'Linea mainnet is live!',
  url: 'https://community.linea.build/t/linea-mainnet-is-live/6557',
  publisher: 'Linea',
  published_at: '2023-07-18',
  published_at_precision: 'day',
  archived_url: null,
  notes: 'First-party Linea announcement explicitly directs the public to bridge.linea.build to onboard to Linea Mainnet Alpha.'
});

write('data/bridges.json', bridges);
write('data/events.json', events);
write('data/evidence.json', evidence);

for (const args of [
  ['run', 'validate:data'], ['run', 'validate:enums'], ['run', 'audit:full-corpus'], ['run', 'audit:source-count'], ['run', 'audit:source-quality']
]) execFileSync('npm', args, { stdio: 'inherit' });

execFileSync('git', ['rm', '-f', 'scripts/apply-batch-10-linea-native-bridge.mjs', '.github/workflows/temp-batch-10-linea-native-bridge.yml'], { stdio: 'inherit' });
execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', 'data/bridges.json', 'data/events.json', 'data/evidence.json']);
execFileSync('git', ['commit', '-m', 'data: add Batch 10 Linea Native Bridge lifecycle record']);
execFileSync('git', ['push', 'origin', 'HEAD:canonical/growth-batch-10-linea-native-bridge']);
