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
PR #77  e322223a7423d1e18cd2343017c26eb2699d2b51  Final restart production audit
PR #78  fa05b271a980fad3509e527cecbf298d43557783  Source-count contract
PR #79  3c4bae8905ff052e987f84bc798545b467de807d  Safe source-count normalization
```

## Latest production checkpoint

```text
Production verify    30367770935
Normal CI            30367770892
Verified state       33 / 34 / 183 / 211
HTML routes          72
```

Audit: `docs/audits/production-verification-phase3-source-count-mechanical-2026-07-28.md`.

## Completed source-count normalization

- seven incident `source_count` values synchronized to direct evidence-record counts;
- six event `source_count` values increased to match already linked evidence;
- incident mismatches reduced from seven to zero;
- total source-count mismatches reduced from sixty to forty-seven;
- no evidence links, historical claims, dates, statuses, or record totals changed;
- temporary generator and write-enabled workflow removed;
- public JSON and all 72 canonical HTML routes verified.

Current audit state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
Incident source-count warnings   0
Event source-count warnings     47
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

1. split the remaining 47 event evidence-link mismatches into bounded review batches;
2. add or relink event-scoped evidence where supported;
3. reduce stale counts only after source review;
4. enable hard source-count equality only after all mismatches are resolved;
5. continue primary-source and archive strengthening.
