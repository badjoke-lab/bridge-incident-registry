# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    231
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
```

## Latest production checkpoint

```text
Production verify    30374628843
Normal CI            30374629112
Verified state       33 / 34 / 183 / 231
HTML routes          72
```

Audit: `docs/audits/production-verification-phase3-source-count-batch2-2026-07-28.md`.

## Completed Batch 2

- ten reviewed event-scoped evidence additions;
- six affected incident derived-count synchronizations;
- `bir_ev_000044.source_count` corrected from 3 to 2;
- `bir_ev_000054.source_count` corrected from 2 to 1;
- no event text, date, status, or historical claim changes;
- evidence total 221 -> 231;
- source-count mismatches 37 -> 27;
- incident mismatches remain zero;
- temporary implementation and diagnostic files removed;
- public JSON and all 72 canonical HTML routes verified.

Current audit state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
Incident source-count warnings   0
Event source-count warnings     27
```

Two initial verification attempts correctly failed because production had not deployed Batch 2. A diagnostic confirmed the stale live state. A docs-only main push retriggered Cloudflare Pages, and the unchanged verifier then passed.

## Next

1. review source-count Batch 3;
2. implement only reviewed event evidence links or supported count corrections;
3. continue until all 27 event mismatches are resolved;
4. enable hard source-count equality only at zero mismatches;
5. continue primary-source and archive strengthening.
