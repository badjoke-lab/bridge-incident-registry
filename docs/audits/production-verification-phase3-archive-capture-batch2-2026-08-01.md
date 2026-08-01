# Phase 3 archive capture Batch 2 production verification — 2026-08-01

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `a0763951c612fae6149093ae7124de622a54e342`  
Deployment retrigger: `9718b8d8383f158ab8ef391ea491df9e2da0f397`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      21
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        46
Risky-host unarchived unique URLs      75
Unknown URL status                      0
```

## Deployment diagnosis

The first unchanged production-verification attempt exhausted all twenty publication checks. Production remained on the same-count Batch 1 dataset generated at `2026-08-01T06:54:37.242Z` and differed first at `bir_src_000126`.

PR #125 created a docs-only `main` push. It changed no canonical data, archive mapping, source-quality ceiling, build rule, route, verifier assertion, runtime setting, or timeout.

The unchanged verifier was rerun after the retrigger and found canonical production content on publication attempt 1.

## Successful verification

```text
Production verification run  30688749856
Successful rerun job          91340437658
Canonical normal CI           30688662830
Verification PR normal CI     30688749844
Retrigger normal CI           30689003552
Generated at                  2026-08-01T07:03:30.526Z
Publication attempt           1
```

## Verified content

The verifier confirmed:

- all twenty-one exact `archived_url` fields, including the eleven Ren Protocol and Avalanche additions from Batch 2;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 2 is production-verified. The actionable archive queues are now 46 terminal unique URLs and 75 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.