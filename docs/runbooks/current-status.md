# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-09

## Canonical and production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

Canonical data remains unchanged by Phase 5 monitoring. Unknown URL status and source-count mismatches remain at 0.

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
Monitoring state resolution health   next
Site / SEO watch                     planned
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

## Monitoring safety boundary

- canonical JSON is fingerprinted before and after every run;
- canonical diffs, unknown URL status, and broken canonical references are blocking;
- persistent output is restricted to `data-staging/monitoring/**` and `data-staging/watchlists/auto/**`;
- first observations are reviewable zero-candidate baselines where appropriate;
- unchanged signals are suppressed;
- monitoring candidates never publish canonical records;
- secondary feeds can only create hold/review material;
- canonical publication always requires a separate reviewed canonical branch and normal production verification.

## Latest completed production checkpoint

```text
Review PR                     #211
Canonical data PR             #213
Canonical merge               f2874a2d0ffe6877eadf6619cd6100a9b9b3991b
Production audit PR           #214
Production verify run         31300484236
Production verify job         93212360938
Verified state                33 / 34 / 183 / 287
Canonical content match       true
Generated at                  2026-08-09T07:08:45.362Z
```

## Next

1. add explicit monitoring-state/watchlist resolution health and rearm behavior;
2. add public-site/SEO monitoring;
3. maintain source-quality, validator, public-contract, and UI compatibility gates;
4. continue v1 hardening;
5. revisit evidence/archive gaps only when source conditions materially change.
