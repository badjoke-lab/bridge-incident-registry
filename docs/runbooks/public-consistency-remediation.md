# Bridge Incident Registry — Public Consistency Remediation

Status: active  
Updated: 2026-06-19

## Goal

Make human HTML, public JSON, AI guidance, search metadata, routes, and external-tool output resolve to the same reviewed canonical state.

## Canonical source

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

Baseline:

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Rules

- canonical JSON is the only record source
- all public representations derive from one build
- generated files are not manually maintained source data
- public data is canonical-only
- working candidates and monitoring output remain separate
- preview deployments must not compete with production
- Batch 6 remains paused through production verification

## Progress

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete when merged
PR 4  Canonical metadata and discovery       next
PR 5  Legacy redirects                       blocked by PR 4
PR 6  Post-build consistency CI              blocked by PR 5
PR 7  Production verification                blocked by PR 6
```

## PR 1 result

- stale status documents reset
- correct baseline counts recorded
- Batch 6 paused
- remediation plan stored

## PR 2 result

- canonical input paths declared in configuration
- generated metadata and page URLs derived from canonical records
- internal staging isolated under `.generated/public-data/`
- staging generation added to the build path

## PR 3 result

Formal generated endpoints:

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

Basic checks cover:

- version and manifest counts
- canonical-only flags
- schema, origin, and verification marker
- canonical versus public IDs
- bridge and incident page URLs
- reference dictionaries
- guidance files

Generated public files are ignored by Git and recreated during build.

## PR 4 — next

Add:

- canonical links on every HTML page
- alternate machine-readable links
- Open Graph and social metadata
- conservative JSON-LD
- sitemap generation
- robots policy
- production-origin configuration
- preview noindex behavior
- visible data-discovery links

Completion gates:

- all canonical pages declare the production origin
- preview output points to production canonical URLs
- all bridge and incident pages are represented in the sitemap
- robots points to the sitemap
- structured metadata derives from canonical records

## PR 5

Generate and validate legacy redirects from canonical slug-history fields.

Completion gates:

- unique redirect sources
- no loops
- live targets
- no legacy URL in canonical discovery

## PR 6

Add full post-build consistency CI.

Compare:

- canonical and public counts
- canonical and public IDs
- version and manifest
- HTML counts and detail pages
- sitemap coverage
- canonical and alternate metadata
- JSON-LD
- robots
- redirects
- `dist` contents
- absence of non-canonical working output

Intentional mismatch tests must fail.

## PR 7

Verify production directly and publish:

```text
docs/audits/public-consistency-verification-2026-06.md
```

The report must list checked URLs, data sources, counts, stale sources, canonical source, endpoint changes, CI checks, redirects, changed files, PRs, commits, CI results, production HTML, production JSON, cache behavior, and remaining limitations.

## Resume rule

Batch 6 resumes only after PR 7. The parked branch must be compared with latest main and recreated or fast-forwarded before canonical work continues.
