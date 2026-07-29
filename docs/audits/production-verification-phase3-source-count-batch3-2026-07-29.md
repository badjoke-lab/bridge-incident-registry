# BIR Phase 3 source-count Batch 3 production verification — 2026-07-29

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `83d61fc1b4778a7a255db2de152c7b8d168a170f`

## Expected canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    241
HTML routes 72
```

## Expected audit state

```text
Total source-count mismatches   17
Incident mismatches              0
Event mismatches                17
```

## Verification scope

- wait for the canonical production counts to converge without weakening the gate;
- verify all five static routes;
- verify all 33 bridge detail routes;
- verify all 34 incident detail routes;
- verify version, manifest, and public JSON counts;
- verify ordered evidence IDs through `bir_src_000241`;
- verify the ten Batch 3 event-scoped evidence records;
- verify the four synchronized incident source counts;
- verify `bir_ev_000079.source_count = 1`;
- verify `bir_ev_000096.source_count = 1`;
- verify exact 72-route sitemap equality;
- verify canonical links, JSON-LD, robots, redirects, content types, and observable cache headers.

## Result

Pending the unchanged production-verification workflow.
