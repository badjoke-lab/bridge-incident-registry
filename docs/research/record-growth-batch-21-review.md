# Record-growth Batch 21 review

Issue: #447
Branch: `review/growth-batch-21-incident-heavy`
Base: `main` @ `61695f4fbdd215c9d55d70104df3a8c7f8dfe5e9`

Batch 21 continues incident-heavy historical growth. Direct canonical JSON inspection is authoritative over repository code search before ID allocation.

## Baseline

- Bridges: 75
- Incidents: 54
- Events: 252
- Evidence: 410
- current retained tails: `bir_bridge_000075`, `bir_inc_000054`, `bir_ev_000252`, `bir_src_000411`

## Duplicate corrections from fresh candidate intake

The following apparently fresh 2026 incidents are already canonical and must not be duplicated:

- Syscoin UTXO–NEVM Bridge — existing `bir_bridge_000034`; June 2026 cross-layer interpretation exploit already represented.
- TAC Inner Bridge — existing `bir_bridge_000035` / `bir_inc_000037`; May 2026 TON/TAC jetton verification exploit already represented.
- Taiko Bridge — existing `bir_bridge_000031` / `bir_inc_000033`; June 2026 forged proof/state exploit already represented.

## New candidate decisions

### Dusk to EVM bridge service — ADD NOW pending canonical field application

Primary evidence:

- Dusk, `Bridge Incident Post-Mortem`, 2026-03-10
- https://dusk.network/news/bridge-incident-post-mortem/

Supported boundary:

- incident date: 2026-01-16;
- unauthorized access to a signing wallet used by the Dusk-to-EVM bridge service;
- Dusk explicitly distinguishes the event from a consensus failure or protocol exploit in Dusk itself;
- first-party postmortem documents direct theft on Dusk and subsequent movement through the bridge path to BNB Smart Chain;
- at least 9,000 DUSK is explicitly established in the opening on-chain sequence; no aggregate USD loss is assigned until the full first-party amount/recovery sequence is reconciled.

Canonical guardrails:

- classify the compromise at the bridge signing-wallet / service layer, not as a Dusk consensus exploit;
- do not infer full loss, recovery, reimbursement, or restart from the existence of the postmortem alone;
- keep any later hardening/reopening claim tied to a dated first-party source.

Fresh direct canonical search/inspection found no existing Dusk bridge entity or Dusk incident record.

### Hyperbridge Token Gateway — ADD NOW

Primary evidence:

- Hyperbridge, `Security Update: Token Gateway Exploited via Forged Proofs`, 2026-04-13
- https://blog.hyperbridge.network/security-update-forged-proofs/
- Hyperbridge, `Post-Mortem: Hyperbridge MMR Verifier Exploit, April 13, 2026`, 2026-05-14
- https://blog.hyperbridge.network/april-13-post-mortem/
- Hyperbridge, `Update on Recovery Efforts and Next Steps`, 2026-04-16
- https://blog.hyperbridge.network/recovery-and-next-steps/

Independent corroboration:

- BlockSec weekly analysis, 2026-04-22
- https://blocksec.com/blog/weekly-web3-security-incident-roundup-apr-13-apr-19-2026

Supported boundary:

- incident date: 2026-04-13;
- MMR proof-verification input validation failure allowed forged cross-chain proof/message acceptance;
- impact was isolated to Hyperbridge Token Gateway settlement/bridged-asset paths rather than Polkadot consensus;
- initial first-party update reported roughly USD 237k realized loss on Ethereum, while later first-party recovery update revised the scope to multiple connected EVM networks and more than USD 2m realized loss; canonical amount must use the later reconciled first-party assessment rather than the initial number;
- all bridging operations were paused after detection;
- permanent patch was deployed within days and a later first-party relaunch exists, but reopening must be represented only with its dated relaunch source.

Fresh direct canonical search/inspection found no Hyperbridge entity or incident record.

### ICON Network migration bridge / SODAX withdrawal path — HOLD FOR BOUNDARY REVIEW

Primary evidence located:

- ICON Foundation, `ICON Network: Replay Exploit Post-Mortem`, published 2026-08-30/31 window
- https://www.icon.foundation/blog/2026/icon-network-replay-exploit-post-mortem

The postmortem ties the exploit to the ICON migration contract and SODAX Asset Manager withdrawal-message path and documents a replay/serial-number uniqueness defect. However Batch 21 must first decide whether this migration/withdrawal path is a standalone BIR bridge entity or belongs under a broader SODAX/ICON interoperability lineage. No canonical record is created until that entity boundary is resolved.

### thirdweb legacy Bridge — HOLD FOR ENTITY/LIFECYCLE REVIEW

Primary evidence located:

- thirdweb, `Smart Contract Incident Report: Legacy Bridge Vulnerability`, 2025-12-12
- https://blog.thirdweb.com/smart-contract-incident-report-legacy-bridge-vulnerability/

The report establishes unauthorized activity on a legacy Bridge contract that remained active after an earlier 2025 vulnerability response, with exploitation limited to a user wallet that retained unlimited ERC20 approvals. Before canonical admission, Batch 21 must distinguish the deprecated legacy contract from current thirdweb bridge infrastructure and determine whether the incident is a bridge-protocol incident or an approval-drain against residual legacy contract permissions.

## Batch 21 first tranche

Proceed with two clean new incident lineages first:

1. Dusk to EVM bridge service — signing-wallet compromise.
2. Hyperbridge Token Gateway — forged-proof / MMR verification exploit.

Do not allocate ICON or thirdweb IDs yet. Do not recycle Garden 2026 or Gravity 2026 from Batch 20 unless a new primary/Tier 1 evidence package materially changes their previous deferral decision.

## Quality boundary

- Every new bridge must have primary and Tier 1 evidence.
- Every new incident and each canonical event must preserve the existing source-quality no-regression ceilings.
- Secondary exploit databases remain candidate generators only.
- Unknown amounts, recovery, reimbursement, restart, affected routes, and attack-vector details remain unknown rather than inferred.
- No launch-only filler is added to satisfy bridge-count growth.
