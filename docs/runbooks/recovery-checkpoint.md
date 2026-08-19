# BIR Live Recovery Checkpoint

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

GitHub state and canonical JSON are authoritative. Completed merge SHAs and run IDs below are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges                  38
Incidents                40
Events                   193
Evidence                 311
Canonical HTML routes    86
Legacy redirects         80
```

## Immediate recovery point

Resume from current `main`. Ledger Series Phase 2 is closed; BIR is in reviewed steady-state maintenance.

Latest production-proven canonical maintenance:

```text
Canonical data PR                   #314
Canonical merge                     aa11872fe237c295dae5d5a0a41d283fcde21aab
Production verification audit PR    #318
Production Verification run         32167991271
Production Verification job         95812037176
Publication attempt                 1
Generated at                        2026-08-18T17:51:37.950Z
Production equality                 success
Canonical HTML routes               86
Legacy redirects                    80
Bridge dossiers verified            38 / 38
Incident dossiers verified          40 / 40
```

Review-only PRs #319–#322 follow that production checkpoint and do not mutate canonical/public output. Do not restart from Stage 8 (`36 / 38 / 190 / 299`) or earlier Syscoin/Allbridge/XRPL-TX branch heads; those remain historical checkpoints only.

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
Primary evidence                     222 / 311
Tier 1 evidence                      239 / 311
Evidence with archived_url           130 / 311
Incidents without primary              1 / 40
Incidents without Tier 1               1 / 40
Events without primary                11 / 193
Events without Tier 1                  6 / 193
Terminal unarchived unique URLs       15
Risky-host unarchived unique URLs     16
Unknown URL status                     0
Full-corpus blocking errors            0
Full-corpus warning categories        {}
High-severity npm audit findings       0
```

These values are from the permanent Check gate at the `38 / 40 / 193 / 311` baseline. Accepted primary/Tier 1/archive-risk ceilings remain unchanged.

## Monitoring recovery point

Monitoring remains review-only. It fingerprints canonical files, rejects canonical mutation/unknown URL status/broken references, writes only to approved staging paths, and suppresses unchanged signals.

Persisted monitoring-state baselines can predate the latest canonical additions. They are historical operational checkpoints and must never override current canonical/public truth `38 / 40 / 193 / 311` or the successful production verifier above.

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

Production branch is `main`. Canonical/public output changes require post-merge production equality. The current production checkpoint is the ChainConnect verification recorded in PR #318 at `38 / 40 / 193 / 311`, 86 canonical HTML routes and 80 redirects. Do not weaken production equality to work around future deployment lag.

## Restart actions

1. read current `main`, `docs/operations/current-position.md`, `docs/operations/current-schedule.md`, and the AI-era authority before making changes;
2. continue BIR only as reviewed steady-state maintenance unless a newer authority explicitly opens a new bounded phase;
3. inspect monitoring/candidate changes as review-only and preserve silent-repeat behavior;
4. preserve source-quality ceilings, canonical semantics, and every permanent release gate;
5. for cross-series continuation, audit SOG's own live repository/status/authority before implementation rather than transplanting BIR assumptions.
