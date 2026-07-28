# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative.

## Canonical baseline on Batch 1 review branch

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
         Source-count review Batch 1               complete — PR #81
         Batch 1 canonical migration               implemented on review branch
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed publication checkpoint

```text
Canonical data PR        #79
Merge commit             3c4bae8905ff052e987f84bc798545b467de807d
Production verify run    30367770935
Normal CI run            30367770892
Verified state           33 / 34 / 183 / 211
Verified HTML routes     72
```

## Source-count trajectory

```text
Initial total mismatches          60
After safe normalization          47
After Batch 1 review migration    37 expected
Incident mismatches                0
```

## Batch 1 canonical migration

Ten event-scoped evidence records are added for reviewed same-incident sources.

```text
New evidence records             10
Resulting evidence              221
Event text changes                0
Event source_count changes        0
Expected remaining mismatches    37
```

The reused URLs are not counted as new independent publications. Each canonical evidence record represents a distinct event or claim-scope linkage.

Records:

- `docs/audits/phase3-source-count-review-batch1-2026-07-28.md`
- `docs/audits/phase3-source-count-batch1-canonical-2026-07-28.md`

## Production publication gate

The verifier waits for canonical `version.json` counts to converge before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

After convergence, every count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertion remains mandatory.

## Remaining roadmap

1. merge and production-verify Batch 1 at 33 / 34 / 183 / 221;
2. review and migrate the remaining 37 event evidence-link mismatches in bounded batches;
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
