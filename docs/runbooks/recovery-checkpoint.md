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
```

## Latest completed production checkpoint

```text
Canonical data PR        #127
Canonical merge          5d3d472a6851843d31c896f27aaff74ddc6b44f0
Production audit PR      #128
Production verify        30689740068
Production verify job    91342221102
Canonical normal CI      30689665597
Verification PR CI       30689740071
Verified state           33 / 34 / 183 / 284
Archived evidence        27 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-01T07:30:44.916Z
Publication attempt      20
```

The verifier rejected the prior same-count Batch 2 evidence content at `bir_src_000038` on attempts 1 through 19. Production converged without a deployment retrigger at the final permitted attempt.

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
Evidence with archived_url           27
Terminal unarchived unique URLs      40
Risky-host unarchived unique URLs    69
Unknown URL status                    0
```

## Archive capture Batch 3

```text
Review boundary                    PR #126
Canonical migration                PR #127
Production audit                   PR #128
Verified Wayback URLs                    6
Evidence records updated                 6
Terminal unique queue             46 -> 40
Risky-host unique queue           75 -> 69
Terminal record queue             58 -> 52
Risky-host record queue          115 -> 109
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000038
bir_src_000085
bir_src_000089
bir_src_000141
bir_src_000142
bir_src_000143
```

Only exact reviewed snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged. `bir_src_000037` remains unarchived because no verified snapshot is available.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 69 risky-host and 40 terminal unique URLs;
2. reduce remaining event primary gaps where justified;
3. strengthen validators;
4. continue monitoring, candidate collection, and v1 hardening.
