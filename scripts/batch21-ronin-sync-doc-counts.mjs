import fs from 'node:fs';

const files = [
  'README.md',
  'docs/runbooks/current-status.md',
  'docs/runbooks/recovery-checkpoint.md',
  'docs/runbooks/development-roadmap.md',
  'docs/runbooks/public-consistency-remediation.md'
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/Bridges\s+79[\s\S]{0,80}?Incidents\s+58[\s\S]{0,80}?Events\s+261[\s\S]{0,80}?Evidence\s+420/g,
    (block) => block
      .replace(/Incidents\s+58/, 'Incidents   59')
      .replace(/Events\s+261/, 'Events   263')
      .replace(/Evidence\s+420/, 'Evidence   423'));
  text = text.replace(/Current canonical counts: Bridges 79 \/ Incidents 58 \/ Events 261 \/ Evidence 420\./g,
    'Current canonical counts: Bridges 79 / Incidents 59 / Events 263 / Evidence 423.');
  fs.writeFileSync(file, text);
}
console.log('Synced Ronin tranche counts to 79/59/263/423.');
