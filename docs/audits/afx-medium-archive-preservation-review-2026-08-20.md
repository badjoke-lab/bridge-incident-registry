# AFX first-party Medium archive preservation review

Status: complete — no admissible capture found; canonical application remains evidence-blocked  
Reviewed: 2026-08-20  
Issue: #303  
Review authority PR: #319  
Archive review PR: #320  
Archive review run: `32271835270`  
Archive review job: `96129893451`

## Purpose

Issue #303 / PR #319 approved a bounded canonical direction for the July 22, 2026 AFX-operated custody-bridge incident, but deliberately blocked canonical application until at least one incident-specific AFX first-party source satisfied BIR's existing preservation/source-quality boundary.

Both located AFX first-party incident publications are hosted on `medium.com`, which is an existing BIR risky host. The permanent quality ceiling remains:

```text
risky_host_unarchived unique URLs <= 16
```

This review does not relax that ceiling.

## Sources reviewed

1. Detailed AFXTrade post-mortem, publication date 2026-07-31:

```text
https://medium.com/@AFXTrade/a-detailed-post-mortem-on-the-afx-security-incident-57d564ef812f
```

2. Preliminary AFXTrade incident report, publication date 2026-07-25:

```text
https://medium.com/@AFXTrade/afx-bridge-incident-what-happened-what-we-learned-and-what-comes-next-d97387746012
```

## Acceptance boundary

The review reused the existing Wanchain preservation boundary without modification:

- exact source URL only;
- capture date no earlier than the source publication date;
- replay must return HTTP 200;
- replay content type must be HTML;
- replay body must contain at least 65,536 bytes;
- two independent discovery/replay passes;
- query/transport failure is not allowed to masquerade as a zero-capture result.

## Pass 1

### Detailed post-mortem

```text
CDX rows        0
Accepted        0
```

No exact 2026 Wayback capture was returned for the detailed July 31 post-mortem.

### Preliminary incident report

One exact capture was returned:

```text
Timestamp       20260725085734
HTTP            200
Content-Type    text/html; charset=utf-8
Replay bytes    56,015
Threshold       65,536
Result          rejected
```

Replay URL:

```text
https://web.archive.org/web/20260725085734id_/https://medium.com/@AFXTrade/afx-bridge-incident-what-happened-what-we-learned-and-what-comes-next-d97387746012
```

The capture is after the source publication boundary and is an HTTP 200 HTML replay, but it is **9,521 bytes below** the permanent minimum body-size acceptance rule. It is not admitted.

## Pass 2

The independent second discovery/replay pass reproduced the same outcome.

### Detailed post-mortem

```text
CDX rows        0
Accepted        0
```

### Preliminary incident report

```text
Timestamp       20260725085734
HTTP            200
Content-Type    text/html; charset=utf-8
Replay bytes    56,015
Threshold       65,536
Result          rejected
```

No additional digest/capture candidate was returned.

## Final result

```text
Checked replays across two passes   2
Accepted captures                   0
Transport/query failures            0
```

The bounded review executed successfully. The result is evidence-blocked, not execution-blocked.

## Canonical consequence

Do **not** open the AFX canonical application from this preservation result.

The canonical direction approved in PR #319 remains valid as a reviewed draft boundary, including:

- July 22, 2026 incident date;
- AFX-operated custody-bridge scope;
- supply-chain / internal-infrastructure compromise preceding validator compromise;
- existing `validator_key_compromise` registry category;
- exact 24,150,000 USDC on-chain amount boundary;
- explicit exclusion of an Arbitrum-network or native-Arbitrum-bridge exploit;
- recovery unresolved;
- reimbursement no stronger than announced, and only if an admissible first-party source preserves that claim;
- restart/reopen unverified.

But BIR must not consume a new avoidable incident-level primary-evidence gap or raise the risky-host-unarchived ceiling to publish this candidate.

Issue #303 therefore remains open with the disposition:

```text
reviewed candidate / evidence-blocked
```

Canonical application may resume only if one of the following occurs:

1. a new exact archive capture of either first-party AFX incident publication satisfies the unchanged preservation rules; or
2. a stable non-risky first-party AFX incident statement/post-mortem with equivalent claim support is located and admitted.

Secondary CoinDesk/Halborn reporting and the reproducible Arbitrum transaction remain useful corroboration, but they are not a substitute for the blocked first-party incident evidence.

## Scope

This audit is review-only. No canonical JSON, schema, enum, source-quality ceiling, performance budget, route, verifier, or production state is changed.