# BIR v1 Release Readiness

Status: active release contract  
Updated: 2026-08-20

This runbook defines the permanent technical gate for Bridge Incident Registry v1 and subsequent reviewed maintenance. It consolidates the canonical, quality, accessibility, performance, browser-compatibility, dependency-security, machine-readable, Ledger Series and publication checks. It does not weaken or replace any underlying gate.

## Canonical release baseline

```text
Bridges     39
Incidents   42
Events      199
Evidence    325
```

The current canonical baseline includes the separate May and July 2026 Verus-Ethereum Bridge incidents after canonical PR #338 / merge `66b3b1b613e0e757d45313af59b02f1bebfa398c`.

The latest fully production-proven checkpoint remains the pre-May canonical state from PR #330, verified read-only in PR #332 / run `32334410535` / job `96321019010` on attempt 1: 39 bridges / 41 incidents / 194 events / 316 evidence, 88 canonical HTML routes, 80 redirects, all 39 bridge and 41 incident dossiers, and the Ledger Series adapter at 80 records / 82 JSON files / 80 unique global keys. Do not promote the May baseline to production-proven until a fresh post-merge verifier succeeds.

A release-readiness run must not mutate canonical data.

## Required local/static gates

All of the following must pass from the same checked-out revision:

```text
npm audit --audit-level=high
npm run check
npm run validate:data
npm run validate:enums
npm run audit:full-corpus
npm run audit:source-count
npm run audit:source-quality
npm run monitoring:test
npm run production:content:test
npm run performance:test
npm run build
npm run accessibility:check
npm run performance:check
npm run dist:check
npm run dist:test
```

The build/publication pipeline must also keep the Ledger Series adapter internally consistent whenever the derived Series output is present.

The release is blocked if any high-severity npm audit finding remains, if any source-count mismatch appears, if canonical URL status becomes unknown, if the existing source-quality ceiling regresses, or if native/Series generated output becomes inconsistent.

## Accessibility contract

The built-output accessibility gate must pass all generated HTML. At the current reviewed canonical build baseline it covers 89 generated HTML pages.

The contract includes:

- document language and main landmark;
- skip-link target;
- duplicate ID rejection;
- registry table captions and scoped headers;
- labelled filter controls and named buttons;
- global focus-visible treatment;
- reduced-motion handling;
- mobile table headers retained in the accessibility tree.

## Performance contract

Source-controlled gzip ceilings are fixed in `config/performance-budget.json`.

```text
max HTML file   16 KiB
CSS total        5 KiB
max CSS file     5 KiB
JS total         4 KiB
max JS file      2 KiB
```

Machine-readable registry and Series JSON are intentionally outside these UI budgets because canonical corpus growth is expected. The exact-tree PR #338 validation passed the unchanged ceiling with `incidents/index.html` at 15.8 KiB gzip.

## Browser compatibility contract

The release-readiness workflow must pass the real interaction smoke in all three browser engines:

```text
Chromium
Firefox
WebKit
```

The smoke covers representative routes plus bridge and incident pagination, URL-state synchronization, search filtering, page reset, support controls, and runtime console/page errors.

## Production equality boundary

A pull request can prove the complete local/static release contract before merge. It cannot prove that the new revision is already deployed to production.

On the merge-to-main run of the release-readiness workflow, BIR additionally executes the existing native production verifier against:

```text
https://bir.badjoke-lab.com
```

For changes that do not alter canonical public content, production is still required to remain exactly equal to the canonical build contract. Legacy redirects are part of that publication contract and both slashless and trailing-slash legacy forms must resolve to the canonical route.

For changes that alter Ledger Series output, a post-merge verification must also prove the production Series descriptor, index and per-record envelopes against exact-main expected output. Series verification supplements rather than replaces native canonical equality.

For future changes that alter public output, deployment completion must precede the authoritative production-equality proof. The existing dedicated Production Verification workflow remains the final native publication verifier when deployment timing requires a later verification run; a bounded read-only Series verifier may be used when the Series contract changes.

## Monitoring boundary

Phase 5 monitoring remains review-only and is not promoted into canonical truth by a release run.

- monitoring never writes canonical records automatically;
- secondary discovery feeds create hold/review material only;
- unchanged monitoring state remains silent;
- an open review signal does not itself constitute a canonical failure;
- public-site health monitoring complements, but does not replace, exhaustive native/Series production-content equality verification.

## Cloudflare boundary

```text
production branch    main
preview deployment   none
```

The release contract does not enable preview deployment.

## v1 closure / maintenance condition

BIR v1 technical release closure remains complete. Each later canonical/public maintenance change is accepted when:

1. the exact-head PR passes the consolidated local/static workflow;
2. the PR is merged to `main` without unintended canonical changes;
3. the merge-to-main release-readiness run passes all applicable consolidated gates;
4. native production verification reports canonical/public content and redirect equality;
5. Series production equality is also proven when Series output changes;
6. restart/status documents record the accepted checkpoint.

Future corpus expansion, monitoring candidate investigation, or research-triggered evidence remediation continues as normal registry maintenance and does not reopen the technical hardening phase unless a permanent release gate regresses.
