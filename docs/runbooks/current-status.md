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

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   merged and production-verified
Batch 6B   merged and production-verified
Batch 7    merged and production-verified
```

## Batch 7 checkpoint

```text
Canonical data PR      #69
Merge commit           eb6bc7366ea25be4441c72cdfa50b753477eef34
Production verify      30309573252
Verified state         33 / 34 / 173 / 199
Verified HTML routes   72
```

Batch 7 added:

- Taiko Bridge entity and June 2026 incident
- Everclear / Connext lifecycle entity
- Commons Bridge entity and April 2026 incident
- 23 timeline events
- 18 evidence records
- SYND, CLEAR, and NEXT asset references
- Taiko, Base, and Commons Chain references

Records:

- `docs/batches/phase2-batch-07-scope-2026-07-28.md`
- `docs/batches/phase2-batch-07-implementation.md`
- `docs/audits/production-verification-batch7-2026-07-28.md`

## Production verifier

The verifier:

- uses browser-compatible request headers
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

1. verify latest `main` and open PRs after the Batch 7 audit merges
2. start Phase 3 full-corpus quality strengthening
3. audit every bridge, incident, event, and evidence record for schema drift and aftermath consistency
4. separate mechanical normalization from claim-changing data review
5. require repository and production verification for every canonical change

## Record expansion

Phase 2 Batches 1–7 are complete. Phase 3 full-corpus quality strengthening is the next bounded workstream.
