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

## Phase 2 record expansion

```text
Batch 1    complete
Batch 2    complete
Batch 3    complete
Batch 4    complete
Batch 5    complete
Batch 6A   merged and production-verified
Batch 6B   merged and production-verified
Batch 7    merged and production-verified
```

## Phase 3 quality strengthening

```text
Full-corpus audit                    merged — PR #71
Aftermath and restart normalization  merged — PRs #72–#77
Source-count contract                merged — PR #78
Safe source-count normalization      merged — PRs #79–#80
Source-count remediation Batch 1     complete — PRs #81–#83
Source-count remediation Batch 2     complete — PRs #84–#88
Source-count remediation Batch 3     complete — PRs #89–#92
Source-count remediation Batch 4     complete — PRs #93–#95
Final source-count migration         complete — PRs #96–#99
Hard source-count equality gate      active
Source-quality baseline              complete — PR #100
Source-quality no-regression gate    active
Source-quality remediation Batch 1   complete — PRs #103–#105
Batch 1 production publication       verified — run 30454087470
```

## Exact source-count state

```text
Incident mismatches  0
Event mismatches     0
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
Unknown URL status                        2
```

Batch 1 resolved the LI.FI 2022 incident primary-source gap with LI.FI's first-party postmortem. The incident records completed operator-funded reimbursement of all 29 affected wallets, while attacker-fund recovery remains `none`.

Remaining incident-level gap:

- `bir_inc_000026` — Nerve Bridge 2021 metapool exploit: no reviewed first-party incident source and no Tier 1 incident evidence.

Records:

- `docs/audits/phase3-source-quality-baseline-2026-07-29.md`
- `docs/audits/phase3-source-quality-remediation-batch1-2026-07-29.md`
- `docs/audits/production-deployment-retrigger-source-quality-batch1-2026-07-29.md`
- `docs/audits/production-verification-phase3-source-quality-batch1-2026-07-29.md`

## Latest completed production checkpoint

```text
Canonical data PR      #103
Canonical merge        cbff8411ee7f0bde4d4cd13624166502bded7fdc
Deployment retrigger   8ed1cd13292eefe524609c5f2db8578d58a07bee
Production verify      30454087470
Canonical normal CI    30453868882
Verified state         33 / 34 / 183 / 265
Verified HTML routes   72
Verified redirects     74
Generated at           2026-07-29T13:06:10.965Z
Publication attempt    1
```

The first production-verification attempt correctly failed at the previous 263-evidence deployment. A docs-only main push retriggered Cloudflare Pages, and the unchanged verifier passed on attempt 1.

## Next

1. identify and resolve the two evidence records with unknown URL status;
2. continue Nerve Bridge primary/Tier 1 research without weakening source hierarchy;
3. remediate the 25 event Tier 1 gaps in bounded batches;
4. archive terminal and risky-host evidence, beginning with the 132-item priority queue;
5. strengthen remaining validators and proceed to monitoring, candidate collection, and v1 hardening.
