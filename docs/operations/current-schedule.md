# BIR implementation schedule

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-18

The authoritative BIR maintenance roadmap is `docs/runbooks/development-roadmap.md`; the restart point is `docs/runbooks/recovery-checkpoint.md`. The Ledger Series horizontal roadmap is governed by `docs/ai-era-execution-schedule.md` and `docs/ai-era-registry-spec.md`.

## Naming boundary

BIR's historical internal Phase 0–5 numbering and the cross-series **Ledger Series Phase 2** are separate. Ledger Series Phase 2 means BIR's completed AI-era horizontal strengthening; it does not rename or reopen the completed internal BIR phases.

## Existing BIR schedule

- Internal Phase 0 — specification and foundation: complete
- Internal Phase 1 — canonical model, UI, validation, and seeds: complete
- Internal Phase 2 — record expansion: complete through the established batches
- Internal Phase 3 — full-corpus quality strengthening: active research-triggered maintenance
- Internal Phase 4 — public contract stabilization: complete
- Internal Phase 5 — monitoring and candidate collection: steady-state live
- Release — v1 hardening/technical closure: complete
- Maintenance — reviewed canonical/candidate expansion: active
- Ledger Series Phase 2 — horizontal strengthening: **complete**

## Current canonical baseline

```text
Bridges     36
Incidents   38
Events      190
Evidence    299
```

This is the production-verified Stage 8 baseline. Historical `34 / 36 / 185 / 293` and `36 / 38 / 188 / 297` restart text is not current canonical truth.

## Ledger Series Phase 2 execution

1. **Complete** — baseline audit and schedule synchronization, PR #284.
2. **Complete decision** — no lifecycle schema expansion required at the audited boundary.
3. **Complete — Stage 4** — deterministic per-record bridge and incident JSON, PRs #285–#286.
4. **Complete — Stage 5** — bounded incident-filter delta, PR #288.
5. **Complete — Stage 6** — canonical `/compare/`, PR #290.
6. **Complete — Stage 7** — canonical-derived `/stats/`, PR #292.
7. **Complete — Stage 8** — PR #294 added only the reviewed discrete `reimbursement_completed` event for `bir_inc_000015` and `bridge_reopened` event for `bir_inc_000035`, plus the minimum supporting event-scoped evidence. The two full-corpus warnings are now absent.
8. **Resolved publication checkpoint** — PRs #295–#296 preserved the approved canonical delta while the external Git-integrated deployment was retriggered. Main V1 Release Readiness run `32041737878` passed production equality at `36 / 38 / 190 / 299` for 82 canonical HTML routes plus all 36 bridge and 38 incident dossiers.
9. **Complete — closeout** — completion evidence is `docs/audits/ledger-series-phase2-completion-2026-08-18.md` and the current operator/restart documents are synchronized by the closeout PR.
10. **Deferred** — natural-language-to-filter translation remains a Ledger Series Phase 10 concern and is not a BIR Phase 2 requirement.

## Current quality checkpoint

```text
Primary evidence                  215 / 299
Tier 1 evidence                   232 / 299
Archived evidence                 130 / 299
Incidents without primary           1 / 38
Incidents without Tier 1            1 / 38
Events without primary             11 / 190
Events without Tier 1                6 / 190
Terminal unarchived URLs           15
Risky-host unarchived URLs         16
Unknown URL status                  0
Source-count mismatches              0
Full-corpus blocking errors          0
Full-corpus warning categories      {}
High-severity npm audit              0
```

Source-quality no-regression limits were not widened for Stage 8.

## Permanent release boundary

- monitoring never writes canonical records automatically;
- secondary discovery sources only create review candidates;
- unchanged monitoring state is silent;
- unknown URL status and broken canonical references are blocking;
- source-quality gap ceilings may decrease but must not increase without review;
- high-severity npm audit findings are blocking;
- accessibility, performance, Chromium/Firefox/WebKit, and dist consistency remain release gates;
- production verification is required for canonical/public output changes;
- technical closure does not create or imply a GitHub Release or semantic-version tag.

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file.

## Immediate execution order

1. keep BIR in steady-state reviewed maintenance: monitoring, evidence health, high-severity corrections, and properly reviewed new incidents;
2. preserve canonical/schema semantics and every permanent release/source-quality guard;
3. do **not** invent a Ledger Series Stage 9;
4. for the cross-series roadmap, read the latest authority in the target repository before starting work. `docs/ai-era-registry-spec.md` names **SOG** as the next series after the completed BIR pilot.
