# XRPL–TX Bridge 2026 incident review

Status: review complete — canonical application held behind source-resolution gate  
Reviewed: 2026-08-11  
Canonical data changed by this review: no

## Baseline and insertion timing

```text
main        58f17fb3ee46962c9baf541aa7bdf583a6b7289f
Bridges     35
Incidents   37
Events      187
Evidence    295
Open PRs    0 at review start
```

The current main head is the merge of PR #273 (`Add TAC Inner Bridge May 2026 exploit`). The latest reviewed main workflows after that merge completed successfully, and no open pull request existed when this review branch was created.

This is therefore an acceptable **review-only insertion point** that does not interfere with the ongoing BIR development line. Canonical application, if approved later, must still re-read current main and abort/rebase if another canonical batch has reserved the proposed IDs or changed the count baseline.

## Incident lead

A public xrpl.to report shared for review describes an August 9, 2026 incident affecting the then-Coreum / current XRPL–TX bridge. The report capture states that approximately 200,000 XRP left the bridge over 97 minutes in 94 payments, and that each payment carried 17 of 28 bridge-relayer signatures. It also states that no XRPL rippling effect or XRPL flag was involved and places the exploit on the Coreum-side bridge logic.

Those incident-specific figures are **not yet admitted as canonical facts by this review** because the exact stable xrpl.to investigation URL was not resolved from the source set available during review, and no first-party TX/Coreum incident statement or post-mortem was located.

The report is strong enough to trigger BIR review, but not strong enough by itself to bypass the repository's evidence gate.

## Entity/lifecycle boundary

Current first-party documentation names the system **XRPL-TX Bridge** and describes it as a bridge between the XRP Ledger and the TX blockchain using a multi-signing XRPL account, a bridge smart contract, and a relayer set.

Historical Coreum documentation describes the same system as **XRPL-Coreum Bridge**. Current TX documentation says TX was created from the merger of Coreum and Sologenic, and current bridge tooling still retains `coreumbridge-xrpl-relayer` naming.

The preferred BIR model is therefore one lifecycle entity rather than separate Coreum-era and TX-era bridge entities, unless later first-party material proves a technically separate redeployment that should be modeled as a successor.

Provisional entity identity:

```text
canonical_name       XRPL-TX Bridge
slug                 xrpl-tx-bridge
previous_slugs       xrpl-coreum-bridge
aliases              XRPL-Coreum Bridge; Coreum XRPL Bridge; Coreum Bridge XRPL
operator/ecosystem   TX / former Coreum bridge ecosystem
type                 interoperability_protocol or canonical_bridge (final choice at application review)
```

## First-party architecture review

Current TX bridge documentation establishes the intended XRPL → TX flow:

1. the user sends a Payment to the bridge multisig account on XRPL;
2. relayers monitor XRPL transactions and submit proof to the bridge contract;
3. the bridge contract validates the asset and releases/mints the TX-side representation.

The open-source `CoreumFoundation/coreumbridge-xrpl` relayer implementation was inspected at the current publicly available repository revision. In `relayer/processes/xrpl_to_coreum.go`, the incoming-payment path:

- checks final/successful transaction state;
- requires `Payment` transaction type;
- decodes the Coreum/TX recipient from the memo;
- uses `DeliveredAmount`;
- builds XRPL-to-Coreum transfer evidence and submits it to the contract.

The reviewed function has `BridgeXRPLAddress` available in process configuration, but no explicit `paymentTx.Destination == BridgeXRPLAddress` check is visible in the incoming-payment branch before transfer evidence is built.

This is an important code-level observation and is consistent with a **message / transfer verification failure** class. It is **not**, by itself, proof that this missing destination check was the exact production exploit path on August 9. A later patch, deployment-specific configuration, contract-side guard, or operator post-mortem could change the root-cause boundary.

## Provisional classification boundary

If the xrpl.to investigation is resolved to a stable source and no stronger first-party source contradicts it, the preferred incident shape is:

```text
incident_date             2026-08-09
incident_type             exploit
attack_vector_category    message_verification_failure
reported_loss_assets      xrp
recovery_status            unknown
reimbursement_status       unknown
restart_status             unknown until first-party/strong source is admitted
current_outcome            unresolved
is_unresolved              true
postmortem_available       unknown
```

Do **not** classify this as `validator_key_compromise` merely because 17 relayer signatures were present. The available lead says the payments were signed by the bridge's relayer quorum, but it does not establish theft of relayer private keys.

Do **not** classify this as an XRPL protocol vulnerability on the present record. Current evidence points to bridge-side interpretation / verification logic; the incident lead explicitly rejects a rippling/flag explanation.

## Amount boundary

The only incident amount admitted at review stage is the lead's rounded description:

```text
approximately 200,000 XRP
```

A more precise XRP amount, a USD equivalent, valuation timestamp, realized loss, recovered amount, and outstanding loss are **not approved** until supported by a stable source URL or first-party/on-chain evidence that can be cited in `data/evidence.json`.

The canonical record must not convert the rounded 200,000 XRP headline into an invented exact amount or an unsourced USD value.

## Source review

| Ref | Source | Role | Reviewed support | Admission plan |
|---|---|---|---|---|
| A | xrpl.to public incident report shown in the review lead; exact stable article URL unresolved | independent on-chain investigation lead | Aug. 9 incident; ~200,000 XRP; 97 minutes; 94 payments; 17-of-28 relayer signatures; Coreum-side bridge attribution | **hold** until exact stable URL is resolved |
| B | https://docs.tx.org/docs-bridge/introduction | Tier 1 / first-party entity and architecture context | current `XRPL-TX Bridge` identity; multisig + relayers + TX bridge contract; 32-relayer architecture description | admit for entity/context if canonical batch proceeds |
| C | https://docs.tx.org/docs-bridge/asset-flow | Tier 1 / first-party intended-flow documentation | intended XRPL→TX deposit/payment and relayer-proof flow | admit for architecture context if needed |
| D | https://docs.tx.org/docs-bridge/run-relayer | Tier 1 / first-party relayer documentation | relayer role and continuity of `coreumbridge-xrpl-relayer` tooling | entity/lifecycle context; optional evidence row |
| E | https://docs.tx.org/docs/next/sologenic-coreum-merger/introduction | Tier 1 / first-party lifecycle context | Coreum + Sologenic → TX branding/lifecycle context | entity/lifecycle context; optional evidence row |
| F | https://github.com/CoreumFoundation/coreumbridge-xrpl/blob/c0e94a322a11b5f6fa8fb27a64f6ed6be2da2f85/relayer/processes/xrpl_to_coreum.go | Tier 1 technical artifact / official source repository | inspected incoming-payment validation path; supports code-level verification-gap hypothesis | admit only with carefully qualified claim scope |

No first-party incident post-mortem, pause/restart statement, recovery statement, or reimbursement statement was located in the reviewed public source set.

## Reference-data impact

Current BIR reference dictionaries do not contain the required `xrpl` or `tx` chain keys and do not contain the `xrp` asset key.

A later bounded canonical application will therefore need normalization additions if they remain absent:

```text
chains: xrpl, tx
assets: xrp
```

Suggested display semantics:

```text
xrpl -> XRP Ledger; aliases: XRPL, XRP Ledger mainnet
tx   -> TX Chain; aliases: TX blockchain, Coreum, Coreum Network (lifecycle alias; verify at application time)
xrp  -> XRP; aliases: XRP Ledger native asset
```

The `tx` alias boundary must be rechecked before application so a historical Coreum reference is not incorrectly treated as a separate chain if the operator's migration materials establish a more specific technical cutover.

## Proposed canonical IDs

Current main ends at:

```text
bir_bridge_000035
bir_inc_000037
bir_ev_000187
bir_src_000295
```

If the source gate is cleared before another canonical batch lands, reserve:

```text
bridge     bir_bridge_000036
incident   bir_inc_000038
event      bir_ev_000188 (minimum incident/pause event; final event count depends on admitted timeline)
evidence   bir_src_000296 onward (exact count depends on resolved incident sources)
```

These are **proposed only**. This review does not reserve them against future main changes.

## Canonical application gate

A canonical application PR is approved only after **at least one** of the following incident-source conditions is met:

1. resolve the exact stable xrpl.to incident investigation URL and confirm the report contents against the operator-provided capture; or
2. locate a first-party TX/Coreum statement or post-mortem that establishes the incident boundary; or
3. construct an independently reproducible on-chain source package with transaction hashes/addresses sufficient to establish the amount and transfer sequence without relying on the screenshot.

Before canonical application, also resolve or explicitly leave unknown:

- exact XRP amount versus rounded ~200,000 XRP;
- bridge operational state after the incident (`paused`, `reopened`, or other);
- recovery status and recovered amount;
- reimbursement/compensation status;
- whether any relayer keys were compromised (currently **not established**);
- whether the suspected missing destination validation was the actual production exploit path;
- official post-mortem availability.

Unknown values must remain unknown rather than being inferred from the absence of later announcements.

## Application boundary

This review branch is intentionally isolated from canonical data and from ongoing BIR main-development work.

After the incident-source gate is cleared, canonical application must use a **fresh branch and bounded PR**, following the same pattern used for the TAC application:

1. re-read current main and all canonical counts/last IDs;
2. assert proposed IDs are unused or allocate the next available IDs;
3. add one lifecycle bridge entity and one incident unless source review changes that boundary;
4. add only source-supported events and evidence rows;
5. add `xrpl`, `tx`, and `xrp` reference keys only if still absent and semantically confirmed;
6. preserve rounded/unknown amount fields unless exact values are independently sourced;
7. keep recovery, reimbursement, restart, and post-mortem state unknown unless admitted evidence supports stronger values;
8. keep `message_verification_failure` provisional until incident-specific evidence supports the final root cause;
9. pass schema/cross-record/source-count/source-quality/build/dist/accessibility/performance/browser/release-readiness gates;
10. run post-merge production registry equality because canonical/public output changes;
11. remove any temporary generator or write-enabled workflow before final review/merge.

No canonical mutation is authorized by this review until the incident-source gate above is satisfied.
