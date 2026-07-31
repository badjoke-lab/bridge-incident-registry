# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-31

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

## Latest completed checkpoints

```text
PR #100      Source-quality baseline and no-regression gate
PR #103–107  LI.FI and Holograph source-quality remediation
PR #108–116  Event Tier 1 review, canonical remediation, and production verification
PR #117      Nerve Bridge source boundary
PR #118      Archive-risk inventory and Batch 1 review
PR #119      Archive capture Batch 1 — pending merge
```

## Latest completed production checkpoint

The latest completed production checkpoint remains the pre-archive 284-evidence state until PR #119 merges and all archive fields are explicitly verified.

```text
Canonical data PR        #115
Canonical merge          b07a33b6a61be8338466b5257e121a543884e2f3
Production audit PR      #116
Production verify        30612188969
Canonical normal CI      30544058869
Production-PR normal CI  30612188935
Verified state           33 / 34 / 183 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-07-31T07:14:14.901Z
Publication attempt      1
```

## Permanent guards

```text
npm run audit:source-count
npm run audit:source-count:test
npm run audit:source-quality
npm run audit:source-quality:test
npm run production:content:test
```

```text
Blocking errors                       0
Incident source-count mismatches      0
Event source-count mismatches         0
Incidents without primary             1
Incidents without Tier 1              1
Events without primary               16
Events without Tier 1                 6
Unreviewed event Tier 1 gaps           0
Evidence with archived_url           10
Terminal unarchived unique URLs      54
Risky-host unarchived unique URLs    83
Unknown URL status                    0
```

## Archive capture Batch 1

```text
Review boundary                    PR #118
Canonical migration                PR #119
Verified Wayback URLs                    5
Evidence records updated                10
Terminal unique queue             59 -> 54
Risky-host unique queue           88 -> 83
Terminal record queue             79 -> 69
Risky-host record queue          136 -> 126
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000035
bir_src_000039
bir_src_000086
bir_src_000088
bir_src_000090
bir_src_000230
bir_src_000231
bir_src_000232
bir_src_000233
bir_src_000234
```

`bir_src_000037` remains unarchived because no verified Wayback snapshot was available. No wildcard or guessed archive is permitted.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. merge PR #119 after final normal CI;
2. production-verify all ten archive fields;
3. continue verified capture work from 83 risky-host and 54 terminal unique URLs;
4. continue validator, monitoring, candidate collection, and v1 hardening.
