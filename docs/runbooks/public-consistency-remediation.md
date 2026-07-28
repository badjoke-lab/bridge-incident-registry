# Bridge Incident Registry — Public Consistency Remediation

Status: complete  
Updated: 2026-07-28

## Canonical baseline on final restart review branch

```text
Bridges     33
Incidents   34
Events      183
Evidence    211
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

## Latest completed contract verification

Phase 3 aftermath production verification run `30358827192` passed against `https://bridge-incident-registry.pages.dev` at:

```text
33 bridges
34 incidents
182 events
210 evidence records
72 canonical HTML routes
```

The ordinary repository workflow run `30358827222` also passed type checking, canonical validation, enum validation, first-ten audit, full-corpus audit, controlled audit failures, build, final-`dist` consistency, and controlled public-output failures.

Latest completed audit: `docs/audits/production-verification-phase3-aftermath-2026-07-28.md`.

## Pending publication gate

The final restart review branch must publish and verify:

```text
33 bridges
34 incidents
183 events
211 evidence records
72 canonical HTML routes
```

The same checks remain mandatory:

- all static and detail routes
- production canonical links and robots metadata
- JSON-LD URLs and record identifiers
- version and manifest counts and canonical-only markers
- bridge, incident, event, and evidence ordered IDs
- exact sitemap route equality
- every generated legacy redirect
- content types and observable cache-related headers

## Closure

The emergency public-consistency remediation remains closed. The same canonical-derived publication contract continues to guard every later canonical migration.

## Resume rule

1. create a fresh branch from latest `main`
2. derive IDs and counts from canonical JSON
3. keep canonical records separate from candidate and research material
4. run all repository checks before merge
5. run explicit production verification after public-data changes
