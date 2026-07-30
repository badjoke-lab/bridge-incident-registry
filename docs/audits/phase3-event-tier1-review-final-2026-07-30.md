# Phase 3 final event Tier 1 review — 2026-07-30

Status: review complete  
Canonical data changed: no

## Baseline

```text
Events                         183
Evidence                       279
Events without Tier 1 evidence 11
Previously intentional gaps      6
Final unreviewed targets         5
```

## Decision summary

```text
Reviewed events                   5
Tier 1 additions approved         5
Primary additions approved        4
Non-primary Tier 1 additions      1
Expected evidence total         284
Expected event Tier 1 gaps        6
Expected event primary gaps      16
Expected source-count drift       0
```

## Approved additions

### `bir_ev_000136` — RBC/BRBC bridge wallet compromise occurred

Decision: add an event-scoped copy of `bir_src_000161`.

Rubic's official weekly report directly describes the compromised administrative-wallet private key, released RBC/BRBC bridge assets, approximate amount, suspension of the old bridge, and migration response. It directly supports the target event rather than serving only as later lifecycle context.

### `bir_ev_000146` — Unizen announced immediate reimbursement plan

Decision: add an event-scoped copy of `bir_src_000172`.

Unizen's official reimbursement announcement directly supports the commitment to make more than 99 percent of affected users whole, the USD 750,000 threshold, and case-by-case handling of larger claims.

### `bir_ev_000150` — Remaining stolen funds moved through Tornado Cash

Decision: add PeckShieldAlert's August 7, 2024 on-chain monitoring post as Tier 1 non-primary evidence:

```text
https://x.com/PeckShieldAlert/status/1821065531073724876
```

The post reports that the Unizen exploiter-labeled address transferred 865.4 ETH, worth approximately USD 2.16 million, to Tornado Cash. The evidence is a direct security-monitoring observation, not an operator statement, so `is_primary` remains false. Existing secondary reporting remains corroboration.

### `bir_ev_000156` — Taiko Bridge reopened

Decision: add an event-scoped copy of `bir_src_000183`.

Taiko's official bridge-reopening and make-whole statement directly supports restoration of the network and bridge, reopening under conservative withdrawal quotas, and the related reimbursement commitment.

### `bir_ev_000164` — Everclear protocol, UI, and chain sunset

Decision: add an event-scoped copy of `bir_src_000187`.

Everclear's official wind-down announcement directly states that the protocol, user interface, and chain had been sunset and were no longer operational. It directly supports the effective shutdown event.

## Expected canonical migration

A fresh canonical branch should add five event-scoped Tier 1 records and synchronize five event counts across four incidents plus the entity-level Everclear shutdown event.

```text
Evidence                       279 -> 284
Primary evidence              197 -> 201
Tier 1 evidence               215 -> 220
Official-domain evidence      127 -> 131
Events without primary         20 -> 16
Events without Tier 1          11 -> 6
Incident source mismatches       0
Event source mismatches          0
```

Four additions reuse already counted risky-host URLs. The PeckShieldAlert X post adds one new unique risky-host URL, so the expected unique risky-host queue is 88. The terminal unique-URL queue remains 59 because the Everclear copy reuses an existing URL.

## Final documented Tier 1 gaps

After the expected migration, all unreviewed event Tier 1 gaps will be closed. The six remaining gaps are intentional secondary records:

```text
bir_ev_000006  Wormhole research context
bir_ev_000009  Nomad research context
bir_ev_000012  Harmony research context
bir_ev_000051  Harmony community recovery-partner proposal
bir_ev_000087  Nerve exploit without reviewed operator source
bir_ev_000088  BlockSec root-cause-analysis publication
```

These records must not be upgraded by using unrelated first-party lifecycle sources or by reclassifying security-firm and research sources.

## Safety boundary

- canonical JSON is unchanged in this review PR;
- no existing source is reclassified;
- no event date, amount, status, or historical outcome is changed;
- the PeckShieldAlert source remains non-primary;
- temporary generator, inventory, and write-enabled workflow must be removed before merge;
- canonical migration must occur on a fresh branch after this review boundary merges.
