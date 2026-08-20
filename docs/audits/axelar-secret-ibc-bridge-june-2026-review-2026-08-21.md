# Axelar–Secret IBC Bridge June 2026 incident review

Status: reviewed for bounded canonical application  
Reviewed: 2026-08-21  
Issue: #346

## Decision

The June 10, 2026 exploit of the Secret-side `ics20-for-axelar` contract is a **strong BIR canonical candidate**.

The affected system is a specific asset-transfer connection between Axelar and Secret Network. It should be modeled as its own bridge entity, not as compromise of Axelar core, IBC generally, Secret Network generally, or every Axelar integration.

A detailed first-party Secret Network incident report identifies the affected contract, attack date, bridge role, asset set, approximate USD loss, source-channel validation defect, reserve drain, containment actions, and unaffected-system boundary. Current Secret Tunnel first-party state still says the service is not operational due to a security incident. A Common Prefix technical analysis and independent reporting corroborate the incident. Axelar governance later passed a non-binding signaling proposal supporting a future freeze/recustody path for remaining attacker-held assets, but that vote itself does not establish recovery or reimbursement completion.

Canonical application is supportable subject to the permanent schema/source-count/source-quality/build/accessibility/performance/browser/Series/production-equality gates.

## Duplicate review

Current BIR main at review start:

```text
4532f1bd14829d67a63666595e22a6d118bc6611
```

Current canonical search found no existing `Axelar–Secret`, `Secret Tunnel`, `ics20-for-axelar`, or equivalent Secret/Axelar connection entity or incident. Application must repeat this duplicate check against then-current main before mutation.

## Entity boundary

Recommended canonical entity:

```text
canonical_name      Axelar–Secret IBC Bridge
slug                axelar-secret-ibc-bridge
type                asset_bridge
status              paused
primary_chains      Secret Network, Axelar
major_incident_count 1
has_unresolved_incident true
```

The public-facing Secret Tunnel at:

```text
https://tunnel.scrt.network/
```

is the user interface for wrapping assets and is explicitly described as powered by Axelar. The incident report identifies the lower-level affected component as Secret's `ics20-for-axelar` contract serving the Secret side of the Axelar<>Secret IBC connection.

The entity should therefore represent the **Axelar–Secret IBC asset bridge / Secret Tunnel connection**, while retaining `Secret Tunnel` and `ics20-for-axelar` as aliases/component context rather than creating multiple entities for the same affected bridge path.

Do not use `Axelar` alone as the entity name: Axelar core and other Axelar integrations were not compromised.

## Launch boundary

Axelar announced its Secret Network integration on July 13, 2022:

```text
https://www.axelar.network/blog/axelar-and-secret-network-announcement
```

Secret's incident report states that the affected bridge contract itself was first instantiated on:

```text
2023-03-30 13:00 UTC
Secret block 8,152,995
```

Recommended bridge `launch_date` for the affected canonical asset connection is therefore:

```text
2023-03-30
launch_date_precision = day
```

The 2022 partnership announcement remains earlier integration-history evidence, not the deployed affected-contract launch date.

## Incident boundary

First-party attack date:

```text
2026-06-10
```

Secret states that an attacker exploited the Secret-side bridge contract to mint unbacked Axelar-wrapped Secret assets and then redeemed those assets through the legitimate Axelar channel, releasing genuine reserves held on the Axelar side.

Recommended incident target:

```text
incident_type             exploit
incident_date             2026-06-10
incident_date_precision   day
reported_loss             about USD 4.67 million
loss_amount_basis         reported_by_project
amount_confidence         high
attack_vector_category    message_verification_failure
recovery_status           none
reimbursement_status      announced
restart_status            not_reopened
current_outcome           paused_long_term
postmortem_available      available
is_unresolved             true
```

`recovery_status = none` is the reviewed current boundary because no admitted source establishes returned, recustodied, or protocol-controlled stolen assets. Attacker-held funds that remain identifiable are not recovered merely because they can potentially be frozen.

`reimbursement_status = announced` is supportable only in the narrow sense that Axelar governance Proposal #490 passed a formal signaling intent to freeze remaining hacker funds and later recustody them to a distributor for affected users. The proposal is explicitly non-binding and does not itself transfer, freeze, or reimburse funds. Canonical prose must preserve that limitation.

If application-time review finds a later binding recovery/distribution execution, these fields must be re-evaluated rather than copied mechanically from this review.

## Root-cause boundary

The Secret-side `ics20-for-axelar` contract had been adapted from an escrow-based SNIP-20 ICS-20 implementation to mint Axelar-wrapped assets on Secret.

The first-party incident report says the adaptation removed functions whose previous behavior included implicit source/channel authentication, while the replacement allow-list validated token identity without authenticating the legitimate source channel. As a result, inbound token messages from a counterfeit chain could be treated as valid deposits for supported asset denominations.

For BIR's existing vocabulary:

```text
attack_vector_category = message_verification_failure
```

is the least-distorting category. The failure boundary is acceptance of an inbound cross-chain token message without authenticating its expected source channel.

Do not classify the incident as:

- compromise of Axelar core;
- an IBC protocol break;
- compromise of Secret Network consensus/privacy;
- validator-key compromise;
- a generic Axelar-wide bridge failure.

Public canonical prose must stay non-operational. It may state the missing source-channel authentication and unbacked mint/redeem consequence but must not reproduce a step-by-step exploit recipe.

## Loss and affected-asset boundary

First-party reported aggregate:

```text
about USD 4.67 million
```

Affected Secret Axelar wrapped assets:

```text
saUSDT
saUSDC
saWETH
saWBTC
saDAI
saWBNB
saWstETH
```

For canonical normalized asset references, prefer the underlying asset keys where the BIR reference dictionary already contains them (`usdt`, `usdc`, `weth`, `wbtc`, `dai`, `bnb`) and add only genuinely missing normalized references such as `wsteth` if required after rechecking current main.

Do not include native SCRT, unrelated SNIP-20 assets, or Noble USDC merely because they are part of the Secret ecosystem; the first-party report explicitly says they were unaffected.

## Detection and containment boundary

Reviewed sequence:

```text
2026-06-10  exploit occurs; unbacked bridge assets minted/redeemed
2026-06-17  Secret team informed after the incident was discovered
2026-06-19  public incident reporting / analysis
2026-06-19  Secret bridging disabled; Axelar Secret and Secret-SNIP connections paused
2026-07-05  Axelar Proposal #490 signaling recovery intent passes
2026-08-21  Secret Tunnel still states service is not operational due to security incident
```

The bridge therefore remains `paused` at this review boundary. No reopening event is supportable.

## Recovery / reimbursement boundary

Secret's incident report said approximately USD 770,000 of stolen assets remained in the attacker-controlled Axelar wallet at publication time. Independent reporting later observed a somewhat lower market-valued residual as prices/holdings changed.

That residual is **not recovered funds**.

Axelar governance Proposal #490 later passed with approximately 99.98% YES. Its text is explicit that it is a non-binding signaling proposal. It records community intent to:

1. freeze identified hacker funds; and
2. later recustody them to a trusted distributor for return to affected users.

It also explicitly says it does not itself move, freeze, seize, name a distributor, or finalize a distribution plan.

Canonical handling:

```text
recovery_status        none
reimbursement_status   announced
```

with unresolved reasons including:

- no proved return/recustody of attacker assets;
- no binding redistribution execution located at review time;
- final affected-user reimbursement amount and completion are unknown;
- bridge connection remains disabled.

Do not turn Proposal #490 into a `funds_recovered` or `reimbursement_completed` event.

## Recommended lifecycle events

A minimal factual event set is:

```text
launched                 2023-03-30
exploit_occurred         2026-06-10
bridge_paused            2026-06-19 (public containment boundary; discovery/disable sequence described in first-party report)
reimbursement_announced  2026-07-05 (non-binding governance intent only)
```

If event chronology is modeled more finely, `incident_disclosed` on June 19 may be added, but do not inflate the timeline with redundant events solely to increase record count.

No `bridge_reopened`, `funds_recovered`, or `reimbursement_completed` event is currently authorized.

## Source package

### Tier 1 / first-party

1. Secret Network incident report  
   https://forum.scrt.network/t/security-incident-axelar-secret-ibc-bridge-exploit-june-10-2026/7995

   Supports incident existence, date, affected component, root cause, amount, affected assets, reserve drain, containment, current impairment, attacker-held residual and unaffected-system boundary.

2. Secret Tunnel  
   https://tunnel.scrt.network/

   Supports current bridge/service identity and current non-operational status.

3. Axelar integration announcement  
   https://www.axelar.network/blog/axelar-and-secret-network-announcement

   Supports integration history and Axelar/Secret relationship.

4. Axelar governance Proposal #490 / on-chain governance record  
   https://axelar.valopers.com/proposals/490

   Supports the passed but explicitly non-binding recovery/recustody signaling boundary.

### Independent / technical

5. Common Prefix technical analysis  
   https://commonprefix.com/blog/secret-network-exploit

   Supports independent technical reconstruction and approximately USD 4.67M scope.

6. The Block contemporaneous report  
   https://www.theblock.co/news/ecosystems/2026-06-20-secret-networks-axelar-bridge-drained-for-4-67-million-in-infinite-mint-exploit-that-went-unnoticed-for-seven-days-405459

   Supports independent amount, detection timing, containment and Axelar-core-not-compromised corroboration.

## Source-quality / preservation boundary

The core admitted sources are on:

```text
forum.scrt.network
scrt.network
axelar.network
axelar.valopers.com
commonprefix.com
theblock.co
```

None requires adding a new unarchived `x.com`, `twitter.com`, `medium.com`, `mirror.xyz`, `substack.com`, `docs.google.com`, or `notion.site` source.

Therefore this candidate can proceed without weakening BIR's saturated risky-host-unarchived ceiling. Do not add X copies merely to inflate source counts.

## Reference-data implications

Recheck current reference dictionaries immediately before application.

Expected missing chain keys are likely:

```text
secret-network
axelar
```

Expected underlying asset keys mostly already exist; add only missing references actually used by the canonical record.

## Expected bounded canonical shape

Current main at review time is 39 bridges / 42 incidents / 199 events / 327 evidence. If no other canonical work lands first, a likely next-ID boundary is:

```text
bridge     bir_bridge_000040
incident   bir_inc_000043
events     bir_ev_000200+
evidence   bir_src_000328+
```

These are planning hints only. A later canonical application must derive and assert exact IDs/counts from then-current `main` and fail closed if any tail has moved.

## Guardrails

1. Scope the entity to the Axelar–Secret IBC asset connection, not Axelar core or Secret Network globally.
2. Preserve `message_verification_failure` as the high-level source-authentication failure category; do not create a one-off enum.
3. Keep public mechanism prose non-operational.
4. Keep actual stolen amount, attacker-held residual, recovery, governance intent and victim reimbursement as separate claims.
5. Do not call identifiable/freezeable attacker assets recovered until control actually changes.
6. Do not call Proposal #490 completed reimbursement; it is explicitly non-binding signaling.
7. Do not claim bridge reopening while Secret Tunnel remains non-operational.
8. Do not treat Noble USDC, native SCRT, unrelated SNIP-20s or other Axelar integrations as affected.
9. Do not weaken source tiers, source-count equality, risky-host ceilings, archive rules, schema, performance budget, browser gates, Series consistency or production equality.
10. Canonical application must begin from fresh current main and recheck duplicates, IDs, counts, reference keys and any later recovery/reopen evidence before mutation.
