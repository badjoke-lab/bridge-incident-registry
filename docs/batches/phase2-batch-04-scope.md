# Phase 2 Batch 4 Scope

## Purpose

Phase 2 Batch 4 expands BIR beyond asset-transfer bridges into messaging and interoperability infrastructure.

The batch is designed to cover three different incident classes:

- a successful liquidity-backed bridge exploit
- an omnichain token-infrastructure compromise with supply inflation and recovery actions
- ecosystem-wide critical interoperability vulnerabilities handled through coordinated emergency patching

Candidate inclusion remains review-gated. A candidate may be replaced if entity boundaries, incident relevance, or source quality fail during canonical preparation.

## Selected candidates

### 1. Nerve Bridge / NerveNetwork

Proposed record shape:

```text
1 bridge/interoperability entity
1 incident record
exploit, liquidity-loss, response, restoration, and current-status events
```

Proposed incident:

1. November 15, 2021 Nerve Bridge metapool exploit

Why included:

- NerveNetwork operates heterogeneous-chain interoperability and the Nerve Bridge application.
- BlockSec identified a successful attack against the fUSDT and UST metapools on BNB Chain.
- The attacker reportedly exhausted affected pool liquidity and gained approximately 900 BNB.
- The root cause was an inconsistent exchange-amount calculation in Saddle-derived metapool code, closely related to the Synapse bug recorded in Batch 3.
- Unlike the Synapse event, the Nerve Bridge attacker successfully extracted value, making the two records useful as a controlled comparison.

Key modeling questions:

- determine whether the canonical entity name should be `NerveNetwork`, `Nerve Bridge`, or `NerveNetwork / Nerve Bridge`
- distinguish the base interoperability network, bridge application, DEX, and affected metapools
- establish whether an official incident statement or compensation notice exists; current evidence is led by independent security analysis
- preserve 900 BNB as the primary asset-denominated amount and qualify any fiat conversion
- verify pause, restoration, reimbursement, and current operating status
- keep this entity separate from Synapse despite the shared vulnerable code lineage and the historical Nerve-to-Synapse branding relationship

Initial sources:

- https://blocksec.com/blog/the-analysis-of-nerve-bridge-security-incident
- https://www.halborn.com/blog/post/explained-the-synapse-and-nerve-bridge-hacks-november-2021
- https://nerve.network/
- https://docs.nerve.network/Guide/
- https://nervenetwork.medium.com/nervenetwork-is-partnering-with-tron-1dd4942972ee

### 2. Holograph Protocol

Proposed record shape:

```text
1 interoperability / omnichain token entity
1 incident record
unauthorized mint, protocol lock, account freeze, token burn, audit, and brand-status events
```

Proposed incident:

1. June 13, 2024 HLG unauthorized-mint incident

Why included:

- Holograph operated as an omnichain tokenization protocol intended to preserve token identity and liquidity across chains.
- A malicious actor reportedly exploited an operator-contract path to mint 1 billion unauthorized HLG on Mantle.
- Holograph stated that the initial vulnerability was patched, the protocol was temporarily locked, exchange partners froze at least part of the minted supply, and law-enforcement recovery was pursued.
- A burn plan began with 53,249,975 HLG, with further burns intended to restore the planned total supply.
- The incident provides an interoperability-layer example where the primary damage was unauthorized omnichain token supply rather than direct bridge-vault drainage.

Boundary rule:

- include Holograph only if the affected operator contract is established as part of the cross-chain tokenization infrastructure
- do not treat token-price decline itself as the incident
- unauthorized minted supply, tokens sold, tokens frozen, and tokens burned must remain separate quantities
- if the incident cannot be tied materially to interoperability infrastructure, replace this candidate before the canonical PR

Key modeling questions:

- resolve the relationship between the 2024 omnichain protocol and the current Holograph trading-terminal branding
- determine whether the canonical status is `active`, `migrated`, `rebranded`, `inactive`, or another supported state
- capture stable URLs for Holograph's official incident statements on X
- verify whether the promised full Halborn incident report was published
- distinguish the 1 billion unauthorized mint from the amount actually sold or frozen
- avoid converting the token mint into a definitive fiat loss without a clearly dated valuation basis

Initial sources:

- Holograph official incident and recovery statements on X, to be captured by stable URL during record preparation
- https://chainwire.org/2024/06/19/holograph-announces-hlg-burn-plan-followed-by-technical-partnership-with-cybersecurity-specialist-halborn/
- https://blockchaingroup.io/investigation-insights/holograph-hack-where-1-billion-tokens-went/
- https://www.cointelegraph.com/news/holograph-hacked-for-1-billion-hlg-tokens-worth-14-million
- https://docs.holograph.xyz/

### 3. Inter-Blockchain Communication Protocol / ibc-go

Proposed record shape:

```text
1 interoperability-protocol entity
2 incident records
coordinated disclosure, emergency patch, ecosystem adoption, retrospective, and current-security events
```

Proposed incidents:

1. October 2022 Dragonberry critical IBC vulnerability response
2. April 2023 Huckleberry IBC-connected full-node vulnerability response

Why included:

- IBC is a general interoperability protocol used by a large population of sovereign chains rather than a single bridge application.
- The Dragonberry advisory described a critical vulnerability affecting all IBC-enabled Cosmos chains and triggered a confidential, coordinated patch process.
- The official retrospective stated that vulnerability discovery is not itself exploitation, while explaining that the BSC exploit increased concern that a knowledgeable attacker might independently discover the bug.
- Huckleberry provides a second coordinated vulnerability-response case affecting IBC-connected full nodes.
- These incidents add ecosystem-wide prevention and patch coordination to BIR's aftermath model without misrepresenting unexploited vulnerabilities as stolen-fund incidents.

Key modeling questions:

- determine whether the entity should be `IBC Protocol`, `ibc-go`, or an entity plus implementation relationship
- establish whether security advisories qualify as incident cases or should remain event-only context
- explicitly record zero known user-fund loss where supported
- distinguish protocol specification, ibc-go implementation, Cosmos SDK dependencies, and individual chain responses
- avoid claiming every IBC-connected chain was upgraded at the same time
- capture patch thresholds, release chronology, and retrospective findings from official sources
- verify current supported ibc-go release lines and active-protocol status at record time

Initial sources:

- https://forum.cosmos.network/t/ibc-security-advisory-dragonberry/7702
- https://forum.cosmos.network/t/cosmos-sdk-ibc-vulnerability-retrospective-security-advisories-dragonberry-and-elderflower-october-2022/8735
- https://forum.cosmos.network/t/ibc-security-advisory-huckleberry/10731
- https://github.com/cosmos/ibc-go/security
- https://github.com/cosmos/ibc-go
- https://ibcprotocol.dev/

## Duplicate and boundary check

Repository code and pull-request searches found no existing canonical references for:

```text
Nerve Bridge
NerveNetwork
Holograph Protocol
IBC Protocol
ibc-go
Dragonberry
Huckleberry
```

Before canonical creation, direct JSON checks must cover:

- normalized canonical name
- slug and aliases
- official and historical domains
- operator versus protocol versus product boundaries
- predecessor, successor, and rebrand relationships
- incident overlap with existing Synapse and other bridge records

## Provisional batch shape

```text
Bridges     +3
Incidents   +4
Events      +14 to +22
Evidence    +18 to +28
```

Expected totals if all candidates survive review:

```text
Bridges     22
Incidents   29
Events      100 to 108
Evidence    125 to 135
```

Exact counts are not fixed until entity boundaries and source review are complete.

## Quality rules

- successful theft, prevented exploitation, vulnerability disclosure, and emergency patching must remain distinct outcomes
- unauthorized token supply must not be converted automatically into user or protocol loss
- asset-denominated amounts are preferred when fiat valuation is unstable or disputed
- official advisories and retrospectives are preferred for coordinated vulnerability-response records
- independent security analysis may support root cause when no official postmortem exists
- current branding and current protocol operation must be verified separately from historical incident identity
- unresolved reimbursement, recovery, and burn completion must remain explicit
- temporary generators or write-enabled workflows must not remain after canonical files are committed

## Completion conditions

The batch is complete only when:

1. all three entity boundaries are resolved
2. direct canonical duplicate checks pass
3. all four proposed incidents are accepted, converted to event-only context, or explicitly rejected with reasons
4. Holograph's interoperability relevance is established or the candidate is replaced
5. incident and aftermath timelines are supported by evidence
6. current status is supported for each entity
7. canonical validation passes
8. first-ten audit remains clean
9. Astro/type checks pass
10. the static site builds successfully
11. temporary generation tooling has been removed
