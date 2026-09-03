import fs from 'node:fs';

await import('./batch21-apply-tranche01.mjs');

const path = 'data/bridges.json';
const bridges = JSON.parse(fs.readFileSync(path, 'utf8'));
const bridge = bridges.find((entry) => entry.id === 'bir_bridge_000077');
if (!bridge) throw new Error('bir_bridge_000077 missing after tranche apply');

bridge.slug = 'hyperbridge';
bridge.canonical_name = 'Hyperbridge';
bridge.status = 'active';
bridge.summary = 'Hyperbridge is a cross-chain interoperability protocol. On April 13, 2026, a forged Merkle Mountain Range proof was accepted by its verifier and used to extract funds from the shared Token Gateway settlement layer. Hyperbridge paused bridging, patched and audited the verification stack, and relaunched in June with a redesigned architecture that deprecated the shared TokenGateway model while keeping the Hyperbridge protocol active.';
bridge.aliases = ['Hyperbridge protocol', 'Hyperbridge Token Gateway'];
bridge.end_date = null;
bridge.end_date_precision = 'unknown';
bridge.terminal_reason = null;
bridge.brand_history_notes = 'The affected shared TokenGateway was deprecated in the June 2026 redesign and replaced by issuer-owned Hyperfungible Token logic. This is lifecycle context within the still-active Hyperbridge protocol entity.';
bridge.notes = 'The incident boundary is the shared Token Gateway settlement layer. The protocol itself relaunched and remains the canonical entity; final attacker-fund recovery remains incomplete in the reviewed material.';

fs.writeFileSync(path, `${JSON.stringify(bridges, null, 2)}\n`);
console.log('Corrected bir_bridge_000077 from terminal TokenGateway entity to active Hyperbridge protocol entity.');
