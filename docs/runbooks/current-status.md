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
Evidence with archived_url                81 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence            6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          39
Terminal unarchived evidence records     51
Risky-host unarchived unique URLs        36
Risky-host unarchived evidence records   55
X/Twitter evidence records unarchived    42
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse the same source URL create one preservation obligation.

Archive Capture Batch 9 added one verified Wayback snapshot to the first-party Tier 1 Poly Network mainnet-upgrade evidence record `bir_src_000203`. Source URL, claim, source tier, reliability, date, and linkages remain unchanged. The known unavailable Qubit compensation-plan source remains unarchived and received no guessed snapshot.

The unchanged production verifier rejected the same-count Batch 8 dataset at `bir_src_000203` for publication attempts 1 through 6. Production converged without a deployment retrigger on attempt 7, with all eighty-one archive fields and complete canonical-derived content equality.

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
Canonical data PR       #146
Canonical merge         dce643e53c1d2417aeca6eae235d38dc20d32ca6
Production audit PR     #147
Production verify       30779827391
Production verify job   91582150806
Canonical normal CI     30736754061
Verification PR CI      30779827393
Verified state          33 / 34 / 183 / 284
Archived evidence       81 / 284
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-08-03T02:40:37.000Z
Publication attempt     7
```

## Next

1. continue bounded archive capture work from 36 risky-host and 39 terminal unique URLs;
2. retry deferred official-source candidates without weakening replay requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. continue monitoring, candidate collection, and v1 hardening.
