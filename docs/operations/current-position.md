# Current position

Status: active maintenance  
Updated: 2026-08-11

This file is the compact restart pointer. Current `main`, canonical JSON, GitHub Actions, `docs/runbooks/recovery-checkpoint.md`, `docs/runbooks/current-status.md`, and `docs/runbooks/development-roadmap.md` are authoritative.

## Canonical and production baseline

```text
Bridges     34
Incidents   36
Events      185
Evidence    293
```

Latest canonical maintenance addition: **Syscoin UTXO–NEVM Bridge June 2026 exploit** as new `bir_bridge_000034` / `bir_inc_000036`.

```text
Review PR                         #265
Canonical PR                      #266
Canonical merge                   679f40c55677ad9d89f508200e47004f40464922
V1 Release Readiness main run     31458996854
Release-readiness job             93678566693
Production equality               success
Built HTML pages                  76
Canonical HTML routes             75
Legacy redirects                  74
```

## Current quality boundary

```text
Primary evidence                       210 / 293
Tier 1 evidence                        227 / 293
Official-domain evidence               132 / 293
Evidence with archived_url             130 / 293
Incidents without primary                1 / 36
Incidents without Tier 1                 1 / 36
Events without primary                  11 / 185
Events without Tier 1                     6 / 185
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
Source-count mismatches                   0
High-severity npm audit findings          0
Canonical production content match      true
```

The Syscoin batch added one Tier 1 primary first-party postmortem and one Tier 2 security-firm report. It did not increase the terminal-unarchived or risky-host ceilings and did not create a new primary/Tier 1 coverage gap.

## Current phase

- Phase 3 — full-corpus quality strengthening: active, research-triggered maintenance
- Phase 4 — public contract stabilization: complete
- Phase 5 — monitoring and candidate collection: steady-state live
- v1 hardening and technical release closure: complete
- ordinary reviewed registry/candidate expansion: active

## Latest reviewed maintenance work

```text
PR #260  Remove stale Boltz canonical apply helper
PR #261  Review Allbridge Core July 2026 Solana exploit
PR #262  Apply and production-verify Allbridge 2026 canonical incident
PR #263  Checkpoint Allbridge production state
PR #264  Accept Allbridge-era healthy public-site baseline
PR #265  Review Syscoin UTXO–NEVM Bridge June 2026 exploit
PR #266  Apply and production-verify Syscoin 2026 canonical incident
```

Syscoin is recorded as a distinct native UTXO–NEVM bridge. The June 7, 2026 exploit caused an unauthorized release of 5 billion SYS; the full amount was later returned and burned. Financial recovery is complete, but the latest explicit reviewed first-party operational state remains `paused`, so recovery and reopening remain separate fields.

Boltz remains Issue #171, a monitoring signal / needs-evidence item. It is not canonical because the accepted record still lacks one discrete supported exploit/incident boundary.

## Phase 5 live stack

```text
PR #217      Review-gated monitoring foundation
PR #223      Issue #171 initial monitoring state / dedupe seed
PR #225      Review-branch fallback and duplicate-work guard
PR #226      Bounded evidence-health watch
PR #228–230  External bridge-universe watch + accepted baseline
PR #231–232  News source boundary + optional fail-closed GDELT adapter
PR #233–239  Structured DefiLlama bridge-hack feed + accepted baseline
PR #241–244  Active bridge official-domain watch + accepted baseline
PR #245–246  RSS status-news discovery + accepted baseline
PR #248      Review issue resolution / rearm lifecycle
PR #249–250  Public site health watch + accepted production baseline
```

The persisted monitoring baselines are historical checkpoints and may predate later canonical additions. Monitoring remains review-only and must never auto-write canonical records.

## Permanent release gates

```text
npm audit --audit-level=high
canonical + enum validation
full-corpus / exact source-count / source-quality audits
monitoring tests
build + dist consistency
accessibility contract
built-output performance budget
Chromium / Firefox / WebKit compatibility
production registry equality after main merge
```

Current budgets remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, and 4 KiB JS total / 2 KiB max JS file. Astro remains `^7.2.0`.

## Release history

The original v1 technical closure was accepted by PR #258 and main run `31367052981` / job `93387599332`. Allbridge was later production-verified by run `31393382470` / job `93470262367`. The current Syscoin maintenance revision is independently production-verified by run `31458996854` / job `93678566693`.

No semantic-version tag or GitHub Release is implied by these technical checkpoints.

## Next bounded work

1. rerun Phase 5 Monitoring and Public Site Health against the current `34 / 36 / 185 / 293` canonical state;
2. inspect and accept only bounded healthy monitoring-state changes, then prove silent repeat;
3. continue reviewed first-party-backed incident/corpus expansion;
4. keep Issue #171 Boltz review-only until stronger incident-boundary evidence appears;
5. preserve every permanent release and source-quality guard without widening ceilings to force coverage.
