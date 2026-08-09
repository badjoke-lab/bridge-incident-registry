# Current position

Status: active  
Updated: 2026-08-09

This file is a compact compatibility pointer. The authoritative live state is maintained in:

- `docs/runbooks/recovery-checkpoint.md`
- `docs/runbooks/current-status.md`
- `docs/runbooks/development-roadmap.md`
- current `main`, canonical JSON, open pull requests, and GitHub Actions

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

Current quality boundary remains unchanged by Phase 5 monitoring:

```text
Primary evidence                       206 / 287
Tier 1 evidence                        223 / 287
Evidence with archived_url             130 / 287
Events without primary                  11 / 183
Events without Tier 1                     6 / 183
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
Source-count mismatches                   0
Canonical production content match      true
```

## Current phase

- Phase 3 — full-corpus quality strengthening: active maintenance
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: active
- v1 hardening: planned

## Phase 5 completed foundation

```text
PR #217  Review-gated monitoring foundation
PR #223  Issue #171 initial monitoring state / dedupe seed
PR #225  Review-branch fallback and duplicate-work guard
PR #226  Bounded evidence-health watch
PR #228  External bridge-universe adapter
PR #229  Baseline-before-alert correction
PR #230  External bridge-universe baseline state
PR #231  News-discovery source boundary
PR #232  Optional fail-closed GDELT adapter
PR #233  DefiLlama hacks discovery adapter
PR #234  Legacy public /hacks fallback
PR #235  Exact incident-feed provenance
PR #237  Live bridgeHack/source/targetType schema support
PR #238  bridgeHack=true relevance gate
PR #239  Accepted DefiLlama bridge-hack baseline state
```

## Live monitoring proofs

### Evidence health

Run `31301765004`, job `93215576787`:

```text
Live evidence URLs        287
Selected                   12
Independent probes         24
Hard 404/410 findings       0
Canonical diff              none
```

### External bridge universe

Accepted baseline:

```text
DefiLlama bridge rows      98
Exact canonical matches    11
Unmatched baseline rows    87
Baseline candidates         0
```

Repeated run `31303536548`, job `93220521310`:

```text
Parsed                     98
Exact matches              11
Unchanged                  87
Candidates                  0
State change            false
Canonical diff           none
```

### Structured bridge-hack incident feed

Actual successful input:

```text
URL          https://api.llama.fi/hacks
Kind         legacy_public_json
Raw SHA-256  e80fced996cf886ca0d2ca70c02dd04b869b628d63773d0b327f97b49aa2734a
```

Live schema probing established that the upstream bridge relevance field is `bridgeHack`. The accepted baseline in PR #239 contains only `bridgeHack=true` rows:

```text
Parsed hacks               613
bridgeHack=true             61
Bridge-relevant baseline    61
Exact canonical matches     20
Baseline candidates          0
Canonical diff            none
```

An unchanged rerun of run `31305166038`, job `93224464784`, proved:

```text
Parsed hacks               613
Bridge-relevant             61
Unchanged                   61
Candidates                   0
State change             false
External bridge unchanged   87
Evidence findings            0
Canonical diff            none
```

The structured incident feed is secondary discovery material only. `bridgeHack=true` plus exact canonical identity may produce `B / hold`; an unresolved `bridgeHack=true` row may produce `C / hold`. No monitoring source can publish canonical data automatically.

GDELT remains an optional fail-closed adapter only. Its first Actions live request received HTTP 429, so scheduled GDELT collection is not the primary incident feed.

## Latest completed production checkpoint

```text
Review PR             #211
Canonical data PR     #213
Canonical merge       f2874a2d0ffe6877eadf6619cd6100a9b9b3991b
Production audit PR   #214
Production run        31300484236 / 93212360938
Generated at          2026-08-09T07:08:45.362Z
Content match         true
HTML routes           72
Redirects             74
Publication attempt   3 / 20
```

## Next bounded work

1. add canonical active-bridge official-domain/status monitoring with bounded rotating probes and review-only output;
2. add pause/shutdown/regulatory signals only where reproducible sources can be monitored without weakening the incident boundary;
3. add public-site/SEO monitoring incrementally;
4. keep deferred primary/archive gaps research-triggered rather than metric-driven;
5. continue v1 documentation, accessibility, performance, compatibility, and release hardening.
