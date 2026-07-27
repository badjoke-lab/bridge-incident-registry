# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

```text
Bridges     33
Incidents   34
Events      173
Evidence    199
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        173
data/evidence.json      199
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

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   merged and production-verified
Batch 6B   merged and production-verified
Batch 7    next
```

## Batch 6A checkpoint

```text
Canonical data PR      #63
Merge commit           c074d411b9c1d99b0f5cd56c5ade3125952de13c
Production verify      30306303489
Verified state         28 / 29 / 134 / 160
Verified HTML routes   62
```

## Batch 6B checkpoint

```text
Canonical data PR      #66
Merge commit           1d2ccf24edab7b764160da130fc2e36146e6f1b1
Production verify      30307748017
Verified state         30 / 32 / 150 / 181
Verified HTML routes   67
```

Batch 6B added:

- Rubic entity
- Rubic RBC/BRBC bridge wallet incident
- Rubic RubicProxy approval incident
- Unizen entity
- Unizen March 2024 approval incident
- 16 timeline events
- 21 evidence records
- RBC and BRBC asset references

Records:

- `docs/batches/phase2-batch-06b-source-resolution-2026-07-28.md`
- `docs/batches/phase2-batch-06b-implementation.md`
- `docs/audits/production-verification-batch6b-2026-07-28.md`

## Production verifier

The verifier:

- uses browser-compatible request headers because Cloudflare rejected the previous custom automation User-Agent
- waits for canonical `version.json` counts to converge before route checks
- uses a bounded default window of 20 attempts at 15-second intervals
- fails if publication does not converge within five minutes
- retains all count, ID, route, reference, metadata, sitemap, robots, redirect, content-type, and cache assertions

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

1. verify latest `main` and open PRs after the Batch 6B audit merges
2. define the reviewed Phase 2 Batch 7 candidate scope
3. derive IDs only from the 30 / 32 / 150 / 181 baseline
4. preserve candidate research as non-canonical until a dedicated data PR
5. require repository and production verification for every canonical merge

## Record expansion

Phase 2 Batch 6 is complete. Batch 7 is the next bounded record-expansion workstream.
