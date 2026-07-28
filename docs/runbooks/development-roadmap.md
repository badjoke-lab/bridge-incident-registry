# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline

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
         Source-count remediation Batch 2          complete — PRs #84–#88
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest publication checkpoint

```text
Canonical data PR        #85
Canonical merge          70bd5de1526cca5ce3122a7bdc23ea80d50179e0
Deployment retrigger     99941592b9e526661ad004e6504c26588737d7fc
Production verify run    30374628843
Normal CI run            30374629112
Verified state           33 / 34 / 183 / 231
Verified HTML routes     72
```

## Source-count trajectory

```text
Initial total mismatches   60
After safe normalization   47
After Batch 1              37
After Batch 2              27
Incident mismatches         0
```

## Completed Batch 2 migration

```text
New event-scoped evidence records   10
Incident source_count updates        6
Event source_count reductions        2
Resulting evidence                  231
Remaining event mismatches           27
```

The two count reductions removed unsupported historical source totals rather than fabricating duplicate evidence. Preserved incident linkage required six incident derived-count synchronizations.

Two initial production checks failed because Cloudflare remained at the Batch 1 deployment. A diagnostic confirmed the stale live state. A docs-only main push retriggered the existing Git integration, and the unchanged verifier then passed.

Records:

- `docs/audits/phase3-source-count-review-batch2-2026-07-28.md`
- `docs/audits/phase3-source-count-batch2-canonical-2026-07-28.md`
- `docs/audits/production-deployment-retrigger-batch2-2026-07-28.md`
- `docs/audits/production-verification-phase3-source-count-batch2-2026-07-28.md`

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. review and migrate the remaining 27 event evidence-link mismatches in bounded batches;
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
