# Phase 3 archive capture Batch 3 production verification — 2026-08-01

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `5d3d472a6851843d31c896f27aaff74ddc6b44f0`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      27
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        40
Risky-host unarchived unique URLs      69
Unknown URL status                      0
```

## Publication behavior

The unchanged verifier rejected the prior same-count Batch 2 evidence dataset on publication attempts 1 through 19. The first content difference was `bir_src_000038`, whose new archive field was absent from production.

```text
Previous generated_at  2026-08-01T07:22:17.697Z
First mismatch          bir_src_000038
Rejected attempts       1–19
```

Production converged at the final permitted attempt without a deployment retrigger.

## Successful verification

```text
Production verification run  30689740068
Production verification job  91342221102
Canonical normal CI           30689665597
Verification PR normal CI     30689740071
Generated at                  2026-08-01T07:30:44.916Z
Publication attempt           20
```

## Verified content

The verifier confirmed:

- all twenty-seven exact `archived_url` fields, including the six ShuttleFlow, pNetwork, and Qubit/Bunny additions from Batch 3;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 3 is production-verified. The actionable archive queues are now 40 terminal unique URLs and 69 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.