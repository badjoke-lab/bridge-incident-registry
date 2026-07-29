# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical review-branch counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    263
```

## Latest completed merge checkpoints

```text
PR #78  fa05b271a980fad3509e527cecbf298d43557783  Source-count contract
PR #79  3c4bae8905ff052e987f84bc798545b467de807d  Safe source-count normalization
PR #80  46c7aecfb394b4703ec0bd6473871f7bdacd5170  Source-count production audit
PR #81  2881f6fec0aa6e504701636e4977c85353808196  Source-count review Batch 1
PR #82  626ac6b91c5ce9165938034055ccb7edc14071a7  Source-count Batch 1 canonical migration
PR #83  4789b6cdf604d200748e5ae25a27cf98d2e34b32  Source-count Batch 1 production audit
PR #84  e73f7d8ac1ec316e1c25151b01c92a4098ed1bd1  Source-count review Batch 2
PR #85  70bd5de1526cca5ce3122a7bdc23ea80d50179e0  Source-count Batch 2 canonical migration
PR #87  99941592b9e526661ad004e6504c26588737d7fc  Batch 2 deployment retrigger
PR #89  ac6de510a4906821ea82aa2ec05460329db2483a  Source-count review Batch 3
PR #90  83d61fc1b4778a7a255db2de152c7b8d168a170f  Source-count Batch 3 canonical migration
PR #92  5d23d7da414e65226f37caafbfce3884fd1aeb8c  Batch 3 deployment retrigger
PR #93  60cf6dfca839b67edef49be06256cf68978da1ef  Source-count review Batch 4
PR #94  fd210052b40ff038156b22d116848751990b5633  Source-count Batch 4 canonical migration
PR #95  da24e5c746f593f19ced616cfa3046e52de7e09d  Source-count Batch 4 production audit
PR #96  44e785c0e286ff16a5bcd1fddc1e9ce2b9fbc37c  Final source-count review
```

PR #97 is the active final canonical migration branch and is not yet a completed merge checkpoint.

## Latest production checkpoint

```text
Production verify    30426111329
Canonical normal CI  30425990662
Verified state       33 / 34 / 183 / 256
HTML routes          72
Redirects            74
Generated at         2026-07-29T05:55:16.440Z
```

Audit: `docs/audits/production-verification-phase3-source-count-batch4-2026-07-29.md`.

## Implemented final review branch

- seven reviewed event-scoped evidence additions;
- two affected incident derived-count synchronizations totaling six added links;
- no event `source_count` corrections;
- evidence total 256 -> 263;
- event source-count mismatches 7 -> 0;
- incident source-count mismatches remain zero;
- permanent exact-equality checker added;
- controlled event and incident drift fixtures added;
- temporary generator, package hook, and workflow-permission changes removed.

Current review-branch audit target:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
Incident source-count mismatches 0
Event source-count mismatches    0
```

Records:

- `docs/audits/phase3-source-count-review-final-2026-07-29.md`
- `docs/audits/phase3-source-count-final-canonical-2026-07-29.md`

## Next

1. complete normal CI for PR #97;
2. merge the final canonical migration;
3. run explicit production verification at 33 / 34 / 183 / 263;
4. confirm public and canonical exact source-count equality;
5. continue primary-source, archive, URL, and validator strengthening;
6. proceed to monitoring and v1 hardening.
