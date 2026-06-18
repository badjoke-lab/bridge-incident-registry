# Bridge Incident Registry — Development Roadmap to v1

Status: active roadmap  
Updated: 2026-06-19

GitHub state and canonical JSON are authoritative. Embedded commit SHAs are historical checkpoints only.

## Canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Current position

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
Emergency public consistency                       in progress — PR 2 of 7
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Machine-readable public layer             being completed early
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Emergency public-consistency workstream

Detailed plan:

```text
docs/runbooks/public-consistency-remediation.md
```

No canonical record-expansion PR may merge until PR 7 completes production verification.

### PR 1 — Current-state reset and plan freeze

Status: complete

```text
PR:           #50
Merge commit: ed7d4871c82dcd6b089bb3ac6da5df538a83116c
```

Result:

- stale current-state claims were removed
- 26 / 27 / 123 / 148 was fixed as the remediation baseline
- Batch 6 implementation was paused
- the seven-PR sequence was stored in the repository

### PR 2 — Canonical-derived public output pipeline

Status: complete when this roadmap version reaches main

Purpose:

- load canonical JSON through one Node-side generation path
- calculate counts and verification metadata from canonical records
- derive page URLs without modifying source canonical JSON
- create isolated staging output under `.generated/public-data/`
- run the generator automatically before Astro builds

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

Completion gates:

- generator reads only declared canonical paths
- `canonical_only` must be true
- record IDs and counts remain unchanged during transformation
- generated timestamps follow documented precedence
- `.generated/` is not committed or publicly deployed
- standard validation and build pass

### PR 3 — Machine-readable public layer

Status: next

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

Completion gates:

- public and canonical IDs match
- public and canonical counts match
- `canonical_only` is true
- each bridge and incident links to a human canonical page
- non-canonical working material is absent

### PR 4 — Canonical metadata and discovery

Status: blocked by PR 3

Scope:

- canonical links
- alternate JSON discovery
- Open Graph metadata
- conservative JSON-LD
- sitemap
- robots policy
- preview noindex behavior
- production-origin configuration
- human-visible data-discovery links

### PR 5 — Legacy redirects

Status: blocked by PR 4

Scope:

- generate Cloudflare redirects from `previous_slugs` and `redirect_from`
- reject duplicate sources, loops, and missing targets
- exclude old URLs from canonical metadata and sitemap output

### PR 6 — Post-build consistency CI

Status: blocked by PR 5

Scope:

- compare canonical JSON, public JSON, manifest, version, HTML, sitemap, detail pages, and redirects
- inspect `dist` for stale or non-canonical output
- reject count, ID, page, metadata, and route mismatches

### PR 7 — Production verification and audit closure

Status: blocked by PR 6

Scope:

- verify Cloudflare production HTML and JSON directly
- check every canonical bridge and incident page
- verify redirects, sitemap, robots, metadata, and cache behavior
- record all URLs, sources, counts, PRs, commits, and CI results

Required report:

```text
docs/audits/public-consistency-verification-2026-06.md
```

## Phase 2 resume

After PR 7:

1. verify latest main and open PRs
2. compare the parked `phase2-batch6-records` branch with main
3. replace or fast-forward it as necessary
4. re-read the Batch 6 scope
5. derive IDs and counts from canonical JSON
6. implement Transit Swap, Rubic, Unizen, and Magpie Protocol
7. run canonical and public-consistency checks
8. verify production output after merge

## Phase 2 Batch 7

After Batch 6:

1. define a bounded evidence-backed scope
2. review duplicates and entity boundaries
3. implement canonical records and references
4. run the full public-consistency path

## Phase 3 — Full-corpus quality strengthening

Planned PR groups:

1. corpus audit inventory
2. primary-source strengthening
3. aftermath terminology normalization
4. URL and archive hardening
5. validator strengthening

The corpus audit must separately track:

- weak source tiers
- stale verification dates
- amount conflicts
- unresolved recovery and reimbursement states
- missing archives
- uncertain current status
- missing redirects

## Phase 4 — Public contract stabilization

The emergency workstream completes most implementation early. Later Phase 4 work focuses on:

- schema-version policy
- backward compatibility
- endpoint stability
- cross-site ledger-series alignment
- public change documentation
- deprecation policy

## Phase 5 — Monitoring and candidate collection

Rules:

- monitoring output is separate from canonical data
- monitoring never writes canonical JSON directly
- candidates require review
- candidate drafts are not public records
- automatic publication is prohibited

## v1 hardening

Final groups:

1. methodology and documentation review
2. accessibility and UI review
3. performance and deployment review
4. v1 release checkpoint

Release requires:

- canonical data validation
- public output consistency
- production verification
- documented corpus limitations
- no automatic candidate publication
- current recovery documentation

## Permanent operating rules

1. Never write canonical changes directly to main.
2. Use one branch and one bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical, candidate, monitoring, and temporary data separate.
5. Do not merge temporary diagnostics or write-enabled workflows.
6. Keep reported, returned, recovered, reimbursed, frozen, minted, and burned amounts distinct.
7. A disclosure is not automatically an exploit incident.
8. A relaunch announcement is not proof of operation.
9. Every PR must pass the checks appropriate to its phase.
10. Historical SHAs must never be presented as a live branch pointer.

## Standard merge report

```text
PR number and title
merge commit
changed files
canonical count delta
CI result
Cloudflare preview result
production result when applicable
current roadmap position
next PR
```
