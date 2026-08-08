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
PR #108–116  Event Tier 1 remediation and production verification
PR #117      Nerve Bridge source boundary
PR #118–198  Archive Capture Batches 1–18 and production checkpoints
PR #199      Deferred Archive Retry 01 reproducible review
PR #200      Deferred Archive Retry 01 canonical migration
PR #201      Deferred Archive Retry 01 production verification and checkpoint sync
```

## Latest completed production checkpoint

```text
Review PR                     #199
Review merge                  53bcdc47f4269a00dc1c671f7428f75a8fe35c1e
Canonical data PR             #200
Canonical merge               934c85c49f7db71773721c5f4d64cc769f1361b0
Production audit PR           #201
Production verify run         31267226936
Production verify job         93127231682
Read-only production probe    31267391787
Read-only probe job           93127650808
Verified state                33 / 34 / 183 / 284
Archived evidence             126 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-08T16:33:32.318Z
Build-input refresh           not required
```

The read-only probe independently confirmed canonical-only live version metadata and the exact archive mappings for `bir_src_000037` and `bir_src_000068` after the successful full-content verifier.

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
Evidence with archived_url          126
Terminal unarchived unique URLs      15
Terminal unarchived records          25
Risky-host unarchived unique URLs    17
Risky-host unarchived records        31
X/Twitter records unarchived         29
Unknown URL status                    0
```

## Archive preservation boundary

Archive Capture Batch 18 exhausted the previously-unreviewed terminal/risky-host candidate set. Do not create an artificial untouched Batch 19.

The permanent review-audit inventory identified 45 reviewed-but-unarchived evidence records across 32 unique URLs. Deferred Retry 01 selected ten higher-value unresolved URLs and newly recovered exactly two:

```text
bir_src_000037  Qubit — Our Compensation Plan 1
bir_src_000068  Harmony — Summary of the Horizon Bridge Incident
```

The remaining eight Retry 01 targets were re-reviewed and remained below the unchanged exact replay, temporal-fit, minimum-size, and two-run reproducibility requirements. Do not immediately recycle those same eight into Retry 02.

## Cloudflare Pages boundary

The project uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. A behavior-neutral build-input refresh may be used once when publication remains stale, but a changed `generated_at` without field-level canonical equality is still failed publication. Never stack a second refresh automatically.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary suitable for a reviewed `incident_case`.

## Next

1. run Deferred Archive Retry 02 against a different high-value subset of remaining reviewed-unresolved sources;
2. reduce remaining event primary gaps where justified;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic publication;
5. continue v1 hardening.
