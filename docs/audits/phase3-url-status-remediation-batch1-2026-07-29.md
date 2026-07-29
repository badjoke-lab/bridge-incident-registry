# Phase 3 URL-status remediation Batch 1 — 2026-07-29

Status: canonical migration complete; production verification pending

## Scope

This batch resolves the final two evidence records with `url_status: unknown`.

```text
bir_src_000112
bir_src_000239
```

Both records are event-scoped links to the same Holograph official incident post dated 2024-06-13.

## Verification

The legacy route:

```text
https://twitter.com/holographxyz/status/1801332482262110301
```

was normalized to the current canonical route:

```text
https://x.com/holographxyz/status/1801332482262110301
```

The current `x.com` route returned HTML, and contemporaneous indexed reports continue to reference the same post ID and Holograph account. The records are therefore marked `live`, with `accessed_at` updated to 2026-07-29.

## Canonical changes

```text
Evidence records changed    2
Evidence records added      0
Evidence records removed    0
Unknown URL status          2 -> 0
Evidence total              265 -> 265
Source-count mismatches     0 -> 0
```

No bridge, incident, event, evidence linkage, source tier, reliability, claim, or historical outcome changed.

## Permanent gate

The source-quality no-regression ceiling for `unknown_url_status` is tightened from 2 to 0. Future unknown URL states are blocking CI failures until explicitly reviewed.

## Validation

The bounded migration passed canonical validation, enum validation, first-ten and full-corpus audits, exact source-count equality, source-quality baseline checks, all controlled failure fixtures, and the static build before the canonical commit was created.

Final normal CI must also pass final-`dist` and documentation consistency after permanent status documentation is synchronized.
