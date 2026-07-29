# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-07-29

## Current canonical and production baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
HTML routes 72
Redirects   74
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

URL-status Batch 1 production verification run `30457429225` passed against `https://bridge-incident-registry.pages.dev` at:

```text
33 bridges
34 incidents
183 events
265 evidence records
72 canonical HTML routes
74 legacy redirects
0 unknown URL statuses
complete public-content equality
```

The verifier confirmed `bir_src_000112` and `bir_src_000239` publish the canonical Holograph `x.com` URL, `url_status: live`, and the reviewed access date.

```text
Canonical merge   d0e9674745996fc1d85a32710890fa880d8946ad
Production run    30457429225
Normal CI         30457429426
Generated at      2026-07-29T13:30:13.794Z
Attempt           1
```

## Full-content publication gate

A same-count canonical change exposed that counts and ordered IDs could remain unchanged while field values in production were stale. The production verifier now:

- builds the expected public records with the canonical publication transformation;
- compares every field in all bridge, incident, event, and evidence records;
- ignores object key ordering only;
- preserves array and record order;
- reports the first differing record;
- refuses publication convergence when any field differs.

Normal CI includes controlled tests for:

- same-count and same-ID field drift;
- record-order drift;
- dataset-length drift;
- object key-order normalization.

## Current validation scope

Normal CI requires:

- type and Astro checks;
- canonical and enum validation;
- first-ten and full-corpus audits;
- exact incident and event source-count equality;
- source-quality no-regression limits;
- controlled full-corpus, source-count, source-quality, and production-content fixtures;
- static build;
- final-`dist` canonical data and documentation consistency;
- controlled public-output failure fixtures.

Production verification requires:

- matching counts and canonical-only markers;
- complete generated public JSON equality;
- all static and detail routes;
- production canonical links and robots metadata;
- JSON-LD URLs and record identifiers;
- exact sitemap route equality;
- every generated legacy redirect;
- content types and observable cache-related headers.

Latest production audit: `docs/audits/production-verification-phase3-url-status-batch1-2026-07-29.md`.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, full-content production verification, exact source-count equality, zero unknown URL status, and source-quality no-regression gates protect later canonical migrations.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit full-content production verification after public-data changes.
