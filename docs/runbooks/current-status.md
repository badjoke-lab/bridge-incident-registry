# Current Status — Bridge Incident Registry

Status: active maintenance  
Updated: 2026-08-10

## Canonical and production state

```text
Bridges     34
Incidents   36
Events      185
Evidence    293
```

Latest reviewed canonical maintenance addition is the July 19, 2026 Allbridge Core Solana pool exploit under existing `bir_bridge_000012`.

```text
Review PR                         #261
Canonical PR                      #262
Canonical merge                   d7cf47f2373c9c0b94b78b93807fc6d0239c2d98
V1 Release Readiness main run     31393382470
Release-readiness job             93470262367
Production registry equality      success
Built HTML pages                  74
```

## Current Phase 3 quality boundary

```text
Primary evidence                         209 / 291
Tier 1 evidence                          226 / 291
Official-domain evidence                 131 / 291
Evidence with archived_url               130 / 291
Incidents without primary                  1 / 35
Incidents without Tier 1                   1 / 35
Events without primary                    11 / 184
Events without Tier 1                       6 / 184
Terminal unarchived unique URLs           15
Risky-host unarchived unique URLs         16
Unknown URL status                         0
Incident source-count mismatches           0
Event source-count mismatches              0
High-severity npm audit findings           0
```

The Allbridge batch added three Tier 1 primary Telegram records and one Tier 2 secondary corroboration. The unarchived official X technical post-mortem was deliberately excluded from canonical evidence, preserving the risky-host ceiling at 16.

Four non-intentional event-primary gaps remain deferred pending stronger first-party material: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps remain intentional secondary-only records. `bir_ev_000150` remains intentionally non-primary direct security monitoring. `bir_inc_000026` remains the reviewed Nerve incident-level primary/Tier 1 gap.

## Latest canonical maintenance

### Boltz boundary — PR #260

The obsolete `scripts/apply-boltz-security-shutdown.mjs` helper was removed because it encoded an earlier canonicalization proposal that the later formal review rejected. Issue #171 remains a monitoring signal / needs-evidence item. No Boltz canonical incident is approved without a discrete supported incident boundary.

### Allbridge Core July 2026 — PRs #261–#262

The accepted first-party record supports a discrete second incident under the existing Allbridge entity:

```text
Incident                     bir_inc_000035
Event                        bir_ev_000184
Evidence                     bir_src_000288–bir_src_000291
Incident date                2026-07-19
Reported project amount      $1.65 million
Affected chain               Solana
Affected assets              USDC / USDT
Restart status               reopened
Current outcome              active_after_incident
Recovery status              unknown
Reimbursement status         unknown
Attack-vector category       liquidity_or_accounting_failure
```

The canonical boundary distinguishes the $1.65M attacker withdrawal, final attacker-fund recovery, affected-LP compensation, protocol restart, and longer-term Core/Classic transition. Unknown outcomes remain unknown rather than being inferred from relaunch statements.

## Phase 5 monitoring and candidate collection

```text
Review-gated foundation              complete — PR #217
Initial Boltz monitoring state       merged — PR #223
Review-branch fallback / dedupe      complete — PR #225
Evidence health watch                live — PR #226
External bridge-universe watch       live — PRs #228–#230
Optional GDELT adapter               fail-closed — PRs #231–#232
Structured bridge-hack feed          live — PRs #233–#239
Active bridge/domain watch           live — PRs #241–#244
RSS status-news watch                live — PRs #245–#246
Monitoring state resolution health   live — PR #248
Public site / SEO health watch       live — PRs #249–#250
```

The accepted Phase 5 baseline runs predate the Allbridge canonical addition. They remain valid historical monitor-state checkpoints, while the new canonical/public truth is proven independently by main release-readiness run `31393382470`.

Historical accepted monitor state:

```text
Evidence-health selection           12 / 287; 24 probes; 0 hard findings
External universe                   98 parsed / 11 exact / 87 unmatched baseline
External repeat                     87 unchanged / 0 candidates
DefiLlama hacks                     613 parsed / 61 bridgeHack=true
Bridge-hack baseline                61 / 20 exact canonical / 0 candidates
Active-domain accepted batch         8 healthy / 0 findings
RSS accepted baseline               55 parsed / 0 relevant / 0 candidates
Scheduled BIR Monitoring            31356920691 success
Scheduled Public Site Health        31359554582 success
```

Monitoring is review-only. Initial observations and secondary feeds do not become canonical truth automatically. Issue closure changes monitoring state only, not incident truth.

## Permanent release status

v1 technical hardening/closure remains complete from PRs #251–#258. The original accepted closure is historical run `31367052981` / job `93387599332`. The later Allbridge maintenance revision passed the same consolidated contract on main and production:

```text
Allbridge canonical merge            d7cf47f2373c9c0b94b78b93807fc6d0239c2d98
Release-readiness run                 31393382470
Release-readiness job                 93470262367
Dependency/security gates             success
Canonical/data/source-quality gates   success
Accessibility                         success
Performance                           success
Chromium / Firefox / WebKit           success
Production registry equality          success
Canonical                             33 / 35 / 184 / 291
```

Astro remains `^7.2.0`. Current performance budgets remain 16 KiB gzip max HTML, 5 KiB CSS total/max file, 4 KiB JS total, and 2 KiB max JS file. High-severity dependency findings remain 0.

This is a technical release/maintenance proof, not a semantic-version publication. No GitHub Release or tag is implied.

## Monitoring and release safety boundary

- canonical JSON is fingerprinted before and after monitoring;
- canonical diffs, unknown URL status, and broken canonical references are blocking;
- monitoring candidates never publish canonical records automatically;
- secondary discovery sources can only create review material;
- source-quality ceilings may not be widened merely to admit a source;
- public-site health complements but does not replace exhaustive production-content equality;
- accessibility, performance, browser compatibility, dependency security, source quality, validator, and dist consistency remain permanent release gates;
- canonical publication requires a reviewed canonical branch plus post-merge production verification;
- Cloudflare Pages preview deployment remains `none`.

## Ongoing work

1. run/inspect the next Phase 5 and Public Site Health cycles against the new canonical baseline;
2. continue reviewed first-party-backed incident/corpus expansion;
3. keep Boltz Issue #171 review-only until stronger incident-boundary evidence exists;
4. continue Phase 3 source/archive work only when new material improves the reviewed boundary;
5. preserve all permanent release and source-quality guards while expanding the registry.
