# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-30

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
Event Tier 1 Batch 1                 production-verified — PRs #108–#110
Event Tier 1 Batch 2                 production-verified — PRs #111–#113
Final event Tier 1 review            complete — PR #114
Final event Tier 1 canonical         pending merge — PR #115
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
Primary evidence                         201 / 284
Tier 1 evidence                          220 / 284
Official-domain evidence                 131 / 284
Evidence with archived_url                 0 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence            6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          59
Terminal unarchived evidence records     79
Risky-host unarchived unique URLs        88
Risky-host unarchived evidence records  136
X/Twitter evidence records unarchived    42
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple event-scoped evidence records that reuse the same source URL do not create multiple preservation obligations.

The final migration adds `bir_src_000280` through `bir_src_000284` for Rubic, Unizen, Taiko, and Everclear. It reduces event primary gaps from 20 to 16 and event Tier 1 gaps from 11 to six.

All event Tier 1 gaps are now reviewed. The six remaining gaps are intentional secondary records:

```text
bir_ev_000006
bir_ev_000009
bir_ev_000012
bir_ev_000051
bir_ev_000087
bir_ev_000088
```

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: no reviewed first-party incident source and no Tier 1 incident evidence.

## Latest completed production checkpoint

The latest completed production checkpoint remains the 279-evidence state until PR #115 merges and the 284-evidence state passes explicit production verification.

```text
Canonical data PR       #112
Canonical merge         7c52a3804043bc9d16da5ddcf6faeef608da804d
Production audit PR     #113
Production verify       30542396678
Canonical normal CI     30542215442
Production-PR normal CI 30542791896
Verified state          33 / 34 / 183 / 279
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-07-30T12:24:11.345Z
Publication attempt     2
```

## Next

1. merge PR #115 after final normal CI;
2. production-verify the full 33 / 34 / 183 / 284 public state;
3. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
4. begin verified archive captures for the 88 risky-host and 59 terminal unique-URL queues;
5. continue validator, monitoring, candidate collection, and v1 hardening.
