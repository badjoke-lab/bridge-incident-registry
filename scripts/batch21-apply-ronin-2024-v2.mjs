import fs from 'node:fs';

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const incidents = read('data/incidents.json');
const events = read('data/events.json');
const evidence = read('data/evidence.json');

const incident = incidents.find((r) => r.id === 'bir_inc_000059');
if (!incident) throw new Error('bir_inc_000059 missing after base applicator');
incident.source_count = 3;

const recoveryEvent = events.find((r) => r.id === 'bir_ev_000263');
if (!recoveryEvent) throw new Error('bir_ev_000263 missing after base applicator');
Object.assign(recoveryEvent, {
  event_type: 'security_audit_completed',
  event_date: '2024-08-21',
  event_date_precision: 'day',
  title: 'Recovery fix restores operator weights and passes security audit',
  description: 'Beosin’s Ronin-hosted audit reviewed the recovery proposal that restored the missing bridge-operator weights and verified that fake-credential withdrawals failed after the fix. The event date uses the audit publication boundary rather than inferring an earlier deployment timestamp.',
  confidence: 'high',
  record_maturity: 'reviewed',
  update_status: 'current',
  impact_level: 'major',
  status_effect: 'Recovery fix independently verified',
  source_count: 1,
  sort_order: 20,
  amount_text: null,
  recovered_amount_text: null,
  reimbursement_status: 'not_required',
  restart_status: 'unknown',
  affected_chains: ['ronin', 'ethereum'],
  affected_assets: ['eth', 'usdc'],
  notes: 'The separate fact that the temporary 4,000 ETH + 2M USDC outflow was returned remains incident-level recovery context supported by contemporaneous reporting; this event is limited to the primary-source technical fix and audit boundary.',
  duplicate_of: null,
  merged_into: null
});

const filteredEvents = events.filter((r) => r.id !== 'bir_ev_000264');

const secondary = evidence.find((r) => r.id === 'bir_src_000423');
if (!secondary) throw new Error('bir_src_000423 missing after base applicator');
secondary.event_id = null;
secondary.claim_scope = 'recovery';
secondary.notes = 'Contemporaneous independent report quoting Ronin incident updates for the 4,000 ETH + 2M USDC temporary outflow, bridge pause, whitehat framing, and return of both assets. Kept at incident scope because it is not primary evidence for a canonical event.';

const primaryFix = evidence.find((r) => r.id === 'bir_src_000424');
if (!primaryFix) throw new Error('bir_src_000424 missing after base applicator');
primaryFix.event_id = 'bir_ev_000263';
primaryFix.claim_scope = 'security_patch';
primaryFix.notes = 'Ronin-hosted Beosin audit verifying that the recovery proposal restored operator weights and that fake-credential withdrawal attempts failed after the fix.';

write('data/incidents.json', incidents);
write('data/events.json', filteredEvents);
write('data/evidence.json', evidence);
console.log('Corrected Ronin 2024 event/evidence boundary for primary-source no-regression.');
