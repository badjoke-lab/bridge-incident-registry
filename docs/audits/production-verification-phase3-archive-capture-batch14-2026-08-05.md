# Production verification — Phase 3 Archive Capture Batch 14 — 2026-08-05

Status: complete  
Review PR: `#177`  
Review merge: `09c11e838a3b157a9efb7388f531ff04f723e4ff`  
Canonical PR: `#178`  
Canonical merge: `ca225d1df10b4a81d72a0fe60fd2713b6e8b543a`  
Build-input refresh PR: `#179`  
Build-input refresh: `3f0514b568e84b17daf9e0a2d14649b3a329c787`

## Verified production state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url          101
Terminal unarchived unique URLs      33
Terminal unarchived records          45
Risky-host unarchived unique URLs    24
Risky-host unarchived records        38
X/Twitter records unarchived         30
Canonical public content match       true
HTML routes                          72
Redirects                            74
Generated at                         2026-08-05T05:06:09.501Z
```

## Publication sequence

```text
Initial verification run             30976024931
Initial failed job                    92210067226
Immediate post-refresh run            30976430766
Immediate post-refresh failed job     92211270159
First delayed verification run        30976783627
First delayed failed job              92212328360
Successful delayed verification run   30977144358
Successful verification job           92213419237
Successful publication attempt        1 / 20
```

The first three twenty-attempt windows correctly rejected stale same-count evidence content at `bir_src_000013` while `generated_at` remained `2026-08-05T04:41:17.057Z`. Only one behavior-neutral build-input refresh was committed. No second refresh was introduced.

The next delayed verifier observed `generated_at 2026-08-05T05:06:09.501Z` on attempt 1 and confirmed complete canonical-derived public-content equality.

## Verified contract

- all transformed fields in all four public datasets exactly equal canonical-derived output;
- all seven Batch 14 `archived_url` fields are published;
- version and manifest counts and canonical-only markers match;
- five static routes, 33 bridge routes, and 34 incident routes pass;
- canonical metadata and JSON-LD are exact;
- sitemap contains the exact 72 canonical routes;
- robots points to the custom-domain sitemap;
- all 74 legacy redirects resolve as specified;
- expected content types and observable cache signals are present.

## Completion boundary

Batch 14 is complete only because the custom-domain output passed full-content equality. Count equality alone was rejected throughout the stale publication windows.
