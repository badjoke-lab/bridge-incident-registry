# Bridge Incident Registry — Public Consistency Remediation

Status: active  
Started: 2026-06-19  
Priority: blocks further canonical record expansion

## Purpose

This workstream prevents Bridge Incident Registry from presenting different current states to human readers, AI systems, search engines, and external tools.

The canonical datasets remain the only source of truth:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

At the start of this workstream, the canonical counts are:

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

Phase 2 Batch 6 canonical implementation is paused until all remediation pull requests below are complete and production verification succeeds.

## Why this work was inserted

The human-facing HTML already derives its main counts and records from canonical JSON. However, the repository did not yet provide a complete machine-readable public layer, canonical URL metadata, sitemap, robots policy, legacy redirects, or post-build consistency checks.

The audit also found stale project-state documents that could be mistaken for the current state. In particular, an older roadmap checkpoint still presented 22 bridges, 27 incidents, 103 events, and 125 evidence records as current.

This remediation makes one build derive all public representations from the same canonical input and adds CI checks that reject stale or divergent output.

## Non-negotiable rules

1. Canonical JSON is the only source of truth for public record content and counts.
2. HTML, public JSON, version metadata, manifest metadata, sitemap, structured data, and machine-readable guidance must derive from the same build.
3. Record counts must not be manually maintained in multiple current-state documents.
4. Public machine-readable files must contain reviewed canonical records only.
5. Monitoring candidates, internal staging, private notes, temporary captures, and unverified drafts must never enter public JSON.
6. Every public entity or incident record must link to its human-facing canonical page.
7. Preview deployments must not compete with the production origin in search indexing.
8. Old slugs must redirect to a current canonical page or be explicitly retired.
9. No record-expansion PR may merge while this remediation workstream is incomplete.

## Execution order

```text
PR 1  Reset current-state documents and fix the remediation plan
PR 2  Add canonical-derived public output pipeline
PR 3  Add machine-readable public endpoints
PR 4  Add canonical metadata, structured data, sitemap, robots, and discovery
PR 5  Generate and validate legacy redirects
PR 6  Enforce post-build public consistency in CI
PR 7  Verify production deployment and close the audit
```

The pull requests are sequential. Do not implement them in parallel because later stages depend on the generation contract established earlier.

---

# PR 1 — Current-state reset and plan freeze

Status: complete when this document is present on `main`

## Purpose

Remove stale current-state claims, pause Batch 6 implementation, and store the seven-PR remediation sequence in the repository.

## Files

```text
README.md
CHANGELOG.md
docs/runbooks/current-status.md
docs/runbooks/development-roadmap.md
docs/runbooks/recovery-checkpoint.md
docs/runbooks/public-consistency-remediation.md
```

## Completion gates

- canonical counts are recorded as 26 / 27 / 123 / 148
- the older 22 / 27 / 103 / 125 checkpoint is labeled historical or removed as a current claim
- Batch 6 canonical work is explicitly paused
- the parked `phase2-batch6-records` branch is not used for new writes
- canonical data remains unchanged
- standard CI passes

---

# PR 2 — Canonical-derived public output pipeline

Status: next after PR 1

## Purpose

Create one reusable data-loading and generation path for all public output.

## Planned changes

```text
scripts/build-public-data.mjs
scripts/lib/canonical-data.mjs
scripts/lib/public-records.mjs
config/public-data.json
package.json
```

## Required generated metadata

```text
record_counts
latest_verified_at
generated_at
schema_version
canonical_origin
canonical_only
```

## Completion gates

- all counts are calculated from canonical JSON
- build timestamps follow a documented reproducible precedence
- internal staging paths are excluded by construction
- existing HTML remains derived from canonical data
- 26 / 27 / 123 / 148 is calculated without hand-entered counts
- canonical validation, Astro checks, and build pass

---

# PR 3 — Machine-readable public layer

Status: blocked by PR 2

## Purpose

Give AI systems, search engines, and external tools a declared canonical data entry point.

## Planned endpoints

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

## Required properties

```text
generated_at
schema_version
canonical_origin
canonical_only
record_counts
data_safety
human_page_patterns
```

Public records will receive build-derived page links such as `canonical_page_url`, without duplicating those URLs in the source canonical JSON.

## Completion gates

- public and canonical ID sets match
- public and canonical counts match
- all JSON parses successfully
- each bridge and incident reaches a human canonical page
- monitoring and staging data is absent
- `canonical_only` is true

---

# PR 4 — Canonical metadata and discovery

Status: blocked by PR 3

## Purpose

Declare which origin and pages are canonical and expose machine-readable discovery links.

## Planned changes

- canonical links on all HTML pages
- alternate JSON discovery links
- Open Graph and social metadata
- conservative JSON-LD for the site, datasets, bridge pages, and incident pages
- sitemap generation
- robots policy
- production-origin configuration
- preview `noindex` behavior
- footer or page discovery links for version, manifest, AI guidance, and public data

## Completion gates

- every canonical HTML page has a canonical URL
- preview output points to production canonical URLs
- preview deployments are noindex
- all bridge and incident pages are in the sitemap
- legacy URLs are not in the canonical sitemap
- robots points to the sitemap
- structured data derives dates and identifiers from canonical data

---

# PR 5 — Legacy redirects

Status: blocked by PR 4

## Purpose

Turn `previous_slugs` and `redirect_from` fields into real Cloudflare Pages redirects.

## Planned output

```text
public/_redirects
```

The file must be generated, not manually maintained.

## Completion gates

- every valid previous slug and redirect source is reviewed
- redirect sources are unique
- redirect loops are impossible
- every redirect target exists
- old URLs are excluded from the sitemap and public canonical URLs
- retired endpoints are redirected, deleted, or explicitly documented as gone

---

# PR 6 — Post-build consistency CI

Status: blocked by PR 5

## Purpose

Reject future changes that make HTML, JSON, metadata, documentation, or generated output disagree.

## Planned checks

```text
scripts/check-public-consistency.mjs
scripts/check-built-site.mjs
scripts/check-stale-counts.mjs
scripts/check-public-safety.mjs
```

## Required comparisons

- canonical counts versus public JSON
- canonical counts versus version and manifest
- canonical counts versus top-page and list-page HTML
- canonical IDs versus public IDs
- canonical slugs versus generated detail pages
- canonical slugs versus sitemap URLs
- required canonical and alternate links
- JSON-LD parseability
- robots and sitemap linkage
- redirect targets and loops
- absence of internal, private, candidate, draft, and staging outputs
- absence of stale generated files in `dist`

## Failure tests

CI must fail when a test branch intentionally:

- changes a manifest count
- removes one public record
- hardcodes an old HTML count
- removes a canonical link
- publishes an internal candidate
- removes a canonical detail page from the sitemap
- creates a redirect loop

## Completion gates

The clean branch passes the complete standard path:

```text
npm run check
npm run validate:data
npm run audit:first-ten
npm run public:build
npm run build
npm run public:check
npm run dist:check
```

---

# PR 7 — Production verification and audit closure

Status: blocked by PR 6

## Purpose

Confirm that the Cloudflare production deployment, not only the repository build, exposes one consistent current state.

## Required live checks

```text
/
/bridges/
/incidents/
/methodology/
/about/
representative and complete bridge detail URLs
representative and complete incident detail URLs
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
legacy redirect URLs
unknown URLs
```

## Audit report

Create:

```text
docs/audits/public-consistency-verification-2026-06.md
```

The report must contain:

- all checked URLs
- the data source for each output class
- before and after counts
- stale-information sources found
- canonical source of truth
- machine-readable changes
- CI additions
- removed or redirected routes
- changed files
- PR numbers and merge commits
- CI results
- production HTML results
- production JSON and manifest results
- remaining limitations

## Completion gates

- production HTML and JSON report the same canonical counts
- cache-bypassed and normal responses agree
- production deploy references the expected main commit
- all canonical pages return success
- expected redirects return 301
- public JSON contains canonical records only
- the recovery checkpoint advances to Batch 6 implementation

---

# Resume rule for record expansion

Phase 2 Batch 6 canonical implementation may resume only after PR 7 is merged and production verification is successful.

At that point:

1. compare the parked `phase2-batch6-records` branch with the latest main
2. discard or fast-forward the empty parked branch as appropriate
3. create a clean implementation branch from latest main if necessary
4. re-read the Batch 6 scope
5. derive IDs and counts from canonical JSON
6. continue through the normal data PR process

## Post-remediation roadmap effect

This work completes most of the previously planned Phase 4 machine-readable public layer early. The later Phase 4 stage becomes a contract-stability and cross-site alignment review rather than a second implementation of the same layer.
