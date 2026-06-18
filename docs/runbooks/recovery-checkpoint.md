# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-06-19

This file is the short restart point. GitHub state and canonical JSON remain authoritative. Embedded commit SHAs are historical checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Current workstream

```text
Emergency public-consistency remediation
```

Detailed plan:

```text
docs/runbooks/public-consistency-remediation.md
```

## Progress

```text
PR 1  Current-state reset and plan freeze     complete — PR #50
PR 2  Canonical-derived public output         complete when this file reaches main
PR 3  Machine-readable public layer           next
PR 4  Canonical metadata and discovery        blocked by PR 3
PR 5  Legacy redirects                        blocked by PR 4
PR 6  Post-build consistency CI               blocked by PR 5
PR 7  Production verification                 blocked by PR 6
```

PR 1 merge checkpoint:

```text
PR:           #50
Merge commit: ed7d4871c82dcd6b089bb3ac6da5df538a83116c
```

## PR 2 output contract

PR 2 establishes an internal generated layer at:

```text
.generated/public-data/
```

It derives counts, verification metadata, canonical origin, schema version, and page links from canonical JSON. The directory is ignored by Git and is not publicly deployed. PR 3 connects reviewed generated output to public endpoints.

## Record-expansion state

```text
Phase 2 Batch 5                 complete
Phase 2 Batch 6 scope           complete
Phase 2 Batch 6 implementation  paused
Phase 2 Batch 7                 planned
```

The branch `phase2-batch6-records` is parked. Do not add canonical data to it during remediation.

## Resume sequence

1. read the live main head and open PRs from GitHub
2. read this file
3. read `development-roadmap.md`
4. read `public-consistency-remediation.md`
5. determine the first remediation PR not yet merged
6. continue through a fresh branch and PR
7. keep Batch 6 paused until production verification closes PR 7

## Source-of-truth rule

Current public state must derive from:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
```

Do not infer the current state from an old commit SHA, an archived checkpoint, a preview deployment, or manually copied counts.
