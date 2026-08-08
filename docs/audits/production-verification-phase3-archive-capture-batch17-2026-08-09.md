# Production verification — Archive Capture Batch 17 — 2026-08-09

Status: complete

## Verified production state

```text
Canonical merge                  3aa5f6cbd7a38ac1da5332e5dd3ea038409776d7
Bridges                           33
Incidents                         34
Events                           183
Evidence                         284
Evidence with archived_url       120
Terminal unarchived unique URLs   21
Terminal unarchived records       31
Risky-host unarchived unique URLs 18
Risky-host unarchived records     32
X/Twitter records unarchived      29
Canonical public content match   true
HTML routes                        72
Redirects                          74
Generated at                      2026-08-08T15:46:44.950Z
Publication attempt                5
```

## Verification execution

```text
Production verification run  31265282488
Production verification job  93122316026
```

The unchanged full-content verifier rejected same-count stale production on attempts 1 through 4. Production already reported 33 bridges, 34 incidents, 183 events, and 284 evidence records, but the evidence dataset still differed at `bir_src_000024`; the stale build reported `generated_at 2026-08-08T15:43:15.450Z`.

Attempt 5 observed `generated_at 2026-08-08T15:46:44.950Z`. All four public datasets returned HTTP 200 and matched canonical-derived output with no content mismatches.

The verifier also passed the canonical-only version and manifest markers, all five static routes, all 33 bridge routes, all 34 incident routes, canonical metadata and JSON-LD, exact sitemap equality, custom-domain robots, all 74 legacy redirects, content types, and cache observations.

No behavior-neutral build-input refresh was required for Batch 17. Normal production deployment convergence occurred inside the unchanged twenty-attempt publication window.

## Batch 17 publication boundary

The published evidence changes are limited to the four archive fields reviewed in PR #191 and applied in PR #192:

```text
bir_src_000188
bir_src_000024
bir_src_000070
bir_src_000196
```

Counts alone were not used as proof. Attempts 1 through 4 demonstrate that same-count stale evidence content is rejected by the field-level equality gate.
