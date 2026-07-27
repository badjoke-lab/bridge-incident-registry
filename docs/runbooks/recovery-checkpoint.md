# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Remediation progress

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete when this file reaches main
PR 7  Production verification                next
```

Completed merge checkpoints:

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
PR #52  6f3b8aad06edc7027fb362120aabe19fa46d52ee
PR #53  5558a50e0a0f34ceca7c4b34816db29b0e7ae17b
PR #54  40632e3e5cf600490097d58a15210dabce704ede
```

## PR 6 result

The build is followed by a `dist` consistency gate that compares canonical JSON with published JSON, required HTML routes, canonical metadata, JSON-LD, sitemap, robots, headers, redirects, documentation counts, and publication boundaries.

Controlled failure fixtures prove that count, ID, metadata, route, sitemap, and non-canonical publication mismatches are rejected.

## Next

PR 7 performs production verification for HTML, machine-readable endpoints, metadata, routes, redirects, headers, and cache behavior, then records the final audit.

## Record expansion

Phase 2 Batch 6 implementation remains paused. `phase2-batch6-records` remains parked through PR 7.
