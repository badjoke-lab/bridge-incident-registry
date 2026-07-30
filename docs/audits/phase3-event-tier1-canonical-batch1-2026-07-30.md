# Phase 3 event Tier 1 canonical Batch 1 — 2026-07-30

Status: canonical migration complete; production verification pending  
Review boundary: PR #108  
Canonical migration: PR #109

## Canonical result

```text
Bridges                         33
Incidents                       34
Events                         183
Evidence                   265 -> 271
Primary evidence          183 -> 189
Tier 1 evidence           201 -> 207
Official-domain evidence  123 -> 125
Incident source mismatches       0
Event source mismatches          0
Unknown URL status               0
```

## Event coverage result

```text
Events without primary evidence  34 -> 28
Events without Tier 1 evidence   25 -> 19
```

## Added evidence

| Evidence | Event | Source |
|---|---|---|
| `bir_src_000266` | `bir_ev_000166` | Event-scoped copy of Syndicate's official Commons Bridge compromise statement |
| `bir_src_000267` | `bir_ev_000169` | Event-scoped copy of the same Syndicate incident-response statement |
| `bir_src_000268` | `bir_ev_000001` | Ronin's first-party validator-compromise community alert |
| `bir_src_000269` | `bir_ev_000007` | Event-scoped copy of Nomad's first-party root-cause analysis |
| `bir_src_000270` | `bir_ev_000015` | Poly Network's first-party asset-recovery-complete notice |
| `bir_src_000271` | `bir_ev_000059` | Celer's first-party DNS-incident and compensation update |

The additions change no event date, incident amount, status, reimbursement result, restart result, or historical outcome. They add event-scoped primary support for claims already present in canonical data.

## Intentional non-remediation

The following reviewed events remain secondary-source records:

- `bir_ev_000012` — Harmony research context;
- `bir_ev_000051` — community-authored Harmony recovery-partner proposal;
- `bir_ev_000006` — Wormhole research context;
- `bir_ev_000009` — Nomad research context.

First-party incident evidence does not establish later research-survey inclusion, and a hosted community proposal is not automatically an adopted operator or governance action.

## Source-count synchronization

Six event counts were incremented by one. Five incident counts were synchronized, with `bir_inc_000034` incremented by two because two Commons events received separate event-scoped evidence records.

```text
bir_inc_000001  6 -> 7
bir_inc_000003  7 -> 8
bir_inc_000005  8 -> 9
bir_inc_000019  4 -> 5
bir_inc_000034  9 -> 11
```

Exact incident and event source-count equality remains mandatory.

## Archive-risk metric correction

Archive risk is now counted by unique source URL rather than evidence-record ID.

An event-scoped evidence copy of an already known URL creates a new claim linkage, not a new URL preservation obligation. The checker therefore:

- deduplicates terminal and risky-host archive queues by normalized source URL;
- retains raw evidence-record counts in its summary for transparency;
- fails when a genuinely new unarchived risky URL appears;
- permits a duplicate event-scoped record that uses an already counted risky URL.

Batch 1 adds two genuinely new exact-host risky URLs, the Poly Network Medium post and Celer X post. The unique risky-host ceiling is therefore explicitly bounded at 92. The terminal unique-URL ceiling remains 76 because the two new Commons records reuse an already counted Syndicate URL.

```text
Archive-risk unit                         unique source URL
Terminal unarchived unique URLs          76
Terminal unarchived evidence records     78
Risky-host unarchived unique URLs        92
Risky-host unarchived evidence records   95
```

## Permanent guards

- canonical and enum validation;
- full-corpus audit;
- exact incident and event source-count equality;
- source-quality no-regression limits;
- controlled primary/Tier 1 regression fixtures;
- unique risky-host URL regression fixture;
- duplicate risky-host URL allowance fixture;
- static build and final-dist consistency;
- full production-content equality after merge.

## Next

1. merge PR #109 after final normal CI;
2. verify the 271-evidence state and all public content in production;
3. review the remaining 19 event Tier 1 gaps in the next bounded batch;
4. begin verified archive capture work for the 92-URL risky-host queue and 76-URL terminal queue.
