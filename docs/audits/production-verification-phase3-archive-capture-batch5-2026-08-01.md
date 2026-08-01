# Phase 3 archive capture Batch 5 production verification — 2026-08-01

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `27afd411b0eae500b30f8f5a1f49121476e46ebd`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      53
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      59
Unknown URL status                      0
```

## Verification scope

The unchanged full-content verifier must confirm all fifty-three canonical `archived_url` fields, every other transformed field across all four public datasets, exact record order, all static and detail routes, sitemap equality, redirects, canonical metadata, JSON-LD, robots, content types, and cache signals.

The prior same-count Batch 4 public dataset is not acceptable: production must contain the thirteen newly reviewed THORChain, Meter, Synapse, Nomad, and Orbit archive fields.

## Result

Pending GitHub Actions production verification.
