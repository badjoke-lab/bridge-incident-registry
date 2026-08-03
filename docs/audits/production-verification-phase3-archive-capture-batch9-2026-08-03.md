# Phase 3 archive capture Batch 9 production verification — 2026-08-03

Status: verification in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `dce643e53c1d2417aeca6eae235d38dc20d32ca6`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      81
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      36
Unknown URL status                      0
```

## Verification target

The unchanged production verifier must confirm the exact Batch 9 archive field for `bir_src_000203`, every transformed field in all four public datasets, all canonical HTML routes, sitemap equality, redirects, metadata, JSON-LD, robots, content types, and cache assertions.

This document must not be marked complete until the production verifier passes against the canonical merge above.
