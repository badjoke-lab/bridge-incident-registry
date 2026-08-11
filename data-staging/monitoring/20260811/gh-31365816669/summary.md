# BIR Auto Monitoring Report — 20260811

Run: `gh-31365816669`

## Canonical guard

- Bridges: 34
- Incidents: 36
- Events: 185
- Evidence: 293
- Unknown URL status: 0
- Reference errors: 0

## New or changed findings

- **Review Oraichain 2026-08-08 bridge-hack signal** — medium — review_signal
  - ## Status

Monitoring signal / needs evidence. **Do not canonicalize from this issue alone.**

## Trigger

BIR Monitoring rerun `31365816669`, attempt 3, job `93679753427` detected a new DefiLlama bridge-hack row and persisted it in PR #268.

```text
Candidate              Oraichain
Candidate class        C
Record shape           hold
Feed date              2026-08-08
Classification         Bridge & Cross-Chain
Technique              Unbacked Cross-Chain Mint
Target                 Chain
Feed amount_usd        0
Exact BIR identity     unresolved
```

The monitoring candidate ID is `defillama_hack_eacb0ad98e50bd41`.

## Current evidence boundary

DefiLlama is a secondary discovery database and is not canonical evidence by itself.

Current official Oraichain documentation confirms that OBrid
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/270

## Candidate watchlist

- **Oraichain** — B — Review Oraichain 2026-08-08 bridge-hack signal
  - https://github.com/badjoke-lab/bridge-incident-registry/issues/270
  - Next: review_for_canonical_boundary

## Safety

Monitoring output is review material only. No canonical record was changed or published automatically.

