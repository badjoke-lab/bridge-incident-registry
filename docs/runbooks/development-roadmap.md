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
         Archive capture Batch 15                  production-verified — PRs #181, #182, #184, #185
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Latest completed production checkpoint

```text
Review PR                     #181
Review merge                  fcf932b51445831e1d67c3c14c3ee342eff854dc
Canonical data PR             #182
Canonical merge               39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh PR        #184
Build-input refresh           7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production audit PR           #185
Initial production run        30983843765
Cloudflare remediation run    30987353553
Cloudflare remediation job    92245106402
Production verify run         30986003440
Production verify job         92245512645
Verified state                33 / 34 / 183 / 284
Archived evidence             110 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T08:02:41.108Z
Publication attempt           1 after preview-queue remediation
```

Batch 15 verifiers repeatedly rejected stale same-count content at `bir_src_000014`. One behavior-neutral refresh was committed and no second refresh was introduced. Cloudflare queue inspection showed preview builds for every temporary branch; 16 queued previews were removed, preview deployment was set to `none`, and the unchanged verifier then proved complete equality on attempt 1.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url           110
Terminal unarchived unique URLs       28
Terminal unarchived records           38
Risky-host unarchived unique URLs     21
Risky-host unarchived records         35
X/Twitter records unarchived          30
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current-operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive Capture Batch 15 added seven reproducible exact mappings to nine Elliptic, BNB Chain, SlowMist, FBI, and Dcentralab records. Aurora and QuillAudits candidates remain deferred under the unchanged exact replay, temporal-fit, size, and reproducibility boundaries.

## Immediate source-quality targets

1. continue verified archive captures from the 21 risky-host and 28 terminal unique-URL queues;
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

Batch 15 proved that arbitrary preview builds can saturate the Pages queue and delay production. The project now uses `preview_deployment_setting: none`; temporary branches must not create Pages previews. When `generated_at` remains unchanged after one reviewed build-input refresh, inspect the production queue without weakening expectations or stacking refresh commits.

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
20. Cloudflare Pages preview deployment remains `none`; intentional preview support requires a separately reviewed configuration change.
