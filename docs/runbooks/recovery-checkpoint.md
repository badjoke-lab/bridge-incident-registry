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
PR #139–141  Archive capture Batch 7 review, canonical, and production verification
```

## Latest completed production checkpoint

```text
Canonical data PR        #140
Canonical merge          9b9db5e48626ba7d919301d18c40dd9bbadd6d1f
Production audit PR      #141
Production verify        30735206567
Production verify job    91462656791
Canonical normal CI      30735138759
Verification PR CI       30735206554
Verified state           33 / 34 / 183 / 284
Archived evidence        71 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-02T06:06:48.014Z
Publication attempt      18
```

The verifier rejected the prior same-count Batch 6 evidence content at `bir_src_000049` on attempts 1 through 17. Production converged without a deployment retrigger on attempt 18.

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
Evidence with archived_url           71
Terminal unarchived unique URLs      39
Risky-host unarchived unique URLs    46
Unknown URL status                    0
```

## Archive capture Batch 7

```text
Review boundary                    PR #139
Canonical migration                PR #140
Production audit                   PR #141
Verified Wayback URLs                    7
Evidence records updated                 7
Terminal unique queue                  39
Risky-host unique queue           53 -> 46
Terminal record queue                  51
Risky-host record queue           72 -> 65
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000049
bir_src_000051
bir_src_000054
bir_src_000066
bir_src_000067
bir_src_000072
bir_src_000103
```

Only exact reviewed snapshots were added. Source URLs, historical claims, source hierarchy, dates, and linkages remain unchanged. The ChainSwap ASAP token update, Synapse protocol introduction, and Rubic tokenomics update remain unarchived because they did not pass exact replay.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 46 risky-host and 39 terminal unique URLs;
2. retry deferred official sources under the same replay standard;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
