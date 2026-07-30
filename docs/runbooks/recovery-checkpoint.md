# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-30

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    279
```

## Latest completed checkpoints

```text
PR #100      Source-quality baseline and no-regression gate
PR #103      LI.FI source-quality canonical remediation
PR #104      LI.FI production verification
PR #106      Holograph URL-status canonical remediation
PR #107      Holograph production verification and content gate
PR #108–110  Event Tier 1 Batch 1 review, canonical, and production verification
PR #111      Event Tier 1 Batch 2 review boundary
PR #112      Event Tier 1 Batch 2 canonical migration — pending merge
```

## Latest completed production checkpoint

The latest completed production checkpoint remains 271 evidence until PR #112 merges and the 279-evidence state is verified.

```text
Canonical data PR        #109
Canonical merge          da066fb29b5b45f6c8602ef36becf6536bfe6a29
Production audit PR      #110
Production verify        30540271827
Canonical normal CI      30540042953
Production-PR normal CI  30540776235
Verified state           33 / 34 / 183 / 271
Canonical content match  true
HTML routes              72
Redirects                74
Generated at             2026-07-30T11:53:51.220Z
Publication attempt      6
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
Events without primary               20
Events without Tier 1                11
Terminal unarchived unique URLs      59
Risky-host unarchived unique URLs    87
Unknown URL status                    0
```

## Event Tier 1 Batch 2

```text
Review boundary       PR #111
Canonical migration   PR #112
Evidence added        bir_src_000272–bir_src_000279
Evidence total        271 -> 279
Primary evidence      189 -> 197
Tier 1 evidence       207 -> 215
Event primary gaps     28 -> 20
Event Tier 1 gaps      19 -> 11
Source-count drift      0
```

The eight additions support Rubic, Taiko, Celer, SOCKET, Synapse, Holograph, and Transit Finance events with reviewed first-party evidence. The two Nerve events remain intentionally Tier 2.

Archive-risk is counted by normalized unique source URL and exact-or-subdomain risky-host matching. Raw evidence-record counts are 78 terminal and 131 risky-host records, while the actionable unique-URL queues are 59 and 87.

Audits:

- `docs/audits/phase3-event-tier1-review-batch2-2026-07-30.md`
- `docs/audits/phase3-event-tier1-canonical-batch2-2026-07-30.md`

## Next

1. merge PR #112 after normal CI passes;
2. production-verify the complete 279-evidence public output;
3. review the final five unreviewed event Tier 1 gaps;
4. continue Nerve Bridge first-party/Tier 1 research;
5. start verified archive capture work for the 87 risky-host and 59 terminal unique URLs.
