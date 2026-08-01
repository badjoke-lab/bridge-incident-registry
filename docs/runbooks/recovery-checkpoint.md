# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-01

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical and production counts

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
PR #122–125  Archive capture Batch 2 review, canonical, deployment retrigger, and production verification
PR #126–128  Archive capture Batch 3 review, canonical, and production verification
PR #129–131  Archive capture Batch 4 review, canonical, and production verification
```

## Latest completed production checkpoint

```text
Canonical data PR        #130
Canonical merge          b72d0e68735e6a49718eb938630e65af89b2f12f
Production audit PR      #131
Production verify        30690563060
Production verify job    91344413654
Canonical normal CI      30690487993
Verification PR CI       30690563043
Verified state           33 / 34 / 183 / 284
Archived evidence        40 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-01T07:42:49.272Z
Publication attempt      15
```

The verifier rejected the prior same-count Batch 3 evidence content at `bir_src_000053` on attempts 1 through 14. Production converged without a deployment retrigger on attempt 15.

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
Evidence with archived_url           40
Terminal unarchived unique URLs      39
Risky-host unarchived unique URLs    65
Unknown URL status                    0
```

## Archive capture Batch 4

```text
Review boundary                    PR #129
Canonical migration                PR #130
Production audit                   PR #131
Verified Wayback URLs                    4
Evidence records updated                13
Terminal unique queue             40 -> 39
Risky-host unique queue           69 -> 65
Terminal record queue             52 -> 51
Risky-host record queue          109 -> 96
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000053
bir_src_000156
bir_src_000190
bir_src_000207
bir_src_000208
bir_src_000209
bir_src_000210
bir_src_000218
bir_src_000222
bir_src_000224
bir_src_000251
bir_src_000252
bir_src_000254
```

Only exact reviewed snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged. Six transiently failed candidates remain unarchived and received no guessed snapshot.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 65 risky-host and 39 terminal unique URLs;
2. retry deferred official sources under the same replay standard;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
