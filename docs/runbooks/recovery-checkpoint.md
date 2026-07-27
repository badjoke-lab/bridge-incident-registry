# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts on Batch 7 review branch

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

`main` remains at 30 / 32 / 150 / 181 until PR #69 merges.

## Completed merge checkpoints

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
PR #66  1d2ccf24edab7b764160da130fc2e36146e6f1b1
PR #67  75ceaee267b537d4e8dadb21f64179d72f637c02
PR #68  a74fadd47878015f940831a1339880ae81d937ca
```

## Last completed publication checkpoint

Batch 6B production verification passed:

```text
Run          30307942555
State        30 / 32 / 150 / 181
HTML routes  67
```

Audit: `docs/audits/production-verification-batch6b-2026-07-28.md`.

## Batch 7 review state

Branch:

```text
agent/phase2-batch7-records
```

Pull request:

```text
#69  data: add Phase 2 Batch 7 records
```

Implemented:

- Taiko Bridge entity and June 2026 incident
- Everclear / Connext lifecycle entity
- Commons Bridge entity and April 2026 incident
- 23 timeline events
- 18 evidence records
- SYND, CLEAR, and NEXT asset references
- Taiko, Base, and Commons Chain references

The bounded generator passed all repository checks before committing canonical data. Temporary generators, diagnostic output, and the write-enabled workflow were removed.

## Next

1. require the final normal Check workflow on the cleaned PR
2. review the complete canonical diff
3. merge PR #69 only after every required check passes
4. run production verification against 33 / 34 / 173 / 199
5. verify all 72 canonical HTML routes
6. publish a Batch 7 production audit
7. begin full-corpus quality work only after publication is confirmed
