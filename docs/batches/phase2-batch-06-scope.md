# Phase 2 Batch 6 Scope

## Purpose

Batch 6 covers cross-chain aggregation and routing incidents where the affected layer differs from an underlying bridge reserve or messaging network.

The batch distinguishes:

```text
underlying bridge failure
routing-layer failure
approval-related user exposure
operator-key compromise
frontend or DNS compromise
integrated dependency failure
```

## Selected candidates

1. Transit Swap
2. Rubic
3. Unizen
4. Magpie Protocol

## Provisional shape

```text
Bridges     +4
Incidents   +5 to +6
Events      +20 to +28
Evidence    +28 to +38
```

Expected cumulative range:

```text
Bridges     30
Incidents   32 to 33
Events      143 to 151
Evidence    176 to 186
```

## Transit Swap

Canonical name candidate:

```text
Transit Swap
```

Alias and operator context:

```text
Transit Finance
TransitFinance
```

Proposed classification:

```text
bridge_aggregator
active
```

The reviewed case is the October 2022 routing incident, followed by a service pause, partial fund returns, contract changes, and an October 21 relaunch.

Boundary rules:

- record the event under Transit Swap routing infrastructure
- do not mark each integrated DEX or bridge as affected
- do not classify approved user-token losses as bridge-reserve losses
- keep reported loss, returned funds, unrecovered funds, and reimbursement separate
- reconcile differing published amount estimates before canonical entry

Required timeline:

```text
launch or early operation
October 2022 incident
service pause
fund-return updates
security remediation
October 21 relaunch
current-state verification
```

Initial sources:

- official Transit Swap relaunch statement dated October 21, 2022
- official Transit Swap bi-weekly reports covering October to December 2022
- SlowMist technical analysis
- Numen Cyber Labs technical analysis

Review gates:

- locate a stable official incident notice or archive
- resolve the canonical project name
- distinguish primary and copycat activity
- reconcile loss and return figures
- verify final reimbursement state
- verify current official domain and service state

## Rubic

Canonical name candidate:

```text
Rubic
```

Alias and product context:

```text
Rubic Exchange
Rubic Cross-Chain Tech Aggregator
```

Proposed classification:

```text
bridge_aggregator
active
```

Two separate incidents are planned.

### Operator-wallet incident

A late-October or early-November 2022 operator-wallet compromise affected the former RBC/BRBC bridge and staking-reward management. Rubic stated that swap contracts and user principal were not affected.

### Routing-contract incident

A separate December 25, 2022 incident affected users who had approved Rubic routing contracts.

Boundary rules:

- preserve the two incidents separately
- do not relabel the operator-wallet case as a contract failure
- do not mark every integrated provider as affected
- separate token quantity, sale proceeds, user loss, and protocol loss
- separate user-token loss from later recovery or reimbursement

Required timeline:

```text
launch and cross-chain expansion
RBC/BRBC bridge retirement
operator-wallet incident
continued operation
December routing incident
approval warning and remediation
current-state verification
```

Initial sources:

- Rubic Weekly Report dated November 4, 2022
- Rubic security overview
- current Rubic developer documentation
- Rubic fifth-anniversary history
- independent December 2022 incident analysis

Review gates:

- locate the original December incident notice or archive
- verify the old RBC/BRBC bridge end date
- reconcile token, ETH, and fiat-value claims
- verify reimbursement or recovery status
- verify current domain and operating state

## Unizen

Detailed entity and incident boundaries remain to be fixed in this scope document.

## Magpie Protocol

Detailed entity and incident boundaries remain to be fixed in this scope document.

## Core boundary rule

Each record must distinguish the affected project layer from integrated bridges, DEXs, wallets, and messaging systems. Integrated providers are not marked affected without direct evidence.

## Completion gate

Canonical implementation begins only after entity names, incident counts, source requirements, current status, and recovery or reimbursement claims have been reviewed.
