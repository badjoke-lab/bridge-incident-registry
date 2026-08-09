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
PR #211      Event Primary Review 02 — three approved
PR #212      Event Tier 1 controlled-failure fixture strengthening
PR #213–214  Event Primary Remediation 02 and production verification
PR #217      Review-gated Phase 5 monitoring foundation
PR #218      Cross-record bridge-integrity validation
PR #223      Initial live monitoring state / Issue #171 dedupe seed
PR #225      Pending monitoring review-branch fallback and duplicate-work guard
PR #226      Bounded evidence-health watch
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
HTML routes                   72
Redirects                     74
Generated at                  2026-08-09T07:08:45.362Z
Publication attempt           3 / 20
Build-input refresh           not required
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
Terminal unarchived records          25
Risky-host unarchived unique URLs    16
Risky-host unarchived records        30
X/Twitter records unarchived         29
Unknown URL status                    0
```

## Archive and primary-evidence boundaries

Archive Capture Batch 18 and Deferred Retries 03–04 exhausted the fresh archive-review scope under the existing acceptance boundary. Do not immediately recycle failures.

Event-primary remediation has reached a reviewed boundary. Four non-intentional candidates remain deferred pending stronger first-party evidence:

```text
bir_ev_000014
bir_ev_000143
bir_ev_000144
bir_ev_000148
```

Six Tier 1 gaps are intentional secondary-only records, and `bir_ev_000150` remains intentionally non-primary direct security monitoring. Further remediation is research-triggered, not metric-driven.

## Phase 5 monitoring boundary

Phase 5 is active.

The monitoring system:

- fingerprints all four canonical JSON files before and after execution;
- fails on canonical mutation, unknown URL status, or broken canonical references;
- writes only review artifacts under `data-staging/monitoring/**` and `data-staging/watchlists/auto/**`;
- dedupes unchanged signals by stable fingerprints;
- refuses duplicate scheduled work when an open monitoring PR or unmerged `auto/monitoring/*` review branch already exists;
- never publishes canonical data.

Live proofs:

```text
Issue-monitor run              31301301277
Issue #171 initial candidate   Boltz — B / hold
State PR                       #223
Unchanged rerun                has_changes=false, no new branch
Evidence-health run            31301765004 / 93215576787
Live evidence URLs             287
Selected URLs                   12
Two-pass probes                 24
Hard 404/410 findings            0
Canonical diff                  none
Job result                      success
```

Evidence health only emits a hard degradation finding after two independent 404/410 results. `401/403/405/429`, 5xx, timeout, and mixed probes are treated as blocking/transient/insufficient rather than dead-link proof. A finding remains review-only.

Repository Actions settings currently disallow `GITHUB_TOKEN` pull-request creation. The workflow handles only that known permission error non-fatally after pushing a validated review branch. The pending branch itself blocks duplicate scheduled work. A connected GitHub app/operator can open the PR. Other PR-creation errors remain fatal.

## Cloudflare Pages boundary

The project uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. A behavior-neutral build-input refresh may be used once when publication remains stale, but a changed `generated_at` without field-level canonical equality is still failed publication. Never stack a second refresh automatically.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary suitable for a reviewed `incident_case`.

## Next

1. implement external bridge/protocol candidate discovery as the next review-only Phase 5 adapter;
2. add closure/pause/hack/regulatory news signals after candidate discovery stabilizes;
3. add active bridge/domain and site/SEO monitoring incrementally;
4. continue v1 hardening;
5. revisit deferred source/archive gaps only when new evidence or changed conditions justify it.
