import fs from 'node:fs';

const incidentsPath = 'data/incidents.json';
const eventsPath = 'data/events.json';
const evidencePath = 'data/evidence.json';
const incidents = JSON.parse(fs.readFileSync(incidentsPath, 'utf8'));
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));

const byId = (list, id) => {
  const item = list.find((x) => x.id === id);
  if (!item) throw new Error(`missing ${id}`);
  return item;
};

// The June 2 authorized burn removed unbacked supply; it did not recover drained real collateral.
const burn = byId(events, 'bir_ev_000248');
burn.event_type = 'other';
burn.title = 'Alephium burns most unbacked wALPH';
burn.notes = 'Authorized cleanup of unbacked supply; explicitly not classified as recovery of the real collateral drained from bridge custody.';

// Keep direct event source counts exact by assigning the first-party response source to the response event
// and the independent incident source to the incident event.
const eventCounts = {
  bir_ev_000247: 1,
  bir_ev_000248: 1,
  bir_ev_000249: 1,
  bir_ev_000250: 1,
  bir_ev_000251: 1,
  bir_ev_000252: 1,
  bir_ev_000253: 1,
  bir_ev_000254: 1,
  bir_ev_000255: 1,
  bir_ev_000256: 1,
};
for (const [id, count] of Object.entries(eventCounts)) byId(events, id).source_count = count;

const eventLinks = {
  bir_src_000403: 'bir_ev_000248',
  bir_src_000404: 'bir_ev_000247',
  bir_src_000405: 'bir_ev_000250',
  bir_src_000406: 'bir_ev_000249',
  bir_src_000407: 'bir_ev_000252',
  bir_src_000408: 'bir_ev_000251',
  bir_src_000409: 'bir_ev_000254',
  bir_src_000410: 'bir_ev_000253',
  bir_src_000411: 'bir_ev_000256',
  bir_src_000412: 'bir_ev_000255',
};
for (const [sourceId, eventId] of Object.entries(eventLinks)) byId(evidence, sourceId).event_id = eventId;

// The 2025 Garden incident has later evidence of continued protocol operation, but this bounded incident package
// does not establish a dated bridge/app reopening event. Keep restart unknown rather than inventing chronology.
const garden2025 = byId(incidents, 'bir_inc_000054');
garden2025.restart_status = 'unknown';
garden2025.known_unknowns = [
  ...garden2025.known_unknowns.filter((x) => !x.includes('reopening')),
  'A dated post-incident service reopening is not established in this bounded evidence package.'
];

fs.writeFileSync(incidentsPath, `${JSON.stringify(incidents, null, 2)}\n`);
fs.writeFileSync(eventsPath, `${JSON.stringify(events, null, 2)}\n`);
fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
