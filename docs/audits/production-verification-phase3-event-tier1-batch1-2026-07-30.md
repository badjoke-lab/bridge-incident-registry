# Phase 3 event Tier 1 Batch 1 production verification — 2026-07-30

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `da066fb29b5b45f6c8602ef36becf6536bfe6a29`

## Expected production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    271
HTML routes 72
Redirects   74
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Events without primary                 28
Events without Tier 1                  19
Unknown URL status                      0
Terminal unarchived unique URLs        59
Risky-host unarchived unique URLs      83
```

## Expected evidence publication

The public evidence dataset must include ordered IDs through `bir_src_000271` and publish the reviewed fields for:

- `bir_src_000266` — Commons Bridge proxy compromise;
- `bir_src_000267` — Syndicate investigation and tracing;
- `bir_src_000268` — Ronin validator compromise disclosure;
- `bir_src_000269` — Nomad root-cause evidence;
- `bir_src_000270` — Poly Network asset recovery completion;
- `bir_src_000271` — Celer compensation commitment.

## Verification scope

- wait for production to converge to the complete canonical public contract;
- compare every transformed field in all four public datasets;
- verify all five static routes;
- verify all 33 bridge detail routes;
- verify all 34 incident detail routes;
- verify version, manifest, and canonical-only markers;
- verify exact 72-route sitemap equality;
- verify all 74 legacy redirects;
- verify canonical links, JSON-LD, robots, content types, and cache signals;
- reject the earlier 265-evidence deployment even if routes remain available.

## Result

Pending the existing production-verification workflow and explicit final-head normal CI.
