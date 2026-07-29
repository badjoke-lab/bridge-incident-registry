# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    263
```

## Latest completed source-count checkpoints

```text
PR #78  Source-count contract
PR #79  Safe source-count normalization
PR #80  Mechanical normalization production audit
PRs #81–#83  Batch 1 complete
PRs #84–#88  Batch 2 complete
PRs #89–#92  Batch 3 complete
PRs #93–#95  Batch 4 complete
PR #96       Final source-resolution boundary
PR #97       Final canonical migration
PR #99       Final deployment retrigger
```

## Latest production checkpoint

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

Audit: `docs/audits/production-verification-phase3-source-count-final-2026-07-29.md`.

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
```

The checker requires exact incident and event counts. Controlled fixtures confirm that either drift type fails normal CI.

## Next

1. strengthen primary-source coverage;
2. strengthen archive coverage;
3. harden URLs and domain-state handling;
4. strengthen remaining validators;
5. proceed to monitoring and candidate collection;
6. complete v1 hardening.
