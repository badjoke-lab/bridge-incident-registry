import fs from 'node:fs';

const docs = [
  'README.md',
  'docs/runbooks/current-status.md',
  'docs/runbooks/recovery-checkpoint.md',
  'docs/runbooks/development-roadmap.md',
  'docs/runbooks/public-consistency-remediation.md'
];

const counts = {
  Bridges: JSON.parse(fs.readFileSync('data/bridges.json', 'utf8')).length,
  Incidents: JSON.parse(fs.readFileSync('data/incidents.json', 'utf8')).length,
  Events: JSON.parse(fs.readFileSync('data/events.json', 'utf8')).length,
  Evidence: JSON.parse(fs.readFileSync('data/evidence.json', 'utf8')).length
};

for (const path of docs) {
  let text = fs.readFileSync(path, 'utf8');
  let changed = false;
  for (const [label, count] of Object.entries(counts)) {
    const pattern = new RegExp(`\\b${label}\\s+\\d+\\b`);
    if (pattern.test(text)) {
      text = text.replace(pattern, `${label}   ${count}`);
      changed = true;
    }
  }
  if (!changed) {
    text += `\n\nCurrent canonical counts:\n\n\`\`\`text\nBridges   ${counts.Bridges}\nIncidents   ${counts.Incidents}\nEvents   ${counts.Events}\nEvidence   ${counts.Evidence}\n\`\`\`\n`;
  }
  fs.writeFileSync(path, text);
}

console.log(counts);
