# Batch 21 tranche 06 review — LI.FI 2024

Status: **ADD NOW**, subject to canonical validator/source-quality pass.
Baseline main: `ca24a637717755476b5ceeb9586720bb8e6064f1`
Baseline counts: 79 bridges / 59 incidents / 263 events / 423 evidence.

## Duplicate and scope decision

Direct default-branch repository search found no canonical LI.FI entity or incident. LI.FI is cross-chain liquidity aggregation/orchestration infrastructure that routes through bridges and DEXs; the July 2024 incident affected LI.FI's own deployed contract facet and user approvals rather than an underlying third-party bridge. BIR already admits cross-chain router/interoperability infrastructure, so this is a bridge-orchestration incident boundary rather than an incident attributed to any integrated bridge.

## Primary incident evidence

LI.FI, `Security Incident Report 16th July`, published 2024-07-18:
https://li.fi/knowledge-hub/incident-report-16th-july

Supported facts:
- breach on 2024-07-16 shortly after a new smart-contract facet was added;
- missing validation in the new facet allowed arbitrary calls;
- affected only wallets with infinite LI.FI token approvals;
- estimated stolen amount around USD 11.6 million;
- Ethereum and Arbitrum;
- 153 wallets;
- USDC, USDT and DAI drained;
- vulnerable facet disabled across all chains after detection;
- LI.FI attributed the deployment failure to individual human error;
- recovery efforts were ongoing at publication;
- full compensation was being evaluated, not completed.

Independent contemporaneous reporting from The Block on July 16 initially reported an approximately USD 9 million estimate and described the arbitrary-call/call-injection path. The later first-party USD 11.6 million estimate controls the canonical amount boundary.

## Canonical boundaries

- entity: LI.FI cross-chain aggregation/orchestration protocol, active;
- one incident dated 2024-07-16;
- incident type: exploit;
- attack-vector description: missing whitelist validation on newly deployed facet permitting arbitrary calls against infinitely approved user wallets;
- amount: approximately USD 11.6M, first-party estimate;
- affected chains: Ethereum / Arbitrum;
- affected assets: USDC / USDT / DAI;
- containment event: vulnerable facet disabled across all chains;
- recovery remains unknown/in progress; do not infer recovered funds;
- reimbursement remains planned/evaluating, not completed;
- do not attribute this incident to Stargate, Across, or any other underlying integrated bridge.

## Force Bridge hold carried forward

Force Bridge remains evidence-ready factually, but canonical mutation is held because marking the now-non-operational bridge terminal adds three unique terminal evidence URLs without archives and breaches the existing `terminal_unarchived <= 15` no-regression gate. The gate is not weakened and the bridge is not falsely modeled as active/limited to bypass it.