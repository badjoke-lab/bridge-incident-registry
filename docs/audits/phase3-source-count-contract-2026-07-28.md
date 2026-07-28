# Phase 3 source-count contract — 2026-07-28

Status: reviewed field contract  
Canonical impact: none  
Baseline: 33 bridges / 34 incidents / 183 events / 211 evidence

## Decision

`source_count` is the number of canonical `evidence` records directly linked to the record being counted.

### Incident contract

```text
incident.source_count = count(evidence where evidence.incident_id == incident.id)
```

### Event contract

```text
event.source_count = count(evidence where evidence.event_id == event.id)
```

## What is not counted

`source_count` is not:

- the number of unique URLs;
- the number of publishers;
- the number of citations mentioned in prose;
- the union of all evidence attached to child events;
- inherited bridge-level evidence;
- a historical estimate retained after evidence deduplication;
- a subjective source-quality score.

## Why evidence records are the counting unit

Evidence IDs are the canonical linkage unit. The same URL may intentionally appear in multiple evidence records when it supports different events, incidents, or claim scopes. Collapsing by URL would destroy that event-scoped relationship.

The inventory confirms this distinction:

```text
Incidents matching direct evidence records   27 / 34
Incidents matching direct unique URLs        22 / 34
Events matching direct evidence records     130 / 183
Events matching direct unique URLs          129 / 183
```

Direct record counts therefore align with the canonical data model more consistently than URL counts.

## Inventory result

```text
Total mismatches       60
Incident mismatches     7
Event mismatches       53
```

The incident direct-record count and incident event-union count were identical for all 34 incidents. The incident contract therefore does not require inherited or union semantics.

## Migration classes

### Class A — safe mechanical count normalization

Thirteen records can be changed without modifying historical claims or evidence linkage.

#### Incidents

Normalize all seven incident counts to their directly linked evidence-record counts:

```text
bir_inc_000019   4 -> 3
bir_inc_000020   5 -> 4
bir_inc_000027   5 -> 4
bir_inc_000031   7 -> 6
bir_inc_000032  10 -> 8
bir_inc_000033   5 -> 4
bir_inc_000034   5 -> 6
```

#### Events with more direct evidence than stored count

```text
bir_ev_000010   2 -> 3
bir_ev_000015   1 -> 2
bir_ev_000067   1 -> 2
bir_ev_000070   2 -> 3
bir_ev_000139   1 -> 3
bir_ev_000172   1 -> 2
```

These records already have the evidence links. Only the stored derived count is stale.

### Class B — evidence-link review required

Forty-seven events have a stored count greater than their directly linked evidence-record count.

These must not be mechanically reduced before review. The difference can represent:

- an evidence record linked only to the incident even though it supports the event;
- one source supporting multiple events without event-scoped duplicate evidence records;
- evidence removed or deduplicated after the count was written;
- an originally estimated count with no canonical linkage;
- a genuinely inflated stale count.

For each Class B event, Phase 3 must decide whether to:

1. add or duplicate a canonical event-scoped evidence record;
2. relink an existing evidence record where the current link is wrong;
3. reduce `source_count` when no direct supporting record exists;
4. remove or revise the event if its claim is unsupported.

## Zero-direct-evidence events

Several Class B events currently have zero directly linked evidence records while storing a positive count.

The contract does not authorize setting all of them to zero without review. A reviewed historical event should normally have at least one event-scoped evidence record. Zero-direct-evidence items are therefore evidence-link remediation candidates, not simple count edits.

## Enforcement plan

### Stage 1 — contract and inventory

- fix the semantic definition;
- retain warnings;
- make no canonical changes.

### Stage 2 — mechanical normalization

- normalize the 13 Class A records;
- rerun repository and production verification;
- expected mismatches: 60 -> 47.

### Stage 3 — event evidence-link remediation

- review the 47 Class B events in bounded batches;
- add, relink, or remove evidence as required;
- avoid changing historical claims without source review.

### Stage 4 — hard enforcement

After mismatch count reaches zero:

```text
incident.source_count mismatch -> CI failure
event.source_count mismatch    -> CI failure
```

A separate public-quality gate should also require at least one directly linked evidence record for every reviewed event unless a documented exception is introduced.

## Safety rules

- Do not count unique URLs instead of evidence records.
- Do not inherit evidence from a bridge or incident into an event count.
- Do not reduce a positive event count to zero without checking source linkage.
- Do not duplicate a source record unless the duplicate has a distinct event or claim-scope link.
- Do not use `source_count` as a proxy for source quality.
- Keep reliability, tier, primary status, and count as separate fields.

## Next

1. merge this contract with no canonical changes;
2. implement the 13 Class A normalizations on a fresh branch;
3. production-verify the unchanged 33 / 34 / 183 / 211 record totals;
4. start the 47-event evidence-link remediation in bounded batches;
5. promote exact source-count equality to a hard CI gate only after migration completion.
