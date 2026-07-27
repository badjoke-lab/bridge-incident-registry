# Bridge Incident Registry — Public Consistency Remediation

Status: complete when PR #59 merges  
Updated: 2026-07-28

## Canonical baseline

```text
Bridges     26
Incidents   27
Events      123
Evidence    148
```

Canonical JSON remains the only record source. Generated public files are build products.

## Completed sequence

```text
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete when PR #59 merges
```

## Final production verification

GitHub Actions run `30290442852` passed against `https://bridge-incident-registry.pages.dev`.

The verification covered:

- all static HTML routes
- all canonical bridge and incident detail routes
- production canonical links and robots metadata
- JSON-LD URLs and record identifiers
- version and manifest counts and canonical-only markers
- bridge, incident, event, and evidence ordered IDs
- robots and exact sitemap route equality
- every generated legacy redirect
- content types and observable cache-related headers

The ordinary repository workflow run `30290443807` also passed the type, canonical-data, seed-audit, build, final-`dist`, and controlled-failure gates.

Final audit: `docs/audits/production-verification-2026-07-28.md`.

## Closure

When PR #59 merges, the emergency public-consistency remediation is closed.

Canonical record expansion may then resume from latest `main`, subject to the standard branch, review, validation, and production-verification rules.

## Batch 6 resume rule

1. compare or recreate the parked `phase2-batch6-records` branch
2. re-read the approved Batch 6 scope
3. derive IDs and counts from current canonical JSON
4. keep canonical records separate from candidate and research material
5. run all repository checks before merge
