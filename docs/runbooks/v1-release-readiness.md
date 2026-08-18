# BIR v1 Release Readiness

Status: active release contract  
Updated: 2026-08-19

This runbook defines the final technical gate for Bridge Incident Registry v1. It consolidates the already-reviewed canonical, quality, accessibility, performance, browser-compatibility, dependency-security, and publication checks. It does not weaken or replace any underlying gate.

## Canonical release baseline

```text
Bridges     38
Incidents   40
Events      193
Evidence    311
```

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

The release is blocked if any high-severity npm audit finding remains, if any source-count mismatch appears, if canonical URL status becomes unknown, or if the existing source-quality ceiling regresses.

## Accessibility contract

The built-output accessibility gate must pass all generated HTML. At the current reviewed baseline it covers 86 generated HTML pages.

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

Machine-readable registry JSON is intentionally outside these UI budgets because canonical corpus growth is expected.

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

On the merge-to-main run of the release-readiness workflow, BIR additionally executes the existing production verifier against:

```text
https://bir.badjoke-lab.com
```

For changes that do not alter canonical public content, production is still required to remain exactly equal to the canonical build contract. Legacy redirects are part of that publication contract and both slashless and trailing-slash legacy forms must resolve to the canonical route.

For future changes that alter public output, deployment completion must precede the authoritative production-equality proof. The existing dedicated Production Verification workflow remains the final publication verifier when deployment timing requires a later verification run.

## Monitoring boundary

Phase 5 monitoring remains review-only and is not promoted into canonical truth by a release run.

- monitoring never writes canonical records automatically;
- secondary discovery feeds create hold/review material only;
- unchanged monitoring state remains silent;
- an open review signal does not itself constitute a canonical failure;
- public-site health monitoring complements, but does not replace, exhaustive production-content equality verification.

## Cloudflare boundary

```text
production branch    main
preview deployment   none
```

The release contract does not enable preview deployment.

## v1 closure condition

BIR v1 technical release closure is complete when:

1. the release-readiness PR passes the consolidated local/static workflow;
2. the PR is merged to `main` without unintended canonical changes;
3. the merge-to-main release-readiness run passes all consolidated gates;
4. production verification reports canonical/public content and redirect equality;
5. restart/status documents record the accepted release checkpoint.

Any future corpus expansion, monitoring candidate investigation, or research-triggered evidence remediation continues after v1 as normal registry maintenance and does not reopen this technical hardening phase unless a release gate regresses.
