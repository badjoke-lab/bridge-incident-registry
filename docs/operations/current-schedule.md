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
5. **Complete — Stage 6** — PR #290 implemented canonical `/compare/` modes for incident-vs-incident and bridge-vs-bridge comparisons using Stage 4 dossiers. Compare preserves unknown values and recovery/reimbursement/restart/current-outcome boundaries, uses reproducible URL state, validates canonical dossier identity, and passed exact-head performance/accessibility/dist/Chromium/Firefox/WebKit checks. The post-merge Release Readiness rerun passed production registry equality for 81 canonical HTML routes after the Git-integrated deployment became live.
6. **Complete — Stage 7** — PR #292 implemented deterministic canonical-derived `/stats/` for loss/recovery/reimbursement, attack-vector, chain-distribution, response-timeline and data-quality analysis without generated ranking or unsupported inference. Navigation, sitemap/discovery, SEO, accessibility, performance, dist consistency and Chromium/Firefox/WebKit checks passed. Main Release Readiness then passed production registry equality for 82 canonical HTML routes.
7. **Active — Stage 8** — one bounded reviewed post-incident follow-up pass. The bounded audit identified two existing full-corpus warnings that are supportable from already-canonical first-party evidence: `bir_inc_000015` needs a discrete `reimbursement_completed` event and `bir_inc_000035` needs a discrete `bridge_reopened` event. No additional incident expansion is part of this Stage 8 batch.
8. **Deferred** — natural-language-to-filter translation belongs to Ledger Series Phase 10.
9. **Closeout** — apply and validate the bounded Stage 8 canonical event fixes, production-verify, synchronize the completion audit, then move the cross-series roadmap to SOG.

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

Two current full-corpus warnings are non-blocking review signals but are now reviewed Stage 8 targets: `bir_inc_000015` lacks a discrete reimbursement-completed event for its completed state, and `bir_inc_000035` lacks a discrete bridge-reopened event for its reopened state. Existing canonical first-party evidence supports both missing lifecycle events; the Stage 8 canonical batch must add only those discrete events and the minimum event-scoped evidence needed to preserve exact source-count semantics.

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

1. apply the bounded Stage 8 lifecycle-event batch for `bir_inc_000015` and `bir_inc_000035` only;
2. preserve recovery/reimbursement/restart distinctions and exact event/evidence source-count semantics;
3. run canonical/schema/full-corpus/source-quality/build/accessibility/performance/browser gates;
4. merge only if the two lifecycle warnings are resolved without widening any quality ceiling;
5. production-verify the resulting canonical/public output;
6. synchronize the Ledger Series Phase 2 completion audit and close the BIR horizontal phase;
7. keep routine monitoring/candidate work parallel and review-only, without allowing it to displace closeout unless a high-severity correction requires intervention.
