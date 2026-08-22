import fs from 'node:fs';
// Synchronize commit: re-trigger the bounded Oraichain applicator after a stuck runner queue.
const p='data/incidents.json';
const rows=JSON.parse(fs.readFileSync(p,'utf8'));
const row=rows.find(x=>x.id==='bir_inc_000045');
if(!row) throw new Error('bir_inc_000045 missing');
row.source_count=5;
fs.writeFileSync(p,JSON.stringify(rows,null,2)+'\n');
