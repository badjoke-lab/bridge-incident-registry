# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts on Phase 3 review branch

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
```

`main` remains at 33 / 34 / 173 / 199 until the Phase 3 aftermath canonical PR merges.

## Latest completed merge checkpoints

```text
PR #69  eb6bc7366ea25be4441c72cdfa50b753477eef34  Batch 7 data
PR #70  08cfd2014661f8b9a795ead8e045329364b7943f  Batch 7 audit
PR #71  0d3d61ecce6ce9434505e04588d1bd220b85fc5d  Full-corpus audit
PR #72  2c9bd1faccef0515df8ce3fa9fb251382071ab33  Aftermath source resolution
```

## Last completed production checkpoint

```text
Production verify    30309573252
Verified state       33 / 34 / 173 / 199
HTML routes          72
```

Audit: `docs/audits/production-verification-batch7-2026-07-28.md`.

## Active branch

```text
agent/phase3-aftermath-canonical
```

Draft pull request:

```text
#73  data: normalize Phase 3 aftermath records
```

Implemented on the review branch:

- seven legacy reopening values normalized to `bridge_reopened`
- Ronin reimbursement completion and reopening
- Wormhole deficit-backfill reimbursement and reopening
- Poly Network staged and completed reopening
- BSC Token Hub bridge-specific reopening
- THORChain first-incident reopening and both incident reimbursement completions
- Allbridge qualified reimbursement completion
- eleven new primary evidence records
- reimbursement semantics in SPEC and public methodology

Expected audit state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               3
```

Remaining restart review:

```text
bir_inc_000015  LI.FI 2022
bir_inc_000016  LI.FI 2024
bir_inc_000017  ChainSwap July 2, 2021
```

## Production verifier behavior

The verifier uses browser-compatible request headers and waits for `version.json` counts to match repository canonical counts before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

If production does not converge within the bounded window, verification fails before route checks. All route and content assertions remain mandatory after convergence.

## Next

1. rerun the bounded generator after count synchronization
2. remove temporary generator, workflow, and diagnostic output
3. require final normal CI on the cleaned PR
4. merge only after all required checks pass
5. production-verify 33 / 34 / 182 / 210 and all 72 HTML routes
6. continue with the three remaining restart reviews
