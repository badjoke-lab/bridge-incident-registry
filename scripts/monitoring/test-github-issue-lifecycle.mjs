import assert from "node:assert/strict";
import crypto from "node:crypto";
import { applySignal } from "./core/state.mjs";
import { watchGithubIssues } from "./monitors/github-issue-watch.mjs";

const baseIssue = {
  number: 171,
  title: "Review Example 2026 monitoring signal",
  body: "Monitoring signal. Needs evidence before review for canonical inclusion.",
  url: "https://github.com/example/repo/issues/171",
  labels: [{ name: "monitoring" }]
};

function legacyOpenFingerprint(issue) {
  const labels = (issue.labels ?? []).map((label) => typeof label === "string" ? label : label?.name).filter(Boolean).sort();
  const normalize = (value) => String(value ?? "").replace(/\r\n/g, "\n").trim();
  return crypto.createHash("sha256").update(JSON.stringify({
    title: normalize(issue.title),
    body: normalize(issue.body),
    labels
  })).digest("hex");
}

const state = { version: 1, signals: {} };
const opened = watchGithubIssues([{ ...baseIssue, state: "OPEN" }], state, applySignal, "2026-08-09T12:00:00Z");
assert.equal(opened.findings.length, 1);
assert.equal(opened.candidates.length, 1);
assert.equal(opened.findings[0].category, "review_signal");
assert.equal(opened.candidates[0].candidate_class, "B");
assert.equal(state.signals["github-issue:171"].fingerprint, legacyOpenFingerprint(baseIssue));

const unchangedOpen = watchGithubIssues([{ ...baseIssue, state: "OPEN" }], state, applySignal, "2026-08-09T12:01:00Z");
assert.equal(unchangedOpen.findings.length, 0);
assert.equal(unchangedOpen.candidates.length, 0);

const closed = watchGithubIssues([{ ...baseIssue, state: "CLOSED" }], state, applySignal, "2026-08-09T12:02:00Z");
assert.equal(closed.findings.length, 1);
assert.equal(closed.candidates.length, 0);
assert.equal(closed.findings[0].category, "review_signal_resolved");
assert.equal(closed.findings[0].severity, "low");
assert.match(state.signals["github-issue:171"].fingerprint, /^closed:/);

const unchangedClosed = watchGithubIssues([{ ...baseIssue, state: "CLOSED" }], state, applySignal, "2026-08-09T12:03:00Z");
assert.equal(unchangedClosed.findings.length, 0);
assert.equal(unchangedClosed.candidates.length, 0);

const reopened = watchGithubIssues([{ ...baseIssue, state: "OPEN" }], state, applySignal, "2026-08-09T12:04:00Z");
assert.equal(reopened.findings.length, 1);
assert.equal(reopened.candidates.length, 1);
assert.equal(reopened.findings[0].category, "review_signal");
assert.equal(reopened.candidates[0].candidate_class, "B");
assert.equal(state.signals["github-issue:171"].fingerprint, legacyOpenFingerprint(baseIssue));

const historicalClosedState = { version: 1, signals: {} };
const historicalClosed = watchGithubIssues([{ ...baseIssue, number: 999, state: "CLOSED" }], historicalClosedState, applySignal, "2026-08-09T12:05:00Z");
assert.equal(historicalClosed.findings.length, 0);
assert.equal(historicalClosed.candidates.length, 0);
assert.deepEqual(historicalClosedState.signals, {});

const migratedState = {
  version: 1,
  signals: {
    "github-issue:171": {
      fingerprint: legacyOpenFingerprint(baseIssue),
      first_seen_at: "2026-08-01T00:00:00Z",
      last_changed_at: "2026-08-01T00:00:00Z"
    }
  }
};
const migrationOpen = watchGithubIssues([{ ...baseIssue, state: "OPEN" }], migratedState, applySignal, "2026-08-09T12:06:00Z");
assert.equal(migrationOpen.findings.length, 0);
assert.equal(migrationOpen.candidates.length, 0);

console.log("GitHub monitoring issue lifecycle tests passed (open, close resolution, closed dedupe, reopen rearm, historical closed suppression, migration silence).");
