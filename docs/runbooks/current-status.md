# Current Status — Bridge Incident Registry

Status: active maintenance  
Updated: 2026-08-10

## Canonical and production state

```text
Bridges     33
Incidents   35
Events      184
Evidence    291
```

Canonical data remains unchanged by Phase 5 monitoring, v1 hardening, and v1 technical release closure. Unknown URL status and source-count mismatches remain at 0.

## Phase 3 quality boundary

```text
Primary evidence                         206 / 287
Tier 1 evidence                          223 / 287
Official-domain evidence                 131 / 287
Evidence with archived_url               130 / 287
Incidents without primary                  1 / 34
Incidents without Tier 1                   1 / 34
Events without primary                    11 / 183
Events without Tier 1                       6 / 183
Terminal unarchived unique URLs           15
Risky-host unarchived unique URLs         16
Unknown URL status                         0
```

Four non-intentional event-primary gaps remain deferred pending stronger first-party material: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps are intentional secondary-only records. `bir_ev_000150` remains intentionally non-primary direct security monitoring. `bir_inc_000026` remains the reviewed Nerve incident-level primary/Tier 1 gap.

## Phase 5 monitoring and candidate collection

```text
Review-gated foundation              complete — PR #217
Initial Boltz monitoring state       merged — PR #223
Review-branch fallback / dedupe      complete — PR #225
Evidence health watch                live — PR #226
External bridge-universe watch       live — PRs #228–#230
Optional GDELT adapter               fail-closed — PRs #231–#232
Structured bridge-hack feed          live — PRs #233–#239
Active bridge/domain watch           live — PRs #241–#244
RSS status-news watch                live — PRs #245–#246
Monitoring state resolution health   live — PR #248
Public site / SEO health watch       live — PRs #249–#250
```

### Live proof — evidence, external universe, and bridge hacks

```text
Evidence selected                    12 / 287
Evidence hard findings                0
External rows                        98
External exact canonical             11
External unmatched baseline          87
External repeat unchanged            87
DefiLlama hacks parsed              613
bridgeHack=true                      61
Accepted bridge-hack baseline        61
Bridge-hack exact canonical          20
Bridge-hack repeat unchanged         61
Candidates                            0
```

The DefiLlama structured feed uses `https://api.llama.fi/hacks` as `legacy_public_json` with raw SHA-256 `e80fced996cf886ca0d2ca70c02dd04b869b628d63773d0b327f97b49aa2734a`. `bridgeHack=true` is the relevance gate before bridge identity matching.

### Live proof — active bridge official-domain watch

PR #241 added bounded two-pass probes for canonical `active`, `limited`, and `paused` bridge official URLs. Run `31313158492` exposed a false positive when Synapse's official URL lived at `bridge.synapseprotocol.com` while canonical `official_domain` was `synapseprotocol.com`. That review branch was discarded. PR #243 changed the comparison to treat parent/subdomain relationships as the same official site.

Corrected run `31313312723` and accepted state PR #244:

```text
Eligible bridges                       22
Selected                                8
Healthy baselines                       8
Hard failures                           0
Domain findings                         0
Canonical diff                       none
```

A post-merge rerun produced baseline changes 0, findings 0, and `state_changed=false`.

Two independent 404/410 results are required for a hard finding. 401/403/405/429, timeout, 5xx, or mixed probes are insufficient. A consistent redirect outside the stored official-domain scope remains reviewable.

### Live proof — RSS status-news discovery

PR #245 added RSS/Atom parsing and bounded security/operations/regulatory triggers. Run `31313579371`, job `93245104559`, reached both configured feeds and initialized them with zero candidates:

```text
Feeds reached                 2
CoinDesk rows                25
Cointelegraph rows           30
Total parsed                 55
Bridge + trigger rows         0
Baseline candidates           0
Findings                      0
Canonical diff             none
```

PR #246 persisted the feed baseline. Rerun job `93245346339` again parsed 55 rows with no relevant rows, candidates, findings, or state change. An RSS item can only become `B / hold` when it contains both a canonical BIR bridge identity and a bounded security, pause/shutdown, or regulatory trigger. Primary-source review remains mandatory before any canonical work.

GDELT remains optional/fail-closed code only because its first GitHub Actions live request returned HTTP 429.

### Live proof — review issue lifecycle

PR #248 added explicit resolution/rearm handling for tracked review issues without changing existing open fingerprints.

```text
new/open issue              medium finding + B/hold
unchanged open              silent
known issue closes          one low resolved finding
unchanged closed            silent
closed issue reopens        rearmed medium finding + B/hold
historical closed issue     ignored unless previously tracked
```

Issue resolution is monitoring-state resolution only. It never changes canonical incident or bridge state by itself.

### Live proof — public site / SEO health

PR #249 added the separate `BIR Public Site Health` workflow. PR #250 accepted the first healthy production baseline from run `31314396266`.

```text
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

The monitor checks `/`, `/robots.txt`, `/sitemap.xml`, `/version.json`, one rotating bridge detail route, and one rotating incident detail route. Scheduled run `31359554582` on 2026-08-10 completed successfully with no public-site state changes. Main BIR Monitoring run `31356920691` also completed successfully with no monitoring state changes.

## v1 technical release status

```text
Restart/status checkpoint             complete — PR #251
Accessibility foundation              complete — PR #252
Performance budget                    complete — PR #253
Browser compatibility                 complete — PR #254
Actions runtime hardening             complete — PR #255
Dependency security hardening         complete — PR #256
Hardening checkpoint                  complete — PR #257
Consolidated release-readiness gate   complete — PR #258
Technical release closure             complete — run 31367052981
```

Accepted proof:

```text
Main merge                               d9f545803104bffd829d93270965f53d9f3d1a45
Release-readiness run                    31367052981
Release-readiness job                    93387599332
Built HTML accessibility contract        73 pages passing
Performance max HTML                     16 KiB gzip ceiling
Performance CSS                           5 KiB total / 5 KiB max
Performance JS                            4 KiB total / 2 KiB max
Browser engines                           Chromium / Firefox / WebKit passing
Actions major runtimes                    v7 where used by release/monitoring workflows
Astro                                     ^7.2.0
High-severity npm audit findings          0
Production registry equality              success
Canonical                                 33 / 34 / 183 / 287
Canonical release mutation                none
```

The first dependency audit exposed 1 low and 2 high findings rooted in the older Astro dependency graph. Astro 7.2.0 cleared the blocking high-severity gate, and the full Check, visual review, three-engine compatibility workflow, consolidated release-readiness run, and post-merge production equality proof all pass.

This is **v1 technical release closure**, not a semantic-version publication event. No GitHub Release or version tag is created or implied by this checkpoint.

## Monitoring and release safety boundary

- canonical JSON is fingerprinted before and after every monitoring run;
- canonical diffs, unknown URL status, and broken canonical references are blocking;
- persistent monitoring output is restricted to approved monitoring/watchlist staging paths;
- first observations are reviewable zero-candidate baselines where appropriate;
- unchanged signals are suppressed;
- monitoring candidates never publish canonical records;
- secondary feeds can only create hold/review material;
- review issue resolution/rearm affects monitoring state only;
- public-site health monitoring complements, but does not replace, full production-content equality verification;
- accessibility, performance, browser compatibility, and high-severity npm audit are permanent release gates;
- canonical publication always requires a separate reviewed canonical branch and normal production verification.

## Ongoing work after v1 technical closure

1. continue reviewed candidate/corpus expansion;
2. continue Phase 3 research-triggered source-quality/archive work when stronger material appears;
3. keep Phase 5 monitoring in steady state and investigate new signals without auto-promoting them to canonical truth;
4. preserve accessibility, performance, three-engine compatibility, high-severity dependency security, source-quality, validator, and public-contract gates;
5. reopen technical hardening only when a gate regresses or a production compatibility issue is demonstrated.
