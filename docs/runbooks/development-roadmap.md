# Bridge Incident Registry — Development Roadmap to v1

Status: active maintenance  
Updated: 2026-08-10

GitHub state and canonical JSON are authoritative.

## Canonical and production baseline

```text
Bridges     34
Incidents   36
Events      185
Evidence    293
```

Latest production-verified canonical maintenance:

```text
Review PR                         #261
Canonical PR                      #262
Canonical merge                   d7cf47f2373c9c0b94b78b93807fc6d0239c2d98
V1 Release Readiness main run     31393382470
Release-readiness job             93470262367
Production equality               success
Built pages                        74
```

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          complete through Batch 7
Phase 3  Full-corpus quality strengthening         active research-triggered maintenance
         Source-count/source-quality work          complete to reviewed boundary
         Event Tier 1 / Primary Remediation        production-verified
         Archive Capture Batches 1–18              production-verified
         Deferred Archive Retries 01–04            complete to reviewed boundary
         Cross-record bridge integrity             blocking
         Unknown URL-status hard ceiling           active at 0
         Full production-content equality          active
Phase 4  Public contract stabilization             complete
Phase 5  Monitoring and candidate collection       steady-state live
         Review-gated foundation                   complete — PR #217
         Evidence/external/hack/domain/RSS watches live — PRs #226–#246
         Monitoring state resolution health        live — PR #248
         Public site / SEO health watch            live — PRs #249–#250
Release  v1 technical hardening / closure          complete — PRs #251–#258
Maintain Reviewed canonical/candidate expansion    active
         Boltz stale apply helper removed          PR #260
         Allbridge 2026 review                     PR #261
         Allbridge 2026 canonical addition         PR #262
```

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     209 / 291
Tier 1 evidence                      226 / 291
Incidents without primary              1 / 35
Incidents without Tier 1               1 / 35
Events without primary                11 / 184
Events without Tier 1                  6 / 184
Evidence with archived_url           130 / 291
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
High-severity npm audit findings       0
```

Further primary/archive remediation remains research-triggered rather than metric-driven. Source hierarchy and accepted gap ceilings must not be weakened to improve coverage numbers.

## Latest maintenance result — Allbridge Core July 2026

PR #261 approved a discrete second Allbridge Core incident under existing `bir_bridge_000012`; PR #262 applied it and passed production equality.

```text
New incident                  bir_inc_000035
New event                     bir_ev_000184
New evidence                  bir_src_000288–bir_src_000291
Incident date                 2026-07-19
Reported amount               $1.65 million
Affected deployment           Solana
Assets                        USDC / USDT
Restart                       reopened
Current outcome               active_after_incident
Recovery                      unknown
Reimbursement                 unknown
```

Three first-party Telegram records were admitted as Tier 1 primary evidence plus one Tier 2 secondary corroboration. An unarchived official X technical post-mortem was deliberately excluded so the risky-host ceiling remains 16. The broader `liquidity_or_accounting_failure` attack category is retained until a stable admissible first-party technical record supports a narrower mechanism.

## Boltz review boundary

Boltz remains Issue #171 (`monitoring signal / needs evidence`). PR #260 removed an obsolete helper that encoded a superseded one-incident canonical proposal. No canonical Boltz record should be added unless new source material establishes a discrete incident boundary under normal review-first procedure.

## Phase 5 steady state

The accepted Phase 5 monitor baselines were established before the Allbridge canonical addition and remain historical state checkpoints. The current canonical/public truth is `33 / 35 / 184 / 291` and is independently production-verified.

```text
External bridge rows         98 / 11 exact / 87 unmatched accepted baseline
DefiLlama hacks              613 parsed / 61 bridgeHack=true accepted baseline
Active-domain accepted run   31313312723
RSS accepted run             31313579371 / 93245104559
Public-site baseline run     31314396266
Scheduled BIR Monitoring     31356920691 success
Scheduled Public Site Health 31359554582 success
```

Monitoring output is review material only. Secondary database/news rows are not canonical evidence. Unchanged signals remain silent. Hard-failure signals require bounded reproducible conditions; 401/403/405/429, timeout, 5xx, or mixed probes are not terminal proof.

## Permanent release contract

The v1 technical contract established by PRs #251–#258 remains permanent after closure:

- blocking high-severity dependency audit;
- canonical/schema/cross-record validation;
- exact source-count and source-quality no-regression audits;
- monitoring tests;
- static build and dist consistency;
- accessibility contract;
- built-output performance budgets;
- Chromium / Firefox / WebKit compatibility;
- exhaustive production registry equality after main merge.

Original v1 closure: PR #258, merge `d9f545803104bffd829d93270965f53d9f3d1a45`, run `31367052981`, job `93387599332`.

Latest post-closure canonical proof: merge `d7cf47f2373c9c0b94b78b93807fc6d0239c2d98`, run `31393382470`, job `93470262367`, production equality success.

Technical closure does not create or imply a semantic-version tag or GitHub Release.

## Ongoing roadmap

1. inspect Phase 5/Public Site Health behavior after the Allbridge canonical count change;
2. continue reviewed first-party-backed incident/corpus expansion;
3. use Phase 3 quality/archive work only when stronger source material changes an accepted boundary;
4. keep Boltz Issue #171 review-only until a discrete incident becomes supportable;
5. preserve release, source-quality, and production-equality gates while expanding the registry.

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one fresh branch and bounded PR per canonical task after review approval.
3. Keep canonical and monitoring/working data separate.
4. Do not merge temporary diagnostics, generators, or write-enabled workflows.
5. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
6. Secondary database/news rows are not canonical incidents or primary evidence.
7. Historical SHAs and run IDs are checkpoints, not live branch pointers.
8. Source-quality gap ceilings may decrease but must not increase without review.
9. Source hierarchy must not be weakened to improve coverage metrics.
10. Unknown URL statuses are not permitted in canonical data.
11. Production publication is proven by field-level generated-content equality.
12. Monitoring output is review material only and never auto-publishes canonical records.
13. Parent/subdomain official hosts are not migrations by themselves.
14. Review issue lifecycle affects monitoring state only, never canonical truth.
15. Public-site health complements but does not replace exhaustive production equality.
16. Accessibility, performance, browser compatibility, dependency security, and source quality are permanent release gates.
17. Cloudflare Pages preview deployment remains `none`.
18. Technical v1 closure does not create or imply a GitHub Release or semantic-version tag.
