# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts on Batch 6A review branch

```text
Bridges     28
Incidents   29
Events      134
Evidence    160
```

`main` remains at its prior canonical totals until the Batch 6A data PR merges.

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
```

## Last completed production verification

GitHub Actions production-verification run `30290442852` passed against `https://bridge-incident-registry.pages.dev` before Batch 6A.

Verified surfaces included:

- all static registry pages
- all 26 bridge detail routes
- all 27 incident detail routes
- canonical JSON endpoints and ordered IDs
- canonical metadata and JSON-LD
- robots and sitemap
- generated legacy redirects
- content types and observable cache headers

Full audit: `docs/audits/production-verification-2026-07-28.md`.

## Batch 6A review state

Branch:

```text
agent/phase2-batch6a-records
```

Implemented:

- Transit Swap entity and October 2022 incident
- Magpie Protocol / Fly entity and April 2024 incident
- 11 timeline events
- 12 evidence records
- current count synchronization

The bounded generator passed all repository checks before committing canonical data. The temporary generator, write-enabled workflow, and trigger file have been removed.

## Next

1. open the cleaned Batch 6A canonical-data PR
2. verify the final PR diff contains no temporary workflow or generator
3. require the normal Check workflow to pass
4. merge after review
5. run production verification against 28 bridge and 29 incident detail routes
6. continue source-gated Batch 6B work for Rubic and Unizen
