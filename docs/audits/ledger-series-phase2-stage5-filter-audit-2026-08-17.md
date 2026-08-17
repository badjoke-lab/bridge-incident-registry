# BIR Ledger Series Phase 2 — Stage 5 structured-filter audit

Date: 2026-08-17  
Scope: remaining structured-filter delta after Stage 4 record-level JSON

## Authority reviewed

- `docs/ai-era-registry-spec.md`
- `docs/ai-era-execution-schedule.md`
- `docs/operations/current-schedule.md`
- existing bridge/incident list UI and client-side filter implementation

## Existing controls before Stage 5

### Bridge list
Already explicit and implemented:

- bridge type
- bridge status
- primary chain
- major-incident presence
- unresolved-incident presence
- reimbursement-history presence
- text search and sorting

No additional bridge-list facet is required for Stage 5 at this boundary.

### Incident list
Already explicit and implemented:

- incident type
- attack category
- recovery status
- reimbursement status
- restart status
- current outcome
- resolved/unresolved state
- incident date range
- reported-loss buckets
- text search and sorting

Text search already includes bridge name and affected-chain labels, but search text is not a deterministic replacement for an explicit structured facet.

## Confirmed remaining gap

The AI-era specification calls for structured chain and bridge/type filtering where supported. The incident list lacked both explicit facets even though canonical data already provides the required relationships:

1. `affected_chains[]` on incidents
2. `incident.bridge_id -> bridge.type` through the canonical bridge entity

No schema expansion or inferred field is required.

## Stage 5 implementation boundary

Add exactly two incident facets:

- **Affected chain** — values come only from reviewed `incident.affected_chains` keys and display through the existing chain reference dictionary.
- **Bridge type** — values come only from reviewed canonical bridge entities referenced by each incident's `bridge_id`.

The client filter uses exact normalized values, persists them in URL query state, and keeps pagination/reset behavior unchanged.

## Validation boundary

The existing Chromium / Firefox / WebKit release smoke is extended to:

- select a real affected-chain option and verify every visible incident row contains that normalized chain key;
- select a real bridge-type option and verify every visible incident row matches that exact bridge type;
- verify each selected facet is persisted in the URL state.

## Non-goals

Stage 5 does not add:

- duplicate controls for already explicit incident fields;
- generated classifications;
- natural-language filtering;
- risk scores;
- canonical data changes;
- new bridge/incident schema fields.
