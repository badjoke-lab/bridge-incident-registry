# BIR Batch 7 production verification — 2026-07-28

Status: running  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `eb6bc7366ea25be4441c72cdfa50b753477eef34`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
HTML routes 72
```

The HTML route total consists of five static pages, 33 bridge detail pages, and 34 incident detail pages.

## Batch 7 routes

```text
/bridge/taiko-bridge/
/bridge/everclear/
/bridge/commons-bridge/
/incident/taiko-bridge-2026-message-proof-exploit/
/incident/commons-bridge-2026-proxy-compromise/
```

## Verification scope

- production home and collection counts
- all static pages
- all bridge detail routes
- all incident detail routes
- canonical links and JSON-LD identifiers
- version and manifest counts
- ordered canonical public JSON IDs
- SYND, CLEAR, and NEXT public asset references
- Taiko, Base, and Commons Chain public chain references
- sitemap URL set
- robots policy
- legacy redirects and destinations
- content types
- observable cache headers

## Result

Pending the dedicated `Production Verification` workflow run triggered by this audit PR.
