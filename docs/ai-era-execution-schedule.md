# BIR AI-era Execution Schedule

Status: Ledger Series Phase 2 active

> Naming note: "Ledger Series Phase 2" means the cross-series BIR horizontal-strengthening phase. It is separate from BIR's older internal Phase 2/3/4/5 roadmap numbering in `docs/runbooks/development-roadmap.md` and `docs/operations/current-schedule.md`.

## Order and audited status
1. **Ongoing maintenance track** — Continue current approved BIR record/research/operations work without allowing routine record growth to displace this horizontal roadmap.
2. **Complete baseline audit** — Representative aftermath work and the full-corpus audits already cover containment, recovery, reimbursement, reopening/restart and evidence-quality boundaries. See `docs/audits/ledger-series-phase2-baseline-2026-08-17.md` and the existing Phase 3 aftermath audits.
3. **No schema expansion currently required** — Existing incident/event/evidence fields can represent the reviewed lifecycle facts needed for this phase. Add schema only if a later reviewed fact cannot be represented safely.
4. **Complete — Stage 4** — Deterministic per-record JSON is integrated with the existing machine-readable public layer. PR #285 added canonical-derived `/data/bridge/{slug}.json` and `/data/incident/{slug}.json` dossiers plus discovery/manifest integration. PR #286 fixed the production verifier's missing `/support/` sitemap expectation without relaxing strict equality. Main Release Readiness then passed production equality for the 80 canonical HTML routes and the record-level JSON surface.
5. **NEXT — Stage 5** — Audit and implement only the remaining useful structured-filter facets. Existing incident search/filtering already covers incident type, attack category, recovery, reimbursement, restart, outcome, unresolved state, dates and loss. Add only supported explicit gaps such as chain and bridge/type facets where the current public controls do not already expose them; do not duplicate existing controls.
6. **Unimplemented — Stage 6** — Implement incident/bridge Compare focused on aftermath and outcomes.
7. **Unimplemented — Stage 7** — Implement Stats for loss/recovery/reimbursement, attack vectors, chain distribution, response timelines and data quality.
8. **Later in Phase 2 — Stage 8** — Execute a bounded reviewed post-incident follow-up batch after deterministic query/Compare/Stats surfaces exist. Earlier aftermath enrichment remains valid historical work; routine maintenance is not a blocker for Stages 5–7.
9. **Deferred to Ledger Series Phase 10** — Natural-language-to-filter translation is not a BIR Phase 2 closure requirement and may never bypass canonical filters or evidence.

## Gate
Spec -> implementation PR -> validation/CI green -> merge -> production verification where applicable -> docs/status sync.

## Phase completion boundary
BIR Ledger Series Phase 2 is complete only when Stages 5–8 are completed or explicitly closed by an audited no-op decision, production verification has passed for public changes, and this schedule plus a completion audit are synchronized on `main`.

## Mandatory continuation rule
Future BIR work must read this schedule and `ai-era-registry-spec.md` together with the relevant existing canonical, operations and machine-readable specifications. Routine monitoring/candidate work remains the vertical maintenance track and must not silently replace the horizontal Ledger Series phase.
