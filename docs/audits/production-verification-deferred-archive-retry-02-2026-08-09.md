# Production Verification — Deferred Archive Retry 02

Date: 2026-08-09
Canonical PR: #203
Canonical merge: `46b6e19700d8553c75c4555549b9ca308cbc7292`
Production audit PR: #204
Production run: `31298305603`
Production job: `93206834594`

## Verified production state

```text
Bridges      33
Incidents    34
Events      183
Evidence    284
HTML routes  72
Redirects    74
```

Live `version.json`:

```text
generated_at  2026-08-09T06:10:37.053Z
```

The merged canonical value for `bir_src_000166.archived_url` is live at:

```text
https://web.archive.org/web/20221227131535/https://quillaudits.medium.com/decoding-rubic-exchange-exploit-quillaudits-44828e71c417
```

Source-quality state after publication:

```text
Evidence with archived_url           127
Terminal unarchived unique URLs       15
Terminal unarchived records           25
Risky-host unarchived unique URLs     16
Risky-host unarchived records         30
X/Twitter records unarchived          29
```

## Publication result

The production verifier reached complete canonical equality on **attempt 1**.

All four public canonical datasets returned HTTP 200 and matched the merged canonical data at field level:

```text
bridges    content_match=true
incidents  content_match=true
events     content_match=true
evidence   content_match=true
```

Matching record counts were not used as a substitute for content equality. The verifier also passed live HTML, canonical metadata, sitemap, robots, redirects, content-type, and cache assertions.

## Refresh boundary

No build-input refresh, deployment retrigger, or verification relaxation was required for Deferred Archive Retry 02.

## Conclusion

Deferred Archive Retry 02 is published and production-verified. The next archive-preservation work must use a new explicit deferred-retry scope under the unchanged exact-replay, temporal-fit, minimum-size, and two-run reproducibility boundary.
