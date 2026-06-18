# Phase 2 Batch 6 Scope

## Purpose

Batch 6 covers cross-chain aggregation and routing incidents where the affected layer differs from an underlying bridge reserve or messaging network.

## Selected candidates

1. Transit Swap
2. Rubic
3. Unizen
4. Magpie Protocol

## Provisional shape

```text
Bridges     +4
Incidents   +5 to +6
Events      +20 to +28
Evidence    +28 to +38
```

## Core boundary rule

Each record must distinguish the affected project layer from integrated bridges, DEXs, wallets, and messaging systems. Integrated providers are not marked affected without direct evidence.

## Completion gate

Canonical implementation begins only after entity names, incident counts, source requirements, current status, and recovery or reimbursement claims have been reviewed.
