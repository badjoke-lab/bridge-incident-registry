# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-01

## Canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      284
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
Event Tier 1 remediation             production-verified — PRs #108–#116
Nerve source boundary                reviewed — PR #117
Archive capture Batch 1              production-verified — PRs #118–#120
Archive capture Batch 2 review       complete — PR #122
Archive capture Batch 2 canonical    pending merge — PR #123
Unknown URL-status hard ceiling      active at 0
Full production-content equality     active
```

## Exact source-count and URL state

```text
Incident mismatches  0
Event mismatches     0
Unknown URL status   0
```

## Canonical source-quality state

```text
Primary evidence                         201 / 284
Tier 1 evidence                          220 / 284
Official-domain evidence                 131 / 284
Evidence with archived_url                21 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence            6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          46
Terminal unarchived evidence records     58
Risky-host unarchived unique URLs        75
Risky-host unarchived evidence records  115
X/Twitter evidence records unarchived    42
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse the same source URL create one preservation obligation.

Archive capture Batch 2 adds eight verified Wayback snapshots to eleven Ren Protocol and Avalanche bridge-family evidence records. Source URLs, claims, source tiers, reliability, dates, and linkages remain unchanged.

All event Tier 1 gaps are reviewed. The six remaining gaps are intentional secondary records:

```text
bir_ev_000006
bir_ev_000009
bir_ev_000012
bir_ev_000051
bir_ev_000087
bir_ev_000088
```

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit. PR #117 records the completed first-party research boundary; no stable incident-specific primary source was located and the gap remains intentional.

## Latest completed production checkpoint

The latest completed production checkpoint remains Archive Capture Batch 1 until PR #123 merges and all twenty-one archive fields pass explicit full-content verification.

```text
Canonical data PR       #119
Canonical merge         5a152f647e05018170e57721dfdef69d1cadf12b
Production audit PR     #120
Production verify       30614617534
Canonical normal CI     30614478890
Verified state          33 / 34 / 183 / 284
Archived evidence       10 / 284
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-07-31T07:57:38.614Z
Publication attempt     2
```

## Next

1. merge Archive Capture Batch 2 after final normal CI;
2. production-verify all twenty-one published `archived_url` fields;
3. continue bounded archive capture work from 75 risky-host and 46 terminal unique URLs;
4. reduce the remaining 16 events without primary evidence where justified;
5. continue validator, monitoring, candidate collection, and v1 hardening.
