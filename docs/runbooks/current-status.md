# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-05

## Canonical and production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    284
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      284
```

## Phase 3 quality strengthening

```text
Full-corpus audit                    complete — PR #71
Aftermath and restart normalization  complete — PRs #72–#77
Source-count remediation             complete — PRs #78–#99
Hard source-count equality gate      active
Source-quality baseline              complete — PR #100
Source-quality no-regression gate    active
Source-quality remediation           complete — PRs #103–#107
Event Tier 1 remediation             production-verified — PRs #108–#116
Nerve source boundary                reviewed — PR #117
Archive capture Batch 1              production-verified — PRs #118–#120
Archive capture Batch 2              production-verified — PRs #122–#125
Archive capture Batch 3              production-verified — PRs #126–#128
Archive capture Batch 4              production-verified — PRs #129–#131
Archive capture Batch 5              production-verified — PRs #132–#134
Archive capture Batch 6              production-verified — PRs #135–#138
Archive capture Batch 7              production-verified — PRs #139–#141
Archive capture Batch 8              production-verified — PRs #142–#144
Archive capture Batch 9              production-verified — PRs #145–#147
Archive capture Batch 10             production-verified — PRs #148–#151
Archive capture Batch 11             production-verified — PRs #152–#156
Archive capture Batch 12             production-verified — PRs #157–#160
Archive capture Batch 13             production-verified — PRs #173–#176
Archive capture Batch 14             production-verified — PRs #177–#180
Archive capture Batch 15             production-verified — PRs #181, #182, #184, #185
Unknown URL-status hard ceiling      active at 0
Full production-content equality     active
```

## Exact source-count and URL state

```text
Incident mismatches  0
Event mismatches     0
Unknown URL status   0
```

## Source-quality state

```text
Primary evidence                         201 / 284
Tier 1 evidence                          220 / 284
Official-domain evidence                 131 / 284
Evidence with archived_url               110 / 284
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          16 / 183
Events without tier 1 evidence             6 / 183
Unreviewed event Tier 1 gaps               0
Terminal unarchived unique URLs          28
Terminal unarchived evidence records     38
Risky-host unarchived unique URLs        21
Risky-host unarchived evidence records   35
X/Twitter evidence records unarchived    30
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse one source URL create one preservation obligation.

Archive Capture Batch 15 reviewed ten previously unreviewed exact canonical source URLs. Seven reproducible mappings were approved and published to nine records covering Elliptic, BNB Chain, SlowMist, the FBI, and Dcentralab. The permanent validator confirmed 110 archived evidence records, 28 terminal unique URLs, and 21 risky-host unique URLs.

Aurora returned no accepted replay. One QuillAudits source remained unavailable and another passed only the second run, so both were deferred. No wildcard, guessed, short, failed, temporally incompatible, or non-reproducible capture was accepted.

Repeated full-content verifiers rejected stale same-count evidence at `bir_src_000014`. Cloudflare Pages was configured to build previews for every temporary branch, creating a queue ahead of production. The account-level remediation set previews to `none`, deleted 16 queued previews, preserved all production deployments, and allowed the Batch 15 canonical deployment to complete. The unchanged verifier then passed on attempt 1 at `generated_at 2026-08-05T08:02:41.108Z`.

All event Tier 1 gaps are reviewed. The six remaining gaps are intentional secondary records:

```text
bir_ev_000006
bir_ev_000009
bir_ev_000012
bir_ev_000051
bir_ev_000087
bir_ev_000088
```

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit. PR #117 records the completed first-party research boundary; no stable incident-specific primary source was located and the gap remains intentional.

## Latest completed production checkpoint

```text
Review PR                     #181
Review merge                  fcf932b51445831e1d67c3c14c3ee342eff854dc
Canonical data PR             #182
Canonical merge               39134a5d7b717c467a49d96b5fd7104047cd0a50
Build-input refresh PR        #184
Build-input refresh           7e13955c725e07ca66e01f7f9e321db7f7c764ff
Production audit PR           #185
Initial production run        30983843765
Cloudflare remediation run    30987353553
Cloudflare remediation job    92245106402
Production verify run         30986003440
Production verify job         92245512645
Verified state                33 / 34 / 183 / 284
Archived evidence             110 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-05T08:02:41.108Z
Publication attempt           1 after preview-queue remediation
```

## Next

1. continue bounded archive capture work from 21 risky-host and 28 terminal unique URLs;
2. retry deferred official-source candidates without weakening replay or temporal-fit requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 documentation, accessibility, performance, and release hardening.
