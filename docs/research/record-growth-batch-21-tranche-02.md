# Record growth Batch 21 — tranche 02 review

Review date: 2026-09-03
Baseline main: `75ed4291f056360974d5215f1c30df0494e9e572`
Baseline counts: 77 bridges / 56 incidents / 257 events / 415 evidence.

## Review rule

This tranche remains incident-heavy. A candidate is not allocated an ID until the canonical datasets are directly checked for duplicate bridge/incident lineage and the evidence package supports bridge/entity boundary, incident boundary, and material lifecycle events. Secondary exploit databases are candidate generators only.

## Candidate A — CrossChainBridge.org / Tixl Token Bridge (December 2021)

Status: **HOLD — strong first-party incident account, preservation/source-quality work still required.**

First-party post-mortem: `Release Native — Post Mortem`, published by the Tixl/Autobahn Network publication on 2022-01-19. It states that unusual activity was detected on 2021-12-29 and the bridge contracts were paused. It separates two bugs: an MEV/front-running path in `releaseNative` that redirected roughly 0.72 ETH from a user and was reimbursed from the Tixl treasury, and a second missing-verification bug that let a signature for a non-native-token deposit be reused to claim ETH through `releaseNative`. The post-mortem states the contracts were paused, a quick fix and bugfix were deployed, and the team contacted the attacker.

Boundary notes:
- Treat the affected product as the CrossChainBridge.org / Tixl Token Bridge, not the Autobahn L1 itself.
- Do not merge the MEV user-loss and the separate native-release exploit into one invented USD loss figure.
- Medium is a preservation-risk host under the existing BIR source-quality regime; do not canonicalize until archive handling can be done without increasing the risky-host queue.

## Candidate B — LI.FI July 2024 contract incident

Status: **REVIEW FOR CANONICAL — durable first-party incident report available.**

First-party: `https://li.fi/knowledge-hub/incident-report-16th-july`, published 2024-07-18. LI.FI states that a newly added smart-contract facet contained a missing validation check, enabling arbitrary calls that affected wallets with infinite approvals. It reports approximately $11.6 million stolen across Ethereum and Arbitrum, 153 affected wallets, and USDC/USDT/DAI among drained assets. The vulnerable facet was disabled across all chains. Recovery efforts and possible full compensation were being evaluated at publication time.

Boundary notes:
- Candidate entity is LI.FI cross-chain aggregation/orchestration infrastructure; determine whether BIR’s existing canonical bridge-aggregator boundary admits this as a bridge entity before allocation.
- This was not a compromise of an underlying third-party bridge. The affected boundary was LI.FI’s contract/facet and user approvals.
- Do not mark compensation completed: the first-party incident report says options were being evaluated.
- Do not infer full recovery.

## Candidate C — Socket / Bungee January 2024 incident

Status: **HOLD — independent/Tier 1 reporting found, durable first-party postmortem not yet found in this review.**

Contemporaneous reporting records a 2024-01-16 Socket security incident affecting wallets with infinite approvals to Socket contracts, contract pausing, roughly $3.3 million drained, and later Bungee operation resumption. This is a plausible BIR bridge-aggregator/interoperability incident, but current review has not yet located a durable first-party incident/postmortem page equivalent to the LI.FI source.

Boundary notes:
- Do not canonicalize from reposted social statements alone if a durable first-party package can be found.
- If promoted, distinguish Socket protocol infrastructure from Bungee UI/aggregator branding and identify the exact affected contract boundary.

## Existing-lineage exclusions from tranche 01 review

Syscoin, TAC and Taiko were already represented in canonical data and remain excluded from new-ID allocation. Orbit Bridge is also existing BIR lineage and is not a new entity candidate for this tranche.

## Next bounded action

1. Direct canonical duplicate audit for `LI.FI`, `Socket`, `Bungee`, `CrossChainBridge.org`, `Tixl`, and `Autobahn` against `data/bridges.json` and `data/incidents.json`.
2. If LI.FI is not duplicate and its aggregator boundary conforms to BIR policy, allocate it first for tranche 02 and build event/evidence records from the first-party incident report plus independent corroboration.
3. Keep Tixl on HOLD until source preservation can satisfy the existing source-quality ceiling.
4. Keep Socket/Bungee on HOLD until a durable first-party source package is found.
