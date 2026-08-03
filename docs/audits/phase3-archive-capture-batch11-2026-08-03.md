# Phase 3 archive capture Batch 11 — 2026-08-03

Status: canonical application in progress  
Review boundary: PR #152

## Approved mapping

```text
Evidence  bir_src_000029
Source    https://twitter.com/MultichainOrg/status/1679768407628185600
Archive   https://web.archive.org/web/20250725204239/https://x.com/MultichainOrg/status/1679768407628185600
```

The review runner confirmed HTTP 200 HTML and 68,624 replay bytes for the concrete timestamped X/Twitter host-alias capture.

## Expected canonical state

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

## Safety

Only `archived_url` on `bir_src_000029` and the two no-regression ceilings may change. Source URL, claim, source tier, reliability, primary status, date, and linkages must remain unchanged. Production verification is mandatory after merge.
