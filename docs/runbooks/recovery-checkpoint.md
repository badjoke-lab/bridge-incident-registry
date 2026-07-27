# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts on Batch 6B review branch

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
```

`main` remains at 28 / 29 / 134 / 160 until PR #66 merges.

## Public-consistency remediation

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete — PR #59
```

Completed merge checkpoints:

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
PR #52  6f3b8aad06edc7027fb362120aabe19fa46d52ee
PR #53  5558a50e0a0f34ceca7c4b34816db29b0e7ae17b
PR #54  40632e3e5cf600490097d58a15210dabce704ede
PR #58  57e4fc948fc9a26f20833b657c8d31822c72f56a
PR #59  e511911d97216366386ff808d9dfb80bdfd19334
PR #61  bcf59e4c811f2d68a3cfeb89cceaa76c24fba9f0
PR #62  90304ecbb9dfef4670d91093873a05aa87e770d2
PR #63  c074d411b9c1d99b0f5cd56c5ade3125952de13c
PR #64  8d5bb2b994cfd501e49827a2896291507a499620
PR #65  d634db5436bc0590b35e19e88435eb4b9214e7b0
```

## Last completed publication checkpoint

Batch 6A Production Verification run `30306303489` passed against `https://bridge-incident-registry.pages.dev`.

Verified state:

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
HTML routes 62
```

Audit: `docs/audits/production-verification-batch6a-2026-07-28.md`.

## Batch 6B review state

Branch:

```text
agent/phase2-batch6b-records
```

Pull request:

```text
#66  data: add Phase 2 Batch 6B records
```

Implemented:

- Rubic entity
- Rubic RBC/BRBC bridge wallet incident
- Rubic RubicProxy approval incident
- Unizen entity
- Unizen March 2024 approval incident
- 16 timeline events
- 21 evidence records
- RBC and BRBC reference definitions

The bounded generator passed all repository checks before committing canonical data. The temporary generator, write-enabled workflow, and trigger file have been removed.

## Next

1. require the final normal Check workflow on the cleaned PR
2. review the complete canonical diff
3. merge PR #66 only after every required check passes
4. run production verification against 30 / 32 / 150 / 181
5. verify all 67 canonical HTML routes
6. publish a Batch 6B production audit
7. begin Batch 7 only after publication is confirmed
