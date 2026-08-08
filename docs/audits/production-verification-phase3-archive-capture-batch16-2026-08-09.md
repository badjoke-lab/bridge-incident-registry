# Production verification — Archive Capture Batch 16 — 2026-08-09

Status: complete

## Verified production state

```text
Canonical merge                  f9c6395d400358543bb3a761aa209be97ca1c266
Bridges                           33
Incidents                         34
Events                           183
Evidence                         284
Evidence with archived_url       116
Terminal unarchived unique URLs   25
Terminal unarchived records       35
Risky-host unarchived unique URLs 18
Risky-host unarchived records     32
X/Twitter records unarchived      29
Canonical public content match   true
HTML routes                        72
Redirects                          74
Generated at                      2026-08-08T15:23:20.361Z
Publication attempt                1
```

## Verification execution

```text
Production verification run  31264440303
Production verification job  93120202656
```

The unchanged full-content verifier observed the exact Batch 16 canonical-derived publication on its first attempt. All four public datasets returned HTTP 200 and matched canonical-derived output with no content mismatches.

The verifier also passed the canonical-only version and manifest markers, all five static routes, all 33 bridge routes, all 34 incident routes, canonical metadata and JSON-LD, exact sitemap equality, custom-domain robots, all 74 legacy redirects, content types, and cache observations.

No behavior-neutral build-input refresh was required for Batch 16. Production had already converged to `generated_at 2026-08-08T15:23:20.361Z` before the verifier started.

## Batch 16 publication boundary

The published evidence changes are limited to the six archive fields reviewed in PR #188 and applied in PR #189:

```text
bir_src_000069
bir_src_000027
bir_src_000026
bir_src_000168
bir_src_000173
bir_src_000176
```

Counts alone were not used as proof. Same-count stale evidence content would have failed the field-level equality gate.
