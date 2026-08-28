# Record-growth Batch 05 review authority

Issue: #385
Program: #365
Reviewed at: 2026-08-28

## Decision

`add_now` for five bridge lifecycle entities. This review does not authorize any new incident records.

## 1. Meson

- canonical identity: `Meson`
- type: cross-chain asset-transfer / swap protocol
- launch boundary: mainnet launched 2021-12-01
- first-party launch source: https://medium.com/@mesonfi/hello-world-i-am-meson-e3c76411345a
- current official product: https://meson.fi/

Boundary rules:
- preserve the 2021-12-01 mainnet launch as a lifecycle event;
- initial launch chains may be recorded as BSC, Polygon, Fantom and Avalanche where chain references exist;
- do not infer security outcomes from the launch article or current operation;
- no exploit, loss, recovery or reimbursement record is authorized.

## 2. Symbiosis

- canonical identity: `Symbiosis`
- type: cross-chain liquidity / token-routing bridge protocol
- launch boundary: V1 beta-mainnet launched in 2022; March 2022 first-party product material establishes the launch window
- first-party lifecycle source: https://medium.com/symbiosis-fi/symbiosis-2022-recap-879d7676f8eb
- first-party launch-window source: https://medium.com/@symbiosis_fi/list/0b2f7fadec37
- current official product: https://symbiosis.finance/

Boundary rules:
- use month/year precision unless an exact first-party launch day is established during canonicalization;
- distinguish beta-mainnet launch from earlier testnet availability;
- current cross-chain architecture and later protocol versions are lifecycle context, not separate incidents;
- no exploit, loss, recovery or reimbursement record is authorized.

## 3. Orbiter Finance

- canonical identity: `Orbiter Finance`
- type: decentralized cross-rollup / interoperability bridge
- launch boundary: Orbiter Alpha was already launched by 2021-12-30
- first-party historical source: https://orbiter-finance.medium.com/introduce-orbiter-finance-6520b878ea0c
- current official architecture source: https://docs.orbiter.finance/welcome/bridge-protocol
- current official product: https://orbiter.finance/

Boundary rules:
- do not treat 2021-12-30 as the exact launch day unless another first-party source proves that date; year precision is safe, with the publication date usable only as an evidence boundary;
- initial reviewed support included Ethereum mainnet, zkSync and Arbitrum;
- later bridge-to-rollup / interoperability evolution remains lifecycle context inside the same entity unless a separate canonical boundary is proven;
- no incident is authorized from security-model descriptions or later product evolution.

## 4. Router Protocol

- canonical identity: `Router Protocol`
- type: cross-chain bridge / interoperability protocol
- launch boundary: public alpha mainnet launched 2022-01-27
- first-party launch source: https://routerprotocol.medium.com/router-protocol-alpha-mainnet-launch-148105aed99b
- first-party lifecycle source: https://routerprotocol.medium.com/introducing-voyager-go-anywhere-everywhere-112536a59c09
- current official product: https://www.routerprotocol.com/

Boundary rules:
- preserve 2022-01-27 as the reviewed alpha-mainnet lifecycle event;
- launch material supports cross-chain transfers/swaps and arbitrary messaging; classify conservatively within existing BIR bridge/interoperability types;
- Router Chain, Nitro and later chain-abstraction evolution remain lifecycle/architecture context unless evidence requires a separate entity boundary;
- no exploit, loss, recovery or reimbursement record is authorized.

## 5. ChainPort

- canonical identity: `ChainPort`
- type: cross-chain asset bridge
- launch boundary: launched in 2021; exact launch day not established by the reviewed first-party sources
- first-party historical source: https://medium.com/chainport/chainport-the-bridge-that-leads-to-every-blockchain-d7184d91a403
- first-party historical confirmation: https://medium.com/chainport/chainport-launching-the-perpetual-portx-staking-contract-ad32f7c670eb
- current official product: https://www.chainport.io/

Boundary rules:
- use year precision for launch unless stronger first-party evidence establishes an exact date;
- current support for multiple bridge architectures is lifecycle/architecture context rather than a reason to split the canonical entity;
- statements about security, custody percentages or speed are not safety ratings and should not be converted into incident conclusions;
- no exploit, loss, recovery or reimbursement record is authorized.

## Deferred / needs_research

### Layerswap

Current bridge identity is clear, but the reviewed source set does not yet establish a sufficiently strong initial launch/lifecycle boundary for this batch.

### Mayan Finance

Current intent-based bridging / cross-chain execution identity is clear, but the relationship among early Wormhole Swap, later Swift, MCTP and the current Mayan protocol needs a cleaner historical launch boundary before canonical promotion.

### HECO Bridge / HECO Chain gateway 2023

Remains `needs_research`. Do not reuse HTX hot-wallet loss figures as bridge-specific losses.

## Canonicalization guardrails

- repeat fresh-main duplicate audits before allocating IDs;
- allocate only new bridge/event/evidence IDs; incident count remains 51 unless a separately reviewed incident boundary is proven outside this authorization;
- every bridge must have primary/Tier-1 evidence before merge;
- lifecycle events must be directly supported by linked evidence;
- bridge identity, lifecycle state and confidence must not be presented as a safety score;
- do not weaken source-count, source-quality, schema, Series, build, accessibility, performance, dist, browser, or production-equality checks;
- do not raise validation or performance ceilings to accommodate corpus growth;
- temporary write helpers, if needed for large JSON deltas, must never merge.

Expected minimum after canonicalization: 55 bridges / 51 incidents. Event/evidence counts are determined by reviewed lifecycle evidence rather than padding.
