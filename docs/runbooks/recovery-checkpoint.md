# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-07-28

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
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
```

## Production verification result

GitHub Actions production-verification run `30290442852` passed against `https://bridge-incident-registry.pages.dev`.

Verified surfaces include:

- all static registry pages
- all 26 bridge detail routes
- all 27 incident detail routes
- canonical JSON endpoints and ordered IDs
- canonical metadata and JSON-LD
- robots and sitemap
- generated legacy redirects
- content types and observable cache headers

Full audit: `docs/audits/production-verification-2026-07-28.md`.

## Next

The documented parked `phase2-batch6-records` branch is not present in the current GitHub branch search. Create a fresh bounded Batch 6 branch from latest `main`, re-read the scope, derive IDs from canonical JSON, and resume record expansion.
