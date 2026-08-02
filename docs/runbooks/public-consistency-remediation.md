# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-08-01

## Current canonical and production baseline

```text
Bridges            33
Incidents          34
Events            183
Evidence          284
Archived evidence  53
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

Archive Capture Batch 5 production verification run `30691464065` passed at:

```text
33 bridges
34 incidents
183 events
284 evidence records
53 evidence records with archived_url
72 canonical HTML routes
74 legacy redirects
0 unknown URL statuses
complete public-content equality
```

```text
Canonical data PR      #133
Canonical merge        27afd411b0eae500b30f8f5a1f49121476e46ebd
Production audit PR    #134
Production run         30691464065
Production job         91346826104
Canonical CI           30691392132
Verification PR CI     30691464063
Generated at           2026-08-01T08:19:37.599Z
Publication attempt    12
```

The unchanged verifier rejected the prior same-count Batch 4 evidence dataset at `bir_src_000030` for publication attempts 1 through 11. Production converged without a deployment retrigger on attempt 12, and the verifier then confirmed all fifty-three archive fields and every other transformed field.

## Full-content publication gate

The production verifier builds expected public records with the canonical transformation and compares every field in all bridge, incident, event, and evidence records. Object key order is ignored, while array and record order remain strict. Any field mismatch blocks convergence.

Normal CI includes controlled tests for same-count field drift, record-order drift, dataset-length drift, and object-key normalization.

## Current validation scope

Normal CI requires type and Astro checks, canonical and enum validation, first-ten and full-corpus audits, exact source-count equality, source-quality limits and fixtures, production-content fixtures, static build, final-`dist` consistency, and controlled public-output failures.

Production verification requires matching counts and canonical-only markers, complete generated JSON equality, all static and detail routes, canonical links, JSON-LD, sitemap, robots, redirects, content types, and cache signals.

Latest completed production audit: `docs/audits/production-verification-phase3-archive-capture-batch5-2026-08-01.md`.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, full-content production verification, exact source-count equality, zero unknown URL status, and source-quality no-regression gates protect later canonical migrations, including same-count archive-field changes.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit full-content production verification after public-data changes.
