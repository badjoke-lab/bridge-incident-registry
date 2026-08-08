# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-08-09

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
         Archive capture Batch 16                  production-verified — PRs #188–#190
         Archive capture Batch 17                  production-verified — PRs #191–#193
         Archive capture Batch 18                  production-verified — PRs #194, #195, #197, #198
         Previously-unreviewed archive queue       exhausted
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

The public UI/support follow-up is current through PR #187. Representative screenshots, expanded incident and bridge discovery, filters, pagination, detail TOCs, Support, project navigation, and shared BadJoke-Lab wallet presentation are merged without changing canonical counts.

## Latest completed production checkpoint

```text
Review PR                     #194
Review merge                  1717b5dbea5fd38756e60120be2d131dcb4fe43a
Canonical data PR             #195
Canonical merge               50ca3782c4940e095ff94de2cce220a3ee0c7da5
Build-input refresh PR        #197
Build-input refresh           59b74d26a86373e6e97e6e630b54becd35f64910
Production audit PR           #198
Initial production run        31266002708
Initial production job        93124105488
Successful production run     31266360510
Successful production job     93125031659
Verified state                33 / 34 / 183 / 284
Archived evidence             124 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-08T16:07:52.937Z
Publication attempt           1 after refresh
```

The initial Batch 18 verifier rejected same-count stale evidence at `bir_src_000132` for all twenty attempts. A newer generated build appeared inside the window but still lacked the canonical field change. The single permitted behavior-neutral build-input refresh changed no canonical content, build semantics, or verification expectations. The unchanged verifier then passed on the first post-refresh attempt. No second refresh was used.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url           124
Terminal unarchived unique URLs       17
Terminal unarchived records           27
Risky-host unarchived unique URLs     18
Risky-host unarchived records         32
X/Twitter records unarchived          29
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current-operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive Capture Batch 18 reviewed the final nine previously-unreviewed terminal/risky-host candidate URLs visible to the established reviewer. Four reproducible exact mappings were published for Avalanche Bridge AEB support material, Syndicate exploit reporting, Everclear wind-down reporting, and the renproject GitHub organization. The remaining reviewed URLs were deferred under the unchanged exact replay, temporal-fit, minimum-size, and two-run reproducibility boundaries.

There is no untouched archive-review Batch 19. The unresolved archive counts now represent reviewed deferred sources plus any sources outside the historical reviewer scope. Further archive preservation must use an explicit deferred-retry inventory or process newly introduced canonical sources.

## Immediate source-quality targets

1. build and run a bounded deferred archive-retry pass against already-reviewed unresolved sources, prioritizing official-domain and temporally eligible candidates without weakening acceptance rules;
2. reduce the remaining 16 events without primary evidence where appropriate;
3. strengthen remaining validators;
4. begin review-gated monitoring and candidate collection with no automatic canonical publication;
5. complete v1 documentation, accessibility, performance, compatibility, and release checks.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes per job
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

Batch 15 proved that arbitrary preview builds can saturate the Pages queue and delay production. The project continues to use `preview_deployment_setting: none`; temporary branches must not create Pages previews. Batch 18 additionally proved that a newer `generated_at` alone is not proof of canonical publication: the field-level verifier still rejected stale `bir_src_000132`. Only the single permitted behavior-neutral refresh was used, and the unchanged verifier remained authoritative.

## Remaining roadmap

1. retry selected deferred archive candidates under unchanged evidence-preservation rules;
2. remediate justified primary-evidence gaps;
3. strengthen remaining validators;
4. maintain public-contract and UI compatibility checks;
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
19. A changed `generated_at` without field-level equality is still failed publication and does not justify weakening or resetting verification expectations.
20. Only one reviewed behavior-neutral build-input refresh is permitted per publication batch; a second refresh must not be stacked.
21. Cloudflare Pages preview deployment remains `none`; intentional preview support requires a separately reviewed configuration change.
22. Do not create an artificial untouched archive batch after the reviewer has exhausted its previously-unreviewed candidate set.
