# BIR Phase 3 source-count Batch 2 production verification — 2026-07-28

Status: running after deployment retrigger  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `70bd5de1526cca5ce3122a7bdc23ea80d50179e0`  
Deployment retrigger merge: `99941592b9e526661ad004e6504c26588737d7fc`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    231
HTML routes 72
```

## Prior failure diagnosis

Two unchanged production-verification attempts failed because the live deployment remained at the Batch 1 state. A GitHub-hosted diagnostic confirmed evidence count 221, evidence tail `bir_src_000221`, and the pre-Batch-2 event and incident counts.

A docs-only main PR was merged to retrigger the existing Cloudflare Pages Git integration. No verifier, build, canonical-data, route, or runtime condition was changed.

## Verification focus

The dedicated production verifier must confirm:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 231;
- ordered evidence IDs through `bir_src_000231`;
- public evidence JSON contains the ten Batch 2 event-scoped records;
- public incident JSON contains the six synchronized incident `source_count` values;
- public event JSON contains `bir_ev_000044.source_count = 2` and `bir_ev_000054.source_count = 1`;
- exact 72-route sitemap equality;
- robots, metadata, redirects, content types, and observable cache headers.

## Expected audit state

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

Failure to reach the expected public-data state remains a hard failure before route assertions.

## Result

Pending the dedicated `Production Verification` workflow run triggered after the deployment-retrigger merge.
