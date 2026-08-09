# Phase 3 Validator Strengthening — Cross-Record Bridge Integrity

Date: 2026-08-09

## New blocking invariants

- an event linked to an incident must use the same `bridge_id` as that incident;
- evidence linked to an incident must use the same `bridge_id` as that incident;
- evidence linked to an event must use the same `bridge_id` as that event.

These checks close a relational-integrity gap that became more important as event-scoped evidence copies were added. Existing canonical data must pass all three invariants with zero exceptions.

## Controlled failure coverage

Three new fixtures deliberately introduce each mismatch independently and require `audit:full-corpus` to fail. Existing eight controlled failure fixtures remain unchanged.

## Scope

Validator/test/audit documentation only. No canonical JSON, counts, source-quality ceilings, routes, runtime behavior, or production publication semantics change.
