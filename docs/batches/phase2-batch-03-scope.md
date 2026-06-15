# Phase 2 Batch 3 Scope

## Purpose

Phase 2 Batch 3 expands BIR with three bridge designs that are underrepresented in the current canonical dataset:

- wrapped-asset bridge infrastructure
- canonical trustless light-client bridge infrastructure
- liquidity-backed bridge and messaging infrastructure

The batch is review-gated. Candidate inclusion, incident splitting, and final status remain subject to direct canonical and source review.

## Selected candidates

### 1. pNetwork / pTokens

Proposed record shape:

```text
1 bridge entity
2 incident records
multiple pause, recovery, token-replacement, deprecation, and end-of-life events
```

Proposed incidents:

1. September 19, 2021 pBTC-on-BSC exploit
2. November 3, 2022 pGALA bridge misconfiguration and emergency whitehat response

Why included:

- pNetwork began as wrapped-asset bridge infrastructure and therefore adds a distinct wrapped-token bridge model.
- The 2021 official postmortem reported that 277 BTC collateral backing pBTC-on-BSC was stolen.
- The pGALA event has an unusually detailed official timeline covering contract-control loss, bridge suspension, emergency minting, whitehat pool draining, token replacement, and a delayed recovery plan.
- The official pTokens application currently states that pNetwork v2 has reached end of life, providing a meaningful terminal-state question for BIR.

Key modeling questions:

- determine whether the canonical entity should be named `pNetwork`, `pTokens`, or `pNetwork / pTokens`
- keep the 2021 pBTC exploit and 2022 pGALA event separate
- do not treat uncollateralized pGALA minted for the whitehat operation as bridge-fund theft
- distinguish protected GALA collateral, DEX liquidity losses, exchange-side losses, recovered BNB, and final user distribution
- determine whether the entity status is `deprecated`, `migrated`, `limited`, or another supported status based on the v2 end-of-life state and any successor infrastructure

Initial sources:

- https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f
- https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497
- https://medium.com/pnetwork/lessons-learnt-from-the-pgala-exploit-50e686730b98
- https://gogalagames.medium.com/pgala-what-happened-and-the-dangers-of-decentralization-62d64e1ea569
- https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473
- https://dapp.p.network/

### 2. Rainbow Bridge

Proposed record shape:

```text
1 bridge entity
2 incident records
multiple automatic-defense, vulnerability-remediation, pause, and restart events
```

Proposed incidents:

1. May 1, 2022 fabricated-block attack attempt
2. August 20, 2022 fabricated-block attack attempt

Why included:

- Rainbow Bridge is the canonical trustless bridge between Ethereum, NEAR, and Aurora.
- Both 2022 attempts were reportedly stopped by the bridge's challenge/watchdog design without user-fund loss.
- The August attempt was reportedly mitigated automatically within approximately 31 seconds and cost the attacker 5 ETH.
- Aurora separately disclosed two critical Rainbow Bridge-related vulnerabilities reported through Immunefi and remediated before exploitation.
- The bridge also has a documented security pause and restart around Ethereum's Merge, creating useful non-exploit aftermath events.

Key modeling questions:

- keep the May and August attempts separate because they occurred on different dates and used separate deposits
- use `reported_loss_usd = 0` only if the schema and source rules support explicit zero-loss incidents; otherwise preserve no-user-loss as text
- record attacker bond loss separately from bridge/user loss
- decide whether privately reported vulnerabilities belong as incident records, events, or evidence-only security context
- keep the Ethereum Merge pause separate from the attack incidents
- verify the bridge's current active status through current official documentation and interface availability

Initial sources:

- https://pages.near.org/blog/the-rainbow-bridge-is-live/
- https://aurora.dev/blog/2021-how-the-rainbow-bridge-works
- https://aurora.dev/blog/aurora-mitigates-two-vulnerabilities
- https://aurora.dev/blog/the-rainbow-bridge-is-back
- https://doc.aurora.dev/bridge/introduction/
- https://www.coindesk.com/tech/2022/08/23/hackers-lose-5-ether-while-trying-to-attack-near-protocols-rainbow-bridge
- official May 1 and August 22, 2022 incident threads from Aurora Labs CEO Alex Shevchenko, to be captured by stable URL during record preparation

### 3. Synapse Protocol

Proposed record shape:

```text
1 bridge/interoperability entity
1 incident record
launch, exploit-detection, liquidity-restoration, and current-operation events
```

Proposed incident:

1. November 6, 2021 nUSD metapool exploit attempt

Why included:

- Synapse adds a liquidity-backed bridge model distinct from canonical lock-and-mint and wrapped-asset bridges.
- Its official postmortem describes manipulation of the nUSD metapool virtual price by approximately 12.5%.
- The attacker reportedly failed to extract funds because of a transaction mistake, while liquidity providers were protected through the response.
- Synapse currently operates a bridge, liquidity pools, analytics, contracts documentation, and cross-chain messaging products.

Key modeling questions:

- determine whether the event is best classified as `exploit`, `attempted_exploit`, or another existing incident enum
- preserve the difference between pool-price manipulation, potential exposure, and actual extracted funds
- verify the exact pause, restoration, and liquidity-provider outcome timeline
- distinguish Synapse's earlier Nerve branding/history from the separate Nerve Bridge entity
- avoid incorrectly merging the later Nerve Bridge incident into Synapse

Initial sources:

- https://synapseprotocol.medium.com/11-06-2021-post-mortem-of-synapse-metapool-exploit-3003b4df4ef4
- https://synapseprotocol.medium.com/introducing-synapse-protocol-2e85e6f4775e
- https://synapseprotocol.medium.com/synapses-mainnet-launch-the-hadean-phase-a6c41daddc32
- https://bridge.synapseprotocol.com/
- https://analytics.synapseprotocol.com/bridge
- https://contracts.synapseprotocol.com/bridge/testing/synapse

## Duplicate and boundary check

Repository code and pull-request searches found no existing canonical references for:

```text
pNetwork
pTokens
Rainbow Bridge
Synapse Protocol
```

Before canonical creation, direct JSON checks must still cover:

- normalized canonical name
- slug
- aliases and prior branding
- official domain
- bridge product versus operator/protocol boundary
- predecessor / successor relationships
- incident overlap with existing entities

## Provisional batch shape

```text
Bridges     +3
Incidents   +5
Events      +16 to +24
Evidence    +20 to +30
```

Expected totals if all candidates survive review:

```text
Bridges     19
Incidents   25
Events      81 to 89
Evidence    104 to 114
```

Exact counts are not fixed until incident boundaries and source review are complete.

## Quality rules

- primary sources are preferred for incident acknowledgment, root cause, pause, restart, recovery, migration, and end-of-life claims
- zero-loss and thwarted incidents must not be presented as stolen-fund incidents
- attacker bond loss must remain separate from protocol or user loss
- whitehat minting and recovery assets must remain separate from exploit loss
- current status must be supported by a current official interface, documentation, or explicit end-of-life notice
- conflicting claims must remain explicit rather than silently collapsed
- temporary generators or write-enabled workflows must not remain after canonical files are committed

## Completion conditions

The batch is complete only when:

1. all three entity boundaries are resolved
2. direct canonical duplicate checks pass
3. all five proposed incidents are accepted, merged, or explicitly rejected with reasons
4. aftermath timelines are supported by evidence
5. current status is supported for each entity
6. canonical validation passes
7. first-ten audit remains clean
8. Astro/type checks pass
9. the static site builds successfully
10. temporary generation tooling has been removed
