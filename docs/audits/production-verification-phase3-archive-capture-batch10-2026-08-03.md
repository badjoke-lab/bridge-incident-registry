# Phase 3 archive capture Batch 10 production verification — 2026-08-03

Status: verification in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `6edc02270d1fdfd202ec13874a2a00845ce97897`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      84
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        37
Risky-host unarchived unique URLs      34
Unknown URL status                      0
```

## Verification target

The unchanged production verifier must confirm the exact Batch 10 archive fields for `bir_src_000025`, `bir_src_000028`, and `bir_src_000216`, every transformed field in all four public datasets, all canonical HTML routes, sitemap equality, redirects, metadata, JSON-LD, robots, content types, and cache assertions.

This document must not be marked complete until the production verifier passes against the canonical merge above.
