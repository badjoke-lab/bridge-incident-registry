# Record-growth Batch 21 — tranche 05 review

Base main: `560d5a4d316a535655acc1b3abd7983c71533d6f`
Baseline counts: 79 bridges / 58 incidents / 261 events / 420 evidence.

## Ronin Bridge — August 2024 upgrade / whitehat incident — ADD AS INCIDENT ON EXISTING ENTITY

Existing entity: `bir_bridge_000001` Ronin Bridge. Do not create another bridge entity.

### Strong evidence package

1. Ronin-hosted Beosin security audit, Aug 21 2024
   - https://docs.roninchain.com/assets/files/Beosin-Audit-Ronin-Bridge-August-24-cce7cef08749809d6353fe1443711e99.pdf
   - direct technical audit of the affected Ronin Bridge upgrade and recovery scripts;
   - confirms the bridge migration/upgrade left `_operatorWeight` and `_totalOperatorWeight` uninitialized;
   - confirms successful withdrawals were possible using fake credentials before the recovery fix;
   - confirms the recovery proposal set weights and subsequent fake-credential withdrawal failed.

2. The Block contemporaneous report, Aug 6–7 2024
   - https://www.theblock.co/news/regulation/2024-08-06-ronin-bridge-pauses-309707
   - reports approx 4,000 ETH and 2M USDC outflow, bridge pause, Ronin first-party explanation that a governance-deployed bridge upgrade caused the required operator-vote threshold to be misinterpreted, and subsequent full return of ETH and USDC by the whitehat/MEV actors.

### Canonical boundary

- incident date: 2024-08-06;
- this is separate from the March 2022 validator-key compromise already represented by `bir_inc_000001`;
- root cause is an upgrade/configuration initialization failure affecting bridge operator weight / vote threshold, not another key compromise;
- approximately 4,000 ETH and 2M USDC were temporarily withdrawn;
- the bridge was paused roughly 40 minutes after first observed action;
- actors were subsequently treated as whitehats/MEV actors and returned the ETH and USDC;
- Ronin announced a $500,000 bounty;
- user funds were stated to be safe and the bridge's withdrawal limit constrained the outflow;
- do not record the temporary ~$11.8M–$12M valuation as unrecovered loss after full return;
- recovery can be represented as full return of the bridge outflow; reimbursement is not the right lifecycle category because the withdrawn assets themselves were returned;
- reopening should only use a dated event if directly supported by admitted evidence. The audit proves the fix; contemporaneous reporting supports restart after remediation, but preserve precision if an exact time is absent.

### Entity update

If admitted, update `bir_bridge_000001`:
- `major_incident_count`: 1 → 2;
- refresh summary/notes to mention both 2022 and 2024 incident lineages;
- retain status `active`;
- retain `has_unresolved_incident: false` if the 2024 recovery/fix is fully represented and no unresolved incident remains.

### Provisional allocation

- existing bridge: `bir_bridge_000001`
- `bir_inc_000059` — Ronin Bridge 2024 operator-weight initialization incident
- `bir_ev_000262` — abnormal withdrawals / bridge paused, 2024-08-06
- `bir_ev_000263` — ETH and USDC returned / whitehat resolution, 2024-08-06 or 2024-08-07 according to admitted source precision
- `bir_ev_000264` — operator weights fixed and vulnerability verified closed, 2024-08-21 audit publication boundary if no earlier exact deployment date is admitted
- `bir_src_000422` — Ronin-hosted Beosin security audit, technical root cause/fix
- `bir_src_000423` — The Block contemporaneous report, outflow/pause/return context
- additional event-scoped duplicates may be allocated only where required by exact source-count equality.

Admission requires existing schema/data/source-count/source-quality/full-corpus/build/performance/accessibility/browser/Series gates without threshold weakening.
