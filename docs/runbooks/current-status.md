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

Canonical source files remain unchanged by monitoring:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      287
```

## Phase 3 quality strengthening

```text
Full-corpus audit                    complete — PR #71
Source-count remediation             complete — PRs #78–#99
Source-quality baseline/remediation  complete — PRs #100–#107
Event Tier 1 remediation             production-verified — PRs #108–#116
Archive capture Batches 1–18         production-verified — PRs #118–#198
Deferred Archive Retries 01–02       production-verified — PRs #199–#204
Deferred Archive Retries 03–04       review complete — PRs #205–#206
Event Primary Remediation 01         production-verified — PRs #207–#209
Event Primary Remediation 02         production-verified — PRs #211–#214
Cross-record bridge integrity        blocking — PR #218
Unknown URL-status hard ceiling      active at 0
Full production-content equality     active
```

## Phase 5 monitoring and candidate collection

```text
Review-gated foundation              complete — PR #217
Initial Boltz monitoring state       merged — PR #223
Review-branch fallback / dedupe      complete — PR #225
Evidence health watch                live — PR #226
External bridge-universe watch       live — PRs #228–#230
Optional GDELT adapter               fail-closed — PRs #231–#232
Structured bridge-hack feed          live — PRs #233–#239
Active bridge/domain watch           next
Site / SEO watch                     planned
```

### Live monitoring proofs

Issue #171 was emitted once as `Boltz — B / hold`; after PR #223 persisted its fingerprint, an unchanged rerun created no new review work.

Evidence health run `31301765004` / job `93215576787`:

```text
Live evidence URLs                   287
Selected URLs                         12
Independent probes                    24
Hard 404/410 findings                  0
Canonical diff                         none
```

External bridge-universe accepted baseline and repeat:

```text
Active external rows                  98
Exact canonical matches               11
Unmatched baseline fingerprints       87
Baseline candidates                    0
Repeat unchanged                      87
Repeat candidates                      0
Repeat state change                false
```

Structured DefiLlama bridge-hack feed:

```text
Input URL        https://api.llama.fi/hacks
Input kind       legacy_public_json
Raw SHA-256      e80fced996cf886ca0d2ca70c02dd04b869b628d63773d0b327f97b49aa2734a
Parsed hacks     613
bridgeHack=true   61
Accepted baseline 61
Exact canonical   20
Candidates         0
```

The live raw schema uses `bridgeHack`, `chain`, `source`, and `targetType`. Temporary probes proved that seven canonical-name matches with `bridgeHack=false` were ordinary protocol/DeFi exploits, so PR #238 made `bridgeHack=true` the incident-feed relevance gate before identity classification.

After PR #239 merged the 61-row baseline, rerun job `93224464784` proved:

```text
Bridge-hack rows          61
Unchanged                 61
Candidates                 0
State change           false
External universe unchanged 87
Evidence findings           0
Canonical diff           none
```

GDELT remains optional code only: its first GitHub Actions live request was rate-limited with HTTP 429 and no GDELT baseline was created. Scheduled/default incident discovery therefore uses the best-effort DefiLlama raw `/hacks` route with exact provenance and fail-closed fallback behavior.

## Monitoring safety boundary

- canonical JSON is fingerprinted before and after every run;
- canonical diffs, unknown URL status, and broken canonical references are blocking;
- persistent monitoring output is restricted to `data-staging/monitoring/**` and `data-staging/watchlists/auto/**`;
- initial external universes are zero-candidate baselines;
- unchanged signals are suppressed;
- monitoring candidates are review material only;
- DefiLlama/GDELT discovery can never become class A automatically;
- canonical publication always requires a separate reviewed canonical branch and normal production verification.

## Source-quality state

```text
Primary evidence                         206 / 287
Tier 1 evidence                          223 / 287
Official-domain evidence                 131 / 287
Evidence with archived_url               130 / 287
Incidents without primary                  1 / 34
Incidents without tier 1                   1 / 34
Events without primary                    11 / 183
Events without tier 1                       6 / 183
Terminal unarchived unique URLs           15
Risky-host unarchived unique URLs         16
Unknown URL status                         0
```

Four non-intentional event-primary gaps remain deferred pending stronger first-party material: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps are intentional secondary-only records. `bir_ev_000150` remains intentionally non-primary direct security monitoring. `bir_inc_000026` remains the reviewed Nerve incident-level primary/Tier 1 gap.

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

1. implement bounded official-domain/status monitoring for canonical active bridges;
2. add reproducible pause/shutdown/regulatory signals without weakening incident semantics;
3. maintain source-quality, validator, public-contract, and UI compatibility gates;
4. continue v1 hardening;
5. revisit evidence/archive gaps only when source conditions materially change.
