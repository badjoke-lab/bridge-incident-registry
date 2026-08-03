# Phase 3 archive capture Batch 10 production verification — 2026-08-03

Status: complete  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `6edc02270d1fdfd202ec13874a2a00845ce97897`  
Deployment retrigger merge: `fd1d0cdd1ab7fc87052ea4308834ada77561205f`

## Verified production state

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                       284
Evidence with archived_url      84
HTML routes                     72
Redirects                       74
Canonical public content match  true
```

## Verified quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Terminal unarchived unique URLs        37
Risky-host unarchived unique URLs      34
Unknown URL status                      0
```

## First verification attempt

The initial unchanged production-verification job did not converge after twenty attempts. Production remained on the prior same-count Batch 9 dataset.

```text
Production verification run  30781383081
Failed production job        91586560207
Observed generated_at        2026-08-03T03:13:51.429Z
First mismatch               bir_src_000025
Rejected attempts            1–20
```

PR #151 added a docs-only `main` commit to retrigger the Cloudflare Pages Git deployment. Canonical data, archive mappings, source-quality ceilings, validators, and expected production content were unchanged.

## Successful verification

The same unchanged workflow run was retried after the deployment retrigger and passed on the first publication attempt.

```text
Production verification run  30781383081
Production verification job  91587613338
Canonical normal CI           30781280526
Initial verification PR CI    30781383082
Generated at                  2026-08-03T03:20:41.394Z
Publication attempt           1 after retrigger
```

## Verified content

The verifier confirmed:

- all eighty-four exact `archived_url` fields, including the three Multichain evidence records updated in Batch 10;
- every transformed field in all 33 bridge, 34 incident, 183 event, and 284 evidence records;
- exact public record ordering;
- five static pages, all 33 bridge routes, and all 34 incident routes;
- exact sitemap equality for 72 canonical HTML routes;
- all 74 legacy redirects;
- canonical links, metadata, JSON-LD, robots, content types, and cache assertions.

## Closure

Archive Capture Batch 10 is production-verified. The actionable archive queues are now 37 terminal unique URLs and 34 risky-host unique URLs. No source claim, hierarchy field, date, or record linkage changed.
