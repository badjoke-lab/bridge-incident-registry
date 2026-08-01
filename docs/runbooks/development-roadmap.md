# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-08-01

GitHub state and canonical JSON are authoritative.

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active
         Source-count remediation                  complete — PRs #78–#99
         Hard source-count equality gate           active
         Source-quality baseline                   complete — PR #100
         Source-quality remediation                complete — PRs #103–#107
         Event Tier 1 remediation                  production-verified — PRs #108–#116
         Nerve source boundary                     reviewed — PR #117
         Archive capture Batch 1                   production-verified — PRs #118–#120
         Archive capture Batch 2                   production-verified — PRs #122–#125
         Archive capture Batch 3                   production-verified — PRs #126–#128
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed production checkpoint

```text
Canonical data PR        #127
Canonical merge          5d3d472a6851843d31c896f27aaff74ddc6b44f0
Production audit PR      #128
Production verify run    30689740068
Production verify job    91342221102
Canonical normal CI      30689665597
Verification PR CI       30689740071
Verified state           33 / 34 / 183 / 284
Archived evidence        27 / 284
Canonical content match  true
Verified HTML routes     72
Verified redirects       74
Generated at             2026-08-01T07:30:44.916Z
Publication attempt      20
```

The unchanged verifier rejected the prior same-count Batch 2 evidence dataset for publication attempts 1 through 19 at `bir_src_000038`. Production converged without a deployment retrigger on the final permitted attempt.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url            27
Terminal unarchived unique URLs       40
Risky-host unarchived unique URLs     69
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current-operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive Capture Batch 3 added six verified Wayback snapshots to first-party ShuttleFlow, pNetwork, and Qubit/Bunny evidence records. The unavailable Qubit compensation-plan page remains unarchived rather than receiving a guessed capture.

## Immediate source-quality targets

1. continue verified archive captures from the 69 risky-host and 40 terminal unique-URL queues;
2. reduce the remaining 16 events without primary evidence where appropriate;
3. strengthen remaining validators;
4. continue monitoring and candidate collection;
5. complete v1 hardening.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

## Remaining roadmap

1. continue bounded archive preservation batches;
2. remediate justified primary-evidence gaps;
3. strengthen remaining validators;
4. complete public-contract compatibility review;
5. add monitoring with no automatic publication;
6. complete v1 documentation, accessibility, performance, and release checks.

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
11. Source-quality gap ceilings may decrease but must not increase.
12. Archive-risk ceilings count unique source URLs; any increase requires an explicit reviewed canonical source addition and a newly fixed ceiling.
13. Source hierarchy must not be weakened to improve coverage metrics.
14. Unknown URL statuses require explicit review and are not permitted in canonical data.
15. Production publication is proven by full generated-content equality, not counts or IDs alone.
16. An archive URL must resolve to a verified snapshot; wildcard or guessed captures are not canonical evidence.
