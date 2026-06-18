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
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete when merged
PR 6  Post-build consistency CI              next
PR 7  Production verification                blocked by PR 6
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

## Legacy redirects

`public/_redirects` is generated from canonical `previous_slugs` and `redirect_from` arrays.

For each accepted legacy slug, both forms redirect permanently:

```text
/bridge/old-slug
/bridge/old-slug/
```

The same applies to incident routes.

The generator and checker reject invalid slugs, canonical-route collisions, conflicting destinations, self-redirects, missing canonical targets, loops, output drift, and legacy sitemap entries.

## Next

PR 6 adds post-build checks that inspect actual `dist` HTML and generated output, compare all counts and IDs, parse JSON-LD, verify documentation count blocks, and run intentional failure fixtures.

## Record-expansion hold

Phase 2 Batch 6 implementation remains paused. The parked branch must not receive canonical writes until PR 7 completes production verification.
