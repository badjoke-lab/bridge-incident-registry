# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-06-19

## Canonical state

```text
data/bridges.json       26
data/incidents.json     27
data/events.json        123
data/evidence.json      148
```

Canonical record expansion is paused during public-consistency remediation.

## Remediation progress

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete when merged
PR 5  Legacy redirects                       next
PR 6  Post-build consistency CI              blocked by PR 5
PR 7  Production verification                blocked by PR 6
```

## Public data

The build publishes and validates:

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

Generated files derive from canonical JSON and are not independently maintained source data.

## Canonical metadata and discovery

PR 4 adds the following to every HTML page:

- production canonical URL
- meta description
- index or preview noindex policy
- manifest, version, and guidance alternate links
- optional page-specific JSON alternate link
- Open Graph metadata
- Twitter summary metadata
- JSON-LD page metadata

The homepage and bridge/incident detail pages also include dataset-oriented JSON-LD derived from canonical records.

Build output now generates:

```text
/sitemap.xml
/robots.txt
/_headers
```

The sitemap includes static pages and every canonical bridge and incident page. Record `last_verified_at` values supply detail-page `lastmod` values. Legacy slugs are excluded.

Preview builds receive both HTML `noindex, nofollow` metadata and a Cloudflare `X-Robots-Tag` response header.

## Next

PR 5 generates actual redirects from canonical `previous_slugs` and `redirect_from` fields, rejects loops and collisions, and verifies every target.

## Record-expansion hold

Phase 2 Batch 6 implementation remains paused. The parked branch must not receive canonical writes until PR 7 completes production verification.
