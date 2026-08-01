# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-08-01

## Current canonical and production baseline

```text
Bridges            33
Incidents          34
Events            183
Evidence          284
Archived evidence  21
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

Archive Capture Batch 2 production verification run `30688749856` passed at:

```text
33 bridges
34 incidents
183 events
284 evidence records
21 evidence records with archived_url
72 canonical HTML routes
74 legacy redirects
0 unknown URL statuses
complete public-content equality
```

```text
Canonical data PR      #123
Canonical merge        a0763951c612fae6149093ae7124de622a54e342
Deployment retrigger   9718b8d8383f158ab8ef391ea491df9e2da0f397
Production audit PR    #124
Production run         30688749856
Successful rerun job   91340437658
Canonical CI           30688662830
Verification PR CI     30688749844
Retrigger CI           30689003552
Generated at           2026-08-01T07:03:30.526Z
Publication attempt    1
```

The first unchanged verification attempt exhausted all twenty checks because production remained on the same-count Batch 1 evidence dataset and differed first at `bir_src_000126`. PR #125 created a docs-only main push. The unchanged verifier then confirmed the exact twenty-one archive fields and every other transformed field on publication attempt 1.

## Full-content publication gate

The production verifier builds expected public records with the canonical transformation and compares every field in all bridge, incident, event, and evidence records. Object key order is ignored, while array and record order remain strict. Any field mismatch blocks convergence.

Normal CI includes controlled tests for same-count field drift, record-order drift, dataset-length drift, and object-key normalization.

## Current validation scope

Normal CI requires type and Astro checks, canonical and enum validation, first-ten and full-corpus audits, exact source-count equality, source-quality limits and fixtures, production-content fixtures, static build, final-`dist` consistency, and controlled public-output failures.

Production verification requires matching counts and canonical-only markers, complete generated JSON equality, all static and detail routes, canonical links, JSON-LD, sitemap, robots, redirects, content types, and cache signals.

Latest completed production audit: `docs/audits/production-verification-phase3-archive-capture-batch2-2026-08-01.md`.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, full-content production verification, exact source-count equality, zero unknown URL status, and source-quality no-regression gates protect later canonical migrations, including same-count archive-field changes.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit full-content production verification after public-data changes.
