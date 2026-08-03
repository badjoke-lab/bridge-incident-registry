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
```

## Latest completed production checkpoint

```text
Canonical data PR        #153
Canonical merge          f8c0772acbabbf7f468f818e3d8f00b83ca9e38a
Docs-only retrigger PR   #155
Docs-only retrigger      d143b3b12b11c79cd0d78e30b965a25ed4d5e480
Build-input refresh PR   #156
Build-input refresh      2276d4e37096e29f090c0238f9f0cd6f64a725eb
Production audit PR      #154
Production verify        30783692287
First failed job         91593095620
Second failed job        91594233914
Production verify job    91595453784
Canonical final CI       30783546644
Initial verification CI  30783692322
Build-input refresh CI   30784453676
Verified state           33 / 34 / 183 / 284
Archived evidence        85 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-03T04:26:39.509Z
Publication attempt      1 after build-input refresh
```

The first two verifier jobs rejected `bir_src_000029` for twenty attempts each. The docs-only retrigger left `generated_at` unchanged and did not start a Pages build. The behavior-neutral build-input refresh then published the canonical content, and the unchanged verifier passed on attempt 1.

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
Evidence with archived_url           85
Terminal unarchived unique URLs      36
Risky-host unarchived unique URLs    33
Unknown URL status                    0
```

## Archive capture Batch 11

```text
Review boundary                    PR #152
Canonical migration                PR #153
Production audit                   PR #154
Docs-only retrigger                PR #155
Build-input refresh                PR #156
Verified Wayback URLs                    1
Evidence records updated                 1
Terminal unique queue           37 -> 36
Risky-host unique queue         34 -> 33
Terminal record queue           48 -> 47
Risky-host record queue         52 -> 51
X/Twitter record queue          39 -> 38
Source-count drift                      0
```

Updated evidence ID:

```text
bir_src_000029
```

Only the exact reviewed Multichain cessation snapshot was added. Source URL, historical claim, source hierarchy, date, and linkage remain unchanged. Nine deferred candidates remain unarchived because they lacked a verified full replay under the permanent boundary.

## Deployment resume rule

A docs-only commit is not assumed to start a Cloudflare Pages build. When `generated_at` remains unchanged after a retrigger, use a bounded reviewed build-input change that preserves execution behavior, then rerun the unchanged full-content verifier.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 33 risky-host and 36 terminal unique URLs;
2. retry deferred official sources under the same replay standard;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
