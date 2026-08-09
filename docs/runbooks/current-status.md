# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-08-09

## Canonical and production state

```text
Bridges     33
Incidents   34
Events      183
Evidence    287
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      287
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
Event Primary Remediation 01         production-verified — PRs #207–#209
Event Primary Review 02                complete — PR #211
Event Primary Remediation 02           canonical application in progress
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
Primary evidence                         206 / 287
Tier 1 evidence                          223 / 287
Official-domain evidence                 131 / 287
Evidence with archived_url               130 / 287
Bridges without primary evidence           0 / 33
Bridges without tier 1 evidence            0 / 33
Incidents without primary evidence         1 / 34
Incidents without tier 1 evidence          1 / 34
Events without primary evidence           11 / 183
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

Deferred Archive Retry 01 recovered two sources and Retry 02 recovered one additional source. Across Retries 01–02, three evidence records on three unique URLs were removed from the original reviewed-unresolved inventory, leaving 42 reviewed-but-unarchived evidence records across 29 unique URLs.

Deferred Retry 03 then reviewed ten of the twelve URLs that had not been part of the recent Retry 01/02 scopes. None satisfied the unchanged two-pass exact-replay boundary. Deferred Retry 04 reviewed the final two fresh URLs — `bir_src_000277` and `bir_src_000282` — and also approved none. The not-recently-retried fresh pool is therefore exhausted. The remaining reviewed-unarchived pool consists only of URLs already explicitly retried under the current acceptance boundary.

Event Primary Remediation 01 reviewed the nine non-intentional primary-evidence gaps and approved exactly two bounded remediations:

```text
bir_ev_000002 / bir_src_000003  corrected OFAC Ronin/Lazarus attribution source and primary classification
bir_ev_000011 / bir_src_000014  FBI Horizon attribution source reclassified as claim-relative primary
```

Event Primary Review 02 approved three additional event-scoped first-party copies without adding unique source URLs:

```text
bir_ev_000013  Poly Network first-party source copy
bir_ev_000124  Transit Finance first-party source copy
bir_ev_000125  Transit Finance first-party source copy
```

Four non-intentional reviewed candidates remain deferred pending stronger source-content support:

```text
bir_ev_000014
bir_ev_000143
bir_ev_000144
bir_ev_000148
```

All event Tier 1 gaps remain reviewed. The six intentional secondary-only Tier 1 gaps are:

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

## Latest completed production checkpoint before Remediation 02

```text
Review PR                     #207
Canonical data PR             #208
Canonical merge               1638b47eb3c2e9066d0323d6d5a4abe8aa85cfb2
Production audit PR           #209
Production verify run         31299468964
Production verify job         93209808769
Verified state                33 / 34 / 183 / 284
Events without primary        14 / 183
Canonical content match       true
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-09T06:42:13.747Z
Publication attempt           4 / 20
Build-input refresh           not required
```

Attempts 1–3 correctly rejected stale same-count evidence at `bir_src_000003`. Attempt 4 observed the new generated build and passed complete canonical-derived field-level equality.

## Next

1. production-verify Event Primary Remediation 02, then review the remaining 11 events without primary evidence while preserving intentional secondary-only boundaries;
2. keep intentional secondary-only gaps explicit rather than weakening the evidence standard;
3. strengthen remaining validators;
4. begin review-gated monitoring and candidate collection without automatic canonical publication;
5. continue v1 documentation, accessibility, performance, compatibility, and release hardening;
6. revisit deferred archive failures only after conditions change or new canonical source URLs enter the corpus.
