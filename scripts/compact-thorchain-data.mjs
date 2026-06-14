import fs from 'node:fs';
for (const path of ['data/events.json', 'data/evidence.json']) {
  const rows = JSON.parse(fs.readFileSync(path, 'utf8'));
  fs.writeFileSync(path, `[\n  ${rows.map((row) => JSON.stringify(row)).join(',\n  ')}\n]\n`);
}
