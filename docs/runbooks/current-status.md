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
Evidence with archived_url                84 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence            6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          37
Terminal unarchived evidence records     48
Risky-host unarchived unique URLs        34
Risky-host unarchived evidence records   52
X/Twitter evidence records unarchived    39
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse the same source URL create one preservation obligation.

Archive Capture Batch 10 added two verified Wayback snapshots to three first-party Tier 1 Multichain evidence records: `bir_src_000025`, `bir_src_000028`, and `bir_src_000216`. Source URLs, claims, source tiers, reliability, dates, and linkages remain unchanged. Eight Everclear, Syndicate, Holograph, Wormhole, and Multichain candidates that did not pass the exact replay boundary remain unarchived and received no guessed snapshot.

The first unchanged production-verifier job rejected the same-count Batch 9 dataset at `bir_src_000025` for all twenty attempts. PR #151 added a docs-only `main` commit to retrigger Cloudflare Pages. The same workflow run then passed on the first attempt after retrigger, with all eighty-four archive fields and complete canonical-derived content equality.

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
Canonical data PR       #149
Canonical merge         6edc02270d1fdfd202ec13874a2a00845ce97897
Deployment retrigger PR #151
Deployment retrigger    fd1d0cdd1ab7fc87052ea4308834ada77561205f
Production audit PR     #150
Production verify       30781383081
Failed production job   91586560207
Production verify job   91587613338
Canonical normal CI     30781280526
Initial verification CI 30781383082
Verified state          33 / 34 / 183 / 284
Archived evidence       84 / 284
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-08-03T03:20:41.394Z
Publication attempt     1 after retrigger
```

## Next

1. continue bounded archive capture work from 34 risky-host and 37 terminal unique URLs;
2. retry deferred official-source candidates without weakening replay requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. continue monitoring, candidate collection, and v1 hardening.
