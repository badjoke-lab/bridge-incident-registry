# Canonical-Derived Public Output Pipeline

Status: internal staging foundation

## Purpose

This pipeline derives one intermediate representation from the reviewed canonical datasets before any machine-readable endpoint is published.

PR 2 writes only to `.generated/public-data/`. That directory is ignored by Git and is not deployed from `public/`.

## Inputs

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

Paths and contract constants are defined in `config/public-data.json`.

## Staging output

```text
.generated/public-data/registry-meta.json
.generated/public-data/bridges.json
.generated/public-data/incidents.json
.generated/public-data/events.json
.generated/public-data/evidence.json
.generated/public-data/reference/chains.json
.generated/public-data/reference/assets.json
```

## Derived metadata

The generator calculates record counts, latest verification date, generated time, schema version, canonical origin, and the `canonical_only` marker.

Counts come directly from the canonical arrays.

## Timestamp precedence

1. `SOURCE_DATE_EPOCH`
2. `PUBLIC_GENERATED_AT`
3. `CF_PAGES_BUILD_TIMESTAMP`
4. `BUILD_TIMESTAMP`
5. current build time

Invalid explicit timestamps fail generation.

## URL derivation

`PUBLIC_SITE_ORIGIN` overrides the origin in `config/public-data.json`.

Generated bridge and incident records receive human-page links. Event and evidence records receive linked bridge and incident page URLs where applicable. Source canonical JSON is not modified.

## Build integration

`npm run public:build` creates staging output.

`npm run build` runs the generator through the npm `prebuild` hook before Astro builds the static site.

## Boundary

This stage does not publish `/version.json`, `/data/manifest.json`, record JSON endpoints, `llms.txt`, or `ai.txt`. Public exposure remains PR 3.
