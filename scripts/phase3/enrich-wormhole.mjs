import fs from "node:fs";
const read=(n)=>JSON.parse(fs.readFileSync(`data/${n}.json`,"utf8"));
const write=(n,r)=>fs.writeFileSync(`data/${n}.json`,`[\n${r.map(x=>`  ${JSON.stringify(x)}`).join(",\n")}\n]\n`);
const bridges=read("bridges"),incidents=read("incidents"),events=read("events"),evidence=read("evidence");
const get=(a,id)=>{const x=a.find(v=>v.id===id);if(!x)throw new Error(`missing ${id}`);return x};
Object.assign(get(bridges,"bir_bridge_000002"),{last_reviewed_at:"2026-06-15",last_verified_at:"2026-06-15"});
Object.assign(get(incidents,"bir_inc_000002"),{source_count:6,last_reviewed_at:"2026-06-15",last_verified_at:"2026-06-15"});
get(events,"bir_ev_000004").source_count=3;
get(events,"bir_ev_000005").source_count=2;
for(const x of [
{"id":"bir_src_000063","bridge_id":"bir_bridge_000002","incident_id":"bir_inc_000002","event_id":"bir_ev_000004","source_type":"official_social","title":"Wormhole acknowledged the network exploit","url":"https://x.com/wormhole/status/1489001949881978883","publisher":"Wormhole","published_at":"2022-02-02","published_at_precision":"day","reliability":"high","source_tier":"tier_1","url_status":"live","accessed_at":"2026-06-15","claim_scope":"incident_case","language":"en","author":"Wormhole","quote_excerpt":null,"is_primary":true,"is_paywalled":false,"is_official_domain":false,"supports_amount":false,"supports_recovery":false,"supports_reimbursement":false,"supports_reopen":false,"supports_shutdown":true,"supports_migration":false,"notes":"Primary contemporaneous acknowledgement of the incident."},
{"id":"bir_src_000064","bridge_id":"bir_bridge_000002","incident_id":"bir_inc_000002","event_id":"bir_ev_000005","source_type":"official_social","title":"Wormhole announced restoration of funds and service","url":"https://x.com/wormhole/status/1489232008521859079","publisher":"Wormhole","published_at":"2022-02-03","published_at_precision":"day","reliability":"high","source_tier":"tier_1","url_status":"live","accessed_at":"2026-06-15","claim_scope":"restart","language":"en","author":"Wormhole","quote_excerpt":null,"is_primary":true,"is_paywalled":false,"is_official_domain":false,"supports_amount":false,"supports_recovery":true,"supports_reimbursement":true,"supports_reopen":true,"supports_shutdown":false,"supports_migration":false,"notes":"Primary statement that funds had been restored and Wormhole was back up."}
]){if(evidence.some(v=>v.id===x.id))throw new Error(`duplicate ${x.id}`);evidence.push(x)}
write("bridges",bridges);write("incidents",incidents);write("events",events);write("evidence",evidence);
