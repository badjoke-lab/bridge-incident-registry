# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative.

## Canonical review-branch baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    256
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
         Source-count remediation Batch 4          implemented — PRs #93–#94
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest production checkpoint

```text
Canonical data PR        #90
Canonical merge          83d61fc1b4778a7a255db2de152c7b8d168a170f
Deployment retrigger     5d23d7da414e65226f37caafbfce3884fd1aeb8c
Production verify run    30424531817
Canonical normal CI run  30424388432
Verified state           33 / 34 / 183 / 241
Verified HTML routes     72
Verified redirects       74
```

Batch 3 remains the production baseline until the Batch 4 canonical migration is merged and explicitly verified live.

## Source-count trajectory

```text
Initial total mismatches   60
After safe normalization   47
After Batch 1              37
After Batch 2              27
After Batch 3              17
After Batch 4               7
Incident mismatches         0
```

## Implemented Batch 4 migration

```text
New event-scoped evidence records   15
Affected incident updates             3 incidents / +9 records
Event source_count reductions          0
Resulting evidence                    256
Remaining event mismatches              7
```

The reviewed source links satisfy all ten Batch 4 event counts without reducing any event `source_count`. Preserved incident linkage requires exact synchronization of the three affected incident derived counts.

Records:

- `docs/audits/phase3-source-count-review-batch4-2026-07-29.md`
- `docs/audits/phase3-source-count-batch4-canonical-2026-07-29.md`

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. merge and production-verify Batch 4;
2. review and migrate the final 7 event evidence-link mismatches;
3. promote exact source-count equality to a hard CI gate;
4. strengthen primary-source and archive coverage;
5. harden URLs and archives;
6. strengthen remaining validators;
7. complete public-contract compatibility review;
8. add monitoring with no automatic publication;
9. complete v1 documentation, accessibility, performance, and release checks.

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
