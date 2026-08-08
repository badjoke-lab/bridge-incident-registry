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
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

The public UI/support follow-up is current through PR #187. Representative screenshots, expanded incident and bridge discovery, filters, pagination, detail TOCs, Support, project navigation, and shared BadJoke-Lab wallet presentation are merged without changing canonical counts.

## Latest completed production checkpoint

```text
Review PR                     #199
Review merge                  53bcdc47f4269a00dc1c671f7428f75a8fe35c1e
Canonical data PR             #200
Canonical merge               934c85c49f7db71773721c5f4d64cc769f1361b0
Production audit PR           #201
Production verify run         31267226936
Production verify job         93127231682
Read-only production probe    31267391787
Read-only probe job           93127650808
Verified state                33 / 34 / 183 / 284
Archived evidence             126 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-08T16:33:32.318Z
Build-input refresh           not required
```

The read-only probe independently confirmed the live canonical-only `version.json` and exact archive fields for `bir_src_000037` and `bir_src_000068` after the successful full-content verifier.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                16
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url           126
Terminal unarchived unique URLs       15
Terminal unarchived records           25
Risky-host unarchived unique URLs     17
Risky-host unarchived records         31
X/Twitter records unarchived          29
Unknown URL status                     0
```

Archive Capture Batch 18 exhausted the previously-unreviewed archive queue. The deferred inventory reconstructed 45 reviewed-but-unarchived evidence records across 32 unique URLs from permanent review audits and current canonical data.

Deferred Archive Retry 01 selected ten higher-value reviewed unresolved URLs. Two reproducible exact mappings were published for Qubit's compensation plan and Harmony's Horizon Bridge incident summary. The other eight selected URLs remained below the unchanged exact-replay, temporal-fit, minimum-size, and two-run reproducibility boundary.

There is no untouched archive-review Batch 19. Future preservation work must use explicit deferred-retry scopes or newly introduced canonical source URLs.

## Immediate source-quality targets

1. run Deferred Archive Retry 02 against a different high-value subset of the remaining reviewed-unresolved sources; do not immediately recycle Retry 01 failures;
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

Batch 18 proved that a newer `generated_at` alone is not proof of canonical publication. Field-level equality remained authoritative. Deferred Retry 01 required no refresh and was independently confirmed by a read-only live probe.

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
23. Deferred retries must use explicit reviewed-unresolved targets and preserve the same acceptance boundary.
