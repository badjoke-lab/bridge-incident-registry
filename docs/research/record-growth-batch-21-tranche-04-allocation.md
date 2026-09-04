# Record-growth Batch 21 — tranche 04 allocation

Base main: `a2a7dba956234402b35a29e75f176ac200d91847`
Baseline counts: 78 bridges / 57 incidents / 258 events / 417 evidence.

## Allocated lineage

- `bir_bridge_000079` — ICON–SODAX Migration Bridge
- `bir_inc_000058` — ICON–SODAX 2026 withdrawal-message replay exploit
- `bir_ev_000259` — replay exploit and unauthorized bridge-path releases, 2026-08-27
- `bir_ev_000260` — withdrawal path paused and ICON network halted, 2026-08-27
- `bir_ev_000261` — corrected contract deployed and ICON network resumed, 2026-08-28
- `bir_src_000419` — ICON Foundation replay exploit postmortem, exploit/amount scope
- `bir_src_000420` — same first-party postmortem, containment scope
- `bir_src_000421` — same first-party postmortem, restart/recovery scope

## Boundary

The BIR entity is the ICON ↔ SODAX migration/withdrawal bridge path composed of the ICON migration contract and the SODAX Asset Manager withdrawal-message processing path. It is not the ICON L1 as a whole and not the SODAX money market as a whole.

The canonical record preserves the postmortem's confirmed-net-loss boundary of 150.2 ETH plus 31,204 USDC rather than treating the gross 119,866,000 ICX release as realized loss. Foundation-held assets only; no user deposits, balances, or positions were accessed or affected. Recovery remains unresolved/in progress at the postmortem date.

No ICON or Sonic chain-reference key is introduced in this tranche; unmodeled chain sides remain `unknown`.
