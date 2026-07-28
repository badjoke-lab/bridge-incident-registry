# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    221
```

## Latest completed merge checkpoints

```text
PR #77  e322223a7423d1e18cd2343017c26eb2699d2b51  Final restart production audit
PR #78  fa05b271a980fad3509e527cecbf298d43557783  Source-count contract
PR #79  3c4bae8905ff052e987f84bc798545b467de807d  Safe source-count normalization
PR #80  46c7aecfb394b4703ec0bd6473871f7bdacd5170  Source-count production audit
PR #81  2881f6fec0aa6e504701636e4977c85353808196  Source-count review Batch 1
PR #82  626ac6b91c5ce9165938034055ccb7edc14071a7  Source-count Batch 1 canonical migration
```

## Latest production checkpoint

```text
Production verify    30370374622
Normal CI            30370374443
Verified state       33 / 34 / 183 / 221
HTML routes          72
```

Audit: `docs/audits/production-verification-phase3-source-count-batch1-2026-07-28.md`.

## Completed Batch 1

- ten reviewed event-scoped evidence additions;
- seven affected incident derived-count synchronizations;
- no event text, date, status, or stored event source-count changes;
- evidence total 211 -> 221;
- source-count mismatches 47 -> 37;
- incident mismatches remain zero;
- temporary implementation files removed;
- public JSON and all 72 canonical HTML routes verified.

Current audit state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
Incident source-count warnings   0
Event source-count warnings     37
```

The first production attempt exhausted the unchanged convergence window. The retry passed after Cloudflare publication converged; no verification condition was relaxed.

## Next

1. review source-count Batch 2;
2. implement only reviewed event evidence links;
3. continue until all 37 event mismatches are resolved;
4. enable hard source-count equality only at zero mismatches;
5. continue primary-source and archive strengthening.
