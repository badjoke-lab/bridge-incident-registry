# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
```

Canonical source files:

```text
data/bridges.json       28
data/incidents.json     29
data/events.json        134
data/evidence.json      160
```

## Public-consistency remediation

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete — PR #59
```

Production verification passed on GitHub Actions run `30290442852`. The audit is recorded in `docs/audits/production-verification-2026-07-28.md`.

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   canonical implementation complete on review branch
Batch 6B   source-gated
Batch 7    planned
```

Batch 6A adds Transit Swap and Magpie Protocol / Fly:

```text
Bridge entities   2
Incident cases    2
Timeline events   11
Evidence records  12
```

Implementation record: `docs/batches/phase2-batch-06a-implementation.md`.

## Public representations covered

The repository and production checks cover:

- human-facing HTML
- version and manifest metadata
- bridge, incident, event, evidence, chain, and asset JSON
- `llms.txt` and `ai.txt`
- canonical and alternate metadata
- Open Graph, Twitter, and JSON-LD metadata
- sitemap and robots policy
- Cloudflare response headers and observable cache metadata
- legacy route redirects
- canonical/public counts, IDs, routes, and publication boundaries

## Next

1. run the normal pull-request CI against the cleaned Batch 6A branch
2. review the canonical diff and merge only after all checks pass
3. run explicit production verification for the 28 bridge and 29 incident routes
4. resume Batch 6B source work for Rubic and Unizen

## Record expansion

Canonical Batch 6A is implemented but is not part of `main` until its reviewed data PR merges. Batch 6B candidates remain non-canonical.
