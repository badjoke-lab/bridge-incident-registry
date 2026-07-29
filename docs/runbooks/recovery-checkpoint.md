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
PR #97       Final source-count canonical migration
PR #99       Final source-count deployment retrigger
PR #100      Source-quality baseline and no-regression gate
PR #103      LI.FI source-quality canonical remediation
PR #105      LI.FI production deployment retrigger
PR #104      LI.FI production verification
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

The first verification attempt observed the previous 263-evidence deployment for all 20 checks. The docs-only retrigger caused Cloudflare Pages to publish the 265-evidence state, and the unchanged verifier passed on attempt 1.

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
Unknown URL status               2
```

## Source-quality Batch 1

```text
Incident corrected       bir_inc_000015
Events corrected         bir_ev_000043, bir_ev_000044
Evidence added           bir_src_000264, bir_src_000265
Reimbursement            completed
Unresolved               false
Primary incident gaps    2 -> 1
Primary event gaps       36 -> 34
```

The first-party LI.FI postmortem reports all 29 affected wallets reimbursed for USD 570,000 total. Attacker-fund recovery remains `none` and is not conflated with reimbursement.

Audits:

- `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-quality-batch1-2026-07-29.md`

## Next

1. resolve the two unknown URL-status records;
2. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
3. reduce event-level source gaps;
4. begin archive-risk remediation;
5. continue validator and v1 hardening.
