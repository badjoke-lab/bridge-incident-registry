import fs from 'node:fs';

const path = 'data/incidents.json';
const incidents = JSON.parse(fs.readFileSync(path, 'utf8'));
const incident = incidents.find((x) => x.id === 'bir_inc_000047');
if (!incident) throw new Error('bir_inc_000047 not found');
if (incident.current_outcome !== 'active_after_incident') {
  throw new Error(`unexpected current_outcome: ${incident.current_outcome}`);
}
if (incident.is_unresolved !== true) {
  throw new Error('bir_inc_000047 must remain unresolved for this repair');
}
incident.current_outcome = 'limited_after_incident';
fs.writeFileSync(path, JSON.stringify(incidents, null, 2) + '\n');
console.log('Updated bir_inc_000047 current_outcome to limited_after_incident');
