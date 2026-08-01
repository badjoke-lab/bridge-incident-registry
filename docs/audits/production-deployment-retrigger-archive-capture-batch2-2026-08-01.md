# Archive Capture Batch 2 production deployment retrigger — 2026-08-01

Status: deployment retrigger only  
Canonical data changes: none

## Confirmed failure state

```text
Expected evidence                       284
Expected archived evidence               21
Observed evidence                       284
Observed content at bir_src_000126       Batch 1 / no new archive field
Observed generated_at                    2026-08-01T06:54:37.242Z
Production verification attempts         20 / 20
Failed production run                    30688749856
```

The canonical migration in PR #123 passed all repository checks and merged as `a0763951c612fae6149093ae7124de622a54e342`. Production continued serving a same-count pre-Batch-2 evidence dataset for the full verification window.

## Diagnosis

This is a Cloudflare Pages Git-integration publication miss, not a canonical-data, build, source-quality, route, or verifier failure. The unchanged full-content verifier correctly rejected production at `bir_src_000126` on every attempt.

## Safety

This document creates a docs-only `main` push to retrigger the existing Cloudflare Pages deployment.

It changes no:

- canonical record;
- archive mapping;
- source-quality ceiling;
- validator or verifier assertion;
- build rule;
- route;
- runtime setting;
- publication timeout.

## Completion condition

After this docs-only merge, rerun the unchanged production-verification gate from PR #124. It must pass only when production publishes all twenty-one exact archive fields and complete canonical-derived content equality.