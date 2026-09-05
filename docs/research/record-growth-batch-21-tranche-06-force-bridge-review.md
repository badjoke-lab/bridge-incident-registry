# Batch 21 tranche 06 review — Force Bridge 2025

Status: reviewed for canonical promotion
Baseline main: `ca24a637717755476b5ceeb9586720bb8e6064f1`
Baseline counts: 79 bridges / 59 incidents / 263 events / 423 evidence

## Decision

**ADD NOW — Force Bridge (Nervos / Magickbase)**

No current canonical `Force Bridge` entity or incident was found in the direct repository duplicate check.

## Incident boundary

- incident window: 2025-05-31 to 2025-06-01
- affected bridge: Force Bridge, the Nervos CKB bridge to Ethereum / BNB Chain operated by Magickbase
- root cause: malicious Docker image deployed to validator nodes during an April upgrade; the image exfiltrated private validator keys to a remote endpoint
- compromised keys were then used for irregular / unauthorized unlocking transactions on Ethereum and BNB Chain
- Magickbase states this was an internal security failure / private-key compromise, **not a vulnerability in Force Bridge smart contracts**
- Force Bridge was paused after the incident and later declared no longer operational in the compensation announcement

## Amount boundary

Independent reporting and security analysis place the stolen value around USD 3.7–3.9 million. Canonical modeling should prefer the amount directly supported by the admitted evidence and preserve asset-level quantities where available. Do not infer a different final loss from later market prices.

## Recovery / reimbursement boundary

The June 21 Magickbase/Nervos Talk incident report said Magickbase would advance full compensation if stolen funds were not recovered in a reasonable timeframe.

The June 28 compensation announcement then established a concrete reimbursement program for affected Force Bridge asset holders, with a claim portal, token-burning verification, weekly snapshots and weekly payouts. This supports `reimbursement_status: in_progress` at that date, not automatic completion.

No final completed-reimbursement state is admitted in this tranche unless a later first-party completion source is independently reviewed.

## Lifecycle boundary

Force Bridge had already been scheduled for sunset before the exploit. The June 28 first-party compensation announcement states that Force Bridge was no longer operational and users should not rely on it for transfers. This supports a terminal lifecycle state, but the exploit must not be falsely described as the original reason the sunset was planned.

## Primary evidence

1. Magickbase / Nervos Talk — `Force Bridge Incident: Root Cause Analysis & User Commitment`, 2025-06-21
   - https://talk.nervos.org/t/force-bridge-incident-root-cause-analysis-user-commitment/8801
   - supports malicious Docker image, validator-key exfiltration, April compromise timeline, investigation and user-protection commitment

2. Magickbase / Nervos Talk — `Force Bridge User Compensation Plan Announcement`, 2025-06-28
   - https://talk.nervos.org/t/force-bridge-user-compensation-plan-announcement/8810
   - supports private-key compromise boundary, no smart-contract vulnerability, terminal bridge status and structured compensation program

## Independent evidence

- The Block — `Hackers drain over $3 million in crypto from Nervos Network’s Force cross-chain bridge, say security analysts`, 2025-06-02
  - supports public loss estimate, affected assets, pause and incident context
- Halborn — `Explained: The Force Bridge Hack (June 2025)`, 2025-06-10
  - supports independent technical context for privileged access / drain while avoiding unsupported attribution beyond later first-party findings

## Canonical rules for this tranche

- add a new Force Bridge entity and one incident
- model exploit, suspension/terminal status and compensation-plan milestones only where evidence is explicit
- do not classify this as a smart-contract code exploit
- do not mark reimbursement completed without later completion evidence
- do not infer fund recovery
- do not merge Force Bridge with later Nervos/UTXO interoperability products
- preserve the pre-existing sunset decision separately from the exploit cause
