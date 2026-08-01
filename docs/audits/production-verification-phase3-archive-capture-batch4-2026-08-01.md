# Phase 3 archive capture Batch 4 production verification — 2026-08-01

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `b72d0e68735e6a49718eb938630e65af89b2f12f`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      40
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      65
Unknown URL status                      0
```

## Publication behavior

The unchanged verifier rejected the prior same-count Batch 3 evidence dataset on publication attempts 1 through 14. The first content difference was `bir_src_000053`, whose new archive field was absent from production.

```text
Previous generated_at  2026-08-01T07:30:44.916Z
First mismatch          bir_src_000053
Rejected attempts       1–14
```

Production converged on publication attempt 15 without a deployment retrigger.

## Successful verification

```text
Production verification run  30690563060
Production verification job  91344413654
Canonical normal CI           30690487993
Verification PR normal CI     30690563043
Generated at                  2026-08-01T07:42:49.272Z
Publication attempt           15
```

## Verified content

The verifier confirmed:

- all forty exact `archived_url` fields, including the thirteen Connext, Allbridge, Magpie, and THORChain additions from Batch 4;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 4 is production-verified. The actionable archive queues are now 39 terminal unique URLs and 65 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.