# Record-growth Batch 21 — tranche 05 allocation

Base main: `560d5a4d316a535655acc1b3abd7983c71533d6f`
Baseline counts: 79 bridges / 58 incidents / 261 events / 420 evidence.

Existing entity: `bir_bridge_000001` Ronin Bridge.

Allocated records:
- `bir_inc_000059` — Ronin Bridge 2024 operator-weight initialization incident
- `bir_ev_000262` — upgrade misconfiguration exploited and bridge paused, 2024-08-06
- `bir_ev_000263` — ETH/USDC returned by whitehat actors, 2024-08-06
- `bir_ev_000264` — recovery fix verified by security audit, 2024-08-21 publication boundary
- `bir_src_000422` — Ronin-hosted Beosin security audit, exploit/root-cause event
- `bir_src_000423` — The Block contemporaneous report, whitehat return/recovery event
- `bir_src_000424` — Ronin-hosted Beosin security audit, fix-verification event

Entity update: `bir_bridge_000001.major_incident_count` becomes 2 and summary/notes/verification date are refreshed to include the distinct 2024 incident while retaining active status.

Boundary: approximately 4,000 ETH + 2M USDC were temporarily withdrawn and subsequently returned. Do not treat the temporary ~$11.8M–$12M valuation as final unrecovered loss. The incident is an upgrade/operator-weight initialization failure, not a repeat of the 2022 validator-key compromise.
