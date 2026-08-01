# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-01

## Canonical and production state

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
Source-quality remediation           complete — PRs #103–#107
Event Tier 1 remediation             production-verified — PRs #108–#116
Nerve source boundary                reviewed — PR #117
Archive capture Batch 1              production-verified — PRs #118–#120
Archive capture Batch 2              production-verified — PRs #122–#125
Archive capture Batch 3              production-verified — PRs #126–#128
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
Evidence with archived_url                27 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence            6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          40
Terminal unarchived evidence records     52
Risky-host unarchived unique URLs        69
Risky-host unarchived evidence records  109
X/Twitter evidence records unarchived    42
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse the same source URL create one preservation obligation.

Archive Capture Batch 3 added six verified Wayback snapshots to first-party ShuttleFlow, pNetwork, and Qubit/Bunny evidence records. Source URLs, claims, source tiers, reliability, dates, and linkages remain unchanged. The known unavailable Qubit compensation-plan page remains unarchived.

The unchanged production verifier rejected the same-count Batch 2 dataset at `bir_src_000038` for publication attempts 1 through 19. Production converged without a deployment retrigger on attempt 20, with all twenty-seven archive fields and complete canonical-derived content equality.

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

```text
Canonical data PR       #127
Canonical merge         5d3d472a6851843d31c896f27aaff74ddc6b44f0
Production audit PR     #128
Production verify       30689740068
Production verify job   91342221102
Canonical normal CI     30689665597
Verification PR CI      30689740071
Verified state          33 / 34 / 183 / 284
Archived evidence       27 / 284
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-08-01T07:30:44.916Z
Publication attempt     20
```

## Next

1. continue bounded archive capture work from 69 risky-host and 40 terminal unique URLs;
2. reduce the remaining 16 events without primary evidence where justified;
3. strengthen remaining validators;
4. continue monitoring, candidate collection, and v1 hardening.
