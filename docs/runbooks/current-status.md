# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-30

## Canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    271
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      271
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
Event Tier 1 review Batch 1          complete — PR #108
Event Tier 1 canonical Batch 1       pending merge — PR #109
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
Primary evidence                         189 / 271
Tier 1 evidence                          207 / 271
Official-domain evidence                 125 / 271
Evidence with archived_url                 0 / 271
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          28 / 183
Events without tier 1 evidence           19 / 183
Terminal unarchived unique URLs          76
Terminal unarchived evidence records     78
Risky-host unarchived unique URLs        92
Risky-host unarchived evidence records   95
X/Twitter evidence records unarchived    32
Unknown URL status                        0
```

Archive-risk ceilings use normalized unique source URLs. Multiple event-scoped evidence records that reuse the same source URL do not create multiple preservation obligations. Raw evidence-record counts remain reported for transparency.

Event Tier 1 Batch 1 adds six event-scoped first-party records:

```text
bir_src_000266  Commons Bridge proxy compromise
bir_src_000267  Syndicate investigation and tracing
bir_src_000268  Ronin validator compromise disclosure
bir_src_000269  Nomad exploit root-cause support
bir_src_000270  Poly Network asset recovery completion
bir_src_000271  Celer compensation commitment
```

The batch reduces event primary gaps from 34 to 28 and event Tier 1 gaps from 25 to 19 without changing event dates, incident amounts, statuses, or historical outcomes.

The production verifier compares every transformed field in all four public datasets with the generated public contract. Same-count and same-ID field drift is a blocking failure.

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: no reviewed first-party incident source and no Tier 1 incident evidence.

Records:

- `docs/audits/phase3-source-quality-baseline-2026-07-29.md`
- `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-quality-batch1-2026-07-29.md`
- `docs/audits/phase3-url-status-remediation-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-url-status-batch1-2026-07-29.md`
- `docs/audits/phase3-event-tier1-review-batch1-2026-07-29.md`
- `docs/audits/phase3-event-tier1-canonical-batch1-2026-07-30.md`

## Latest completed production checkpoint

The latest completed production checkpoint remains the pre-Batch-1 265-evidence state until PR #109 merges and the 271-evidence state passes explicit production verification.

```text
Canonical data PR       #106
Canonical merge         d0e9674745996fc1d85a32710890fa880d8946ad
Production audit PR     #107
Production verify       30457429225
Normal CI               30457429426
Verified state          33 / 34 / 183 / 265
Canonical content match true
Verified HTML routes    72
Verified redirects      74
Generated at            2026-07-29T13:30:13.794Z
Publication attempt     1
```

## Next

1. merge PR #109 after final normal CI;
2. production-verify the full 33 / 34 / 183 / 271 public state;
3. review the remaining 19 event Tier 1 gaps in bounded Batch 2;
4. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
5. begin verified archive captures for the 92 risky-host and 76 terminal unique-URL queues.
