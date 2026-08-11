# BIR implementation schedule

Status: active maintenance  
Updated: 2026-08-11

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
  - Boltz stale mutation helper removed — PR #260
  - Allbridge Core July 2026 review/application — PRs #261–#262
  - Allbridge post-change checkpoint/site-health baseline — PRs #263–#264
  - Syscoin UTXO–NEVM June 2026 review/application — PRs #265–#266

## Current baseline

```text
Bridges     34
Incidents   36
Events      185
Evidence    293
```

## Latest production checkpoint

```text
Review PR                         #265
Canonical PR                      #266
Canonical merge                   679f40c55677ad9d89f508200e47004f40464922
V1 Release Readiness run          31458996854
Release-readiness job             93678566693
Built pages                        76
Canonical routes                   75
Legacy redirects                   74
Chromium / Firefox / WebKit       success
Production equality               success
```

## Current quality checkpoint

```text
Primary evidence                  210 / 293
Tier 1 evidence                   227 / 293
Official-domain evidence          132 / 293
Archived evidence                 130 / 293
Incidents without primary           1 / 36
Incidents without Tier 1            1 / 36
Events without primary             11 / 185
Events without Tier 1                6 / 185
Terminal unarchived URLs           15
Risky-host unarchived URLs         16
Unknown URL status                  0
Source-count mismatches             0
High-severity npm audit             0
```

The Syscoin addition increased primary/Tier 1/official-domain evidence without widening accepted gap ceilings. Its two normalization chain keys and one asset key are explicit reference-data additions, not new incident claims.

## Phase 5 historical accepted baseline

The persisted monitoring baselines were accepted before later canonical additions and must be read as historical state checkpoints:

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
Public site baseline              healthy after Allbridge-era seed and silent repeat
```

Current canonical/public truth is `34 / 36 / 185 / 293`, proven by main production equality run `31458996854`. Phase 5 and Public Site Health must now be rerun against this state.

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

1. rerun BIR Monitoring on current main and inspect any state transition caused by the Syscoin canonical addition;
2. rerun Public Site Health and accept only healthy review-only state changes, then prove silent repeat;
3. investigate only concrete new monitoring signals or first-party-backed incident candidates;
4. keep Boltz Issue #171 review-only/needs-evidence unless its incident boundary becomes supportable;
5. preserve all release and source-quality gates while expanding the corpus.
