import fs from 'node:fs';
const files=['README.md','docs/runbooks/current-status.md','docs/runbooks/recovery-checkpoint.md','docs/runbooks/development-roadmap.md','docs/runbooks/public-consistency-remediation.md'];
const old='Current canonical counts: Bridges 82 / Incidents 63 / Events 272 / Evidence 437.';
const next='Current canonical counts: Bridges 83 / Incidents 64 / Events 273 / Evidence 441.';
for(const f of files){
  let t=fs.readFileSync(f,'utf8');
  if(!t.includes(old)) throw new Error(`missing current marker in ${f}`);
  t=t.replace(old,next);
  fs.writeFileSync(f,t);
}
console.log('Synced Shibarium tranche counts to 83/64/273/441.');
