# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-06-19

## Project state

Bridge Incident Registry remains in Phase 2 record expansion, but canonical record growth is paused for the emergency public-consistency remediation.

Five reviewed expansion batches and the Batch 6 scope are complete.

## Canonical source of truth

```text
data/bridges.json
data/incidents.json
data/events.json
data/evidence.json
data/reference/chains.json
data/reference/assets.json
```

All human and machine-readable public output must derive from these files.

## Current canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Last completed record work

Phase 2 Batch 5 added:

- Ren Protocol / RenVM / RenBridge
- Avalanche-Ethereum Bridge / AEB
- Avalanche Bridge
- ShuttleFlow

Batch 5 delta:

```text
Bridges     +4
Incidents   +0
Events      +20
Evidence    +23
```

## Last completed scope work

Phase 2 Batch 6 scope is complete for:

```text
Transit Swap
Rubic
Unizen
Magpie Protocol
```

Canonical implementation remains paused.

## Current remediation progress

```text
PR 1  Current-state reset and plan freeze     complete — PR #50
PR 2  Canonical-derived public output         complete when this file reaches main
PR 3  Machine-readable public layer           next
PR 4  Canonical metadata and discovery        blocked by PR 3
PR 5  Legacy redirects                        blocked by PR 4
PR 6  Post-build consistency CI               blocked by PR 5
PR 7  Production verification                 blocked by PR 6
```

Detailed plan:

```text
docs/runbooks/public-consistency-remediation.md
```

## PR 2 implementation

PR 2 adds a canonical-derived internal generation layer.

Configuration:

```text
config/public-data.json
```

Generator:

```text
scripts/build-public-data.mjs
scripts/lib/canonical-data.mjs
scripts/lib/public-records.mjs
```

Staging output:

```text
.generated/public-data/
```

The staging directory is ignored by Git and is not deployed from `public/`.

The generator derives:

- record counts
- latest verification date
- generated time
- schema version
- canonical origin
- `canonical_only`
- human-page links for generated records

`npm run build` now invokes the generator through the npm `prebuild` hook.

PR 3 will publish reviewed generated output as formal endpoints.

## Remaining remediation work

Still not public at this stage:

- `/version.json`
- `/data/manifest.json`
- bridge, incident, event, and evidence JSON endpoints
- `llms.txt`
- `ai.txt`
- canonical and alternate links
- JSON-LD and Open Graph metadata
- sitemap and robots policy
- generated legacy redirects
- post-build consistency CI
- production verification report

## Parked branch rule

```text
phase2-batch6-records
```

is parked. Do not add canonical records to it until PR 7 closes production verification.

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
Emergency public consistency                       in progress — PR 2 of 7
Phase 3  Full-corpus quality strengthening         planned
Phase 4  Machine-readable public layer             being completed early
Phase 5  Monitoring and candidate collection       planned
Release  v1 hardening                              planned
```

## Batch 6 resume gate

Batch 6 may resume only after:

1. machine-readable endpoints derive from canonical data
2. canonical metadata, sitemap, robots, and discovery are complete
3. legacy routes redirect correctly
4. CI compares canonical JSON, public JSON, HTML, metadata, and `dist`
5. non-canonical material is blocked from public output
6. Cloudflare production HTML and JSON are directly verified
7. the production audit report is merged

## Reporting rule

After every merge, report the PR, merge commit, changed files, canonical count delta, CI result, production result when applicable, current roadmap position, and next PR.
