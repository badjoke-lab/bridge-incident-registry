# Phase 3 archive capture Batch 4 production verification — 2026-08-01

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `b72d0e68735e6a49718eb938630e65af89b2f12f`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      40
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      65
Unknown URL status                      0
```

## Verification scope

The unchanged full-content verifier must confirm all forty canonical `archived_url` fields, every other transformed field across all four public datasets, exact record order, all static and detail routes, sitemap equality, redirects, canonical metadata, JSON-LD, robots, content types, and cache signals.

The prior same-count Batch 3 public dataset is not acceptable: production must contain the thirteen newly reviewed Connext, Allbridge, Magpie, and THORChain archive fields.

## Result

Pending GitHub Actions production verification.
