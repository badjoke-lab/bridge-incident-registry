# Phase 2 Batch 5 Boundary Note

This document records the entity and migration boundaries for Batch 5 before canonical data is changed.

## Final shape

```text
Bridge entities   4
Incident cases    0
Events            20
Evidence          23
```

Canonical entities:

- Ren Protocol
- Avalanche-Ethereum Bridge
- Avalanche Bridge
- ShuttleFlow

## Ren Protocol

`Ren Protocol` is canonical. `RenVM`, `RenBridge`, `Ren 1.0`, and `RenBridge 3.0` remain network, application, version, and alias context.

Ren Protocol is classified as `deprecated` for the reviewed Ren 1.0 lineage. The 2022 ending is represented by terminal-state events, not by an incident record.

Ren 2.0 is not added as a successor entity. Official 2022 material described future testnet and mainnet work, while the current Ren Foundation page still labels Ren 2.0 as `Coming soon`. No reviewed evidence establishes an operating public Ren 2.0 mainnet, so `successor_id` remains null.

The November 18, 2022 notice described a transition followed by approximately thirty days of limited operation and shutdown. Because the reviewed primary source does not establish a separate exact completion timestamp, the end date uses December 2022 with `month` precision.

## Avalanche predecessor and replacement

The old Avalanche-Ethereum Bridge and the replacement Avalanche Bridge are separate canonical entities.

```text
Avalanche-Ethereum Bridge: migrated
Avalanche Bridge: active
```

Relationships:

```text
AEB.successor_id = Avalanche Bridge
AEB.replacement_bridge_id = Avalanche Bridge
Avalanche Bridge.predecessor_id = AEB
```

Key dates:

```text
AEB launch:                 2021-02-08
Avalanche Bridge launch:    2021-07-29
AEB replacement:            2021-07-29
AEB relayer sunset:         August 2021
```

Current support for upgrading old AEB assets is residual legacy support. It does not make AEB active. The replacement was an architecture migration, so no incident record is added.

## ShuttleFlow

`ShuttleFlow` is canonical and `Conflux ShuttleFlow` is alias context. It is classified as `migrated`.

The official closure notice separates these stages:

```text
technology and bridge-operation handoff to Zero Gravity
bridge service end on 2023-11-08
limited claim-only period
website and dApp end on 2024-01-06
```

The bridge-operation end and the later claim-path end are separate events. The entity end date is January 6, 2024 because that is the final announced end of the residual ShuttleFlow interface.

Zero Gravity is not added as an entity in this batch. The historical handoff is recorded in text, but `successor_id` remains null until the successor is reviewed as a canonical entity.

No incident record is added for the service closure or migration.

## References

Add:

```text
chains: conflux-core-space, conflux-espace
assets: renbtc, cfx
```

The existing `avalanche` key already covers Avalanche C-Chain. Existing Bitcoin, Ethereum, BNB Chain, Polygon, Solana, ETH, BTC, WBTC, USDC, USDT, DAI, and AVAX references must not be duplicated.

## Completion conditions

1. four unique bridge entities
2. zero new incidents
3. twenty events
4. twenty-three evidence records
5. valid chain and asset references
6. valid predecessor and replacement relationships
7. synchronized counts and status documents
8. all standard checks pass
9. temporary generation files are removed before merge
