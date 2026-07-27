# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
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

Completed merge checkpoints:

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
PR #52  6f3b8aad06edc7027fb362120aabe19fa46d52ee
PR #53  5558a50e0a0f34ceca7c4b34816db29b0e7ae17b
PR #54  40632e3e5cf600490097d58a15210dabce704ede
PR #58  57e4fc948fc9a26f20833b657c8d31822c72f56a
PR #59  e511911d97216366386ff808d9dfb80bdfd19334
PR #61  bcf59e4c811f2d68a3cfeb89cceaa76c24fba9f0
PR #62  90304ecbb9dfef4670d91093873a05aa87e770d2
PR #63  c074d411b9c1d99b0f5cd56c5ade3125952de13c
```

## Batch 6A completion

Published canonical records:

- Transit Swap entity and October 2022 incident
- Magpie Protocol / Fly entity and April 2024 incident
- 11 timeline events
- 12 evidence records

Production Verification run `30306150605` passed against `https://bridge-incident-registry.pages.dev`.

Verified surfaces:

- all five static registry pages
- all 28 bridge detail routes
- all 29 incident detail routes
- canonical JSON endpoints and ordered IDs
- 28 / 29 / 134 / 160 version and manifest counts
- canonical metadata and JSON-LD identifiers
- robots and 62-route sitemap
- generated legacy redirects
- content types and observable cache headers

Audit: `docs/audits/production-verification-batch6a-2026-07-28.md`.

## Production verifier correction

Cloudflare Error 1010 blocked the verifier's previous custom automation User-Agent. The verifier now sends browser-compatible request headers while retaining every content, route, metadata, count, ID, redirect, and cache assertion.

## Next

1. verify latest `main` and open PRs
2. create a fresh bounded Batch 6B research branch
3. re-read `docs/batches/phase2-batch-06-source-resolution-2026-07-28.md`
4. resolve Rubic's two incident source and outcome gates
5. resolve Unizen's first-party incident and reimbursement gates
6. assign IDs only after both candidates pass review
7. promote through a separate canonical-data PR and production verification
