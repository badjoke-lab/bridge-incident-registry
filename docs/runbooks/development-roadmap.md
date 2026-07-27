# Bridge Incident Registry — Development Roadmap to v1

Status: active  
Updated: 2026-07-28

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
Emergency public consistency                       in progress — PR 6 of 7
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Public contract stabilization             being completed early
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Emergency sequence

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete when merged
PR 7  Production verification                next
```

Completed merge checkpoints:

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
PR #52  6f3b8aad06edc7027fb362120aabe19fa46d52ee
PR #53  5558a50e0a0f34ceca7c4b34816db29b0e7ae17b
PR #54  40632e3e5cf600490097d58a15210dabce704ede
```

## PR 6 result

- canonical JSON is compared with copied public JSON after Astro completes
- all required static, bridge-detail, and incident-detail HTML files must exist
- detail route directory sets must equal canonical slugs exactly
- canonical links, production robots metadata, data-discovery links, and JSON-LD identifiers are checked
- home and collection-page record counts must match canonical counts
- sitemap URLs, robots, headers, and redirects are checked in the final `dist` tree
- repository documentation count blocks must match canonical counts
- staging, research, candidate, watchlist, private, Markdown, JSONL, CSV, SQLite, and unexpected JSON output cannot cross the publication boundary
- controlled failure fixtures cover count, ID, metadata, route, sitemap, and publication-boundary corruption

## PR 7 — next

Verify production HTML, JSON, metadata, routes, response headers, redirects, and cache behavior; then publish the final audit report and close the emergency remediation.

## Phase 2 resume

After PR 7:

1. verify live main and open PRs
2. compare or recreate the parked Batch 6 branch
3. re-read Batch 6 scope
4. re-evaluate the Taiko, Everclear, and Syndicate research queue against current canonical data
5. derive IDs and counts from canonical JSON
6. implement Transit Swap, Rubic, Unizen, and Magpie Protocol as the bounded Batch 6 scope
7. run canonical, public, and post-build checks
8. verify production after merge

## Remaining roadmap

1. Phase 2 Batch 7
2. full-corpus audit
3. primary-source strengthening
4. aftermath normalization
5. URL and archive hardening
6. validator strengthening
7. public-contract compatibility review
8. monitoring with no automatic publication
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
