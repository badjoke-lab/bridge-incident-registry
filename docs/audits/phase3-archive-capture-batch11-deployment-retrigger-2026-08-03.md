# Archive Capture Batch 11 deployment retrigger — 2026-08-03

Status: build-input cache bust pending  
Canonical merge: `f8c0772acbabbf7f468f818e3d8f00b83ca9e38a`

## Initial production verification

The first explicit production-verification run for Archive Capture Batch 11 did not converge after twenty attempts. Production continued to return the prior evidence content for `bir_src_000029`.

```text
Production verification run  30783692287
First failed job             91593095620
Final observed generated_at  2026-08-03T04:13:42.118Z
First mismatch               bir_src_000029
Rejected attempts            1–20
```

## Docs-only retrigger

PR #155 added a docs-only `main` commit:

```text
Docs-only retrigger merge  d143b3b12b11c79cd0d78e30b965a25ed4d5e480
Docs-only normal CI        30783987769
Second failed job          91594233914
Observed generated_at      2026-08-03T04:13:42.118Z
Rejected attempts          1–20
```

The unchanged `generated_at` proves that the docs-only commit did not start a new Cloudflare Pages production build. The repository's deployment path filter or build cache therefore requires a changed build input.

## Build-input cache bust

A second bounded retrigger changes only one non-executable comment in `scripts/build-public-site.mjs`:

```js
// Batch 11 deployment cache bust: execution order and public contract are unchanged.
```

This ensures the Pages integration observes a build-input change while preserving exactly the same execution order and behavior.

It does not change:

- canonical bridge, incident, event, or evidence data;
- archive mappings;
- source-quality ceilings;
- build steps or their order;
- validation or production-verification behavior;
- routes, metadata, or public contract definitions.

The unchanged full-content verifier must be rerun after the cache-bust commit reaches `main`. Archive Capture Batch 11 is not production-verified until all eighty-five canonical archive fields and every other transformed public field match production.
