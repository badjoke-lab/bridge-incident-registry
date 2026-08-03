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
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed production checkpoint

```text
Canonical data PR        #153
Canonical merge          f8c0772acbabbf7f468f818e3d8f00b83ca9e38a
Docs-only retrigger PR   #155
Docs-only retrigger      d143b3b12b11c79cd0d78e30b965a25ed4d5e480
Build-input refresh PR   #156
Build-input refresh      2276d4e37096e29f090c0238f9f0cd6f64a725eb
Production audit PR      #154
Production verify run    30783692287
First failed job         91593095620
Second failed job        91594233914
Production verify job    91595453784
Canonical final CI       30783546644
Initial verification CI  30783692322
Build-input refresh CI   30784453676
Verified state           33 / 34 / 183 / 284
Archived evidence        85 / 284
Canonical content match  true
Verified HTML routes     72
Verified redirects       74
Generated at             2026-08-03T04:26:39.509Z
Publication attempt      1 after build-input refresh
```

The first two verification jobs each rejected `bir_src_000029` for twenty attempts. The docs-only retrigger did not change `generated_at`, so it did not start a new Pages build. A behavior-neutral build-input comment forced publication; the same verifier then passed on attempt 1.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url            85
Terminal unarchived unique URLs       36
Risky-host unarchived unique URLs     33
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current-operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive Capture Batch 11 added one verified Wayback snapshot to `bir_src_000029`. Nine Everclear, Syndicate, Holograph, Wormhole, and Taiko candidates that did not pass the exact replay boundary remain unarchived and may be retried without weakening acceptance requirements.

## Immediate source-quality targets

1. continue verified archive captures from the 33 risky-host and 36 terminal unique-URL queues;
2. retry deferred official-source candidates with exact replay verification;
3. reduce the remaining 16 events without primary evidence where appropriate;
4. strengthen remaining validators;
5. continue monitoring and candidate collection;
6. complete v1 hardening.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

The Batch 11 deployment incident also established that docs-only commits may not pass the Cloudflare Pages path filter. A deployment refresh must change a reviewed build input without changing execution behavior when the public build does not start.

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
17. A deployment retrigger must preserve canonical content and verification requirements; docs-only commits are not assumed to start a Pages build.
