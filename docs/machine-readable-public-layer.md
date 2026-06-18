# Bridge Incident Registry — Machine-Readable Public Layer

Status: implemented in public-consistency remediation PR 3

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
- absolute endpoint URLs
- human-page URL patterns
- public-data safety markers

## Public records

Bridge records add:

```text
canonical_page_url
canonical_data_url
```

Incident records add:

```text
canonical_page_url
bridge_page_url
canonical_data_url
```

Event and evidence records add linked bridge and incident page URLs where applicable.

These fields are derived during the build. They are not duplicated in source canonical JSON.

## Guidance files

`/llms.txt` is the detailed guide for language models and other automated readers.

`/ai.txt` is a shorter machine-readable entry guide.

Both identify the canonical origin, public data endpoints, human page patterns, and the registry's historical and non-ranking nature.

## Build path

```text
npm run public:stage
npm run public:publish
npm run public:check
```

`npm run public:build` runs all three in order.

`npm run build` invokes `public:build` through the npm `prebuild` hook and then builds the Astro site.

## Generated-file policy

The generated files under `public/` and `.generated/` are ignored by Git. They are recreated from canonical JSON during each build.

This prevents generated output from becoming a second manually maintained source of truth.

## Safety boundary

The generator reads only the paths declared in `config/public-data.json`.

The manifest marks the public layer as canonical-only. Candidate collection, monitoring output, temporary working files, and other non-canonical material are outside the public generation path.

## Current limits

PR 3 does not yet add:

- HTML canonical links
- alternate discovery links
- Open Graph metadata
- JSON-LD
- sitemap
- robots policy
- legacy redirects
- full post-build HTML and route comparison

Those controls are added in remediation PRs 4 through 6.
