# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-08-03

## Current canonical and production baseline

```text
Bridges            36
Incidents          38
Events            188
Evidence          297
Archived evidence 130
HTML routes        72
Redirects          74
```

Canonical JSON remains the only record source. Generated public files are build products.

## Completed remediation sequence

```text
PR #50  Current-state reset
PR #51  Canonical-derived public output
PR #52  Machine-readable public layer
PR #53  Canonical metadata and discovery
PR #54  Legacy redirects
PR #58  Post-build consistency CI
PR #59  Production verification
PR #107 Full generated-content production equality
```

## Latest production contract verification

Archive Capture Batch 12 production verification run `30791989085` passed after a behavior-neutral build-input refresh and delayed rerun at:

```text
33 bridges
34 incidents
183 events
284 evidence records
91 evidence records with archived_url
72 canonical HTML routes
74 legacy redirects
0 unknown URL statuses
complete public-content equality
```

```text
Canonical data PR             #158
Canonical merge               7d5d6edfc2c7ed355fcfd78a51076e0bd4cc7029
Build-input refresh PR        #160
Build-input refresh           15023871b100b6b15b277163d09db8769a3bdb1b
Production audit PR           #159
Production run                30791989085
Initial failed job            91617276143
Immediate refresh failed job  91618712843
Production job                91620118112
Canonical final CI            30791883397
Initial verification CI       30791989124
Build-input refresh CI        30792375569
Generated at                  2026-08-03T07:18:33.180Z
Publication attempt           18 on delayed rerun after build-input refresh
```

The initial unchanged verifier rejected the prior same-count evidence content at `bir_src_000076` for all twenty attempts. PR #160 changed only the non-executable build-input marker. An immediate rerun still observed `generated_at 2026-08-03T06:55:57.708Z` for twenty attempts, so no further refresh commit was added. A delayed rerun switched to `generated_at 2026-08-03T07:18:33.180Z` on attempt 18 and confirmed all ninety-one archive fields and every other transformed field.

## Full-content publication gate

The production verifier builds expected public records with the canonical transformation and compares every field in all bridge, incident, event, and evidence records. Object key order is ignored, while array and record order remain strict. Any field mismatch blocks convergence.

Normal CI includes controlled tests for same-count field drift, record-order drift, dataset-length drift, and object-key normalization.

## Current validation scope

Normal CI requires type and Astro checks, canonical and enum validation, first-ten and full-corpus audits, exact source-count equality, source-quality limits and fixtures, production-content fixtures, static build, final-`dist` consistency, and controlled public-output failures.

Production verification requires matching counts and canonical-only markers, complete generated JSON equality, all static and detail routes, canonical links, JSON-LD, sitemap, robots, redirects, content types, and cache signals.

Latest completed production audit: `docs/audits/production-verification-phase3-archive-capture-batch12-2026-08-03.md`.

## Deployment lessons

A docs-only main commit is not assumed to trigger Cloudflare Pages. A bounded build-input change may be used only when it preserves execution behavior, canonical data, validators, and the public contract. The unchanged full-content verifier remains the publication authority.

Batch 12 additionally proved that a valid Pages build may complete after an immediate five-minute rerun window. An unchanged `generated_at` after the first refresh rerun is not permission to stack more commits or weaken verification. Allow deployment latency and rerun the same failed job.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, full-content production verification, exact source-count equality, zero unknown URL status, and source-quality no-regression gates protect later canonical migrations, including same-count archive-field changes.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit full-content production verification after public-data changes;
6. confirm `generated_at` and complete dataset equality before declaring publication;
7. after one reviewed build-input refresh, prefer delayed rerun over repeated refresh commits when the timestamp remains unchanged.
