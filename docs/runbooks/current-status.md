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
Evidence with archived_url                85 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence            6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          36
Terminal unarchived evidence records     47
Risky-host unarchived unique URLs        33
Risky-host unarchived evidence records   51
X/Twitter evidence records unarchived    38
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse the same source URL create one preservation obligation.

Archive Capture Batch 11 added one verified Wayback snapshot to the first-party Tier 1 Multichain cessation evidence record `bir_src_000029`. Source URL, claim, source tier, reliability, date, and linkages remain unchanged. Nine selected Everclear, Syndicate, Holograph, Wormhole, and Taiko candidates did not pass the exact replay boundary and received no guessed snapshot.

The initial production job rejected the prior public content at `bir_src_000029` for all twenty attempts. A docs-only retrigger also failed for twenty attempts and retained `generated_at 2026-08-03T04:13:42.118Z`, proving no new Pages build had started. PR #156 changed only a non-executable build-script comment; the resulting build-input refresh published the canonical content, and the unchanged verifier passed on the first attempt with all eighty-five archive fields.

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
Canonical data PR        #153
Canonical merge          f8c0772acbabbf7f468f818e3d8f00b83ca9e38a
Docs-only retrigger PR   #155
Docs-only retrigger      d143b3b12b11c79cd0d78e30b965a25ed4d5e480
Build-input refresh PR   #156
Build-input refresh      2276d4e37096e29f090c0238f9f0cd6f64a725eb
Production audit PR      #154
Production verify        30783692287
First failed job         91593095620
Second failed job        91594233914
Production verify job    91595453784
Canonical final CI       30783546644
Initial verification CI  30783692322
Build-input refresh CI   30784453676
Verified state           33 / 34 / 183 / 284
Archived evidence        85 / 284
Canonical content match  true
Verified HTML routes     72
Verified redirects       74
Generated at             2026-08-03T04:26:39.509Z
Publication attempt      1 after build-input refresh
```

## Next

1. continue bounded archive capture work from 33 risky-host and 36 terminal unique URLs;
2. retry deferred official-source candidates without weakening replay requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. continue monitoring, candidate collection, and v1 hardening.
