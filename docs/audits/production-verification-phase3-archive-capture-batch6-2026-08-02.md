# Phase 3 archive capture Batch 6 production verification — 2026-08-02

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `f552007f5a37e6c988aec7884b0e122156102daf`  
Deployment retrigger merge: `480913508dd1ae4c0ba0f30c4df7879587b0845c`

## Verified production state

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

## Verified quality state

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
Failed production run  30734330854
Failed job             91460170932
Observed generated_at  2026-08-02T05:31:08.973Z
First mismatch          bir_src_000032
Rejected attempts       1–20
```

PR #138 added a docs-only `main` commit to retrigger the Cloudflare Pages Git deployment. Canonical data, archive mappings, validators, and expected production content were unchanged.

## Successful verification

The unchanged verifier passed on the first publication attempt after the deployment retrigger.

```text
Production verification run  30734550824
Production verification job  91460859010
Canonical normal CI           30734278053
Verification PR normal CI     30734550837
Generated at                  2026-08-02T05:38:31.010Z
Publication attempt           1 after retrigger
```

## Verified content

The verifier confirmed:

- all sixty-four exact `archived_url` fields, including the eleven Magpie, ChainSwap, Rubic, and Orbit additions from Batch 6;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 6 is production-verified. The actionable archive queues are now 39 terminal unique URLs and 53 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.
