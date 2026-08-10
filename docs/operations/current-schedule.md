# BIR implementation schedule

Status: active  
Updated: 2026-08-10

The authoritative roadmap is `docs/runbooks/development-roadmap.md`; the restart point is `docs/runbooks/recovery-checkpoint.md`.

## Current schedule

- Phase 0 — specification and foundation: complete
- Phase 1 — canonical model, UI, validation, and seeds: complete
- Phase 2 — record expansion: complete through Batch 7
- Phase 3 — full-corpus quality strengthening: active maintenance
  - source-count/source-quality remediation: complete
  - Event Tier 1 and Primary Remediation 01–02: production-verified
  - Archive Capture Batches 1–18: production-verified
  - Deferred Archive Retries 01–04: complete to reviewed boundary
  - cross-record bridge integrity: blocking
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: steady-state live
  - review-gated foundation: complete
  - Issue #171 dedupe state: complete
  - review-branch fallback and duplicate guard: complete
  - evidence health watch: live
  - external bridge universe: live, baseline + silent repeat proven
  - structured DefiLlama bridge-hack feed: live, baseline + silent repeat proven
  - active bridge official-domain watch: live, baseline + silent repeat proven
  - RSS status-news discovery: live, baseline + silent repeat proven
  - optional GDELT adapter: fail-closed, not scheduled/default after Actions 429
  - monitoring-state/watchlist resolution health: live — PR #248
  - public site/SEO health watch: live, baseline + silent repeat proven — PRs #249–#250
- Release — v1 hardening: complete
  - documentation/restart-state closure: complete — PR #251
  - accessibility foundation and gate: complete — PR #252
  - built-output performance budget: complete — PR #253
  - Chromium/Firefox/WebKit compatibility smoke: complete — PR #254
  - GitHub Actions runtime hardening: complete — PR #255
  - high-severity dependency audit + Astro 7.2 security upgrade: complete — PR #256
  - hardening checkpoint: complete — PR #257
  - consolidated release-readiness gate: complete — PR #258
  - v1 technical release closure: complete — main run `31367052981`

## Current baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

## Phase 5 live checkpoint

```text
Evidence health                  12 / 287 selected, 24 probes, 0 hard findings
External bridge universe         98 parsed / 11 exact / 87 baseline
External silent repeat           87 unchanged / 0 candidates
DefiLlama bridgeHack feed        613 parsed / 61 bridge rows / 61 baseline
BridgeHack silent repeat         61 unchanged / 0 candidates
Active-domain eligible           22
Active-domain batch               8
Accepted domain baseline          8 / 0 findings
Domain silent repeat              0 state change / 0 findings
RSS feeds reached                 2
RSS rows parsed                  55
RSS relevant baseline rows        0
RSS baseline candidates           0
RSS silent repeat                 0 state change / 0 candidates
Issue lifecycle                   close/reopen resolution + rearm live
Public site targets               6
Public site baseline              6 healthy / 0 findings
Scheduled BIR Monitoring          31356920691 success / no state changes
Scheduled Public Site Health      31359554582 success / no state changes
Canonical monitoring diff       none
```

## v1 technical release checkpoint

```text
Release-readiness merge           d9f545803104bffd829d93270965f53d9f3d1a45
V1 Release Readiness run          31367052981
Release-readiness job             93387599332
Accessibility built pages         73 passing
Performance max HTML budget       16 KiB gzip
Performance CSS budget             5 KiB total / 5 KiB max file
Performance JS budget              4 KiB total / 2 KiB max file
Browser engines                    Chromium / Firefox / WebKit passing
Actions runtimes                   checkout/setup-node/upload-artifact v7
High-severity npm audit            0
Astro                              ^7.2.0
Production equality               success
Canonical hardening/release diff   none
```

## Immediate execution order

1. resume ordinary registry work: reviewed candidate/corpus expansion plus Phase 3 research-triggered quality maintenance;
2. keep all Phase 5 monitors in steady state and investigate only new review signals;
3. maintain accessibility, performance, browser compatibility, dependency security, source-quality, validator, and public-contract gates;
4. reopen technical hardening only if one of those gates regresses or a production compatibility issue is demonstrated;
5. revisit deferred evidence/archive gaps only on new source material or changed conditions.

## Permanent boundary

- monitoring never writes canonical records automatically;
- secondary discovery sources only create review candidates;
- initial external datasets are zero-candidate baselines;
- unchanged monitoring state is silent;
- upstream relevance fields such as `bridgeHack` must be live-schema validated;
- repeated hard evidence/domain failure requires bounded reproducible probes;
- 401/403/405/429, timeout, 5xx, or mixed results are not dead-proof by themselves;
- parent/subdomain official-host relationships are not treated as migrations by themselves;
- RSS candidates require both a canonical bridge identity and a bounded trigger;
- review issue closure is monitoring-state resolution only, not canonical incident resolution;
- public-site health monitoring is bounded and does not replace exhaustive production equality verification;
- high-severity npm audit findings are blocking;
- accessibility, performance, and browser compatibility gates must remain green;
- no duplicate scheduled review work while an open monitoring PR or unmerged review branch exists;
- production verification remains required for canonical/public output changes;
- Cloudflare Pages preview deployment remains `none`;
- this technical closure does not create or imply a GitHub Release or semantic-version tag.
