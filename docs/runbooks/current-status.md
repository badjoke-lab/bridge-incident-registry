# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-05

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
Archive capture Batch 4              production-verified — PRs #129–#131
Archive capture Batch 5              production-verified — PRs #132–#134
Archive capture Batch 6              production-verified — PRs #135–#138
Archive capture Batch 7              production-verified — PRs #139–#141
Archive capture Batch 8              production-verified — PRs #142–#144
Archive capture Batch 9              production-verified — PRs #145–#147
Archive capture Batch 10             production-verified — PRs #148–#151
Archive capture Batch 11             production-verified — PRs #152–#156
Archive capture Batch 12             production-verified — PRs #157–#160
Archive capture Batch 13             production-verified — PRs #173–#176
Archive capture Batch 14             production-verified — PRs #177–#180
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
Evidence with archived_url               101 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence             6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          33
Terminal unarchived evidence records     45
Risky-host unarchived unique URLs        24
Risky-host unarchived evidence records   38
X/Twitter evidence records unarchived    30
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse one source URL create one preservation obligation.

Archive Capture Batch 14 reviewed ten previously unreviewed exact canonical source URLs. Five reproducible exact captures were approved and published to seven records covering Qubit, Harmony Horizon reporting, BNB Chain, and two LI.FI analyses. The permanent validator confirmed 101 archived evidence records, 33 terminal unique URLs, and 24 risky-host unique URLs.

One Harmony forum capture was rejected because it passed only the first review run. pNetwork returned no exact capture; Wormhole replay content remained short or absent; Rainbow Bridge returned no exact capture on the completed rerun. No wildcard, guessed, short, failed, temporally incompatible, or non-reproducible capture was accepted.

The initial verifier, immediate post-refresh verifier, and first delayed verifier each rejected stale same-count evidence content at `bir_src_000013` for twenty attempts. Only one behavior-neutral build-input refresh was committed. The second delayed run converged on attempt 1 at `generated_at 2026-08-05T05:06:09.501Z`, confirming complete equality for all four datasets, 72 HTML routes, and 74 redirects.

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
Review PR                     #177
Review merge                  09c11e838a3b157a9efb7388f531ff04f723e4ff
Canonical data PR             #178
Canonical merge               ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh PR        #179
Build-input refresh           3f0514b568e84b17daf9e0a2d14649b3a329c787
Production audit PR           #180
Initial production run        30976024931
Initial failed job            92210067226
Immediate refresh run         30976430766
Immediate refresh failed job  92211270159
First delayed run             30976783627
First delayed failed job      92212328360
Production verify run         30977144358
Production verify job         92213419237
Verified state                33 / 34 / 183 / 284
Archived evidence             101 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T05:06:09.501Z
Publication attempt           1 on second delayed rerun after one refresh
```

## Next

1. continue bounded archive capture work from 24 risky-host and 33 terminal unique URLs;
2. retry deferred official-source candidates without weakening replay or temporal-fit requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 documentation, accessibility, performance, and release hardening.
