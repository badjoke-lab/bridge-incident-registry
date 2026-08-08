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
PR #188–190  Archive Capture Batch 16 review through production verification and checkpoint sync
PR #191–193  Archive Capture Batch 17 review through production verification and checkpoint sync
PR #194      Archive Capture Batch 18 final previously-unreviewed review
PR #195      Archive Capture Batch 18 canonical migration
PR #197      Archive Capture Batch 18 single behavior-neutral build-input refresh
PR #198      Archive Capture Batch 18 post-refresh production verification and checkpoint sync
```

## Latest completed production checkpoint

```text
Review PR                     #194
Review merge                  1717b5dbea5fd38756e60120be2d131dcb4fe43a
Canonical data PR             #195
Canonical merge               50ca3782c4940e095ff94de2cce220a3ee0c7da5
Build-input refresh PR        #197
Build-input refresh           59b74d26a86373e6e97e6e630b54becd35f64910
Production audit PR           #198
Initial production run        31266002708
Initial production job        93124105488
Successful production run     31266360510
Successful production job     93125031659
Verified state                33 / 34 / 183 / 284
Archived evidence             124 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-08T16:07:52.937Z
Publication attempt           1 after refresh
```

The initial Batch 18 verifier rejected same-count stale evidence at `bir_src_000132` for all twenty attempts. Attempts 15–20 observed a newer `generated_at` but still failed field-level equality. The single permitted behavior-neutral build-input refresh changed only the existing non-executable build marker and did not alter canonical content, build semantics, or verification requirements. The unchanged verifier then passed on the first post-refresh attempt. No second refresh was used.

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
Evidence with archived_url          124
Terminal unarchived unique URLs      17
Terminal unarchived records          27
Risky-host unarchived unique URLs    18
Risky-host unarchived records        32
X/Twitter records unarchived         29
Unknown URL status                    0
```

## Archive Capture Batch 18

```text
Initial fixed-ten review run        31265648638
Successful review run               31265683543
Review boundary                           PR #194
Canonical migration                       PR #195
Build-input refresh                       PR #197
Production audit                          PR #198
Previously-unreviewed URLs reviewed             9
Verified Wayback mappings                       4
Evidence records updated                        4
Terminal unique queue               21 -> 17
Terminal record queue               31 -> 27
Risky-host unique queue             18 -> 18
Risky-host record queue             32 -> 32
X/Twitter record queue              29 -> 29
Source-count drift                           0
```

Updated evidence IDs:

```text
bir_src_000137
bir_src_000197
bir_src_000192
bir_src_000132
```

The initial review run failed before replay because the historical reviewer expected exactly ten candidates while only nine remained. The wrapper was corrected only to review the complete remaining candidate set when fewer than ten exist. Acceptance requirements were unchanged.

The remaining five previously-unreviewed URLs were reviewed and deferred. All previously-unreviewed terminal/risky-host candidates visible to the established reviewer are therefore exhausted. Future archive preservation must retry reviewed deferred candidates or handle newly introduced canonical source URLs; do not create an artificial untouched Batch 19.

## Cloudflare Pages queue boundary

The project uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. Batch 15 removed 16 queued previews and preserved all production deployments. Arbitrary temporary branches must not restore preview builds. Batch 18 required one permitted behavior-neutral build-input refresh; after that refresh the unchanged verifier passed on attempt 1.

## Deployment resume rule

A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used once when publication remains stale. A changed `generated_at` without field-level canonical equality is still a failed publication. Never stack a second refresh automatically. Inspect queue/deployment state, keep preview deployment at `none`, allow deployment latency, and preserve full-content equality requirements.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary, affected route, technical cause, or postmortem suitable for a reviewed `incident_case`.

## Next

1. create a bounded deferred archive-retry inventory from already-reviewed unresolved sources and retry only justified targets under the same replay, temporal-fit, size, and reproducibility standards;
2. reduce remaining event primary gaps where justified;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic publication;
5. continue v1 hardening.
