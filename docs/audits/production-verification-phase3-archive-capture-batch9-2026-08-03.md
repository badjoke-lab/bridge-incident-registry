# Phase 3 archive capture Batch 9 production verification — 2026-08-03

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `dce643e53c1d2417aeca6eae235d38dc20d32ca6`

## Verified production state

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

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      36
Unknown URL status                      0
```

## Publication behavior

The unchanged verifier rejected the prior same-count Batch 8 evidence dataset on publication attempts 1 through 6. The first content difference was `bir_src_000203`, whose reviewed archive field was absent from production.

```text
Previous generated_at  2026-08-02T06:46:56.286Z
First mismatch          bir_src_000203
Rejected attempts       1–6
```

Production converged on publication attempt 7 without a deployment retrigger.

## Successful verification

```text
Production verification run  30779827391
Production verification job  91582150806
Canonical normal CI           30736754061
Verification PR normal CI     30779827393
Generated at                  2026-08-03T02:40:37.000Z
Publication attempt           7
```

## Verified content

The verifier confirmed:

- all eighty-one exact `archived_url` fields, including the Poly Network mainnet-upgrade archive added in Batch 9;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 9 is production-verified. The actionable archive queues are now 39 terminal unique URLs and 36 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.
