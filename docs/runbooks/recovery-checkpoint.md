# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
```

## Latest completed source-count checkpoints

```text
PR #78       Source-count contract
PRs #79–#80 Safe normalization
PRs #81–#83 Source-count Batch 1
PRs #84–#88 Source-count Batch 2
PRs #89–#92 Source-count Batch 3
PRs #93–#95 Source-count Batch 4
PR #96       Final source-resolution boundary
PR #97       Final canonical migration
PR #99       Final deployment retrigger
PR #100      Source-quality baseline and no-regression gate
PR #101      LI.FI source-quality remediation in progress
```

## Latest completed production checkpoint

```text
Canonical merge      e03386ab6d1242e2918700839b8449faff5c40c6
Deployment retrigger be5c6242647feb36c14d35f65e945f4e437ada70
Production verify    30427603790
Canonical normal CI  30427464812
Verified state       33 / 34 / 183 / 263
HTML routes          72
Redirects            74
Generated at         2026-07-29T06:23:49.183Z
```

Production is still the verified 263-evidence checkpoint. The current canonical branch has 265 evidence and requires merge plus explicit production verification.

## Exact-equality state

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
Incident source-count mismatches 0
Event source-count mismatches    0
```

Permanent guards:

```text
npm run audit:source-count
npm run audit:source-count:test
npm run audit:source-quality
npm run audit:source-quality:test
```

## Source-quality Batch 1

```text
Incident corrected       bir_inc_000015
Events corrected         bir_ev_000043, bir_ev_000044
Evidence added           bir_src_000264, bir_src_000265
Reimbursement            completed
Unresolved               false
Primary incident gaps    2 -> 1
Primary event gaps       36 -> 34
```

The first-party LI.FI postmortem reports all 29 affected wallets reimbursed for USD 570,000 total. Attacker-fund recovery remains `none` and is not conflated with reimbursement.

Audit: `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md`.

## Next

1. complete normal CI and merge PR #101;
2. production-verify the 265-evidence state;
3. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
4. reduce event-level source gaps;
5. begin archive-risk remediation;
6. resolve unknown URL states and continue v1 hardening.
