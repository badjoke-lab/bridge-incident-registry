# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-08-09

GitHub state and canonical JSON are authoritative.

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
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
         Event Primary Remediation 01              production-verified — PRs #207–#209
         Event Primary Review 02                   complete — PR #211
         Event Tier 1 fixture strengthening        complete — PR #212
         Event Primary Remediation 02              production-verified — PRs #213–#214
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       next
Release  v1 hardening                              planned
```

The public UI/support follow-up is current through PR #187. Representative screenshots, expanded incident and bridge discovery, filters, pagination, detail TOCs, Support, project navigation, and shared BadJoke-Lab wallet presentation are merged without changing canonical entity/event counts.

## Latest completed production checkpoint

```text
Review PR                     #211
Canonical data PR             #213
Canonical merge               f2874a2d0ffe6877eadf6619cd6100a9b9b3991b
Production audit PR           #214
Production verify run         31300484236
Production verify job         93212360938
Verified state                33 / 34 / 183 / 287
Primary evidence              206 / 287
Tier 1 evidence               223 / 287
Archived evidence             130 / 287
Events without primary        11 / 183
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-09T07:08:45.362Z
Publication attempt           3 / 20
Build-input refresh           not required
```

Attempts 1–2 correctly rejected the old 284-evidence production build. Attempt 3 observed Evidence 287 and passed complete canonical-derived equality.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                11
Events without Tier 1                  6
Unreviewed event Tier 1 gaps            0
Evidence with archived_url           130
Terminal unarchived unique URLs       15
Terminal unarchived records           25
Risky-host unarchived unique URLs     16
Risky-host unarchived records         30
X/Twitter records unarchived          29
Unknown URL status                     0
```

The archive-preservation fresh queue is exhausted under the current acceptance boundary. Event-primary remediation has also reached a reviewed boundary: four non-intentional gaps remain deferred pending better first-party evidence, six Tier 1 gaps are intentional secondary-only records, and `bir_ev_000150` is intentionally non-primary direct security monitoring. Do not chase coverage metrics by weakening source semantics.

## Immediate targets

1. strengthen remaining validators and controlled-failure fixtures where assumptions can be made more explicit;
2. begin Phase 5 review-gated monitoring and candidate collection with no automatic canonical publication;
3. retain the four deferred non-intentional primary gaps as research backlog items;
4. maintain public-contract and UI compatibility checks;
5. complete v1 documentation, accessibility, performance, compatibility, and release checks.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes per job
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions. Remediation 02 again proved that stale production must be rejected until complete content equality appears.

## Remaining roadmap

1. validator strengthening;
2. Phase 5 monitoring and candidate collection with review-only outputs;
3. public-contract/UI compatibility maintenance;
4. v1 documentation, accessibility, performance, compatibility, and release checks;
5. research-triggered primary/archive remediation only when new source material or changed conditions justify it.

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
19. A changed `generated_at` without field-level equality is still failed publication.
20. Only one reviewed behavior-neutral build-input refresh is permitted per publication batch.
21. Cloudflare Pages preview deployment remains `none`.
22. Do not create an artificial untouched archive batch after the reviewer has exhausted its previously-unreviewed candidate set.
23. Deferred retries must use explicit reviewed-unresolved targets and preserve the same acceptance boundary.
24. Do not immediately recycle deferred archive failures once the fresh retry pool is exhausted.
25. Primary-evidence remediation must be claim-relative; do not upgrade secondary or research sources merely to reduce a coverage metric.
26. Monitoring output is review material only and must never publish canonical records automatically.
