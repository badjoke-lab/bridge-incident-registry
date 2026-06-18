# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-06-19

GitHub state and canonical JSON are authoritative.

## Canonical baseline

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
         Batch 6 implementation                    paused
         Batch 7                                   planned
Emergency public consistency                       in progress — PR 3 of 7
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Public contract stabilization             being completed early
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Emergency public-consistency sequence

### PR 1 — Current-state reset

Complete:

```text
PR #50
ed7d4871c82dcd6b089bb3ac6da5df538a83116c
```

### PR 2 — Canonical-derived public output

Complete:

```text
PR #51
f7e0ff462c07fc02f6fe620d7a125546a27a45e3
```

Result:

- one declared canonical input set
- generated metadata and page URLs
- isolated `.generated/public-data/` staging
- prebuild integration

### PR 3 — Machine-readable public layer

Complete when this roadmap version reaches main.

Result:

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

The build checks public IDs, counts, origin, schema, verification marker, reference dictionaries, and canonical-only flags.

### PR 4 — Canonical metadata and discovery

Next.

Scope:

- HTML canonical links
- alternate JSON links
- Open Graph and social metadata
- conservative JSON-LD
- sitemap
- robots policy
- preview noindex behavior
- human-visible links to version, manifest, and public datasets

### PR 5 — Legacy redirects

Blocked by PR 4.

Scope:

- generate redirects from `previous_slugs` and `redirect_from`
- reject duplicate sources, loops, and missing targets
- exclude old routes from canonical discovery

### PR 6 — Post-build consistency CI

Blocked by PR 5.

Scope:

- compare canonical JSON, public JSON, manifest, version, HTML, sitemap, pages, and redirects
- inspect `dist` for stale or non-canonical output
- add intentional mismatch tests

### PR 7 — Production verification

Blocked by PR 6.

Scope:

- verify all production HTML and machine-readable endpoints
- verify all bridge and incident pages
- verify redirects and indexing files
- compare normal and cache-bypassed responses
- publish the final audit report

## Phase 2 resume

After PR 7:

1. verify latest main and open PRs
2. compare the parked Batch 6 branch with main
3. recreate or fast-forward the branch
4. re-read Batch 6 scope
5. derive IDs and counts from canonical JSON
6. implement Transit Swap, Rubic, Unizen, and Magpie Protocol
7. run canonical and public-consistency checks
8. verify production output after merge

## Remaining roadmap

After Batch 6:

1. define and implement Batch 7
2. full-corpus audit
3. primary-source strengthening
4. aftermath terminology normalization
5. URL and archive hardening
6. validator strengthening
7. public-contract compatibility review
8. monitoring and candidate collection with no automatic publication
9. v1 documentation, accessibility, performance, and release checks

## Permanent rules

1. Never write canonical changes directly to main.
2. Use one branch and bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Keep canonical and working data separate.
5. Do not merge temporary diagnostics.
6. Preserve distinctions among loss, return, recovery, reimbursement, freezing, minting, and burning.
7. A disclosure is not automatically an exploit.
8. A relaunch announcement is not proof of operation.
9. Historical SHAs are not live branch pointers.
10. Every PR must pass checks appropriate to its stage.
