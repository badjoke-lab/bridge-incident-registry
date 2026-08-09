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
Event Primary Review 02              complete — PR #211
Event Tier 1 fixture strengthening   complete — PR #212
Event Primary Remediation 02         production-verified — PRs #213–#214
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

Archive Capture Batch 18 exhausted the previously-unreviewed archive candidate set. Deferred Retries 03–04 exhausted the fresh reviewed-unresolved retry pool without weakening acceptance rules.

Event Primary Remediation 01 reduced event primary gaps from 16 to 14. Event Primary Review 02 then approved three event-scoped first-party copies using already-canonical, already-archived Poly Network and Transit Finance source URLs. PR #213 applied those records and PR #214 production-verified them, reducing event primary gaps to 11 without increasing unique archive-risk queues.

Four non-intentional reviewed candidates remain deferred pending stronger source-content support:

```text
bir_ev_000014
bir_ev_000143
bir_ev_000144
bir_ev_000148
```

The six intentional secondary-only Tier 1 gaps remain:

```text
bir_ev_000006
bir_ev_000009
bir_ev_000012
bir_ev_000051
bir_ev_000087
bir_ev_000088
```

`bir_ev_000150` remains intentionally non-primary because its PeckShield evidence is a direct security-monitoring observation rather than an operator statement.

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit. PR #117 records the completed first-party research boundary; no stable incident-specific primary source was located and the gap remains intentional.

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
Verified HTML routes          72
Verified redirects            74
Generated at                  2026-08-09T07:08:45.362Z
Publication attempt           3 / 20
Build-input refresh           not required
```

Attempts 1–2 correctly rejected the prior 284-evidence production build. Attempt 3 observed the new 287-evidence build and passed complete canonical-derived field-level equality.

## Next

1. strengthen remaining validators and controlled-failure fixtures where corpus-shape assumptions remain;
2. begin Phase 5 review-gated monitoring and candidate collection without automatic canonical publication;
3. keep the four deferred non-intentional primary gaps on a research backlog until stronger first-party evidence appears;
4. maintain public-contract and UI compatibility checks;
5. continue v1 documentation, accessibility, performance, compatibility, and release hardening;
6. revisit deferred archive failures only after conditions change or new canonical source URLs enter the corpus.
