# ChainConnect 2026 bridge incident review

Status: review complete — approved for bounded canonical application with unresolved restart and gross-loss guards  
Reviewed: 2026-08-19  
Canonical data changed by this review: no

## Baseline

```text
Bridges     37
Incidents   39
Events      191
Evidence    303
```

No ChainConnect bridge entity or incident currently exists in canonical BIR data.

This review evaluates the July 2026 ChainConnect security incident for a fresh bridge entity and incident. It does not apply canonical JSON changes.

## Disposition

**Approve a new ChainConnect bridge entity and one July 2026 incident, subject to the bounded guards below.**

The reviewed record supports the following without promoting secondary or inferred claims into first-party fact:

- ChainConnect's official channel states that its EVM integration suffered a security breach, EVM bridge-contract liquidity was drained, and bridge operations were paused while the exploit was investigated.
- Venom Foundation states that the incident occurred on **2026-07-26** and was caused by an application-level access-control flaw in `ProxyMultiVaultAlien_V10.onCheckAccumulatedFee`, where sender verification was missing.
- The flaw allowed unbacked Alien TIP-3 tokens to be minted and then bridged to Ethereum through the normal bridge flow.
- Venom explicitly states that the incident was not a compromise of Venom, TVM, TIP-3, network infrastructure, relays, keys, or privileged access.
- Venom states that ChainConnect patched the vulnerability across affected deployments and reviewed callback/minting logic.
- Venom reports **82.9% of affected funds, approximately USD 615k, returned**, with **17.1% retained as a bounty**.
- Independent on-chain monitoring records ChainConnect-authored recovery messages and a **280 ETH** return on 2026-07-31.
- ChainConnect's current documentation describes a multi-chain EVM↔TVM asset bridge and documents the Proxy/MultiVault architecture relevant to the safe high-level incident description.

## Source review

| Ref | Source | Tier / role | Reviewed support | Admission plan |
|---|---|---|---|---|
| A | https://t.me/chainconnect_news/6 | Tier 1 / ChainConnect official social | EVM integration incident; EVM bridge-contract liquidity drain; bridge pause; no connected-wallet compromise | admit |
| B | https://t.me/chainconnect_news/9 | Tier 1 / ChainConnect technical post-mortem locator | direct ChainConnect post-mortem URL linked by Venom; retain as primary incident/post-mortem evidence | admit |
| C | https://t.me/VenomFoundationOfficial/408 | Tier 1 / ecosystem official statement | investigation; all bridge operations temporarily suspended; incident limited to ChainConnect rather than Venom Network | admit |
| D | https://t.me/VenomFoundationOfficial/410 | Tier 1 / ecosystem official post-mortem summary | July 26 date; callback sender-verification flaw; scope exclusions; patch; 82.9% / ~USD 615k return; 17.1% bounty | admit |
| E | https://docs.chainconnect.com/en/relay-based/reference/architecture.html | Tier 1 / official documentation | current EVM↔TVM bridge architecture; Proxy/MultiVault/relay roles | admit for entity and architecture context |
| F | https://t.me/s/defimon_alerts | Tier 2 / on-chain monitoring | ChainConnect-authored recovery negotiation and confirmation; 280 ETH return on July 31; distinguishes recovery/bounty from reimbursement | admit as corroboration |
| G | https://etherscan.io/tx/0xe78bfae09b6b8fab1057f472f605044dea8d066b73e5012837050a5bc6d6eb00 | Tier 2 / on-chain transaction reference | 280 ETH return transaction identified by the ChainConnect-authored recovery message | admit as recovery transaction reference |
| H | https://hacked.slowmist.io/?c=Bridge&page=1 | Tier 2 / security database | approximately USD 650k gross incident estimate and broader EVM deployment context | admit only as secondary amount corroboration if the current entry remains available at application time |

The application must re-check every live URL immediately before merge and preserve the current risky-host ceiling. Telegram is not currently counted as an accepted risky host; this review does not authorize weakening source-quality guards.

## Critical amount boundary

Do **not** convert the first-party recovery figure into a gross loss figure.

The admitted material currently contains different scopes:

```text
secondary gross estimate      approximately USD 650k
first-party returned amount   approximately USD 615k
first-party return ratio      82.9%
first-party retained bounty   17.1%
on-chain returned transfer    280 ETH
```

Those values are not arithmetically interchangeable because scope and valuation timing are not established as identical. The canonical application should therefore prefer:

```text
reported_loss_usd             null
reported_loss_usd_display     null
amount_confidence             disputed or medium, according to current validator vocabulary
```

`reported_loss_text` and `amount_note` may preserve the secondary approximately-USD-650k gross estimate while explicitly separating it from the first-party recovery figures. A single exact USD loss must not be invented.

## Approved canonical action

### New bridge — projected `bir_bridge_000038`

The application must allocate IDs from fresh `main`; this projected ID is not reserved.

Approved direction:

```text
slug                  chainconnect
canonical_name        ChainConnect
type                  asset_bridge
status                paused
confidence            high
record_maturity       reviewed
update_status         current
major_incident_count  1
has_unresolved_incident true
```

Entity notes should describe ChainConnect as a multi-chain EVM↔TVM bridge and keep Broxus/operator wording qualified to what the first-party app/channel actually supports.

Do not mark the entity active solely because the web application or documentation is reachable. The latest explicit incident-era first-party operational status in the admitted set is a bridge pause, followed by a patch statement without a dated reopen statement.

### Chain normalization

The current `data/reference/chains.json` does not contain a `venom` key. The application is approved to add:

```json
"venom": {
  "display_name": "Venom",
  "aliases": ["Venom Network", "Venom 2.0"]
}
```

Use existing normalized keys such as `ethereum`, `bnb-chain`, `avalanche`, and `ton` only where admitted evidence supports their use. Do not create unnecessary chain keys merely to make the entity list exhaustive.

### New incident — projected `bir_inc_000040`

```text
bridge_id                  projected new ChainConnect bridge ID
slug                       chainconnect-2026-alien-proxy-callback-exploit
title                      ChainConnect 2026 Alien Proxy callback exploit
incident_date              2026-07-26
incident_date_precision    day
incident_type              exploit
is_major_incident          true
reported_loss_usd          null
recovery_status            partial_recovery
reimbursement_status       unknown
restart_status             paused
current_outcome            unknown
is_unresolved              true
attack_vector_category     smart_contract_bug
postmortem_available       available
confidence                 high
record_maturity            reviewed
update_status              current
```

Safe canonical summary boundary:

> On July 26, 2026, an unauthorized caller exploited missing sender verification in a ChainConnect Alien Proxy callback on Venom 2.0, enabling unbacked Alien TIP-3 minting and transfer through the bridge flow to Ethereum. ChainConnect paused the bridge and patched affected deployments. Venom later reported that 82.9% of affected funds, approximately USD 615k, had been returned while 17.1% was retained as a whitehat bounty. A dated post-incident bridge reopening has not been established in the admitted source set.

Do not state or imply that Venom itself, TVM, relay consensus, validator keys, bridge keys, or privileged access were compromised.

### Recovery versus reimbursement

`recovery_status: partial_recovery` is approved because first-party evidence explicitly states that 82.9% was returned and 17.1% retained as bounty.

`reimbursement_status` must remain `unknown` unless separate evidence establishes affected-user or bridge-liability reimbursement. Attacker-fund return and whitehat settlement are not user reimbursement.

### Restart and current outcome

Keep:

```text
restart_status    paused
current_outcome   unknown
is_unresolved     true
```

until a dated first-party statement after 2026-07-26 establishes reopening or a later terminal outcome.

A Venom statement that ChainConnect was fully functional on **2026-07-16** is pre-incident lifecycle context. It must not be reused as post-incident restart evidence.

Approved unresolved reasons / known unknowns:

- a single first-party gross USD loss figure has not been established;
- the approximately USD 650k secondary gross estimate and approximately USD 615k first-party returned valuation use different claim scopes and must not be silently reconciled;
- final reimbursement, if any, is not established;
- a dated post-incident bridge reopening is not established;
- current operational outcome of the incident-affected bridge routes remains unverified in the admitted incident-era first-party record.

### Events

Use a bounded timeline rather than multiplying inferred milestones.

Approved minimum shape:

1. incident / pause event tied to 2026-07-26, recording the exploit and the documented immediate bridge suspension without implementation-level reproduction detail;
2. recovery event tied to 2026-07-31, recording the 280 ETH return and whitehat-bounty settlement evidence;
3. post-mortem / patch event only if its publication date is independently admitted with appropriate date precision.

Do not create a `bridge_reopened` event without new first-party evidence.

### Evidence

The new incident and each incident event must have Tier 1 primary support wherever a primary source exists. The application should allocate current evidence IDs from fresh `main` and should not consume the existing primary/Tier-1 gap allowance.

## Projected post-application counts

A conservative two-event / seven-evidence application would produce approximately:

```text
Bridges     38
Incidents   40
Events      193
Evidence    310
```

Counts are projections only. Exact event/evidence counts must be recomputed from the admitted application package and source-count equality must remain exact.

## Source-quality boundary

The application is acceptable only if existing no-regression guards remain green:

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

## Application boundary

This review is review-only. After it is merged, canonical application must use a **fresh branch from the then-current `main`**. The application PR must:

1. allocate IDs from current main rather than trusting the projected IDs in this review;
2. add the Venom chain reference and only the bounded ChainConnect bridge/incident/events/evidence needed by the admitted record;
3. preserve the gross-loss / returned-value / bounty distinction;
4. preserve recovery versus reimbursement semantics;
5. preserve the post-incident restart unknown instead of using the pre-incident July 16 maintenance completion;
6. pass canonical validation, enum validation, exact source-count audit, source-quality no-regression, build, accessibility, performance, browser compatibility, and release-readiness gates;
7. run production-content equality after merge because canonical/public output changes.

No canonical mutation is authorized by this review outside that bounded follow-up PR.