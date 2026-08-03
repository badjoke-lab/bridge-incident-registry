# Archive Capture Batch 12 deployment refresh — 2026-08-03

Status: complete  
Canonical merge: `7d5d6edfc2c7ed355fcfd78a51076e0bd4cc7029`  
Build-input refresh PR: `#160`  
Build-input refresh merge: `15023871b100b6b15b277163d09db8769a3bdb1b`

## Initial production verification

The unchanged full-content verifier did not converge after twenty attempts:

```text
Production run         30791989085
Initial failed job     91617276143
Observed generated_at  2026-08-03T06:55:57.708Z
First mismatch         bir_src_000076
Rejected attempts      1–20
```

Production returned valid status codes and unchanged record counts, but it retained the prior same-count evidence content without the six Batch 12 archive fields.

## Refresh method

Batch 11 proved that docs-only commits do not reliably cross the Cloudflare Pages deployment path filter. Batch 12 therefore changed only the existing non-executable marker comment in `scripts/build-public-site.mjs`:

```js
// Batch 12 deployment refresh: execution order and public contract are unchanged.
```

This changed a reviewed build input while preserving execution behavior. It did not change canonical data, archive mappings, source-quality ceilings, build steps or order, validators, routes, metadata, or the public contract.

## Immediate rerun

The failed production workflow was rerun immediately after the refresh reached `main`:

```text
Immediate rerun job    91618712843
Observed generated_at  2026-08-03T06:55:57.708Z
First mismatch         bir_src_000076
Rejected attempts      1–20
```

The unchanged generation timestamp proved that the Pages build had not completed inside the immediate five-minute verification window. No additional repository change was introduced.

## Delayed rerun and completion

The same failed workflow run was retried after the deployment delay:

```text
Delayed rerun job      91620118112
Attempts 1–17          prior content
Successful attempt     18
New generated_at       2026-08-03T07:18:33.180Z
Canonical match        true
HTML routes            72
Redirects              74
```

Attempt 18 returned the Batch 12 public evidence content. The unchanged verifier then confirmed all ninety-one archive fields and every other transformed public field.

## Operational conclusion

A reviewed build-input change may trigger Pages asynchronously and can take longer than the verifier's five-minute window. When `generated_at` remains unchanged, do not stack additional retrigger commits automatically. Preserve verifier expectations, allow the deployment delay, and rerun the same failed job. Publication is complete only after full-content equality succeeds.