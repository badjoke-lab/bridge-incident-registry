# Verus first-party Google Doc archive preservation review

Status: complete — no admissible capture found; long-form source remains review authority only  
Reviewed: 2026-08-20  
Issue: #324  
Review authority PR: #325  
Archive review PR: #326  
Archive review run: `32277150515`  
Archive review job: `96147145948`

## Source reviewed

Exact first-party URL linked by Verus v1.2.17-3:

```text
https://docs.google.com/document/d/1R5kxmTa01gHJ5V7XdjyFphG_q5V02mtkyK7lOR6lV3w/edit?usp=sharing
```

Publication/admission not-before boundary:

```text
2026-08-01
```

## Acceptance boundary

The review reused the existing permanent BIR risky-host archive boundary without modification:

- exact source URL only;
- capture date no earlier than the source publication boundary;
- HTTP 200 replay;
- HTML content type;
- replay body at least 65,536 bytes;
- two independent discovery/replay passes;
- query/transport failure is not treated as a zero-capture result.

`docs.google.com` is an existing BIR risky host. The accepted `risky_host_unarchived` ceiling remains 16 and is not relaxed by this review.

## Pass 1

```text
CDX rows        0
Checked replay  0
Accepted        0
```

No exact 2026 Wayback capture was returned.

## Pass 2

```text
CDX rows        0
Checked replay  0
Accepted        0
```

The independent second pass reproduced the same zero-capture result.

## Final result

```text
Checked replays across two passes   0
Accepted captures                   0
Transport/query failures            0
```

The review executed successfully. The result is evidence-blocked for this specific risky source, not execution-blocked.

## Canonical consequence

Do **not** add the Google Doc URL to canonical evidence without an accepted archive capture while the risky-host ceiling is already at 16.

Unlike the AFX case, this does **not** necessarily block the Verus July incident from all canonical application, because a stable non-risky incident-specific first-party source exists:

```text
https://github.com/VerusCoin/VerusCoin/releases/tag/v1.2.17-3
```

That official release explicitly refers to the `latest Ethereum bridge hack`, links the long-form Verus writeup, and establishes first-party incident existence. The official Verus bridge documentation separately establishes bridge identity and contract scope.

Therefore the accepted application direction is:

1. keep the Google Doc as **review authority only** until an admissible archive appears;
2. use official Verus v1.2.17-3 / official bridge documentation as non-risky Tier 1 primary incident/entity evidence;
3. use reproducible Ethereum/on-chain and non-risky secondary technical sources for displayed claim-level mechanism/amount details;
4. do not present technical details that are supported only by the unadmitted Google Doc unless an admitted source independently supports them;
5. keep May and July 2026 incidents separate;
6. do not raise `risky_host_unarchived`, lower the 65,536-byte threshold, or weaken any source-tier rule.

## Scope

This audit changes no canonical JSON, schema, enum, source-quality ceiling, archive threshold, performance budget, route, verifier, or production state.