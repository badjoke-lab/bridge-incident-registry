# Phase 3 Event Primary Review 02 — 2026-08-09

Status: review complete  
Canonical data changed: no

## Baseline

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Events without primary          14
Events without Tier 1            6
Evidence with archived_url      127
Terminal unarchived URLs         15
Risky-host unarchived URLs       16
Unknown URL status                0
```

The remaining fourteen event-primary gaps consist of:

- six intentional secondary-only Tier 1 gaps already reviewed separately;
- `bir_ev_000150`, intentionally non-primary because its PeckShield evidence is a direct security-monitoring observation rather than an operator statement;
- seven deferred claim-relative gaps from Event Primary Review 01.

This review re-examined only those seven deferred gaps. It does not reopen the six intentional research/context records or `bir_ev_000150`.

## Approved remediation

### `bir_ev_000013` — Poly Network exploit disclosed

Canonical evidence already contains first-party Poly Network source `bir_src_000270`:

```text
Title        Poly Network — Asset Recovery Complete
URL          https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4
Publisher    Poly Network
Source tier  tier_1
Primary      true
Archive      https://web.archive.org/web/20221013202750/https://medium.com/poly-network/poly-network-asset-recovery-complete-a7ba33c2f2e4
```

The source is a first-party incident retrospective. It explicitly identifies the Poly Network attack and states that all affected user assets worth USD 610 million were recovered. That is direct project evidence for the occurrence and scale of the incident represented by `bir_ev_000013`. The existing Chainalysis and Wired event-scoped sources remain useful for exact Aug. 10 chronology and independent technical framing.

Approved canonical action: add a new event-scoped evidence record duplicating the already-reviewed `bir_src_000270` URL and exact archived snapshot, linked to `bir_ev_000013`, with `claim_scope=incident_case`, `is_primary=true`, `source_tier=tier_1`, and `supports_amount=true`.

This introduces no new unique risky-host URL because the exact source URL and verified archive mapping are already canonical.

### `bir_ev_000124` — Transit Swap routing exploit occurred

Canonical evidence already contains first-party Transit Finance source `bir_src_000279`:

```text
Title        Updates about TransitFinance
URL          https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897
Publisher    Transit Finance
Published    2022-10-12
Source tier  tier_1
Primary      true
Archive      https://web.archive.org/web/20221020165004/https://medium.com/@TransitSwap/updates-about-transitfinance-d05176918897
```

Transit Finance states that it was attacked by hackers at 18:33 UTC on October 1, 2022, reports a total affected amount of USD 28.9 million, and describes the subsequent hacker/white-hat recovery state. That is claim-relative primary evidence for the occurrence, date, and later reconciled amount of `bir_ev_000124`. SlowMist and Numen remain the technical sources for the unchecked routing/permissions path; no security-firm source is reclassified.

Approved canonical action: add a new event-scoped duplicate of the already-reviewed `bir_src_000279` URL and archive mapping linked to `bir_ev_000124`, with `claim_scope=incident_case`, `is_primary=true`, `source_tier=tier_1`, `supports_amount=true`, and recovery support retained where applicable.

This introduces no new unique risky-host URL.

### `bir_ev_000125` — Transit Swap incident disclosed and traced

The same first-party Transit Finance update identifies the attack, reconciles attacker/white-hat buckets, records returned and unrecovered amounts, and describes continuing official recovery/legal handling. It therefore directly supports the project-side disclosure and attacker-tracking/recovery context represented by `bir_ev_000125`. SlowMist and Numen remain independent technical/tracing evidence.

Approved canonical action: add a separate event-scoped duplicate of `bir_src_000279` linked to `bir_ev_000125`, again preserving the existing verified archive mapping and primary/Tier 1 classification.

This introduces no new unique risky-host URL.

## Deferred primary gaps

### `bir_ev_000014` — Poly Network funds returned in stages

First-party Poly Network material confirms the recovery endpoint, and later first-party retrospectives describe a multi-day sequence. However, no additional canonical source URL with an already-reviewed archive mapping currently captures the event's exact staged-return chronology closely enough for a bounded no-regression application. Keep the existing secondary evidence and defer a new primary record until a suitable first-party source is admitted under the archive-preservation rules.

### `bir_ev_000143` — Unizen external-call approval exploit occurred

Existing first-party Unizen evidence proves reimbursement and later response, while the technical external-call root cause is currently supported by Halborn and other security reporting. Do not infer the precise exploit path from later audits or reimbursement notices.

### `bir_ev_000144` — Unizen incident and approval risk disclosed

The existing first-party CTO response and reimbursement communications establish response activity, but the canonical record does not yet contain a first-party source that directly supports the precise approval-revocation warning and disclosure boundary for this event. PeckShield remains a direct security observation, not operator primary evidence.

### `bir_ev_000148` — Unizen partial recovery from four hackers

SlowMist records that Unizen CTO Martin Granström reported approximately USD 185,000 recovered from four hackers, but the underlying CTO post is not canonical event-scoped evidence and has not passed the repository's URL/archive admission boundary. Do not upgrade the SlowMist report itself to primary.

## Projected canonical effect

If only the three approved event-scoped duplicates are applied in a fresh canonical PR:

```text
Evidence records                   284 -> 287
Events without primary evidence     14 -> 11
Events without Tier 1 evidence       6 -> 6
Incident source-count mismatches      0 -> 0
Event source-count mismatches         0 -> 0
Terminal unarchived unique URLs      15 -> 15
Risky-host unarchived unique URLs    16 -> 16
Unknown URL status                    0 -> 0
```

Required source-count changes:

```text
bir_inc_000005.source_count  9 -> 10
bir_ev_000013.source_count   2 -> 3
bir_inc_000028.source_count 12 -> 14
bir_ev_000124.source_count   2 -> 3
bir_ev_000125.source_count   2 -> 3
```

## Safety boundary

- no canonical data changes in this review PR;
- no event wording, dates, amounts, lifecycle state, recovery state, or reimbursement state changes;
- no security-firm, research, or news source is reclassified as primary;
- approved records reuse already-canonical first-party URLs and their exact verified archive mappings;
- no unique risky-host or terminal archive-risk count is allowed to increase;
- canonical application must occur on a fresh branch after this review merges and must pass the permanent source-count, source-quality, build, and controlled-failure checks.
