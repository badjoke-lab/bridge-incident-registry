# BIR Live Recovery Checkpoint

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

GitHub state and canonical JSON are authoritative. Completed merge SHAs and run IDs below are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges                  39
Incidents                42
Events                   199
Evidence                 325
Canonical HTML routes    88
Legacy redirects         80
Series records           80
Series JSON files        82
```

## Immediate recovery point

Resume from current `main`. Ledger Series Phase 2 is closed; BIR is in reviewed steady-state maintenance. The Ledger Series Phase 9 BIR adapter is implemented and production-verified; this is not a BIR “Stage 9”.

Latest production-proven canonical maintenance:

```text
Canonical data PR                   #330
Canonical merge                     4ca9065af8072db00408efb5663c797f80972945
Read-only production verifier PR    #332 — closed without merge
Verification run                    32334410535
Verification job                    96321019010
Publication attempt                 1
Generated at                        2026-08-20T05:06:43.792Z
Production equality                 success
Canonical HTML routes               88
Legacy redirects                    80
Bridge dossiers verified            39 / 39
Incident dossiers verified          41 / 41
Series records verified             80 / 80
Series JSON files verified          82 / 82
Unique Series global keys           80 / 80
```

Do not restart from the ChainConnect `38 / 40 / 193 / 311` checkpoint, Stage 8 `36 / 38 / 190 / 299`, or earlier Syscoin/Allbridge/XRPL-TX branch heads; those remain historical checkpoints only.

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
PR #332      Phase 9 + native post-Verus production proof; closed without merge
```

Phase 2 completion evidence: `docs/audits/ledger-series-phase2-completion-2026-08-18.md`. Current native + Series production evidence: `docs/audits/production-verification-verus-july-series-2026-08-20.md`.

## Current quality boundary

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     224 / 316
Tier 1 evidence                      241 / 316
Evidence with archived_url           130 / 316
Incidents without primary              1 / 41
Incidents without Tier 1               1 / 41
Events without primary                11 / 194
Events without Tier 1                  6 / 194
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
Full-corpus blocking errors            0
Full-corpus warning categories        {}
High-severity npm audit findings       0
```

These values are from the exact-head permanent Check gate for PR #330. Accepted primary/Tier 1/archive-risk ceilings remain unchanged.

## Monitoring recovery point

Monitoring remains review-only. It fingerprints canonical files, rejects canonical mutation/unknown URL status/broken references, writes only to approved staging paths, and suppresses unchanged signals.

Persisted monitoring-state baselines can predate the latest canonical additions. They are historical operational checkpoints and must never override current canonical/public truth `39 / 41 / 194 / 316` or the native + Series production proof above.

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

Production branch is `main`. Canonical/public output changes require post-merge production equality. The current production checkpoint is the Verus July verification recorded by PR #332 at `39 / 41 / 194 / 316`, 88 canonical HTML routes, 80 redirects, and 80 Series records. Do not weaken production equality to work around future deployment lag.

## Restart actions

1. read current `main`, `docs/operations/current-position.md`, `docs/operations/current-schedule.md`, and the AI-era authority before making changes;
2. continue BIR only as reviewed steady-state maintenance unless a newer authority explicitly opens a new bounded phase;
3. treat Issue #331 Verus May as a separate incident review from the canonical July Verus case;
4. inspect monitoring/candidate changes as review-only and preserve silent-repeat behavior;
5. preserve source-quality ceilings, canonical semantics, Series/native publication contracts, and every permanent release gate;
6. for cross-series continuation, audit SOG's own live repository/status/authority before implementation rather than transplanting BIR assumptions.
