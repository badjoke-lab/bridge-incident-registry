# Phase 2 Batch 2 Scope

## Purpose

Phase 2 Batch 2 expands BIR with three incident patterns that are not yet well represented in the canonical dataset:

- repeated bridge-contract exploitation
- frontend / DNS infrastructure hijacking
- token-approval exploitation followed by partial fund recovery

The batch remains review-gated. Candidate inclusion can still be revised if source verification or entity-boundary review fails.

## Selected candidates

### 1. ChainSwap

Proposed record shape:

```text
1 bridge entity
2 incident records
multiple pause, compensation, token-migration, and aftermath events
```

Why included:

- ChainSwap published official post-mortems for two separate July 2021 exploits.
- The July 2 incident was estimated by the team at approximately $800,000.
- The July 10–11 incident was described by the team as affecting 20 bridged assets with a combined value of approximately $4 million.
- The two incidents support a useful repeated-incident timeline rather than a single isolated exploit record.

Key modeling questions:

- verify current entity status and official-domain condition
- keep the two July incidents separate
- use official amount wording where secondary estimates conflict
- distinguish user/project compensation from full bridge-level reimbursement
- model token replacement or migration only where supported by affected-project or ChainSwap evidence

Initial sources:

- https://chain-swap.medium.com/chainswap-post-mortem-and-compensation-plan-90cad50898ab
- https://chain-swap.medium.com/chainswap-exploit-11-july-2021-post-mortem-6e4e346e5a32
- https://chain-swap.medium.com/asap-token-important-update-67073aae925c

### 2. Celer cBridge

Proposed record shape:

```text
1 bridge entity
1 incident record
pause, revocation advisory, compensation commitment, and restart events
```

Why included:

- The August 2022 incident was a frontend / DNS hijacking case rather than a bridge-contract exploit.
- Users were redirected toward malicious contracts through the cBridge frontend.
- Celer paused the frontend, advised users to revoke approvals, committed to compensate affected users, and restored the UI with additional monitoring.
- This incident adds an important infrastructure-layer failure mode to BIR.

Key modeling questions:

- explicitly state that the bridge contracts themselves were not the primary compromise
- separate frontend unavailability from protocol shutdown
- verify the final compensated amount and whether compensation completed
- use approximately $240,000 only with source qualification
- retain active status if current operation is verified

Initial sources:

- https://x.com/CelerNetwork/status/1560046913436946432
- https://cryptoslate.com/celer-network-cbridge-resumes-operation-after-suffering-dns-exploit/
- https://dailycoin.com/celer-network-suspects-dns-hijacking-shuts-its-cbridge/
- https://cbridge.celer.network/

### 3. Socket / Bungee

Proposed record shape:

```text
1 bridge or interoperability entity
1 incident record
pause, patch, restart, fund-recovery, and distribution-plan events
```

Why included:

- The January 16, 2024 incident affected wallets with prior approvals to Socket contracts.
- The reported loss was approximately $3.3 million.
- Socket paused affected contracts, removed the vulnerable route, and restored operation quickly.
- The team later reported recovery of 1,032 ETH, approximately $2.3 million at the time.
- The recovery timeline provides a distinct partial-recovery case.

Entity-boundary rule for this batch:

- begin with one canonical entity centered on Socket
- record Bungee and Socket Gateway as product / alias context
- do not split Socket and Bungee into separate canonical entities unless evidence and UI behavior require it

Key modeling questions:

- distinguish protocol, gateway contract, and Bungee product naming
- verify affected-user count before canonical publication
- keep the $3.3 million amount qualified as reported
- record 1,032 ETH separately from the fiat estimate
- verify whether the announced recovery and distribution plan reached completion

Initial sources:

- https://x.com/SocketDotTech/status/1747349422730813525
- https://x.com/SocketDotTech/status/1747363921265344812
- https://www.certik.com/blog/3QR5sltpG4lmpau6S6mWcm-socket-tech-incident-analysis
- https://crypto.news/socket-recovered-1032-eth-following-bridge-protocol-exploit/
- https://www.socket.tech/

## Duplicate and scope check

Repository search found no existing canonical references for:

```text
ChainSwap
Celer cBridge
Socket
Bungee
```

Before record creation, the canonical JSON files must still be checked directly by:

- normalized name
- slug
- aliases
- official domain
- predecessor / successor relationships

## Expected batch shape

Provisional only:

```text
Bridges     +3
Incidents   +4
Events      +12 to +18
Evidence    +15 to +24
```

Exact counts are not fixed until source review and canonical modeling are complete.

## Quality rules

- primary sources are preferred for incident acknowledgment, pause, restart, compensation, and recovery claims
- security-firm or reputable secondary analysis may support technical-cause and amount fields
- conflicting amount estimates must not be silently collapsed
- exploit-reproduction instructions are out of scope
- uncertainty must be preserved in `known_unknowns`, `unresolved_reason`, notes, and confidence fields
- temporary generators or write-enabled workflows must not remain after canonical files are committed

## Completion conditions

The batch is complete only when:

1. entity boundaries are resolved
2. duplicate checks pass
3. incident and aftermath timelines are supported by evidence
4. canonical validation passes
5. first-ten audit remains clean
6. Astro/type checks pass
7. the static site builds successfully
8. temporary generation tooling has been removed
