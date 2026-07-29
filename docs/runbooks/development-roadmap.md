# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative.

## Canonical review-branch baseline

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
         Final source-count migration              implemented — PRs #96–#97
         Hard source-count equality gate           implemented — PR #97
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest production checkpoint

```text
Canonical data PR        #94
Canonical merge          fd210052b40ff038156b22d116848751990b5633
Publication trigger      44e785c0e286ff16a5bcd1fddc1e9ce2b9fbc37c
Production verify run    30426111329
Canonical normal CI run  30425990662
Verified state           33 / 34 / 183 / 256
Verified HTML routes     72
Verified redirects       74
```

Batch 4 remains the production baseline until the final canonical migration is merged and explicitly verified live.

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

## Implemented final migration

```text
New event-scoped evidence records    7
Affected incident updates             2 incidents / +6 records
Event source_count reductions          0
Resulting evidence                    263
Remaining source-count mismatches       0
```

The reviewed links satisfy all remaining event counts. Exact equality is now enforced by a permanent checker and two controlled drift fixtures in normal CI.

Records:

- `docs/audits/phase3-source-count-review-final-2026-07-29.md`
- `docs/audits/phase3-source-count-final-canonical-2026-07-29.md`

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. merge and production-verify the final source-count migration;
2. strengthen primary-source and archive coverage;
3. harden URLs and archives;
4. strengthen remaining validators;
5. complete public-contract compatibility review;
6. add monitoring with no automatic publication;
7. complete v1 documentation, accessibility, performance, and release checks.

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
