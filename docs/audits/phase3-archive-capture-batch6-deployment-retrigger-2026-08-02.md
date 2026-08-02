# Archive Capture Batch 6 deployment retrigger — 2026-08-02

Status: deployment retrigger only  
Canonical merge: `f552007f5a37e6c988aec7884b0e122156102daf`

## Reason

The first explicit production-verification run for Archive Capture Batch 6 did not converge after twenty attempts. Production remained on the prior same-count Batch 5 public dataset throughout the five-minute publication window.

```text
Production verification run  30734330854
Observed generated_at         2026-08-02T05:31:08.973Z
First mismatch                bir_src_000032
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

The unchanged full-content verifier must be rerun after this commit reaches `main`. Archive Capture Batch 6 is not production-verified until all sixty-four canonical archive fields and every other transformed public field match production.
