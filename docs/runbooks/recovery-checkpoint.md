# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
```

## Latest completed merge checkpoints

```text
PR #71  0d3d61ecce6ce9434505e04588d1bd220b85fc5d  Full-corpus audit
PR #72  2c9bd1faccef0515df8ce3fa9fb251382071ab33  Aftermath source resolution
PR #73  a6794d5460eb263045c23ee1a850674b1a7beb98  Aftermath canonical migration
PR #74  5fad899e6bb119297c2b865ac1de76b58e4565b5  Aftermath production audit
PR #75  e5e29dc17dd46d81ca8b0a328db66754c74bd2ad  Final restart source resolution
PR #76  5cc54661b3a3f349ba5aa898930e35279f70df3b  Final restart canonical migration
```

## Latest production checkpoint

```text
Production verify    30361214486
Normal CI            30361214318
Verified state       33 / 34 / 183 / 211
HTML routes          72
```

Audit: `docs/audits/production-verification-phase3-final-restart-2026-07-28.md`.

## Completed Phase 3 aftermath work

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
```

The canonical timelines now preserve the distinctions among:

- attacker-fund recovery;
- operator or sponsor deficit backfill;
- user or liquidity-provider reimbursement;
- chain resumption;
- bridge or transfer-path reopening;
- current operation versus exact historical restart timing.

## Production verifier behavior

The verifier uses browser-compatible request headers and waits for `version.json` counts to match repository canonical counts before route checks.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

If production does not converge within the bounded window, verification fails before route checks. All route and content assertions remain mandatory after convergence.

## Next

1. define the incident and event `source_count` contract
2. normalize source counts only after the contract is fixed
3. continue primary-source and archive strengthening
4. use bounded PRs with full repository and production verification
