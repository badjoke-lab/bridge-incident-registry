# Bridge Incident Registry — Development Roadmap to v1

Status: active roadmap  
Last reset: 2026-06-19  
Repository: `badjoke-lab/bridge-incident-registry`

## Purpose

This document defines the execution order from the current project state to v1.

GitHub state and canonical JSON remain the final source of truth. Embedded commit SHAs are historical checkpoints only and must never be treated as a live branch pointer without re-verification.

## Current recovery checkpoint

Historical baseline immediately before the public-consistency remediation:

```text
Default branch:              main
Baseline commit:             001da4b36570ac861d5c2d1c821b3cc27d2c521f
Last merged canonical PR:    #48 — Phase 2 Batch 5
Last merged scope PR:        #49 — Phase 2 Batch 6 scope
Open PRs at baseline:        0
Parked record branch:        phase2-batch6-records
Next record task:            Phase 2 Batch 6 canonical implementation
```

The baseline commit is intentionally labeled historical. The live main head must be read from GitHub whenever work resumes.

Current canonical counts at the start of remediation:

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
Emergency public consistency                       in progress
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Machine-readable public layer             being completed early
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

The immediate next task is public-consistency remediation PR 2 after the documentation reset reaches main.

---

# Emergency workstream — Public consistency remediation

The authoritative detailed plan is:

```text
docs/runbooks/public-consistency-remediation.md
```

No canonical record-expansion PR may merge before this workstream completes.

## Remediation PR 1 — Current-state reset and plan freeze

Status: complete when this roadmap version is on `main`

Purpose:

- remove stale current-state claims
- record the correct 26 / 27 / 123 / 148 counts
- pause Batch 6 canonical implementation
- store the seven-PR remediation plan in the repository

Canonical data changes: none.

## Remediation PR 2 — Canonical-derived public output pipeline

Status: next

Purpose:

- establish one reusable canonical data-loading path
- derive counts, verification dates, schema version, canonical origin, and generated time
- remove the possibility of separately maintained public counts

Expected files:

```text
scripts/build-public-data.mjs
scripts/lib/canonical-data.mjs
scripts/lib/public-records.mjs
config/public-data.json
package.json
```

Completion gates:

- all public counts derive from canonical arrays
- build metadata follows a documented reproducible rule
- internal staging is excluded by construction
- standard validation and build pass

## Remediation PR 3 — Machine-readable public layer

Status: blocked by PR 2

Endpoints:

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

- canonical and public ID sets match
- canonical and public counts match
- `canonical_only` is true
- public records link to human canonical pages
- unverified or internal records are absent

## Remediation PR 4 — Canonical metadata and discovery

Status: blocked by PR 3

Scope:

- canonical links
- alternate JSON discovery
- Open Graph metadata
- conservative JSON-LD
- sitemap
- robots policy
- production-origin configuration
- preview noindex behavior
- human-visible data-discovery links

Completion gates:

- all canonical HTML pages declare production canonical URLs
- preview pages do not compete in indexing
- all canonical bridge and incident pages appear in the sitemap
- sitemap excludes old slugs

## Remediation PR 5 — Legacy redirects

Status: blocked by PR 4

Scope:

- generate Cloudflare redirects from `previous_slugs` and `redirect_from`
- reject loops, duplicate sources, and missing targets
- retire obsolete routes explicitly

Completion gates:

- every accepted legacy route returns 301 to a live canonical page
- no legacy URL appears as canonical or in the sitemap

## Remediation PR 6 — Post-build consistency CI

Status: blocked by PR 5

Scope:

- compare canonical JSON, public JSON, manifest, version, HTML, sitemap, and generated detail pages
- inspect `dist` for stale or unsafe output
- reject internal, private, draft, monitoring, candidate, and staging data
- validate canonical links, discovery links, structured data, robots, sitemap, and redirects

Completion gates:

- intentional mismatch tests fail
- clean build passes all canonical and post-build checks

## Remediation PR 7 — Production verification and audit closure

Status: blocked by PR 6

Scope:

- verify Cloudflare production HTML and JSON directly
- verify all canonical detail pages and redirects
- compare normal and cache-bypassed responses
- record all checked URLs, sources, counts, PRs, commits, CI, and remaining limitations

Required report:

```text
docs/audits/public-consistency-verification-2026-06.md
```

Completion gate:

- production presents one consistent canonical state to humans, AI systems, search engines, and external tools

---

# Phase 2 — Record expansion resume

Phase 2 resumes only after remediation PR 7.

## Resume gate

Before any new record work:

1. verify live main head and open PRs
2. verify production audit completion
3. compare `phase2-batch6-records` with latest main
4. replace or fast-forward the parked branch as necessary
5. read canonical JSON directly
6. derive the next IDs and counts
7. re-read the Batch 6 scope and boundary decisions

## Roadmap PR — Implement Phase 2 Batch 6

Theme:

```text
cross-chain aggregation and routing incidents
```

Selected candidates:

```text
Transit Swap
Rubic
Unizen
Magpie Protocol
```

Provisional shape:

```text
Bridges     +4
Incidents   +5 to +6
Events      +20 to +28
Evidence    +28 to +38
```

Required decisions:

- routing-layer versus underlying bridge failure
- approval exposure versus realized loss
- operator-wallet versus contract incident
- integrated dependency versus directly affected system
- reimbursement announcement versus payment start versus completion
- Magpie Protocol versus later `fly` identity
- Unizen Trade versus later UIP architecture

Completion gates:

- all four entity boundaries resolved
- Rubic incidents remain separate
- Transit Swap amounts reconciled
- Unizen reimbursement status supported beyond announcement level
- Magpie reimbursement and current status verified
- canonical validation passes
- post-build public consistency checks pass
- production output remains aligned after merge

## Roadmap PR — Define Phase 2 Batch 7 scope

Purpose:

Select the next bounded group after reviewing corpus gaps created by Batches 1–6.

Candidate selection rules:

- prefer meaningful bridge or interoperability lifecycle coverage
- preserve entity and incident boundaries
- avoid adding weakly sourced records only to increase counts
- include terminal, migration, replacement, and recovery cases where evidence is strong

Deliverable:

```text
docs/batches/phase2-batch-07-scope.md
```

## Roadmap PR — Implement Phase 2 Batch 7

Requirements:

- direct canonical duplicate checks
- primary-source review
- entity, incident, event, and evidence implementation
- reference dictionary updates only when necessary
- full canonical and public consistency checks
- production verification after merge

---

# Phase 3 — Full-corpus quality strengthening

## Roadmap PR — Corpus audit inventory

Create a machine-readable and human-readable inventory of:

- source-tier gaps
- missing or weak official evidence
- stale verification dates
- unresolved amount conflicts
- unclear recovery or reimbursement states
- current-status uncertainty
- missing archive URLs
- missing redirect mappings

The audit must not modify canonical claims in the same PR.

## Roadmap PR — Primary-source strengthening

Improve records with weak or secondary-only support.

Priorities:

1. incident existence and root cause
2. loss amount basis
3. recovery and returned funds
4. reimbursement status
5. restart, migration, deprecation, or shutdown
6. current operating state

## Roadmap PR — Aftermath normalization

Normalize distinctions across the corpus:

```text
reported loss
realized loss
protected exposure
returned funds
recovered funds
rescued funds
frozen funds
burned supply
reimbursement announced
reimbursement started
reimbursement completed
restart announced
restart completed
```

## Roadmap PR — URL and archive hardening

Tasks:

- verify official URLs
- add archived URLs where appropriate
- distinguish live, redirected, archived, dead, and unknown source states
- verify canonical page URLs and legacy redirects
- ensure public JSON and HTML remain aligned

## Roadmap PR — Validator strengthening

Add or tighten checks for:

- relationship targets
- redirect collisions
- source-count consistency
- amount-claim evidence references
- terminal-state requirements
- verification-date shape and freshness policy
- public output safety
- schema and endpoint contracts

---

# Phase 4 — Public contract stabilization

Most implementation work is completed early by the emergency remediation.

The later Phase 4 review focuses on:

- schema-version policy
- backward-compatibility expectations
- endpoint stability
- cross-site ledger-series alignment
- public change documentation
- deprecation policy for machine-readable fields and routes

Deliverables may include:

```text
docs/machine-readable-contract.md
docs/public-data-change-policy.md
```

---

# Phase 5 — Monitoring and candidate collection

Monitoring may begin only after the public canonical boundary is enforced.

## Rules

- monitoring output is private or internal by default
- monitoring never modifies canonical JSON directly
- candidates require manual source review
- candidate drafts are not public machine-readable records
- automated publication remains prohibited

## Planned work

1. define monitoring sources and frequency
2. collect candidate changes
3. deduplicate against canonical records
4. produce internal review packets
5. generate draft PR material without opening or merging canonical PRs automatically
6. alert only on meaningful changes or failures

## Safety gate

CI must prove that monitoring directories and candidate fields cannot enter public output.

---

# Release — v1 hardening

## Roadmap PR — Documentation and methodology review

Review:

- project purpose
- inclusion and exclusion rules
- uncertainty language
- source tiers
- amount handling
- recovery and reimbursement definitions
- public-data guidance
- limitations

## Roadmap PR — Accessibility and UI review

Review:

- keyboard navigation
- focus states
- contrast
- table behavior
- mobile behavior
- filter usability
- detail-page readability
- machine-readable discovery usability

## Roadmap PR — Performance and deployment review

Review:

- static build size
- page generation time
- asset caching
- JSON caching
- Cloudflare production configuration
- redirect behavior
- sitemap and robots responses
- preview isolation

## Roadmap PR — v1 release checkpoint

Release only when:

- canonical data validates
- public output matches canonical data
- production verification passes
- no critical corpus-audit issues remain undocumented
- monitoring cannot publish automatically
- recovery documentation is current
- all v1 limitations are documented

---

# Permanent operating rules

1. Never write canonical changes directly to main.
2. Use one branch and one bounded PR per task.
3. Read canonical JSON before assigning IDs or counts.
4. Treat GitHub and canonical JSON as the current source of truth.
5. Label historical checkpoints explicitly; never present an embedded old SHA as the live main head.
6. Keep canonical, candidate, monitoring, internal, and private data separate.
7. Do not merge temporary generators, diagnostics, write-enabled workflows, or source captures.
8. Keep reported, returned, recovered, reimbursed, frozen, minted, and burned amounts distinct.
9. A vulnerability disclosure is not automatically an exploit incident.
10. A relaunch announcement is not proof of resumed operation.
11. Every PR must pass canonical and public-consistency checks appropriate to its phase.
12. After every merge, update the recovery checkpoint without hardcoding a live SHA that will immediately become stale.

# Standard merge report

After each merge, record:

```text
PR number and title
merge commit
changed files
canonical count delta
CI result
Cloudflare preview result
production verification result, when applicable
current roadmap position
next PR
```
