# BIR Batch 7 production verification — 2026-07-28

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `eb6bc7366ea25be4441c72cdfa50b753477eef34`  
Successful verification run: `30309573252`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
HTML routes 72
```

The HTML route total consists of five static pages, 33 bridge detail pages, and 34 incident detail pages.

## Batch 7 routes

The following new routes were included in the successful full verification:

```text
/bridge/taiko-bridge/
/bridge/everclear/
/bridge/commons-bridge/
/incident/taiko-bridge-2026-message-proof-exploit/
/incident/commons-bridge-2026-proxy-compromise/
```

## Verification scope

The successful production run checked:

- production home and collection counts
- all five static pages
- all 33 bridge detail routes
- all 34 incident detail routes
- canonical links and JSON-LD identifiers
- version and manifest counts and canonical-only markers
- ordered bridge, incident, event, and evidence public JSON IDs
- SYND, CLEAR, and NEXT public asset references
- Taiko, Base, and Commons Chain public chain references
- sitemap URL set
- robots policy
- generated legacy redirects and destinations
- content types
- observable cache headers

## Publication convergence

Initial Production Verification run `30309142124` did not observe the 33 / 34 / 173 / 199 state within the bounded five-minute publication window and failed before route checks.

The retry retained the same hard convergence gate and every route and content assertion. Run `30309573252` detected the expected canonical state and then passed all 72 routes and public-data checks.

## Result

Phase 2 Batch 7 publication is complete and verified against the reviewed canonical repository state.
