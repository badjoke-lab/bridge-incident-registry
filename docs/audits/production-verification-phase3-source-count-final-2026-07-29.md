# BIR final source-count production verification — 2026-07-29

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `e03386ab6d1242e2918700839b8449faff5c40c6`  
Deployment retrigger merge: `be5c6242647feb36c14d35f65e945f4e437ada70`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    263
HTML routes 72
Redirects   74
```

## Verified equality state

```text
Event source-count mismatches     0
Incident source-count mismatches  0
```

## Successful runs

```text
Production Verification   30427603790
Canonical PR normal CI    30427464812
Verification PR normal CI 30427603855
Retrigger PR normal CI    30427948353
```

The first production-verification attempt exhausted the convergence gate while Cloudflare Pages continued to serve the previous 256-evidence build. A docs-only main push retriggered the existing Git integration without changing canonical data, equality checks, build rules, routes, or verifier conditions.

The unchanged rerun detected the 263-evidence canonical state on attempt 1 and passed every route and public-contract assertion.

## Verified surfaces

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 263;
- ordered evidence IDs through `bir_src_000263`;
- all seven final event-scoped evidence records in public JSON;
- both synchronized incident `source_count` values in public JSON;
- exact 72-route sitemap equality;
- all 74 generated legacy redirects;
- canonical links, JSON-LD, robots, content types, and observable cache headers.

## Publication observation

```text
Production generated_at   2026-07-29T06:23:49.183Z
Convergence attempt        1
```

## Result

The source-count remediation sequence is complete. Canonical data, normal CI, controlled drift fixtures, generated public JSON, and the live site all agree exactly at 33 bridges, 34 incidents, 183 events, and 263 evidence records with zero incident or event source-count mismatches.

## Next

Continue Phase 3 with primary-source coverage, archive coverage, URL hardening, and remaining validator strengthening before Phase 5 monitoring and v1 hardening.
