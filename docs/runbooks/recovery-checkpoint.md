# BIR Live Recovery Checkpoint

Status: active  
Reset: 2026-06-19

This file is the short restart point. GitHub state and canonical JSON remain authoritative. Any embedded commit SHA is a historical baseline, not a live pointer.

## Historical baseline before remediation

```text
Repository:                   badjoke-lab/bridge-incident-registry
Default branch:               main
Baseline commit:              001da4b36570ac861d5c2d1c821b3cc27d2c521f
Last merged canonical PR:     #48 — Phase 2 Batch 5
Last merged scope PR:         #49 — Phase 2 Batch 6 scope
Open PRs at baseline:         0
```

## Canonical counts at remediation start

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

Current sequence:

```text
PR 1  Current-state reset and plan freeze     complete when this file reaches main
PR 2  Canonical-derived public output         next
PR 3  Machine-readable public layer           blocked by PR 2
PR 4  Canonical metadata and discovery        blocked by PR 3
PR 5  Legacy redirects                        blocked by PR 4
PR 6  Post-build consistency CI               blocked by PR 5
PR 7  Production verification                 blocked by PR 6
```

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

Current public state must always derive from:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
```

Do not infer the current state from an old commit SHA, an archived roadmap checkpoint, a preview deployment, or manually copied counts.
