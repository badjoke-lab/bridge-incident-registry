# Production verification — Phase 3 Archive Capture Batch 12 — 2026-08-03

Status: complete  
Canonical PR: `#158`  
Canonical merge: `7d5d6edfc2c7ed355fcfd78a51076e0bd4cc7029`  
Build-input refresh PR: `#160`  
Build-input refresh merge: `15023871b100b6b15b277163d09db8769a3bdb1b`  
Production audit PR: `#159`

## Verified production state

```text
Bridges                              33
Incidents                            34
Events                              183
Evidence                            284
Evidence with archived_url           91
Terminal unarchived unique URLs      36
Terminal unarchived records          49
Risky-host unarchived unique URLs    29
Risky-host unarchived records        45
X/Twitter records unarchived         32
HTML routes                          72
Redirects                            74
Canonical public content match       true
```

## Publication sequence

```text
Production workflow run       30791989085
Initial failed job            91617276143
Immediate refresh rerun job   91618712843
Delayed successful rerun job  91620118112
Canonical final CI            30791883397
Initial verification CI       30791989124
Build-input refresh CI        30792375569
Generated at                  2026-08-03T07:18:33.180Z
Publication attempt           18 on delayed rerun after build-input refresh
```

The initial verifier job rejected the prior same-count evidence content at `bir_src_000076` for all twenty attempts. PR #160 changed only the existing non-executable marker comment in `scripts/build-public-site.mjs`, preserving build execution and the public contract. An immediate rerun still observed the old `generated_at 2026-08-03T06:55:57.708Z` for twenty attempts. No further repository change was made.

After the Pages deployment delay, the same failed workflow run was retried again. Attempts 1 through 17 still returned the old evidence content. Attempt 18 returned `generated_at 2026-08-03T07:18:33.180Z`, and all canonical-derived public content matched.

## Full-content verification

The unchanged verifier confirmed:

- all ninety-one exact `archived_url` fields;
- every transformed field in all four public datasets;
- exact record order and canonical-only markers;
- five static pages;
- all 33 bridge routes;
- all 34 incident routes;
- exact sitemap equality;
- all 74 legacy redirects;
- canonical metadata and JSON-LD;
- robots, content types, and cache assertions.

Record counts never changed during the publication delay, demonstrating again that counts and IDs alone cannot prove a same-count archive-field deployment.

## Closure

Archive Capture Batch 12 is canonical and production-verified. The remaining bounded archive queues are 29 risky-host unique URLs and 36 terminal unique URLs. The terminal evidence-record queue is authoritatively 49; the prior runbook value of 47 was a documentation error corrected from permanent validator output.