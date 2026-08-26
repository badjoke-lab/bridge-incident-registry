# Growth Batch 03 review — BXH 2021 + Cellframe Bridge 2026

Issue: #376

## Decision

Authorize canonical application for two new bridge identities and two incidents, subject to all existing validation and source-quality gates.

## BXH cross-chain bridge — 2021 security incident

First-party BXH announcement material establishes a 2021 security incident, pre-incident snapshots, losses involving LP and cross-chain bridge positions, and a compensation program for users whose assets were lost in the cross-chain bridge. The later announcement also records BXH DeFi exit / CeFi transition context.

Canonical constraints:
- new BXH cross-chain bridge identity if fresh-main duplicate check remains negative;
- incident date may use the first-party September 21 incident boundary only at the precision supported by the source;
- do not manufacture a USD bridge-loss total;
- do not mix LP-pool losses with bridge-native losses;
- compensation may be recorded as announced/in-progress only unless completion is directly established;
- later DeFi exit may be recorded separately from incident recovery.

Primary locator:
- https://t.me/s/BXH_Announcement

## Cellframe Bridge — 2026 bridge hack / illegal token issuance

Cellframe's May 14, 2026 first-party AMA states that the team had announced a hack of the Cellframe bridge and illegal token issuance. The AMA discusses a roughly $2,000 illegal-issuance amount in the question boundary, bridge hardening, moving USDC from old protocols, hot/cold bridge separation, and an ongoing internal investigation. The team explicitly says total damage had not yet been fully calculated.

Canonical constraints:
- new Cellframe Bridge identity if fresh-main duplicate check remains negative;
- distinguish the bridge hack / illegal issuance from the unrelated June 1, 2023 LP-pool flash-loan exploit;
- preserve the approximately $2,000 figure as a scoped reported claim, not a reconciled total-loss figure;
- total loss remains unresolved;
- remediation/hardening is a separate lifecycle event;
- investigation status remains ongoing unless later first-party evidence closes it.

Primary locators:
- https://cellframe.net/blog/ama-with-dmitry-gerasimov-may-7-2026/
- https://bridge.cellframe.net/

## HECO 2023 remains research-only

HTX first-party notice confirms a cyberattack affecting HTX and HECO Chain and temporary suspension of HECO Chain gateway deposits/withdrawals. The $30M figure is explicitly HTX hot-wallet impact and is not authorized as a HECO bridge-loss amount. Do not canonicalize HECO until bridge-specific loss/root-cause evidence is found.

Primary locator:
- https://www.htx.com/zh-cn/support/104954980569005

## Expected canonical effect

Minimum after application: 45 bridges / 51 incidents. Event and evidence counts follow supported lifecycle structure and must not be padded.
