# BIR implementation schedule

Status: active  
Updated: 2026-08-09

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
- Phase 5 — monitoring and candidate collection: active
  - review-gated foundation: complete
  - Issue #171 dedupe state: complete
  - review-branch fallback and duplicate guard: complete
  - evidence health watch: live
  - external bridge universe: live, baseline + silent repeat proven
  - structured DefiLlama bridge-hack feed: live, baseline + silent repeat proven
  - active bridge official-domain watch: live, baseline + silent repeat proven
  - RSS status-news discovery: live, baseline + silent repeat proven
  - optional GDELT adapter: fail-closed, not scheduled/default after Actions 429
  - monitoring-state/watchlist resolution health: next
  - site/SEO watch: planned
- Release — v1 documentation, accessibility, performance, compatibility, and release checks: planned

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
Canonical monitoring diff       none
```

## Immediate execution order

1. add monitoring-state/watchlist resolution health and explicit rearm semantics;
2. add public-site/SEO checks;
3. maintain RSS security/pause/shutdown/regulatory discovery as bounded secondary review material;
4. maintain validator/source-quality/public-contract gates;
5. complete v1 hardening and release closure;
6. revisit deferred evidence/archive gaps only on new source material or changed conditions.

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
- no duplicate scheduled review work while an open monitoring PR or unmerged review branch exists;
- production verification remains required for canonical/public output changes;
- Cloudflare Pages preview deployment remains `none`.
