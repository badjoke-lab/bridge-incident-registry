# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-08-03

## Current canonical and production baseline

```text
Bridges            33
Incidents          34
Events            183
Evidence          284
Archived evidence  85
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

Archive Capture Batch 11 production verification run `30783692287` passed after a behavior-neutral build-input refresh at:

```text
33 bridges
34 incidents
183 events
284 evidence records
85 evidence records with archived_url
72 canonical HTML routes
74 legacy redirects
0 unknown URL statuses
complete public-content equality
```

```text
Canonical data PR        #153
Canonical merge          f8c0772acbabbf7f468f818e3d8f00b83ca9e38a
Docs-only retrigger PR   #155
Docs-only retrigger      d143b3b12b11c79cd0d78e30b965a25ed4d5e480
Build-input refresh PR   #156
Build-input refresh      2276d4e37096e29f090c0238f9f0cd6f64a725eb
Production audit PR      #154
Production run           30783692287
First failed job         91593095620
Second failed job        91594233914
Production job           91595453784
Canonical final CI       30783546644
Initial verification CI  30783692322
Build-input refresh CI   30784453676
Generated at             2026-08-03T04:26:39.509Z
Publication attempt      1 after build-input refresh
```

The first verifier job rejected the prior public evidence content at `bir_src_000029` for all twenty attempts. PR #155 added a docs-only main commit, but the second twenty-attempt job observed the same `generated_at 2026-08-03T04:13:42.118Z`; no new Pages build had started. PR #156 changed only a non-executable build-script comment. That build-input refresh forced publication, after which the unchanged verifier confirmed all eighty-five archive fields and every other transformed field on attempt 1.

## Full-content publication gate

The production verifier builds expected public records with the canonical transformation and compares every field in all bridge, incident, event, and evidence records. Object key order is ignored, while array and record order remain strict. Any field mismatch blocks convergence.

Normal CI includes controlled tests for same-count field drift, record-order drift, dataset-length drift, and object-key normalization.

## Current validation scope

Normal CI requires type and Astro checks, canonical and enum validation, first-ten and full-corpus audits, exact source-count equality, source-quality limits and fixtures, production-content fixtures, static build, final-`dist` consistency, and controlled public-output failures.

Production verification requires matching counts and canonical-only markers, complete generated JSON equality, all static and detail routes, canonical links, JSON-LD, sitemap, robots, redirects, content types, and cache signals.

Latest completed production audit: `docs/audits/production-verification-phase3-archive-capture-batch11-2026-08-03.md`.

## Deployment lesson

A docs-only main commit is not assumed to trigger Cloudflare Pages. If a retry observes an unchanged `generated_at`, the deployment has not advanced. A bounded build-input change may be used only when it preserves execution behavior, canonical data, validators, and the public contract; the unchanged full-content verifier remains the publication authority.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, full-content production verification, exact source-count equality, zero unknown URL status, and source-quality no-regression gates protect later canonical migrations, including same-count archive-field changes.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit full-content production verification after public-data changes;
6. confirm `generated_at` changes before treating a deployment retrigger as effective.
