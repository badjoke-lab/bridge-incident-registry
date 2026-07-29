# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-29

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
```

## Latest completed checkpoints

```text
PR #100      Source-quality baseline and no-regression gate
PR #103      LI.FI source-quality canonical remediation
PR #104      LI.FI production verification
PR #106      Holograph URL-status canonical remediation
PR #107      Holograph production verification and content gate
```

## Latest production checkpoint

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
Blocking errors                  0
Incident source-count mismatches 0
Event source-count mismatches    0
Incidents without primary        1
Incidents without Tier 1         1
Events without primary          34
Events without Tier 1           25
Unknown URL status               0
```

## URL-status Batch 1

```text
Evidence changed     bir_src_000112, bir_src_000239
Legacy host          twitter.com
Canonical host       x.com
URL status           unknown -> live
Evidence total       265
Source-count drift   0
```

The production verifier now compares live data with the complete generated public contract. Counts and ordered IDs alone are no longer sufficient. Same-count field drift, order drift, and length drift are covered by controlled tests.

Audits:

- `docs/audits/phase3-url-status-remediation-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-url-status-batch1-2026-07-29.md`

## Next

1. inventory the 25 event Tier 1 gaps;
2. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
3. begin archive-risk remediation;
4. continue validator and v1 hardening.
