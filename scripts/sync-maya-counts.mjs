import fs from 'node:fs';
const files=['README.md','docs/runbooks/current-status.md','docs/runbooks/recovery-checkpoint.md','docs/runbooks/development-roadmap.md','docs/runbooks/public-consistency-remediation.md'];
const old='Current canonical counts: Bridges 81 / Incidents 62 / Events 271 / Evidence 433.';
const next='Current canonical counts: Bridges 82 / Incidents 63 / Events 272 / Evidence 437.';
for(const f of files){
  let t=fs.readFileSync(f,'utf8');
  if(!t.includes(old)) throw new Error(`missing current marker in ${f}`);
  t=t.replace(old,next);
  fs.writeFileSync(f,t);
}
console.log('Synced Maya tranche counts to 82/63/272/437.');
