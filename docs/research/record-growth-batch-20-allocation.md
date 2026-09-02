# Record-growth Batch 20 canonical allocation

Issue: #445
Branch: `canonical/growth-batch-20-incident-heavy`
Base: `main` @ `049159e0343d8c9779958f76bfa0bdbcd51852cb`

This file fixes the bounded ID allocation before canonical JSON mutation. The first allocation was superseded after direct inspection of the canonical JSON showed that repository code search had missed existing Wanchain, Axelar–Secret, and AFX records.

## corrected duplicate check result

Direct inspection of `data/bridges.json` and `data/incidents.json` on current `main` is authoritative over code-search indexing.

Already canonical and therefore **not new Batch 20 records**:

- `bir_bridge_000037` — WanBridge / Wanchain Bridge; the July 2026 Cardano–BNB NIGHT incident is already represented in canonical data.
- `bir_bridge_000040` — Axelar–Secret IBC Bridge; its June 2026 exploit is already `bir_inc_000043`.
- `bir_bridge_000041` — AFX Bridge; its July 22, 2026 validator-infrastructure compromise is already `bir_inc_000044`.
- `bir_bridge_000036` — XRPL-TX Bridge; the Coreum-labelled August 2026 discovery signal is the already tracked incident lineage and must not create a second record.
- `bir_bridge_000049` — Across Protocol already exists as an entity. The July 2026 discovery signal remains `needs_research` until an incident-specific evidence package is established.

Current canonical tails remain `bir_bridge_000072`, `bir_inc_000051`, `bir_ev_000246`, and `bir_src_000402`.

## Batch 20 selected shape

Batch 20 is deliberately incident-heavy: **4 new bridge entities / 5 new incidents**.

The Garden entity carries two distinct solver-layer security incidents, which preserves the incident-heavy objective instead of returning to one launch-only bridge per batch.

### bridge allocation

- `bir_bridge_000073` — Alephium Bridge / TokenBridge
- `bir_bridge_000074` — Butter Bridge V3.1 / MAP Protocol legacy-MAPO cross-chain service
- `bir_bridge_000075` — Garden Finance cross-chain atomic-swap protocol
- `bir_bridge_000076` — Gravity Bridge

### incident allocation

- `bir_inc_000052` — Alephium Bridge 2026 forged-message / forged-VAA exploit
- `bir_inc_000053` — Butter Bridge V3.1 2026 unauthorized MAPO mint exploit
- `bir_inc_000054` — Garden Finance 2025 solver infrastructure compromise
- `bir_inc_000055` — Garden Finance 2026 solver database compromise
- `bir_inc_000056` — Gravity Bridge 2026 drain and emergency halt

## initial event allocation

Event IDs are reserved for source-supported incident and response boundaries only.

- `bir_ev_000247` — Alephium exploit/drain, 2026-05-30
- `bir_ev_000248` — Alephium authorized burn of 96.4% of forged wALPH, 2026-06-02
- `bir_ev_000249` — Butter Bridge V3.1 unauthorized mint incident, 2026-05-20
- `bir_ev_000250` — Butter affected cross-chain service suspension/remediation, 2026-05
- `bir_ev_000251` — Garden solver infrastructure compromise, 2025-10-30
- `bir_ev_000252` — Garden user-facing service pause / incident response, 2025-10-30
- `bir_ev_000253` — Garden independent-solver database compromise, 2026-07-26
- `bir_ev_000254` — Garden app taken offline during containment, 2026-07-26
- `bir_ev_000255` — Gravity Bridge drain / incident acknowledgement, 2026-05-30
- `bir_ev_000256` — Gravity validators and orchestrators instructed to halt / bridge halted, 2026-05-30

## evidence allocation

Start at `bir_src_000403`. Each claim remains scoped to what the source actually establishes.

Planned evidence package:

- `bir_src_000403` — Alephium first-party on-chain exploit report
- `bir_src_000404` — independent Alephium technical/security corroboration; any USD valuation remains secondary unless independently reconciled
- `bir_src_000405` — MAP Protocol May 2026 incident update covering Butter Bridge V3.1 and the bounded impact surface
- `bir_src_000406` — independent Butter Bridge technical/on-chain corroboration
- `bir_src_000407` — Garden first-party October 30, 2025 incident report
- `bir_src_000408` — independent Garden 2025 incident corroboration / forensic context
- `bir_src_000409` — Garden July 2026 incident statement or direct spokesperson account establishing the solver-database boundary
- `bir_src_000410` — Blockaid/security corroboration for Garden July 2026 amount/chains if admitted by source-quality policy
- `bir_src_000411` — Gravity first-party incident/halt statement or durable first-party equivalent
- `bir_src_000412` — independent Gravity bridge-drain amount and asset corroboration
- additional evidence IDs are allocated only when claim scope requires them; no filler source objects are added.

## field guardrails

- Unknown loss, recovery, reimbursement, restart, and attack-vector values remain null/unknown when evidence does not establish them.
- Alephium's authorized burn of unbacked wALPH is not equivalent to recovery of the real collateral drained on Ethereum/BSC.
- Butter Bridge V3.1 is the affected MAPO cross-chain service. MAP mainnet consensus, native MAPO, light-client verification, Oracle multisig and project-team keys must not be marked compromised where first-party evidence explicitly excludes them.
- Garden incidents are solver-layer incidents. Garden protocol contracts and user funds must not be marked compromised where first-party evidence explicitly excludes them.
- Garden 2025 and Garden 2026 are separate incidents: the first concerns unauthorized access to a solver operating environment/private-key path; the second concerns compromise of an independent solver's off-chain database and fraudulent swap records.
- Gravity incident existence, bridge-specific drain and emergency halt can be represented, but the exact attack vector remains `unknown` while public technical analyses materially disagree and no authoritative first-party postmortem resolves the mechanism.
- The earlier Wanchain, Axelar–Secret and AFX allocations are void. Their existing canonical IDs must be reused for any future enrichment rather than duplicated.
