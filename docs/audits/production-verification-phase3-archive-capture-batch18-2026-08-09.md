# Production verification — Archive Capture Batch 18 — 2026-08-09

Status: pending post-refresh verification

## Canonical publication target

```text
Canonical merge                  50ca3782c4940e095ff94de2cce220a3ee0c7da5
Build-input refresh              59b74d26a86373e6e97e6e630b54becd35f64910
Bridges                           33
Incidents                         34
Events                           183
Evidence                         284
Evidence with archived_url       124
Terminal unarchived unique URLs   17
Risky-host unarchived unique URLs 18
X/Twitter records unarchived      29
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

A newer generated build appeared during the initial window, but the evidence dataset remained stale at `bir_src_000132`. PR #197 therefore applied the one permitted behavior-neutral build-input refresh without changing canonical content or verification expectations.

## Required post-refresh proof

The unchanged production verifier must observe complete canonical-derived equality on `https://bir.badjoke-lab.com`, including all four public datasets, canonical-only markers, every canonical HTML route, sitemap, robots, JSON-LD, redirects, content types, and cache observations.

No second build-input refresh is permitted for Batch 18. If production remains stale, queue/deployment state must be investigated without weakening verification requirements.
