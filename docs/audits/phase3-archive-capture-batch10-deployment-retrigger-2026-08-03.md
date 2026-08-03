# Archive Capture Batch 10 deployment retrigger — 2026-08-03

Status: deployment retrigger only  
Canonical merge: `6edc02270d1fdfd202ec13874a2a00845ce97897`

## Reason

The first explicit production-verification run for Archive Capture Batch 10 did not converge after twenty attempts. Production remained on the prior same-count Batch 9 public dataset throughout the five-minute publication window.

```text
Production verification run  30781383081
Production verification job  91586560207
Observed generated_at         2026-08-03T03:13:51.429Z
First mismatch                bir_src_000025
Rejected attempts             1–20
```

## Scope

This docs-only commit exists solely to retrigger the Cloudflare Pages Git deployment from `main`.

It does not change:

- canonical bridge, incident, event, or evidence data;
- archive mappings;
- source-quality ceilings;
- validation or production-verification logic;
- routes, metadata, or public contract definitions.

The unchanged full-content verifier must be rerun after this commit reaches `main`. Archive Capture Batch 10 is not production-verified until all eighty-four canonical archive fields and every other transformed public field match production.
