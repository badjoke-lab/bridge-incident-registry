# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    221
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
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest publication checkpoint

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
Incident mismatches         0
```

## Completed Batch 1 migration

```text
New event-scoped evidence records   10
Incident source_count updates        7
Event source_count changes           0
Resulting evidence                  221
Remaining event mismatches           37
```

The reused URLs are not counted as new independent publications. Each canonical evidence record represents a distinct event and claim-scope linkage. Preserved incident links required seven incident derived-count synchronizations.

Records:

- `docs/audits/phase3-source-count-review-batch1-2026-07-28.md`
- `docs/audits/phase3-source-count-batch1-canonical-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-batch1-2026-07-28.md`

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

The initial Batch 1 production attempt exhausted the unchanged convergence window. A retry passed after Cloudflare publication converged; no verification condition was relaxed.

## Remaining roadmap

1. review and migrate the remaining 37 event evidence-link mismatches in bounded batches;
2. promote exact source-count equality to a hard CI gate;
3. strengthen primary-source and archive coverage;
4. harden URLs and archives;
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
