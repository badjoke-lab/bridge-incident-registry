# Batch 06 production verification

Audit-only production verification trigger for record-growth Batch 06.

Expected canonical/public state after publication convergence:

- bridges: 58
- incidents: 51
- events: 232
- evidence: 383

Verify complete canonical/public dataset equality, all bridge and incident dossier routes, redirects, and Ledger Series output. Newly added bridge routes include `/bridge/mayan/`, `/bridge/rhino-fi/`, and `/bridge/squid/`.

This branch/PR is verification-only and must be closed without merge after the production verifier completes.
