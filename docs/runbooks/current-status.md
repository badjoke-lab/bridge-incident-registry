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
Evidence with archived_url                94 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence             6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          36
Terminal unarchived evidence records     49
Risky-host unarchived unique URLs        27
Risky-host unarchived evidence records   42
X/Twitter evidence records unarchived    30
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse one source URL create one preservation obligation.

Archive Capture Batch 13 reviewed ten exact canonical source URLs. Three exact, temporally compatible captures were approved and published:

```text
bir_src_000248  SlowMist Transit Swap exploit analysis
bir_src_000275  SOCKET fund recovery update
bir_src_000278  Transit Finance recovery update
```

The SlowMist Medium capture improves overall archive coverage but is outside the risky-host host set. The SOCKET and Transit Finance X/Twitter captures reduce the risky-host unique-URL queue from 29 to 27. All three records reduce the record-level risky-host queue from 45 to 42. Terminal queues remain unchanged.

Holograph and Unizen exact replays remained below the permanent 65,536-byte boundary. Taiko, Syndicate Commons, and Everclear returned no accepted exact capture. They remain deferred rather than receiving wildcard, guessed, short, failed, or temporally incompatible snapshots.

The first canonical application attempt projected a risky-host ceiling of 26. The permanent source-quality validator observed 27 and rejected the attempt before commit. The corrected bounded run passed all canonical, controlled-failure, build, and dist checks and removed its temporary write files.

The initial production verifier then rejected stale same-count evidence content at `bir_src_000248` for twenty attempts. PR #175 introduced one behavior-neutral build-input refresh. The unchanged verifier continued to see the old build through attempt 19 and converged at attempt 20 with `generated_at 2026-08-05T03:00:56.755Z`. Complete equality was confirmed for all four public datasets, 72 HTML routes, and 74 redirects.

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
Review PR                     #173
Review merge                  fba6c668207ba1fb2613840df81123a54da5b669
Canonical data PR             #174
Canonical merge               ab0b45fb1f1cbe6cdddd1238c37fb99f201c934f
Build-input refresh PR        #175
Build-input refresh           15472395efdb4435380dbd0fdae8c7fe71e54b06
Production audit PR           #176
Initial production run        30970204138
Initial failed job            92192668199
Production verify run         30970746866
Production verify job         92194294438
Verified state                33 / 34 / 183 / 284
Archived evidence             94 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T03:00:56.755Z
Publication attempt           20 after one build-input refresh
```

## Next

1. continue bounded archive capture work from 27 risky-host and 36 terminal unique URLs;
2. retry deferred official-source candidates without weakening replay or temporal-fit requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 documentation, accessibility, performance, and release hardening.
