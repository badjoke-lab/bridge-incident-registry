# Production verification — Archive Capture Batch 16 — 2026-08-09

Status: pending verification

## Canonical publication target

```text
Canonical merge                  f9c6395d400358543bb3a761aa209be97ca1c266
Bridges                           33
Incidents                         34
Events                           183
Evidence                         284
Evidence with archived_url       116
Terminal unarchived unique URLs   25
Risky-host unarchived unique URLs 18
X/Twitter records unarchived      29
```

## Required proof

The unchanged production verifier must observe complete canonical-derived equality on `https://bir.badjoke-lab.com`, including all four public datasets, canonical-only markers, every canonical HTML route, sitemap, robots, JSON-LD, redirects, content types, and cache observations.

Counts alone are not sufficient. Same-count stale evidence content must be rejected.
