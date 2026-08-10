# Current position

Status: active  
Updated: 2026-08-10

This file is a compact compatibility pointer. Authoritative live state is current `main`, canonical JSON, GitHub Actions, `docs/runbooks/recovery-checkpoint.md`, `docs/runbooks/current-status.md`, and `docs/runbooks/development-roadmap.md`.

## Canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

Phase 5 monitoring and v1 hardening/release closure have not changed canonical counts or source-quality ceilings.

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
- Phase 5 — monitoring and candidate collection: steady-state live
- v1 hardening — accessibility, performance, browser compatibility, Actions runtime, and high-severity dependency security: complete
- v1 technical release closure: complete — PR #258 / main run `31367052981`

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
PR #248      Review issue resolution / rearm lifecycle
PR #249–250  Public site health watch + accepted production baseline
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

### Monitoring issue resolution and rearm

PR #248 made review-signal lifecycle explicit without changing the existing open-signal fingerprint format.

```text
new/open issue              review finding + B/hold
unchanged open              silent
known issue closes          one low resolved finding
unchanged closed            silent
closed issue reopens        rearmed review finding + B/hold
historical closed issue     ignored unless previously tracked
```

Issue closure changes monitoring state only. It never proves that a bridge incident or canonical status has been resolved.

### Public site health watch

PR #249 added a separate bounded production monitor and PR #250 accepted the first healthy baseline.

```text
Accepted baseline run       31314396266
Origin                      https://bir.badjoke-lab.com
Targets                     6
Independent requests       12
Healthy baselines seeded    6
Findings                    0
Sampled bridge              bir_bridge_000017
Sampled incident            bir_inc_000030
Canonical                   33 / 34 / 183 / 287
Canonical diff              none
```

Targets are `/`, `/robots.txt`, `/sitemap.xml`, `/version.json`, one rotating bridge detail route, and one rotating incident detail route. The scheduled run on 2026-08-10 (`31359554582`) completed successfully with no public-site state changes. The main BIR Monitoring schedule (`31356920691`) also completed successfully with no monitoring state changes and canonical data unchanged.

## v1 hardening and release checkpoint

```text
PR #251  Phase 5 restart/status checkpoint
PR #252  Accessibility foundation + built-output accessibility gate
PR #253  Source-controlled performance budget + controlled regression test
PR #254  Chromium / Firefox / WebKit browser compatibility smoke
PR #255  GitHub Actions checkout/setup-node/upload-artifact v7 runtime update
PR #256  Astro 7.2.0 security upgrade + blocking high-severity npm audit gate
PR #257  v1 hardening restart/status checkpoint
PR #258  Consolidated v1 release-readiness workflow and runbook
```

Accepted v1 hardening proof:

```text
Built HTML accessibility contract       73 pages passing
Max HTML gzip budget                    16 KiB
CSS gzip budget                          5 KiB total / 5 KiB max file
JS gzip budget                           4 KiB total / 2 KiB max file
Browser engines                          Chromium / Firefox / WebKit passing
High-severity npm audit findings         0
Astro                                    ^7.2.0
Canonical change from hardening          none
```

The browser smoke exercises registry pagination, URL-state synchronization, filtering/page reset, representative static routes, and support controls in all three engines. Performance limits are measured against built output and enforced in `Check`. High-severity dependency advisories are blocking.

## Accepted v1 technical release closure

```text
Release-readiness PR          #258
Main merge                    d9f545803104bffd829d93270965f53d9f3d1a45
V1 Release Readiness run      31367052981
Release-readiness job         93387599332
Local/static/security gates   success
Chromium / Firefox / WebKit   success
Production equality           success
Canonical                     33 / 34 / 183 / 287
Canonical mutation            none
```

This checkpoint means the v1 technical release contract is closed and accepted. It does **not** create or imply a semantic-version tag or GitHub Release.

## Next bounded work

1. return to ordinary registry maintenance: Phase 3 research-triggered quality work and reviewed corpus/candidate expansion;
2. keep Phase 5 monitoring and candidate collection live in steady state;
3. maintain accessibility, performance, browser-compatibility, dependency-security, validator, source-quality, and public-contract gates;
4. reopen v1 hardening only if a release gate regresses or a concrete production compatibility issue appears;
5. continue bounded RSS security/pause/shutdown/regulatory discovery as secondary review material.
