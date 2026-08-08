# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-09

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
PR #173–176  Archive Capture Batch 13 review through production verification
PR #177–180  Archive Capture Batch 14 review through production verification
PR #181–185  Archive Capture Batch 15 review through production verification and queue remediation
PR #186      Incident discovery, filters, pagination, detail TOCs, Support, and project navigation
PR #187      Shared BadJoke-Lab support-wallet presentation
PR #188      Archive Capture Batch 16 reproducible review
PR #189      Archive Capture Batch 16 canonical migration
PR #190      Archive Capture Batch 16 production verification and checkpoint sync
```

## Latest completed production checkpoint

```text
Review PR                     #188
Review merge                  76b437e39b60721cab816544a10d2b75c12d1543
Canonical data PR             #189
Canonical merge               f9c6395d400358543bb3a761aa209be97ca1c266
Production audit PR           #190
Production verify run         31264440303
Production verify job         93120202656
Verified state                33 / 34 / 183 / 284
Archived evidence             116 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-08T15:23:20.361Z
Publication attempt           1
Build-input refresh           not required
```

The Batch 16 publication was already current when the unchanged verifier began. Attempt 1 matched all four canonical-derived public datasets and every route/metadata/redirect contract. No build-input refresh or additional Cloudflare queue remediation was required.

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
Evidence with archived_url          116
Terminal unarchived unique URLs      25
Terminal unarchived records          35
Risky-host unarchived unique URLs    18
Risky-host unarchived records        32
X/Twitter records unarchived         29
Unknown URL status                    0
```

## Archive Capture Batch 16

```text
Review boundary                    PR #188
Canonical migration                PR #189
Production audit                   PR #190
Reviewed unique URLs                    10
Verified Wayback mappings                6
Evidence records updated                 6
Terminal unique queue           28 -> 25
Terminal record queue           38 -> 35
Risky-host unique queue         21 -> 18
Risky-host record queue         35 -> 32
X/Twitter record queue          30 -> 29
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000069
bir_src_000027
bir_src_000026
bir_src_000168
bir_src_000173
bir_src_000176
```

Only captures reproduced in both completed review runs were accepted. Reuters Harmony, ShuttleFlow Conflux forum material, SOCKET X, and Unizen CTO Twitter candidates remain deferred because they did not satisfy the unchanged reproducible exact-replay boundary.

## Cloudflare Pages queue boundary

The project uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. Batch 15 removed 16 queued previews and preserved all production deployments. Arbitrary temporary branches must not restore preview builds. Batch 16 converged normally without a refresh.

## Deployment resume rule

A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used once when publication remains stale. When an immediate or in-window rerun still shows the same `generated_at`, do not stack another refresh automatically. Inspect the Cloudflare production queue, keep preview deployment at `none`, allow deployment latency, and preserve full-content equality requirements.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary, affected route, technical cause, or postmortem suitable for a reviewed `incident_case`.

## Next

1. continue bounded archive work from 18 risky-host and 25 terminal unique URLs as Batch 17;
2. retry deferred official sources under the same replay and temporal-fit standards;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic publication;
6. continue v1 hardening.
