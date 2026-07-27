# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-28

## Canonical state

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

Canonical source files:

```text
data/bridges.json       26
data/incidents.json     27
data/events.json        123
data/evidence.json      148
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

1. verify latest `main` and open PRs
2. recreate the missing `phase2-batch6-records` branch from current `main`
3. re-read the Batch 6 scope
4. derive all IDs and counts from current canonical JSON
5. resume reviewed canonical record expansion

## Record expansion

Canonical record expansion is unblocked. Candidate research remains non-canonical until a dedicated reviewed data PR is merged.
