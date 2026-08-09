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
PR #205      Deferred Archive Retry 03 review — approved 0
PR #206      Deferred Archive Retry 04 review — approved 0; fresh pool exhausted
PR #207–209  Event Primary Remediation 01 and production verification
PR #211      Event Primary Review 02 — three approved
PR #212      Event Tier 1 controlled-failure fixture strengthening
PR #213      Event Primary Remediation 02 canonical migration
PR #214      Event Primary Remediation 02 production verification
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

Attempts 1–2 correctly rejected the prior 284-evidence production build. Attempt 3 observed the 287-evidence build and complete field-level equality across all four public canonical datasets.

## Permanent guards

```text
npm run audit:source-count
npm run audit:source-count:test
npm run audit:source-quality
npm run audit:source-quality:test
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

## Archive preservation boundary

Archive Capture Batch 18 exhausted the previously-unreviewed terminal/risky-host candidate set. Deferred Retries 03–04 exhausted the fresh reviewed-unresolved retry scope. The remaining reviewed-unarchived pool consists only of URLs already explicitly retried under the established exact-replay, temporal-fit, minimum-size, and two-run reproducibility boundary. Do not immediately recycle those failures.

## Event primary-evidence boundary

Event Primary Remediation 01 reduced event primary gaps from 16 to 14. Event Primary Review 02 approved three event-scoped copies of already-canonical first-party evidence:

```text
bir_ev_000013  Poly Network
bir_ev_000124  Transit Finance
bir_ev_000125  Transit Finance
```

PR #213 applied those additions without increasing unique archive-risk queues, and PR #214 verified their live publication. The ceiling is now `events_without_primary = 11`.

Four non-intentional reviewed candidates remain deferred pending stronger first-party material:

```text
bir_ev_000014
bir_ev_000143
bir_ev_000144
bir_ev_000148
```

Six Tier 1 gaps are intentional secondary-only records, and `bir_ev_000150` remains intentionally non-primary because its PeckShield evidence is a direct security-monitoring observation rather than an operator statement. These are reviewed boundaries, not unresolved validator defects.

## Cloudflare Pages boundary

The project uses production branch `main`, production deployments enabled, and `preview_deployment_setting: none`. A behavior-neutral build-input refresh may be used once when publication remains stale, but a changed `generated_at` without field-level canonical equality is still failed publication. Never stack a second refresh automatically.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary suitable for a reviewed `incident_case`.

## Next

1. strengthen validators where remaining corpus-shape assumptions can be made explicit;
2. begin Phase 5 review-gated monitoring and candidate collection without automatic publication;
3. preserve the four deferred event-primary gaps as research backlog items until stronger first-party sources appear;
4. continue v1 hardening;
5. revisit deferred archive failures only after conditions change or new canonical source URLs appear.
