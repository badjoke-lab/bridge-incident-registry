# Record growth Batch 21 — tranche 02 review

Review date: 2026-09-04
Baseline main: `75ed4291f056360974d5215f1c30df0494e9e572`
Baseline counts: 77 bridges / 56 incidents / 257 events / 415 evidence.

## Review rule

This tranche remains incident-heavy. A candidate is not allocated an ID until the canonical datasets are directly checked for duplicate bridge/incident lineage and the evidence package supports bridge/entity boundary, incident boundary, and material lifecycle events. Secondary exploit databases are candidate generators only.

## Candidate A — CrossChainBridge.org / Tixl Token Bridge (December 2021)

Status: **HOLD — fresh lineage confirmed; strong first-party incident account, preservation/source-quality work still required.**

First-party post-mortem: `https://medium.com/@AutobahnNetworkEditor/release-native-post-mortem-378d7b42305d`, published by the Tixl/Autobahn Network publication on 2022-01-19. It states that unusual activity was detected on 2021-12-29 and the bridge contracts were paused. It separates two bugs: an MEV/front-running path in `releaseNative` that redirected roughly 0.72 ETH from a user and was reimbursed from the Tixl treasury, and a second missing-verification bug that let a signature for a non-native-token deposit be reused to claim ETH through `releaseNative`. The post-mortem states the contracts were paused, a quick fix and bugfix were deployed, and the attacker returned a significant part of the stolen ETH.

Direct canonical duplicate audit on 2026-09-04 found no `Tixl`, `CrossChainBridge.org`, or equivalent bridge/incident lineage in `data/bridges.json` / `data/incidents.json`.

Boundary notes:
- Treat the affected product as the CrossChainBridge.org / Tixl Token Bridge, not the Autobahn L1 itself.
- Do not merge the MEV user-loss and the separate native-release exploit into one invented USD loss figure.
- The post-mortem supports the 0.72 ETH MEV user loss and treasury reimbursement separately from the second releaseNative exploit.
- Medium is a preservation-risk host under the existing BIR source-quality regime; do not canonicalize until archive handling can be done without increasing the risky-host queue.

## Candidate B — LI.FI July 2024 contract incident

Status: **EXCLUDE — duplicate canonical lineage already exists.**

Direct canonical inspection found:
- bridge entity: `bir_bridge_000013` — LI.FI, type `bridge_aggregator`, active, major incident count 2;
- incident: `bir_inc_000016` — `li-fi-2024-facet-approval-exploit`;
- canonical incident already records the 2024-07-16 facet validation failure, 153 affected wallets, Ethereum + Arbitrum, USDC/USDT/DAI, approximately $11.6 million official incident estimate, unknown final recovery, and unresolved compensation/restart follow-up.

The first-party incident report discovered in this tranche is therefore not a new-record basis. Any future LI.FI work belongs to existing-record follow-up/evidence remediation, not record-growth allocation.

## Candidate C — Socket / Bungee January 2024 incident

Status: **EXCLUDE — duplicate canonical lineage already exists.**

Direct canonical inspection found an existing `SOCKET Protocol` bridge entity with type `bridge_aggregator`, aliases including `Socket`, `Bungee`, `Socket Gateway`, and `Bungee Bridge`. Its canonical summary already states the January 2024 approval-related exploit, approximately $3.3 million reported loss, rapid restoration, and recovery of 1,032 ETH. Bungee is explicitly treated as a SOCKET ecosystem product/interface rather than a separate bridge entity.

No new bridge or incident ID is to be allocated for Socket/Bungee in this tranche. Any durable first-party source found later should be evaluated as evidence remediation against the existing lineage.

## Existing-lineage exclusions

The direct duplicate audit now excludes the following from new-ID allocation:
- LI.FI — existing `bir_bridge_000013` and `bir_inc_000016` for the July 2024 incident;
- SOCKET / Bungee — existing SOCKET Protocol lineage already includes the January 2024 incident;
- Syscoin, TAC and Taiko — already represented from tranche 01 review;
- Orbit Bridge — existing BIR lineage.

## Current tranche 02 disposition

There is no justified new canonical allocation from LI.FI or Socket/Bungee. The only fresh lineage remaining in the reviewed set is CrossChainBridge.org / Tixl Token Bridge, and it remains blocked by preservation/source-quality requirements rather than by incident evidence quality.

## Next bounded action

1. Attempt reproducible archive preservation for the Tixl/Autobahn first-party Medium post-mortem under the existing BIR archive-risk rules.
2. If preservation can be satisfied without worsening the risky-host ceiling, allocate the Tixl bridge/incident and build event/evidence records with the two exploit paths kept distinct.
3. If preservation cannot be satisfied, leave Tixl deferred and move to the next incident-heavy candidate pool rather than weakening the source-quality gate.
4. Do not allocate new IDs for LI.FI or Socket/Bungee.
