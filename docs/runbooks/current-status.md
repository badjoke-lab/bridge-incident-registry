# Current Status — Bridge Incident Registry

Status: active  
Last reset: 2026-06-19

## Project state

Bridge Incident Registry is in Phase 2 record expansion, but canonical record growth is temporarily paused for a public-consistency remediation workstream.

The static application foundation, canonical data model, validation pipeline, registry UI, methodology pages, and five reviewed expansion batches are complete.

## Canonical source of truth

Only the reviewed canonical datasets define the current public registry state:

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

HTML, public JSON, metadata, sitemap output, and documentation counts must derive from these files rather than being maintained independently.

## Current canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

These counts reflect the completion of Phase 2 Batch 5.

## Last completed record work

### Phase 2 Batch 5

Merged canonical records:

- Ren Protocol / RenVM / RenBridge
- Avalanche-Ethereum Bridge / AEB
- Avalanche Bridge
- ShuttleFlow

Added:

```text
Bridges     +4
Incidents   +0
Events      +20
Evidence    +23
```

Key decisions:

- Ren Protocol is canonical; RenVM and RenBridge remain context.
- Ren 2.0 is not treated as a launched successor without public-mainnet evidence.
- AEB and Avalanche Bridge are separate predecessor and successor entities.
- Legacy AEB token upgrades do not make AEB active.
- ShuttleFlow bridge operation ended before its residual claim interface closed.
- Zero Gravity remains successor context without a canonical relationship ID.

## Last completed scope work

### Phase 2 Batch 6 scope

The reviewed candidates are:

```text
Transit Swap
Rubic
Unizen
Magpie Protocol
```

The scope distinguishes routing-layer failures, approval exposure, operator-key compromise, frontend or DNS compromise, and underlying bridge failures.

The scope is complete. Canonical implementation is paused.

## Current workstream

```text
Emergency public-consistency remediation
```

The remediation is defined in:

```text
docs/runbooks/public-consistency-remediation.md
```

Execution order:

```text
PR 1  Current-state reset and plan freeze
PR 2  Canonical-derived public output pipeline
PR 3  Machine-readable public layer
PR 4  Canonical metadata and discovery
PR 5  Legacy redirects
PR 6  Post-build consistency CI
PR 7  Production verification and audit closure
```

This file is part of PR 1. Once it is present on `main`, PR 1 is complete and PR 2 is next.

## Why record growth is paused

The audit found that the main HTML record counts already derive from canonical JSON, but the project did not yet provide a complete and enforced public contract for AI systems, search engines, and external tools.

Missing or incomplete controls included:

- machine-readable version and manifest endpoints
- canonical public record JSON
- `llms.txt` and `ai.txt`
- canonical URL metadata
- alternate discovery links
- sitemap and robots policy
- JSON-LD and Open Graph metadata
- generated legacy redirects
- post-build count and ID consistency checks
- public-safety checks excluding internal or unverified data

The audit also found stale current-state documentation. An older roadmap checkpoint still presented the pre-Batch-5 counts of 22 bridges, 27 incidents, 103 events, and 125 evidence records as current.

## Parked branch rule

The existing branch:

```text
phase2-batch6-records
```

is parked. Do not add canonical records to it during remediation.

After production verification completes, compare it with the latest main and either fast-forward it or replace it with a clean branch from latest main.

## Current architecture

```text
Astro
TypeScript
static JSON
Cloudflare Pages
GitHub pull-request workflow
client-side search and filters
```

The current version does not require a database, authentication, wallet connection, paid API, or server runtime.

## Current phase map

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          paused for remediation
         Batch 1                                   complete
         First-ten quality hardening               complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5                                   complete
         Batch 6 scope                             complete
         Batch 6 canonical implementation          paused
         Batch 7                                   planned
Emergency public consistency                       in progress
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Machine-readable public layer             being completed early
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Resume conditions for Batch 6

Batch 6 canonical implementation may resume only after:

1. public version and manifest metadata are generated from canonical data
2. public bridge, incident, event, and evidence JSON is generated from canonical data
3. canonical URL, sitemap, robots, structured data, and discovery links are complete
4. previous slugs and redirects are enforced
5. CI compares canonical JSON, public JSON, HTML, metadata, and built output
6. internal and unverified records are blocked from public output
7. Cloudflare production HTML and JSON are directly verified
8. the production audit report is merged

## Reporting rule

After every merge, report:

1. overall schedule
2. current project position
3. what changed
4. canonical count changes, if any
5. changed files
6. PR number and merge commit
7. CI result
8. production verification result when applicable
9. next PR
