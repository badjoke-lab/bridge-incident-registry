# Bridge Incident Registry — Development Roadmap to v1

Status: active roadmap  
Last verified: 2026-06-18  
Repository: `badjoke-lab/bridge-incident-registry`

## Purpose

This document is the recovery point and execution order for continuing Bridge Incident Registry development.

It records:

- the verified repository state
- the current canonical counts
- the next work item
- the remaining phases to v1
- the intended pull-request boundaries
- the completion gates for each stage
- the procedure for resuming after an interruption

GitHub state and canonical JSON remain the final source of truth. If this document conflicts with the repository, verify the repository first and update this document in a docs-only pull request.

## Verified recovery checkpoint

Verified on 2026-06-18:

```text
Default branch:              main
main head:                   ecca05c596f7b4ec90390fc146828a93a4f3d579
Last merged canonical PR:    #45 — Phase 2 Batch 4
Last merged scope PR:        #46 — Phase 2 Batch 5 scope
Open pull requests:          0
Prepared work branch:        phase2-batch5-records
Prepared branch difference:  identical to main
Next canonical work:         Phase 2 Batch 5 implementation
```

Current canonical counts:

```text
Bridges     22
Incidents   27
Events      103
Evidence    125
```

The `phase2-batch5-records` branch exists but contains no Batch 5 canonical changes. It was created from the PR #46 merge commit and is currently identical to `main`.

## Current position

```text
Phase 0  Specification and foundation              complete
Phase 1  Canonical model, UI, validation, seeds    complete
Phase 2  Record expansion                          in progress
         Batch 1                                   complete
         First-ten quality hardening               complete
         Batch 2                                   complete
         Batch 3                                   complete
         Batch 4                                   complete
         Batch 5 scope                             complete
         Batch 5 canonical implementation          next
         Batch 6                                   planned
         Batch 7                                   planned
Phase 3  Full-corpus quality strengthening         not started
Phase 4  Machine-readable public layer             not started
Phase 5  Monitoring and candidate collection       not started
Release  v1 hardening                              not started
```

The immediate next task is Phase 2 Batch 5 canonical implementation.

---

# Phase 2 — Record expansion

## Roadmap PR 1 — Implement Phase 2 Batch 5

Theme:

```text
dead
deprecated
migrated
functionally replaced
```

Canonical entities:

1. Ren Protocol
2. Avalanche-Ethereum Bridge
3. Avalanche Bridge
4. ShuttleFlow

Provisional result:

```text
Bridges     +4   -> 26
Incidents   +0   -> 27
Events      about +20 -> about 123
Evidence    about +23 -> about 148
```

Exact event and evidence counts may change during implementation.

Required boundary decisions:

- `Ren Protocol` is canonical; RenVM and RenBridge remain network, implementation, product, and alias context.
- Ren 2.0 must not be treated as a launched successor without operational evidence.
- Ren 1.0 shutdown is a terminal-state timeline, not an exploit incident.
- `Avalanche-Ethereum Bridge` and `Avalanche Bridge` are separate canonical entities.
- AEB residual token-upgrade support must not be treated as active AEB operation.
- AEB and Avalanche Bridge must use explicit predecessor/successor relations.
- ShuttleFlow closure must be supported by a stable official or archived source.
- A technology handoff alone is insufficient to set Zero Gravity as a canonical successor.
- No Batch 5 incident record should be created merely because an architecture was replaced or a service shut down.

Implementation order:

1. Reconfirm GitHub state and branch equality.
2. Read canonical JSON and validators directly.
3. Determine the next unused IDs from the files.
4. Recheck primary and archived sources.
5. Add `docs/batches/phase2-batch-05-boundary-note.md`.
6. Add required chain and asset references without duplicates.
7. Add the four bridge entities.
8. Add terminal-state and migration events.
9. Add evidence and recalculate `source_count`.
10. Add predecessor/successor relationships.
11. Synchronize README, changelog, current status, and Batch 5 notes.
12. Run all standard checks.
13. Open the implementation pull request.
14. Squash merge only after the final branch and CI are clean.

Required checks:

```text
npm run check
npm run validate:data
npm run audit:first-ten
npm run build
```

Completion gate:

- four entity boundaries are resolved
- direct duplicate checks pass
- all relationship IDs resolve
- no orphan event or evidence exists
- status and date precision are supported by evidence
- standard CI passes
- no temporary generator, workflow, diagnostic, or marker file remains
- canonical counts and status documentation match

## Roadmap PR 2 — Define Phase 2 Batch 6 scope

Theme:

```text
aggregator
frontend compromise
approval or permit abuse
router infrastructure
multi-bridge interface failure
```

Purpose:

- select three to five candidates
- distinguish an underlying bridge compromise from a frontend, router, DNS, approval, or permit compromise
- define entity and incident boundaries before canonical data is written
- fix source requirements and completion gates

This is a docs-only scope pull request.

## Roadmap PR 3 — Implement Phase 2 Batch 6

Provisional shape:

```text
Bridges     +3 to +5
Incidents   +3 to +6
Events      +15 to +25
Evidence    +20 to +35
```

Target cumulative range:

```text
Bridges     29 to 31
Incidents   30 to 33
Events      140 to 150
Evidence    170 to 185
```

Completion gate:

- bridge, interface, router, and approval-compromise boundaries are explicit
- loss, exposure, recovery, reimbursement, and protected amounts remain separate
- standard validation and build pass

## Roadmap PR 4 — Define Phase 2 Batch 7 scope

Theme:

```text
non-EVM
multi-chain
complex recovery
validator or relayer compromise
chain-level bridge failure
```

Candidate domains may include:

```text
Solana
Cosmos
NEAR
TON
TRON
Bitcoin federations
custom validator bridges
```

Purpose:

- avoid forcing EVM assumptions onto non-EVM systems
- define chain, validator, relayer, asset, and recovery boundaries
- select three to five candidates with public-quality evidence

This is a docs-only scope pull request.

## Roadmap PR 5 — Implement Phase 2 Batch 7

Provisional shape:

```text
Bridges     +3 to +5
Incidents   +4 to +8
Events      +18 to +30
Evidence    +25 to +40
```

Phase 2 exit target:

```text
Bridges     about 30 to 32
Incidents   about 38 to 48
Events      at least 125 to 155
Evidence    at least 165 to 210
```

The target is a quality checkpoint, not a quota. Entity boundaries and evidence quality take priority over counts.

Phase 2 completion gate:

- Batch 5, 6, and 7 are merged
- about thirty bridge entities are represented
- major bridge, interoperability, router, terminal-state, and non-EVM patterns are covered
- all standard checks pass
- current status and canonical counts match

---

# Phase 3 — Full-corpus quality strengthening

## Roadmap PR 6 — Run an all-corpus audit

Audit:

```text
all bridges
all incidents
all events
all evidence
all chain references
all asset references
```

Detect:

- duplicate IDs and slugs
- alias and domain collisions
- broken relationships
- orphan events and evidence
- `source_count` mismatches
- date-precision inconsistencies
- status and end-date contradictions
- incident-outcome contradictions

Outputs:

```text
audit report
fix manifest
quality baseline
```

This pull request defines the full repair queue rather than mixing unrelated fixes without a recorded baseline.

## Roadmap PR 7 — Strengthen primary-source coverage

Prioritize:

- low- and medium-confidence records
- records with fewer than two evidence items
- dead-side records without archive evidence
- records without an official source
- unresolved recovery and reimbursement claims

Preferred evidence:

```text
official postmortem
official incident notice
governance proposal
recovery announcement
reimbursement notice
regulatory filing
repository security advisory
official archive
```

## Roadmap PR 8 — Normalize aftermath and amount semantics

Normalize event language for:

```text
paused
reopened
reimbursement started
reimbursement completed
partial recovery
funds frozen
funds returned
migrated
deprecated
shutdown
```

Keep these quantities separate:

```text
reported loss
realized loss
protected exposure
recovered amount
reimbursed amount
frozen amount
returned amount
minted amount
burned amount
```

## Roadmap PR 9 — Strengthen URL, archive, and validation rules

Add or improve:

- broken evidence URL detection
- archive fallback handling
- redirect detection
- repurposed and dead-domain handling
- duplicate-source detection
- source-date validation
- relationship and reference validation

Phase 3 completion gate:

- zero critical validation errors
- zero orphan canonical records
- major incidents have multiple evidence items
- status and timeline contradictions are resolved
- archive gaps are measured and documented

---

# Phase 4 — Machine-readable public layer

## Roadmap PR 10 — Define the public data contract

Public outputs:

```text
/version.json
/data/manifest.json
/data/bridges.json
/data/incidents.json
/data/events.json
/data/evidence.json
/llms.txt
/ai.txt
```

Safety rules:

```text
canonical_only = true
no unverified candidates
no internal watchlists
no private notes
```

## Roadmap PR 11 — Add schemas and stable endpoint checks

Add:

- JSON Schema definitions
- manifest validation
- versioning rules
- stable endpoint tests
- canonical and public record-count consistency checks

## Roadmap PR 12 — Add discovery metadata

Add or confirm:

```text
llms.txt
ai.txt
robots.txt
sitemap
JSON-LD
alternate links
canonical links
```

These files improve discovery and interpretation but do not guarantee search or AI ingestion.

## Roadmap PR 13 — Integrate contract tests and public documentation

Add:

- machine-readable build checks
- CI integration
- public usage documentation
- data limitations
- compatibility and version policy

Phase 4 completion gate:

- UI and public JSON are generated from the same canonical source
- public and canonical counts match
- no internal data is exposed
- stable endpoints and schemas pass CI

---

# Phase 5 — Monitoring and candidate collection

## Roadmap PR 14 — Add the monitoring skeleton

Add:

```text
scripts/monitoring/
data-staging/monitoring/
data-staging/watchlists/
scheduled workflow
canonical guard
```

Start without external network collection. First prove safe report generation and canonical immutability.

## Roadmap PR 15 — Add candidate discovery

Detect:

- unlisted bridges
- historical bridges
- dead or deprecated bridges
- new interoperability protocols
- multi-chain routers

Implement:

```text
name normalization
alias matching
domain matching
duplicate detection
A / B / C candidate classification
```

## Roadmap PR 16 — Add evidence and URL health monitoring

Monitor:

```text
evidence 404
redirects
dead domains
repurposed domains
archive availability
thin evidence
stale verification
```

## Roadmap PR 17 — Add incident, news, and regulatory monitoring

Monitor candidate signals for:

```text
exploit
pause
bridge suspension
recovery
reimbursement
migration
shutdown
regulatory action
governance emergency
```

Monitoring may create findings and review candidates but must not change canonical data.

## Roadmap PR 18 — Add scheduled monitoring pull requests

Final flow:

```text
scheduled monitoring
-> JSON and Markdown report
-> branch only when findings exist
-> monitoring pull request
-> human or AI review
-> separate canonical pull request when approved
```

Non-negotiable rule:

```text
Monitoring workflows never modify canonical JSON directly.
```

Phase 5 completion gate:

- no-change runs create no pull request
- findings create report-only pull requests
- canonical guard rejects canonical modifications
- candidate findings remain separate from public data

---

# Release — v1 hardening

## Roadmap PR 19 — UI, mobile, and accessibility hardening

Review:

```text
registry list
bridge detail
incident detail
timeline
evidence links
filters
search
mobile layout
keyboard navigation
focus states
contrast
empty states
```

This stage hardens existing functionality rather than expanding scope.

## Roadmap PR 20 — SEO, redirects, and performance

Review and improve:

```text
metadata
Open Graph
sitemap
canonical URLs
redirects
404 handling
legacy paths
bundle size
static generation
Cloudflare Pages compatibility
```

## Roadmap PR 21 — v1 checkpoint and release

Finalize:

```text
methodology
about
current status
changelog
canonical counts
release notes
version marker
v1.0.0 tag
```

v1 completion gate:

- Phases 2 through 5 are complete
- all standard CI passes
- the public site is healthy
- the machine-readable layer is healthy
- monitoring cannot write canonical data
- current-status documentation matches canonical counts

---

# Resume procedure after interruption

Before changing files, always perform this recovery sequence.

## 1. Verify repository state

```text
repository identity
default branch
main head SHA
open pull requests
relevant merged pull requests
prepared work branches
branch-to-main differences
workflow and check state
```

## 2. Read the recovery documents

```text
docs/runbooks/development-roadmap.md
docs/runbooks/current-status.md
relevant docs/batches scope and boundary notes
README.md
CHANGELOG.md
```

## 3. Read canonical files directly

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
scripts/validate-data.mjs
src/lib/data.ts
```

Never infer the next ID or canonical count from an earlier chat, issue, or roadmap entry.

## 4. Re-establish the exact next step

Record:

```text
current phase
current batch or hardening task
latest unused IDs
expected files to change
required evidence still missing
completion gate
```

## 5. Work through a branch and pull request

```text
no direct main writes
one coherent purpose per pull request
standard validation before review
squash merge after final head verification
```

## 6. Update the recovery point after merge

Every merged roadmap item must update, as applicable:

```text
docs/runbooks/development-roadmap.md
docs/runbooks/current-status.md
README.md
CHANGELOG.md
batch implementation or merge note
canonical counts
next planned work
```

---

# Permanent operating rules

```text
Do not write directly to main.
Use a branch and pull request.
Read canonical JSON before assigning IDs.
Do not treat an empty search result as a complete duplicate check.
Check names, slugs, aliases, domains, and relationships.
Do not classify a bridge as dead without sufficient evidence.
Do not assert a successor without evidence of operational continuity.
Do not mix loss, exposure, recovery, reimbursement, frozen, returned, minted, or burned amounts.
Do not model vulnerability disclosure as an exploit incident without exploitation evidence.
Do not merge temporary generators, write-enabled temporary workflows, diagnostics, or marker files.
Do not allow monitoring to modify canonical data.
```

# Standard merge report

After each merge, report:

1. overall roadmap position
2. current phase and next item
3. what changed in the merge
4. canonical count changes
5. important boundary decisions
6. validation and CI result
7. the next pull request
