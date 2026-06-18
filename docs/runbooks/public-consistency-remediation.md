# Bridge Incident Registry — Public Consistency Remediation

Status: active  
Updated: 2026-06-19

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
PR 5  Legacy redirects                       complete when merged
PR 6  Post-build consistency CI              next
PR 7  Production verification                blocked by PR 6
```

## PR 5 result

The build generates `public/_redirects` from canonical `previous_slugs` and `redirect_from` fields.

Trailing and non-trailing legacy routes redirect permanently to current canonical pages.

Generation and checking reject invalid slugs, canonical-route collisions, conflicting destinations, self-redirects, missing targets, loops, output drift, and legacy sitemap entries.

## PR 6 — next

Compare canonical JSON, public JSON, version, manifest, built HTML, JSON-LD, sitemap, robots, redirects, documentation counts, and `dist` output.

Add controlled failure fixtures for count, ID, metadata, route, sitemap, and publication-boundary mismatches.

## PR 7

Verify production HTML, JSON, metadata, routes, redirects, cache behavior, and publish the final audit report.

## Resume rule

Batch 6 resumes only after PR 7. Compare the parked branch with latest main before any canonical write.
