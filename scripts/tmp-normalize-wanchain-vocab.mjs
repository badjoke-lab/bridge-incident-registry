import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const write = (path, items) => fs.writeFileSync(path, `[\n  ${items.map((item) => JSON.stringify(item)).join(',\n  ')}\n]\n`);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const incidentsPath = 'data/incidents.json';
const eventsPath = 'data/events.json';
const evidencePath = 'data/evidence.json';
const incidents = read(incidentsPath);
const events = read(eventsPath);
const evidence = read(evidencePath);

assert(incidents.length === 39 && incidents.at(-1)?.id === 'bir_inc_000039', 'unexpected incident baseline');
assert(events.length === 191 && events.at(-1)?.id === 'bir_ev_000191', 'unexpected event baseline');
assert(evidence.length === 303 && evidence.at(-1)?.id === 'bir_src_000303', 'unexpected evidence baseline');

const incident = incidents.find((item) => item.id === 'bir_inc_000039');
const event = events.find((item) => item.id === 'bir_ev_000191');
const slowmist = evidence.find((item) => item.id === 'bir_src_000301');
const wanbridgeDocs = evidence.find((item) => item.id === 'bir_src_000303');
assert(incident && event && slowmist && wanbridgeDocs, 'Wanchain records missing');

incident.loss_amount_basis = 'mixed_sources';
incident.postmortem_available = 'available';
event.impact_level = 'critical';
slowmist.source_type = 'security_firm_report';
wanbridgeDocs.source_type = 'official_statement';
wanbridgeDocs.claim_scope = 'bridge_entity';

write(incidentsPath, incidents);
write(eventsPath, events);
write(evidencePath, evidence);
console.log('Normalized Wanchain record vocabulary to current target enums.');
