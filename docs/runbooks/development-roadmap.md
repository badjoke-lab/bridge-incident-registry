# Bridge Incident Registry — Development Roadmap to v1

Status: active maintenance  
Updated: 2026-08-11

GitHub state and canonical JSON are authoritative.

## Canonical and production baseline

```text
Bridges     36
Incidents   38
Events      190
Evidence    299
```

Latest production-verified canonical maintenance:

```text
Review PR                         #265
Canonical PR                      #266
Canonical merge                   679f40c55677ad9d89f508200e47004f40464922
V1 Release Readiness main run     31458996854
Release-readiness job             93678566693
Production equality               success
Built pages                        76
Canonical routes                   75
Legacy redirects                   74
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
         Allbridge review/canonical addition       PRs #261–#262
         Allbridge checkpoint/site baseline        PRs #263–#264
         Syscoin review/canonical addition         PRs #265–#266
```

## Current quality state

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     210 / 293
Tier 1 evidence                      227 / 293
Official-domain evidence             132 / 293
Incidents without primary              1 / 36
Incidents without Tier 1               1 / 36
Events without primary                11 / 185
Events without Tier 1                  6 / 185
Evidence with archived_url           130 / 293
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
High-severity npm audit findings       0
```

Further primary/archive remediation remains research-triggered rather than metric-driven. Source hierarchy and accepted gap ceilings must not be weakened to improve coverage numbers.

## Latest maintenance result — Syscoin UTXO–NEVM Bridge June 2026

PR #265 approved a new Syscoin bridge and discrete June 7, 2026 incident; PR #266 applied it and passed the complete production contract.

```text
New bridge                    bir_bridge_000034
New incident                  bir_inc_000036
New event                     bir_ev_000185
New evidence                  bir_src_000292–bir_src_000293
Incident date                 2026-06-07
Unauthorized release          5 billion SYS
Secondary valuation           about $10 million
Recovery                      full_recovery
Reimbursement                 not_applicable
Restart                       paused
Current outcome               paused_long_term
Attack category               message_verification_failure
```

Syscoin's first-party technical postmortem is authoritative for the root cause, 5 billion SYS quantity, full return/burn, and continued pause. Halborn is Tier 2 corroboration and the source for the approximately $10 million contemporaneous USD valuation. Financial recovery does not imply bridge reopening.

The application also added normalization reference keys `syscoin-utxo`, `syscoin-nevm`, and `sys`. These support the approved canonical values and do not broaden incident semantics.

## Prior maintenance boundaries

Allbridge remains `bir_inc_000035` under existing `bir_bridge_000012`, with unknown final attacker-fund recovery/LP compensation despite later pool-less relaunch.

Boltz remains Issue #171 (`monitoring signal / needs evidence`). PR #260 removed a superseded canonical-apply helper. No Boltz canonical record should be added without a discrete supported incident boundary under normal review-first procedure.

## Phase 5 steady state

Persisted monitoring baselines are historical state checkpoints and may predate later canonical additions. The Allbridge-era Public Site Health change was accepted in PR #264 and then proved silent on repeat. The current canonical/public truth is `34 / 36 / 185 / 293` and is independently production-verified by main run `31458996854`.

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

Allbridge post-closure proof: merge `d7cf47f2373c9c0b94b78b93807fc6d0239c2d98`, run `31393382470`, job `93470262367`.

Latest Syscoin post-closure proof: merge `679f40c55677ad9d89f508200e47004f40464922`, run `31458996854`, job `93678566693`, production equality success.

Technical closure does not create or imply a semantic-version tag or GitHub Release.

## Ongoing roadmap

1. rerun Phase 5 Monitoring and Public Site Health after the Syscoin canonical count change;
2. accept only bounded healthy review-state changes and prove silent repeat afterward;
3. continue reviewed first-party-backed incident/corpus expansion;
4. use Phase 3 quality/archive work only when stronger source material changes an accepted boundary;
5. keep Boltz Issue #171 review-only until a discrete incident becomes supportable;
6. preserve release, source-quality, and production-equality gates while expanding the registry.

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
