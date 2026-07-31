# Phase 3 archive capture Batch 1 production verification — 2026-07-31

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `5a152f647e05018170e57721dfdef69d1cadf12b`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      10
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        54
Risky-host unarchived unique URLs      83
Unknown URL status                      0
```

## Verification scope

The unchanged full-content verifier must confirm the exact `archived_url` fields for all ten Batch 1 evidence records, every other transformed field across all four public datasets, all static and detail routes, sitemap equality, redirects, metadata, JSON-LD, robots, content types, and cache signals.

## Result

Pending GitHub Actions production verification.
