# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts on Batch 1 review branch

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
```

## Latest completed production checkpoint

```text
Production verify    30367770935
Normal CI            30367770892
Verified state       33 / 34 / 183 / 211
HTML routes          72
```

## Active branch

```text
agent/phase3-source-count-batch1-canonical
```

Implemented scope:

- ten reviewed event-scoped evidence additions;
- no event, incident, bridge, date, status, or stored source-count changes;
- evidence total 211 -> 221;
- source-count mismatches 47 -> 37 expected;
- incident mismatches remain zero.

Expected audit state:

```text
Blocking errors                  0
Reimbursement warnings           0
Reopening warnings               0
Incident source-count warnings   0
Event source-count warnings     37
```

## Production verifier behavior

The verifier waits for repository canonical counts to appear in production before checking all public JSON, metadata, routes, sitemap, redirects, content types, and observable cache headers.

```text
Attempts       20
Delay          15 seconds
Maximum wait   5 minutes
```

## Next

1. run the bounded generator;
2. pass the complete repository suite;
3. remove temporary implementation files;
4. merge the cleaned canonical PR;
5. production-verify 33 / 34 / 183 / 221 and all 72 routes;
6. begin source-count review Batch 2.
