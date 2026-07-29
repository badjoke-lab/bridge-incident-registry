# Phase 3 final source-count canonical migration — 2026-07-29

Status: implemented on canonical migration branch  
Review boundary: PR #96  
Baseline: 33 bridges / 34 incidents / 183 events / 256 evidence

## Canonical result

```text
Bridges                          33
Incidents                        34
Events                          183
Evidence                        263
Event source-count mismatches     0
Incident source-count mismatches  0
```

## Added evidence links

```text
bir_src_000257 -> bir_ev_000154 from bir_src_000182
bir_src_000258 -> bir_ev_000155 from bir_src_000183
bir_src_000259 -> bir_ev_000158 from bir_src_000183
bir_src_000260 -> bir_ev_000159 from bir_src_000189
bir_src_000261 -> bir_ev_000168 from bir_src_000193
bir_src_000262 -> bir_ev_000170 from bir_src_000193
bir_src_000263 -> bir_ev_000171 from bir_src_000195
```

The added records preserve reviewed source metadata and bridge or incident linkage while assigning distinct evidence IDs, target event IDs, event-specific claim scopes, and explanatory notes.

## Incident count synchronization

```text
bir_inc_000033  +3
bir_inc_000034  +3
```

## Permanent equality validation

The repository now includes:

```text
scripts/check-source-count-equality.mjs
scripts/test-source-count-equality.mjs
npm run audit:source-count
npm run audit:source-count:test
```

Normal CI checks exact incident and event source counts. Controlled fixtures verify both drift cases.

## Safety boundary

- no bridge, incident, or event record was added or removed;
- no event count, text, date, status, amount, recovery, reimbursement, or restart claim changed;
- existing evidence records were not moved or deleted;
- temporary generator, package hook, and workflow permission changes were removed before final review.
