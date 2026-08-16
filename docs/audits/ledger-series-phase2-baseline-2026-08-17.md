# Ledger Series Phase 2 baseline audit — 2026-08-17

Status: complete  
Scope: BIR AI-era horizontal strengthening baseline

## Authority reviewed

- `docs/ai-era-registry-spec.md`
- `docs/ai-era-execution-schedule.md`
- `docs/operations/current-position.md`
- `docs/operations/current-schedule.md`
- `docs/machine-readable-public-layer.md`
- `docs/audits/phase3-aftermath-canonical-2026-07-28.md`
- current `main` tree, canonical validator and public implementation

## Baseline

The exact canonical validator on the current implementation branch reports:

```text
main lineage  38cbf7cb4e3f020352b525ae4ec1245291ddbe0f -> PR #284 merge 4ae084a2e8cb918bb84393617d3988fa2be931e5
Bridges       36
Incidents     38
Events        188
Evidence      297
```

The older `docs/operations/current-position.md` / `current-schedule.md` restart text still carried the pre-TAC/XRPL-TX `34 / 36 / 185 / 293` checkpoint when this audit began. That documentation is stale, not canonical truth. The canonical validator and the already production-verified TAC/XRPL-TX additions establish the current `36 / 38 / 188 / 297` baseline. Operational restart/schedule documentation must be synchronized without reverting the later canonical records.

BIR's existing internal roadmap remains authoritative for ordinary maintenance. Ledger Series Phase 2 is a separate horizontal feature/analysis track and must not redefine the older internal BIR phase numbers.

## Lifecycle model audit

No new schema fields are required before horizontal implementation.

Existing `IncidentCase` fields already represent:

- reported loss and amount confidence/basis
- recovery status
- reimbursement status
- restart status
- current outcome
- unresolved state and unresolved reasons
- affected chains/assets
- attack-vector category
- last reviewed / last verified

Existing `BridgeEvent` fields can preserve recovered amount text, reimbursement state and restart state. Existing `BridgeEvidence` fields can explicitly support recovery, reimbursement, reopen, shutdown and migration claims.

The July 2026 aftermath migration also already established semantic separation between recovery, reimbursement and reopening and added reviewed events for Ronin, Wormhole, Poly Network, BNB Chain, THORChain and Allbridge. Therefore Ledger Series Phase 2 must reuse these semantics rather than invent a parallel outcome model.

## Horizontal capability matrix

| Requirement | Baseline | Decision |
| --- | --- | --- |
| Full aftermath lifecycle model | implemented / usable | reuse existing schema and semantics |
| Provenance / uncertainty detail | implemented | preserve existing evidence/source-tier and unresolved boundaries |
| Aggregate machine-readable JSON | implemented | retain |
| Per-record bridge / incident JSON | unimplemented at audit start | **Stage 4 next implementation** |
| Structured incident filters | partial-to-strong | existing type, attack, recovery, reimbursement, restart, outcome, unresolved, date and loss controls; only add missing useful facets later |
| Compare | unimplemented | implement after record JSON / remaining filter pass |
| Stats | unimplemented | implement after Compare |
| Post-incident follow-up | substantial historical work exists | run one bounded new follow-up pass near Phase 2 closeout rather than turning the phase into endless record review |
| Natural-language search | not required | defer to Ledger Series Phase 10 |

## Machine-readable gap

At audit start the public layer publishes aggregate datasets:

```text
/data/bridges.json
/data/incidents.json
/data/events.json
/data/evidence.json
```

Public records point `canonical_data_url` back to those aggregate files. The baseline `scripts/build-public-data.mjs` does not generate per-slug bridge or incident dossiers. This is the first concrete horizontal implementation gap.

## Safety boundary

The next implementation must:

- derive record JSON only from reviewed canonical datasets;
- avoid a second hand-maintained source of truth;
- keep monitoring and `data-staging` out of public output;
- preserve existing canonical-only manifest guarantees;
- keep recovery distinct from reimbursement and bridge restart;
- keep unknown/unresolved values explicit rather than inferred;
- add validation for every generated dossier.

## Next work

Implement deterministic per-record JSON for reviewed bridges and incidents, integrate discovery into the existing manifest/guides, validate canonical equality and relationships, then run the normal CI/production gate before moving to the remaining structured-filter delta.