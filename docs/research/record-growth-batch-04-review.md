# Record-growth Batch 04 review authority

Issue: #381
Program: #365
Reviewed at: 2026-08-28

## Decision

`add_now` for five bridge lifecycle entities. This review does not authorize any new incident records.

## 1. deBridge

- canonical identity: `deBridge`
- type: interoperability protocol / cross-chain bridge
- launch boundary: mainnet launched 2022-02-17
- initial first-party supported chains: Ethereum, BSC, HECO, Arbitrum, Polygon
- current official source: https://debridge.com/
- launch source: https://debridge.com/learn/blog/debridge-mainnet-is-here/

Boundary rules:
- preserve the mainnet launch as a lifecycle event;
- do not turn the 2022 attempted cyberattack against the team into a bridge incident without evidence of bridge-operation impact;
- no loss amount or reimbursement fields are authorized.

## 2. Gnosis OmniBridge

- canonical identity: `OmniBridge`
- operator/ecosystem: Gnosis Chain
- type: canonical/native token bridge built on AMB
- current official source: https://docs.gnosischain.com/bridges/About%20Token%20Bridges/omnibridge
- current chain boundary: Ethereum <-> Gnosis Chain

Boundary rules:
- retain current and legacy interface distinction in notes/brand history;
- scheduled protocol pauses are lifecycle events only, not incidents;
- do not infer launch date where the reviewed source does not establish one precisely.

## 3. Hop Protocol

- canonical identity: `Hop Protocol`
- type: rollup-to-rollup general token bridge
- launch boundary: mainnet live July 2021
- official source: https://docs.hop.exchange/developer-docs/other/faq
- architecture source: https://docs.hop.exchange/basics/faq/what-is-hop-protocol

Boundary rules:
- v1 remains the current production lineage in the reviewed docs;
- v2 work-in-progress/testnet context is lifecycle/architecture context only;
- no exploit or loss record is authorized.

## 4. Across Protocol

- canonical identity: `Across Protocol`
- type: intent-based cross-chain bridge / interoperability protocol
- current first-party source: https://acrossprotocol.org/
- first-party repository/docs context: https://github.com/across-protocol/user-docs

Boundary rules:
- record the current bridge identity and intent/relayer settlement architecture;
- absence of a reviewed hack does not become a `no incidents` safety claim beyond the historical corpus boundary;
- launch date remains unknown unless a first-party source establishes it.

## 5. Stargate Finance

- canonical identity: `Stargate Finance`
- type: cross-chain liquidity / asset bridge
- current first-party source: https://stargate.finance/about
- historical launch boundary: 2022, with March 2022 supported by contemporaneous material

Boundary rules:
- record bridge/lifecycle identity and current multi-chain scope conservatively;
- do not infer incidents or security outcomes from marketing claims;
- if exact launch day is not established by reviewed first-party material, use month/year precision only.

## Deferred

HECO Bridge / HECO Chain gateway 2023 remains `needs_research`. Do not reuse HTX hot-wallet loss figures as bridge-loss figures.

## Canonicalization guardrails

- fresh-main duplicate audit must remain negative for all five entities;
- allocate only new bridge/event/evidence IDs; incident count remains 51 in this batch;
- every bridge must have primary/Tier-1 evidence before merge;
- lifecycle events must be directly supported by their linked evidence;
- do not weaken source-quality, schema, Series, build, accessibility, performance, or dist checks;
- do not raise performance ceilings to accommodate corpus growth.

Expected minimum after canonicalization: 50 bridges / 51 incidents.