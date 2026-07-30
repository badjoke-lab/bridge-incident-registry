# Phase 3 event Tier 1 Batch 2 production verification — 2026-07-30

Status: in progress  
Production origin: `https://bridge-incident-registry.pages.dev`  
Canonical merge: `7c52a3804043bc9d16da5ddcf6faeef608da804d`

## Expected production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    279
HTML routes 72
Redirects   74
```

## Expected quality state

```text
Incident source mismatches              0
Event source mismatches                 0
Events without primary                 20
Events without Tier 1                  11
Unknown URL status                      0
Terminal unarchived unique URLs        59
Risky-host unarchived unique URLs      87
```

## Expected evidence publication

The public evidence dataset must include ordered IDs through `bir_src_000279` and publish the reviewed fields for `bir_src_000272` through `bir_src_000279`.

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
- reject the earlier 271-evidence deployment.

## Result

Pending the existing production-verification workflow and explicit final-head normal CI.
