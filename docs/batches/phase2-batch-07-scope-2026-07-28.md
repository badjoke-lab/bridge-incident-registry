# Phase 2 Batch 7 scope — 2026-07-28

Status: reviewed canonical implementation boundary  
Canonical impact: none  
Canonical baseline: 30 bridges / 32 incidents / 150 events / 181 evidence records

## Purpose

Define the next bounded record-expansion batch after Phase 2 Batch 6 completed and passed production verification.

Selected candidates:

```text
Taiko Bridge
Everclear / Connext
Commons Bridge
```

The three candidates cover distinct BIR patterns:

- incident, recollateralization, reimbursement, and reopening
- rebrand followed by commercial sunset without an exploit
- bridge compromise followed by reimbursement and permanent network shutdown

## Candidate 1 — Taiko Bridge

### Canonical entity decision

```text
canonical_name: Taiko Bridge
aliases:
  - Taiko L1 Bridge
  - Taiko canonical bridge
type: canonical_bridge
status: active
```

The canonical entity covers Taiko's first-party Ethereum-facing bridge and vault system. Individual ERC20Vault, message-service, proof-verification, and deployment contracts remain component context in v0 rather than separate bridge entities.

Current Taiko network status and the first-party reopening statement support active classification. Temporary withdrawal quotas after reopening are represented as a safeguard event and do not by themselves require `limited` current status after later active verification.

### Incident decision

One incident case:

```text
incident_date: 2026-06-21
incident_type: exploit
reported_loss_usd_display: approximately USD 1.7 million
recovery_status: none
reimbursement_status: completed
restart_status: reopened
current_outcome: active_after_incident
```

Boundary:

- forged message proofs were accepted on Ethereum L1 without legitimate source-chain events
- fraudulent bridge withdrawals and unauthorized vault releases followed
- Taiko halted block production and first-party bridge withdrawals during containment
- the incident affected the canonical Taiko bridge path; it does not automatically classify every third-party bridge deployed on Taiko as compromised
- one-to-one bridge backing was restored through recollateralization
- every affected user was reported made whole by 2 July 2026
- no reviewed source establishes attacker-fund recovery, so treasury recollateralization and reimbursement must not be recorded as `funds_recovered`

Amount handling:

- use approximately USD 1.7 million as a project-reported estimate
- amount confidence remains medium until an asset-level final postmortem is available
- do not infer an audited final loss or recovered amount

Target timeline:

```text
exploit_occurred
bridge_paused
transfers_suspended
funds_lost
recovery_started
bridge_reopened
reimbursement_completed
other  // conservative withdrawal quotas / safeguard state
```

Primary sources:

- https://x.com/taikoxyz/status/2068858818352865626
- https://x.com/taikoxyz/status/2072533556224548918
- https://status.taiko.xyz/

Independent context:

- https://www.theblock.co/post/405486/taiko-confirms-exploit
- https://crypto-economy.com/taiko-reopens-bridge-after-1-7m-exploit/

### Safety boundaries

- recollateralization is not attacker-fund recovery
- reimbursement completion is based on the first-party make-whole statement
- temporary quotas do not erase reopening
- third-party Taiko bridges do not inherit the canonical bridge incident without direct evidence

## Candidate 2 — Everclear / Connext

### Canonical entity decision

```text
canonical_name: Everclear
previous_slugs:
  - connext
aliases:
  - Connext
  - Connext Network
  - Everclear Protocol
type: interoperability_protocol
status: dead
```

Connext and Everclear are one canonical entity, not predecessor and successor entities. The project and current documentation consistently describe Everclear as `prev Connext`, and the 2024 transition was a protocol and brand evolution rather than an independent successor launch.

The record must preserve older Connext phases and products as lifecycle context:

- Connext protocol
- xPollinate / Connext Bridge product history
- Connext-to-Everclear rebrand
- Everclear Mainnet Beta and full-mainnet phases
- final protocol, UI, chain, Foundation, and Labs wind-down

### No incident case

Everclear is lifecycle-only in Batch 7.

Do not create an incident merely because:

- the business failed to reach sustainable commercial depth
- the token price declined after shutdown reporting
- the protocol, UI, and chain ceased operation

No reviewed exploit, stuck-fund event, or bridge-loss incident is required for inclusion.

### Lifecycle outcome

```text
terminal_reason: operator_shutdown
end_date: 2026-05
end_date_precision: month
```

Target lifecycle events:

```text
launched                 // historical Connext launch context
other                    // xPollinate renamed Connext Bridge
other                    // Connext announced Everclear identity
launched                 // Everclear mainnet beta / mainnet context
shutdown_effective       // protocol, UI, and chain already sunset
shutdown_announced       // Foundation and Labs wind-down announcement
```

The May 2026 date is the reviewed announcement month. The protocol and interfaces were described as already sunset, so do not assign one unsupported exact effective day to every component.

Source set:

- https://twitter.com/EverclearOrg/status/2057488000003477886
- https://www.everclear.org/blog
- https://docs.everclear.org/developers/getting-started
- https://medium.com/connext/xpollinate-is-now-connext-bridge-d294baea94c2
- https://www.everclear.org/blog/q3-recap
- https://www.theblock.co/post/402252/clear-token-tanks-48-everclear-winds-down-protocol-foundation-labs-unit

### Current-docs rule

Everclear documentation and brand pages remain publicly accessible. Static documentation availability is historical evidence and is not proof that the protocol, UI, or chain remains operational after the first-party sunset.

### Safety boundaries

- one canonical rebranded entity, not two entities
- lifecycle record only; no fabricated exploit incident
- qualified statements that users had withdrawn are not converted into an absolute guarantee that no residual claim existed
- possible DAO continuation or open-source maintenance is not a successor until operational evidence exists

## Candidate 3 — Commons Bridge

### Canonical entity decision

```text
canonical_name: Commons Bridge
aliases:
  - Syndicate Commons Bridge
type: canonical_bridge
status: dead
```

Commons Bridge is modeled separately from the broader Syndicate Bridge product family.

Reason:

- the reviewed compromise affected the official bridge for Commons Chain
- the Commons network and its bridge were subsequently wound down
- Syndicate documentation may still describe other bridge or Relay routes
- a single `Syndicate Bridge` entity would incorrectly combine a permanently closed Commons route with potentially separate surviving routes

The broader Syndicate Bridge family is not promoted in Batch 7 and remains a future entity-boundary candidate.

### Incident decision

One incident case:

```text
incident_date: 2026-04-29
incident_type: exploit
reported_loss_usd_display: approximately USD 330,000–400,000 realized proceeds
recovery_status: none
reimbursement_status: completed
restart_status: not_reopened
current_outcome: dead_after_incident
```

Amount handling:

- record approximately 18.45 million SYND drained or controlled through the affected proxy path
- retain approximately USD 330,000–400,000 as reported realized sale proceeds
- do not equate token quantity, realized proceeds, user loss, token-price impact, and treasury reimbursement
- use a range rather than selecting one unsupported exact USD amount

Root-cause handling:

- technical reporting describes compromise of a privileged proxy-upgrade path and replacement of the implementation
- no reviewed first-party final postmortem establishes the narrow technical category
- use `attack_vector_category: unknown` and preserve the technical interpretation in notes and known unknowns

Reimbursement and terminal outcome:

- the current official Commons shutdown page states that all users were made whole automatically
- every SYND on Commons, including staked SYND and unclaimed rewards, was returned to the corresponding Base wallet
- the page states an additional 15 percent was included
- no claim portal or user action was required
- Commons network and bridge were wound down and were not reopened

Target timeline:

```text
exploit_occurred
hack_disclosed
bridge_paused
investigation_started   // represented as `other` under current enum if needed
reimbursement_announced
reimbursement_completed
shutdown_announced
shutdown_effective
```

Primary sources:

- https://twitter.com/syndicateio/status/2049352309784904187
- https://x.com/syndicateio/status/2057291537860706672
- https://commons.syndicate.io/
- https://docs.syndicate.io/en/docs/synd/bridging

Independent and technical context:

- https://www.theblock.co/post/399318/syndicate-exploit
- https://www.theblock.co/post/402130/syndicate-labs-wind-down
- https://www.darknavy.org/web3/exploits/syndicate-commons-bridge-upgrade-compromise/

### Operator-lifecycle boundary

The Syndicate Labs wind-down is recorded as related operator context but not as the cause of the bridge incident. The first-party statement said the compromise did not cause the Labs wind-down.

Do not infer that Syndicate Network Collective or an unidentified maintainer became an operational successor to Commons Bridge.

## Batch 7 implementation target

Expected canonical additions:

```text
Bridge entities   3
Incident cases    2
```

Expected records:

- Taiko Bridge entity and one incident
- Everclear / Connext lifecycle entity without an incident
- Commons Bridge entity and one incident
- incident and lifecycle timeline events
- primary, technical, archive, current-state, reimbursement, and shutdown evidence

IDs are not assigned in this scope document. They must be derived from the current canonical maximums after this scope PR merges.

## Permanent boundaries

- canonical bridge components and third-party bridge deployments remain distinct
- recollateralization, recovery, attacker return, and reimbursement remain separate
- rebrand lineage does not automatically require separate entities
- a shutdown is not automatically an incident
- accessible documentation is not proof of active operation
- route-specific shutdown must not be generalized to an entire product family
- token quantity, realized proceeds, user loss, price impact, and treasury reimbursement remain separate
- operator wind-down must not be stated as an incident cause without evidence
