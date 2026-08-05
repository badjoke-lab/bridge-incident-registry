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
PR #181      Archive Capture Batch 15 reproducible review
PR #182      Archive Capture Batch 15 canonical migration
PR #184      Archive Capture Batch 15 build-input refresh
PR #185      Archive Capture Batch 15 production verification, queue remediation, and checkpoint sync
```

## Latest completed production checkpoint

```text
Review PR                     #181
Review merge                  fcf932b51445831e1d67c3c14c3ee342eff854dc
Canonical data PR             #182
Canonical merge               39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh PR        #184
Build-input refresh           7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production audit PR           #185
Initial production run        30983843765
Cloudflare remediation run    30987353553
Cloudflare remediation job    92245106402
Production verify run         30986003440
Production verify job         92245512645
Verified state                33 / 34 / 183 / 284
Archived evidence             110 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-05T08:02:41.108Z
Publication attempt           1 after preview-queue remediation
```

Batch 15 verifiers rejected stale same-count content while `generated_at` remained `2026-08-05T06:55:22.730Z`. No second refresh was committed. Cloudflare queue remediation removed 16 queued previews, preserved all production deployments, set preview deployment to `none`, and the unchanged verifier switched to `2026-08-05T08:02:41.108Z` on attempt 1.

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
Evidence with archived_url          110
Terminal unarchived unique URLs      28
Terminal unarchived records          38
Risky-host unarchived unique URLs    21
Risky-host unarchived records        35
X/Twitter records unarchived         30
Unknown URL status                    0
```

## Archive Capture Batch 15

```text
Review boundary                    PR #181
Canonical migration                PR #182
Build-input refresh                PR #184
Production audit                   PR #185
Reviewed unique URLs                    10
Verified Wayback mappings                7
Evidence records updated                 9
Terminal unique queue           33 -> 28
Terminal record queue           45 -> 38
Risky-host unique queue         24 -> 21
Risky-host record queue         38 -> 35
X/Twitter record queue          30 -> 30
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000014
bir_src_000022
bir_src_000023
bir_src_000091
bir_src_000149
bir_src_000167
bir_src_000205
bir_src_000206
bir_src_000214
```

Only captures reproduced in both completed review runs were accepted. Aurora had no accepted replay; one QuillAudits source remained unavailable and another passed only the second run, so all three candidates remain deferred.

## Cloudflare Pages queue boundary

The project now uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. Batch 15 removed 16 queued previews and preserved all production deployments. Arbitrary temporary branches must not restore preview builds.

## Deployment resume rule

A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used once when publication remains stale. When an immediate or in-window rerun still shows the same `generated_at`, do not stack another refresh automatically. Inspect the Cloudflare production queue, keep preview deployment at `none`, allow deployment latency, and preserve full-content equality requirements.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary, affected route, technical cause, or postmortem suitable for a reviewed `incident_case`.

## Next

1. continue bounded archive work from 21 risky-host and 28 terminal unique URLs;
2. retry deferred official sources under the same replay and temporal-fit standards;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic publication;
6. continue v1 hardening.
