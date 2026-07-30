# Phase 3 event Tier 1 review Batch 1 — 2026-07-29

Status: review complete; canonical data unchanged

## Baseline

```text
Events                         183
Evidence                       265
Events without Tier 1 evidence 25
Reviewed events                10
```

## Decision summary

```text
Tier 1 additions approved       6
Intentional secondary events    4
Expected evidence total       271
Expected event Tier 1 gaps      19
Expected event primary gaps     28
Expected source-count drift      0
```

## Approved Tier 1 additions

### `bir_ev_000166` — Commons Bridge proxy compromised

Link an event-scoped copy of `bir_src_000193`, Syndicate's official compromise statement. It directly supports the compromised Commons Bridge proxy, approximate amount, containment response, and service pause.

### `bir_ev_000169` — Syndicate began tracing and security investigation

Link an event-scoped copy of `bir_src_000193`. The same first-party incident thread supports the operator response, investigation, liquidity warning, and reserve assessment. The technical root-cause interpretation remains separately sourced.

### `bir_ev_000001` — Ronin Bridge exploit disclosed

Add Ronin's first-party `Community Alert: Ronin Validators Compromised`:

```text
https://roninblockchain.substack.com/p/community-alert-ronin-validators
```

The alert was originally published on 2022-03-29 and supports the disclosure date, compromised validators, drained assets, bridge halt, and recovery-or-reimbursement commitment.

### `bir_ev_000007` — Nomad exploit disclosed

Link an event-scoped copy of `bir_src_000065`, Nomad's first-party root-cause analysis. It supports the exploit case and the unsafe message-verification condition.

### `bir_ev_000015` — Recovery treated as substantially complete

Add Poly Network's first-party `Poly Network — Asset Recovery Complete`:

```text
https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4
```

The post states that all affected user assets worth USD 610 million were recovered and that the project moved from asset recovery to service resumption.

### `bir_ev_000059` — Celer committed to compensate affected users

Add Celer's first-party incident update:

```text
https://x.com/CelerNetwork/status/1560123830844411904
```

The official thread states that the frontend DNS cache-poisoning incident affected a small group of users, that cBridge frontend service would resume with additional monitoring, and that affected users would be fully compensated.

## Intentional secondary-source events

### `bir_ev_000012` — Harmony research context

Retain the academic bridge-hack survey as Tier 2. First-party Harmony and FBI incident sources establish the exploit but do not establish the later survey's inclusion or research classification.

### `bir_ev_000051` — Harmony recovery partner proposal

Retain the community proposal as Tier 2. The official forum hosts the proposal, but the reviewed record is a community-authored request rather than an approved operator statement or formal adopted governance action.

### `bir_ev_000006` — Wormhole research context

Retain the academic bridge-hack survey as Tier 2. Wormhole first-party incident statements do not establish the later survey event.

### `bir_ev_000009` — Nomad research context

Retain the academic bridge-hack survey as Tier 2. Nomad's first-party incident records support the exploit and recovery history, not the later research-survey inclusion.

## Canonical migration contract

The follow-up canonical PR must:

- add six event-scoped Tier 1 primary evidence records;
- preserve all existing evidence records and source tiers;
- increment the six affected event `source_count` values by one;
- synchronize the five affected incident `source_count` values for six added incident links;
- tighten `events_without_primary` from 34 to 28;
- tighten `events_without_tier_1` from 25 to 19;
- retain exact incident and event source-count equality;
- change no event dates, statuses, amounts, or historical outcome claims.

Research-context and community-proposal events remain visible in the quality inventory but are not remediated through unsupported Tier 1 duplication.
