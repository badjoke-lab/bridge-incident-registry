# Record growth Batch 21 — tranche 03 allocation

Baseline main: `75ed4291f056360974d5215f1c30df0494e9e572`
Baseline counts: 77 bridges / 56 incidents / 257 events / 415 evidence.

## Allocated candidate

HECO Bridge / HECO cross-chain gateway, incident date 2023-11-22.

### IDs

- `bir_bridge_000078` — HECO Bridge
- `bir_inc_000057` — HECO Bridge 2023 operator-key compromise
- `bir_ev_000258` — exploit detected and affected gateway/services suspended
- `bir_src_000417` — HTX official attack notice
- `bir_src_000418` — CertiK Heco Bridge Exploit analysis

`bir_src_000416` was already occupied by the Hyperbridge relaunch evidence from tranche 01. The first applicator run detected this through exact source-count failure before any canonical data commit; HECO evidence was then reallocated to 417/418 and all data/source-quality gates passed.

### Canonical amount boundary

Use approximately USD 86.6 million as the bridge-specific reported-loss estimate from independent technical analysis. Do not combine it with or replace it by HTX's separately reported hot-wallet loss.

### Unknown fields that stay unknown

- bridge-specific recovered amount
- bridge-specific reimbursement completion
- unrestricted HECO Bridge restart date
- long-term/current operational outcome beyond the evidence-bounded suspension state

### Chain reference boundary

HECO does not have a dedicated canonical chain-reference key in BIR. Preserve Ethereum plus `unknown` rather than creating a new reference key inside this record-growth batch.

### Validated canonical result

Canonical data application passed:

- `validate:data`
- `validate:enums`
- `audit:full-corpus`
- `audit:source-count`
- `audit:source-quality`

Resulting counts: 78 bridges / 57 incidents / 258 events / 417 evidence.

Full build/dist/browser/Series checks remain the PR admission gate and are not weakened.
