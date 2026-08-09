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
         Source-count remediation                  complete
         Source-quality baseline/remediation       complete
         Event Tier 1 remediation                  production-verified
         Archive capture Batches 1–18              production-verified
         Deferred Archive Retries 01–04            complete to reviewed boundary
         Event Primary Remediation 01–02           production-verified
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
         Active bridge/domain watch                next
         Site / SEO watch                          planned
Release  v1 hardening                              planned
```

## Phase 5 live state

### Evidence health

```text
Run / job                 31301765004 / 93215576787
Live evidence             287
Selected                   12
Independent probes         24
Hard 404/410                0
Canonical diff            none
```

### External bridge universe

```text
Rows                        98
Exact canonical             11
Unmatched baseline          87
Baseline candidates          0
Silent-repeat unchanged     87
Silent-repeat candidates     0
```

### Structured bridge-hack feed

```text
Input URL                   https://api.llama.fi/hacks
Input kind                  legacy_public_json
Raw SHA-256                 e80fced996cf886ca0d2ca70c02dd04b869b628d63773d0b327f97b49aa2734a
Parsed hacks                613
bridgeHack=true              61
Accepted baseline            61
Exact canonical matches      20
Baseline candidates           0
Silent-repeat unchanged      61
Silent-repeat candidates      0
```

The upstream `bridgeHack=true` field is the relevance gate. Exact canonical-name matches with `bridgeHack=false` are excluded because live diagnostics showed they can be ordinary protocol/DeFi exploits. Identity matching occurs only after the bridge relevance gate.

GDELT remains optional/fail-closed because its first GitHub Actions request was rate-limited with HTTP 429. The scheduled/default structured incident feed is the best-effort DefiLlama raw `/hacks` route with explicit source-kind and raw-input SHA provenance.

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

1. implement bounded active-bridge official-domain/status monitoring;
2. add reproducible pause/shutdown/regulatory review signals incrementally;
3. add public-site/SEO monitoring;
4. maintain source-quality, validator, public-contract, and UI compatibility gates;
5. complete v1 documentation, accessibility, performance, compatibility, and release checks.

## Production publication gate

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes per job
```

Production convergence still requires full canonical-derived content equality, not counts alone.

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical and monitoring/working data separate.
5. Do not merge temporary diagnostics or write-enabled workflows.
6. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
7. A disclosure or secondary database row is not automatically an exploit record.
8. Historical SHAs are not live branch pointers.
9. Every PR must pass checks appropriate to its stage.
10. Source-quality gap ceilings may decrease but must not increase without review.
11. Source hierarchy must not be weakened to improve coverage metrics.
12. Unknown URL statuses are not permitted in canonical data.
13. Production publication is proven by field-level generated-content equality.
14. Monitoring output is review material only and must never publish canonical records automatically.
15. Monitoring hard-failure signals require bounded reproducible conditions; access blocking or transient network failure is not proof of degradation.
16. Initial external discovery sets must be reviewed zero-candidate baselines before new/change alerting.
17. Upstream classification fields must be validated against live schema before they become relevance gates.
18. A secondary incident feed may create only B/C hold candidates; primary-source investigation remains mandatory.
19. Cloudflare Pages preview deployment remains `none`.
