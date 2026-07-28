# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      182
Evidence    210
```

## Latest completed merge checkpoints

```text
PR #69  eb6bc7366ea25be4441c72cdfa50b753477eef34  Batch 7 data
PR #70  08cfd2014661f8b9a795ead8e045329364b7943f  Batch 7 audit
PR #71  0d3d61ecce6ce9434505e04588d1bd220b85fc5d  Full-corpus audit
PR #72  2c9bd1faccef0515df8ce3fa9fb251382071ab33  Aftermath source resolution
PR #73  a6794d5460eb263045c23ee1a850674b1a7beb98  Aftermath canonical migration
```

## Latest production checkpoint

```text
Production verify    30358827192
Normal CI            30358827222
Verified state       33 / 34 / 182 / 210
HTML routes          72
```

Audit: `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`.

## Completed Phase 3 aftermath pass

- seven legacy reopening values normalized to `bridge_reopened`
- Ronin reimbursement completion and reopening
- Wormhole deficit-backfill reimbursement and reopening
- Poly Network staged and completed reopening
- BSC Token Hub bridge-specific reopening
- THORChain first-incident reopening and both incident reimbursement completions
- Allbridge qualified reimbursement completion
- eleven new primary evidence records
- reimbursement semantics in SPEC and public methodology

Current audit state:

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

1. resolve the three remaining restart warnings through direct source review or status correction
2. define the meaning of incident and event `source_count`
3. normalize source counts only after the contract is fixed
4. continue primary-source and archive strengthening
5. use bounded PRs with full repository and production verification
