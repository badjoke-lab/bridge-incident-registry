# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-03

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
Evidence with archived_url                91 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence             6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          36
Terminal unarchived evidence records     49
Risky-host unarchived unique URLs        29
Risky-host unarchived evidence records   45
X/Twitter evidence records unarchived    32
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse the same source URL create one preservation obligation.

Archive Capture Batch 12 added four verified Wayback snapshots to six first-party social evidence records: `bir_src_000076`, `bir_src_000271`, `bir_src_000274`, `bir_src_000080`, `bir_src_000165`, and `bir_src_000272`. The preserved sources cover Celer's DNS incident and restoration update, SOCKET's incident acknowledgement, and Rubic's incident announcement. Source URLs, claims, source tiers, reliability, dates, and linkages remain unchanged.

A technically valid 2022 Holograph documentation snapshot was rejected because it predates the 2026 current-state claim in `bir_src_000116`. BNB Chain Fusion, SOCKET restart, pNetwork end-of-life, Commons terminal, Transit Finance recovery, and Holograph therefore remain deferred rather than receiving guessed or temporally incompatible snapshots.

The permanent validator established that all six approved records belong to active bridges, so Batch 12 reduced the risky-host queue only. It also corrected the terminal evidence-record count from a stale runbook value of 47 to the authoritative validator value of 49.

The initial production job and an immediate post-refresh rerun each rejected `bir_src_000076` for twenty attempts while `generated_at` remained `2026-08-03T06:55:57.708Z`. No further repository change was made. A delayed rerun converged on attempt 18 at `generated_at 2026-08-03T07:18:33.180Z`, confirming all ninety-one archive fields and complete canonical-derived public-content equality.

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
Canonical data PR             #158
Canonical merge               7d5d6edfc2c7ed355fcfd78a51076e0bd4cc7029
Build-input refresh PR        #160
Build-input refresh           15023871b100b6b15b277163d09db8769a3bdb1b
Production audit PR           #159
Production verify             30791989085
Initial failed job            91617276143
Immediate refresh failed job  91618712843
Production verify job         91620118112
Canonical final CI            30791883397
Initial verification CI       30791989124
Build-input refresh CI        30792375569
Verified state                33 / 34 / 183 / 284
Archived evidence             91 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-03T07:18:33.180Z
Publication attempt           18 on delayed rerun after build-input refresh
```

## Next

1. continue bounded archive capture work from 29 risky-host and 36 terminal unique URLs;
2. retry deferred official-source candidates without weakening replay or temporal-fit requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. continue monitoring, candidate collection, and v1 hardening.
