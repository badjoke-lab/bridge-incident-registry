# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

```text
Bridges     30
Incidents   32
Events      150
Evidence    181
```

Canonical source files:

```text
data/bridges.json       30
data/incidents.json     32
data/events.json        150
data/evidence.json      181
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

The original public-consistency audit passed on GitHub Actions run `30290442852` and is recorded in `docs/audits/production-verification-2026-07-28.md`.

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   merged and production-verified
Batch 6B   source-gated
Batch 7    planned
```

Batch 6A added Transit Swap and Magpie Protocol / Fly:

```text
Bridge entities   2
Incident cases    2
Timeline events   11
Evidence records  12
```

Canonical merge:

```text
PR #63  c074d411b9c1d99b0f5cd56c5ade3125952de13c
```

Production verification run `30306150605` passed against all 62 canonical HTML routes and the 28 / 29 / 134 / 160 public-data state.

Records:

- `docs/batches/phase2-batch-06a-implementation.md`
- `docs/audits/production-verification-batch6a-2026-07-28.md`

## Production verifier

The verifier now uses browser-compatible request headers. Cloudflare had returned Error 1010 to the previous custom automation User-Agent even though production content was healthy. Verification assertions were not reduced.

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

1. continue Batch 6B source resolution for Rubic and Unizen
2. promote only records whose primary/archive and reimbursement gates are satisfied
3. prepare a separate reviewed Batch 6B canonical-data PR
4. run repository and production verification after any merge

## Record expansion

Batch 6A is public and verified. Rubic and Unizen remain non-canonical until their dedicated source and data review is complete.
