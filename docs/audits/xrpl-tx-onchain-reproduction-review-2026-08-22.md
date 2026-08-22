# XRPL-TX Bridge reproducible on-chain evidence review

Status: supplemental review complete — reproducible on-chain target resolved; first-party admission blocker remains  
Reviewed: 2026-08-22  
Issue: #279  
Prior authority: PR #321 / `docs/audits/xrpl-tx-bridge-followup-review-2026-08-20.md`  
Canonical incident: `bir_inc_000038`  
Canonical bridge: `bir_bridge_000036`  
Canonical event: `bir_ev_000188`

## Purpose

This audit supplements, and does not replace, the merged review authority in PR #321. It evaluates a new independent technical/on-chain analysis published after that review:

- SigIntZero, **Coreum Bridge $200K Exploit: 17 Signers and One Missing Destination Check**, 2026-08-18
- https://sigintzero.com/blog/coreum-bridge-200k-xrp-rippling-deposit-forgery

The source is independent technical analysis, not tx/Coreum first-party incident authority. It therefore cannot by itself clear PR #321's requirement for a stable direct first-party incident/restoration locator and the normal preservation boundary before the larger semantic canonical update is applied.

## Current main boundary

This review starts from exact main:

`1f3fb5cf861f930f3167ac2a27b5167b160d1bd1`

Current canonical counts remain:

```text
Bridges     41
Incidents   44
Events      206
Evidence    341
```

No canonical JSON is changed by this review.

## What the new source resolves

Issue #279 explicitly requested a reproducible on-chain transaction/address package establishing the transfer sequence and amount independently. SigIntZero now supplies that missing independent reproduction layer.

The analysis states that it queried XRP Ledger mainnet with public `account_tx`, `account_info`, and `account_objects` methods and cross-checked the bridge account through XRPScan. Its reported reproducible observations are:

- bridge account `rxXXXeMX8Gy5YvibvGLnQJ1XKKD7UswM1`;
- 94 successful outgoing XRP payments from 19:26:30 through 20:53:50 UTC on 2026-08-09;
- each outgoing payment carried exactly 17 signatures;
- the 94 XRP payments sum exactly to **199,916.3 XRP**;
- no inbound payment to the bridge occurred during that XRP-drain window;
- the on-chain signer list contains 28 entries of weight 1 with threshold 17.

For BIR review purposes, this independently strengthens the existing canonical **gross XRP outflow** amount and the 94-payment sequence. It closes Issue #279 research target #3 as a research/evidence-discovery task.

It does not establish recovery, reimbursement completion, reopening, or the exact production deployment version.

## Amount discrepancy

PR #321 preserved a conflict between:

```text
199,916.3 XRP   current canonical / contemporaneous on-chain reporting
198,715.88 XRP  later figure attributed to tx technical leadership
```

SigIntZero reports that the numerical difference is **1,200.42 XRP** and that there were no inbound bridge payments during the 94-payment XRP-drain window. Therefore the lower figure is not explained merely as net XRP outflow after deposits during that window.

Approved boundary remains:

- keep **199,916.3 XRP** as the independently reproduced gross XRP reserve outflow unless stronger authority establishes a different counting definition;
- do not silently replace it with 198,715.88 XRP;
- preserve the discrepancy explicitly until its counting boundary is reconciled;
- do not introduce an unsourced USD conversion.

This supplemental source materially strengthens the existing amount basis, but it does not convert the tx-attributed lower figure into an error without first-party clarification of what that figure measures.

## Duration boundary

The new analysis distinguishes two time windows:

- XRP reserve drain itself: about **87 minutes** from the first to the last of the 94 outgoing XRP payments;
- broader reported activity: about **97 minutes**, beginning with a preceding wrapped-TX issuance leg identified by the analyst.

The current canonical event's commonly reported 97-minute wording should therefore not be strengthened into a claim that the 94 XRP payments themselves spanned 97 minutes. A future canonical edit should either describe the XRP-only drain as about 87 minutes or explicitly explain that the wider 97-minute figure includes the preceding wrapped-token activity.

## Wrapped-TX leg

SigIntZero additionally reports nine bridge-issued wrapped-TX payments totalling 4,356,778.58 units before the XRP reserve drain.

Do **not** add that quantity to BIR's canonical loss total from this review alone. It requires a separate liability/valuation review because:

- it is a distinct asset leg from the XRP reserve outflow;
- most of the issued balance reportedly remained in the identified wallets at the analyst's observation point;
- token issuance, realizable attacker proceeds, reserve liability and victim loss are not interchangeable concepts;
- PR #321 did not authorize this additional loss boundary.

The observation may be retained as a future research lead only.

## Root-cause boundary

The analysis reviews the public relayer source and identifies the same high-level verification gap already recognized in BIR's pinned source `bir_src_000296`: the incoming path does not visibly require the observed payment destination to equal the configured bridge XRPL address before evidence is submitted.

The analysis also explicitly cautions that the public repository's most recent commit predates the August 2026 incident and therefore cannot prove that the deployed relayers ran that exact public build.

This supports PR #321's reviewed direction toward:

`message_verification_failure`

but **does not independently authorize applying that canonical reclassification ahead of admitted tx first-party incident evidence**, because PR #321 tied the semantic upgrade to the incident-specific first-party statement. The new source is corroborating technical evidence, not a substitute primary incident source.

Do not reclassify this as validator-key compromise: the reproduced 17-of-28 authorization pattern is consistent with the relayer quorum operating, not proof that 17 private keys were stolen.

## Source-quality boundary

The current permanent risky-host set in `scripts/check-source-quality-baseline.mjs` is:

- `x.com`
- `twitter.com`
- `medium.com`
- `mirror.xyz`
- `substack.com`
- `docs.google.com`
- `notion.site`

`sigintzero.com` is not in that set. Therefore admitting this stable URL in a future canonical evidence-only enrichment would not itself consume the current `risky_host_unarchived` allowance.

This fact does **not** create headroom for the missing tx X sources and does not relax the permanent limit of 16 risky-host unarchived unique URLs.

## What remains blocked

This review does not resolve PR #321's primary-source application blockers:

1. exact direct tx incident/root-cause status or article locator;
2. exact direct tx reserve-restoration / make-whole locator;
3. normal preservation/source-quality admission for those risky-host first-party URLs if used;
4. completed attacker-fund recovery;
5. completed reserve replenishment / reimbursement;
6. dated bridge reopening;
7. exact production relayer deployment version.

Accordingly, the broader PR #321 canonical direction remains blocked. Current recovery/reimbursement/restart fields must not be upgraded from this source alone.

## Authorized consequence

This supplemental review authorizes only the following conclusion at this stage:

- Issue #279 research target #3, the reproducible on-chain transaction/address package, is now **resolved**;
- the existing 199,916.3 XRP gross outflow has materially stronger independent support;
- the amount discrepancy and duration wording can be made more precise in a future canonical application;
- SigIntZero is suitable as non-primary technical/on-chain evidence in a later bounded canonical enrichment;
- the larger first-party-driven root-cause, reimbursement and current-outcome update remains blocked until PR #321's direct-primary admission requirements clear.

No canonical data, schema, enum, source-quality ceiling, archive threshold, performance budget, verifier, scheduler, route, or production state is changed here.

## Next bounded action

Continue #279 with the remaining first-party locator/preservation targets. If those remain unresolved, do not manufacture primary authority from mirrors and do not close the issue. A later canonical application must start from then-current main, reconcile all source counts exactly, preserve permanent quality/performance gates, and receive post-merge native + Series production equality verification.