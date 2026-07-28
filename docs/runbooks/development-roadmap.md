# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline on Batch 2 review branch

```text
Bridges     33
Incidents   34
Events      183
Evidence    231
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
         Source-count review Batch 2               complete — PR #84
         Batch 2 canonical migration               implemented on review branch
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed publication checkpoint

```text
Canonical data PR        #82
Merge commit             626ac6b91c5ce9165938034055ccb7edc14071a7
Production verify run    30370374622
Normal CI run            30370374443
Verified state           33 / 34 / 183 / 221
Verified HTML routes     72
```

## Source-count trajectory

```text
Initial total mismatches   60
After safe normalization   47
After Batch 1              37
After Batch 2              27 expected
Incident mismatches         0
```

## Batch 2 canonical migration

```text
New event-scoped evidence records   10
Incident source_count updates        6
Event source_count reductions        2
Resulting evidence                  231
Expected remaining mismatches        27
```

The two count reductions remove unsupported historical source totals rather than fabricating duplicate evidence. Preserved incident linkage requires six incident derived-count synchronizations.

Records:

- `docs/audits/phase3-source-count-review-batch2-2026-07-28.md`
- `docs/audits/phase3-source-count-batch2-canonical-2026-07-28.md`

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. merge and production-verify Batch 2 at 33 / 34 / 183 / 231;
2. review and migrate the remaining 27 event evidence-link mismatches in bounded batches;
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
