# Archive Capture Batch 12 deployment refresh — 2026-08-03

Status: build-input refresh pending  
Canonical merge: `7d5d6edfc2c7ed355fcfd78a51076e0bd4cc7029`

## Initial production verification

The unchanged full-content verifier did not converge after twenty attempts:

```text
Production run         30791989085
Failed production job  91617276143
Observed generated_at  2026-08-03T06:55:57.708Z
First mismatch         bir_src_000076
Rejected attempts      1–20
```

Production returned valid status codes and unchanged record counts, but it retained the prior same-count evidence content without the six Batch 12 archive fields.

## Refresh method

Batch 11 proved that docs-only commits do not reliably cross the Cloudflare Pages deployment path filter. Batch 12 therefore changes only the existing non-executable marker comment in `scripts/build-public-site.mjs`:

```js
// Batch 12 deployment refresh: execution order and public contract are unchanged.
```

This changes a reviewed build input while preserving execution behavior.

It does not change:

- canonical bridge, incident, event, or evidence data;
- archive mappings;
- source-quality ceilings;
- build steps or their order;
- validation or production-verification behavior;
- routes, metadata, or public contract definitions.

The same failed production workflow run must be retried after this commit reaches `main`. Batch 12 is not production-verified until all ninety-one canonical archive fields and every other transformed public field match production.