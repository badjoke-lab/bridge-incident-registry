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
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

The public UI/support follow-up is current through PR #187. Representative screenshots, expanded incident and bridge discovery, filters, pagination, detail TOCs, Support, project navigation, and shared BadJoke-Lab wallet presentation are merged without changing canonical counts.

## Latest completed production checkpoint

```text
Review PR                     #191
Review merge                  a51511460c390d1dce9eb35d70a26f03f58a948d
Canonical data PR             #192
Canonical merge               3aa5f6cbd7a38ac1da5332e5dd3ea038409776d7
Production audit PR           #193
Production verify run         31265282488
Production verify job         93122316026
Verified state                33 / 34 / 183 / 284
Archived evidence             120 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-08T15:46:44.950Z
Publication attempt           5
Build-input refresh           not required
```

Attempts 1 through 4 rejected stale same-count evidence at `bir_src_000024`. Attempt 5 observed the new production build and proved complete canonical-derived equality. No deployment refresh or queue remediation was required.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url           120
Terminal unarchived unique URLs       21
Terminal unarchived records           31
Risky-host unarchived unique URLs     18
Risky-host unarchived records         32
X/Twitter records unarchived          29
Unknown URL status                     0
```

The remaining Nerve incident-level source gap is reviewed and intentional under PR #117. Current-operation evidence is not reused as historical incident evidence, and Tier 2 security analysis is not reclassified.

Archive Capture Batch 17 added four reproducible exact mappings to Everclear, BNB Chain Fusion, a Harmony recovery proposal, and Syndicate bridging documentation. Everclear Q3/blog material, the arXiv bridge-hacks review, KinetFlow Conflux material, PeckShieldAlert Unizen X material, and the Syndicate wind-down X thread remain deferred under the unchanged exact replay, temporal-fit, size, and reproducibility boundaries.

## Immediate source-quality targets

1. continue verified archive captures from the 18 risky-host and 21 terminal unique-URL queues as Batch 18;
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

Batch 15 proved that arbitrary preview builds can saturate the Pages queue and delay production. The project continues to use `preview_deployment_setting: none`; temporary branches must not create Pages previews. When `generated_at` remains unchanged after one reviewed build-input refresh, inspect the production queue without weakening expectations or stacking refresh commits. Batch 17 required no refresh and converged on attempt 5.

## Remaining roadmap

1. continue bounded archive preservation batches;
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
19. An unchanged `generated_at` after a build-input refresh is evidence of deployment latency, not permission to weaken or reset verification expectations.
20. Cloudflare Pages preview deployment remains `none`; intentional preview support requires a separately reviewed configuration change.
