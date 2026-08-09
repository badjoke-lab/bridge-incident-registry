# Production Verification — Event Primary Remediation 02

Date: 2026-08-09
Canonical review PR: #211
Canonical data PR: #213
Canonical merge: `f2874a2d0ffe6877eadf6619cd6100a9b9b3991b`

Status: pending live production verification

## Canonical target

```text
Bridges      33
Incidents    34
Events      183
Evidence    287
```

Expected quality state:

```text
Primary evidence                       206 / 287
Tier 1 evidence                        223 / 287
Evidence with archived_url             130 / 287
Events without primary                  11 / 183
Events without Tier 1                     6 / 183
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
```

The production verifier must prove complete canonical-derived field-level equality, not just matching counts. It must also verify canonical HTML routes, redirects, metadata, JSON-LD, sitemap, robots, content types, cache observations, version metadata, manifest metadata, and canonical-only markers.

The audit will be finalized with the successful run/job, publication attempt, live `generated_at`, and whether any behavior-neutral build-input refresh was required.
