# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-01

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
PR #118–120  Archive capture Batch 1 review, canonical, and production verification
PR #122      Archive capture Batch 2 review
PR #123      Archive capture Batch 2 canonical — pending merge
```

## Latest completed production checkpoint

The completed production checkpoint remains Archive Capture Batch 1 until PR #123 merges and all twenty-one archive fields are explicitly verified.

```text
Canonical data PR        #119
Canonical merge          5a152f647e05018170e57721dfdef69d1cadf12b
Production audit PR      #120
Production verify        30614617534
Canonical normal CI      30614478890
Verified state           33 / 34 / 183 / 284
Archived evidence        10 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-07-31T07:57:38.614Z
Publication attempt      2
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
Evidence with archived_url           21
Terminal unarchived unique URLs      46
Risky-host unarchived unique URLs    75
Unknown URL status                    0
```

## Archive capture Batch 2

```text
Review boundary                    PR #122
Canonical migration                PR #123
Verified Wayback URLs                    8
Evidence records updated                11
Terminal unique queue             54 -> 46
Risky-host unique queue           83 -> 75
Terminal record queue             69 -> 58
Risky-host record queue          126 -> 115
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000126
bir_src_000127
bir_src_000128
bir_src_000129
bir_src_000130
bir_src_000133
bir_src_000134
bir_src_000135
bir_src_000136
bir_src_000138
bir_src_000139
```

Only exact reviewed snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. merge PR #123 after final normal CI;
2. production-verify all twenty-one archive fields;
3. continue bounded archive work from 75 risky-host and 46 terminal unique URLs;
4. reduce remaining event primary gaps where justified;
5. continue validator, monitoring, candidate collection, and v1 hardening.
