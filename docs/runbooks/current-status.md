# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-30

## Canonical and production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    279
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      279
```

## Phase 3 quality strengthening

```text
Full-corpus audit                    complete — PR #71
Aftermath and restart normalization  complete — PRs #72–#77
Source-count remediation             complete — PRs #78–#99
Hard source-count equality gate      active
Source-quality baseline              complete — PR #100
Source-quality no-regression gate    active
Source-quality remediation Batch 1   complete — PRs #103–#105
URL-status remediation Batch 1       complete — PRs #106–#107
Event Tier 1 Batch 1                 production-verified — PRs #108–#110
Event Tier 1 Batch 2                 production-verified — PRs #111–#113
Unknown URL-status hard ceiling      active at 0
Full production-content equality     active
```

## Exact source-count and URL state

```text
Incident mismatches  0
Event mismatches     0
Unknown URL status   0
```

## Source-quality state

```text
Primary evidence                         197 / 279
Tier 1 evidence                          215 / 279
Official-domain evidence                 127 / 279
Evidence with archived_url                 0 / 279
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          20 / 183
Events without tier 1 evidence           11 / 183
Terminal unarchived unique URLs          59
Terminal unarchived evidence records     78
Risky-host unarchived unique URLs        87
Risky-host unarchived evidence records  131
X/Twitter evidence records unarchived    38
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple event-scoped evidence records that reuse the same source URL do not create multiple preservation obligations.

Event Tier 1 Batch 2 added `bir_src_000272` through `bir_src_000279` for Rubic, Taiko, Celer, SOCKET, Synapse, Holograph, and Transit Finance. It reduced event primary gaps from 28 to 20 and event Tier 1 gaps from 19 to 11 without changing event dates, incident amounts, statuses, or historical outcomes.

Six of the 11 remaining Tier 1 gaps are intentional secondary events. Five remain unreviewed:

```text
bir_ev_000136
bir_ev_000146
bir_ev_000150
bir_ev_000156
bir_ev_000164
```

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: no reviewed first-party incident source and no Tier 1 incident evidence.

## Latest completed production checkpoint

```text
Canonical data PR       #112
Canonical merge         7c52a3804043bc9d16da5ddcf6faeef608da804d
Production audit PR     #113
Production verify       30542396678
Canonical normal CI     30542215442
Production-PR normal CI 30542393855
Verified state          33 / 34 / 183 / 279
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-07-30T12:24:11.345Z
Publication attempt     2
```

Attempt 1 observed the old 271-evidence deployment. Attempt 2 observed the complete 279-evidence public contract.

## Next

1. review the final five unreviewed event Tier 1 gaps;
2. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
3. begin verified archive captures for the 87 risky-host and 59 terminal unique-URL queues;
4. continue validator, monitoring, candidate collection, and v1 hardening.
