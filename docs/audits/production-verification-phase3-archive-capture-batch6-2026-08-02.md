# Phase 3 archive capture Batch 6 production verification — 2026-08-02

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `f552007f5a37e6c988aec7884b0e122156102daf`  
Deployment retrigger merge: `480913508dd1ae4c0ba0f30c4df7879587b0845c`

## Expected production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      64
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      53
Unknown URL status                      0
```

## First verification attempt

The initial production-verification run did not converge after twenty attempts. Production remained on the prior same-count Batch 5 dataset.

```text
Failed run             30734330854
Observed generated_at  2026-08-02T05:31:08.973Z
First mismatch          bir_src_000032
Rejected attempts       1–20
```

PR #138 added a docs-only `main` commit to retrigger the Cloudflare Pages Git deployment. Canonical data, archive mappings, validators, and expected production content were unchanged.

## Verification scope

The unchanged full-content verifier must confirm all sixty-four canonical `archived_url` fields, every other transformed field across all four public datasets, exact record order, all static and detail routes, sitemap equality, redirects, canonical metadata, JSON-LD, robots, content types, and cache signals.

The prior same-count Batch 5 public dataset is not acceptable: production must contain the eleven newly reviewed Magpie, ChainSwap, Rubic, and Orbit archive fields.

## Result

Pending repeated GitHub Actions production verification after the deployment retrigger.
