# Phase 2 Batch 5 Scope

## Purpose

Phase 2 Batch 5 adds bridge infrastructure whose historical significance is defined by shutdown, migration, or replacement rather than by a successful exploit.

The batch covers three terminal-state patterns:

- network sunset after the collapse of a funding and control relationship
- official replacement of a first-generation bridge by a successor architecture
- service closure followed by technology and operational handoff to another project

Candidate inclusion remains review-gated. Canonical status, end dates, and successor links must be supported by primary or strong secondary evidence.

## Selected candidates

### 1. RenVM / RenBridge

Proposed record shape:

```text
1 bridge/interoperability entity
0 to 1 incident records
launch, operational growth, Ren 2.0 announcement, Alameda-related sunset, mint-disable, burn window, shutdown, and current-state events
```

Primary terminal event:

1. November–December 2022 Ren 1.0 sunset

Why included:

- RenVM and RenBridge were major wrapped-asset and cross-chain infrastructure for Bitcoin and other non-EVM assets.
- Alameda acquired Ren and funded the development team.
- After FTX Group entered Chapter 11 proceedings, Ren stated that funding would end after Q4 2022.
- Ren announced that minting through Ren 1.0 would be disabled, burns would remain available temporarily, and the network would shut down approximately 30 days later.
- Ren 2.0 was announced as a planned community-run successor, but public mainnet completion must not be assumed.
- The case provides a terminal event caused by funding/control collapse rather than a bridge exploit.

Key modeling questions:

- determine whether the canonical entity name should be `Ren Protocol`, `RenVM`, or `RenBridge`
- decide whether Ren Protocol is the parent entity with RenVM and RenBridge as product context
- verify the exact date minting was disabled and the final burn/shutdown window by asset
- distinguish announced Ren 2.0 plans from an actually launched successor network
- verify the current state of bridge UI, domains, repositories, and community-controlled infrastructure
- decide whether the 2022 sunset belongs as an incident record or event-only terminal timeline
- preserve the statement that Ren 1.0 had no reported hacks separately from its shutdown

Initial sources:

- https://medium.com/renprotocol/moving-on-from-alameda-da62a823ce93
- https://medium.com/renprotocol/introducing-ren-2-0-43025b3d5d6
- https://medium.com/renprotocol/introducing-renbridge-3-0-2b5f49aaf722
- https://medium.com/renprotocol/ren-development-update-october-2022-5d2fb449dfb3
- current Ren repositories, domains, and community channels to be verified during canonical preparation

### 2. Avalanche-Ethereum Bridge / AEB

Proposed record shape:

```text
1 migrated bridge entity
0 incident records
launch, successor preparation, replacement, asset migration, legacy-token upgrade, and current legacy-state events
```

Primary terminal event:

1. July 29, 2021 replacement by Avalanche Bridge

Why included:

- the Avalanche-Ethereum Bridge launched in early 2021 as Avalanche's first official Ethereum asset bridge.
- Avalanche later announced a new SGX-based Avalanche Bridge with lower fees, faster finality, and a different security architecture.
- official materials explicitly state that Avalanche Bridge replaced AEB on July 29, 2021.
- assets bridged through AEB required migration or upgrade into the successor bridge-token format.
- current Avalanche support documentation still contains a procedure for upgrading old AEB assets, making the historical boundary and residual legacy obligations directly verifiable.

Key modeling questions:

- use `Avalanche-Ethereum Bridge` as canonical name and `AEB` as alias
- classify status as `migrated` rather than `deprecated` because the successor is explicit
- determine whether the successor should be a separate canonical Avalanche Bridge entity in the same batch or represented by name until a later active-bridge batch
- record February 8, 2021 launch and July 29, 2021 replacement with exact-date precision where supported
- distinguish old AEB asset contracts from the new `.e` bridge-token contracts
- avoid treating residual upgrade support as active AEB bridge operation
- verify whether any known security incident belongs to AEB; do not create one merely because the architecture was replaced

Initial sources:

- https://medium.com/avalancheavax/the-avalanche-ethereum-bridge-what-you-need-to-know-b450d2ece03c
- https://medium.com/avalancheavax/preparing-for-the-next-generation-avalanche-bridge-ab-26f7521485e7
- https://medium.com/avalancheavax/new-avalanche-bridge-builds-on-intel-sgx-technology-in-breakthrough-for-cross-chain-8f854e0e72e0
- https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1
- https://support.avax.network/en/articles/6752048-how-do-i-upgrade-old-avalanche-bridge-aeb-assets

### 3. ShuttleFlow

Proposed record shape:

```text
1 bridge entity
0 incident records
launch, product expansion, security audit, closure announcement, service end, technology handoff, and current legacy-state events
```

Primary terminal event:

1. November 2023 service closure and transition to Zero Gravity

Why included:

- ShuttleFlow was Conflux's multi-chain asset bridge and used Conflux as a transit chain for cross-chain asset movement.
- official Conflux material documents its design, audits, and operational role.
- 2023 closure reporting states that ShuttleFlow's bridge service ended and that technology and capabilities were handed to Zero Gravity.
- the case adds a bridge that ended through strategic transfer and replacement rather than exploit or insolvency.

Key modeling questions:

- determine the exact launch date and whether `ShuttleFlow` or `Conflux ShuttleFlow` is canonical
- locate and preserve the original official closure statement or stable archive
- verify the November 6, 2023 end date and the exact transition schedule
- determine whether status should be `migrated`, `dead`, or `deprecated`
- verify whether Zero Gravity operated a successor bridge using ShuttleFlow technology
- avoid automatically setting a successor_id until entity continuity is established
- verify whether user funds were migrated automatically and whether any residual redemption path remained
- distinguish ShuttleFlow from later Conflux bridges and third-party Conflux integrations

Initial sources:

- https://medium.com/conflux-network/shuttleflow-enabling-the-future-of-defi-through-true-multi-chain-connection-e60c2bada7d4
- https://medium.com/conflux-network/shuttleflow-protocol-passes-peckshield-security-audit-fe0aa0f20d27
- https://medium.com/conflux-network/shuttleflow-v1-3-0-front-end-upgrade-released-301b2ab59437
- original Conflux / ShuttleFlow closure statement to be captured during canonical preparation
- strong secondary reporting on the November 2023 closure and Zero Gravity transition

## Duplicate and boundary check

Repository code and pull-request searches found no existing canonical references for:

```text
Ren Protocol
RenVM
RenBridge
Avalanche-Ethereum Bridge
AEB
ShuttleFlow
```

Before canonical creation, direct JSON checks must cover:

- canonical name and aliases
- official and historical domains
- product, network, and operator boundaries
- explicit successor and predecessor relationships
- overlap with current Avalanche Bridge and later Conflux bridge services
- whether announced successors actually launched

## Provisional batch shape

```text
Bridges     +3 to +4
Incidents   +0 to +1
Events      +17 to +25
Evidence    +20 to +30
```

Expected totals if the three historical entities are added without a separate active Avalanche Bridge successor record:

```text
Bridges     25
Incidents   27 to 28
Events      120 to 128
Evidence    145 to 155
```

Exact counts remain review-dependent.

## Quality rules

- terminal status must be based on explicit shutdown, replacement, migration, or current-state evidence
- an announced successor must not be treated as launched without operational evidence
- residual redemption or token-upgrade support must not be confused with active bridge operation
- product, network, operator, and successor boundaries must remain distinct
- service closure does not imply exploit loss
- inherited or migrated assets must be modeled separately from stolen or recovered assets
- historical domains and current repurposed domains must be distinguished
- temporary generators or write-enabled workflows must not remain after canonical files are committed

## Completion conditions

The batch is complete only when:

1. all entity and successor boundaries are resolved
2. direct canonical duplicate checks pass
3. terminal status and end dates are supported
4. Ren 2.0 launch status is verified rather than assumed
5. AEB legacy-token migration is documented without treating AEB as currently active
6. ShuttleFlow closure and Zero Gravity relationship are supported by stable sources
7. canonical validation passes
8. first-ten audit remains clean
9. Astro/type checks pass
10. the static site builds successfully
11. temporary generation tooling has been removed
