# Phase 3 final event Tier 1 canonical migration — 2026-07-30

Status: canonical migration complete; production verification pending  
Review boundary: PR #114  
Canonical migration: PR #115

## Canonical result

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                   279 -> 284
Primary evidence          197 -> 201
Tier 1 evidence           215 -> 220
Official-domain evidence  127 -> 131
Incident source mismatches       0
Event source mismatches          0
Unknown URL status               0
```

## Event coverage result

```text
Events without primary evidence  20 -> 16
Events without Tier 1 evidence   11 -> 6
Unreviewed Tier 1 gaps             5 -> 0
```

## Added evidence

| Evidence | Event | Source |
|---|---|---|
| `bir_src_000280` | `bir_ev_000136` | Event-scoped copy of Rubic's official weekly report |
| `bir_src_000281` | `bir_ev_000146` | Event-scoped copy of Unizen's official reimbursement announcement |
| `bir_src_000282` | `bir_ev_000150` | PeckShieldAlert direct on-chain observation of the Tornado Cash transfer |
| `bir_src_000283` | `bir_ev_000156` | Event-scoped copy of Taiko's official bridge-reopening statement |
| `bir_src_000284` | `bir_ev_000164` | Event-scoped copy of Everclear's official wind-down announcement |

Four additions are first-party primary evidence. `bir_src_000282` is Tier 1 non-primary blockchain-analytics evidence. No existing source is reclassified.

## Source-count synchronization

Five event counts were incremented. Three incident records were synchronized:

```text
bir_inc_000030  +1
bir_inc_000032  +2
bir_inc_000033  +1
```

The Everclear shutdown event has no incident linkage. Exact incident and event source-count equality remains mandatory and passes at zero mismatches.

## Final Tier 1 gap classification

All event Tier 1 gaps have now been reviewed. The six remaining gaps are intentionally secondary records:

```text
bir_ev_000006  Wormhole research context
bir_ev_000009  Nomad research context
bir_ev_000012  Harmony research context
bir_ev_000051  Harmony community recovery-partner proposal
bir_ev_000087  Nerve exploit without reviewed operator source
bir_ev_000088  BlockSec root-cause-analysis publication
```

They are not candidates for automatic metric closure. Research inclusion, community proposals, and security-firm analytical publication cannot be established by unrelated first-party lifecycle evidence or source-tier reclassification.

## Archive-risk result

Four additions reuse existing risky-host URLs. The new PeckShieldAlert X post creates one new unique preservation obligation.

```text
Archive-risk unit                          unique source URL
Risky-host matching                        exact host or subdomain
Terminal unarchived unique URLs           59
Terminal unarchived evidence records  78 -> 79
Risky-host unarchived unique URLs     87 -> 88
Risky-host unarchived evidence records 131 -> 136
```

## Permanent guards

- canonical and enum validation;
- full-corpus audit;
- exact incident and event source-count equality;
- event primary-gap ceiling at 16;
- event Tier 1-gap ceiling at 6;
- unique risky-host URL ceiling at 88;
- unknown URL status ceiling at 0;
- controlled primary, Tier 1, unique-risk, and duplicate-URL fixtures;
- static build and final-dist consistency;
- full production-content equality after merge.

## Next

1. merge PR #115 after final normal CI;
2. verify the 284-evidence state and all public content in production;
3. continue Nerve Bridge first-party research without weakening source hierarchy;
4. begin verified archive capture work for the 88 risky-host and 59 terminal unique-URL queues.
