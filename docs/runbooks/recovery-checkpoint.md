# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-02

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
```

## Latest completed production checkpoint

```text
Canonical data PR        #136
Canonical merge          f552007f5a37e6c988aec7884b0e122156102daf
Deployment retrigger PR  #138
Deployment retrigger     480913508dd1ae4c0ba0f30c4df7879587b0845c
Production audit PR      #137
Failed production run    30734330854
Failed production job    91460170932
Production verify        30734550824
Production verify job    91460859010
Canonical normal CI      30734278053
Verification PR CI       30734550837
Verified state           33 / 34 / 183 / 284
Archived evidence        64 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-02T05:38:31.010Z
Publication attempt      1 after retrigger
```

The first verifier run rejected the prior same-count Batch 5 evidence content at `bir_src_000032` on attempts 1 through 20. A docs-only main commit retriggered Cloudflare Pages. The unchanged verifier then passed on the first attempt.

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
Evidence with archived_url           64
Terminal unarchived unique URLs      39
Risky-host unarchived unique URLs    53
Unknown URL status                    0
```

## Archive capture Batch 6

```text
Review boundary                    PR #135
Canonical migration                PR #136
Production audit                   PR #137
Deployment retrigger               PR #138
Verified Wayback URLs                    6
Evidence records updated                11
Terminal unique queue                  39
Risky-host unique queue           59 -> 53
Terminal record queue                  51
Risky-host record queue           83 -> 72
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000032
bir_src_000033
bir_src_000071
bir_src_000074
bir_src_000157
bir_src_000161
bir_src_000211
bir_src_000228
bir_src_000253
bir_src_000255
bir_src_000280
```

Only exact reviewed snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged. Two Meter sources, the Allbridge compensation-plan source, and the Nomad road-to-recovery source remain unarchived because they did not pass exact replay.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 53 risky-host and 39 terminal unique URLs;
2. retry deferred official sources under the same replay standard;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
