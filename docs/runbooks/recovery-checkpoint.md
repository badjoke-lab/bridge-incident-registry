# BIR Live Recovery Checkpoint

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

GitHub state and canonical JSON are authoritative. Completed merge SHAs and run IDs below are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges   55
Incidents   51
Events   229
Evidence   377
Canonical HTML routes    89
Legacy redirects         80
Series records           81
Series JSON files        83
```

## Immediate recovery point

Resume from current `main`. Ledger Series Phase 2 is closed; BIR is in reviewed steady-state maintenance. The Ledger Series Phase 9 BIR adapter is implemented and production-verified; this is not a BIR “Stage 9”.

Latest production-proven canonical maintenance:

```text
Canonical data PR                   #338
Canonical merge                     66b3b1b613e0e757d45313af59b02f1bebfa398c
Release-baseline sync PR            #339
Production-proven main              b72aa190f07a11f45baa2cfcf57ae9295343b374
Read-only production verifier PR    #340 — closed without merge
Verification run                    32337814734
Verification job                    96330647951
Publication attempt                 1
Generated at                        2026-08-20T06:00:17.226Z
Production equality                 success
Canonical HTML routes               89
Legacy redirects                    80
Bridge dossiers verified            39 / 39
Incident dossiers verified          42 / 42
Series records verified             81 / 81
Series JSON files verified          83 / 83
Unique Series global keys           81 / 81
```

The verifier checked out exact main `b72aa190f07a11f45baa2cfcf57ae9295343b374`, reached complete native production equality on attempt 1 and independently proved complete Series semantic equality on attempt 1. The Verus bridge plus separate May and July incident pages, Incidents, Compare and Stats routes all returned HTTP 200.

Do not restart from the July-only `39 / 41 / 194 / 316` checkpoint, ChainConnect `38 / 40 / 193 / 311`, Stage 8 `36 / 38 / 190 / 299`, or earlier Syscoin/Allbridge/XRPL-TX branch heads; those remain historical checkpoints only.

## Ledger Series checkpoint

```text
PR #284      Phase 2 baseline audit and schedule synchronization
PR #285–286  Phase 2 per-record JSON plus strict production verifier repair
PR #288      Phase 2 bounded filter delta
PR #290      Phase 2 canonical Compare
PR #292      Phase 2 canonical-derived Stats
PR #294      Phase 2 bounded lifecycle fixes
PR #295–296  Phase 2 production publication recovery
PR #327      Phase 9 BIR Series adapter
PR #332      July native + Series production proof; closed without merge
PR #340      May-expanded native + Series production proof; closed without merge
```

Phase 2 completion evidence: `docs/audits/ledger-series-phase2-completion-2026-08-18.md`. The current May-expanded native + Series production checkpoint is recorded by PR #340 / run `32337814734` / job `96330647951`; the dedicated repository audit for this checkpoint is `docs/audits/production-verification-verus-may-series-2026-08-20.md` once merged with this checkpoint update.

## Current quality boundary

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     229 / 325
Tier 1 evidence                      246 / 325
Evidence with archived_url           130 / 325
Incidents without primary              1 / 42
Incidents without Tier 1               1 / 42
Events without primary                11 / 199
Events without Tier 1                  6 / 199
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
Full-corpus blocking errors            0
Full-corpus warning categories        {}
High-severity npm audit findings       0
```

These values are from the accepted exact-tree May canonical gates. Accepted primary/Tier 1/archive-risk ceilings remain unchanged.

## Monitoring recovery point

Monitoring remains review-only. It fingerprints canonical files, rejects canonical mutation/unknown URL status/broken references, writes only to approved staging paths, and suppresses unchanged signals.

Persisted monitoring-state baselines can predate the latest canonical additions. They are historical operational checkpoints and must never override current canonical/public truth `39 / 42 / 199 / 325` or the native + Series production proof above.

Repository Actions settings may still constrain `GITHUB_TOKEN` PR creation. When a monitoring workflow retains an already-validated review branch because of that exact platform limitation, use connected GitHub access to open the review PR; all canonical changes remain human-reviewed and fail-closed.

## Permanent guards

```text
npm audit --audit-level=high
npm run audit:source-count
npm run audit:source-count:test
npm run audit:source-quality
npm run audit:source-quality:test
npm run monitoring:test
npm run production:content:test
npm run performance:test
npm run build
npm run accessibility:check
npm run performance:check
npm run dist:check
npm run dist:test
Ledger Series adapter consistency
Chromium / Firefox / WebKit compatibility smoke
post-merge native production equality
post-merge Series production equality when Series output changes
```

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file. Astro remains `^7.2.0`.

## Cloudflare Pages boundary

Production branch is `main`. Canonical/public output changes require post-merge production equality. The current production checkpoint is the May-expanded Verus verification recorded by PR #340 at `39 / 42 / 199 / 325`, 89 canonical HTML routes, 80 redirects, 81 Series records, 83 Series JSON files and 81 unique Series keys. Do not weaken production equality to work around future deployment lag.

## Restart actions

1. read current `main`, `docs/operations/current-position.md`, `docs/operations/current-schedule.md`, and the AI-era authority before making changes;
2. continue BIR only as reviewed steady-state maintenance unless a newer authority explicitly opens a new bounded phase;
3. treat the May and July Verus incidents as separate canonical incidents on one bridge entity and never copy May recovery/restitution/reopen claims into the July case;
4. inspect monitoring/candidate changes as review-only and preserve silent-repeat behavior;
5. preserve source-quality ceilings, canonical semantics, Series/native publication contracts, and every permanent release gate;
6. for cross-series continuation, audit SOG's own live repository/status/authority before implementation rather than transplanting BIR assumptions.
