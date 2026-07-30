# Phase 3 event Tier 1 canonical Batch 2 — 2026-07-30

Status: canonical migration complete; production verification pending  
Review boundary: PR #111  
Canonical migration: PR #112

## Canonical result

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                   271 -> 279
Primary evidence          189 -> 197
Tier 1 evidence           207 -> 215
Official-domain evidence  125 -> 127
Incident source mismatches       0
Event source mismatches          0
Unknown URL status               0
```

## Event coverage result

```text
Events without primary evidence  28 -> 20
Events without Tier 1 evidence   19 -> 11
```

## Added evidence

| Evidence | Event | Source |
|---|---|---|
| `bir_src_000272` | `bir_ev_000139` | Event-scoped copy of Rubic's official incident announcement |
| `bir_src_000273` | `bir_ev_000151` | Event-scoped copy of Taiko's official incident statement |
| `bir_src_000274` | `bir_ev_000060` | Event-scoped copy of Celer's frontend-restoration update |
| `bir_src_000275` | `bir_ev_000064` | SOCKET official 1,032 ETH recovery update |
| `bir_src_000276` | `bir_ev_000084` | Event-scoped copy of Synapse's first-party postmortem |
| `bir_src_000277` | `bir_ev_000093` | Holograph official postmortem announcement |
| `bir_src_000278` | `bir_ev_000126` | Transit Finance official approximately-70-percent return update |
| `bir_src_000279` | `bir_ev_000127` | Transit Finance official later recovery and reimbursement update |

The additions change no event date, incident amount, status, reimbursement result, restart result, or historical outcome. They add event-scoped primary support for claims already present in canonical data.

## Intentional non-remediation

The two Nerve events reviewed in Batch 2 remain Tier 2:

- `bir_ev_000087` — Nerve Bridge metapools exploited;
- `bir_ev_000088` — BlockSec published Nerve Bridge root-cause analysis.

No reviewed first-party Nerve incident statement was found. BlockSec and Halborn remain security-firm analytical sources under the established hierarchy and are not reclassified to improve coverage metrics.

Together with the four intentional secondary events retained from Batch 1, six of the 11 remaining Tier 1 gaps are explicitly documented. Five events remain unreviewed.

## Source-count synchronization

Eight event counts were incremented by one across seven incidents. The Transit incident received two new event-scoped records.

Exact incident and event source-count equality remains mandatory and passes at zero mismatches.

## Archive-risk result

Four additions reuse already counted risky-host URLs. Four introduce new unique URLs: SOCKET X, Holograph X, Transit X, and Transit Medium.

```text
Archive-risk unit                          unique source URL
Risky-host matching                        exact host or subdomain
Terminal unarchived unique URLs           59
Terminal unarchived evidence records      78
Risky-host unarchived unique URLs    83 -> 87
Risky-host unarchived evidence records   123 -> 131
```

The terminal queue is unchanged because every target bridge remains active or inactive rather than terminal under the checker definition.

## Permanent guards

- canonical and enum validation;
- full-corpus audit;
- exact incident and event source-count equality;
- event primary-gap ceiling at 20;
- event Tier 1-gap ceiling at 11;
- unique risky-host URL ceiling at 87;
- controlled primary/Tier 1 and unique-risk regression fixtures;
- static build and final-dist consistency;
- full production-content equality after merge.

## Next

1. merge PR #112 after final normal CI;
2. verify the 279-evidence state and all public content in production;
3. review the final five unreviewed event Tier 1 gaps;
4. begin verified archive capture work for the 87 risky-host and 59 terminal unique-URL queues.
