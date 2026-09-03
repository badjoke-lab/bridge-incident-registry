import fs from 'node:fs';

const files = [
  'README.md',
  'docs/runbooks/current-status.md',
  'docs/runbooks/recovery-checkpoint.md',
  'docs/runbooks/development-roadmap.md',
  'docs/runbooks/public-consistency-remediation.md'
];

const marker = `\n\n<!-- batch21-current-counts -->\nCurrent canonical counts: Bridges 77 / Incidents 56 / Events 257 / Evidence 415.\n`;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/\n\n<!-- batch21-current-counts -->[\s\S]*?\n(?=\n|$)/g, '\n');
  fs.writeFileSync(file, text.trimEnd() + marker);
}
console.log('Synchronized Batch 21 document count markers.');
