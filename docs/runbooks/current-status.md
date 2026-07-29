# Current Status — Bridge Incident Registry

Status: active  
Updated: 2026-07-29

## Canonical state

```text
Bridges     33
Incidents   34
Events      183
Evidence    265
```

Canonical source files:

```text
data/bridges.json       33
data/incidents.json     34
data/events.json        183
data/evidence.json      265
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
Primary evidence                         183 / 265
Tier 1 evidence                          201 / 265
Official-domain evidence                 123 / 265
Evidence with archived_url                 0 / 265
Bridges without primary evidence          0 / 33
Bridges without tier 1 evidence           0 / 33
Incidents without primary evidence        1 / 34
Incidents without tier 1 evidence         1 / 34
Events without primary evidence          34 / 183
Events without tier 1 evidence           25 / 183
Terminal evidence without archive        76
Risky-host evidence without archive      90
X/Twitter evidence without archive       29
```

URL-status Batch 1 normalized the Holograph official incident post from the legacy `twitter.com` route to the canonical `x.com` route for `bir_src_000112` and `bir_src_000239`. Both records remain Tier 1 primary evidence and are published as `live`.

The production verifier now compares every transformed field in all four public datasets with the generated public contract. Same-count and same-ID field drift is a blocking failure.

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: no reviewed first-party incident source and no Tier 1 incident evidence.

Records:

- `docs/audits/phase3-source-quality-baseline-2026-07-29.md`
- `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-quality-batch1-2026-07-29.md`
- `docs/audits/phase3-url-status-remediation-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-url-status-batch1-2026-07-29.md`

## Latest completed production checkpoint

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

1. inventory and remediate the 25 event Tier 1 gaps in bounded batches;
2. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
3. begin archive coverage for terminal and risky-host evidence;
4. strengthen remaining validators and proceed to monitoring, candidate collection, and v1 hardening.
