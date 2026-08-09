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
  - optional GDELT adapter: fail-closed, not scheduled/default after Actions 429
  - active bridge/domain watch: next
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
External bridge universe         98 parsed / 11 exact / 87 baseline / 0 candidates
External repeat                  87 unchanged / 0 candidates / state false
DefiLlama hacks input            https://api.llama.fi/hacks
DefiLlama hacks kind             legacy_public_json
DefiLlama hacks raw SHA          e80fced996cf886ca0d2ca70c02dd04b869b628d63773d0b327f97b49aa2734a
DefiLlama hacks parsed           613
bridgeHack=true                  61
Accepted bridge-hack baseline    61
Exact canonical matches          20
Baseline candidates               0
Bridge-hack repeat unchanged     61
Bridge-hack repeat candidates     0
Canonical monitoring diff       none
```

## Immediate execution order

1. implement bounded official-domain/status monitoring for canonical active bridges;
2. add pause/shutdown/regulatory review signals only from reproducible source paths;
3. add public-site/SEO checks;
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
- no duplicate scheduled review work while an open monitoring PR or unmerged review branch exists;
- production verification remains required for canonical/public output changes;
- Cloudflare Pages preview deployment remains `none`.
