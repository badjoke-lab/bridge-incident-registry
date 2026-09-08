# Batch 21 tranche 07 review — The Sandbox SAND bridge 2026

Status: REVIEWED CANDIDATE — canonical allocation pending
Baseline main: `09fc93b5b7731b5d700aab8b98e8e28f45448803`
Baseline counts: 80 bridges / 60 incidents / 266 events / 427 evidence

## Duplicate audit

Direct canonical review found no existing The Sandbox / SAND bridge entity or August 21–22, 2026 incident.

## Incident boundary

- attack began Friday 21 August 2026 at approximately 23:41 UTC
- affected bridge configuration: SAND cross-chain / OFT contracts associated with Base and BNB Smart Chain
- operator first-party postmortem states the attacker exploited a vulnerability in contracts associated with the bridge configuration and minted unbacked SAND without a corresponding Ethereum deposit
- bridge operation on the affected Base and BSC paths was disabled during containment
- Ethereum and Polygon SAND / backing assets must not be generalized as compromised unless the first-party postmortem explicitly says so

## Amount boundary

Independent security reporting distinguishes enormous nominal unbacked-mint figures from actual economic extraction. Canonical modeling must not use headline notional token face value as realized loss. The final admitted amount should follow the first-party postmortem's own direct-loss / supply-impact boundary and be cross-checked against independent reporting before ID allocation.

## Technical boundary

Independent analysis attributes the exploit to abuse of LayerZero delegate permissions through `approveAndCall` on the affected SAND OFT deployment. Treat this as provisional until the exact wording and contract-level sequence are extracted from the first-party August 27 postmortem.

Do not model the incident as a compromise of LayerZero's global protocol or as an Ethereum/Polygon SAND exploit without direct evidence.

## Primary evidence

- The Sandbox, `August 22 Exploit Post-Mortem`, published 2026-08-27
  - https://www.sandbox.game/en/blog/?category=2
  - official news index exposes the postmortem and states that on 21 August at 23:41 UTC an attacker exploited contracts associated with the Base/BSC bridge configuration, enabling unbacked SAND minting without a corresponding Ethereum deposit

## Independent evidence reviewed

- CoinDesk contemporaneous coverage of The Sandbox stopping Base and BNB Chain bridging after the exploit
- security reporting summarized by AVOID / Blockaid-derived analysis for the LayerZero delegate / `approveAndCall` mechanism

## Canonical guardrails

- obtain the direct first-party postmortem article body/permalink before canonical mutation
- separate nominal unbacked mint quantity from realized attacker proceeds and actual protocol/user loss
- preserve Base and BSC as affected bridge paths; do not infer broader chain compromise
- preserve recovery and reimbursement as unknown until directly supported
- do not infer unrestricted reopening
- require primary evidence on each canonical event to avoid source-quality regression
