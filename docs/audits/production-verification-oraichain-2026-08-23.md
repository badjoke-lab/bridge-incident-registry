# Oraichain post-merge production verification — 2026-08-23

Verification-only checkpoint for exact merged main `99405bc7d4e1b3d2aea62314a607dc00656e823b` after PR #362.

Expected native production state:

- 42 bridges
- 45 incidents
- 210 events
- 347 evidence
- Oraichain bridge route: `/bridge/oraichain-evm-cross-chain-transfer-path/`
- Oraichain incident route: `/incident/oraichain-2026-evm-cross-chain-unauthorized-mint/`

The unchanged Production Verification workflow must perform read-only equality checks against `https://bir.badjoke-lab.com` and must not mutate production, change deployment configuration, relax verification, or alter canonical data.

Acceptance is a successful production-verification run on the exact verification branch. This PR is to be closed without merge after evidence capture.
