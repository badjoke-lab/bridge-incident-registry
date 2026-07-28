# BIR Phase 3 source-count production verification — 2026-07-28

Status: running  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `3c4bae8905ff052e987f84bc798545b467de807d`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
HTML routes 72
```

## Verification focus

The dedicated production verifier must confirm:

- all five static routes;
- all 33 bridge detail routes;
- all 34 incident detail routes;
- version and manifest counts at 33 / 34 / 183 / 211;
- ordered event IDs through `bir_ev_000183`;
- ordered evidence IDs through `bir_src_000211`;
- public incident JSON contains the seven normalized incident `source_count` values;
- public event JSON contains the six normalized event `source_count` values;
- exact 72-route sitemap equality;
- robots, metadata, redirects, content types, and observable cache headers.

## Expected audit state

```text
Total source-count mismatches   47
Incident mismatches              0
Event mismatches                47
```

The remaining event mismatches are reviewed evidence-link remediation work and are not publication failures for this bounded migration.

## Publication convergence

The verifier retains the bounded convergence gate:

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

Failure to reach the expected public-data state remains a hard failure before route assertions.

## Result

Pending the dedicated `Production Verification` workflow run triggered by this audit PR.
