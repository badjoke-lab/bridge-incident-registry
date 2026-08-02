# Phase 3 archive capture Batch 5 production verification — 2026-08-01

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `27afd411b0eae500b30f8f5a1f49121476e46ebd`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      53
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      59
Unknown URL status                      0
```

## Publication behavior

The unchanged verifier rejected the prior same-count Batch 4 evidence dataset on publication attempts 1 through 11. The first content difference was `bir_src_000030`, whose new archive field was absent from production.

```text
Previous generated_at  2026-08-01T08:13:17.998Z
First mismatch          bir_src_000030
Rejected attempts       1–11
```

Production converged on publication attempt 12 without a deployment retrigger.

## Successful verification

```text
Production verification run  30691464065
Production verification job  91346826104
Canonical normal CI           30691392132
Verification PR normal CI     30691464063
Generated at                  2026-08-01T08:19:37.599Z
Publication attempt           12
```

## Verified content

The verifier confirmed:

- all fifty-three exact `archived_url` fields, including the thirteen THORChain, Meter, Synapse, Nomad, and Orbit additions from Batch 5;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 5 is production-verified. The actionable archive queues are now 39 terminal unique URLs and 59 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.
