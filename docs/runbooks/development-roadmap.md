# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-08-03

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
         Archive capture Batch 4                   production-verified — PRs #129–#131
         Archive capture Batch 5                   production-verified — PRs #132–#134
         Archive capture Batch 6                   production-verified — PRs #135–#138
         Archive capture Batch 7                   production-verified — PRs #139–#141
         Archive capture Batch 8                   production-verified — PRs #142–#144
         Archive capture Batch 9                   production-verified — PRs #145–#147
         Archive capture Batch 10                  production-verified — PRs #148–#151
         Archive capture Batch 11                  production-verified — PRs #152–#156
         Archive capture Batch 12                  production-verified — PRs #157–#160
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed production checkpoint

```text
Canonical data PR             #158
Canonical merge               7d5d6edfc2c7ed355fcfd78a51076e0bd4cc7029
Build-input refresh PR        #160
Build-input refresh           15023871b100b6b15b277163d09db8769a3bdb1b
Production audit PR           #159
Production verify run         30791989085
Initial failed job            91617276143
Immediate refresh failed job  91618712843
Production verify job         91620118112
Canonical final CI            30791883397
Initial verification CI       30791989124
Build-input refresh CI        30792375569
Verified state                33 / 34 / 183 / 284
Archived evidence             91 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-03T07:18:33.180Z
Publication attempt           18 on delayed rerun after build-input refresh
```

The initial verifier and an immediate post-refresh rerun each rejected the prior same-count evidence content at `bir_src_000076` for twenty attempts. The build-input refresh was not repeated. After the Pages deployment delay, the same workflow run converged on attempt 18 and verified all ninety-one archive fields.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url            91
Terminal unarchived unique URLs       36
Terminal unarchived records           49
Risky-host unarchived unique URLs     29
Risky-host unarchived records         45
X/Twitter records unarchived          32
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current-operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive Capture Batch 12 added four verified Wayback snapshots to six Celer, SOCKET, and Rubic evidence records. A technically valid Holograph replay was rejected because its 2022 timestamp predates the 2026 canonical current-state claim. Other deferred candidates remain unarchived and may be retried without weakening replay or temporal-fit requirements.

## Immediate source-quality targets

1. continue verified archive captures from the 29 risky-host and 36 terminal unique-URL queues;
2. retry deferred official-source candidates with exact replay and claim-time verification;
3. reduce the remaining 16 events without primary evidence where appropriate;
4. strengthen remaining validators;
5. continue monitoring and candidate collection;
6. complete v1 hardening.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes per job
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

Batch 12 established that a valid Pages build may complete after the immediate five-minute rerun window. When `generated_at` remains unchanged after a reviewed build-input refresh, do not stack additional refresh commits automatically. Preserve the same verifier expectations, allow deployment latency, and rerun the failed job.

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
17. A technically valid snapshot must also be temporally compatible with the canonical claim.
18. A deployment refresh must preserve canonical content and verification requirements; docs-only commits are not assumed to start a Pages build.
19. An unchanged `generated_at` after a build-input refresh is evidence of deployment latency, not permission to weaken or reset verification expectations.
