# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-31

GitHub state and canonical JSON are authoritative.

## Canonical baseline

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
         Source-quality remediation Batch 1        complete — PRs #103–#105
         URL-status remediation Batch 1            complete — PRs #106–#107
         Event Tier 1 remediation                  production-verified — PRs #108–#116
         Nerve source boundary                     reviewed — PR #117
         Archive-risk Batch 1 review               complete — PR #118
         Archive capture Batch 1                   canonical pending merge — PR #119
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed production checkpoint

The completed production checkpoint remains the pre-archive 284-evidence state until Batch 1 archive fields are explicitly verified.

```text
Canonical data PR        #115
Canonical merge          b07a33b6a61be8338466b5257e121a543884e2f3
Production audit PR      #116
Production verify run    30612188969
Canonical normal CI      30544058869
Production-PR normal CI  30612188935
Verified state           33 / 34 / 183 / 284
Canonical content match  true
Verified HTML routes     72
Verified redirects       74
Generated at             2026-07-31T07:14:14.901Z
Publication attempt      1
```

## Current canonical quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url            10
Terminal unarchived unique URLs       54
Risky-host unarchived unique URLs     83
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive capture Batch 1 adds five verified Wayback snapshots to ten canonical evidence records and tightens both archive-risk ceilings. The unavailable Qubit compensation-plan page remains unarchived rather than receiving a guessed capture.

## Immediate source-quality targets

1. merge and production-verify archive capture Batch 1;
2. continue verified archive captures from the 83 risky-host and 54 terminal unique-URL queues;
3. reduce the remaining 16 events without primary evidence where appropriate;
4. strengthen remaining validators;
5. continue monitoring, candidate collection, and v1 hardening.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

## Remaining roadmap

1. production-verify archive capture Batch 1;
2. continue bounded archive preservation batches;
3. remediate justified primary-evidence gaps;
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
11. Source-quality gap ceilings may decrease but must not increase.
12. Archive-risk ceilings count unique source URLs; any increase requires an explicit reviewed canonical source addition and a newly fixed ceiling.
13. Source hierarchy must not be weakened to improve coverage metrics.
14. Unknown URL statuses require explicit review and are not permitted in canonical data.
15. Production publication is proven by full generated-content equality, not counts or IDs alone.
16. An archive URL must resolve to a verified snapshot; wildcard or guessed captures are not canonical evidence.
