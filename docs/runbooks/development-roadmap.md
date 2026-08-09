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
         Source-count/source-quality work          complete to reviewed boundary
         Event Tier 1 / Primary Remediation        production-verified
         Archive Capture Batches 1–18              production-verified
         Deferred Archive Retries 01–04            complete to reviewed boundary
         Cross-record bridge integrity             blocking
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       active
         Review-gated foundation                   complete — PR #217
         Initial signal/dedupe proof               complete — PR #223
         Review-branch fallback                    complete — PR #225
         Evidence health watch                     live — PR #226
         External bridge universe                  live — PRs #228–#230
         Optional GDELT adapter                    fail-closed — PRs #231–#232
         Structured bridge-hack feed               live — PRs #233–#239
         Active bridge/domain watch                live — PRs #241–#244
         RSS status-news watch                     live — PRs #245–#246
         Monitoring state resolution health        next
         Site / SEO watch                          planned
Release  v1 hardening                              planned
```

## Phase 5 live state

### Evidence and structured discovery

```text
Evidence health              12 / 287 selected, 24 probes, 0 hard findings
External bridge rows         98 / 11 exact / 87 unmatched baseline
External silent repeat       87 unchanged / 0 candidates
DefiLlama hacks              613 parsed / 61 bridgeHack=true
Bridge-hack baseline         61 / 20 exact canonical / 0 candidates
Bridge-hack silent repeat    61 unchanged / 0 candidates
```

The structured incident feed uses `https://api.llama.fi/hacks` as `legacy_public_json`. `bridgeHack=true` is the relevance gate before identity classification. GDELT remains optional/fail-closed because its first GitHub Actions request returned HTTP 429.

### Active bridge official-domain watch

The monitor rotates through canonical bridges with status `active`, `limited`, or `paused`, selecting at most eight per run and probing each official URL twice.

Corrected live baseline after PR #243:

```text
Run                          31313312723
Eligible bridges             22
Selected                      8
Healthy baselines             8
Hard failures                 0
Domain findings               0
Silent-repeat changes         0
Silent-repeat findings        0
```

Parent/subdomain official hosts remain within the same official-domain scope. Unrelated final-domain changes remain reviewable. Two 404/410 results are required for a hard finding; access blocks, timeouts, transient server errors, and mixed probes are insufficient.

### RSS status-news watch

PR #245 added bounded RSS/Atom secondary discovery using canonical bridge identity plus security/operations/regulatory trigger families. PR #246 accepted the first live feed baseline.

```text
Run / first job              31313579371 / 93245104559
Feeds reached                 2
Rows parsed                  55
Bridge + trigger rows         0
Baseline candidates           0
Rerun job                    93245346339
Rerun rows                   55
Rerun candidates              0
Rerun state change        false
```

RSS candidates are `B / hold` only. They are discovery material, not primary evidence or canonical status changes.

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Incidents without primary              1
Incidents without Tier 1               1
Events without primary                11
Events without Tier 1                  6
Evidence with archived_url           130
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
```

Further primary/archive remediation is research-triggered rather than metric-driven.

## Latest completed production checkpoint

```text
Canonical data PR             #213
Production audit PR           #214
Production verify run         31300484236
Production verify job         93212360938
Verified state                33 / 34 / 183 / 287
Canonical content match       true
Generated at                  2026-08-09T07:08:45.362Z
```

## Immediate targets

1. add monitoring-state/watchlist resolution health so stale review signals can be explicitly resolved and future recurrence rearmed;
2. add public-site/SEO monitoring;
3. maintain bounded RSS security/pause/shutdown/regulatory discovery;
4. maintain source-quality, validator, public-contract, and UI compatibility gates;
5. complete v1 documentation, accessibility, performance, compatibility, and release checks.

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Keep canonical and monitoring/working data separate.
4. Do not merge temporary diagnostics or write-enabled workflows.
5. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
6. Secondary database/news rows are not canonical incidents or primary evidence.
7. Historical SHAs are not live branch pointers.
8. Every PR must pass checks appropriate to its stage.
9. Source-quality gap ceilings may decrease but must not increase without review.
10. Source hierarchy must not be weakened to improve coverage metrics.
11. Unknown URL statuses are not permitted in canonical data.
12. Production publication is proven by field-level generated-content equality.
13. Monitoring output is review material only and must never publish canonical records automatically.
14. Monitoring hard-failure signals require bounded reproducible conditions; blocking/transient errors are not proof of degradation.
15. Initial external discovery sets must be reviewed zero-candidate baselines before new/change alerting.
16. Upstream classification fields must be validated against live schema before they become relevance gates.
17. A secondary incident/news feed may create only hold candidates; primary-source investigation remains mandatory.
18. Parent/subdomain official hosts are not migrations by themselves.
19. Cloudflare Pages preview deployment remains `none`.
