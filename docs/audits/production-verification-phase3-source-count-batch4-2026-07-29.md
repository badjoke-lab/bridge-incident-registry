# BIR Phase 3 source-count Batch 4 production verification — 2026-07-29

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `fd210052b40ff038156b22d116848751990b5633`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    256
HTML routes 72
```

## Expected audit state

```text
Total source-count mismatches    7
Incident mismatches              0
Event mismatches                 7
```

## Verification scope

- wait for the canonical production counts to converge without weakening the gate;
- verify all five static routes;
- verify all 33 bridge detail routes;
- verify all 34 incident detail routes;
- verify version, manifest, and public JSON counts;
- verify ordered evidence IDs through `bir_src_000256`;
- verify the fifteen Batch 4 event-scoped evidence records;
- verify the three synchronized incident source counts;
- verify exact 72-route sitemap equality;
- verify canonical links, JSON-LD, robots, redirects, content types, and observable cache headers.

## Result

Pending the unchanged production-verification workflow.
