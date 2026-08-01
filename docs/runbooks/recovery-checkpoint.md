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
```

## Latest completed production checkpoint

```text
Canonical data PR        #123
Canonical merge          a0763951c612fae6149093ae7124de622a54e342
Deployment retrigger     9718b8d8383f158ab8ef391ea491df9e2da0f397
Production audit PR      #124
Production verify        30688749856
Successful rerun job     91340437658
Canonical normal CI      30688662830
Verification PR CI       30688749844
Retrigger normal CI      30689003552
Verified state           33 / 34 / 183 / 284
Archived evidence        21 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-01T07:03:30.526Z
Publication attempt      1
```

The first verification attempt correctly rejected the pre-Batch-2 evidence content at `bir_src_000126` for twenty attempts. PR #125 retriggered Cloudflare with a docs-only main push; the unchanged rerun passed immediately.

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
Production audit                   PR #124
Deployment retrigger               PR #125
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

1. continue bounded archive work from 75 risky-host and 46 terminal unique URLs;
2. reduce remaining event primary gaps where justified;
3. strengthen validators;
4. continue monitoring, candidate collection, and v1 hardening.
