# Phase 3 archive capture Batch 8 production verification — 2026-08-02

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `915d0127d9d182ff76b5638fb008ee080dd4c081`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      80
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      37
Unknown URL status                      0
```

## Publication behavior

The unchanged verifier rejected the prior same-count Batch 7 evidence dataset on publication attempts 1 through 14. The first content difference was `bir_src_000073`, whose new archive field was absent from production.

```text
Previous generated_at  2026-08-02T06:15:12.441Z
First mismatch          bir_src_000073
Rejected attempts       1–14
```

Production converged on publication attempt 15 without a deployment retrigger.

## Successful verification

```text
Production verification run  30735942770
Production verification job  91464653821
Canonical normal CI           30735882106
Verification PR normal CI     30735942760
Generated at                  2026-08-02T06:20:07.688Z
Publication attempt           15
```

## Verified content

The verifier confirmed:

- all eighty exact `archived_url` fields, including the nine ChainSwap, Synapse, Rubic, Poly Network, Ronin, and Transit additions from Batch 8;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 8 is production-verified. The actionable archive queues are now 39 terminal unique URLs and 37 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.
