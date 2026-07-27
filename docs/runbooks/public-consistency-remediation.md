# Bridge Incident Registry — Public Consistency Remediation

Status: active  
Updated: 2026-07-28

## Canonical baseline

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

Canonical JSON remains the only record source. Generated public files are build products. Batch 6 remains paused through production verification.

## Progress

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete when merged
PR 7  Production verification                next
```

## PR 6 result

The final `dist` tree is checked against canonical data after the Astro build.

The gate compares:

- canonical and published record counts
- canonical and published ordered IDs
- version and manifest canonical-only metadata
- bridge, incident, event, evidence, chain, and asset JSON
- required static and record-detail HTML routes
- exact bridge and incident slug route sets
- canonical links, production robots metadata, alternate discovery links, and JSON-LD identifiers
- displayed counts on home and collection pages
- sitemap URLs, robots policy, response headers, and generated redirects
- documentation count blocks
- the publication boundary for staging, research, candidates, watchlists, private files, and unexpected data formats

Controlled fixtures intentionally corrupt count, ID, metadata, route, sitemap, and publication-boundary output and require every corruption to fail.

## PR 7 — next

Verify production HTML, JSON, metadata, routes, redirects, response headers, and cache behavior, then publish the final audit report.

## Resume rule

Batch 6 resumes only after PR 7. Compare the parked branch with latest main before any canonical write.
