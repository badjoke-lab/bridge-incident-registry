# Boltz 2026 security-driven swap shutdown recheck

Status: review complete — canonical single-incident inclusion remains blocked  
Reviewed: 2026-08-23  
Issue: #171

## First-party update

Boltz's current first-party site now preserves the August 3, 2026 shutdown statement directly. It establishes that swap services remain disabled until further notice after a sustained increase in automated and AI-assisted probing, several contained exploits, and recent internal security-scan findings. Boltz states that its API remains available for cooperative refunds, unilateral refunds remain possible, support remains available, and no user funds were at risk.

## Critical boundary

Boltz explicitly says the shutdown is **not a response to a single incident**. The statement refers to multiple contained exploits and a broader security asymmetry over several months. Therefore BIR must not collapse this material into one asserted exploit incident with an invented root cause, date, route, affected chain, asset, or loss amount.

## Canonical consequence

No canonical incident_case is authorized from this review alone.

The current safe interpretation remains:

- Boltz is a bridge/hybrid product whose swap services are disabled for security reasons;
- the shutdown is first-party confirmed;
- several exploits occurred, but their individual technical boundaries are undisclosed in the reviewed material;
- no user-fund loss is reported by Boltz;
- refund paths remain available;
- restart timing is explicitly unresolved.

A future canonical change should occur only when a discrete exploit/security advisory becomes separately attributable, or when Boltz publishes a final lifecycle outcome such as restart, migration, permanent shutdown, or replacement.

## Current first-party locator

- https://boltz.exchange/
- preserved operator statement dated 2026-08-03 on the homepage

## Disposition

Issue #171 remains open as a lifecycle/security boundary rather than an incident ready for canonicalization.

Canonical JSON delta: 0.
