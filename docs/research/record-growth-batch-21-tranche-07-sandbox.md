# Batch 21 tranche 07 — The Sandbox SAND bridge 2026

Status: ADD NOW
Baseline main: `09fc93b5b7731b5d700aab8b98e8e28f45448803`
Baseline counts: 80 bridges / 60 incidents / 266 events / 427 evidence

## Duplicate audit

Direct canonical review found no existing The Sandbox / SAND bridge entity or August 21–22, 2026 incident.

## Canonical allocation

- bridge: `bir_bridge_000081` — The Sandbox SAND Bridge
- incident: `bir_inc_000061` — The Sandbox 2026 Base/BSC bridge-configuration exploit
- events: `bir_ev_000267`–`bir_ev_000269`
- evidence: `bir_src_000429`–`bir_src_000432`
- reference asset: `sand`

## Incident boundary

- attack began 2026-08-21 at approximately 23:41 UTC
- affected paths: SAND bridge configuration on Base and BNB Smart Chain, backed from Ethereum
- The Sandbox's official blog index exposes the August 27 postmortem and states that the attacker exploited contracts associated with the Base/BSC bridge configuration, minting unbacked SAND without a corresponding Ethereum deposit
- affected Base/BSC bridging was disabled during containment
- Ethereum and Polygon SAND are not modeled as compromised

## Amount boundary

Canonical realized-loss amount is **14,742,341.84 SAND**, approximately **$697,000** at the incident-period valuation reported from the operator postmortem by independent coverage.

Do not use the enormous nominal unbacked-mint / face-value estimates as realized loss. Those figures describe synthetic mint capacity, not the amount actually drained from the Ethereum backing vault.

## Technical boundary

Independent technical reporting describes abuse of the affected SAND cross-chain configuration / delegated call path. Canonical classification is conservatively `configuration_error`; BIR does not generalize the incident into a LayerZero-wide protocol compromise.

## Reimbursement boundary

By 2026-09-08 The Sandbox's official blog published `SAND Compensation: How the Claim Process Works`, stating that a full compensation plan had been committed for affected users and explaining eligibility and claims. Record reimbursement as `in_progress`, not `completed`.

## Evidence

1. The Sandbox — `August 22 Exploit Post-Mortem`, 2026-08-27
   - https://www.sandbox.game/blog/?category=2
2. The Sandbox — `SAND Compensation: How the Claim Process Works`, 2026-09-08
   - https://www.sandbox.game/en/blog/
3. CoinDesk — `Web3 gaming network Sandbox stops Base and BNB chain bridging after exploit`, 2026-08-22
   - https://www.coindesk.com/web3/2026/08/22/web3-gaming-network-sandbox-stops-base-and-bnb-chain-bridging-after-exploit
4. Crypto Payments News — `The Sandbox Retires SAND Bridge After Exploit, Plans 1:1 Compensation`, 2026-08-28
   - https://cryptopaymentsnews.com/sandbox-sand-bridge-exploit-compensation/

## Modeling guardrails

- preserve `sand` as a reference asset; Base, BNB Chain and Ethereum already exist in the chain vocabulary
- do not convert nominal unbacked-mint face value into realized loss
- do not infer attacker-fund recovery
- reimbursement is in progress, not completed
- do not infer unrestricted Base/BSC bridge reopening
- do not describe Ethereum, Polygon, or LayerZero globally as compromised
- each canonical event must retain primary evidence to preserve source-quality no-regression

Expected counts after canonical mutation: 81 bridges / 61 incidents / 269 events / 431 evidence.
