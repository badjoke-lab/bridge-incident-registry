# Production verification — Archive Deferred Retry 01 — 2026-08-09

Status: pending verification

## Canonical publication target

```text
Canonical merge                  934c85c49f7db71773721c5f4d64cc769f1361b0
Bridges                           33
Incidents                         34
Events                           183
Evidence                         284
Evidence with archived_url       126
Terminal unarchived unique URLs   15
Risky-host unarchived unique URLs 17
X/Twitter records unarchived      29
```

## Required proof

The unchanged production verifier must observe complete canonical-derived equality on `https://bir.badjoke-lab.com`, including all four public datasets, canonical-only markers, every canonical HTML route, sitemap, robots, JSON-LD, redirects, content types, and cache observations.

Counts alone are not sufficient. Same-count stale evidence content must be rejected.
