# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

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
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete when this file reaches main
PR 7  Production verification                next
```

## Public representations now covered

The build derives and validates:

- human-facing HTML
- version and manifest metadata
- bridge, incident, event, evidence, chain, and asset JSON
- `llms.txt` and `ai.txt`
- canonical and alternate metadata
- Open Graph, Twitter, and JSON-LD metadata
- sitemap and robots policy
- Cloudflare response headers
- legacy route redirects

## Post-build consistency

The built `dist` tree is checked against canonical JSON after Astro completes.

The checker verifies:

- canonical record counts and ordered IDs in published JSON
- required static, bridge-detail, and incident-detail HTML routes
- canonical links, production robots metadata, discovery links, and JSON-LD identifiers
- home and registry-page count displays
- sitemap URL equality, robots policy, response headers, and generated redirects
- repository documentation count blocks
- exclusion of staging, research, candidate, watchlist, private, and unexpected JSON output

Controlled fixtures prove that count, ID, metadata, route, sitemap, and publication-boundary mismatches fail CI.

## Next

PR 7 verifies production HTML, JSON, metadata, routes, redirects, cache behavior, and publication headers, then records the final remediation audit.

## Record-expansion hold

Phase 2 Batch 6 implementation remains paused. The parked branch must not receive canonical writes until PR 7 completes production verification.
