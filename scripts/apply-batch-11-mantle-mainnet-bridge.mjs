import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, `${JSON.stringify(v, null, 2)}\n`);
const bridges = read('data/bridges.json');
const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const baseline = { bridges: 64, incidents: 51, events: 238, evidence: 389 };
const actual = { bridges: bridges.length, incidents: incidents.length, events: events.length, evidence: evidence.length };
if (JSON.stringify(actual) !== JSON.stringify(baseline)) throw new Error(`baseline mismatch: ${JSON.stringify(actual)}`);

const haystack = JSON.stringify(bridges).toLowerCase();
for (const token of ['mantle mainnet bridge', 'bridge.mantle.xyz', 'mantle canonical bridge']) {
  if (haystack.includes(token)) throw new Error(`duplicate/alias/domain guard hit: ${token}`);
}
for (const id of ['bir_bridge_000065']) if (bridges.some((x) => x.id === id)) throw new Error(`existing id ${id}`);
for (const id of ['bir_ev_000239']) if (events.some((x) => x.id === id)) throw new Error(`existing id ${id}`);
for (const id of ['bir_src_000391', 'bir_src_000392']) if (evidence.some((x) => x.id === id)) throw new Error(`existing id ${id}`);

bridges.push({
  id: 'bir_bridge_000065',
  slug: 'mantle-mainnet-bridge',
  previous_slugs: [],
  redirect_from: [],
  canonical_name: 'Mantle Mainnet Bridge',
  type: 'canonical_bridge',
  status: 'active',
  summary: 'Mantle Mainnet Bridge is Mantle Network’s canonical Ethereum-to-Mantle bridge. Mantle pre-announced public availability for July 17, 2023 alongside Mainnet Alpha and later first-party guidance identifies bridge.mantle.xyz as the official mainnet bridge connecting Ethereum and Mantle.',
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
  aliases: ['Mantle Bridge', 'Mantle Canonical Bridge'],
  launch_date: '2023-07-17',
  launch_date_precision: 'day',
  official_url: 'https://bridge.mantle.xyz/',
  official_domain: 'mantle.xyz',
  official_url_status: 'live_verified',
  primary_chains: ['ethereum', 'unknown'],
  primary_assets: ['eth', 'unknown'],
  operator_name: 'Mantle',
  operator_type: 'protocol_team',
  ecosystem_name: 'Mantle',
  related_protocols: [],
  brand_history_notes: 'Later bridge UI and product changes remain within the Mantle native/canonical bridge lineage unless later first-party evidence establishes a distinct historical bridge product.',
  notes: 'Mantle lacks a dedicated BIR chain-reference key at this checkpoint, so the Mantle side is conservatively represented as unknown rather than creating an unreviewed reference entry. No incident is inferred.'
});

events.push({
  id: 'bir_ev_000239',
  bridge_id: 'bir_bridge_000065',
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
  event_date: '2023-07-17',
  event_date_precision: 'day',
  title: 'Mantle Mainnet Bridge opens with Mainnet Alpha',
  description: 'Mantle’s July 11 migration guide pre-announced July 17 availability and directed users to the Mantle canonical bridge for moving assets from Ethereum L1 to Mantle Network; Mantle’s July 17 launch post confirms Mainnet Alpha was live.',
  source_count: 2,
  affected_chains: ['ethereum', 'unknown']
});

evidence.push({
  id: 'bir_src_000391',
  bridge_id: 'bir_bridge_000065',
  event_id: 'bir_ev_000239',
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
  supports_migration: true,
  source_type: 'official_blog',
  title: '$BIT to $MNT Migration: A User’s Guide',
  url: 'https://www.mantle.xyz/blog/announcements/bit-to-mnt-user-guide',
  publisher: 'Mantle',
  published_at: '2023-07-11',
  published_at_precision: 'day',
  archived_url: null,
  notes: 'First-party Mantle guide pre-announces July 17 migration availability and states Ethereum-L1 MNT can be bridged to Mantle Network via the Mantle canonical bridge.'
});

evidence.push({
  id: 'bir_src_000392',
  bridge_id: 'bir_bridge_000065',
  event_id: 'bir_ev_000239',
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
  title: 'Mantle Network Mainnet Alpha: Launch Highlights',
  url: 'https://www.mantle.xyz/blog/announcements/mantle-network-mainnet-alpha',
  publisher: 'Mantle',
  published_at: '2023-07-17',
  published_at_precision: 'day',
  archived_url: null,
  notes: 'First-party Mantle launch post confirms Mainnet Alpha was live on July 17, 2023.'
});

write('data/bridges.json', bridges);
write('data/events.json', events);
write('data/evidence.json', evidence);

for (const args of [
  ['run', 'validate:data'], ['run', 'validate:enums'], ['run', 'audit:full-corpus'], ['run', 'audit:source-count'], ['run', 'audit:source-quality']
]) execFileSync('npm', args, { stdio: 'inherit' });

execFileSync('git', ['rm', '-f', 'scripts/apply-batch-11-mantle-mainnet-bridge.mjs', '.github/workflows/temp-batch-11-mantle-mainnet-bridge.yml'], { stdio: 'inherit' });
execFileSync('git', ['config', 'user.name', 'github-actions[bot]']);
execFileSync('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
execFileSync('git', ['add', 'data/bridges.json', 'data/events.json', 'data/evidence.json']);
execFileSync('git', ['commit', '-m', 'data: add Batch 11 Mantle Mainnet Bridge lifecycle record']);
execFileSync('git', ['push', 'origin', 'HEAD:canonical/growth-batch-11-mantle-mainnet-bridge']);
