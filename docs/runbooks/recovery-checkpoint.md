# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-03

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
PR #135–138  Archive capture Batch 6 review, canonical, deployment retrigger, and production verification
PR #139–141  Archive capture Batch 7 review, canonical, and production verification
PR #142–144  Archive capture Batch 8 review, canonical, and production verification
PR #145–147  Archive capture Batch 9 review, canonical, and production verification
PR #148–151  Archive capture Batch 10 review, canonical, deployment retrigger, and production verification
PR #152–156  Archive capture Batch 11 review, canonical, deployment refresh, and production verification
PR #157–160  Archive capture Batch 12 review, canonical, deployment refresh, and production verification
```

## Latest completed production checkpoint

```text
Canonical data PR             #158
Canonical merge               7d5d6edfc2c7ed355fcfd78a51076e0bd4cc7029
Build-input refresh PR        #160
Build-input refresh           15023871b100b6b15b277163d09db8769a3bdb1b
Production audit PR           #159
Production verify             30791989085
Initial failed job            91617276143
Immediate refresh failed job  91618712843
Production verify job         91620118112
Canonical final CI            30791883397
Initial verification CI       30791989124
Build-input refresh CI        30792375569
Verified state                33 / 34 / 183 / 284
Archived evidence             91 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-03T07:18:33.180Z
Publication attempt           18 on delayed rerun after build-input refresh
```

The initial verifier and the immediate post-refresh rerun rejected `bir_src_000076` for twenty attempts each while `generated_at` stayed `2026-08-03T06:55:57.708Z`. No second refresh was committed. The delayed rerun switched to `generated_at 2026-08-03T07:18:33.180Z` on attempt 18 and passed complete public-content equality.

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
Evidence with archived_url           91
Terminal unarchived unique URLs      36
Terminal unarchived records          49
Risky-host unarchived unique URLs    29
Risky-host unarchived records        45
X/Twitter records unarchived         32
Unknown URL status                    0
```

## Archive capture Batch 12

```text
Review boundary                    PR #157
Canonical migration                PR #158
Production audit                   PR #159
Build-input refresh                PR #160
Verified Wayback URLs                    4
Evidence records updated                 6
Terminal unique queue           36 -> 36
Terminal record queue           49 -> 49
Risky-host unique queue         33 -> 29
Risky-host record queue         51 -> 45
X/Twitter record queue          38 -> 32
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000076
bir_src_000271
bir_src_000274
bir_src_000080
bir_src_000165
bir_src_000272
```

Only exact reviewed Celer, SOCKET, and Rubic snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged. A Holograph snapshot passed the replay-size boundary but was rejected because its 2022 capture predates the 2026 canonical current-state claim.

The permanent validator proved that the approved records belong to active bridges and therefore reduce only the risky-host queue. It also established that the authoritative terminal record queue was 49 before and after Batch 12; the previous runbook value of 47 was a documentation error.

## Deployment resume rule

A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used when publication remains stale. When an immediate rerun still shows the same `generated_at`, do not stack another refresh automatically. Allow deployment latency and rerun the unchanged failed job. Full-content equality remains the only completion condition.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 29 risky-host and 36 terminal unique URLs;
2. retry deferred official sources under the same replay and temporal-fit standards;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
