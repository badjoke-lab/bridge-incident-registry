# BIR Ledger Series Phase 2 — Stage 6 Compare design audit

Date: 2026-08-17

## Authority reviewed

- `docs/ai-era-registry-spec.md`
- `docs/ai-era-execution-schedule.md`
- `docs/operations/current-schedule.md`
- Stage 4 canonical per-record JSON contract
- Stage 5 structured-filter audit and implementation

## Decision

Stage 6 is a single public `/compare/` surface with two deterministic modes:

1. incident vs incident
2. bridge vs bridge

The comparison reads the already-published canonical-only record dossiers under `/data/incident/{slug}.json` and `/data/bridge/{slug}.json`. It does not create a second derived database and does not call an AI model.

## Incident comparison boundary

The incident view prioritizes the lifecycle fields required by the AI-era specification:

- incident date and bridge identity/type
- incident type and attack category
- reported loss and amount confidence
- recovery status and recorded recovery amounts where an event explicitly contains `recovered_amount_text`
- counts of evidence records explicitly marked as supporting recovery or reimbursement
- reimbursement status
- restart status
- current outcome and unresolved state
- affected chains/assets
- postmortem availability
- lifecycle-event and evidence counts
- known unknowns
- last verification date

Missing values render as `Unknown`; an absent recorded recovery amount renders as `None recorded`. No amount is inferred from prose or from unrelated fields.

## Bridge comparison boundary

The bridge view compares:

- bridge type and current status
- primary chains
- launch/end dates and terminal reason
- major-incident and unresolved-incident state
- reimbursement-history state
- distinct recovery/reimbursement/restart/current-outcome states across canonical related incidents
- related incident/event/evidence counts
- record maturity and last verification date

The related incident states are deterministic set aggregations over canonical incident fields. They are not rankings or generated conclusions.

## Shareability and identity

A comparison is reproducible through URL state:

```text
/compare/?kind=incident&left={slug}&right={slug}
/compare/?kind=bridge&left={slug}&right={slug}
```

The client verifies each fetched dossier is `canonical_only`, has the requested `record_type`, and has the requested slug before rendering.

## Publication integration

`/compare/` is a canonical indexable HTML route. Stage 6 therefore updates the same route set in:

- navigation
- sitemap publication
- discovery validation
- dist consistency
- SEO validation
- production verification

This intentionally prevents a repeat of the earlier verifier/sitemap route-count drift.

## Validation

The Chromium / Firefox / WebKit compatibility smoke must exercise both incident and bridge comparisons using real dossier endpoints, verify the result table is rendered, verify the dossier links, and verify the selected pair is represented in URL state.

## Non-goals

- no similarity or safety ranking
- no generated summary of which record is "better" or "worse"
- no inferred recovery or reimbursement amount
- no cross-type bridge-vs-incident comparison
- no schema change
- no canonical record mutation
