# Record Growth Batch 03 — Canonical Allocation

Authority: Issue #376 and merged review PR #377.
Base: fresh main after Batch 02 merge.

Reserved IDs:
- BXH cross-chain bridge: `bir_bridge_000044`
- Cellframe Bridge: `bir_bridge_000045`
- BXH 2021 incident: `bir_inc_000050`
- Cellframe 2026 incident: `bir_inc_000051`
- lifecycle events start at `bir_ev_000219`
- evidence starts at `bir_src_000358`

Guardrails:
- do not mix BXH LP-pool losses with bridge-native losses;
- do not assert a reconciled BXH USD loss total without direct support;
- Cellframe 2026 bridge hack / illegal issuance is separate from the 2023 LP-pool exploit;
- preserve Cellframe total-damage uncertainty and ongoing-investigation state;
- HECO 2023 remains research-only until bridge-specific loss/root-cause evidence is available;
- no validator weakening, source-quality ceiling increase, or event padding.
