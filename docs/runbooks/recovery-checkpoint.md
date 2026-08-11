# BIR Live Recovery Checkpoint

Status: active maintenance  
Updated: 2026-08-11

GitHub state and canonical JSON are authoritative. Completed merge SHAs and run IDs below are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges     34
Incidents   36
Events      185
Evidence    293
```

## Immediate recovery point

The latest completed canonical maintenance item is the June 2026 Syscoin UTXO–NEVM Bridge exploit.

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

Resume from current `main` after that merge. Do not use historical branch heads or the temporary application machinery from PR #266; the temporary generator and write-enabled workflow were removed before final review.

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
PR #261–262  Review/apply Allbridge Core July 2026 incident
PR #263–264  Allbridge production checkpoint and healthy site baseline
PR #265      Review Syscoin UTXO–NEVM Bridge June 2026 exploit
PR #266      Apply and production-verify Syscoin 2026 incident
```

## Current quality boundary

```text
Incident source-count mismatches      0
Event source-count mismatches         0
Primary evidence                    210 / 293
Tier 1 evidence                     227 / 293
Official-domain evidence            132 / 293
Incidents without primary             1 / 36
Incidents without Tier 1              1 / 36
Events without primary               11 / 185
Events without Tier 1                 6 / 185
Evidence with archived_url          130 / 293
Terminal unarchived unique URLs      15
Risky-host unarchived unique URLs    16
Unknown URL status                    0
High-severity npm audit findings      0
```

The Syscoin application did not increase an accepted primary/Tier 1 gap or risky-host ceiling. It added one first-party Tier 1 postmortem and one Tier 2 security-firm report.

## Syscoin 2026 canonical boundary

```text
Bridge                       bir_bridge_000034
Incident                     bir_inc_000036
Event                        bir_ev_000185
Evidence                     bir_src_000292–bir_src_000293
Date                         2026-06-07
Unauthorized release         5 billion SYS
Secondary valuation          about $10 million
Recovery                     full_recovery
Reimbursement                not_applicable
Restart                      paused
Outcome                      paused_long_term
Attack category              message_verification_failure
```

The first-party root-cause authority is Syscoin's technical postmortem. The 5 billion SYS quantity is first-party; the approximately $10 million figure is a secondary contemporaneous valuation from Halborn. The full 5 billion SYS was returned and burned. Do not infer bridge reopening from financial recovery: the latest explicit reviewed first-party operational state remains paused.

Normalization keys `syscoin-utxo`, `syscoin-nevm`, and `sys` were added only to support the approved canonical values.

## Allbridge and Boltz boundaries

Allbridge remains `bir_inc_000035` under `bir_bridge_000012`, production-verified in PR #262. Its final attacker-fund recovery and LP compensation remain unknown.

Boltz Issue #171 remains `monitoring signal / needs evidence`. PR #260 removed the obsolete canonical apply helper. Do not recreate that proposal unless new evidence establishes a discrete supported incident.

## Phase 5 monitoring recovery point

Monitoring is review-only. It fingerprints canonical files, rejects canonical mutation/unknown URL status/broken references, writes only to approved staging paths, and suppresses unchanged signals.

The persisted monitoring state includes historical baselines established before later canonical additions. The Allbridge-era Public Site Health change was accepted by PR #264 and then proved silent on repeat. Current canonical/public truth is `34 / 36 / 185 / 293`, proven independently by main release-readiness run `31458996854`.

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

## Release proof history

Original v1 technical closure: PR #258, merge `d9f545803104bffd829d93270965f53d9f3d1a45`, run `31367052981`, job `93387599332`.

Allbridge post-closure proof: merge `d7cf47f2373c9c0b94b78b93807fc6d0239c2d98`, run `31393382470`, job `93470262367`.

Current Syscoin post-closure proof: merge `679f40c55677ad9d89f508200e47004f40464922`, run `31458996854`, job `93678566693`, production equality success on the first availability attempt.

No checkpoint creates or implies a semantic-version tag or GitHub Release.

## Cloudflare Pages boundary

Production branch is `main`, production deployments are enabled, and preview deployment remains `none`. Canonical/public output changes require post-merge production equality; monitoring-only state changes do not.

## Restart actions

1. rerun BIR Monitoring and Public Site Health after the Syscoin canonical addition;
2. inspect any review-only state change and merge only healthy bounded monitoring data;
3. prove silent repeat after any accepted monitoring-state seed;
4. continue first-party-backed canonical expansion with a fresh branch per approved batch;
5. preserve source-quality ceilings and all release gates; do not weaken semantics to improve counts.
