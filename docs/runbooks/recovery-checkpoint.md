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
```

## Latest completed production checkpoint

```text
Canonical data PR        #146
Canonical merge          dce643e53c1d2417aeca6eae235d38dc20d32ca6
Production audit PR      #147
Production verify        30779827391
Production verify job    91582150806
Canonical normal CI      30736754061
Verification PR CI       30779827393
Verified state           33 / 34 / 183 / 284
Archived evidence        81 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-08-03T02:40:37.000Z
Publication attempt      7
```

The verifier rejected the prior same-count Batch 8 evidence content at `bir_src_000203` on attempts 1 through 6. Production converged without a deployment retrigger on attempt 7.

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
Evidence with archived_url           81
Terminal unarchived unique URLs      39
Risky-host unarchived unique URLs    36
Unknown URL status                    0
```

## Archive capture Batch 9

```text
Review boundary                    PR #145
Canonical migration                PR #146
Production audit                   PR #147
Verified Wayback URLs                    1
Evidence records updated                 1
Terminal unique queue                  39
Risky-host unique queue           37 -> 36
Terminal record queue                  51
Risky-host record queue           56 -> 55
Source-count drift                      0
```

Updated evidence ID:

```text
bir_src_000203
```

Only the exact reviewed snapshot was added. Source URL, historical claim, source hierarchy, date, and linkages remain unchanged. The known unavailable Qubit compensation-plan source remains unarchived because it lacks a verified snapshot.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Next

1. continue bounded archive work from 36 risky-host and 39 terminal unique URLs;
2. retry deferred official sources under the same replay standard;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. continue monitoring, candidate collection, and v1 hardening.
