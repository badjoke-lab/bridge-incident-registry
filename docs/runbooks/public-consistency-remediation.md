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
PR 4  Canonical metadata and discovery       complete when merged
PR 5  Legacy redirects                       next
PR 6  Post-build consistency CI              blocked by PR 5
PR 7  Production verification                blocked by PR 6
```

## Completed foundation

PRs 1–3 reset stale status documents, declared canonical inputs, added canonical-derived staging, and published version, manifest, bridge, incident, event, evidence, reference, and guidance endpoints.

## PR 4 result

Every HTML page gains production canonical metadata, machine-readable alternate links, Open Graph metadata, Twitter summary metadata, JSON-LD, and preview noindex policy.

The homepage and bridge/incident detail pages expose dataset JSON-LD derived from canonical records.

The build generates and checks:

```text
/sitemap.xml
/robots.txt
/_headers
```

The sitemap includes every canonical bridge and incident page and excludes legacy slugs. Preview builds receive both HTML and response-header noindex directives.

## PR 5 — next

Generate Cloudflare redirects from `previous_slugs` and `redirect_from`.

Completion gates:

- one canonical target per source
- no duplicate source
- no loop
- every target exists
- no legacy URL in canonical discovery

## PR 6

Compare canonical JSON, public JSON, version, manifest, built HTML, JSON-LD, sitemap, robots, redirects, and `dist`. Intentional mismatches must fail.

## PR 7

Verify production HTML, JSON, metadata, routes, redirects, cache behavior, and publish the final audit report.

## Resume rule

Batch 6 resumes only after PR 7. Compare the parked branch with latest main before any canonical write.
