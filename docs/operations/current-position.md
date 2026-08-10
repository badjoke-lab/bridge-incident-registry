# Current position

Status: active maintenance  
Updated: 2026-08-10

This file is the compact restart pointer. Current `main`, canonical JSON, GitHub Actions, `docs/runbooks/recovery-checkpoint.md`, `docs/runbooks/current-status.md`, and `docs/runbooks/development-roadmap.md` are authoritative.

## Canonical and production baseline

```text
Bridges     33
Incidents   35
Events      184
Evidence    291
```

Latest canonical maintenance addition: **Allbridge Core July 2026 Solana pool exploit** under existing `bir_bridge_000012`.

```text
Review PR                         #261
Canonical PR                      #262
Canonical merge                   d7cf47f2373c9c0b94b78b93807fc6d0239c2d98
V1 Release Readiness main run     31393382470
Release-readiness job             93470262367
Production equality               success
Built HTML pages                  74
```

## Current quality boundary

```text
Primary evidence                       209 / 291
Tier 1 evidence                        226 / 291
Evidence with archived_url             130 / 291
Incidents without primary                1 / 35
Incidents without Tier 1                 1 / 35
Events without primary                  11 / 184
Events without Tier 1                     6 / 184
Terminal unarchived unique URLs          15
Risky-host unarchived unique URLs        16
Unknown URL status                        0
Source-count mismatches                   0
High-severity npm audit findings          0
Canonical production content match      true
```

The Allbridge batch added three Tier 1 primary Telegram records and one Tier 2 corroborating article. The unarchived official X post-mortem was deliberately not admitted, so the risky-host ceiling remains 16.

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
```

Boltz remains Issue #171, a monitoring signal / needs-evidence item. It is not a canonical incident because the accepted review record still lacks one discrete exploit/incident boundary.

Allbridge is different: the first-party record established a discrete pause, confirmed $1.65 million withdrawal, and later pool-less Core relaunch. It was therefore added as `bir_inc_000035` under the existing Allbridge entity rather than as a duplicate bridge.

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

The accepted monitoring baselines predate the Allbridge canonical addition and are historical monitoring checkpoints, not current canonical counts. Monitoring remains review-only and must never auto-write canonical records.

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

## v1 technical release history

The original v1 technical closure was accepted by PR #258 and main run `31367052981` / job `93387599332`. That remains a historical release-contract checkpoint. The later Allbridge canonical update was independently accepted on main by run `31393382470` / job `93470262367`, including production equality.

No semantic-version tag or GitHub Release is implied by either checkpoint.

## Next bounded work

1. inspect the latest Phase 5 monitoring/public-site runs against the new `33 / 35 / 184 / 291` canonical state;
2. continue reviewed incident/corpus expansion from concrete first-party-backed candidates;
3. keep Issue #171 Boltz review-only until stronger incident-boundary evidence appears;
4. perform Phase 3 source/archive remediation only when new stronger material exists;
5. preserve every permanent release and source-quality guard without widening ceilings to force coverage.
