# BIR Phase 3 final restart production verification — 2026-07-28

Status: running  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `5cc54661b3a3f349ba5aa898930e35279f70df3b`

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
- LI.FI 2022 event normalization;
- LI.FI 2024 restart status correction;
- ChainSwap July 2 incident-specific August 20 relaunch event;
- exact 72-route sitemap equality;
- robots, metadata, redirects, content types, and observable cache headers.

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
