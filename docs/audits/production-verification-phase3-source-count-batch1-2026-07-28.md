# BIR Phase 3 source-count Batch 1 production verification — 2026-07-28

Status: running  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `626ac6b91c5ce9165938034055ccb7edc14071a7`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    221
HTML routes 72
```

## Verification focus

The dedicated production verifier must confirm:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 221;
- ordered evidence IDs through `bir_src_000221`;
- public evidence JSON contains the ten Batch 1 event-scoped records;
- public incident JSON contains the seven synchronized incident `source_count` values;
- exact 72-route sitemap equality;
- robots, metadata, redirects, content types, and observable cache headers.

## Expected audit state

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

Failure to reach the expected public-data state remains a hard failure before route assertions.

## Result

Pending the dedicated `Production Verification` workflow run triggered by this audit PR.
