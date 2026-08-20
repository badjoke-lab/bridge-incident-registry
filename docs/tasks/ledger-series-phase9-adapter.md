# Ledger Series Phase 9 — BIR Series adapter

Status: active bounded implementation authority  
Opened: 2026-08-20

## Naming boundary

This task does **not** create or reopen a BIR-local "Ledger Series Stage 9". BIR Ledger Series Phase 2 remains complete. This task implements the separate cross-registry **Ledger Series Phase 9** contract frozen in `badjoke-lab/historical-exchange-index` Issue #780.

## Scope

Publish a lossless, canonical-only Series v1 adapter above BIR's existing native machine layer without changing canonical bridge/incident/event/evidence semantics.

Required public paths:

- `/data/series/registry.json`
- `/data/series/index.json`
- `/data/series/records/bridge--{slug}.json`
- `/data/series/records/incident--{slug}.json`

The adapter must preserve BIR's two native dossier types (`bridge`, `incident`) rather than flattening them.

## Mapping boundary

- Series global keys: `bridge-incident-registry:<native-record-type>:<native-id>`.
- Bridge identity uses native `canonical_name`.
- Incident identity uses native `title`.
- Human and native-machine URLs come from the existing native dossier metadata.
- `current_state.status` uses native bridge `status` or incident `current_outcome` without reinterpretation.
- The complete native bridge/incident record remains available under `current_state.native.record` so the adapter does not silently discard canonical fields.
- Bridge related incident IDs and incident parent bridge identity remain native facts during Stage 3.
- Events and evidence remain inline from the native dossier.
- Typed bridge↔incident, predecessor, successor, replacement, duplicate, merge, or split Series relationships are **not** emitted during Stage 3. Review and promotion belong to Ledger Series Phase 9 Stage 5.

## Public capability routes

Use only routes that exist in BIR:

- structured incident search/filter: `/incidents/`
- Compare: `/compare/`
- Stats: `/stats/`

## Verification and safety

- native `generated_at`, `latest_verified_at`, `verification_marker`, and schema metadata may be propagated;
- do not fabricate a Git commit/data revision that the native machine layer does not expose;
- `canonical_only=true`;
- exclude candidates, monitoring output, private notes, and AI-generated canonical facts;
- no canonical data/schema/taxonomy changes;
- no weakening of source-quality, accessibility, performance, browser, dist-consistency, or production-equality gates.

## Build integration

BIR's `publish-machine-data.mjs` deletes and rebuilds `public/data`, so Series generation must run **after** native machine publication. The permanent build order is:

1. native public-data generation;
2. native machine publication;
3. Series adapter publication;
4. remaining discovery/redirect publication;
5. native and Series validation;
6. existing release checks/build.

Generated Series files are build output, not hand-maintained canonical records.

## Gate

Task authority -> implementation -> existing Check green -> merge -> exact-main production verification of descriptor/index and representative bridge/incident envelopes -> coordination evidence in HEI Issue #780.
