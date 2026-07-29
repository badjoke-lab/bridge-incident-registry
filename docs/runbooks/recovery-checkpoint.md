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
PR #105      LI.FI production deployment retrigger
PR #104      LI.FI production verification
PR #106      Holograph URL-status remediation in progress
```

## Latest production checkpoint

```text
Canonical merge      cbff8411ee7f0bde4d4cd13624166502bded7fdc
Deployment retrigger 8ed1cd13292eefe524609c5f2db8578d58a07bee
Production verify    30454087470
Canonical normal CI  30453868882
Verified state       33 / 34 / 183 / 265
HTML routes          72
Redirects            74
Generated at         2026-07-29T13:06:10.965Z
Publication attempt  1
```

## Permanent guards

```text
npm run audit:source-count
npm run audit:source-count:test
npm run audit:source-quality
npm run audit:source-quality:test
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

Both records point to Holograph's official June 2024 incident statement. No evidence link, source tier, reliability, claim, or historical outcome changed. The permanent no-regression ceiling now requires zero unknown URL statuses.

Audit: `docs/audits/phase3-url-status-remediation-batch1-2026-07-29.md`.

## Next

1. complete normal CI, merge, and production-verify PR #106;
2. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
3. reduce event-level source gaps;
4. begin archive-risk remediation;
5. continue validator and v1 hardening.
