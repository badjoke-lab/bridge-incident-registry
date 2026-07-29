# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-07-29

## Current canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    263
```

Canonical JSON remains the only record source. Generated public files are build products.

## Completed remediation sequence

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete — PR #59
```

## Latest production contract verification

Final source-count production verification run `30427603790` passed against `https://bridge-incident-registry.pages.dev` at:

```text
33 bridges
34 incidents
183 events
263 evidence records
72 canonical HTML routes
74 legacy redirects
0 incident source-count mismatches
0 event source-count mismatches
```

The canonical migration workflow run `30427464812` passed type checking, canonical validation, enum validation, first-ten audit, full-corpus audit, exact source-count equality, controlled source-count drift failures, build, final-`dist` consistency, and controlled public-output failures.

The production verification covered:

- all static and detail routes;
- production canonical links and robots metadata;
- JSON-LD URLs and record identifiers;
- version and manifest counts and canonical-only markers;
- bridge, incident, event, and evidence ordered IDs through `bir_src_000263`;
- the final seven event-scoped evidence records;
- both synchronized incident source counts;
- exact sitemap route equality;
- every generated legacy redirect;
- content types and observable cache-related headers.

The first final verification attempt exhausted all 20 publication attempts because production remained at the 256-evidence state. A docs-only main push retriggered the existing Cloudflare Pages Git integration; no verifier or equality condition changed. The unchanged rerun detected the 263-evidence state on attempt 1 and passed.

Latest production audit: `docs/audits/production-verification-phase3-source-count-final-2026-07-29.md`.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, production verification, and the exact source-count gate now protect every later canonical migration.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit production verification after public-data changes.
