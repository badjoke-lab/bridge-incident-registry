# Production verification — Archive Deferred Retry 01 — 2026-08-09

Status: complete

## Verified production state

```text
Canonical merge                  934c85c49f7db71773721c5f4d64cc769f1361b0
Bridges                           33
Incidents                         34
Events                           183
Evidence                         284
Evidence with archived_url       126
Terminal unarchived unique URLs   15
Terminal unarchived records       25
Risky-host unarchived unique URLs 17
Risky-host unarchived records     31
X/Twitter records unarchived      29
Canonical public content match   true
HTML routes                        72
Redirects                          74
Generated at                      2026-08-08T16:33:32.318Z
```

## Verification execution

```text
Production verification run  31267226936
Production verification job  93127231682
Read-only production probe    31267391787 / 93127650808
```

The unchanged full-content production verifier completed successfully against canonical merge `934c85c49f7db71773721c5f4d64cc769f1361b0`.

A separate read-only production probe then confirmed the live `version.json` at `generated_at 2026-08-08T16:33:32.318Z` with canonical-only markers and exact counts `33 / 34 / 183 / 284`. The same probe confirmed the two reviewed canonical archive mappings are present live:

```text
bir_src_000037  https://web.archive.org/web/20220208083931/https://medium.com/@QubitFin/our-compensation-plan-1-63e7c64738ed
bir_src_000068  https://web.archive.org/web/20221009125416/https://talk.harmony.one/t/summary-of-the-horizon-bridge-incident/20990
```

The verifier also passed all four public datasets, all 72 canonical HTML routes, 74 legacy redirects, canonical metadata and JSON-LD, sitemap, robots, content types, cache observations, version metadata, manifest metadata, and canonical-only markers.

Counts alone were not used as publication proof. No build-input refresh or Cloudflare queue remediation was required for Deferred Retry 01.

## Publication boundary

The published canonical change remains limited to the two archive fields reviewed in PR #199 and applied in PR #200. Source URLs, titles, claims, publication dates, source hierarchy, reliability, and record linkages are unchanged.
