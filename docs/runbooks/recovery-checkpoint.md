# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-30

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    271
```

## Latest completed checkpoints

```text
PR #100      Source-quality baseline and no-regression gate
PR #103      LI.FI source-quality canonical remediation
PR #104      LI.FI production verification
PR #106      Holograph URL-status canonical remediation
PR #107      Holograph production verification and content gate
PR #108      Event Tier 1 Batch 1 review boundary
PR #109      Event Tier 1 Batch 1 canonical migration — pending merge
```

## Latest completed production checkpoint

The latest completed production checkpoint remains 265 evidence until PR #109 merges and the 271-evidence state is verified.

```text
Canonical merge          d0e9674745996fc1d85a32710890fa880d8946ad
Production verify        30457429225
Normal CI                30457429426
Verified state           33 / 34 / 183 / 265
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-07-29T13:30:13.794Z
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
Events without primary               28
Events without Tier 1                19
Terminal unarchived unique URLs      59
Risky-host unarchived unique URLs    83
Unknown URL status                    0
```

## Event Tier 1 Batch 1

```text
Review boundary       PR #108
Canonical migration   PR #109
Evidence added        bir_src_000266–bir_src_000271
Evidence total        265 -> 271
Primary evidence      183 -> 189
Tier 1 evidence       201 -> 207
Event primary gaps     34 -> 28
Event Tier 1 gaps      25 -> 19
Source-count drift      0
```

The six additions support Commons Bridge, Ronin, Nomad, Poly Network, and Celer events with reviewed first-party evidence. Harmony, Wormhole, and Nomad research-context events and the Harmony community proposal remain intentionally secondary-source records.

Archive-risk is counted by normalized unique source URL and exact-or-subdomain risky-host matching. Duplicate event-scoped evidence records do not inflate the queue. Raw evidence-record counts are 78 terminal and 123 risky-host records, while the actionable unique-URL queues are 59 and 83.

Audits:

- `docs/audits/phase3-event-tier1-review-batch1-2026-07-29.md`
- `docs/audits/phase3-event-tier1-canonical-batch1-2026-07-30.md`

## Next

1. merge PR #109 after normal CI passes;
2. production-verify the complete 271-evidence public output;
3. review the remaining 19 event Tier 1 gaps;
4. continue Nerve Bridge first-party/Tier 1 research;
5. start verified archive capture work for the 83 risky-host and 59 terminal unique URLs.
