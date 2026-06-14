# First Ten Seed Records Audit — 2026-06-15

## Scope

This audit covers the first ten bridge entities and every incident, event, and evidence record linked to them.

```text
Bridges    10
Incidents  12
Events     34
Evidence   47
```

## Automated checks

The repeatable audit verifies:

- expected bridge IDs `bir_bridge_000001` through `bir_bridge_000010`
- bridge → incident → event → evidence reference consistency
- `major_incident_count` against actual major incident records
- `has_unresolved_incident` against incident outcomes
- reimbursement-history flags against modeled reimbursement states
- terminal bridge end dates and terminal reasons
- bridge status against the latest incident outcome
- incident `source_count` against linked evidence records
- minimum two evidence records per incident
- tier-1 or primary-source coverage
- amount-claim and conflicting-claim source ownership
- event source counts against available incident/event evidence

## Correction made

THORChain's bridge-level status was changed from `limited` to `paused`.

The official site and the latest reviewed restart update continued to describe normal trading as temporarily paused. The bridge entity is therefore now explicit about its current state instead of using the broader `limited` category.

## Blocking result

Expected after the correction:

```text
Structural errors  0
```

A structural error fails CI and prevents merge.

## Non-blocking quality warnings

The following remain visible but do not block this audit PR:

1. Wormhole's incident record has no tier-1 or primary evidence source in the current seed.
2. Nomad's incident record has no tier-1 or primary evidence source in the current seed.
3. Nomad's bridge-level reimbursement-history flag is not yet expanded into a definite incident reimbursement status.
4. Harmony Horizon's bridge-level reimbursement-history flag is not yet expanded into a definite incident reimbursement status.
5. THORChain's parent bridge status is now `paused`, while the incident-level `current_outcome` remains `limited_after_incident`; a dedicated current-status evidence/event update should normalize the incident enum later.

## Follow-up queue

These warnings belong in the aftermath/source-enrichment phase rather than blocking the first-ten structural audit.

Recommended order:

1. add a primary Wormhole incident/postmortem source
2. add a primary Nomad technical or official incident source
3. expand Nomad recovery and reimbursement history
4. expand Harmony recovery and reimbursement history
5. add a current THORChain restart-status event/evidence pair and align the incident outcome enum

## CI integration

The audit is available through:

```text
npm run audit:first-ten
```

It is also part of the standard `Check` workflow, after canonical validation and before the static build.
