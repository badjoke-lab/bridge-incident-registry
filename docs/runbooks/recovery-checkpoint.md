# BIR Live Recovery Checkpoint

Status: active maintenance  
Updated: 2026-08-10

GitHub state and canonical JSON are authoritative. Completed merge SHAs and run IDs below are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges     33
Incidents   35
Events      184
Evidence    291
```

## Immediate recovery point

The latest completed canonical maintenance item is the July 2026 Allbridge Core Solana pool exploit.

```text
Review PR                         #261
Canonical PR                      #262
Canonical merge                   d7cf47f2373c9c0b94b78b93807fc6d0239c2d98
V1 Release Readiness main run     31393382470
Release-readiness job             93470262367
Production equality               success
Built HTML pages                  74
```

Resume from current `main` after that merge. Do not use historical branch heads or the temporary application machinery from PR #262; the temporary generator and write-enabled workflow were removed before final review.

## Latest completed checkpoints

```text
PR #100      Source-quality baseline and no-regression gate
PR #103–107  LI.FI and Holograph source-quality remediation
PR #108–116  Event Tier 1 remediation and production verification
PR #118–198  Archive Capture Batches 1–18 and production checkpoints
PR #199–204  Deferred Archive Retries 01–02 and production checkpoints
PR #205–206  Deferred Archive Retries 03–04 review, no approvals
PR #207–214  Event Primary Remediation 01–02 and production verification
PR #217–250  Phase 5 monitoring/candidate/public-site stack
PR #251–258  v1 hardening and technical release closure
PR #260      Remove stale Boltz canonical mutation helper
PR #261      Review Allbridge Core July 2026 Solana exploit
PR #262      Apply and production-verify Allbridge 2026 incident
```

## Current quality boundary

```text
Incident source-count mismatches      0
Event source-count mismatches         0
Primary evidence                    209 / 291
Tier 1 evidence                     226 / 291
Incidents without primary             1 / 35
Incidents without Tier 1              1 / 35
Events without primary               11 / 184
Events without Tier 1                 6 / 184
Evidence with archived_url          130 / 291
Terminal unarchived unique URLs      15
Risky-host unarchived unique URLs    16
Unknown URL status                    0
High-severity npm audit findings      0
```

The Allbridge application did not consume an existing primary/Tier 1 gap or increase the risky-host ceiling. The unarchived official X post-mortem was deliberately left out of canonical evidence.

## Allbridge 2026 canonical boundary

```text
Bridge                       bir_bridge_000012
Incident                     bir_inc_000035
Event                        bir_ev_000184
Evidence                     bir_src_000288–bir_src_000291
Date                         2026-07-19
Loss                         $1.65 million
Chain                        Solana
Assets                       USDC / USDT
Recovery                     unknown
Reimbursement                unknown
Restart                      reopened
Outcome                      active_after_incident
Attack category              liquidity_or_accounting_failure
```

Do not infer final attacker-fund recovery, final LP compensation, or completed Core/Classic migration from the relaunch record. A separate exact-date reopen event was intentionally not created because the admitted first-party rendering established reopening but not an independently stable exact calendar date for that event.

## Boltz boundary

Issue #171 remains `monitoring signal / needs evidence`. PR #260 removed the obsolete canonical apply helper because it contradicted the accepted review boundary. Do not recreate or execute that old one-incident proposal unless new evidence establishes a discrete supportable incident.

## Phase 5 monitoring recovery point

Monitoring is review-only. It fingerprints canonical files, rejects canonical mutation/unknown URL status/broken references, writes only to approved staging paths, and suppresses unchanged signals.

The persisted accepted monitor baselines predate the Allbridge canonical addition:

```text
Evidence-health run            31301765004 / 93215576787
External universe              98 parsed / 11 exact / 87 unmatched baseline
DefiLlama bridge-hack feed      613 parsed / 61 bridge rows
Active-domain accepted run     31313312723
RSS accepted run               31313579371 / 93245104559
Public-site baseline run       31314396266
Scheduled BIR Monitoring       31356920691 success
Scheduled Public Site Health   31359554582 success
```

These are historical monitor-state checkpoints, not the latest canonical counts. The current public/canonical state `33 / 35 / 184 / 291` is separately proven by main release-readiness run `31393382470`.

Repository Actions settings still disallow `GITHUB_TOKEN` PR creation. On that exact platform error the monitoring workflow may retain an already-validated review branch; all other PR-creation failures remain fatal. Connected GitHub access can open the review PR when needed.

## Permanent guards

```text
npm audit --audit-level=high
npm run audit:source-count
npm run audit:source-count:test
npm run audit:source-quality
npm run audit:source-quality:test
npm run monitoring:test
npm run production:content:test
npm run performance:test
npm run build
npm run accessibility:check
npm run performance:check
npm run dist:check
npm run dist:test
Chromium / Firefox / WebKit compatibility smoke
post-merge production equality
```

Current performance ceilings remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file. Astro remains `^7.2.0`.

## Historical v1 technical closure

The original v1 technical release contract was accepted by PR #258, merge `d9f545803104bffd829d93270965f53d9f3d1a45`, run `31367052981`, job `93387599332`. It remains historical proof. The Allbridge maintenance change later passed the same release contract plus production equality under run `31393382470`.

Neither checkpoint creates or implies a semantic-version tag or GitHub Release.

## Cloudflare Pages boundary

Production branch is `main`, production deployments are enabled, and preview deployment remains `none`. Canonical/public output changes require post-merge production equality; monitoring-only state changes do not.

## Restart actions

1. inspect the next BIR Monitoring and Public Site Health runs after the Allbridge canonical addition;
2. investigate new monitoring/candidate signals only through review-first workflow;
3. continue first-party-backed canonical expansion with a fresh branch per approved record batch;
4. leave Boltz Issue #171 review-only unless stronger incident-boundary evidence appears;
5. preserve source-quality ceilings and all release gates; do not weaken semantics to improve counts.
