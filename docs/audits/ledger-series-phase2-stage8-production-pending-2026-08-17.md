# Ledger Series Phase 2 Stage 8 production publication checkpoint — 2026-08-17

Status: **resolved 2026-08-18**  
Scope: BIR Ledger Series Phase 2 Stage 8 post-merge verification

## Implemented canonical state

PR #294 (`Apply BIR Stage 8 bounded lifecycle fixes`) merged the reviewed Stage 8 delta to `main`.

Canonical state:

```text
Bridges     36
Incidents   38
Events      190
Evidence    299
```

The Stage 8 delta is limited to the two previously reviewed lifecycle repairs:

- `bir_inc_000015`: discrete `reimbursement_completed` event backed by existing Tier 1 first-party LI.FI evidence;
- `bir_inc_000035`: discrete `bridge_reopened` event backed by existing Tier 1 first-party Allbridge evidence.

No schema expansion, loss/recovery/attack-vector change, ranking, generated conclusion, or unrelated record growth was included.

## Original publication blocker

PR #294 exact-head CI and the first post-merge main attempts passed the repository/canonical gates but production still served the previous `36 / 38 / 188 / 297` deployment through the publication-wait retries. Main V1 Release Readiness run `32040032017` therefore failed production equality despite the new `36 / 38 / 190 / 299` canonical state being valid locally and in CI.

That failure was correctly treated as an external publication/deployment blocker. The verifier, performance budgets, source-quality ceilings, canonical delta, and schema were not weakened to force a pass.

PR #295 recorded the blocker while preserving the approved canonical state. PR #296 then made a behavior-invariant `src/**` change to retrigger the Git-integrated production build and synchronized the release-readiness count summary; it did not alter canonical records, schema, or release thresholds.

## Resolution

PR #296 merged to main revision:

`6fe188ea4979d38c32a3a9a4558537c87b733610`

Main V1 Release Readiness run `32041737878` (run #87), job `95422149652`, passed all release gates and then passed production verification.

The production verifier reported canonical production content available on attempt 1 and verified:

```text
Bridges                           36
Incidents                         38
Events                           190
Evidence                         299
Canonical HTML routes             82
Bridge dossiers verified          36
Incident dossiers verified        38
Production registry equality      success
```

The same run also reported:

- full-corpus blocking errors: `0`;
- full-corpus warning categories: `{}`;
- incident source-count mismatches: `0`;
- event source-count mismatches: `0`;
- primary evidence: `215 / 299`;
- Tier 1 evidence: `232 / 299`;
- archived evidence: `130 / 299`;
- Chromium / Firefox / WebKit: success;
- performance ceilings unchanged: HTML max 16 KiB gzip, CSS total/max 5/5 KiB, JS total/max 4/2 KiB.

## Closed boundary

The stop condition in the original checkpoint is satisfied. Stage 8 and BIR Ledger Series Phase 2 may now be marked complete, subject to the docs/status synchronization performed by the closeout PR. Completion evidence is recorded in `docs/audits/ledger-series-phase2-completion-2026-08-18.md`.
