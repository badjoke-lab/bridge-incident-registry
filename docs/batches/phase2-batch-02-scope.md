# Phase 2 Batch 2 Scope

## Purpose

Phase 2 Batch 2 expands BIR with three incident patterns that were not yet well represented in the canonical dataset:

- repeated bridge-contract exploitation
- frontend / DNS infrastructure hijacking
- token-approval exploitation followed by partial fund recovery

## Added candidates

### 1. ChainSwap

Canonical result:

```text
1 bridge entity
2 incident records
6 timeline events
5 evidence records
```

Included incidents:

- July 2, 2021 exploit — approximately $800,000 official estimate
- July 10–11, 2021 quota exploit — approximately $4 million official estimate

Modeling decisions:

- the two July incidents remain separate
- official ChainSwap amount wording is used
- compensation announcements are not treated as proof of final completion
- the August 2021 relaunch is recorded separately

### 2. Celer cBridge

Canonical result:

```text
1 bridge entity
1 incident record
4 timeline events
4 evidence records
```

Included incident:

- August 2022 DNS/frontend hijacking — approximately $240,000 reported

Modeling decisions:

- the underlying bridge contracts are not described as the primary compromise
- frontend unavailability is separated from protocol shutdown
- compensation remains announced rather than completed
- current operation is verified separately

### 3. SOCKET Protocol / Bungee

Canonical result:

```text
1 bridge/interoperability entity
1 incident record
4 timeline events
5 evidence records
```

Included incident:

- January 2024 Socket Gateway approval exploit — approximately $3.3 million reported

Modeling decisions:

- SOCKET is the canonical entity
- Bungee and Socket Gateway remain product / alias context
- the recovered 1,032 ETH is recorded separately from the incident loss amount
- final recovery distribution remains unresolved

## Duplicate and scope check

No existing canonical records matched:

```text
ChainSwap
Celer cBridge
SOCKET Protocol
Bungee
```

Checks covered:

- normalized name
- slug
- aliases
- official domain
- predecessor / successor relationships

## Final batch shape

```text
Bridges     +3
Incidents   +4
Events      +14
Evidence    +14
```

Canonical totals after merge:

```text
Bridges     16
Incidents   20
Events      65
Evidence    84
```

## Quality rules applied

- primary sources prioritized for incident acknowledgment, pause, restart, compensation, and recovery claims
- security-firm or reputable secondary analysis used for technical-cause and amount support
- reported loss and recovered amounts kept separate
- uncertainty preserved in unresolved fields and notes
- exploit-reproduction instructions excluded
- temporary generators and write-enabled workflows removed before merge

## Validation result

The final canonical branch passed:

```text
Astro/type check
canonical data validation
first-ten audit
static site build
```
