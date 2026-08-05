# BIR Live Recovery Checkpoint

Status: active  
Updated: 2026-08-05

GitHub state and canonical JSON are authoritative. Completed merge SHAs are checkpoints, not live branch pointers.

## Canonical and production counts

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

## Latest completed checkpoints

```text
PR #100      Source-quality baseline and no-regression gate
PR #103–107  LI.FI and Holograph source-quality remediation
PR #108–116  Event Tier 1 review, canonical remediation, and production verification
PR #117      Nerve Bridge source boundary
PR #118–160  Archive Capture Batches 1–12 review, canonical, deployment, and production verification
PR #173      Archive Capture Batch 13 review
PR #174      Archive Capture Batch 13 canonical migration
PR #175      Archive Capture Batch 13 build-input refresh
PR #176      Archive Capture Batch 13 production verification and checkpoint sync
```

## Latest completed production checkpoint

```text
Review PR                     #173
Review merge                  fba6c668207ba1fb2613840df81123a54da5b669
Canonical data PR             #174
Canonical merge               ab0b45fb1f1cbe6cdddd1238c37fb99f201c934f
Build-input refresh PR        #175
Build-input refresh           15472395efdb4435380dbd0fdae8c7fe71e54b06
Production audit PR           #176
Initial production run        30970204138
Initial failed job            92192668199
Production verify run         30970746866
Production verify job         92194294438
Verified state                33 / 34 / 183 / 284
Archived evidence             94 / 284
Canonical content match       true
HTML routes                   72
Redirects                     74
Generated at                  2026-08-05T03:00:56.755Z
Publication attempt           20 after one build-input refresh
```

The initial verifier rejected `bir_src_000248` for all twenty attempts while `generated_at` stayed `2026-08-05T02:37:38.915Z`. PR #175 introduced one behavior-neutral build-input refresh. The unchanged rerun continued to observe the old build through attempt 19 and switched to `generated_at 2026-08-05T03:00:56.755Z` on attempt 20. Complete public-content equality then passed. No second refresh was committed.

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
Events without primary               16
Events without Tier 1                 6
Unreviewed event Tier 1 gaps           0
Evidence with archived_url           94
Terminal unarchived unique URLs      36
Terminal unarchived records          49
Risky-host unarchived unique URLs    27
Risky-host unarchived records        42
X/Twitter records unarchived         30
Unknown URL status                    0
```

## Archive Capture Batch 13

```text
Review boundary                    PR #173
Canonical migration                PR #174
Build-input refresh                PR #175
Production audit                   PR #176
Reviewed unique URLs                    10
Verified Wayback URLs                    3
Evidence records updated                 3
Terminal unique queue           36 -> 36
Terminal record queue           49 -> 49
Risky-host unique queue         29 -> 27
Risky-host record queue         45 -> 42
X/Twitter record queue          32 -> 30
Source-count drift                      0
```

Updated evidence IDs:

```text
bir_src_000248
bir_src_000275
bir_src_000278
```

Only the exact reviewed SlowMist, SOCKET, and Transit Finance snapshots were added. Source URLs, historical claims, source hierarchy, reliability, dates, and linkages remain unchanged.

The first canonical attempt used a provisional risky-host ceiling of 26. The permanent validator observed 27 because SlowMist Medium is not part of the risky-host host set; the attempt failed before commit. The corrected run passed all checks and removed its temporary write code.

Holograph and Unizen remained below the replay-size boundary. Taiko, Syndicate Commons, and Everclear returned no accepted exact capture. They remain deferred.

## Deployment resume rule

A docs-only commit is not assumed to start a Cloudflare Pages build. A reviewed behavior-neutral build-input change may be used once when publication remains stale. When an immediate or in-window rerun still shows the same `generated_at`, do not stack another refresh automatically. Allow deployment latency and keep the full-content equality requirement unchanged.

## Nerve boundary

PR #117 completed the first-party source search for `bir_inc_000026`. The remaining incident primary and Tier 1 gap is intentional. Current-operation pages and Tier 2 security analysis must not be repurposed or reclassified.

## Boltz monitoring boundary

Issue #171 remains open as a monitoring signal. Boltz is not canonical because the available first-party material does not identify one discrete bridge incident boundary, affected route, technical cause, or postmortem suitable for a reviewed `incident_case`.

## Next

1. continue bounded archive work from 27 risky-host and 36 terminal unique URLs;
2. retry deferred official sources under the same replay and temporal-fit standards;
3. reduce remaining event primary gaps where justified;
4. strengthen validators;
5. begin review-gated monitoring and candidate collection without automatic publication;
6. continue v1 hardening.
