# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-31

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
PR #103      LI.FI source-quality canonical remediation
PR #104      LI.FI production verification
PR #106      Holograph URL-status canonical remediation
PR #107      Holograph production verification and content gate
PR #108–110  Event Tier 1 Batch 1 review, canonical, and production verification
PR #111–113  Event Tier 1 Batch 2 review, canonical, and production verification
PR #114–116  Final event Tier 1 review, canonical, and production verification
```

## Latest completed production checkpoint

```text
Canonical data PR        #115
Canonical merge          b07a33b6a61be8338466b5257e121a543884e2f3
Production audit PR      #116
Production verify        30612188969
Canonical normal CI      30544058869
Production-PR normal CI  30612188935
Verified state           33 / 34 / 183 / 284
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-07-31T07:14:14.901Z
Publication attempt      1
```

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
Terminal unarchived unique URLs      59
Risky-host unarchived unique URLs    88
Unknown URL status                    0
```

## Final event Tier 1 migration

```text
Review boundary       PR #114
Canonical migration   PR #115
Production audit      PR #116
Evidence added        bir_src_000280–bir_src_000284
Evidence total        279 -> 284
Primary evidence      197 -> 201
Tier 1 evidence       215 -> 220
Event primary gaps     20 -> 16
Event Tier 1 gaps      11 -> 6
Unreviewed gaps         5 -> 0
Source-count drift      0
```

Four additions are first-party primary evidence. The PeckShieldAlert Tornado Cash observation remains Tier 1 non-primary. Five event counts and three incident records were synchronized, with the Unizen incident incremented twice.

Archive-risk is counted by normalized unique source URL and exact-or-subdomain risky-host matching. Raw evidence-record counts are 79 terminal and 136 risky-host records, while the actionable unique-URL queues are 59 and 88.

## Next

1. continue Nerve Bridge first-party/Tier 1 research;
2. start verified archive capture work for the 88 risky-host and 59 terminal unique URLs;
3. continue validator, monitoring, candidate collection, and v1 hardening.
