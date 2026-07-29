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
PR 1  Current-state reset                    complete — PR #50
PR 2  Canonical-derived public output        complete — PR #51
PR 3  Machine-readable public layer          complete — PR #52
PR 4  Canonical metadata and discovery       complete — PR #53
PR 5  Legacy redirects                       complete — PR #54
PR 6  Post-build consistency CI              complete — PR #58
PR 7  Production verification                complete — PR #59
```

## Latest production contract verification

Source-quality Batch 1 production verification run `30454087470` passed against `https://bridge-incident-registry.pages.dev` at:

```text
33 bridges
34 incidents
183 events
265 evidence records
72 canonical HTML routes
74 legacy redirects
0 incident source-count mismatches
0 event source-count mismatches
```

The verification confirmed ordered evidence IDs through `bir_src_000265`, LI.FI's two first-party event links, completed reimbursement and resolved incident state, all canonical routes, exact sitemap equality, metadata, redirects, content types, and observable cache headers.

The first attempt exhausted all 20 publication checks at the previous 263-evidence state. PR #105 created a docs-only main push without changing canonical data or verifier conditions. The unchanged rerun detected the 265-evidence state on attempt 1 and passed.

```text
Canonical merge      cbff8411ee7f0bde4d4cd13624166502bded7fdc
Deployment retrigger 8ed1cd13292eefe524609c5f2db8578d58a07bee
Generated at         2026-07-29T13:06:10.965Z
```

## Current validation scope

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

Production verification requires:

- all static and detail routes;
- production canonical links and robots metadata;
- JSON-LD URLs and record identifiers;
- version and manifest counts and canonical-only markers;
- ordered canonical IDs;
- exact sitemap route equality;
- every generated legacy redirect;
- content types and observable cache-related headers.

Latest production audit: `docs/audits/production-verification-phase3-source-quality-batch1-2026-07-29.md`.

## Closure

The emergency public-consistency remediation remains closed. Canonical-derived publication, final-`dist` checking, production verification, exact source-count equality, and source-quality no-regression gates protect later canonical migrations.

## Resume rule

1. create a fresh branch from latest `main`;
2. derive IDs and counts from canonical JSON;
3. keep canonical records separate from candidate and research material;
4. run all repository checks before merge;
5. run explicit production verification after public-data changes.
