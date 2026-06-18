# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-06-19

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
PR 5  Legacy redirects                       complete when this file reaches main
PR 6  Post-build consistency CI              next
PR 7  Production verification                blocked by PR 6
```

Completed merge checkpoints:

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
PR #52  6f3b8aad06edc7027fb362120aabe19fa46d52ee
PR #53  5558a50e0a0f34ceca7c4b34816db29b0e7ae17b
```

## PR 5 result

The build generates `public/_redirects` from canonical `previous_slugs` and `redirect_from` fields.

Both trailing-slash and non-trailing-slash legacy routes permanently redirect to current canonical bridge or incident pages.

Generation and checks reject invalid slugs, canonical-route collisions, conflicting sources, self-redirects, missing targets, loops, output drift, and legacy sitemap entries.

## Next

PR 6 adds full post-build consistency checks across canonical JSON, public JSON, version, manifest, built HTML, JSON-LD, sitemap, robots, redirects, documentation counts, and the `dist` tree.

## Record expansion

Phase 2 Batch 6 implementation remains paused. `phase2-batch6-records` remains parked through PR 7.
