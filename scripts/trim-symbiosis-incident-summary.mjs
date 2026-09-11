import fs from 'node:fs';

const path = 'data/incidents.json';
const incidents = JSON.parse(fs.readFileSync(path, 'utf8'));
const incident = incidents.find((item) => item.id === 'bir_inc_000065');
if (!incident) throw new Error('bir_inc_000065 not found');

incident.title = 'Symbiosis 2026 BridgeV2 syBTC incident';
incident.summary = 'On September 11, 2026, Blockaid-derived reports identified anomalous Symbiosis BridgeV2-signed syBTC activity on BNB Smart Chain. The beneficiary later sold about 4.39 WBTC on Ethereum for roughly $336,000. Root cause and final loss remain unresolved.';
incident.reported_loss_usd_display = 'About $336,000 realized; final loss unresolved';

fs.writeFileSync(path, `${JSON.stringify(incidents, null, 2)}\n`);
console.log('Trimmed Symbiosis incident list-facing copy.');
