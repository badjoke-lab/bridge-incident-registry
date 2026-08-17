import fs from 'node:fs';

const files = [
  'README.md',
  'docs/runbooks/current-status.md',
  'docs/runbooks/recovery-checkpoint.md',
  'docs/runbooks/development-roadmap.md',
  'docs/runbooks/public-consistency-remediation.md',
];

const replacements = [
  [/\bBridges\s+36\b/, 'Bridges     37'],
  [/\bIncidents\s+38\b/, 'Incidents   39'],
  [/\bEvents\s+190\b/, 'Events      191'],
  [/\bEvidence\s+299\b/, 'Evidence    303'],
];

for (const path of files) {
  let text = fs.readFileSync(path, 'utf8');
  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(text)) throw new Error(`${path}: expected current-count pattern not found: ${pattern}`);
    text = text.replace(pattern, replacement);
  }
  fs.writeFileSync(path, text);
  console.log(`Synchronized current canonical count block: ${path}`);
}
