# Record-growth Batch 21 canonical allocation

Issue: #447
Branch: `canonical/growth-batch-21-incident-heavy`
Base: `main` @ `61695f4fbdd215c9d55d70104df3a8c7f8dfe5e9`

This allocation is limited to the first clean incident tranche after direct duplicate inspection and evidence review.

## Baseline tails

- bridge: `bir_bridge_000075`
- incident: `bir_inc_000054`
- event: `bir_ev_000252`
- evidence: `bir_src_000411`

## Bridge allocation

- `bir_bridge_000076` — Dusk to EVM Bridge
- `bir_bridge_000077` — Hyperbridge Token Gateway / Hyperbridge bridging service

## Incident allocation

- `bir_inc_000055` — Dusk Bridge 2026 signing-wallet compromise
- `bir_inc_000056` — Hyperbridge 2026 forged-proof / MMR-verifier exploit

## Initial event allocation

Only source-supported incident/response boundaries are reserved.

### Dusk

- `bir_ev_000253` — Dusk bridge signing-wallet compromise, 2026-01-16
- `bir_ev_000254` — Dusk bridge post-incident remediation/hardening disclosure, 2026-03-10

`bir_ev_000254` must not be promoted to a reopening event unless the admitted first-party text establishes an actual dated restart rather than remediation work alone.

### Hyperbridge

- `bir_ev_000255` — Hyperbridge Token Gateway exploit and bridge pause, 2026-04-13
- `bir_ev_000256` — Hyperbridge revised loss/recovery assessment, 2026-04-16
- `bir_ev_000257` — Hyperbridge postmortem / permanent verifier remediation disclosure, 2026-05-14

A separate reopening event is not allocated until the exact first-party relaunch date/source is admitted during canonical application.

## Evidence allocation

Start at `bir_src_000412`.

Planned minimum package:

- `bir_src_000412` — Dusk first-party bridge incident postmortem
- `bir_src_000413` — Dusk second event-scoped first-party evidence only if the same postmortem cannot legitimately support both event boundaries under current evidence-link rules; otherwise reserve for independent corroboration
- `bir_src_000414` — Hyperbridge initial first-party security update
- `bir_src_000415` — Hyperbridge first-party recovery/revised-scope update
- `bir_src_000416` — Hyperbridge first-party full postmortem
- `bir_src_000417` — BlockSec independent Hyperbridge technical analysis

No evidence object is added merely to fill an ID. Unused reserved IDs may remain unused.

## Duplicate boundary

Direct canonical inspection superseded code-search-only intake:

- Syscoin UTXO–NEVM Bridge is already `bir_bridge_000034`.
- TAC Inner Bridge is already `bir_bridge_000035` / `bir_inc_000037`.
- Taiko Bridge is already `bir_bridge_000031` / `bir_inc_000033`.
- no Dusk bridge entity/incident was found.
- no Hyperbridge entity/incident was found.

## Hold pool

No IDs are allocated yet for:

- ICON migration bridge / SODAX withdrawal path — entity boundary unresolved.
- thirdweb legacy Bridge — legacy-contract vs current-product boundary unresolved.
- Garden 2026 — still deferred absent stronger primary/Tier 1 package.
- Gravity Bridge 2026 — still deferred absent stronger first-party/Tier 1 package and authoritative mechanism resolution.

## Guardrails

- Dusk is a bridge signing-wallet/service compromise, not a Dusk consensus exploit.
- Hyperbridge amount uses later reconciled first-party scope; do not freeze the initial ~$237k figure as the final canonical loss.
- Hyperbridge native Polkadot consensus and unrelated assets/routes must not be marked compromised where the first-party source excludes them.
- Unknown recovery/reimbursement/restart details stay unknown.
- Canonical application must run source-count, source-quality no-regression, schema, full-corpus, build, dist, performance, accessibility, browser and Series checks without weakening ceilings.
