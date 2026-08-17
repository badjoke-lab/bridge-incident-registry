# BIR implementation schedule

Status: active maintenance + Ledger Series Phase 2  
Updated: 2026-08-17

The authoritative BIR maintenance roadmap is `docs/runbooks/development-roadmap.md`; the restart point is `docs/runbooks/recovery-checkpoint.md`. The Ledger Series horizontal roadmap is governed by `docs/ai-era-execution-schedule.md` and `docs/ai-era-registry-spec.md`.

## Naming boundary

BIR's historical internal Phase 0–5 numbering and the cross-series **Ledger Series Phase 2** are separate. Ledger Series Phase 2 means BIR's AI-era horizontal strengthening; it does not rename or reopen the completed internal BIR phases.

## Existing BIR schedule

- Internal Phase 0 — specification and foundation: complete
- Internal Phase 1 — canonical model, UI, validation, and seeds: complete
- Internal Phase 2 — record expansion: complete through the established batches
- Internal Phase 3 — full-corpus quality strengthening: active research-triggered maintenance
- Internal Phase 4 — public contract stabilization: complete
- Internal Phase 5 — monitoring and candidate collection: steady-state live
- Release — v1 hardening/technical closure: complete
- Maintenance — reviewed canonical/candidate expansion: active

## Current canonical baseline

```text
Bridges     36
Incidents   38
Events      188
Evidence    297
```

TAC Inner Bridge was added before the XRPL-TX Bridge August 2026 incident. XRPL-TX canonical application is PR #275 and its production verification is PR #276. Any older `34 / 36 / 185 / 293` restart text is a historical Syscoin-era checkpoint, not current canonical truth.

## Ledger Series Phase 2 execution

1. **Complete** — baseline audit and schedule synchronization, PR #284.
2. **Complete decision** — no lifecycle schema expansion required at the audited boundary; existing recovery/reimbursement/restart/outcome/evidence fields are sufficient.
3. **Complete — Stage 4** — deterministic per-record bridge and incident JSON, PR #285. PR #286 repaired the production verifier's stale 79-route expectation by adding `/support/`; strict sitemap equality remained intact. Main Release Readiness subsequently passed production equality for the 80 canonical HTML routes and the record-level JSON endpoints.
4. **Complete — Stage 5** — PR #288 audited the existing filters and added only explicit incident Affected chain and Bridge type facets. Bridge Type/Primary chain and existing incident type/attack/recovery/reimbursement/restart/outcome/resolution/date/loss controls were already implemented and were not duplicated. PR exact-head checks, Chromium/Firefox/WebKit interaction tests, screenshots, and post-merge production equality passed.
5. **Active next — Stage 6** — implement deterministic incident/bridge Compare focused on aftermath and outcome differences while preserving unknown values and the recovery/reimbursement/restart semantic boundaries.
6. **Pending — Stage 7** — Stats for loss/recovery/reimbursement, attack vectors, chain distribution, response timelines and data quality.
7. **Pending near closeout — Stage 8** — one bounded reviewed post-incident follow-up pass.
8. **Deferred** — natural-language-to-filter translation belongs to Ledger Series Phase 10.
9. **Closeout** — production verification plus schedule/completion-audit synchronization, then move the cross-series roadmap to SOG.

## Current quality checkpoint

```text
Primary evidence                  213 / 297
Tier 1 evidence                   230 / 297
Archived evidence                 130 / 297
Incidents without primary           1 / 38
Incidents without Tier 1            1 / 38
Events without primary             11 / 188
Events without Tier 1                6 / 188
Terminal unarchived URLs           15
Risky-host unarchived URLs         16
Unknown URL status                  0
Source-count mismatches              0
High-severity npm audit              0
```

Two current full-corpus warnings are non-blocking review signals: `bir_inc_000015` lacks a discrete reimbursement-completed event for its completed state, and `bir_inc_000035` lacks a discrete bridge-reopened event for its reopened state. They must not be auto-filled without evidence.

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

## Immediate execution order

1. implement deterministic incident/bridge Compare from canonical data, emphasizing aftermath/outcome fields rather than generic side-by-side metadata;
2. validate Compare selection/URL state and unknown-value behavior across Chromium/Firefox/WebKit;
3. production-verify the public Compare surface after merge;
4. implement Stats;
5. run the bounded aftermath follow-up and close Ledger Series Phase 2;
6. keep routine monitoring/candidate work parallel and review-only, without allowing it to displace the horizontal phase unless a high-severity correction requires intervention.
