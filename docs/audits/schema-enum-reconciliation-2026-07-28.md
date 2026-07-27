# Schema and enum reconciliation — 2026-07-28

Status: implementation baseline

## Purpose

This audit records the enforcement boundary between the documented BIR v0.3 schema and the current reviewed canonical corpus before Phase 2 Batch 6.

## Result

The validator now treats normalized identity, lifecycle, incident outcome, evidence, and reference fields as closed vocabularies. Fields that still contain legacy descriptive values remain structurally validated and produce migration warnings rather than blocking canonical builds.

## Strictly enforced vocabularies

- bridge type
- bridge status
- record maturity
- update status
- confidence
- date precision
- incident type
- recovery status
- reimbursement status
- restart status
- current outcome
- amount confidence
- evidence source type
- source tier
- evidence URL status
- evidence claim scope

## Migration fields

The following fields are not yet safe to convert to closed enums without a dedicated canonical-data migration:

- `incident.attack_vector_category`
- `incident.postmortem_available`
- `incident.loss_amount_basis`
- `event.event_type`
- `event.impact_level`
- `event.status_effect`

Current records include descriptive or earlier-generation values that predate the final v0.3 vocabulary. The validator requires these values to be non-empty snake-case tokens where applicable and reports values outside the target vocabulary as warnings.

## Safety boundary

This PR does not rewrite canonical incident history or silently map descriptive claims to stronger classifications. Batch 6 must use the documented target vocabulary wherever the underlying evidence supports it.

## Follow-up

A later dedicated canonical migration must:

1. enumerate every legacy value;
2. map only semantically equivalent values;
3. preserve uncertain values as `unknown` rather than guessing;
4. update SPEC and UI labels in the same bounded workstream;
5. pass canonical, dist, controlled-failure, and production checks.
