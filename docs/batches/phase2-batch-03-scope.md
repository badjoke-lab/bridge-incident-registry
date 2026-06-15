# Phase 2 Batch 3 Scope

## Purpose

Phase 2 Batch 3 expands BIR with three previously underrepresented bridge designs:

- wrapped-asset bridge infrastructure
- canonical trustless light-client bridge infrastructure
- liquidity-backed bridge and messaging infrastructure

## Final canonical result

```text
Bridges     +3
Incidents   +5
Events      +21
Evidence    +23
```

Canonical totals after merge:

```text
Bridges     19
Incidents   25
Events      86
Evidence    107
```

Reference additions:

```text
Chains      NEAR, Aurora
Assets      GALA, nUSD
```

## 1. pNetwork / pTokens

Canonical result:

```text
1 bridge entity
2 incident records
9 timeline events
8 evidence records
```

Included incidents:

1. September 19, 2021 pBTC-on-BSC exploit
2. November 3, 2022 pGALA contract-control incident

Final modeling decisions:

- `pNetwork` is the canonical entity name.
- `pTokens` and `pTokens Bridge` remain aliases and product context.
- pNetwork v2 is classified as `deprecated` because the official application states that it has reached end of life.
- the pBTC-on-BSC incident records 277 BTC of stolen collateral without imposing a later fiat conversion.
- the pGALA incident records no bridge-collateral loss according to pNetwork's postmortem.
- the 12,977 BNB collected through the emergency whitehat operation is a recovery amount, not exploit loss.
- DEX-pool losses, centralized-exchange losses, bridge collateral, and recovery funds remain separate.
- final completion of the pBTC compensation process and pGALA redistribution remains unresolved.

Principal sources:

- https://medium.com/pnetwork/pnetwork-post-mortem-pbtc-on-bsc-exploit-170890c58d5f
- https://medium.com/pnetwork/pgala-post-mortem-measures-taken-to-safeguard-the-ecosystem-from-malicious-actors-and-recovery-6407048f4497
- https://medium.com/pnetwork/lessons-learnt-from-the-pgala-exploit-50e686730b98
- https://gogalagames.medium.com/pgala-what-happened-and-the-dangers-of-decentralization-62d64e1ea569
- https://slowmist.medium.com/slowmist-the-root-cause-of-the-pgala-event-is-that-the-plaintext-of-the-private-key-was-leaked-on-6e117ccf5473
- https://dapp.p.network/

## 2. Rainbow Bridge

Canonical result:

```text
1 bridge entity
2 incident records
7 timeline events
9 evidence records
```

Included incidents:

1. May 1, 2022 fabricated-block attack attempt
2. August 20, 2022 fabricated-block attack attempt

Final modeling decisions:

- the May and August attempts remain separate incidents.
- both incidents explicitly record zero reported bridge or user loss.
- the attacker's forfeited 2.5 ETH and 5 ETH bonds remain attacker losses, not bridge losses.
- the privately reported critical vulnerabilities are modeled as security events rather than exploited incidents.
- the Ethereum Merge security pause and September 27 restart remain separate from the attack attempts.
- current official documentation supports active status.

Principal sources:

- https://aurora.dev/blog/rainbow-bridge-1-year-anniversary
- https://aurora.dev/blog/2021-how-the-rainbow-bridge-works
- https://aurora.dev/blog/aurora-mitigates-two-vulnerabilities
- https://aurora.dev/blog/the-rainbow-bridge-is-back
- https://doc.aurora.dev/bridge/introduction/
- https://www.coindesk.com/tech/2022/08/23/hackers-lose-5-ether-while-trying-to-attack-near-protocols-rainbow-bridge

## 3. Synapse Protocol

Canonical result:

```text
1 bridge/interoperability entity
1 incident record
5 timeline events
6 evidence records
```

Included incident:

1. November 6, 2021 nUSD metapool exploit

Final modeling decisions:

- Synapse is modeled as an interoperability protocol with bridge, liquidity, and messaging functions.
- the entity launch date is August 29, 2021, based on the official mainnet-launch publication.
- the metapool implementation bug is distinguished from the core bridge-contract layer.
- the approximately $8.2 million nUSD malicious transfer was not processed and is recorded as protected exposure, not realized loss.
- the official statement that affected Avalanche nUSD liquidity providers would be made whole does not establish final distribution completion.
- the earlier Nerve branding history is preserved without merging the separately operated Nerve Bridge incident into Synapse.

Principal sources:

- https://medium.com/synapse-protocol/introducing-synapse-protocol-2af926143deb
- https://medium.com/synapse-protocol/synapses-mainnet-launch-the-hadean-phase-d09fc74b2272
- https://synapseprotocol.medium.com/11-06-2021-post-mortem-of-synapse-metapool-exploit-3003b4df4ef4
- https://www.halborn.com/blog/post/explained-the-synapse-and-nerve-bridge-hacks-november-2021
- https://bridge.synapseprotocol.com/
- https://analytics.synapseprotocol.com/bridge

## Duplicate and boundary result

Direct canonical checks found no duplicate entity for:

```text
pNetwork / pTokens
Rainbow Bridge
Synapse Protocol
```

Boundary decisions:

- pNetwork and pTokens are one canonical entity.
- Rainbow Bridge is distinct from the broader NEAR and Aurora ecosystems.
- Synapse Protocol is distinct from the later Nerve Bridge entity and incident.

## Quality rules applied

- primary sources prioritized for root cause, pause, restart, recovery, migration, and end-of-life claims
- zero-loss and thwarted incidents not presented as stolen-fund incidents
- attacker bond loss separated from user and protocol loss
- whitehat recovery separated from exploit loss
- protected exposure separated from realized loss
- current status supported by current official interfaces, documentation, or explicit end-of-life notice
- unresolved reimbursement and distribution claims preserved explicitly
- temporary generator and write-enabled workflow removed before merge

## Validation result

The final branch passed:

```text
Astro/type check
canonical data validation
first-ten audit
static site build
```
