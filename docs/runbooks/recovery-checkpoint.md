# BIR Live Recovery Checkpoint

Status: active maintenance  
Updated: 2026-08-10

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
PR #207–214  Event Primary Remediation 01–02 and production verification
PR #217      Review-gated Phase 5 monitoring foundation
PR #218      Cross-record bridge-integrity validation
PR #223      Initial live monitoring state / Issue #171 dedupe seed
PR #225      Review-branch fallback and duplicate-work guard
PR #226      Bounded evidence-health watch
PR #228–230  External bridge-universe watch and accepted baseline
PR #231–232  News source boundary and optional fail-closed GDELT adapter
PR #233–239  Structured DefiLlama bridge-hack discovery and accepted baseline
PR #241–244  Active bridge official-domain monitoring and accepted baseline
PR #245–246  RSS status-news discovery and accepted baseline
PR #248      Review issue resolution and rearm lifecycle
PR #249–250  Public site health monitor and accepted healthy baseline
PR #251      Phase 5 restart/status checkpoint
PR #252      Accessibility foundation and built-output gate
PR #253      Built-output performance budget and regression test
PR #254      Chromium / Firefox / WebKit compatibility smoke
PR #255      GitHub Actions runtime hardening to v7 action majors
PR #256      Astro 7.2.0 security upgrade and blocking high-severity npm audit
PR #257      v1 hardening restart/status checkpoint
PR #258      Consolidated v1 release-readiness workflow and runbook
```

## Accepted v1 technical release checkpoint

```text
Release-readiness merge       d9f545803104bffd829d93270965f53d9f3d1a45
V1 Release Readiness run      31367052981
Release-readiness job         93387599332
Canonical                     33 / 34 / 183 / 287
Production equality           success
Canonical mutation            none
```

The main-branch release-readiness run passed the same-revision dependency-security, schema/data, corpus-quality, monitoring-test, build, accessibility, performance, dist-consistency, and Chromium / Firefox / WebKit compatibility gates before the production equality verifier passed against `https://bir.badjoke-lab.com`.

This checkpoint closes the **v1 technical release contract**. It does not create or imply a semantic-version tag or GitHub Release.

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
```

Separate CI covers Chromium / Firefox / WebKit compatibility and representative desktop/mobile screenshot capture. `V1 Release Readiness` consolidates the release-critical gates and runs production verification after merge to `main`.

```text
Blocking errors                       0
Incident source-count mismatches      0
Event source-count mismatches         0
Incidents without primary             1
Incidents without Tier 1              1
Events without primary               11
Events without Tier 1                 6
Evidence with archived_url          130
Terminal unarchived unique URLs      15
Risky-host unarchived unique URLs    16
Unknown URL status                    0
High-severity npm audit findings      0
```

## Archive and primary-evidence boundaries

Archive Capture Batch 18 and Deferred Retries 03–04 exhausted the fresh archive-review scope under the current acceptance boundary. Event-primary remediation has also reached a reviewed boundary. Four non-intentional candidates remain deferred pending stronger first-party evidence: `bir_ev_000014`, `bir_ev_000143`, `bir_ev_000144`, and `bir_ev_000148`. Six Tier 1 gaps are intentional secondary-only records; `bir_ev_000150` remains intentionally non-primary direct security monitoring. Do not weaken source semantics to reduce metrics.

## Phase 5 monitoring checkpoint

Monitoring is review-only. It fingerprints all four canonical JSON files before and after execution, rejects canonical mutation/unknown URL status/broken references, writes only under approved monitoring/watchlist staging paths, and suppresses unchanged signals by stable fingerprints.

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
```

### External bridge universe and bridge-hack feed

```text
External rows                  98
Exact canonical matches        11
Unmatched baseline             87
External repeat unchanged      87
External candidates             0
DefiLlama hacks parsed        613
bridgeHack=true                61
Bridge-hack baseline           61
Exact canonical matches        20
Bridge-hack repeat unchanged   61
Bridge-hack candidates          0
```

The bridge-hack source is `https://api.llama.fi/hacks`, kind `legacy_public_json`, raw SHA-256 `e80fced996cf886ca0d2ca70c02dd04b869b628d63773d0b327f97b49aa2734a`. `bridgeHack=true` is required before identity classification. New exact matches may become `B / hold`; unresolved bridge rows may become `C / hold`; neither is canonical evidence without separate primary-source research.

### Active bridge official-domain watch

PR #241 added a rotating two-pass official-URL monitor for canonical `active`, `limited`, and `paused` bridges. The first enabled live run exposed a Synapse parent-domain/subdomain false positive; its auto branch was discarded. PR #243 fixed official-domain scope comparison before any incorrect state was accepted.

Accepted run `31313312723`, persisted in PR #244:

```text
Eligible bridges              22
Selected                       8
Healthy baselines              8
Hard failures                  0
Domain findings                0
Canonical diff              none
```

The post-merge rerun produced baseline changes 0, findings 0, and no new review branch. Two 404/410 responses are required for a hard finding. 401/403/405/429, 5xx, timeout, and mixed results are insufficient. Parent/subdomain relationships are within the same official-domain scope; unrelated consistent final-host changes remain reviewable.

### RSS status-news discovery

PR #245 added RSS/Atom secondary discovery for canonical bridge identity plus bounded security, pause/shutdown, or regulatory triggers. Run `31313579371`, job `93245104559`, reached both configured publisher feeds:

```text
Feeds reached                 2
CoinDesk rows                25
Cointelegraph rows           30
Rows parsed                  55
Bridge + trigger rows         0
Baseline candidates           0
Findings                      0
Canonical diff             none
```

PR #246 persisted the RSS baseline. Rerun job `93245346339` again parsed 55 rows and produced candidate 0, finding 0, `state_changed=false`, and no review branch. RSS findings are secondary `B / hold` discovery only; primary-source review is mandatory before canonical work.

GDELT remains optional/fail-closed because its first GitHub Actions live request received HTTP 429. No GDELT baseline was accepted.

### Review issue resolution and rearm

PR #248 added explicit state transitions for tracked review issues while preserving legacy open fingerprints.

```text
new/open issue              medium review finding + B/hold
unchanged open              silent
known issue closes          one low review_signal_resolved finding
unchanged closed            silent
closed issue reopens        rearmed medium finding + B/hold
historical closed issue     ignored unless previously tracked
```

This resolves/rearms monitoring state only. It does not resolve canonical incidents automatically.

### Public site health proof

PR #249 added a separate weekly public-site/SEO health workflow. PR #250 persisted the first accepted healthy baseline from run `31314396266`.

```text
Origin                      https://bir.badjoke-lab.com
Targets                     6
Independent requests       12
Healthy baselines seeded    6
Findings                    0
Sampled bridge              bir_bridge_000017
Sampled incident            bir_inc_000030
Canonical                   33 / 34 / 183 / 287
Canonical diff              none
```

The six targets are home, `robots.txt`, `sitemap.xml`, `version.json`, one rotating bridge detail route, and one rotating incident detail route. Scheduled run `31359554582` on 2026-08-10 completed successfully and reported no public-site state changes. Main monitoring run `31356920691` also completed successfully with no monitoring state changes and canonical data unchanged.

Repository Actions settings still disallow `GITHUB_TOKEN` PR creation. On that specific platform error, the workflow retains the already-validated monitoring branch and succeeds; connected GitHub access can open the review PR. All other PR-creation failures remain fatal.

## v1 hardening recovery point

```text
Accessibility contract        73 generated HTML pages passing
Performance max HTML          16 KiB gzip ceiling
Performance CSS                5 KiB total / 5 KiB max file
Performance JS                 4 KiB total / 2 KiB max file
Compatibility                  Chromium / Firefox / WebKit passing
Actions runtimes               checkout/setup-node/upload-artifact v7 where used
Astro                          ^7.2.0
High-severity npm audit        0
Canonical hardening diff       none
```

The first security-gate run intentionally failed on the pre-upgrade dependency graph with 1 low and 2 high npm findings. The high findings were rooted in the old Astro dependency graph. After upgrading to Astro 7.2.0, the high-severity audit, full `Check`, representative screenshots, three-engine compatibility smoke, and consolidated release-readiness workflow all pass.

## Cloudflare Pages boundary

Production branch is `main`, production deployments are enabled, and preview deployment remains `none`. Monitoring changes do not require production publication verification unless canonical/public output changes.

## Restart point after v1 technical closure

1. resume reviewed corpus/candidate expansion and Phase 3 research-triggered quality maintenance;
2. keep Phase 5 monitors live in steady state and investigate new signals without automatic canonical promotion;
3. preserve all permanent release gates, including security, accessibility, performance, browser compatibility, source quality, and production equality;
4. reopen technical hardening only if a gate regresses or production compatibility fails;
5. remember that this checkpoint does not represent a GitHub Release or semantic-version tag.
