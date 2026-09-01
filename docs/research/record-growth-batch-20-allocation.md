# Record-growth Batch 20 canonical allocation

Issue: #445
Branch: `canonical/growth-batch-20-incident-heavy`
Base: `main` @ `049159e0343d8c9779958f76bfa0bdbcd51852cb`

This file fixes the bounded ID allocation before canonical JSON mutation.

## duplicate check result

Repository code search on current `main` returns no canonical match for `Alephium`, `Wanchain`, `Axelar Secret`, `Butter Bridge`, or `AFX`. Current canonical tails are `bir_bridge_000072`, `bir_inc_000051`, `bir_ev_000246`, and `bir_src_000402`.

The Coreum-labelled 2026-08-09 signal is excluded because it remains a probable duplicate of the existing XRPL-TX Bridge incident tracked by #279.

## bridge allocation

- `bir_bridge_000073` — Alephium Bridge / TokenBridge
- `bir_bridge_000074` — Wanchain Cardano–BNB Bridge
- `bir_bridge_000075` — Axelar<>Secret IBC Bridge integration
- `bir_bridge_000076` — Butter Bridge V3.1 / MAP Protocol cross-chain path
- `bir_bridge_000077` — AFX Trade Custody Bridge

Do not alias these to unrelated core protocols: the affected integration/custody-bridge boundary is material for Axelar<>Secret, MAP/Butter, and AFX.

## incident allocation

- `bir_inc_000052` — Alephium Bridge 2026 forged-message exploit
- `bir_inc_000053` — Wanchain Cardano–BNB Bridge 2026 NIGHT theft
- `bir_inc_000054` — Axelar<>Secret IBC Bridge 2026 counterfeit-chain mint/redeem exploit
- `bir_inc_000055` — Butter Bridge V3.1 2026 unauthorized MAPO mint exploit
- `bir_inc_000056` — AFX Trade Custody Bridge 2026 supply-chain / validator-authority compromise

## initial event allocation

At minimum one incident event per incident is required. Additional response/recovery events should be separated only where source-supported.

- `bir_ev_000247` — Alephium exploit/drain, 2026-05-30
- `bir_ev_000248` — Alephium authorized unbacked-wALPH burn, 2026-06-02
- `bir_ev_000249` — Wanchain Cardano–BNB NIGHT theft / response, 2026-07-21
- `bir_ev_000250` — Axelar<>Secret IBC exploit/drain, 2026-06-10
- `bir_ev_000251` — Axelar<>Secret affected bridge path disabled, 2026-06
- `bir_ev_000252` — Butter Bridge V3.1 exploit, 2026-05-20
- `bir_ev_000253` — Butter affected cross-chain service suspension/remediation, 2026-05
- `bir_ev_000254` — AFX custody bridge exploit, 2026-07-22
- `bir_ev_000255` — AFX custody bridge suspension, 2026-07-22

## evidence allocation

Start at `bir_src_000403`. Keep one evidence record per claim/event scope where practical; do not force one source object to support claims it does not establish.

Planned minimum evidence set:

- `000403` Alephium first-party on-chain report
- `000404` independent Alephium technical/security corroboration
- `000405` Midnight Foundation Wanchain incident statement
- `000406` independent Wanchain incident corroboration once pinned; until then do not add unsupported loss/vector values
- `000407` Secret Network Axelar<>Secret incident report
- `000408` independent Axelar<>Secret security corroboration
- `000409` MAP Protocol May incident update
- `000410` MAP Protocol follow-up/AMA incident update
- `000411` AFX Trade detailed postmortem
- `000412` Blockaid/The Block incident corroboration
- `000413` BlockSec technical corroboration

## field guardrails

- Unknown loss/recovery/reimbursement/restart/vector values remain null/unknown when sources do not establish them.
- AFX incident must not be attached to `bir_bridge_000067` Arbitrum Bridge; Arbitrum native bridge was explicitly unaffected.
- Axelar core protocol and Secret core protocol must not be marked compromised by the Axelar<>Secret integration incident.
- MAP mainnet/light-client/Oracle/private keys must not be marked compromised by the Butter V3.1 incident.
- Wanchain incident must not be generalized into a Midnight network or NIGHT-supply compromise.
- Alephium recovery fields must distinguish the authorized burn of unbacked wALPH from recovery of drained real collateral.
