# Phase 3 archive capture Batch 11 — 2026-08-03

Status: canonical complete; production verification pending  
Review boundary: PR #152  
Canonical PR: #153

## Applied mapping

```text
Evidence  bir_src_000029
Source    https://twitter.com/MultichainOrg/status/1679768407628185600
Archive   https://web.archive.org/web/20250725204239/https://x.com/MultichainOrg/status/1679768407628185600
```

The review runner confirmed HTTP 200 HTML and 68,624 replay bytes for the concrete timestamped X/Twitter host-alias capture.

## Canonical result

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url      84 -> 85
Terminal unique-URL queue       37 -> 36
Risky-host unique-URL queue     34 -> 33
Terminal evidence records       48 -> 47
Risky-host evidence records     52 -> 51
Incident source mismatches             0
Event source mismatches                0
Unknown URL status                     0
```

## Verification

```text
Review workflow run  30782953188
Review workflow job  91591043806
Canonical normal CI  30783449108
```

Normal CI passed canonical validation, source-count equality, source-quality no-regression, controlled failure fixtures, production-content fixtures, static build, and final output consistency.

## Safety

Only `archived_url` on `bir_src_000029` and the two no-regression ceilings changed. Source URL, claim, source tier, reliability, primary status, date, and linkages remain unchanged. The temporary applicator and write-enabled workflow were removed. Complete production-content verification remains mandatory after merge.
