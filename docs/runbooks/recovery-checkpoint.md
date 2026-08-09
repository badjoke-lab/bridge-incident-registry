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
PR #202      Deferred Archive Retry 02 reproducible review
PR #203      Deferred Archive Retry 02 canonical migration
PR #204      Deferred Archive Retry 02 production verification and checkpoint sync
PR #205      Deferred Archive Retry 03 review — approved 0
PR #206      Deferred Archive Retry 04 review — approved 0; fresh pool exhausted
PR #207      Event Primary Remediation 01 review — two approved
PR #208      Event Primary Remediation 01 canonical application
PR #209      Event Primary Remediation 01 production verification
```

## Latest completed production checkpoint

```text
Review PR                     #207
Canonical data PR             #208
Canonical merge               1638b47eb3c2e9066d0323d6d5a4abe8aa85cfb2
Production audit PR           #209
Production verify run         31299468964
Production verify job         93209808769
Verified state                33 / 34 / 183 / 284
Events without primary        14 / 183
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-09T06:42:13.747Z
Publication attempt           4 / 20
Build-input refresh           not required
```

Attempts 1–3 correctly rejected stale same-count production at `bir_src_000003`; attempt 4 observed the new generated build and complete field-level equality across all four public canonical datasets.

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
Events without primary               14
Events without Tier 1                 6
Unreviewed event Tier 1 gaps           0
Evidence with archived_url          127
Terminal unarchived unique URLs      15
Terminal unarchived records          25
Risky-host unarchived unique URLs    16
Risky-host unarchived records        30
X/Twitter records unarchived         29
Unknown URL status                    0
```

## Archive preservation boundary

Archive Capture Batch 18 exhausted the previously-unreviewed terminal/risky-host candidate set. Do not create an artificial untouched Batch 19.

The permanent review-audit inventory identified 45 reviewed-but-unarchived evidence records across 32 unique URLs. Deferred Retries 01 and 02 recovered three evidence records on three unique URLs, leaving 42 records across 29 unique URLs.

Deferred Retry 03 reviewed ten of the twelve URLs that had not been part of the recent Retry 01/02 scopes and approved none. Deferred Retry 04 reviewed the final two fresh URLs, `bir_src_000277` and `bir_src_000282`, and also approved none. The not-recently-retried fresh deferred pool is now exhausted.

The remaining reviewed-unarchived pool therefore consists only of URLs already explicitly retried under the current exact-replay, temporal-fit, minimum-size, and two-run reproducibility boundary. Do not immediately recycle those failures. Archive preservation may resume after conditions materially change or when new canonical source URLs enter the corpus.

## Event primary-evidence boundary

PR #207 reviewed the nine non-intentional event primary-evidence gaps. Exactly two bounded remediations were approved and applied in PR #208:

```text
bir_ev_000002 / bir_src_000003  OFAC Ronin/Lazarus attribution source corrected and marked primary
bir_ev_000011 / bir_src_000014  FBI Horizon attribution source marked claim-relative primary
```

The source-quality ceiling is now `events_without_primary = 14`. Seven reviewed candidates remain deferred pending stronger source-content support. Intentional secondary-only boundaries remain explicit and must not be reclassified merely to improve coverage.

## Cloudflare Pages boundary

The project uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. A behavior-neutral build-input refresh may be used once when publication remains stale, but a changed `generated_at` without field-level canonical equality is still failed publication. Never stack a second refresh automatically.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary suitable for a reviewed `incident_case`.

## Next

1. review the remaining 14 event primary-evidence gaps under the same claim-relative evidence standard;
2. remediate only gaps where source hierarchy can be improved safely and keep intentional secondary-only boundaries explicit;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic publication;
5. continue v1 hardening;
6. revisit deferred archive failures only after conditions change or new canonical source URLs appear.
