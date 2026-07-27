# BIR Batch 6A production verification — 2026-07-28

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `c074d411b9c1d99b0f5cd56c5ade3125952de13c`  
Successful verification run: `30306150605`

## Verified canonical state

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
HTML routes 62
```

The HTML route total consists of five static pages, 28 bridge detail pages, and 29 incident detail pages.

## Verification scope

The successful production run checked:

- production home and collection counts
- all five static pages
- all 28 bridge detail routes
- all 29 incident detail routes
- canonical links and JSON-LD identifiers
- version and manifest counts and canonical-only markers
- ordered bridge, incident, event, and evidence public JSON IDs
- sitemap URL set
- robots policy
- generated legacy redirects and destinations
- content types
- observable cache headers

## Batch 6A routes

The following newly published routes returned HTTP 200 and were included in the full verification:

```text
/bridge/transit-swap/
/bridge/magpie-protocol/
/incident/transit-swap-2022-routing-approval-exploit/
/incident/magpie-protocol-2024-router-v2-exploit/
```

Production `version.json` and `data/manifest.json` returned the expected 28 / 29 / 134 / 160 record counts.

## Verification-environment correction

Initial runs `30305681928` and `30305785064` failed because Cloudflare returned Error 1010 to the verifier's custom automation User-Agent. Diagnostic run `30305900590` confirmed the access rejection across JSON and HTML routes.

A browser-compatible User-Agent and ordinary browser request headers were then used without reducing any verification assertion. Diagnostic run `30306079677` confirmed:

- HTTP 200 for `version.json` and `data/manifest.json`
- expected 28 / 29 / 134 / 160 counts
- HTTP 200 for all four new Batch 6A detail routes

The production verifier was updated permanently and full run `30306150605` passed.

## Result

Batch 6A publication is complete and independently verified against the reviewed canonical repository state.

The temporary diagnostic workflow was removed before this audit PR was merged.
