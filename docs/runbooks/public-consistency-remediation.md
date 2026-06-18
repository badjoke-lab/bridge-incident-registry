# Bridge Incident Registry — Public Consistency Remediation

Status: active  
Updated: 2026-06-19  
Priority: blocks canonical record expansion

Live progress is maintained in `recovery-checkpoint.md`. This document defines scope, dependencies, and completion gates.

## Purpose

Ensure that human-facing HTML, AI and search discovery, public JSON, metadata, routes, and external-tool output all resolve to the same reviewed canonical state.

## Canonical source

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

Remediation baseline:

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Rules

1. Canonical JSON is the only source of record content and counts.
2. HTML, public JSON, manifest, version, sitemap, and metadata derive from one build.
3. Current counts are not manually maintained in multiple places.
4. Public data contains reviewed canonical records only.
5. Working candidates and monitoring output remain separate.
6. Public entity and incident records link to human canonical pages.
7. Preview deployments do not compete with the production origin.
8. Old slugs redirect or are explicitly retired.
9. Batch 6 remains paused through production verification.

## Execution order

```text
PR 1  Current-state reset                         complete — PR #50
PR 2  Canonical-derived public output pipeline    complete when merged
PR 3  Machine-readable public layer               next
PR 4  Canonical metadata and discovery            blocked by PR 3
PR 5  Legacy redirects                            blocked by PR 4
PR 6  Post-build consistency CI                   blocked by PR 5
PR 7  Production verification                     blocked by PR 6
```

The PRs are sequential.

---

## PR 1 — Current-state reset

Result:

- stale current-state claims removed
- 26 / 27 / 123 / 148 recorded as baseline
- Batch 6 implementation paused
- roadmap and recovery documents reset
- remediation sequence stored in the repository

Canonical data changes: none.

---

## PR 2 — Canonical-derived public output pipeline

Purpose:

Create one internal transformation path from canonical JSON to generated output.

Files:

```text
config/public-data.json
scripts/build-public-data.mjs
scripts/lib/canonical-data.mjs
scripts/lib/public-records.mjs
docs/runbooks/canonical-public-output-pipeline.md
package.json
.gitignore
```

Internal output:

```text
.generated/public-data/
```

Required metadata:

```text
record_counts
latest_verified_at
generated_at
schema_version
canonical_origin
canonical_only
```

Completion gates:

- only declared canonical paths are read
- counts are calculated from canonical arrays
- transformed IDs and count remain unchanged
- source canonical JSON is not modified
- generated timestamps follow documented precedence
- staging output is ignored by Git and not publicly deployed
- `npm run build` invokes generation before Astro
- canonical validation and static build pass

---

## PR 3 — Machine-readable public layer

Planned endpoints:

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

Required properties:

```text
generated_at
schema_version
canonical_origin
canonical_only
record_counts
data_safety
human_page_patterns
```

Completion gates:

- canonical and public ID sets match
- canonical and public counts match
- public JSON parses successfully
- bridge and incident records link to human pages
- working material is absent
- `canonical_only` is true

---

## PR 4 — Canonical metadata and discovery

Scope:

- canonical links on HTML pages
- alternate JSON discovery
- Open Graph metadata
- conservative JSON-LD
- sitemap generation
- robots policy
- production-origin configuration
- preview noindex behavior
- data-discovery links

Completion gates:

- all canonical pages declare the production origin
- preview output points to production canonical URLs
- all canonical bridge and incident pages are in the sitemap
- old slugs are excluded from the sitemap
- robots points to the sitemap

---

## PR 5 — Legacy redirects

Purpose:

Generate real Cloudflare redirects from `previous_slugs` and `redirect_from`.

Output:

```text
public/_redirects
```

Completion gates:

- redirect sources are unique
- loops are rejected
- targets exist
- old URLs are absent from canonical metadata and sitemap
- obsolete endpoints are redirected, removed, or documented as gone

---

## PR 6 — Post-build consistency CI

Required comparisons:

- canonical counts versus public JSON
- canonical counts versus version and manifest
- canonical counts versus HTML
- canonical IDs versus public IDs
- canonical slugs versus generated pages
- canonical slugs versus sitemap URLs
- canonical and alternate links
- JSON-LD parseability
- robots and sitemap linkage
- redirect targets and loops
- absence of non-canonical generated output
- absence of stale files in `dist`

The clean build must pass:

```text
npm run check
npm run validate:data
npm run audit:first-ten
npm run public:build
npm run build
npm run public:check
npm run dist:check
```

Intentional mismatch tests must fail.

---

## PR 7 — Production verification

Required live checks:

```text
/
/bridges/
/incidents/
/methodology/
/about/
all bridge detail pages
all incident detail pages
/version.json
/data/manifest.json
/data/bridges.json
/data/incidents.json
/data/events.json
/data/evidence.json
/llms.txt
/ai.txt
/sitemap.xml
/robots.txt
legacy redirects
unknown routes
```

Required report:

```text
docs/audits/public-consistency-verification-2026-06.md
```

The report records checked URLs, data sources, counts, stale-information sources, canonical source, machine-readable changes, CI checks, redirects, changed files, PRs, commits, CI results, production HTML results, production JSON results, and remaining limitations.

Completion gates:

- production HTML and JSON agree
- normal and cache-bypassed responses agree
- canonical pages return success
- redirects return the expected status
- public JSON contains canonical records only
- recovery checkpoint advances to Batch 6

---

## Record-expansion resume rule

After PR 7:

1. compare `phase2-batch6-records` with latest main
2. replace or fast-forward the parked branch
3. re-read the Batch 6 scope
4. derive IDs and counts from canonical JSON
5. resume canonical implementation through a clean PR

This work completes most of the previously planned machine-readable Phase 4 early. The later Phase 4 becomes a contract-stability and cross-site alignment review.
