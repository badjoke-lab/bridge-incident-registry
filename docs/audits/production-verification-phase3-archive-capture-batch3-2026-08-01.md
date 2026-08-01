# Phase 3 archive capture Batch 3 production verification — 2026-08-01

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `5d3d472a6851843d31c896f27aaff74ddc6b44f0`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      27
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        40
Risky-host unarchived unique URLs      69
Unknown URL status                      0
```

## Verification scope

The unchanged full-content verifier must confirm all twenty-seven canonical `archived_url` fields, every other transformed field across all four public datasets, exact record order, all static and detail routes, sitemap equality, redirects, canonical metadata, JSON-LD, robots, content types, and cache signals.

The prior same-count Batch 2 public dataset is not acceptable: production must contain the six newly reviewed ShuttleFlow, pNetwork, and Qubit/Bunny archive fields.

## Result

Pending GitHub Actions production verification.
