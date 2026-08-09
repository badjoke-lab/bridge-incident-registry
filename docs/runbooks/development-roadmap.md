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
Phase 3  Full-corpus quality strengthening         active maintenance
         Source-count remediation                  complete — PRs #78–#99
         Hard source-count equality gate           active
         Source-quality baseline/remediation       complete — PRs #100–#107
         Event Tier 1 remediation                  production-verified — PRs #108–#116
         Nerve source boundary                     reviewed — PR #117
         Archive capture Batches 1–18              production-verified — PRs #118–#198
         Deferred Archive Retries 01–02            production-verified — PRs #199–#204
         Deferred Archive Retries 03–04            review complete — PRs #205–#206
         Fresh deferred retry pool                 exhausted
         Event Primary Remediation 01              production-verified — PRs #207–#209
         Event Primary Review 02                   complete — PR #211
         Event Tier 1 fixture strengthening        complete — PR #212
         Event Primary Remediation 02              production-verified — PRs #213–#214
         Cross-record bridge integrity             blocking — PR #218
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       active
         Review-gated foundation                   complete — PR #217
         Initial signal state / dedupe proof       complete — PR #223
         Review-branch fallback + duplicate guard  complete — PR #225
         Evidence health watch                     complete — PR #226
         External candidate discovery              next
         News / regulatory event watch             planned
         Active bridge/domain watch                planned
         Site / SEO watch                          planned
Release  v1 hardening                              planned
```

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

The archive-preservation fresh queue and primary-remediation immediate queue have reached reviewed boundaries. Four non-intentional primary gaps remain deferred pending stronger first-party evidence; six Tier 1 gaps are intentional secondary-only records; `bir_ev_000150` remains intentionally non-primary direct security monitoring. Further improvements are research-triggered, not metric-driven.

## Phase 5 live proof

The monitoring foundation is no longer theoretical.

```text
First changed-signal run              31301301277
Initial candidate                     Issue #171 Boltz — B / hold
Initial review-state PR               #223
Unchanged rerun                       has_changes=false
Evidence-health live run              31301765004 / 93215576787
Live evidence URLs                    287
Selected URLs                          12
Two-pass probes                        24
Hard 404/410 findings                   0
Canonical diff                          none
Monitoring job result                 success
```

The workflow fingerprints canonical data before/after execution, rejects canonical diffs, writes review-only data under `data-staging`, suppresses unchanged signals, and refuses duplicate scheduled review work. Evidence health requires two independent 404/410 responses before emitting a degradation finding; access blocks, rate limits, transient failures, and mixed results do not become dead-link findings.

Because repository Actions settings currently disallow `GITHUB_TOKEN` pull-request creation, the workflow retains an already-validated `auto/monitoring/*` review branch and succeeds on that specific permission error. A connected app/operator can open the PR. Automatic canonical publication remains prohibited.

## Immediate targets

1. implement external bridge/protocol candidate discovery with review-only output;
2. add closure/pause/hack/regulatory news monitoring after candidate discovery is stable;
3. add active bridge/domain and public-site monitoring incrementally;
4. maintain source-quality, validator, public-contract, and UI compatibility gates;
5. complete v1 documentation, accessibility, performance, compatibility, and release checks.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes per job
```

Publication convergence requires matching record counts, canonical-only markers, complete transformed JSON equality, exact record order, and all route, sitemap, metadata, redirect, content-type, and cache assertions.

## Remaining roadmap

1. Phase 5 external candidate discovery;
2. Phase 5 news/regulatory and active-status monitoring;
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
27. Monitoring hard-failure signals require bounded reproducible conditions; access blocking or transient network failure is not canonical evidence degradation.
