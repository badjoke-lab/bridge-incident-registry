# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-09

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
Archive capture Batch 16             production-verified — PRs #188–#190
Unknown URL-status hard ceiling      active at 0
Full production-content equality     active
```

## Public UI/support follow-up

```text
PR #183  Representative desktop/mobile screenshot audit
PR #186  Incident discovery, filters, pagination, detail TOCs, support, and project navigation
PR #187  Shared BadJoke-Lab support-wallet presentation
```

These changes did not alter canonical record counts. Cloudflare Pages preview deployment remains `none`.

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
Evidence with archived_url               116 / 284
Bridges without primary evidence           0 / 33
Bridges without tier 1 evidence            0 / 33
Incidents without primary evidence         1 / 34
Incidents without tier 1 evidence          1 / 34
Events without primary evidence           16 / 183
Events without tier 1 evidence              6 / 183
Unreviewed event Tier 1 gaps                0
Terminal unarchived unique URLs           25
Terminal unarchived evidence records      35
Risky-host unarchived unique URLs         18
Risky-host unarchived evidence records    32
X/Twitter evidence records unarchived     29
Unknown URL status                         0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple evidence records that reuse one source URL create one preservation obligation.

Archive Capture Batch 16 reviewed ten previously unreviewed exact canonical source URLs. Six mappings reproduced identically in both independent review passes and were published to six evidence records covering Harmony, Multichain, Rubic, and Unizen sources. The permanent validator confirmed 116 archived evidence records, 25 terminal unique URLs, and 18 risky-host unique URLs.

Reuters Harmony, the ShuttleFlow Conflux forum announcement, a SOCKET X update, and a Unizen CTO Twitter update did not satisfy the unchanged reproducible exact-replay boundary and remain deferred.

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
Review PR                     #188
Review merge                  76b437e39b60721cab816544a10d2b75c12d1543
Canonical data PR             #189
Canonical merge               f9c6395d400358543bb3a761aa209be97ca1c266
Production audit PR           #190
Production verify run         31264440303
Production verify job         93120202656
Verified state                33 / 34 / 183 / 284
Archived evidence             116 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-08T15:23:20.361Z
Publication attempt           1
Build-input refresh           not required
```

Production had already converged when the unchanged verifier started. Attempt 1 matched all four canonical-derived public datasets completely and passed all route, metadata, sitemap, robots, redirect, content-type, and cache assertions.

## Next

1. continue bounded archive capture work from 18 risky-host and 25 terminal unique URLs as Batch 17;
2. retry deferred official-source candidates without weakening replay or temporal-fit requirements;
3. reduce the remaining 16 events without primary evidence where justified;
4. strengthen remaining validators;
5. begin review-gated monitoring and candidate collection without automatic canonical publication;
6. continue v1 documentation, accessibility, performance, compatibility, and release hardening.
