# Current Status — Bridge Incident Registry

Status: active maintenance  
Updated: 2026-08-11

## Canonical and production state

```text
Bridges     36
Incidents   38
Events      188
Evidence    297
```

Latest reviewed canonical maintenance addition is the June 7, 2026 Syscoin UTXO–NEVM Bridge exploit.

```text
Review PR                         #265
Canonical PR                      #266
Canonical merge                   679f40c55677ad9d89f508200e47004f40464922
V1 Release Readiness main run     31458996854
Release-readiness job             93678566693
Production registry equality      success
Built HTML pages                  76
Canonical HTML routes             75
Legacy redirects                  74
```

## Current Phase 3 quality boundary

```text
Primary evidence                         210 / 293
Tier 1 evidence                          227 / 293
Official-domain evidence                 132 / 293
Evidence with archived_url               130 / 293
Incidents without primary                  1 / 36
Incidents without Tier 1                   1 / 36
Events without primary                    11 / 185
Events without Tier 1                       6 / 185
Terminal unarchived unique URLs           15
Risky-host unarchived unique URLs         16
Unknown URL status                         0
Incident source-count mismatches           0
Event source-count mismatches              0
High-severity npm audit findings           0
```

The Syscoin batch added one Tier 1 primary first-party postmortem and one Tier 2 security-firm report. It did not increase terminal-unarchived or risky-host ceilings and did not add a primary/Tier 1 gap.

Four non-intentional event-primary gaps remain deferred pending stronger first-party material: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps remain intentional secondary-only records. `bir_ev_000150` remains intentionally non-primary direct security monitoring. `bir_inc_000026` remains the reviewed Nerve incident-level primary/Tier 1 gap.

## Latest canonical maintenance

### Syscoin UTXO–NEVM Bridge June 2026 — PRs #265–#266

```text
Bridge                       bir_bridge_000034
Incident                     bir_inc_000036
Event                        bir_ev_000185
Evidence                     bir_src_000292–bir_src_000293
Incident date                2026-06-07
Unauthorized release         5 billion SYS
Secondary USD valuation      about $10 million
Recovery status              full_recovery
Reimbursement status         not_applicable
Restart status               paused
Current outcome              paused_long_term
Attack-vector category       message_verification_failure
```

Syscoin's first-party technical postmortem is the root-cause authority. Halborn is retained as Tier 2 corroboration and for the approximately $10 million contemporaneous valuation. The full 5 billion SYS was returned and burned; that financial recovery is not treated as reimbursement or as proof that bridge operations reopened. The latest explicit reviewed first-party state remains paused.

Reference normalization gained only the approved keys `syscoin-utxo`, `syscoin-nevm`, and `sys`; these are validator/reference-data additions required by the canonical values, not separate claims.

### Allbridge Core July 2026 — PRs #261–#262

Allbridge remains `bir_inc_000035` under existing `bir_bridge_000012`, with a first-party $1.65 million withdrawal, later pool-less Core relaunch, and unresolved final recovery/LP compensation.

### Boltz boundary — PR #260 / Issue #171

Boltz remains a monitoring signal / needs-evidence item. No canonical Boltz incident is approved without a discrete supported incident boundary.

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

Persisted Phase 5 baselines are historical monitor-state checkpoints and may predate later canonical additions. Monitoring is review-only: secondary discovery data and initial observations never become canonical truth automatically.

The Allbridge-era post-change Public Site Health seed was accepted by PR #264 and then proved silent on the next repeat. Syscoin now requires the same post-change rerun against `34 / 36 / 185 / 293`.

## Permanent release status

v1 technical hardening/closure remains complete from PRs #251–#258. The current post-closure canonical proof is:

```text
Syscoin canonical merge               679f40c55677ad9d89f508200e47004f40464922
Release-readiness run                 31458996854
Release-readiness job                 93678566693
Dependency/security gates             success
Canonical/data/source-quality gates   success
Accessibility                         success
Performance                           success
Chromium / Firefox / WebKit           success
Production registry equality          success
Canonical                             34 / 36 / 185 / 293
Built HTML pages                      76
Canonical HTML routes                75
Legacy redirects                     74
```

Production verification returned HTTP 200 for all four canonical datasets, the new Syscoin bridge route, the new Syscoin incident route, and published reference data. Canonical production content matched on the first attempt.

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

1. rerun BIR Monitoring and Public Site Health against the Syscoin-era canonical state;
2. inspect and accept only bounded review-only monitoring changes, then prove silent repeat;
3. continue reviewed first-party-backed incident/corpus expansion;
4. keep Boltz Issue #171 review-only until stronger incident-boundary evidence exists;
5. preserve all permanent release and source-quality guards while expanding the registry.
