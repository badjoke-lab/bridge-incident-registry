# Verus-Ethereum Bridge July 2026 second-exploit review

Status: review complete — bounded canonical direction approved; first-party long-form preservation still pending  
Reviewed: 2026-08-20  
Issue: #324  
Canonical data changed by this review: no

## Baseline

```text
Bridges     38
Incidents   40
Events      193
Evidence    311
```

No Verus / Verus-Ethereum Bridge entity or May/July 2026 Verus bridge incident currently exists in canonical BIR data.

This review covers the **second** Verus-Ethereum Bridge exploit in July 2026. The separate May 2026 exploit is context and a separate future review target; it must not be collapsed into the July incident.

## Disposition

**Approve the July incident for bounded canonical application once the first-party preservation boundary is resolved or the application package deliberately excludes the risky long-form source while retaining sufficient admitted first-party incident authority.**

The reviewed record supports these core boundaries:

- Verus official documentation identifies the Verus-Ethereum Bridge as the Verus ↔ Ethereum non-custodial bridge and publishes the Ethereum mainnet bridge contract `0x71518580f36FeCEFfE0721F06bA4703218cD7F63`.
- Verus v1.2.17-3, released August 1, 2026, explicitly refers to the **latest Ethereum bridge hack** and links Verus's long-form security writeup.
- The linked Verus writeup says the project experienced **two back-to-back zero-day exploits targeting the Ethereum bridge** and explicitly distinguishes the second attack from the first.
- For the second exploit, Verus says the attacker bypassed the normal export creation/verification path and exploited an asymmetry in PBaaS versus Solidity deserialization of notarization proof-root data: when duplicate map keys were encountered, the daemon retained the first value while the contract overwrote it with the second. That semantic mismatch let the two sides hold different proof roots for the same serialized input.
- Verus says miners, stakers, and witnesses do not control or approve individual bridge transfers; do not model this as key/notary compromise merely because the bridge uses notarization.
- Independent on-chain research identifies the second-drain Ethereum transaction as `0xa1f1e65c1cea4dba4ae439cd4dcdba6cc2dbda0ed1228e61f29ae9c9324eb099` around 2026-07-23 03:45 UTC and reproduces the affected contract addresses and ERC-20 outflows.
- Contemporaneous reporting and technical research place the total near **USD 7.53–7.54 million**.
- The July incident must not inherit the May incident's attacker-return, backing-loss, restitution-credit, or bridge-restoration figures.

## First-party sources

### Verus official bridge documentation

```text
https://docs.verus.io/eth-bridge/
```

Supports entity identity, non-custodial Verus↔Ethereum scope, and the published Ethereum mainnet bridge-contract address.

### Verus v1.2.17-3 official release

```text
https://github.com/VerusCoin/VerusCoin/releases/tag/v1.2.17-3
```

Released 2026-08-01. It explicitly calls the event the `latest Ethereum bridge hack`, describes continuing hardening work, says Ethereum contracts are not yet ready for upgrade, and links the long-form Verus security writeup.

This source is stable, non-risky first-party incident authority and is sufficient to avoid creating a new incident-level primary-evidence gap.

### Verus official announcement channel

```text
https://t.me/s/TruthAndPrivacyForAll
```

The official announcement channel mirrors the v1.2.17-3 release and long-form writeup link. It also preserves the pre-July sequence:

- v1.2.17 — May exploit restoration/recovery plan;
- v1.2.17-1 — contract-upgrade/reopen voting;
- v1.2.17-2 — cross-chain functions disabled again after a newly discovered but reportedly unexploited issue;
- v1.2.17-3 — `latest Ethereum bridge hack` and new hardening release.

This timeline is important because it prevents the May and July incidents from being merged.

### Verus long-form security writeup

```text
https://docs.google.com/document/d/1R5kxmTa01gHJ5V7XdjyFphG_q5V02mtkyK7lOR6lV3w/edit?usp=sharing
```

The document title is `Verus Protocol Security in the AI Age`. It is direct first-party technical authority for the second exploit's serialization/deserialization asymmetry and for the fact that the first and second attacks differ materially.

`docs.google.com` is an existing BIR risky host. Current accepted source-quality limits allow at most 16 unique risky-host URLs without an archive, and BIR is already at that ceiling. Therefore this URL cannot be added unarchived without a separate accepted preservation result. The source may remain review authority, as with the Wanchain Medium postmortem, if canonical application relies on admitted non-risky first-party and reproducible technical sources for displayed claims.

## Secondary / reproducible technical evidence

### Ethereum transaction / contract package

Independent full-chain research publishes and marks as directly verified:

```text
Bridge proxy      0x71518580f36feceffe0721f06ba4703218cd7f63
Implementation    0x27c76df6912698e6d4c55aaa87cf88c30db90cf7
VerusProof        0x54e03a1682fd0bb065b669f6296f97028dcfd4ce
Attack tx         0xa1f1e65c1cea4dba4ae439cd4dcdba6cc2dbda0ed1228e61f29ae9c9324eb099
Initiator         0xbda71b58cec0b1c20a8f87ccd52fa0679747855c
Funds pool        0xCFd0A20703cD11E0b9f665e1C3F1Ef989C142D54
```

Source:

```text
https://sirenbow.com/research/verus-missing-check/
```

SIRENBOW states that its Ethereum-side transaction/address/outflow rows were independently checked, while clearly marking reported/inferred claims separately. It reports the second drain around 2026-07-23 03:45 UTC and approximately USD 7.54 million total impact.

### Contemporaneous news

CoinDesk's July 23 coverage independently reports approximately USD 7.54 million drained from the Verus-Ethereum Bridge and frames it as a second Verus incident in 2026.

```text
https://www.coindesk.com/tech/2026/07/23/bitcoin-ethereum-linked-protocols-lose-usd35-million-in-multiple-attacks-hours-apart
```

### DefiLlama

DefiLlama lists a Verus-Ethereum Bridge row around the July 22/23 boundary at approximately USD 7.53 million and labels the technique `Bridge Verification Bypass`.

Use DefiLlama as discovery/database corroboration only. Do not adopt its date/category as canonical first-party truth.

## Date boundary

The strongest reproducible transaction-time evidence places the Ethereum drain at approximately:

```text
2026-07-23 03:45 UTC
```

Some secondary databases label the event July 22, likely due to source/timestamp conventions. The canonical application should use:

```text
incident_date            2026-07-23
incident_date_precision  day
```

only after independently confirming the attack transaction timestamp from the direct explorer/on-chain source. If the direct transaction timestamp differs, the transaction timestamp wins over secondary database labeling.

## Root-cause / attack-vector boundary

The first-party long-form explanation describes a cross-system semantic verification failure:

- attacker-supplied serialized notarization data contained duplicate proof-root keys;
- the Verus daemon and Solidity contract deserialized that data differently;
- the daemon ignored the duplicate while the contract overwrote the prior map entry;
- the two systems therefore verified different in-memory proof-root states;
- the attacker bypassed the normal requirement for a real Verus export matching the Ethereum import.

The existing BIR category is sufficient:

```text
attack_vector_category: message_verification_failure
```

Do not create a new enum solely for serialization asymmetry.

Do not classify as:

- `validator_key_compromise`;
- `relayer_or_oracle_issue` merely because notarization exists;
- a generic reentrancy or ordinary smart-contract bug that erases the cross-system verification asymmetry.

The incident summary should preserve the implementation-level asymmetry without publishing exploit-reproduction instructions beyond already-public high-level root cause and identifiers needed for evidence verification.

## Amount / affected-assets boundary

Reviewed reporting converges around:

```text
reported_loss_usd_display  about $7.54 million
reported_loss_usd          7540000
loss_amount_basis          mixed_sources
amount_confidence          medium
```

The amount is not a first-party exact loss figure. Keep it explicitly approximate.

SIRENBOW's reproducible ERC-20 accounting identifies:

```text
tBTC      71.5045915
USDC      149,275.07
USDT      78,300.54
MKR       59.43
scrvUSD   92,784.36
EURC      31,475.66
```

It also verifies ETH outflow through internal transactions, while the approximately USD 7.54 million total relies on pricing/reporting rather than a single exact first-party valuation.

Do not invent per-asset USD values in canonical data unless a source with a clear contemporaneous valuation basis is admitted.

## Reference normalization required by application

Current BIR reference data already contains:

```text
chain   ethereum
assets  eth, usdc, usdt
```

A full affected-asset package would require new normalized keys for:

```text
chain   verus
assets  tbtc, mkr, scrvusd, eurc
```

`vrsc` may also be required for the bridge entity / source-side context, but it is not part of the reproduced July Ethereum-side drained-asset list above and should not be inserted into `reported_loss_assets` unless an admitted source says it was lost.

All new reference keys must be added only in the bounded canonical application and validated against the then-current corpus.

## Entity direction

Projected bridge identity after fresh-ID allocation:

```text
slug                    verus-ethereum-bridge
canonical_name          Verus-Ethereum Bridge
type                    asset_bridge
status                  paused
confidence              high
record_maturity         reviewed
update_status           current
major_incident_count    2
has_unresolved_incident true
```

The `major_incident_count: 2` direction is justified only if BIR recognizes both the May and July exploit as distinct major incidents in the bridge lifecycle. If the July incident is applied before a May canonical case is created, do not falsely claim two canonical incident records merely from the count field; either add the May case in a separately reviewed coordinated batch or retain a carefully documented lifecycle count consistent with BIR's existing semantics.

Operator/ecosystem direction:

```text
operator_name  Verus protocol contributors / Verus community
operator_type  protocol_team
ecosystem_name Verus
```

Finalize naming from first-party project metadata during application rather than guessing a corporate operator.

Latest explicit incident-era bridge state should remain `paused` until a dated post-July first-party bridge/cross-chain reopen statement is located. The pre-incident July 12 reopen process must not be used as post-incident restart proof.

## Incident direction

Projected fresh incident direction:

```text
slug                       verus-ethereum-bridge-2026-july-proofroot-deserialization-exploit
title                      Verus-Ethereum Bridge July 2026 proof-root deserialization exploit
incident_date              2026-07-23
incident_date_precision    day
incident_type              exploit
is_major_incident          true
reported_loss_usd_display  about $7.54 million
reported_loss_usd          7540000
loss_amount_basis          mixed_sources
amount_confidence          medium
recovery_status            unknown
reimbursement_status       unknown
restart_status             paused
current_outcome            paused_long_term
is_unresolved              true
attack_vector_category     message_verification_failure
postmortem_available       available
confidence                 high
record_maturity            reviewed
update_status              current
```

`postmortem_available: available` is supportable at review level because the official v1.2.17-3 release explicitly links the Verus long-form writeup about the latest bridge hack. Canonical evidence must still obey the risky-host preservation boundary; if the long-form document cannot be admitted, the incident may still cite the stable official release as primary and retain the document as review authority, provided displayed technical claims are independently supported by admitted evidence.

## Recovery / reimbursement / restart

Do not reuse May figures.

The May incident has its own first-party recovery and restitution plan. Those figures are not July recovery evidence.

For the July incident, keep:

```text
recovery_status       unknown
reimbursement_status  unknown
restart_status        paused
current_outcome       paused_long_term
is_unresolved         true
```

until July-specific sources establish otherwise.

v1.2.17-3 says the Ethereum contracts are not yet ready for upgrade and continues security/hardening work. Combined with the prior explicit cross-chain disable state, this supports a paused latest reviewed operational boundary; it does not prove a permanent shutdown.

Do not create:

- `funds_recovered`;
- `funds_returned`;
- `reimbursement_announced`;
- `reimbursement_completed`;
- `bridge_reopened`;

from May recovery material or from mere release availability.

## Separate May incident requirement

The May exploit is independently first-party supported and likely merits its own BIR incident review. It includes a distinct May 17/18 compromise, different exploit construction, asset-return/recovery activity, backing shortfall, restitution mechanics, and July restoration/reopen process.

Do not make the July incident a container for those facts.

After the July review/application path is stable, open a separate bounded May review unless a coordinated two-incident entity application is more internally consistent with BIR's `major_incident_count` semantics. Either way, each incident must retain its own evidence, loss, recovery, reimbursement and restart timeline.

## Source-quality / preservation boundary

The first-party GitHub release and official Verus documentation are non-risky stable sources. The long-form Google Doc is risky under BIR's current source-quality rule.

Current permanent ceilings remain:

```text
Bridges without primary          0
Bridges without Tier 1           0
Incidents without primary        <= 1
Incidents without Tier 1         <= 1
Events without primary           <= 11
Events without Tier 1            <= 6
Terminal unarchived URLs         <= 15
Risky-host unarchived URLs       <= 16
Unknown URL status               0
Source-count mismatches          0
```

Do not raise the risky-host ceiling to admit the Google Doc. Run a bounded exact-URL preservation review under the existing acceptance rule. If it fails, leave the document as review authority and construct canonical displayed claims only from the stable official release/documentation plus admitted reproducible secondary evidence.

## Next bounded action

After this review PR is merged:

1. run a two-pass exact-URL Wayback preservation review for the Verus Google Doc under the existing 65,536-byte replay threshold;
2. if the capture passes, admit the archived first-party long-form source in the later canonical application;
3. if preservation fails, do not relax the threshold; retain v1.2.17-3 as primary incident authority and limit technical canonical claims to what admitted sources can support;
4. independently verify the attack transaction timestamp and reproduced outflow package;
5. decide whether to apply the bridge plus July incident first or to coordinate a separate May review before setting `major_incident_count`;
6. allocate all IDs from fresh then-current `main`;
7. add only the reference keys actually needed by the accepted record;
8. run schema, enum, full-corpus, exact source-count, source-quality, build, accessibility, performance, dist-consistency, browser, representative screenshot and production-equality gates before canonical closure.

This review does not authorize exploit reproduction or security bypass instructions; BIR records evidence-backed incident history and high-level technical cause only.