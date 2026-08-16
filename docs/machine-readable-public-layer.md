# Bridge Incident Registry — Machine-Readable Public Layer

Status: implemented and extended with deterministic per-record dossiers

## Canonical source

The public layer is generated from the reviewed canonical datasets only:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

Generated files are not independent data sources. They are build products.

## Public endpoints

Aggregate and discovery endpoints:

```text
/version.json
/data/manifest.json
/data/bridges.json
/data/incidents.json
/data/events.json
/data/evidence.json
/data/reference/chains.json
/data/reference/assets.json
/llms.txt
/ai.txt
```

Deterministic per-record endpoints:

```text
/data/bridge/{slug}.json
/data/incident/{slug}.json
```

Every reviewed canonical bridge and incident receives exactly one dossier at build time.

## Version metadata

`/version.json` contains:

- project and registry identifiers
- schema version
- generated time
- latest verified record date
- canonical origin
- verification marker
- canonical-only marker
- record counts

## Manifest metadata

`/data/manifest.json` contains the version metadata plus:

- primary, supporting, and reference record types
- absolute aggregate endpoint URLs
- per-record endpoint patterns
- human-page URL patterns
- public-data safety markers

## Aggregate public records

Bridge records add:

```text
canonical_page_url
canonical_data_url
record_data_url
```

Incident records add:

```text
canonical_page_url
bridge_page_url
canonical_data_url
record_data_url
```

Event and evidence records add linked bridge and incident page URLs where applicable.

These fields are derived during the build. They are not duplicated in source canonical JSON.

## Per-record dossiers

A bridge dossier contains:

- dossier metadata and self/canonical URLs
- the reviewed bridge record
- all reviewed incidents linked to that bridge
- all reviewed events linked to that bridge
- all reviewed evidence linked to that bridge
- deterministic related-record counts

An incident dossier contains:

- dossier metadata and self/canonical URLs
- the reviewed incident record
- its reviewed bridge record
- all reviewed events linked to that incident
- all reviewed evidence linked to that incident
- deterministic related-record counts

Dossiers preserve canonical array order for related records. They do not infer missing recovery, reimbursement, restart, loss, or outcome facts.

## Guidance files

`/llms.txt` is the detailed guide for language models and other automated readers.

`/ai.txt` is a shorter machine-readable entry guide.

Both identify the canonical origin, aggregate public endpoints, per-record JSON patterns, human page patterns, and the registry's historical and non-ranking nature.

## Build path

```text
npm run public:stage
npm run public:publish
npm run public:check
```

`npm run public:build` runs all three in order.

`npm run build` invokes `public:build` through the npm `prebuild` hook and then builds the Astro site.

## Validation

`npm run public:check` verifies every generated bridge and incident dossier against the canonical-derived public records. It checks:

- one dossier for every reviewed bridge and incident
- record ID, slug, record type and schema/verification metadata
- canonical/self URLs
- exact primary-record equality
- exact related-record ID order
- deterministic related-record counts
- canonical-only markers
- manifest and guide discovery patterns

## Generated-file policy

The generated files under `public/` and `.generated/` are ignored by Git. They are recreated from canonical JSON during each build.

This prevents generated output from becoming a second manually maintained source of truth.

## Safety boundary

The generator reads only the paths declared in `config/public-data.json`.

The manifest marks the public layer as canonical-only. Candidate collection, monitoring output, temporary working files, and other non-canonical material are outside the public generation path.

Recovery, reimbursement and restart remain distinct lifecycle concepts in both aggregate and per-record output. Unknown or unresolved facts remain explicit rather than being inferred.