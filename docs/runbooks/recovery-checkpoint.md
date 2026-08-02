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
PR #132–134  Archive capture Batch 5 review, canonical, and production verification
```

## Latest completed production checkpoint

```text
Canonical data PR        #133
Canonical merge          27afd411b0eae500b30f8f5a1f49121476e46ebd
Production audit PR      #134
Production verify        30691464065
Production verify job    91346826104
Canonical normal CI      30691392132
Verification PR CI       30691464063
Verified state           33 / 34 / 183 / 284
Archived evidence        53 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-01T08:19:37.599Z
Publication attempt      12
```

The verifier rejected the prior same-count Batch 4 evidence content at `bir_src_000030` on attempts 1 through 11. Production converged without a deployment retrigger on attempt 12.

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
Evidence with archived_url           53
Terminal unarchived unique URLs      39
Risky-host unarchived unique URLs    59
Unknown URL status                    0
```

## Archive capture Batch 5

```text
Review boundary                    PR #132
Canonical migration                PR #133
Production audit                   PR #134
Verified Wayback URLs                    6
Evidence records updated                13
Terminal unique queue                  39
Risky-host unique queue           65 -> 59
Terminal record queue                  51
Risky-host record queue           96 -> 83
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000030
bir_src_000031
bir_src_000040
bir_src_000042
bir_src_000048
bir_src_000065
bir_src_000104
bir_src_000217
bir_src_000220
bir_src_000221
bir_src_000236
bir_src_000269
bir_src_000276
```

Only exact reviewed snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged. Magpie, two ChainSwap sources, and Rubic remained unarchived because they did not pass exact replay.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 59 risky-host and 39 terminal unique URLs;
2. retry deferred official sources under the same replay standard;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
