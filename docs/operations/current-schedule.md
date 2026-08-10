# BIR implementation schedule

Status: active maintenance  
Updated: 2026-08-10

The authoritative roadmap is `docs/runbooks/development-roadmap.md`; the restart point is `docs/runbooks/recovery-checkpoint.md`.

## Current schedule

- Phase 0 — specification and foundation: complete
- Phase 1 — canonical model, UI, validation, and seeds: complete
- Phase 2 — record expansion: complete through Batch 7
- Phase 3 — full-corpus quality strengthening: active research-triggered maintenance
  - source-count/source-quality remediation: complete to reviewed boundary
  - Event Tier 1 and Primary Remediation 01–02: production-verified
  - Archive Capture Batches 1–18: production-verified
  - Deferred Archive Retries 01–04: complete to reviewed boundary
  - cross-record bridge integrity: blocking
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: steady-state live
  - evidence health, external universe, structured hack feed, active-domain watch, RSS discovery: live
  - review issue resolution/rearm: live — PR #248
  - public site/SEO health: live — PRs #249–#250
  - optional GDELT adapter: fail-closed, not scheduled/default after Actions 429
- Release — v1 hardening/technical closure: complete — PRs #251–#258
- Maintenance — reviewed canonical/candidate expansion: active
  - stale Boltz mutation helper removed — PR #260
  - Allbridge Core July 2026 review — PR #261
  - Allbridge Core July 2026 canonical application — PR #262

## Current baseline

```text
Bridges     33
Incidents   35
Events      184
Evidence    291
```

## Latest production checkpoint

```text
Review PR                         #261
Canonical PR                      #262
Canonical merge                   d7cf47f2373c9c0b94b78b93807fc6d0239c2d98
V1 Release Readiness run          31393382470
Release-readiness job             93470262367
Built pages                        74
Chromium / Firefox / WebKit       success
Production equality               success
```

## Current quality checkpoint

```text
Primary evidence                  209 / 291
Tier 1 evidence                   226 / 291
Archived evidence                 130 / 291
Incidents without primary           1 / 35
Incidents without Tier 1            1 / 35
Events without primary             11 / 184
Events without Tier 1                6 / 184
Terminal unarchived URLs           15
Risky-host unarchived URLs         16
Unknown URL status                  0
Source-count mismatches             0
High-severity npm audit             0
```

The Allbridge addition did not widen any accepted source-quality ceiling. The unarchived X post-mortem remains excluded from canonical evidence until a safe archived/stable form can be admitted.

## Phase 5 historical accepted baseline

The currently persisted monitoring baselines were accepted before the Allbridge canonical addition:

```text
Evidence health                  12 / 287 selected, 24 probes, 0 hard findings
External bridge universe         98 parsed / 11 exact / 87 unmatched baseline
External silent repeat           87 unchanged / 0 candidates
DefiLlama bridgeHack feed        613 parsed / 61 bridge rows / 61 baseline
BridgeHack silent repeat         61 unchanged / 0 candidates
Active-domain eligible           22
Active-domain batch               8
Accepted domain baseline          8 / 0 findings
RSS rows parsed                  55
RSS relevant baseline rows        0
RSS baseline candidates           0
Issue lifecycle                   close/reopen resolution + rearm live
Public site targets               6
Public site baseline              6 healthy / 0 findings
Scheduled BIR Monitoring          31356920691 success / no state changes
Scheduled Public Site Health      31359554582 success / no state changes
```

These are historical monitoring checkpoints. Current canonical truth is `33 / 35 / 184 / 291`, proven separately by main production equality run `31393382470`.

## Permanent release boundary

- monitoring never writes canonical records automatically;
- secondary discovery sources only create review candidates;
- unchanged monitoring state is silent;
- unknown URL status and broken canonical references are blocking;
- source-quality gap ceilings may decrease but must not increase without review;
- high-severity npm audit findings are blocking;
- accessibility, performance, Chromium/Firefox/WebKit, and dist consistency remain release gates;
- production verification is required for canonical/public output changes;
- Cloudflare Pages preview deployment remains `none`;
- technical closure does not create or imply a GitHub Release or semantic-version tag.

## Immediate execution order

1. verify the next Phase 5/Public Site Health cycle recognizes the new canonical counts without false review work;
2. investigate only concrete new monitoring signals or first-party-backed incident candidates;
3. keep Boltz Issue #171 at review-only/needs-evidence unless the incident boundary becomes supportable;
4. continue Phase 3 quality/archive work only when new source material changes the reviewed boundary;
5. preserve all release and source-quality gates while expanding the corpus.
