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
```

## Latest completed production checkpoint

```text
Canonical data PR        #149
Canonical merge          6edc02270d1fdfd202ec13874a2a00845ce97897
Deployment retrigger PR  #151
Deployment retrigger     fd1d0cdd1ab7fc87052ea4308834ada77561205f
Production audit PR      #150
Production verify        30781383081
Failed production job    91586560207
Production verify job    91587613338
Canonical normal CI      30781280526
Initial verification CI  30781383082
Verified state           33 / 34 / 183 / 284
Archived evidence        84 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-03T03:20:41.394Z
Publication attempt      1 after retrigger
```

The first verifier job rejected the prior same-count Batch 9 evidence content at `bir_src_000025` on all twenty attempts. PR #151 retriggered Cloudflare Pages with a docs-only main commit. The same workflow run then passed on the first attempt after retrigger.

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
Evidence with archived_url           84
Terminal unarchived unique URLs      37
Risky-host unarchived unique URLs    34
Unknown URL status                    0
```

## Archive capture Batch 10

```text
Review boundary                    PR #148
Canonical migration                PR #149
Production audit                   PR #150
Deployment retrigger               PR #151
Verified Wayback URLs                    2
Evidence records updated                 3
Terminal unique queue           39 -> 37
Risky-host unique queue         36 -> 34
Terminal record queue           51 -> 48
Risky-host record queue         55 -> 52
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000025
bir_src_000028
bir_src_000216
```

Only the two exact reviewed snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged. Eight deferred candidates remain unarchived because they lacked a verified full replay under the permanent boundary.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 34 risky-host and 37 terminal unique URLs;
2. retry deferred official sources under the same replay standard;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
