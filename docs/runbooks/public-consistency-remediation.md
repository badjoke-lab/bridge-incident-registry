# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-07-30

## Current canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    279
HTML routes 72
Redirects   74
```

Canonical JSON remains the only record source. Generated public files are build products.

The latest completed production checkpoint remains 271 evidence until event Tier 1 Batch 2 passes explicit full-content production verification.

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

## Latest completed production contract verification

Event Tier 1 Batch 1 production verification run `30540271827` passed at:

```text
33 bridges
34 incidents
183 events
271 evidence records
72 canonical HTML routes
74 legacy redirects
0 unknown URL statuses
complete public-content equality
```

```text
Canonical data PR   #109
Canonical merge     da066fb29b5b45f6c8602ef36becf6536bfe6a29
Production audit PR #110
Production run      30540271827
Canonical CI        30540042953
Production PR CI    30540776235
Generated at        2026-07-30T11:53:51.220Z
Attempt             6
```

## Pending canonical publication

Event Tier 1 canonical Batch 2 increases evidence from 271 to 279 and reduces event primary/Tier 1 gaps. After PR #112 merges, the unchanged full-content verifier must confirm all 279 transformed evidence records rather than accepting the earlier 271-record deployment.

## Full-content publication gate

The production verifier builds the expected public records with the canonical transformation and compares every field in all bridge, incident, event, and evidence records. Object key order is ignored, while array and record order remain strict. Any field mismatch blocks convergence.

Normal CI includes controlled tests for same-count field drift, record-order drift, dataset-length drift, and object-key normalization.

## Current validation scope

Normal CI requires type and Astro checks, canonical and enum validation, first-ten and full-corpus audits, exact source-count equality, source-quality limits and fixtures, production-content fixtures, static build, final-`dist` consistency, and controlled public-output failures.

Production verification requires matching counts and canonical-only markers, complete generated JSON equality, all static and detail routes, canonical links, JSON-LD, sitemap, robots, redirects, content types, and cache signals.

Latest completed production audit: `docs/audits/production-verification-phase3-event-tier1-batch1-2026-07-30.md`.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, full-content production verification, exact source-count equality, zero unknown URL status, and source-quality no-regression gates protect later canonical migrations.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit full-content production verification after public-data changes.
