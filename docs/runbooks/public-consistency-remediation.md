# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-07-29

## Current canonical baseline

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
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

## Latest completed production contract verification

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

The current canonical branch advances Evidence to 265 through source-quality remediation Batch 1. It adds LI.FI's first-party 2022 postmortem as two event-scoped evidence records and corrects the incident to completed operator-funded reimbursement. Production remains at the verified 263-evidence checkpoint until PR #101 is merged and the unchanged production verifier passes.

## Current canonical validation scope

Normal CI requires:

- type and Astro checks;
- canonical and enum validation;
- first-ten and full-corpus audits;
- exact incident and event source-count equality;
- source-quality no-regression limits;
- controlled full-corpus, source-count, and source-quality failure fixtures;
- static build;
- final-`dist` canonical data and documentation consistency;
- controlled public-output failure fixtures.

## Production verification scope

After merge, explicit production verification must cover:

- all static and detail routes;
- production canonical links and robots metadata;
- JSON-LD URLs and record identifiers;
- version and manifest counts and canonical-only markers;
- bridge, incident, event, and evidence ordered IDs through `bir_src_000265`;
- exact sitemap route equality;
- every generated legacy redirect;
- content types and observable cache-related headers.

Latest completed production audit: `docs/audits/production-verification-phase3-source-count-final-2026-07-29.md`.

Current migration audit: `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md`.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, production verification, exact source-count equality, and source-quality no-regression gates protect later canonical migrations.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit production verification after public-data changes.
