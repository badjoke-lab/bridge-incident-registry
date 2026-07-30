# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-30

## Canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    279
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      279
```

## Phase 3 quality strengthening

```text
Full-corpus audit                    complete — PR #71
Aftermath and restart normalization  complete — PRs #72–#77
Source-count remediation             complete — PRs #78–#99
Hard source-count equality gate      active
Source-quality baseline              complete — PR #100
Source-quality no-regression gate    active
Source-quality remediation Batch 1   complete — PRs #103–#105
URL-status remediation Batch 1       complete — PRs #106–#107
Event Tier 1 Batch 1                 production-verified — PRs #108–#110
Event Tier 1 review Batch 2          complete — PR #111
Event Tier 1 canonical Batch 2       pending merge — PR #112
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
Primary evidence                         197 / 279
Tier 1 evidence                          215 / 279
Official-domain evidence                 127 / 279
Evidence with archived_url                 0 / 279
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          20 / 183
Events without tier 1 evidence           11 / 183
Terminal unarchived unique URLs          59
Terminal unarchived evidence records     78
Risky-host unarchived unique URLs        87
Risky-host unarchived evidence records  131
X/Twitter evidence records unarchived    38
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs and exact-or-subdomain host matching. Multiple event-scoped evidence records that reuse the same source URL do not create multiple preservation obligations.

Event Tier 1 Batch 2 adds:

```text
bir_src_000272  Rubic exploit
bir_src_000273  Taiko forged bridge messages
bir_src_000274  Celer frontend restoration
bir_src_000275  SOCKET 1,032 ETH recovery
bir_src_000276  Synapse blocked malicious transfer
bir_src_000277  Holograph former-contractor attribution
bir_src_000278  Transit approximately 70% return
bir_src_000279  Transit later returned-funds batch
```

The batch reduces event primary gaps from 28 to 20 and event Tier 1 gaps from 19 to 11 without changing event dates, incident amounts, statuses, or historical outcomes.

Six of the 11 remaining Tier 1 gaps are intentional secondary events. Five remain unreviewed:

```text
bir_ev_000136
bir_ev_000146
bir_ev_000150
bir_ev_000156
bir_ev_000164
```

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: no reviewed first-party incident source and no Tier 1 incident evidence.

Records:

- `docs/audits/phase3-event-tier1-review-batch1-2026-07-29.md`
- `docs/audits/phase3-event-tier1-canonical-batch1-2026-07-30.md`
- `docs/audits/production-verification-phase3-event-tier1-batch1-2026-07-30.md`
- `docs/audits/phase3-event-tier1-review-batch2-2026-07-30.md`
- `docs/audits/phase3-event-tier1-canonical-batch2-2026-07-30.md`

## Latest completed production checkpoint

The latest completed production checkpoint remains the 271-evidence state until PR #112 merges and the 279-evidence state passes explicit production verification.

```text
Canonical data PR       #109
Canonical merge         da066fb29b5b45f6c8602ef36becf6536bfe6a29
Production audit PR     #110
Production verify       30540271827
Canonical normal CI     30540042953
Production-PR normal CI 30540776235
Verified state          33 / 34 / 183 / 271
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-07-30T11:53:51.220Z
Publication attempt     6
```

## Next

1. merge PR #112 after final normal CI;
2. production-verify the full 33 / 34 / 183 / 279 public state;
3. review the final five unreviewed event Tier 1 gaps;
4. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
5. begin verified archive captures for the 87 risky-host and 59 terminal unique-URL queues.
