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

Canonical name candidate:

```text
Unizen
```

Product and protocol context:

```text
Unizen Trade
Unizen Trade Aggregator
Unizen Interoperability Protocol
UIP
```

Proposed classification:

```text
interoperability_protocol
```

Alternative classification subject to schema review:

```text
bridge_aggregator
```

The reviewed case is the March 2024 trade-aggregation incident involving approved user assets, followed by reimbursement announcements and additional security review.

Boundary rules:

- do not mark every liquidity source or interoperability provider as affected
- distinguish the trade-aggregation contract from later UIP architecture
- distinguish reimbursement announcement, payment start, and completion
- do not treat all Unizen user balances as affected

Required timeline:

```text
launch or Trade launch
cross-chain aggregation development
March 2024 incident
approval warning
reimbursement process
post-incident audits
UIP or current architecture verification
current-state verification
```

Initial sources:

- current Unizen website and product documentation
- Unizen liquidity-distribution documentation
- Unizen Interoperability Protocol documentation
- Unizen security-audit index
- June 2024 Beosin audit
- Halborn incident analysis

Review gates:

- locate and archive original incident and reimbursement statements
- determine canonical type
- identify the affected contract version
- verify reimbursement completion
- determine whether UIP existed during the incident or is later architecture

## Magpie Protocol

Canonical name candidate:

```text
Magpie Protocol
```

Later brand context:

```text
fly
Fly Trade
```

Proposed classification:

```text
bridge_aggregator
```

Proposed current status:

```text
active or rebranded
```

The reviewed case is the April 23, 2024 MagpieRouterV2 incident, followed by a pause, remediation, full user reimbursement, review, and later operation.

Boundary rules:

- record the case under Magpie routing infrastructure
- retain Wormhole and liquidity systems as dependencies
- do not classify the event as a Wormhole or reserve compromise
- separate stolen amount, attacker return, and protocol-funded reimbursement
- do not set a rebrand or successor relationship until the `fly` boundary is verified

Required timeline:

```text
public beta or launch
cross-chain routing operation
April 2024 incident
pause and remediation
full reimbursement
review before reactivation
current status or rebrand verification
```

Initial sources:

- official Magpie Protocol postmortem dated April 26, 2024
- official Magpie follow-up on remediation and reimbursement
- Magpie protocol documentation
- Magpie cross-chain architecture documentation

Review gates:

- determine canonical current name and status
- verify launch and public-beta dates
- verify when operation resumed
- distinguish reimbursement from attacker recovery
- archive the primary postmortem and current-state pages

## Cross-batch comparison rules

Existing BIR records provide comparison cases but are not new Batch 6 entities:

```text
Celer cBridge
  frontend and DNS compromise

SOCKET Protocol / Bungee
  approval-related gateway incident

LI.FI
  router and approval-related incidents

Multichain
  router and cross-chain infrastructure context
```

An aggregator incident does not automatically create incidents for every integrated DEX, bridge, messaging layer, or wallet.

## Candidates reviewed but not selected

### Rango Exchange

Rango is in scope as a bridge and DEX aggregator, but its current public site describes a zero-exploit history. It remains a future active-baseline candidate.

### ParaSwap / Velora

The Augustus V6 case is a strong comparison for router exposure, white-hat rescue, and reimbursement, but the reviewed event is primarily a multi-chain DEX-aggregation case rather than a clearly cross-chain bridge-routing case. It remains a methodology comparator.

### XY Finance

XY Finance is a bridge aggregator with its own bridge, but no public-quality incident matching Batch 6 was established during scope review.

### Chainge Finance

Chainge is a cross-chain liquidity aggregator and bridge-infrastructure provider, but no reviewed incident matching Batch 6 was established.

## Duplicate and scope check

Repository search found no existing canonical entity or reviewed batch record for:

```text
Transit Swap
Transit Finance
Rubic
Unizen
Magpie Protocol
Fly Trade
```

Before implementation, direct canonical checks must cover:

- names and aliases
- historical and current domains
- operator and product boundaries
- token bridge and aggregator boundaries
- later rebrands or successors
- integrated protocols already represented in BIR

## Reference additions

Likely existing references include Ethereum, BNB Chain, Polygon, Avalanche, Arbitrum, Optimism, Fantom, USDC, USDT, ETH, BNB, and DAI.

Project-token references should be added only when necessary to explain an incident amount or bridge lineage.

## Quality rules

- prefer official or archived incident notices
- technical analysis may support root cause but not reimbursement completion
- reported loss, realized loss, returned amount, recovered amount, rescued amount, and reimbursed amount remain separate
- approved-fund exposure is not automatically realized loss
- integrated providers are not marked affected without evidence
- a protocol pause is not a shutdown
- a relaunch announcement is not proof of current operation
- current status must be verified independently
- no exploit-reproduction instructions are included

## Completion conditions

Batch 6 implementation is complete only when:

1. all four entity boundaries are resolved
2. Rubic's two incident classes remain separate
3. Transit Swap loss and recovery claims are reconciled
4. Unizen reimbursement status is supported beyond announcement-level reporting
5. Magpie reimbursement and current status are verified
6. all incidents distinguish router, approval, key, frontend, and bridge layers
7. direct canonical duplicate checks pass
8. canonical validation passes
9. first-ten audit remains clean
10. Astro and TypeScript checks pass
11. the static site builds successfully
12. temporary generation or write-enabled workflow files are removed before merge
