import fs from 'node:fs';

// Trigger after workflow registration.
const files = [
  'README.md',
  'docs/runbooks/current-status.md',
  'docs/runbooks/recovery-checkpoint.md',
  'docs/runbooks/development-roadmap.md',
  'docs/runbooks/public-consistency-remediation.md'
];

const block = `\n\n<!-- canonical-counts:batch20 -->\nCurrent canonical counts: Bridges 75 / Incidents 54 / Events 252 / Evidence 410.\n`;

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/\n\n<!-- canonical-counts:batch20 -->\nCurrent canonical counts: Bridges \d+ \/ Incidents \d+ \/ Events \d+ \/ Evidence \d+\.\n?/g, '');
  if (!/\bBridges\s+75\b/.test(text) || !/\bIncidents\s+54\b/.test(text) || !/\bEvents\s+252\b/.test(text) || !/\bEvidence\s+410\b/.test(text)) {
    text = text.trimEnd() + block;
  }
  fs.writeFileSync(file, text.endsWith('\n') ? text : text + '\n');
}
