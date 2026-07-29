import { canonicalJsonEqual, firstRecordMismatch } from "./lib/canonical-equality.mjs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const canonical = [
  {
    id: "bir_src_fixture_1",
    url: "https://x.com/example/status/1",
    url_status: "live",
    accessed_at: "2026-07-29"
  },
  {
    id: "bir_src_fixture_2",
    url: "https://example.com/report",
    url_status: "live"
  }
];

const reorderedKeys = [
  {
    accessed_at: "2026-07-29",
    url_status: "live",
    url: "https://x.com/example/status/1",
    id: "bir_src_fixture_1"
  },
  {
    url_status: "live",
    id: "bir_src_fixture_2",
    url: "https://example.com/report"
  }
];
assert(canonicalJsonEqual(reorderedKeys, canonical), "object key order must not create false drift");

const sameCountFieldDrift = structuredClone(canonical);
sameCountFieldDrift[0].url = "https://twitter.com/example/status/1";
sameCountFieldDrift[0].url_status = "unknown";
assert(!canonicalJsonEqual(sameCountFieldDrift, canonical), "same-count field drift must be detected");
const fieldMismatch = firstRecordMismatch(sameCountFieldDrift, canonical);
assert(fieldMismatch?.id === "bir_src_fixture_1", "field drift must identify the changed record");

const sameIdsDifferentOrder = [canonical[1], canonical[0]];
assert(!canonicalJsonEqual(sameIdsDifferentOrder, canonical), "record order drift must be detected");
const orderMismatch = firstRecordMismatch(sameIdsDifferentOrder, canonical);
assert(orderMismatch?.index === 0, "record order drift must identify the first position");

const missingRecord = canonical.slice(0, 1);
assert(!canonicalJsonEqual(missingRecord, canonical), "record count drift must be detected");
assert(firstRecordMismatch(missingRecord, canonical)?.reason.includes("length"), "length drift must be reported");

console.log("Production canonical-content equality tests passed (4 cases).");
