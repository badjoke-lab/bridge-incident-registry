# Record-growth Batch 20 — tranche 01 evidence review

Issue: #445
Branch: `review/growth-batch-20-incident-heavy`

This tranche converts discovery-only signals into evidence-reviewed classifications. No canonical IDs are allocated here.

## Alephium Bridge — add_now

Primary / first-party evidence:

- Alephium, `The Alephium Bridge Exploit: On-Chain Report`, 2026-06-02: https://alephium.org/news/post/the-alephium-bridge-exploit-on-chain-report/
- Alephium bridge documentation: https://docs.alephium.org/infrastructure/the-bridge/

Supported boundary:

- incident date: **2026-05-30** (day precision);
- affected component: Alephium TokenBridge / Alephium Bridge linking Alephium with Ethereum and BNB Chain;
- attack path: attacker deployed a fake-event contract on Alephium, emitted forged Wormhole-format messages, and obtained guardian-signed VAAs that were redeemed on Ethereum/BSC;
- consequence: real collateral was drained and unbacked wALPH was minted;
- Alephium's first-party report documents an authorized burn of 13,257,077.37295 unbacked wALPH, 96.4% of the forged-mint total, while 500,000 wALPH had escaped before the pause;
- do not infer a final recovered-USD amount or completed reimbursement from this source alone.

Decision: **add_now**, subject to final direct canonical duplicate check and second-source corroboration for any USD loss figure.

## Wanchain Cardano–BNB bridge — add_now with bounded claims

First-party ecosystem evidence:

- Midnight Foundation, `Update on the Wanchain Cardano–BNB Bridge Incident`, 2026-07-21: https://midnight.foundation/news/update-on-the-wanchain-cardano-bnb-bridge-incident

Supported boundary:

- incident explicitly involved **Wanchain's Cardano–BNB bridge**;
- NIGHT was stolen through Wanchain's third-party bridge infrastructure;
- Midnight states the incident was isolated to the Wanchain bridge and did not affect the Midnight network/protocol or NIGHT total supply;
- exchanges and ecosystem partners restricted deposits/withdrawals and attacker-linked accounts/addresses as part of response;
- the source does **not** establish a canonical loss amount, technical root cause, recovery completion, reimbursement completion, or bridge restart status.

Decision: **add_now**, but canonical incident fields for loss, attack vector, recovery, reimbursement and restart must remain unknown unless stronger evidence is added.

## Axelar<>Secret IBC Bridge — add_now

First-party ecosystem evidence:

- Secret Network forum, `Security Incident: Axelar<>Secret IBC Bridge Exploit (June 10, 2026)`, published 2026-06-19: https://forum.scrt.network/t/security-incident-axelar-secret-ibc-bridge-exploit-june-10-2026/7995

Supported boundary:

- incident date: **2026-06-10**;
- affected component: the `ics20-for-axelar` contract integrating Axelar-bridged assets into Secret;
- the contract accepted deposits from a counterfeit chain without validating genuine Axelar origin and minted unbacked Secret-side representations;
- forged assets were redeemed back through the legitimate Axelar path, releasing real escrow reserves;
- Secret reports approximately **$4.67M** of unbacked tokens / bridge reserves involved and approximately **$770K** remaining in the attacker Axelar wallet at report time;
- the Axelar connection was paused and bridging through the affected path disabled;
- Secret states its core protocol, native SCRT/SNIP-20 assets outside this bridge path, other IBC connections, and Axelar core protocol were not affected.

Entity boundary rule:

- canonicalization must represent the affected Axelar<>Secret bridge/integration boundary and must not misstate the incident as a compromise of Axelar core protocol or Secret core consensus.

Decision: **add_now**.

## MAP Protocol / Butter Bridge V3.1 — add_now

First-party evidence:

- MAP Protocol, `MAP Protocol May Updates`, 2026-06-04: https://medium.com/mapprotocol/map-protocol-may-updates-5003b0fc5d8f
- MAP Protocol current protocol description: https://mapprotocol.io/

Supported boundary:

- incident date: **2026-05-20**;
- affected component: **Butter Bridge V3.1 `OmniServiceProxy`** used for cross-chain service between legacy ERC20 MAPO and mainnet MAPO;
- exploit resulted in unauthorized MAPO minting on Ethereum and BSC;
- MAP states the flaw was isolated to a specific Butter Bridge V3.1 path;
- MAP mainnet consensus, validation mechanism, native MAPO, light-client verification, Oracle multisig, and project private keys were stated to be unaffected;
- response included suspension of the affected cross-chain service, replacement/audited contracts, legitimate-holder snapshot mapping, and a Foundation-funded protection/compensation framework.

Decision: **add_now**. Do not import secondary estimates for loss unless claim-relative corroboration is explicitly attached.

## AFX Trade custody bridge — add_now

First-party evidence:

- AFX Trade, `A Detailed Post-Mortem on the AFX Security Incident`, July 2026: https://medium.com/@AFXTrade/a-detailed-post-mortem-on-the-afx-security-incident-57d564ef812f

Independent corroboration:

- The Block, 2026-07-22, citing Blockaid and AFX statements: https://www.theblock.co/news/defi/2026-07-22-arbitrum-protocol-afx-trade-exploit-409482
- BlockSec, July 2026 incident review: https://blocksec.com/blog/defi-security-incidents-afx-trade-ostium

Supported boundary:

- incident date: **2026-07-22**;
- affected component: **AFX-operated custody bridge**, not the Arbitrum native bridge;
- AFX's postmortem states the attack began off-chain with compromise of a developer/software supply chain and ultimately compromised the custody bridge and assets under AFX custody;
- independent technical reporting places the drain at approximately **24.15M USDC** and identifies validator-signing authority as the bridge authorization path;
- AFX suspended bridge operations after detection;
- no smart-contract vulnerability should be asserted for this incident based on the current evidence set.

Decision: **add_now**.

## Gravity Bridge — needs_research, incident existence strongly corroborated

Corroborating evidence currently located:

- The Block, 2026-05-30, reports approximately $5.4M drained from Gravity Bridge and cites security researchers: https://www.theblock.co/news/ecosystems/2026-05-30-cosmos-based-gravity-bridge-drained-of-5-4-million-in-suspected-key-compromise-researchers-say-403108
- DefiLlama identifies a 2026-05-30 bridge incident;
- competing technical reports disagree on the exact mechanism (key/validator compromise vs denom-mapping/registry poisoning).

Because the mechanism is materially disputed and a suitable first-party Gravity Bridge postmortem/statement has not yet been pinned in this tranche, do not canonicalize the attack vector from secondary sources alone.

Decision: **needs_research**. Incident existence and bridge-specific impact are strong, but claim-relative primary evidence is still required before `add_now`.

## Coreum Bridge 2026-08-09 signal — probable duplicate / do-not-add pending exact identity check

The discovery description matches the already-reviewed XRPL-TX Bridge 2026 incident pattern: XRPL/Coreum cross-chain path, fake/self-transfer deposit verification, relayer-authorized XRP withdrawals, approximately 200k XRP, and 94 payments over roughly 97 minutes. Issue #279 already tracks the canonical XRPL-TX Bridge incident for evidence enrichment.

Decision: **probable duplicate**. Do not allocate a new incident unless direct canonical identity comparison proves the Coreum-labelled row is a distinct bridge/event.

## Across 2026-07-17 signal — needs_research

Across' current first-party site confirms Across is an active cross-chain bridge/protocol, but the reviewed first-party material located in this tranche does not establish the July 17 discovery-feed incident.

Decision: **needs_research**; discovery row alone is insufficient.

## tranche result

`add_now` set now contains **five incident candidates**:

1. Alephium Bridge — 2026-05-30
2. Wanchain Cardano–BNB bridge — 2026-07-21
3. Axelar<>Secret IBC Bridge — 2026-06-10
4. MAP Protocol / Butter Bridge V3.1 — 2026-05-20
5. AFX Trade custody bridge — 2026-07-22

Other classifications:

- `probable_duplicate`: Coreum Bridge 2026-08-09, pending exact comparison against canonical XRPL-TX Bridge.
- `needs_research`: Gravity Bridge, Across and remaining tranche candidates.

## canonical application gate

The minimum five-record incident-heavy target is now satisfied at review level. Before allocating IDs:

1. repeat direct duplicate/entity checks against `data/bridges.json` and `data/incidents.json` for all five;
2. reuse existing bridge entities where identity matches rather than creating aliases as new bridges;
3. inspect current tail IDs for bridges/incidents/events/evidence on the latest `main`;
4. preserve unknown values where first-party evidence does not establish loss/recovery/reimbursement/restart/vector;
5. create the canonical Batch 20 branch from latest `main`, not from this review branch;
6. run the full existing validation/build/Series/public-data gate suite without weakening thresholds.
