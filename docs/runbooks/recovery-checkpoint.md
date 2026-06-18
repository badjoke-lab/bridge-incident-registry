# BIR Live Recovery Checkpoint

Status: active  
Verified: 2026-06-18

This short file is the live restart point for ongoing development. The full execution order remains in `development-roadmap.md`; GitHub and canonical JSON remain the final source of truth.

## Repository state

```text
Repository:                   badjoke-lab/bridge-incident-registry
Default branch:               main
Verified main head:           ac363697a55d7ece4e55d1a4b19258a4f805c05d
Last merged canonical PR:     #48 — Phase 2 Batch 5
Current working branch:       phase2-batch6-scope
Current task:                 Phase 2 Batch 6 scope
Next task after merge:        Phase 2 Batch 6 canonical implementation
```

## Canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Current phase

```text
Phase 2 record expansion
Batch 5 complete
Batch 6 scope in progress
Batch 7 planned
```

## Batch 6 selected candidates

```text
Transit Swap
Rubic
Unizen
Magpie Protocol
```

Provisional implementation shape:

```text
Bridges     +4
Incidents   +5 to +6
Events      +20 to +28
Evidence    +28 to +38
```

## Resume sequence

1. verify `main` head and open pull requests
2. read this file and `development-roadmap.md`
3. read `docs/batches/phase2-batch-06-scope.md`
4. read canonical JSON directly before assigning IDs
5. continue through a branch and pull request
6. update this checkpoint after merge
