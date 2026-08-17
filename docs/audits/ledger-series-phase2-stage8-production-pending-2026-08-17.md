# Ledger Series Phase 2 Stage 8 production publication checkpoint — 2026-08-17

Status: production publication pending  
Scope: BIR Ledger Series Phase 2 Stage 8 post-merge verification

## Implemented canonical state

PR #294 (`Apply BIR Stage 8 bounded lifecycle fixes`) merged the reviewed Stage 8 delta to `main`.

Canonical `main` now validates as:

```text
Bridges     36
Incidents   38
Events      190
Evidence    299
```

The Stage 8 delta is limited to the two previously reviewed lifecycle repairs:

- `bir_inc_000015`: discrete `reimbursement_completed` event backed by the existing Tier 1 first-party LI.FI postmortem;
- `bir_inc_000035`: discrete `bridge_reopened` event backed by the existing Tier 1 first-party Allbridge relaunch notice.

No schema expansion, loss/recovery/attack-vector change, ranking, generated conclusion, or unrelated record growth was included.

## Exact-head and main CI state

PR #294 exact-head CI passed the normal release gates, including canonical/schema validation, full-corpus audit, exact source-count equality, source-quality no-regression, build, accessibility, unchanged performance budgets, dist consistency, and Chromium/Firefox/WebKit compatibility smoke.

After merge, main SHA `74aacf83e1c33b6a44b3e333e3d26f2b7e1ad5dc` reproduced the same local/canonical results:

- full-corpus blocking errors: `0`;
- full-corpus warning categories: `{}`;
- incident source-count mismatches: `0`;
- event source-count mismatches: `0`;
- primary evidence: `215`;
- Tier 1 evidence: `232`;
- archived evidence: `130`;
- built canonical HTML routes: `82`;
- Chromium / Firefox / WebKit: success;
- performance limits unchanged: HTML max 16 KiB gzip, CSS total/max 5/5 KiB, JS total/max 4/2 KiB.

## Production blocker

Main V1 Release Readiness run `32040032017` attempted production publication verification twice. Both attempts failed before route equality because the public site continued to serve the previous published dataset throughout every publication-wait retry.

Expected:

```text
36 bridges / 38 incidents / 190 events / 299 evidence
```

Observed for all retries:

```text
36 bridges / 38 incidents / 188 events / 297 evidence
```

The observed public `version.json` remained generated at `2026-08-17T14:15:43.378Z` with the same ETag across the retries. This establishes a publication/deployment lag or missed external Git-integrated deployment, not a canonical validation failure.

## Boundary

Ledger Series Phase 2 must **not** be marked complete until a later main-branch production verifier observes the 190/299 publication and passes the full production registry equality gate. Do not relax the verifier, alter performance/source-quality ceilings, or revert the reviewed Stage 8 canonical delta to make the gate pass.

This checkpoint intentionally creates a new reviewed main-branch documentation revision so the external Git-integrated publication path receives another main update while preserving canonical data unchanged.
