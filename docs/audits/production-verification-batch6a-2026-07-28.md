# BIR Batch 6A production verification — 2026-07-28

Status: retrying after publication lag  
Production origin: `https://bridge-incident-registry.pages.dev`

## Expected canonical state

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
HTML routes 62
```

Expected HTML routes consist of five static pages, 28 bridge detail pages, and 29 incident detail pages.

## Verification scope

- production home and collection counts
- all static pages
- all bridge detail routes
- all incident detail routes
- canonical links and JSON-LD identifiers
- version and manifest counts
- ordered canonical public JSON IDs
- sitemap URL set
- robots policy
- legacy redirects and destinations
- content types
- observable cache headers

## Runs

### Initial run

Production Verification run `30305681928` started immediately after the Batch 6A merge and failed while publication was still converging to the new canonical state.

### Retry

A fresh run is triggered by this commit after allowing the production publication path to advance. The audit remains incomplete until the dedicated workflow passes against the expected 28 / 29 / 134 / 160 state.
