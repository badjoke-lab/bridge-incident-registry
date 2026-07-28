# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts on final restart review branch

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
```

`main` remains at 33 / 34 / 182 / 210 until the final restart canonical PR merges.

## Latest completed merge checkpoints

```text
PR #69  eb6bc7366ea25be4441c72cdfa50b753477eef34  Batch 7 data
PR #70  08cfd2014661f8b9a795ead8e045329364b7943f  Batch 7 audit
PR #71  0d3d61ecce6ce9434505e04588d1bd220b85fc5d  Full-corpus audit
PR #72  2c9bd1faccef0515df8ce3fa9fb251382071ab33  Aftermath source resolution
PR #73  a6794d5460eb263045c23ee1a850674b1a7beb98  Aftermath canonical migration
PR #74  5fad899e6bb119297c2b865ac1de76b58e4565b5  Aftermath production audit
PR #75  e5e29dc17dd46d81ca8b0a328db66754c74bd2ad  Final restart source resolution
```

## Latest completed production checkpoint

```text
Production verify    30358827192
Normal CI            30358827222
Verified state       33 / 34 / 182 / 210
HTML routes          72
```

Audit: `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`.

## Final restart review-branch changes

- LI.FI 2022 existing event normalized to `bridge_reopened`
- LI.FI 2024 exact restart timing corrected to `unknown`
- ChainSwap July 2 incident linked to the August 20 official relaunch
- one new timeline event
- one new primary evidence record

Expected audit state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
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

1. generate and validate the 33 / 34 / 183 / 211 canonical state
2. remove temporary generator and write-enabled workflow
3. require clean normal CI
4. merge and production-verify all 72 HTML routes
5. define and normalize the `source_count` contract
