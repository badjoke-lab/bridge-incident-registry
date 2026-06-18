# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-06-19

## Project state

Canonical record expansion is paused while the public-consistency remediation is in progress.

Five reviewed expansion batches and the Phase 2 Batch 6 scope are complete.

## Canonical source and counts

```text
data/bridges.json       26
data/incidents.json     27
data/events.json        123
data/evidence.json      148
```

These reviewed files remain the only source of public record content and counts.

## Remediation progress

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete when merged
PR 4  Canonical metadata and discovery       next
PR 5  Legacy redirects                       blocked by PR 4
PR 6  Post-build consistency CI              blocked by PR 5
PR 7  Production verification                blocked by PR 6
```

## Machine-readable public layer

The build now stages canonical-derived records, publishes them under `public/`, checks counts and IDs, and then runs the Astro build.

Published paths:

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

The version and manifest include:

- project and registry identifiers
- schema version
- generated time
- latest verified date
- canonical origin
- verification marker
- canonical-only marker
- record counts

The manifest also declares endpoint URLs, record types, human-page patterns, and the canonical-only safety boundary.

Public bridge and incident records link to their human pages. Event and evidence records link to bridge and incident pages where applicable.

Generated files are ignored by Git and recreated during each build.

## Checks added in PR 3

`npm run public:check` verifies:

- version and manifest counts
- schema, origin, verification marker, and canonical-only flags
- public record ID order against canonical data
- public bridge and incident page URLs
- reference dictionaries
- machine guidance files

Full HTML, sitemap, redirect, and `dist` cross-checking remains PR 6 work.

## Next

PR 4 adds:

- canonical HTML links
- alternate JSON discovery
- Open Graph metadata
- JSON-LD
- sitemap
- robots policy
- preview noindex behavior
- human-visible machine-data discovery

## Record-expansion hold

`phase2-batch6-records` remains parked. Batch 6 implementation may resume only after PR 7 verifies production HTML and machine-readable output.
