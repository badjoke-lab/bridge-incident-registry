# Production verification — Archive Capture Batch 18 — 2026-08-09

Status: complete

## Verified production state

```text
Canonical merge                  50ca3782c4940e095ff94de2cce220a3ee0c7da5
Build-input refresh              59b74d26a86373e6e97e6e630b54becd35f64910
Bridges                           33
Incidents                         34
Events                           183
Evidence                         284
Evidence with archived_url       124
Terminal unarchived unique URLs   17
Terminal unarchived records       27
Risky-host unarchived unique URLs 18
Risky-host unarchived records     32
X/Twitter records unarchived      29
Canonical public content match   true
HTML routes                        72
Redirects                          74
Generated at                      2026-08-08T16:07:52.937Z
Publication attempt                1 after refresh
```

## Initial failed verification

```text
Run                    31266002708
Job                    93124105488
Rejected attempts      1–20
First mismatch         bir_src_000132
Attempts 1–14          generated_at 2026-08-08T15:57:37.030Z
Attempts 15–20         generated_at 2026-08-08T16:06:25.283Z
Content match          false
```

The initial verifier correctly rejected same-count stale evidence content for all twenty attempts. A newer generated build appeared at attempt 15, but `bir_src_000132` still did not match canonical-derived Batch 18 content.

PR #197 then applied the one permitted behavior-neutral build-input refresh. It changed only the non-executable Batch marker in `scripts/build-public-site.mjs` and recorded the deployment-refresh audit. Canonical data, build order, generated public-data semantics, routes, validators, and verification expectations remained unchanged.

## Successful post-refresh verification

```text
Production verification run  31266360510
Production verification job  93125031659
Publication attempt           1 after refresh
Generated at                  2026-08-08T16:07:52.937Z
```

The unchanged full-content verifier observed the exact Batch 18 canonical-derived publication on its first post-refresh attempt. All four public datasets returned HTTP 200 and matched canonical-derived output with no content mismatches.

The verifier also passed the canonical-only version and manifest markers, all five static routes, all 33 bridge routes, all 34 incident routes, canonical metadata and JSON-LD, exact sitemap equality, custom-domain robots, all 74 legacy redirects, content types, and cache observations.

No second build-input refresh was used or permitted.

## Batch 18 publication boundary

The published evidence changes are limited to the four archive fields reviewed in PR #194 and applied in PR #195:

```text
bir_src_000137
bir_src_000197
bir_src_000192
bir_src_000132
```

Counts alone were not used as proof. The initial twenty-attempt failure demonstrates that same-count stale evidence content is rejected by the field-level equality gate.

## Archive-review boundary after Batch 18

Batch 18 reviewed all nine remaining previously-unreviewed terminal/risky-host candidate URLs visible to the established reviewer. There is no untouched archive-review batch remaining. Future archive-preservation work must retry explicitly deferred reviewed candidates or process newly introduced canonical source URLs under the same exact-replay, temporal-fit, size, and reproducibility requirements.
