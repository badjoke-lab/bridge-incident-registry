# BIR implementation schedule

Status: active maintenance — Ledger Series Phase 2 complete  
Updated: 2026-08-20

The authoritative BIR maintenance roadmap is `docs/runbooks/development-roadmap.md`; the restart point is `docs/runbooks/recovery-checkpoint.md`. The Ledger Series horizontal roadmap is governed by `docs/ai-era-execution-schedule.md` and `docs/ai-era-registry-spec.md`.

## Naming boundary

BIR's historical internal Phase 0–5 numbering, the completed BIR **Ledger Series Phase 2** horizontal work, and the cross-series **Ledger Series Phase 9 adapter** are separate. Phase 9 does not create or rename a BIR “Stage 9”.

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
- Ledger Series Phase 9 — BIR adapter/public-contract integration: **complete and production-verified**

## Current canonical baseline

```text
Bridges     39
Incidents   41
Events      194
Evidence    316
```

This is current canonical and production-verified truth. The latest canonical maintenance addition is the Verus-Ethereum Bridge July 2026 incident in PR #330. Read-only production verification PR #332 / run `32334410535` / job `96321019010` passed native and Series equality on attempt 1 at this baseline: 88 canonical HTML routes, 80 redirects, 39/39 bridge dossiers, 41/41 incident dossiers, 80 Series records, 82 Series JSON files, and 80 unique global keys. Production `generated_at` was `2026-08-20T05:06:43.792Z`.

Historical Stage 8 `36 / 38 / 190 / 299`, ChainConnect `38 / 40 / 193 / 311`, and earlier restart counts remain history only.

## Ledger Series Phase 2 execution

1. **Complete** — baseline audit and schedule synchronization, PR #284.
2. **Complete decision** — no lifecycle schema expansion required at the audited boundary.
3. **Complete — Stage 4** — deterministic per-record bridge and incident JSON, PRs #285–#286.
4. **Complete — Stage 5** — bounded incident-filter delta, PR #288.
5. **Complete — Stage 6** — canonical `/compare/`, PR #290.
6. **Complete — Stage 7** — canonical-derived `/stats/`, PR #292.
7. **Complete — Stage 8** — PR #294 added only the reviewed discrete `reimbursement_completed` event for `bir_inc_000015` and `bridge_reopened` event for `bir_inc_000035`, plus the minimum supporting event-scoped evidence.
8. **Resolved publication checkpoint** — PRs #295–#296 preserved the approved canonical delta while external Git-integrated deployment caught up; main V1 Release Readiness run `32041737878` passed the then-current production equality.
9. **Complete — closeout** — completion evidence is `docs/audits/ledger-series-phase2-completion-2026-08-18.md`.
10. **Deferred** — natural-language-to-filter translation remains a Ledger Series Phase 10 concern.

## Ledger Series Phase 9 adapter checkpoint

- **Implementation complete** — PR #327 publishes deterministic Series descriptor, index and bridge/incident envelopes without replacing native BIR routes.
- **Production proof complete** — PR #332 / run `32334410535` verified the exact post-Verus main at 80 Series records across 82 JSON files and 80 unique global keys, alongside the unchanged native production verifier.
- **Boundary unchanged** — native canonical JSON remains authoritative; Series is a derived public adapter and does not auto-promote monitoring/research material.

## Current quality checkpoint

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

## Permanent release boundary

- monitoring never writes canonical records automatically;
- secondary discovery sources only create review candidates;
- unchanged monitoring state is silent;
- unknown URL status and broken canonical references are blocking;
- source-quality gap ceilings may decrease but must not increase without review;
- high-severity npm audit findings are blocking;
- accessibility, performance, Chromium/Firefox/WebKit, dist consistency and Series adapter consistency remain release gates where applicable;
- production verification is required for canonical/public output changes;
- technical closure does not create or imply a GitHub Release or semantic-version tag.

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file.

## Immediate execution order

1. keep BIR in steady-state reviewed maintenance: monitoring, evidence health, high-severity corrections, and properly reviewed new incidents;
2. current evidence-gated maintenance targets are Issue #331 Verus May, #303 AFX Trade, #279 XRPL-TX follow-up, #299 Nerve first-party enrichment, #171 Boltz shutdown signal, and #270 Oraichain cross-chain signal;
3. preserve the strict separation between the canonical July Verus case and the separate May review target;
4. preserve canonical/schema semantics and every permanent release/source-quality guard;
5. do **not** invent a BIR/Ledger Series Stage 9; Phase 9 here is the already-implemented cross-series adapter;
6. for the cross-series roadmap, read the latest authority in the target repository before starting work. `docs/ai-era-registry-spec.md` names **SOG** as the next series after the completed BIR pilot.
