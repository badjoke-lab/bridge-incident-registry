# Phase 3 archive capture Batch 8 production verification — 2026-08-02

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `915d0127d9d182ff76b5638fb008ee080dd4c081`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      80
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      37
Unknown URL status                      0
```

## Verification scope

The unchanged full-content verifier must confirm all eighty canonical `archived_url` fields, every other transformed field across all four public datasets, exact record order, all static and detail routes, sitemap equality, redirects, canonical metadata, JSON-LD, robots, content types, and cache signals.

The prior same-count Batch 7 public dataset is not acceptable: production must contain the nine newly reviewed ChainSwap, Synapse, Rubic, Poly Network, Ronin, and Transit archive fields.

## Result

Pending GitHub Actions production verification.
