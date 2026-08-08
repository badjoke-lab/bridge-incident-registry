# Phase 3 Archive Capture Batch 17 review — 2026-08-09

Status: complete review only  
Canonical data changed: no

## Execution

```text
Review run       31264932233
Review job       93121441155
Branch           agent/phase3-archive-capture-batch17-review
Selected URLs    10
Approved URLs     4
Approved records  4
```

The review reused the established bounded archive-capture reviewer from immutable commit `7bd452ee8a86073355266cd0bbeec4bada8eb1b9` and ran two independent exact-CDX and replay passes.

Approval required all of the following in both passes:

- exact canonical source URL lookup, with only the established x.com/twitter.com same-status alias exception;
- snapshot date on or after the latest canonical `published_at` for the grouped URL;
- HTTP 200 HTML replay;
- at least 65,536 replay bytes;
- the same exact archive URL reproduced in both passes.

Wildcard, guessed, short, failed, temporally incompatible, or non-reproducible captures were not approved.

## Selection boundary

```text
Previously reviewed evidence IDs excluded  138
Eligible previously unreviewed unique URLs   19
Selected exact canonical source URLs         10
```

## Reproducible approved mappings

### Everclear getting started — Everclear prev Connext

```text
Evidence ID    bir_src_000188
Queue          terminal
Canonical URL  https://docs.everclear.org/developers/getting-started
Archive URL    https://web.archive.org/web/20240920172006/https://docs.everclear.org/developers/getting-started
Run 1 bytes    152688
Run 2 bytes    152688
```

### BNB Chain Fusion

```text
Evidence ID    bir_src_000024
Queue          terminal
Canonical URL  https://www.bnbchain.org/en/bnb-chain-fusion
Archive URL    https://web.archive.org/web/20240205063709/https://www.bnbchain.org/en/bnb-chain-fusion
Run 1 bytes    176938
Run 2 bytes    176938
```

### Proposal: UtilityDAO — Recovery Partner for Harmony Protocol

```text
Evidence ID    bir_src_000070
Queue          terminal
Canonical URL  https://talk.harmony.one/t/proposal-utilitydao-recovery-partner-for-harmony-protocol/26467
Archive URL    https://web.archive.org/web/20250715114205/https://talk.harmony.one/t/proposal-utilitydao-recovery-partner-for-harmony-protocol/26467
Run 1 bytes    289867
Run 2 bytes    289867
```

### Syndicate bridging documentation

```text
Evidence ID    bir_src_000196
Queue          terminal
Canonical URL  https://docs.syndicate.io/en/docs/synd/bridging
Archive URL    https://web.archive.org/web/20260124112950/https://docs.syndicate.io/en/docs/synd/bridging
Run 1 bytes    128197
Run 2 bytes    128197
```

## Deferred

The following selected URLs did not satisfy the reproducible exact-replay boundary and remain unmodified:

- `bir_src_000191` — Everclear Q3 recap: three temporally eligible captures were discovered, but no accepted replay in either pass.
- `bir_src_000016` — arXiv bridge-hacks review: seven temporally eligible captures were discovered, but no accepted replay in either pass.
- `bir_src_000282` — PeckShieldAlert Unizen exploiter X update: six temporally eligible captures were discovered, but no accepted replay in either pass.
- `bir_src_000194` — Syndicate Labs wind-down / reimbursement X thread: no capture was discovered in either pass.
- `bir_src_000148` — KinetFlow Conflux forum launch: one temporally eligible capture was discovered, but no accepted replay in either pass.
- `bir_src_000189`, `bir_src_000260` — Everclear blog archive: twenty-two captures were discovered and five were temporally eligible, but no accepted replay in either pass.

## Projected canonical effect

If and only if the four approved mappings are applied in a separate canonical PR, the expected source-quality state is:

```text
Evidence with archived_url          116 -> 120
Terminal unarchived unique URLs      25 -> 21
Terminal unarchived records          35 -> 31
Risky-host unarchived unique URLs    18 -> 18
Risky-host unarchived records        32 -> 32
X/Twitter records unarchived         29 -> 29
```

The permanent validator remains authoritative. Any mismatch between these projections and the validator must fail the canonical application rather than weakening a ceiling.

## Safety boundary

This review changes no canonical data. A separate fresh branch may apply only the four mappings reproduced identically in both passes. Source URLs, titles, claims, dates, source tier, reliability, bridge linkage, incident linkage, event linkage, and all other evidence fields must remain unchanged.
