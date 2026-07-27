# Schema and enum reconciliation — 2026-07-28

Status: implementation baseline

## Purpose

This audit records the enforcement boundary between the documented BIR v0.3 schema and the current reviewed canonical corpus before Phase 2 Batch 6.

## Result

The combined validators continue to enforce already-normalized bridge, metadata, reference, source-tier, URL-state, and amount-confidence vocabularies. A new migration gate now inventories fields whose current canonical values predate or extend the final v0.3 target vocabulary.

The migration gate rejects missing, empty, or malformed tokens, but it does not silently rewrite historically reviewed classifications.

## Strictly enforced vocabularies

- bridge type
- bridge status
- record maturity
- update status
- confidence
- date precision
- amount confidence
- source tier
- evidence URL status

## Target-vocabulary migration fields

The following fields are not yet safe to convert to closed enums without a dedicated canonical-data migration:

- `bridge.official_url_status`
- `bridge.operator_type`
- `incident.incident_type`
- `incident.recovery_status`
- `incident.reimbursement_status`
- `incident.restart_status`
- `incident.current_outcome`
- `incident.attack_vector_category`
- `incident.postmortem_available`
- `incident.loss_amount_basis`
- `event.event_type`
- `event.impact_level`
- `event.status_effect`
- `event.reimbursement_status`
- `event.restart_status`
- `evidence.source_type`
- `evidence.claim_scope`

Current records include descriptive or earlier-generation values that predate the final v0.3 vocabulary. The validator requires these values to be non-empty snake-case tokens where applicable and reports values outside the target vocabulary as migration warnings.

Examples confirmed during this audit include `frontend_compromise`, `attempted_exploit`, `none_confirmed`, `partial_reopen`, `attack_thwarted`, and `whitehat_recovery`.

## Safety boundary

This PR does not rewrite canonical incident history or silently map descriptive legacy classifications to stronger technical claims. Batch 6 must use the documented target vocabulary wherever the underlying evidence supports it.

## Follow-up

A later dedicated canonical migration must:

1. enumerate every legacy value;
2. map only semantically equivalent values;
3. preserve uncertain values as `unknown` rather than guessing;
4. update SPEC and UI labels in the same bounded workstream;
5. pass canonical, dist, controlled-failure, and production checks.
