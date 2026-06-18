# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-06-19

GitHub state and canonical JSON are authoritative. Commit SHAs below are completed merge checkpoints, not live branch pointers.

## Canonical counts

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

## Remediation progress

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete when this file reaches main
PR 5  Legacy redirects                       next
PR 6  Post-build consistency CI              blocked by PR 5
PR 7  Production verification                blocked by PR 6
```

Completed merge checkpoints:

```text
PR #50  ed7d4871c82dcd6b089bb3ac6da5df538a83116c
PR #51  f7e0ff462c07fc02f6fe620d7a125546a27a45e3
PR #52  6f3b8aad06edc7027fb362120aabe19fa46d52ee
```

## PR 4 result

HTML output now declares:

- production canonical URLs
- machine-readable alternate links
- Open Graph and social metadata
- page-level JSON-LD
- preview noindex policy

Build output also generates and validates:

```text
/sitemap.xml
/robots.txt
/_headers
```

The sitemap derives canonical bridge and incident URLs from canonical JSON. Legacy slugs are excluded.

## Next

PR 5 generates Cloudflare redirects from `previous_slugs` and `redirect_from`, then validates uniqueness, targets, and loops.

## Record expansion

Phase 2 Batch 6 implementation remains paused. `phase2-batch6-records` remains parked through PR 7.
