# BIR implementation schedule

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

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
Bridges     38
Incidents   40
Events      193
Evidence    311
```

This is current canonical and production-verified truth. The latest canonical maintenance additions are WanBridge and ChainConnect; the ChainConnect publication audit in PR #318 proved full production equality at this baseline. Historical Stage 8 `36 / 38 / 190 / 299` and earlier restart counts remain history only.

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
2. current evidence-gated maintenance targets are Issue #303 AFX Trade, #279 XRPL-TX follow-up, #299 Nerve first-party enrichment, #171 Boltz shutdown signal, and #270 Oraichain cross-chain signal;
3. PRs #319–#322 are review-only authority/audit work and do not change the `38 / 40 / 193 / 311` canonical/public baseline;
4. preserve canonical/schema semantics and every permanent release/source-quality guard;
5. do **not** invent a Ledger Series Stage 9;
6. for the cross-series roadmap, read the latest authority in the target repository before starting work. `docs/ai-era-registry-spec.md` names **SOG** as the next series after the completed BIR pilot.
