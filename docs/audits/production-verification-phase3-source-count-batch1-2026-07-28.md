# BIR Phase 3 source-count Batch 1 production verification — 2026-07-28

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `626ac6b91c5ce9165938034055ccb7edc14071a7`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    221
HTML routes 72
```

## Successful runs

```text
Production Verification   30370374622  retry success
Normal repository CI      30370374443
```

The initial production attempt exhausted the bounded convergence window before Cloudflare published evidence count 221. The failed jobs were rerun without changing the verification conditions, and the retry passed after publication converged.

## Verified surfaces

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 221;
- ordered evidence IDs through `bir_src_000221`;
- all ten Batch 1 event-scoped evidence records in public JSON;
- all seven synchronized incident `source_count` values in public JSON;
- exact 72-route sitemap equality;
- robots, metadata, redirects, content types, and observable cache headers.

## Verified audit state

```text
Total source-count mismatches   37
Incident mismatches              0
Event mismatches                37
```

## Publication convergence

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

The gate was not relaxed. The successful retry used the same count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions.

## Result

Source-count remediation Batch 1 is merged, published, and production-verified. Evidence increased from 211 to 221, record routes remain 72, and unresolved event source-count mismatches decreased from 47 to 37.

## Next

Continue with source-count review Batch 2. Exact source-count equality remains a warning until all remaining event evidence-link migrations are complete.
