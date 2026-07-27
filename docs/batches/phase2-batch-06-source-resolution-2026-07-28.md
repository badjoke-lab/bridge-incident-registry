# Phase 2 Batch 6 source resolution — 2026-07-28

Status: reviewed implementation boundary  
Canonical impact: none  
Parent scope: `docs/batches/phase2-batch-06-scope.md`

## Purpose

Resolve the entity, incident, aftermath, and source boundaries required to restart Phase 2 Batch 6 without weakening canonical review standards.

The four-candidate batch no longer proceeds as one indivisible data write. Source quality now supports a two-part implementation:

```text
Batch 6A  Transit Swap + Magpie Protocol
Batch 6B  Rubic + Unizen
```

This split changes implementation order only. All four candidates remain within the reviewed Phase 2 Batch 6 scope.

## Batch 6A — ready for canonical implementation

### Transit Swap

Canonical entity decision:

```text
canonical_name: Transit Swap
aliases:
  - Transit Finance
  - TransitFinance
type: bridge_aggregator
status: active
```

Incident boundary:

- one October 2022 routing-layer incident
- user-token exposure through routing/approval infrastructure, not an underlying bridge-reserve loss
- integrated DEXs and bridges are dependencies, not separate affected BIR entities
- primary and copycat activity must remain distinguishable in amount notes

Verified aftermath:

- Transit Finance suspended swap and cross-chain swap services on 10 October 2022 for a technical upgrade.
- Transit Swap relaunched on 21 October 2022 with all swap and cross-chain swap functions restored.
- The relaunch statement records approval changes, external-call whitelisting, hardened bridge interaction, removal of old-contract authority, open-source replacement contracts, and a SlowMist audit.

Canonical caution:

- loss, attacker return, unrecovered amount, and reimbursement must remain separate
- no `reimbursement_completed` event is permitted until an official or equivalently strong completion source supports it
- current `active` status is based on the official relaunch/current-service record, not merely a live domain

Primary sources:

- https://docs.transit.finance/announcement/announcement/suspension
- https://docs.transit.finance/announcement/announcement/relaunch
- https://docs.transit.finance/announcement/announcement

### Magpie Protocol

Canonical entity decision:

```text
canonical_name: Magpie Protocol
aliases:
  - Magpie
type: bridge_aggregator
status: active
brand_history_notes: later first-party publishing uses "fly (prev. Magpie Protocol)"
```

Do not set `rebranded`, successor, or replacement relationships until the operational boundary between Magpie Protocol and fly is verified beyond publication-profile naming.

Incident boundary:

- one 23 April 2024 MagpieRouterV2 incident
- routing-contract approval exposure
- not a Wormhole compromise and not an underlying bridge-reserve failure

Verified amount and aftermath:

- USD 129,000 reported stolen from 221 wallets
- the vulnerable selector-position validation was identified and fixed
- the dApp was paused during remediation
- all affected users were reimbursed in full, in the original asset, on the affected chain
- the follow-up states reimbursement occurred within two weeks
- audit and monitoring improvements were announced before reactivation

Canonical outcome:

```text
recovery_status: none
reimbursement_status: completed
restart_status: reopened
current_outcome: active_after_incident
```

The attacker did not return funds in the reviewed first-party sources. Protocol-funded reimbursement must not be represented as `funds_returned` or `funds_recovered`.

Primary sources:

- https://medium.com/@Magpieprotocol/magpie-protocol-smart-contract-vulnerability-post-mortem-f6400db0a25e
- https://medium.com/@Magpieprotocol/magpie-protocol-charting-a-secure-path-following-exploit-c7046d9fc3ca
- https://medium.com/@Flytrade

## Batch 6B — canonical implementation remains gated

### Rubic

Canonical entity decision:

```text
canonical_name: Rubic
aliases:
  - Rubic Exchange
  - Rubic Cross-Chain Tech Aggregator
type: bridge_aggregator
status: active
```

Current first-party material confirms Rubic's cross-chain-aggregator identity and continuing operation. Its security-architecture publication confirms contract rewrites, multisig management, server hardening, audits, monitoring, and a bug-bounty direction.

Two incident cases remain mandatory:

1. the former RBC/BRBC bridge and operator-wallet incident
2. the 25 December 2022 routing-contract approval incident

Unresolved gates:

- stable primary or archived incident notices for both cases
- exact operator-wallet token, proceeds, and protocol-loss scopes
- exact routing-incident user-loss scope
- recovery and reimbursement completion
- verified retirement date and boundary for the RBC/BRBC bridge

The two cases must not be collapsed into one incident or generalized as failures of every integrated bridge.

Current first-party sources:

- https://rubic.exchange/blog/rubics-new-security-architecture/
- https://rubic.exchange/blog/rubic-a-cross-chain-tech-aggregator-for-the-interoperable-future-of-web3/

### Unizen

Canonical entity decision:

```text
canonical_name: Unizen
aliases:
  - Unizen Trade
  - Unizen Trade Aggregator
  - Unizen Interoperability Protocol
  - UIP
type: bridge_aggregator
status: active
```

`bridge_aggregator` is preferred over `interoperability_protocol` because current official documentation presents Unizen as a next-generation DEX aggregator whose UIP component aggregates third-party interoperability providers.

Incident boundary:

- one March 2024 trade-aggregation contract incident
- approved user assets were drained after an unsafe external-call path was introduced around a contract upgrade
- third-party UIP providers were not established as compromised

Supported provisional amount:

```text
reported_loss_usd_display: approximately USD 2.1 million
amount_basis: independent security analysis
```

Reimbursement boundary:

- independent technical reporting states Unizen worked to reimburse affected users below a USD 750,000 threshold using CEO-provided funds
- a stable first-party completion record has not been located
- do not mark reimbursement completed

Current official material supports active status, later audits, UIP architecture, and newer approval/security design, but does not by itself prove full reimbursement of the March 2024 incident.

Sources:

- https://docs.unizen.io/
- https://docs.unizen.io/introduction-to-unizen/unizen-overview/unizen-interoperability-protocol-uip
- https://docs.unizen.io/other/security-audits
- https://docs.unizen.io/api-introduction/version-2-of-our-smart-contracts
- https://www.halborn.com/blog/post/explained-the-unizen-hack-march-2024

## Implementation order

### PR 6A

Add Transit Swap and Magpie Protocol with:

- 2 bridge entities
- 2 incident cases
- incident and lifecycle timelines
- primary evidence for pause, relaunch, postmortem, reimbursement, and current-state claims
- no Rubic or Unizen canonical records

### PR 6B

Add Rubic and Unizen only after the remaining primary/archive and reimbursement gates are resolved.

## Permanent boundary rules

- aggregator incidents do not propagate to every integrated provider
- user approvals are not bridge reserves
- attacker returns, security-firm recoveries, freezes, treasury replacement, and user reimbursement remain distinct
- service relaunch is not proof of reimbursement completion
- live documentation is not proof that a historical bridge component remains active
- a publication-profile rename is not automatically a canonical rebrand
- no canonical IDs are assigned in this source-resolution document
