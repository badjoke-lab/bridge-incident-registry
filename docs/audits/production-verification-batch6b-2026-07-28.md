# BIR Batch 6B production verification — 2026-07-28

Status: retrying after initial publication check  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `1d2ccf24edab7b764160da130fc2e36146e6f1b1`

## Expected canonical state

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
HTML routes 67
```

The HTML route total consists of five static pages, 30 bridge detail pages, and 32 incident detail pages.

## Batch 6B routes

```text
/bridge/rubic/
/bridge/unizen/
/incident/rubic-2022-rbc-brbc-bridge-wallet-compromise/
/incident/rubic-2022-rubicproxy-approval-exploit/
/incident/unizen-2024-external-call-approval-exploit/
```

## Verification scope

- production home and collection counts
- all static pages
- all bridge detail routes
- all incident detail routes
- canonical links and JSON-LD identifiers
- version and manifest counts
- ordered canonical public JSON IDs
- RBC and BRBC public reference output
- sitemap URL set
- robots policy
- legacy redirects and destinations
- content types
- observable cache headers

## Runs

Initial Production Verification run `30307468595` started immediately after PR #67 opened and did not match the expected newly published state.

A fresh full verification run is triggered by this commit. The audit remains incomplete until the 30 / 32 / 150 / 181 state and all 67 routes pass without reduced assertions.
