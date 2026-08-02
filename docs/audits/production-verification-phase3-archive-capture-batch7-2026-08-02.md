# Phase 3 archive capture Batch 7 production verification — 2026-08-02

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `9b9db5e48626ba7d919301d18c40dd9bbadd6d1f`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      71
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        39
Risky-host unarchived unique URLs      46
Unknown URL status                      0
```

## Publication behavior

The unchanged verifier rejected the prior same-count Batch 6 evidence dataset on publication attempts 1 through 17. The first content difference was `bir_src_000049`, whose new archive field was absent from production.

```text
Previous generated_at  2026-08-02T06:00:11.025Z
First mismatch          bir_src_000049
Rejected attempts       1–17
```

Production converged on publication attempt 18 without a deployment retrigger.

## Successful verification

```text
Production verification run  30735206567
Production verification job  91462656791
Canonical normal CI           30735138759
Verification PR normal CI     30735206554
Generated at                  2026-08-02T06:06:48.014Z
Publication attempt           18
```

## Verified content

The verifier confirmed:

- all seventy-one exact `archived_url` fields, including the seven Meter, Allbridge, Nomad, ChainSwap, and Synapse additions from Batch 7;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 7 is production-verified. The actionable archive queues are now 39 terminal unique URLs and 46 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.
