# BIR Phase 3 source-count Batch 2 production verification — 2026-07-28

Status: passed  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `70bd5de1526cca5ce3122a7bdc23ea80d50179e0`  
Deployment retrigger merge: `99941592b9e526661ad004e6504c26588737d7fc`

## Verified canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    231
HTML routes 72
```

## Successful runs

```text
Production Verification   30374628843
Normal repository CI      30374629112
```

## Deployment diagnosis

Two earlier verification attempts correctly failed because production remained at the Batch 1 state. A GitHub-hosted diagnostic confirmed:

```text
Production evidence count     221
Production evidence tail      bir_src_000221
bir_ev_000044 source_count     3
bir_ev_000054 source_count     2
```

A docs-only main PR was merged to retrigger the existing Cloudflare Pages Git integration. No verifier, build, canonical-data, route, or runtime condition was changed. The next unchanged verification run passed after the new deployment published.

## Verified surfaces

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 231;
- ordered evidence IDs through `bir_src_000231`;
- all ten Batch 2 event-scoped evidence records in public JSON;
- all six synchronized incident `source_count` values in public JSON;
- `bir_ev_000044.source_count = 2` in public JSON;
- `bir_ev_000054.source_count = 1` in public JSON;
- exact 72-route sitemap equality;
- robots, metadata, redirects, content types, and observable cache headers.

## Verified audit state

```text
Total source-count mismatches   27
Incident mismatches              0
Event mismatches                27
```

## Publication convergence

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

The successful run used the unchanged convergence gate and all existing assertions.

## Result

Source-count remediation Batch 2 is merged, published, and production-verified. Evidence increased from 221 to 231, route totals remain 72, and unresolved event source-count mismatches decreased from 37 to 27.

## Next

Continue with source-count review Batch 3. Exact source-count equality remains a warning until all remaining event evidence-link migrations are complete.
