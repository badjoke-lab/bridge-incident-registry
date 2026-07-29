# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    263
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Full-corpus audit                         complete — PR #71
         Reimbursement/restart normalization       complete — PRs #72–#77
         Source-count contract                     complete — PR #78
         Safe source-count normalization           complete — PRs #79–#80
         Source-count remediation Batch 1          complete — PRs #81–#83
         Source-count remediation Batch 2          complete — PRs #84–#88
         Source-count remediation Batch 3          complete — PRs #89–#92
         Source-count remediation Batch 4          complete — PRs #93–#95
         Final source-count migration              complete — PRs #96–#99
         Hard source-count equality gate           active
         Source-quality baseline                   complete — PR #100
         Source-quality no-regression gate         active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest publication checkpoint

```text
Canonical data PR        #97
Canonical merge          e03386ab6d1242e2918700839b8449faff5c40c6
Deployment retrigger     be5c6242647feb36c14d35f65e945f4e437ada70
Production verify run    30427603790
Canonical normal CI run  30427464812
Verified state           33 / 34 / 183 / 263
Verified HTML routes     72
Verified redirects       74
```

## Source-count trajectory

```text
Initial total mismatches   60
After safe normalization   47
After Batch 1              37
After Batch 2              27
After Batch 3              17
After Batch 4               7
After final migration       0
Incident mismatches         0
Event mismatches            0
```

## Completed final migration

```text
New event-scoped evidence records    7
Affected incident updates             2 incidents / +6 records
Event source_count reductions          0
Resulting evidence                    263
Remaining source-count mismatches       0
```

The reviewed links satisfy all remaining event counts. Exact equality is enforced by a permanent checker and two controlled drift fixtures in normal CI. Production publication has been verified at the exact-equality state.

Records:

- `docs/audits/phase3-source-count-review-final-2026-07-29.md`
- `docs/audits/phase3-source-count-final-canonical-2026-07-29.md`
- `docs/audits/production-deployment-retrigger-final-source-count-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-count-final-2026-07-29.md`

## Source-quality baseline

```text
Primary evidence                         181 / 263
Tier 1 evidence                          199 / 263
Official-domain evidence                 121 / 263
Evidence with archived_url                 0 / 263
Bridges without primary evidence          0
Bridges without tier 1 evidence           0
Incidents without primary evidence        2
Incidents without tier 1 evidence         1
Events without primary evidence          36
Events without tier 1 evidence           25
Terminal evidence without archive        76
Risky-host evidence without archive      90
Unknown URL status                        2
Unique archive-priority evidence        132
```

Normal CI now blocks regressions beyond these ceilings and rejects invalid source and archive URLs. Three controlled fixtures prove bridge-primary, event-tier-1, and risky-host archive regressions fail. The ceilings must be tightened as remediation batches reduce each queue.

Immediate source-quality targets:

1. `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: close both primary and tier-1 gaps;
2. `bir_inc_000015` — LI.FI 2022 approval-drain exploit: close the primary-source gap;
3. the 25 events without tier-1 evidence;
4. the 132-item archive-priority queue, starting with terminal bridges and X/Twitter sources;
5. the two evidence records with unknown URL status.

Record:

- `docs/audits/phase3-source-quality-baseline-2026-07-29.md`

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. close incident-level primary and tier-1 gaps;
2. reduce event-level tier-1 and primary gaps in bounded batches;
3. add archive captures for terminal and risky-host evidence and tighten archive-risk ceilings;
4. resolve unknown URL states and harden domain-state handling;
5. strengthen remaining validators;
6. complete public-contract compatibility review;
7. add monitoring with no automatic publication;
8. complete v1 documentation, accessibility, performance, and release checks.

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical and working data separate.
5. Do not merge temporary diagnostics or write-enabled workflows.
6. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
7. A disclosure is not automatically an exploit.
8. A relaunch announcement is not proof of reimbursement completion.
9. Historical SHAs are not live branch pointers.
10. Every PR must pass checks appropriate to its stage.
11. Source-quality gap and archive-risk ceilings may decrease but must not increase.
