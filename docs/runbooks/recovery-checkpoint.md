# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-05

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
PR #118–160  Archive Capture Batches 1–12 review, canonical, deployment, and production verification
PR #173      Archive Capture Batch 13 review
PR #174      Archive Capture Batch 13 canonical migration
PR #175      Archive Capture Batch 13 build-input refresh
PR #176      Archive Capture Batch 13 production verification and checkpoint sync
PR #177      Archive Capture Batch 14 reproducible review
PR #178      Archive Capture Batch 14 canonical migration
PR #179      Archive Capture Batch 14 build-input refresh
PR #180      Archive Capture Batch 14 production verification and checkpoint sync
```

## Latest completed production checkpoint

```text
Review PR                     #177
Review merge                  09c11e838a3b157a9efb7388f531ff04f723e4ff
Canonical data PR             #178
Canonical merge               ca225d1df10b4a81d72a0fe60fd2713b6e8b543a
Build-input refresh PR        #179
Build-input refresh           3f0514b568e84b17daf9e0a2d14649b3a329c787
Production audit PR           #180
Initial production run        30976024931
Immediate post-refresh run    30976430766
First delayed run             30976783627
Production verify run         30977144358
Production verify job         92213419237
Verified state                33 / 34 / 183 / 284
Archived evidence             101 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-05T05:06:09.501Z
Publication attempt           1 on second delayed rerun after one refresh
```

The initial, immediate post-refresh, and first delayed verifiers each rejected stale same-count content for twenty attempts while `generated_at` remained `2026-08-05T04:41:17.057Z`. No second refresh was committed. The next delayed run switched to `2026-08-05T05:06:09.501Z` on attempt 1 and passed complete public-content equality.

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
Evidence with archived_url          101
Terminal unarchived unique URLs      33
Terminal unarchived records          45
Risky-host unarchived unique URLs    24
Risky-host unarchived records        38
X/Twitter records unarchived         30
Unknown URL status                    0
```

## Archive Capture Batch 14

```text
Review boundary                    PR #177
Canonical migration                PR #178
Build-input refresh                PR #179
Production audit                   PR #180
Reviewed unique URLs                    10
Verified Wayback URLs                    5
Evidence records updated                 7
Terminal unique queue           36 -> 33
Terminal record queue           49 -> 45
Risky-host unique queue         27 -> 24
Risky-host record queue         42 -> 38
X/Twitter record queue          30 -> 30
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000036
bir_src_000013
bir_src_000021
bir_src_000215
bir_src_000057
bir_src_000226
bir_src_000059
```

Only captures reproduced in both completed review runs were accepted. The first-run-only Harmony forum replay was rejected. pNetwork, Wormhole, and Rainbow Bridge candidates remain deferred.

## Deployment resume rule

A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used once when publication remains stale. When an immediate or in-window rerun still shows the same `generated_at`, do not stack another refresh automatically. Allow deployment latency and keep the full-content equality requirement unchanged.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary, affected route, technical cause, or postmortem suitable for a reviewed `incident_case`.

## Next

1. continue bounded archive work from 24 risky-host and 33 terminal unique URLs;
2. retry deferred official sources under the same replay and temporal-fit standards;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic publication;
6. continue v1 hardening.
