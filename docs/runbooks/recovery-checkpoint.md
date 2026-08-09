# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-09

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

## Latest completed checkpoints

```text
PR #100      Source-quality baseline and no-regression gate
PR #103–107  LI.FI and Holograph source-quality remediation
PR #108–116  Event Tier 1 remediation and production verification
PR #117      Nerve Bridge source boundary
PR #118–198  Archive Capture Batches 1–18 and production checkpoints
PR #199–204  Deferred Archive Retries 01–02 and production checkpoints
PR #205–206  Deferred Archive Retries 03–04 review, no approvals
PR #207–209  Event Primary Remediation 01 and production verification
PR #211–214  Event Primary Remediation 02 review, migration, and production verification
PR #217      Review-gated Phase 5 monitoring foundation
PR #218      Cross-record bridge-integrity validation
PR #223      Initial live monitoring state / Issue #171 dedupe seed
PR #225      Review-branch fallback and duplicate-work guard
PR #226      Bounded evidence-health watch
PR #228–230  External bridge-universe watch and accepted baseline
PR #231–232  News source boundary and optional fail-closed GDELT adapter
PR #233–239  Structured DefiLlama bridge-hack discovery and accepted baseline
```

## Latest completed production checkpoint

```text
Review PR                     #211
Canonical data PR             #213
Canonical merge               f2874a2d0ffe6877eadf6619cd6100a9b9b3991b
Production audit PR           #214
Production verify run         31300484236
Production verify job         93212360938
Verified state                33 / 34 / 183 / 287
Primary evidence              206 / 287
Tier 1 evidence               223 / 287
Archived evidence             130 / 287
Events without primary        11 / 183
Canonical content match       true
Generated at                  2026-08-09T07:08:45.362Z
```

## Permanent guards

```text
npm run audit:source-count
npm run audit:source-count:test
npm run audit:source-quality
npm run audit:source-quality:test
npm run monitoring:test
npm run production:content:test
```

```text
Blocking errors                       0
Incident source-count mismatches      0
Event source-count mismatches         0
Incidents without primary             1
Incidents without Tier 1              1
Events without primary               11
Events without Tier 1                 6
Unreviewed event Tier 1 gaps           0
Evidence with archived_url          130
Terminal unarchived unique URLs      15
Risky-host unarchived unique URLs    16
Unknown URL status                    0
```

## Archive and primary-evidence boundaries

Archive Capture Batch 18 and Deferred Retries 03–04 exhausted the fresh archive-review scope under the current acceptance boundary. Event-primary remediation has also reached a reviewed boundary. Four non-intentional candidates remain deferred pending stronger first-party evidence: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps are intentional secondary-only records; `bir_ev_000150` remains intentionally non-primary direct security monitoring. Do not weaken source semantics to reduce metrics.

## Phase 5 monitoring checkpoint

Monitoring is review-only. It fingerprints all four canonical JSON files before and after execution, rejects canonical mutation/unknown URL status/broken references, writes only under `data-staging/monitoring/**` and `data-staging/watchlists/auto/**`, and suppresses unchanged signals by stable fingerprints.

### Issue and evidence-health proof

```text
Issue-monitor run              31301301277
Issue #171 initial candidate   Boltz — B / hold
State PR                       #223
Unchanged rerun                no new review work
Evidence-health run            31301765004 / 93215576787
Evidence selected              12 / 287
Two-pass probes                24
Hard 404/410 findings           0
Canonical diff                 none
```

### External bridge universe

PR #230 accepted a zero-candidate universe baseline:

```text
External rows                  98
Exact canonical matches        11
Unmatched baseline             87
Baseline candidates             0
Source SHA-256                 3895dfff2a023c3f67aceacb0e4d56f90e4bd0028f34c94b6b0b03ceb4d253a0
```

Rerun job `93220521310` proved all 87 unmatched rows unchanged, with candidate/state change 0.

### Structured bridge-hack incident feed

The scheduled/default incident feed uses the best-effort public raw route:

```text
URL          https://api.llama.fi/hacks
Kind         legacy_public_json
Raw SHA-256  e80fced996cf886ca0d2ca70c02dd04b869b628d63773d0b327f97b49aa2734a
```

The live schema uses `bridgeHack`, `chain`, `source`, and `targetType`. Temporary diagnostics proved `bridgeHack=true` is the required relevance gate. Seven canonical-name matches with `bridgeHack=false` were ordinary protocol/DeFi exploits and are excluded by PR #238.

Accepted PR #239 baseline:

```text
Parsed hacks                 613
bridgeHack=true               61
Bridge-hack baseline          61
Exact canonical matches       20
Baseline candidates            0
Canonical diff              none
```

Rerun job `93224464784` proved:

```text
Bridge-hack rows              61
Unchanged                     61
Candidates                     0
State change               false
External-universe unchanged   87
Evidence findings              0
Canonical diff              none
```

A new `bridgeHack=true` row that exactly matches a canonical BIR bridge may enter review as `B / hold`; an unresolved `bridgeHack=true` row may enter as `C / hold`. Neither is canonical evidence without a separate primary-source investigation.

GDELT remains optional/fail-closed code only because the first GitHub Actions live request received HTTP 429. No GDELT baseline was accepted.

Repository Actions settings still disallow `GITHUB_TOKEN` PR creation. On that specific platform error, the workflow retains the already-validated monitoring branch and succeeds; connected GitHub access can open the review PR. All other PR-creation failures remain fatal.

## Cloudflare Pages boundary

Production branch is `main`, production deployments are enabled, and preview deployment remains `none`. Monitoring changes do not require production publication verification unless canonical/public output changes.

## Next

1. implement bounded official-domain/status monitoring for canonical active bridges;
2. add pause/shutdown/regulatory review signals only when source behavior is reproducible;
3. add public-site/SEO monitoring incrementally;
4. continue v1 hardening;
5. revisit deferred evidence/archive gaps only after source conditions change.
