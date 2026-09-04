# Record-growth Batch 21 — tranche 04 review

Base main: `a2a7dba956234402b35a29e75f176ac200d91847`
Baseline counts: 78 bridges / 57 incidents / 258 events / 417 evidence.

## ICON Network migration bridge / SODAX withdrawal path — ADD

Primary evidence:

- ICON Foundation, `ICON Network: Replay Exploit Post-Mortem`, 2026-08-30
- https://www.icon.foundation/blog/2026/icon-network-replay-exploit-post-mortem

Entity boundary:

Create one BIR bridge entity for the ICON ↔ SODAX migration bridge / withdrawal path, not for the ICON L1 generally and not for the SODAX money market generally. The first-party postmortem explicitly identifies two bridge-path components: the ICON Network migration contract, which governs ICX/bnUSD migration and withdrawals through the bridge, and the SODAX Asset Manager contract, which processes signed withdrawal messages.

Supported incident boundary:

- exploit window: 2026-08-27 02:01:02–02:21:12 UTC;
- two previously legitimate signed withdrawal messages replayed 1,492 times; 1,490 calls succeeded;
- root cause: serial-number uniqueness check and signed message data did not validate the same exact integer representation after a fixed-32-byte serialization change;
- 119,866,000 ICX and 531,600 bnUSD were released to the attacker-controlled relayer wallet;
- all affected assets were foundation-held; no user deposits, balances, or positions were accessed or affected;
- withdrawal path paused at 03:53 UTC; ICON network later halted at 06:18:54 UTC;
- corrected serialization + relayer allowlist deployed as part of restart;
- ICON Network resumed around 07:51 UTC on 2026-08-28;
- confirmed net loss at postmortem publication: approximately 150.2 ETH plus 31,204 USDC; bnUSD and SODA amounts described in the postmortem were recovered, while most ICX was frozen/traced at exchanges and recovery remained active.

Canonical guardrails:

- do not record the gross 119,866,000 ICX release as final realized loss;
- preserve the first-party confirmed net-loss boundary rather than inventing a USD conversion;
- recovery remains partial/in progress because exchange-frozen ICX recovery was not complete at publication;
- reimbursement is not established;
- distinguish bridge withdrawal-path pause from the temporary ICON network-wide halt;
- because BIR has no ICON or Sonic chain-reference key, preserve unmodeled sides as `unknown` rather than expanding chain vocab inside this batch.

## thirdweb legacy Bridge — HOLD / EXCLUDE FROM THIS TRANCHE

Primary evidence:

- thirdweb, `Smart Contract Incident Report: Legacy Bridge Vulnerability`, 2025-12-12
- https://blog.thirdweb.com/smart-contract-incident-report-legacy-bridge-vulnerability/

The incident concerned a legacy Bridge contract that should have been bricked during an April 2025 response but remained active. Exploitation was limited to one Ethereum wallet that had granted unlimited ERC20 approvals. thirdweb states the current Bridge contracts had been secured and the legacy contract was permanently disabled. This is better treated as a residual legacy-approval incident unless later evidence establishes a bridge-protocol asset-transfer failure. Do not create a BIR canonical record in tranche 04.

## Provisional allocation

- `bir_bridge_000079` — ICON–SODAX Migration Bridge
- `bir_inc_000058` — 2026 replay exploit
- `bir_ev_000259` — replay exploit / withdrawal-path drain
- `bir_ev_000260` — withdrawal path paused and ICON network halted
- `bir_ev_000261` — patched restart / ICON network resumed
- `bir_src_000419` — ICON Foundation postmortem linked exploit event
- `bir_src_000420` — duplicate first-party postmortem linked containment event
- `bir_src_000421` — duplicate first-party postmortem linked restart/recovery event

Admission requires existing data/schema/source-count/source-quality/full-corpus/build/performance/accessibility/browser/Series gates without threshold weakening.
