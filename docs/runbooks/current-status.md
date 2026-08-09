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
Archive capture Batches 1–18         production-verified — PRs #118–#198
Previously-unreviewed archive queue  exhausted
Deferred Archive Retry 01            production-verified — PRs #199–#201
Deferred Archive Retry 02            production-verified — PRs #202–#204
Deferred Archive Retry 03            review complete — PR #205, approved 0
Deferred Archive Retry 04            review complete — PR #206, approved 0
Fresh deferred retry pool            exhausted
Unknown URL-status hard ceiling      active at 0
Full production-content equality     active
```

## Public UI/support follow-up

```text
PR #183  Representative desktop/mobile screenshot audit
PR #186  Incident discovery, filters, pagination, detail TOCs, support, and project navigation
PR #187  Shared BadJoke-Lab support-wallet presentation
```

Cloudflare Pages preview deployment remains `none`.

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
Evidence with archived_url               127 / 284
Bridges without primary evidence           0 / 33
Bridges without tier 1 evidence            0 / 33
Incidents without primary evidence         1 / 34
Incidents without tier 1 evidence          1 / 34
Events without primary evidence           16 / 183
Events without tier 1 evidence              6 / 183
Unreviewed event Tier 1 gaps                0
Terminal unarchived unique URLs           15
Terminal unarchived evidence records      25
Risky-host unarchived unique URLs         16
Risky-host unarchived evidence records    30
X/Twitter evidence records unarchived     29
Unknown URL status                         0
```

Archive Capture Batch 18 exhausted the previously-unreviewed archive candidate set. A repository-derived inventory then found 45 reviewed-but-unarchived evidence records across 32 unique URLs.

Deferred Archive Retry 01 selected ten higher-value reviewed unresolved URLs and recovered two sources:

```text
bir_src_000037  Qubit — Our Compensation Plan 1
bir_src_000068  Harmony — Summary of the Horizon Bridge Incident
```

Deferred Archive Retry 02 selected a different ten-URL scope and recovered one source:

```text
bir_src_000166  QuillAudits — Decoding Rubic Exchange Exploit
```

Across Retries 01–02, three evidence records on three unique URLs were removed from the original reviewed-unresolved inventory, leaving 42 reviewed-but-unarchived evidence records across 29 unique URLs.

Deferred Retry 03 then reviewed ten of the twelve URLs that had not been part of the recent Retry 01/02 scopes. None satisfied the unchanged two-pass exact-replay boundary. Deferred Retry 04 reviewed the final two fresh URLs — `bir_src_000277` and `bir_src_000282` — and also approved none. The not-recently-retried fresh pool is therefore exhausted. The remaining reviewed-unarchived pool consists only of URLs already explicitly retried under the current acceptance boundary.

The canonical migration in PR #203 remains the latest archive publication. It raised archived evidence from 126 to 127 and reduced risky-host unique URLs from 17 to 16. Terminal unique URLs remain 15.

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
Review PR                     #202
Review merge                  e77695ddf0523533ad785a44e797480daa8d400a
Canonical data PR             #203
Canonical merge               46b6e19700d8553c75c4555549b9ca308cbc7292
Production audit PR           #204
Production verify run         31298305603
Production verify job         93206834594
Verified state                33 / 34 / 183 / 284
Archived evidence             127 / 284
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-09T06:10:37.053Z
Publication attempt           1 / 20
Build-input refresh           not required
```

The production verifier confirmed the exact `bir_src_000166.archived_url` mapping and complete field-level equality across all four public canonical datasets on the first attempt.

## Next

1. reduce the remaining 16 events without primary evidence where justified and keep intentional secondary-only gaps explicit;
2. strengthen remaining validators;
3. begin review-gated monitoring and candidate collection without automatic canonical publication;
4. continue v1 documentation, accessibility, performance, compatibility, and release hardening;
5. revisit deferred archive failures only after conditions change or new canonical source URLs enter the corpus.
