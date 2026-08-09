# Current position

Status: active  
Updated: 2026-08-09

This file is a compact compatibility pointer. Authoritative live state is current `main`, canonical JSON, GitHub Actions, `docs/runbooks/recovery-checkpoint.md`, `docs/runbooks/current-status.md`, and `docs/runbooks/development-roadmap.md`.

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

Phase 5 monitoring has not changed canonical counts or source-quality ceilings.

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

## Phase 5 live stack

```text
PR #217      Review-gated monitoring foundation
PR #223      Issue #171 initial monitoring state / dedupe seed
PR #225      Review-branch fallback and duplicate-work guard
PR #226      Bounded evidence-health watch
PR #228–230  External bridge-universe watch + accepted baseline
PR #231–232  News source boundary + optional fail-closed GDELT adapter
PR #233–239  Structured DefiLlama bridge-hack feed + accepted baseline
PR #241–244  Active bridge official-domain watch + accepted baseline
PR #245–246  RSS status-news discovery + accepted baseline
```

### External bridge universe

```text
Parsed                     98
Exact canonical matches    11
Unmatched baseline         87
Silent-repeat unchanged    87
Candidates                  0
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
Silent-repeat unchanged      61
Candidates                    0
```

### Active bridge official-domain watch

After the first live smoke exposed and then removed a parent-domain/subdomain false positive, PR #244 accepted the corrected baseline from run `31313312723`.

```text
Eligible active/limited/paused bridges  22
Selected per run                         8
Accepted healthy baselines               8
Accepted findings                         0
Silent-repeat baseline changes            0
Silent-repeat findings                    0
```

Two 404/410 responses are required for a hard review finding. 401/403/405/429, 5xx, timeout, and mixed results are not terminal proof. Parent/subdomain relationships remain within the same official-domain scope; unrelated final-domain changes remain reviewable.

### RSS status-news discovery

PR #245 added bounded RSS/Atom secondary discovery. PR #246 accepted the first baseline from run `31313579371` / job `93245104559`.

```text
Feeds reached                2
CoinDesk rows               25
Cointelegraph rows          30
Total parsed                55
Bridge + bounded-trigger     0
Baseline candidates          0
Rerun state change       false
Rerun candidates             0
```

An RSS article is reviewable only when a canonical bridge name/alias and a bounded security, operations, or regulatory trigger are both present. RSS output is `B / hold` secondary discovery only; primary-source review is still mandatory.

GDELT remains optional/fail-closed after the first GitHub Actions request returned HTTP 429.

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
```

## Next bounded work

1. add monitoring-state/watchlist resolution health so old review signals can be explicitly recognized as resolved/rearmed;
2. add public-site/SEO monitoring incrementally;
3. keep pause/shutdown/regulatory RSS discovery bounded and secondary-only;
4. maintain validator/source-quality/public-contract gates;
5. continue v1 documentation, accessibility, performance, compatibility, and release hardening.
