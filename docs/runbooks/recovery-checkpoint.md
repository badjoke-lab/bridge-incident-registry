# BIR Live Recovery Checkpoint

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-18

GitHub state and canonical JSON are authoritative. Completed merge SHAs and run IDs below are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges     38
Incidents   40
Events      193
Evidence    311
Canonical HTML routes   82
```

## Immediate recovery point

Resume from current `main` after the Ledger Series Phase 2 closeout. The last production-proven implementation revision before the docs-only closeout is:

```text
Stage 8 canonical PR                 #294
Publication checkpoint               #295
Production retrigger PR              #296
Verified main revision               6fe188ea4979d38c32a3a9a4558537c87b733610
V1 Release Readiness main run        32041737878
Release-readiness job                95422149652
Production equality                  success
Bridge dossiers verified             36
Incident dossiers verified           38
```

Do not restart from the historical Syscoin, Allbridge, XRPL-TX, or pre-Stage-8 branch heads/counts. Their merge SHAs remain useful history only.

## Ledger Series Phase 2 checkpoint

```text
PR #284      Baseline audit and schedule synchronization
PR #285–286  Per-record JSON plus strict production verifier repair
PR #288      Bounded filter delta
PR #290      Canonical Compare
PR #292      Canonical-derived Stats
PR #294      Stage 8 bounded lifecycle fixes
PR #295      Production-publication blocker checkpoint
PR #296      Git-integrated production retrigger and readiness sync
```

Completion evidence: `docs/audits/ledger-series-phase2-completion-2026-08-18.md`.

BIR Ledger Series Phase 2 is complete. There is no Ledger Series Stage 9. The horizontal roadmap now leaves BIR in steady-state maintenance; `docs/ai-era-registry-spec.md` names SOG as the next cross-series series.

## Current quality boundary

```text
Incident source-count mismatches       0
Event source-count mismatches          0
Primary evidence                     215 / 299
Tier 1 evidence                      232 / 299
Evidence with archived_url           130 / 299
Incidents without primary              1 / 38
Incidents without Tier 1               1 / 38
Events without primary                11 / 190
Events without Tier 1                  6 / 190
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
Full-corpus blocking errors            0
Full-corpus warning categories        {}
High-severity npm audit findings       0
```

Stage 8 did not widen an accepted primary/Tier 1 gap or archive-risk ceiling. The two targeted lifecycle warnings are resolved using reviewed first-party evidence.

## Monitoring recovery point

Monitoring remains review-only. It fingerprints canonical files, rejects canonical mutation/unknown URL status/broken references, writes only to approved staging paths, and suppresses unchanged signals.

Persisted monitoring-state baselines can predate the latest canonical additions. They are historical operational checkpoints and must never override current canonical/public truth `36 / 38 / 190 / 299` or the successful main production verifier above.

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
Chromium / Firefox / WebKit compatibility smoke
post-merge production equality
```

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file. Astro remains `^7.2.0`.

## Cloudflare Pages boundary

Production branch is `main`. Canonical/public output changes require post-merge production equality. The Stage 8 publication blocker was resolved by PR #296; the successful verifier observed the 190/299 publication on attempt 1. Do not weaken production equality to work around future deployment lag.

## Restart actions

1. read current `main`, `docs/operations/current-position.md`, `docs/operations/current-schedule.md`, and the AI-era authority before making changes;
2. continue BIR only as reviewed steady-state maintenance unless a newer authority explicitly opens a new bounded phase;
3. inspect monitoring/candidate changes as review-only and preserve silent-repeat behavior;
4. preserve source-quality ceilings, canonical semantics, and every permanent release gate;
5. for cross-series continuation, audit SOG's own live repository/status/authority before implementation rather than transplanting BIR assumptions.
