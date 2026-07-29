# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-07-29

## Current canonical review-branch baseline

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

Source-count Batch 4 production verification run `30426111329` passed against `https://bridge-incident-registry.pages.dev` at:

```text
33 bridges
34 incidents
183 events
256 evidence records
72 canonical HTML routes
74 legacy redirects
```

The canonical migration workflow run `30425990662` passed type checking, canonical validation, enum validation, first-ten audit, full-corpus audit, controlled audit failures, build, final-`dist` consistency, and controlled public-output failures.

The production verification covered:

- all static and detail routes;
- production canonical links and robots metadata;
- JSON-LD URLs and record identifiers;
- version and manifest counts and canonical-only markers;
- bridge, incident, event, and evidence ordered IDs through `bir_src_000256`;
- the fifteen Batch 4 event-scoped evidence records;
- the three synchronized incident source counts;
- exact sitemap route equality;
- every generated legacy redirect;
- content types and observable cache-related headers.

Latest production audit: `docs/audits/production-verification-phase3-source-count-batch4-2026-07-29.md`.

## Pending final publication

PR #97 carries the exact-equality canonical state:

```text
33 bridges
34 incidents
183 events
263 evidence records
0 event source-count mismatches
0 incident source-count mismatches
```

Normal CI now includes an explicit exact source-count check and controlled incident/event drift fixtures. The live production contract remains at the Batch 4 checkpoint until PR #97 merges, Cloudflare publishes the new canonical build, and the unchanged production verifier passes at the final counts.

## Closure

The emergency public-consistency remediation remains closed. The same canonical-derived publication contract and the new source-count equality gate continue to guard later canonical migrations.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit production verification after public-data changes.
