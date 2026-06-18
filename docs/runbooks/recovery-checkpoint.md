# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-06-19

GitHub state and canonical JSON are authoritative. Embedded commit SHAs below are completed merge checkpoints, not live branch pointers.

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
PR 3  Machine-readable public layer          complete when this file reaches main
PR 4  Canonical metadata and discovery       next
PR 5  Legacy redirects                       blocked by PR 4
PR 6  Post-build consistency CI              blocked by PR 5
PR 7  Production verification                blocked by PR 6
```

Completed merge checkpoints:

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
```

## PR 3 result

Each build generates and validates:

```text
/version.json
/data/manifest.json
/data/bridges.json
/data/incidents.json
/data/events.json
/data/evidence.json
/data/reference/chains.json
/data/reference/assets.json
/llms.txt
/ai.txt
```

Generated public files are derived from canonical JSON and are not committed as source data.

PR 4 remains responsible for HTML canonical links, alternate discovery, Open Graph metadata, JSON-LD, sitemap, robots, and preview indexing policy.

## Record expansion

```text
Phase 2 Batch 5                 complete
Phase 2 Batch 6 scope           complete
Phase 2 Batch 6 implementation  paused
Phase 2 Batch 7                 planned
```

`phase2-batch6-records` remains parked.

## Resume sequence

1. read live main and open PRs from GitHub
2. read this file and the remediation plan
3. continue with the first incomplete remediation PR
4. keep Batch 6 paused through PR 7
