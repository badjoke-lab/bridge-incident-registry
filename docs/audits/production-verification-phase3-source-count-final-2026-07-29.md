# BIR final source-count production verification — 2026-07-29

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `e03386ab6d1242e2918700839b8449faff5c40c6`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    263
HTML routes 72
```

## Expected equality state

```text
Event source-count mismatches     0
Incident source-count mismatches  0
```

## Verification scope

- wait for the canonical production counts to converge without weakening the gate;
- verify all five static routes;
- verify all 33 bridge detail routes;
- verify all 34 incident detail routes;
- verify version, manifest, and public JSON counts;
- verify ordered evidence IDs through `bir_src_000263`;
- verify the final seven event-scoped evidence records;
- verify the two synchronized incident source counts;
- verify exact 72-route sitemap equality;
- verify canonical links, JSON-LD, robots, redirects, content types, and observable cache headers.

## Result

Pending the unchanged production-verification workflow.
