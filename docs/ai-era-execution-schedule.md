# BIR AI-era Execution Schedule

Status: Ledger Series Phase 2 complete — BIR steady-state maintenance

> Naming note: "Ledger Series Phase 2" means the cross-series BIR horizontal-strengthening phase. It is separate from BIR's older internal Phase 2/3/4/5 roadmap numbering in `docs/runbooks/development-roadmap.md` and `docs/operations/current-schedule.md`.

## Order and audited status
1. **Ongoing maintenance track** — Continue approved BIR record/research/operations work without allowing routine record growth to replace horizontal roadmap work.
2. **Complete — baseline audit** — Representative aftermath work and full-corpus audits established containment, recovery, reimbursement, reopening/restart and evidence-quality boundaries.
3. **Complete decision — no schema expansion required** — Existing incident/event/evidence fields represent the reviewed lifecycle facts required by this phase.
4. **Complete — Stage 4** — PR #285 added canonical-derived per-record bridge and incident JSON dossiers; PR #286 restored strict production verification. Main production equality passed.
5. **Complete — Stage 5** — PR #288 added only the confirmed Affected chain and Bridge type incident-filter gaps. Chromium/Firefox/WebKit and main production equality passed.
6. **Complete — Stage 6** — PR #290 added deterministic canonical-derived `/compare/` modes for incident-vs-incident and bridge-vs-bridge comparison. Unknown values and recovery/reimbursement/restart/outcome boundaries remain explicit. Main production equality passed for 81 canonical HTML routes.
7. **Complete — Stage 7** — PR #292 added deterministic canonical-derived `/stats/` without rankings or unsupported inference. Main production equality passed for 82 canonical HTML routes.
8. **Complete — Stage 8** — PR #294 applied the bounded reviewed follow-up for the two pre-existing lifecycle warnings: a discrete `reimbursement_completed` event for `bir_inc_000015` and a discrete `bridge_reopened` event for `bir_inc_000035`, with the minimum event-scoped first-party evidence required by exact source-count semantics. PRs #295–#296 recorded and resolved the external publication blocker without changing canonical/schema semantics or release thresholds. Main V1 Release Readiness run `32041737878` passed full production equality at `36 / 38 / 190 / 299`, including all 36 bridge and 38 incident dossiers.
9. **Deferred to Ledger Series Phase 10** — Natural-language-to-filter translation is not a BIR Phase 2 requirement and may never bypass canonical filters or evidence.

## Gate

Spec -> implementation PR -> validation/CI green -> merge -> production verification where applicable -> docs/status sync.

That gate is satisfied for BIR Ledger Series Phase 2. Completion evidence is recorded in `docs/audits/ledger-series-phase2-completion-2026-08-18.md`.

## Phase completion boundary

BIR Ledger Series Phase 2 is **complete**. The final verified public/canonical baseline is:

```text
Bridges     36
Incidents   38
Events      190
Evidence    299
Full-corpus blocking errors      0
Full-corpus warning categories   {}
Source-count mismatches          0
Canonical HTML routes           82
```

The permanent accessibility, performance, source-quality, three-browser, machine-readable/dist, and production-equality gates remain in force for future BIR maintenance.

## Next authorized cross-series move

Do not invent a BIR Ledger Series Stage 9. BIR returns to steady-state reviewed maintenance. Under `docs/ai-era-registry-spec.md`, the next named series after the BIR pilot is **SOG**. Any SOG work must start by reading that repository's current authority/status and establishing its own bounded baseline; this completed BIR schedule does not authorize copying BIR canonical assumptions into SOG.

## Mandatory continuation rule

Future BIR work must read this schedule and `ai-era-registry-spec.md` together with the relevant canonical, operations and machine-readable specifications. Monitoring/candidate work remains review-only and cannot silently mutate canonical records.
