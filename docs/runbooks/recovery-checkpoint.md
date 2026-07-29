# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    241
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
```

## Latest production checkpoint

```text
Production verify    30424531817
Canonical normal CI  30424388432
Verified state       33 / 34 / 183 / 241
HTML routes          72
Redirects            74
Generated at         2026-07-29T05:19:45.302Z
```

Audit: `docs/audits/production-verification-phase3-source-count-batch3-2026-07-29.md`.

## Completed Batch 3

- ten reviewed event-scoped evidence additions;
- four affected incident derived-count synchronizations totaling eight added links;
- `bir_ev_000079.source_count` corrected from 2 to 1;
- `bir_ev_000096.source_count` corrected from 2 to 1;
- no event text, date, status, amount, or historical claim changes;
- evidence total 231 -> 241;
- source-count mismatches 27 -> 17;
- incident mismatches remain zero;
- temporary generator, package hook, and workflow-permission changes removed;
- public JSON and all 72 canonical HTML routes verified.

Current audit state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
Incident source-count warnings   0
Event source-count warnings     17
```

The first verification attempt correctly failed because production had not deployed Batch 3. A docs-only main push retriggered Cloudflare Pages, and the unchanged verifier then passed on convergence attempt 1.

## Next

1. review source-count Batch 4;
2. implement only reviewed event evidence links or supported count corrections;
3. continue until all 17 remaining event mismatches are resolved;
4. enable hard source-count equality only at zero mismatches;
5. continue primary-source and archive strengthening.
