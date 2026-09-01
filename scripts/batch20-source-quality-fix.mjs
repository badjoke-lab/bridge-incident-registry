import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const bridgesPath = 'data/bridges.json';
const incidentsPath = 'data/incidents.json';
const eventsPath = 'data/events.json';
const evidencePath = 'data/evidence.json';

let bridges = read(bridgesPath);
let incidents = read(incidentsPath);
let events = read(eventsPath);
let evidence = read(evidencePath);

// Withdraw candidates that do not yet satisfy the repository's primary/Tier-1 evidence baseline.
bridges = bridges.filter((r) => r.id !== 'bir_bridge_000076');
incidents = incidents.filter((r) => !['bir_inc_000055', 'bir_inc_000056'].includes(r.id));
events = events.filter((r) => !['bir_ev_000253', 'bir_ev_000254', 'bir_ev_000255', 'bir_ev_000256'].includes(r.id));
evidence = evidence.filter((r) => !['bir_src_000405','bir_src_000409','bir_src_000410','bir_src_000411','bir_src_000412'].includes(r.id));

// Replace the unarchived Medium URL with a stable syndicated copy of MAP Protocol's official statement.
evidence.push({
  id: 'bir_src_000405',
  bridge_id: 'bir_bridge_000074',
  incident_id: 'bir_inc_000053',
  event_id: 'bir_ev_000250',
  source_type: 'official_statement',
  title: 'Official statement on the MAPO security incident',
  url: 'https://www.kucoin.com/news/insight/MAPO/6a0f728e9ec3bf00071e9662',
  publisher: 'MAP Protocol',
  published_at: '2026-05-21',
  published_at_precision: 'day',
  reliability: 'high',
  source_tier: 'tier_1',
  url_status: 'live',
  archived_url: null,
  accessed_at: '2026-09-01',
  claim_scope: 'incident_case',
  language: 'en',
  author: 'MAP Protocol',
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: false,
  supports_amount: false,
  supports_recovery: false,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: true,
  supports_migration: false,
  notes: 'Syndicated copy preserving MAP Protocol’s first-party statement that Butter Bridge V3.1 was exploited on May 20, causing unauthorized MAPO minting on Ethereum and BSC, while MAP Protocol mainnet consensus and light-client verification were unaffected.'
});

// Each retained Batch 20 event gets a directly linked primary/Tier-1 source.
evidence.push({
  id: 'bir_src_000409',
  bridge_id: 'bir_bridge_000074',
  incident_id: 'bir_inc_000053',
  event_id: 'bir_ev_000249',
  source_type: 'official_statement',
  title: 'Official statement on the MAPO security incident',
  url: 'https://www.kucoin.com/news/insight/MAPO/6a0f728e9ec3bf00071e9662',
  publisher: 'MAP Protocol',
  published_at: '2026-05-21',
  published_at_precision: 'day',
  reliability: 'high',
  source_tier: 'tier_1',
  url_status: 'live',
  archived_url: null,
  accessed_at: '2026-09-01',
  claim_scope: 'incident_case',
  language: 'en',
  author: 'MAP Protocol',
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: false,
  supports_amount: false,
  supports_recovery: false,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: true,
  supports_migration: false,
  notes: 'Same first-party statement, linked directly to the exploit event rather than the remediation event so event-level primary-source coverage remains explicit.'
});

evidence.push({
  id: 'bir_src_000410',
  bridge_id: 'bir_bridge_000073',
  incident_id: 'bir_inc_000052',
  event_id: 'bir_ev_000247',
  source_type: 'official_blog',
  title: 'The Alephium Bridge Exploit: On-Chain Report',
  url: 'https://alephium.org/news/post/the-alephium-bridge-exploit-on-chain-report/',
  publisher: 'Alephium',
  published_at: '2026-06-02',
  published_at_precision: 'day',
  reliability: 'high',
  source_tier: 'tier_1',
  url_status: 'live',
  archived_url: null,
  accessed_at: '2026-09-01',
  claim_scope: 'incident_case',
  language: 'en',
  author: null,
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: true,
  supports_amount: true,
  supports_recovery: true,
  supports_reimbursement: false,
  supports_reopen: false,
  supports_shutdown: true,
  supports_migration: false,
  notes: 'First-party Alephium report linked directly to the exploit event; the separate evidence record for the June 2 burn remains linked to the remediation event.'
});

evidence.push({
  id: 'bir_src_000411',
  bridge_id: 'bir_bridge_000075',
  incident_id: 'bir_inc_000054',
  event_id: 'bir_ev_000251',
  source_type: 'postmortem',
  title: 'Garden Incident Report — October 30, 2025',
  url: 'https://garden.finance/blog/garden-incident-report-october-30-2025',
  publisher: 'Garden Finance',
  published_at: '2026-01-28',
  published_at_precision: 'day',
  reliability: 'high',
  source_tier: 'tier_1',
  url_status: 'live',
  archived_url: null,
  accessed_at: '2026-09-01',
  claim_scope: 'incident_case',
  language: 'en',
  author: null,
  quote_excerpt: null,
  is_primary: true,
  is_paywalled: false,
  is_official_domain: true,
  supports_amount: true,
  supports_recovery: true,
  supports_reimbursement: false,
  supports_reopen: true,
  supports_shutdown: true,
  supports_migration: false,
  notes: 'First-party Garden postmortem linked directly to the exploit/pause event; the existing primary record remains linked to the later investigation/recovery event.'
});

// Recompute exact source counts after the bounded withdrawal/addition.
for (const r of incidents) r.source_count = evidence.filter((e) => e.incident_id === r.id).length;
for (const r of events) r.source_count = evidence.filter((e) => e.event_id === r.id).length;

const garden = bridges.find((r) => r.id === 'bir_bridge_000075');
if (garden) garden.major_incident_count = 1;

write(bridgesPath, bridges);
write(incidentsPath, incidents);
write(eventsPath, events);
write(evidencePath, evidence);
