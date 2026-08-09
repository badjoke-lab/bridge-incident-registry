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
```

## Latest completed production checkpoint

```text
Review PR                     #202
Review merge                  e77695ddf0523533ad785a44e797480daa8d400a
Canonical data PR             #203
Canonical merge               46b6e19700d8553c75c4555549b9ca308cbc7292
Production audit PR           #204
Production verify run         31298305603
Production verify job         93206834594
Verified state                33 / 34 / 183 / 284
Archived evidence             127 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-09T06:10:37.053Z
Publication attempt           1 / 20
Build-input refresh           not required
```

The production verifier independently confirmed the exact archive mapping for `bir_src_000166` and complete field-level equality across all four public canonical datasets on attempt 1.

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

The permanent review-audit inventory identified 45 reviewed-but-unarchived evidence records across 32 unique URLs. Deferred Retry 01 recovered exactly two:

```text
bir_src_000037  Qubit — Our Compensation Plan 1
bir_src_000068  Harmony — Summary of the Horizon Bridge Incident
```

Deferred Retry 02 reviewed a different ten-URL scope and recovered exactly one additional source:

```text
bir_src_000166  QuillAudits — Decoding Rubic Exchange Exploit
```

Across Retries 01–02, the original deferred inventory was reduced by three evidence records on three unique URLs, leaving 42 reviewed-but-unarchived evidence records across 29 unique URLs.

Deferred Retry 03 reviewed ten of the twelve URLs that had not been part of the recent Retry 01/02 scopes and approved none. Deferred Retry 04 reviewed the final two fresh URLs, `bir_src_000277` and `bir_src_000282`, and also approved none. The not-recently-retried fresh deferred pool is now exhausted.

The remaining reviewed-unarchived pool therefore consists only of URLs already explicitly retried under the current exact-replay, temporal-fit, minimum-size, and two-run reproducibility boundary. Do not immediately recycle those failures. Archive preservation may resume after conditions materially change or when new canonical source URLs enter the corpus.

## Cloudflare Pages boundary

The project uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. A behavior-neutral build-input refresh may be used once when publication remains stale, but a changed `generated_at` without field-level canonical equality is still failed publication. Never stack a second refresh automatically.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary suitable for a reviewed `incident_case`.

## Next

1. reduce the remaining 16 event primary-evidence gaps where source hierarchy can be improved safely;
2. keep intentional secondary-only gaps explicit rather than weakening the evidence standard;
3. strengthen validators;
4. begin review-gated monitoring and candidate collection without automatic publication;
5. continue v1 hardening;
6. revisit deferred archive failures only after conditions change or new canonical source URLs appear.
