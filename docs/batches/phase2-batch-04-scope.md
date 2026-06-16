# Phase 2 Batch 4 Scope

## Purpose

Phase 2 Batch 4 expands BIR beyond asset-transfer bridges into messaging and interoperability infrastructure.

The batch covers three distinct classes:

- a successful liquidity-backed bridge exploit
- an omnichain token-infrastructure compromise with supply inflation and recovery actions
- ecosystem-wide critical interoperability vulnerabilities handled through coordinated emergency patching

## Final canonical result

```text
Bridges     +3
Incidents   +2
Events      +17
Evidence    +18
```

Canonical totals after merge:

```text
Bridges     22
Incidents   27
Events      103
Evidence    125
```

Reference additions:

```text
Chains      NerveNetwork, Mantle, Cosmos interchain
Assets      fUSDT, UST, HLG
```

## 1. NerveNetwork / Nerve Bridge

Canonical result:

```text
1 interoperability entity
1 incident record
3 timeline events
4 evidence records
```

Included incident:

1. November 15, 2021 Nerve Bridge metapool exploit

Final modeling decisions:

- `NerveNetwork` is the canonical entity name.
- `Nerve Bridge` remains application and alias context.
- the entity remains separate from Synapse Protocol despite historical naming overlap and related vulnerable metapool code lineage.
- the incident records approximately 900 BNB of attacker profit without imposing a later fiat conversion.
- exhausted pool liquidity and attacker profit are not assumed to be identical accounting measures.
- no stable official postmortem, reimbursement statement, or exact restoration date was located.
- the incident therefore remains medium confidence and unresolved.
- current official website and documentation support active status.

Principal sources:

- https://blocksec.com/blog/the-analysis-of-nerve-bridge-security-incident
- https://www.halborn.com/blog/post/explained-the-synapse-and-nerve-bridge-hacks-november-2021
- https://nerve.network/
- https://docs.nerve.network/Guide/

## 2. Historical Holograph Protocol

Canonical result:

```text
1 historical interoperability entity
1 incident record
5 timeline events
5 evidence records
```

Included incident:

1. June 13, 2024 unauthorized HLG mint

Final modeling decisions:

- the historical entity is included because the compromised Holograph Operator contract belonged to its omnichain token infrastructure.
- one billion unauthorized HLG minted is recorded as unauthorized supply, not automatically as realized protocol or user loss.
- minted, sold, frozen, recovered, and burned quantities remain separate.
- the staged burn plan began with an approximately 53 million HLG first tranche.
- completion of the announced one-billion-HLG burn plan remains unresolved.
- the historical protocol is classified as `inactive`.
- the current same-domain creator-coin trading terminal is not asserted as a canonical successor or continuation.

Principal sources:

- https://twitter.com/holographxyz/status/1801332482262110301
- https://www.coindesk.com/tech/2024/06/13/hlg-down-over-60-as-exploiter-mints-1-billion-new-tokens
- https://chainwire.org/2024/06/19/holograph-announces-hlg-burn-plan-followed-by-technical-partnership-with-cybersecurity-specialist-halborn/
- https://cointelegraph.com/news/holograph-token-exploit-former-contractor
- https://docs.holograph.xyz/

## 3. Inter-Blockchain Communication Protocol / ibc-go

Canonical result:

```text
1 cross-chain messaging entity
0 incident records
9 timeline events
9 evidence records
```

Security-response coverage:

1. October 2022 Dragonberry coordinated vulnerability response
2. May 2023 Huckleberry disclosure and patch response

Final modeling decisions:

- `Inter-Blockchain Communication Protocol` is the canonical entity.
- `IBC`, `IBC Protocol`, and `ibc-go` remain aliases or implementation context.
- ibc-go is not split into a separate bridge entity.
- the March 29, 2021 inaugural connection is used as the launch date.
- Dragonberry and Huckleberry are modeled as security-response events rather than incident records.
- vulnerability discovery is not treated as exploitation.
- the official Dragonberry retrospective reports no funds lost.
- patch thresholds, confidential coordination, public releases, and multi-release-line remediation are retained as separate events.
- current official site and repository activity support active status.

Principal sources:

- https://ibcprotocol.dev/about
- https://ibcprotocol.dev/blog/ibc-turns-3
- https://forum.cosmos.network/t/ibc-security-advisory-dragonberry/7702
- https://forum.cosmos.network/t/cosmos-sdk-ibc-vulnerability-retrospective-security-advisories-dragonberry-and-elderflower-october-2022/8735
- https://github.com/cosmos/cosmos-sdk/releases/tag/v0.45.9
- https://forum.cosmos.network/t/ibc-security-advisory-huckleberry/10731
- https://github.com/cosmos/ibc-go/releases/tag/v7.0.1
- https://github.com/cosmos/ibc-go
- https://ibcprotocol.dev/

## Boundary results

```text
NerveNetwork                canonical entity
Nerve Bridge                application / alias context
Synapse Protocol            separate entity
Holograph Protocol          historical interoperability entity
current Holograph terminal  not asserted as successor
IBC Protocol                canonical entity
ibc-go                      implementation context
Dragonberry                 security-response events
Huckleberry                 security-response events
```

## Quality rules applied

- successful theft, prevented exploitation, vulnerability disclosure, and emergency patching remain distinct outcomes
- unauthorized token supply is not automatically converted into realized loss
- asset-denominated amounts are preferred where fiat valuation is unstable or disputed
- official advisories and retrospectives are preferred for coordinated vulnerability responses
- independent security analysis supports Nerve root cause because no stable official postmortem was located
- current branding and protocol operation are verified separately from historical incident identity
- unresolved reimbursement, recovery, and burn completion remain explicit
- temporary generator, diagnostic files, marker files, and write-enabled workflow changes were removed before merge

## Validation result

The final branch passed:

```text
Astro/type check
canonical data validation
first-ten audit
static site build
```
