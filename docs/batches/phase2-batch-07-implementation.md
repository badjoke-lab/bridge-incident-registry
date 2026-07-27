# Phase 2 Batch 7 implementation

Status: canonical data implemented; PR and production verification pending  
Updated: 2026-07-28

## Canonical additions

```text
Bridge entities    3
Incident cases     2
Timeline events    23
Evidence records   18
Asset references   3
Chain references   3
```

New corpus totals:

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

## Taiko Bridge

Added:

- active canonical bridge entity
- June 2026 message-proof exploit
- approximately USD 1.7 million project estimate
- network and bridge pause
- withdrawal suspension
- bridge recollateralization kept separate from attacker-fund recovery
- reopening with conservative quotas
- completed user reimbursement
- current active status evidence

Third-party bridges deployed on Taiko do not inherit the canonical bridge incident.

## Everclear / Connext

Added one lifecycle-only entity:

- Connext protocol history
- xPollinate-to-Connext Bridge naming event
- Connext-to-Everclear rebrand within one canonical entity
- Mainnet Beta and full-mainnet phases
- protocol, UI, chain, Foundation, and Labs wind-down
- no fabricated exploit incident
- accessible documentation retained as historical evidence rather than active-operation proof

## Commons Bridge

Added:

- route-specific canonical bridge entity separate from the broader Syndicate Bridge family
- April 2026 bridge-proxy compromise
- approximately 18.45 million SYND quantity
- approximately USD 330,000–400,000 realized-proceeds range
- investigation and pause timeline
- automatic full reimbursement plus 15 percent
- permanent Commons network and bridge shutdown
- no unsupported final narrow attack-vector classification

Syndicate Labs wind-down remains related operator context and is not recorded as the cause of the bridge incident.

## Reference additions

Assets:

```text
synd
clear
next
```

Chains:

```text
taiko
base
commons-chain
```

## Safety boundaries

- recollateralization is not attacker-fund recovery
- reimbursement is not recovery
- a rebrand does not automatically require separate entities
- a shutdown is not automatically an incident
- public documentation availability is not active-operation proof
- route-specific shutdown is not generalized to an entire product family
- token quantity, realized proceeds, user loss, price impact, and treasury reimbursement remain separate
- operator wind-down is not recorded as an incident cause without evidence

## Validation

The bounded generator passed before committing canonical data:

```text
npm run validate:data
npm run validate:enums
npm run audit:first-ten
npm run build
npm run dist:check
npm run dist:test
```

The temporary generators, diagnostic output, and write-enabled workflow were removed before final review.

## Remaining work

1. run normal pull-request CI against the cleaned branch
2. review all canonical additions and source links
3. merge only after every required check passes
4. run explicit production verification against 33 bridge and 34 incident detail routes
5. verify the 33 / 34 / 173 / 199 public-data state and all 72 canonical HTML routes
