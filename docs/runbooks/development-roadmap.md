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
         Archive capture Batches 1–18              production-verified — PRs #118–#198
         Previously-unreviewed archive queue       exhausted
         Deferred Archive Retry 01                 production-verified — PRs #199–#201
         Deferred Archive Retry 02                 production-verified — PRs #202–#204
         Deferred Archive Retry 03                 review complete — PR #205, approved 0
         Deferred Archive Retry 04                 review complete — PR #206, approved 0
         Fresh deferred retry pool                 exhausted
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

The public UI/support follow-up is current through PR #187. Representative screenshots, expanded incident and bridge discovery, filters, pagination, detail TOCs, Support, project navigation, and shared BadJoke-Lab wallet presentation are merged without changing canonical counts.

## Latest completed production checkpoint

```text
Review PR                     #202
Review merge                  e77695ddf0523533ad785a44e797480daa8d400a
Canonical data PR             #203
Canonical merge               46b6e19700d8553c75c4555549b9ca308cbc7292
Production audit PR           #204
Production verify run         31298305603
Production verify job         93206834594
Verified state                33 / 34 / 183 / 284
Archived evidence             127 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-09T06:10:37.053Z
Publication attempt           1 / 20
Build-input refresh           not required
```

The production verifier confirmed the exact `bir_src_000166.archived_url` mapping and complete field-level equality across all four public canonical datasets on attempt 1.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url           127
Terminal unarchived unique URLs       15
Terminal unarchived records           25
Risky-host unarchived unique URLs     16
Risky-host unarchived records         30
X/Twitter records unarchived          29
Unknown URL status                     0
```

Archive Capture Batch 18 exhausted the previously-unreviewed archive queue. The deferred inventory reconstructed 45 reviewed-but-unarchived evidence records across 32 unique URLs from permanent review audits and current canonical data.

Deferred Archive Retry 01 recovered Qubit's compensation plan and Harmony's Horizon Bridge incident summary. Deferred Archive Retry 02 recovered the QuillAudits Rubic exploit analysis (`bir_src_000166`). Across Retries 01–02, three evidence records on three unique URLs were resolved, leaving 42 reviewed-but-unarchived evidence records across 29 unique URLs.

Deferred Retry 03 reviewed ten of the twelve fresh URLs outside the recent Retry 01/02 scopes and approved none. Deferred Retry 04 reviewed the final two fresh URLs and approved none. The remaining reviewed-unarchived pool now consists only of URLs already explicitly retried under the unchanged acceptance boundary.

There is no untouched archive-review Batch 19 and no fresh Deferred Retry 05 scope. Future preservation work must wait for materially changed conditions, deliberately selected re-review, or newly introduced canonical source URLs.

## Immediate source-quality targets

1. reduce the remaining 16 events without primary evidence where appropriate, without weakening source hierarchy;
2. keep intentional secondary-only gaps explicit and reviewed;
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

Batch 18 proved that a newer `generated_at` alone is not proof of canonical publication. Field-level equality remained authoritative. Deferred Retries 01 and 02 required no refresh; Retry 02 converged on the first verifier attempt.

## Remaining roadmap

1. remediate justified event primary-evidence gaps;
2. strengthen remaining validators;
3. maintain public-contract and UI compatibility checks;
4. implement monitoring with no automatic publication;
5. complete v1 documentation, accessibility, performance, and release checks;
6. revisit archive preservation only under a new explicit reviewed scope.

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
23. Deferred retries must use explicit reviewed-unresolved targets and preserve the same acceptance boundary.
24. Do not immediately recycle deferred archive failures once the fresh retry pool is exhausted; wait for changed conditions, new canonical source URLs, or a separately justified reviewed retry scope.
