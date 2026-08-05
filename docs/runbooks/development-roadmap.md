# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-08-05

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
         Archive capture Batches 1–12              production-verified — PRs #118–#160
         Archive capture Batch 13                  production-verified — PRs #173–#176
         Archive capture Batch 14                  production-verified — PRs #177–#180
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed production checkpoint

```text
Review PR                     #177
Review merge                  09c11e838a3b157a9efb7388f531ff04f723e4ff
Canonical data PR             #178
Canonical merge               ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh PR        #179
Build-input refresh           3f0514b568e84b17daf9e0a2d14649b3a329c787
Production audit PR           #180
Initial production run        30976024931
Immediate post-refresh run    30976430766
First delayed run             30976783627
Production verify run         30977144358
Production verify job         92213419237
Verified state                33 / 34 / 183 / 284
Archived evidence             101 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T05:06:09.501Z
Publication attempt           1 on second delayed rerun after one refresh
```

The first three twenty-attempt windows rejected stale same-count content at `bir_src_000013`. One behavior-neutral refresh was committed and no second refresh was introduced. The next delayed run observed the new build on attempt 1 and proved complete equality.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url           101
Terminal unarchived unique URLs       33
Terminal unarchived records           45
Risky-host unarchived unique URLs     24
Risky-host unarchived records         38
X/Twitter records unarchived          30
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current-operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive Capture Batch 14 added five reproducible exact snapshots to seven Qubit, Harmony, BNB Chain, and LI.FI records. A first-run-only Harmony forum replay was rejected as non-reproducible; pNetwork, Wormhole, and Rainbow Bridge candidates remain deferred under the unchanged exact replay, temporal-fit, size, and reproducibility boundaries.

## Immediate source-quality targets

1. continue verified archive captures from the 24 risky-host and 33 terminal unique-URL queues;
2. retry deferred official-source candidates with exact replay and claim-time verification;
3. reduce the remaining 16 events without primary evidence where appropriate;
4. strengthen remaining validators;
5. begin review-gated monitoring and candidate collection with no automatic canonical publication;
6. complete v1 documentation, accessibility, performance, compatibility, and release checks.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes per job
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

Batch 14 reconfirmed that a valid Pages build may become visible only after multiple unchanged five-minute verification windows. When `generated_at` remains unchanged after one reviewed build-input refresh, do not stack another refresh commit. Preserve the same verifier expectations and allow deployment latency.

## Remaining roadmap

1. continue bounded archive preservation batches;
2. remediate justified primary-evidence gaps;
3. strengthen remaining validators;
4. complete public-contract compatibility review;
5. implement monitoring with no automatic publication;
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
17. A technically valid snapshot must also be temporally compatible with the canonical claim.
18. A deployment refresh must preserve canonical content and verification requirements; docs-only commits are not assumed to start a Pages build.
19. An unchanged `generated_at` after a build-input refresh is evidence of deployment latency, not permission to weaken or reset verification expectations.
