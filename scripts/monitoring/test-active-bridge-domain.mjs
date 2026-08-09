import { applySignal } from "./core/state.mjs";
import { watchActiveBridgeDomains } from "./monitors/active-bridge-domain-watch.mjs";

const active = {
  id: "bir_bridge_fixture_active",
  slug: "fixture-active",
  canonical_name: "Fixture Active Bridge",
  aliases: [],
  status: "active",
  official_url: "https://bridge.fixture.example/app",
  official_domain: "bridge.fixture.example"
};
const dead = {
  id: "bir_bridge_fixture_dead",
  slug: "fixture-dead",
  canonical_name: "Fixture Dead Bridge",
  aliases: [],
  status: "dead",
  official_url: "https://dead.fixture.example/",
  official_domain: "dead.fixture.example"
};
const bridges = [active, dead];

function constant(result) {
  return async () => ({ ...result });
}

const healthy = constant({ ok: true, status: 200, final_url: active.official_url, error: null });
const hard404 = constant({ ok: false, status: 404, final_url: active.official_url, error: null });
const blocked403 = constant({ ok: false, status: 403, final_url: active.official_url, error: null });
const moved = constant({ ok: true, status: 200, final_url: "https://new.fixture.example/app", error: null });

const state = { version: 1, signals: {} };
const baseline = await watchActiveBridgeDomains({ bridges, state, applySignal, observedAt: "2026-08-09T09:00:00Z", limit: 8, probe: healthy });
if (baseline.eligible_count !== 1 || baseline.selected_count !== 1 || baseline.baseline_seeded_count !== 1 || baseline.findings.length !== 0 || !baseline.state_changed) {
  throw new Error(`healthy first observation should seed one active bridge baseline without a finding: ${JSON.stringify(baseline)}`);
}
if (state.signals[`bridge-domain:${active.id}`]?.fingerprint !== "healthy:bridge.fixture.example->bridge.fixture.example") {
  throw new Error("healthy baseline fingerprint mismatch");
}

const repeat = await watchActiveBridgeDomains({ bridges, state, applySignal, observedAt: "2026-08-09T09:01:00Z", limit: 8, probe: healthy });
if (repeat.state_changed || repeat.findings.length !== 0 || repeat.baseline_seeded_count !== 0) {
  throw new Error(`unchanged healthy bridge must be silent: ${JSON.stringify(repeat)}`);
}

const failed = await watchActiveBridgeDomains({ bridges, state, applySignal, observedAt: "2026-08-09T09:02:00Z", limit: 8, probe: hard404 });
if (!failed.state_changed || failed.findings.length !== 1 || failed.findings[0].category !== "bridge_official_url_hard_failure" || failed.findings[0].severity !== "high") {
  throw new Error(`two-pass 404 must emit one high review finding: ${JSON.stringify(failed)}`);
}

const repeatedFailure = await watchActiveBridgeDomains({ bridges, state, applySignal, observedAt: "2026-08-09T09:03:00Z", limit: 8, probe: hard404 });
if (repeatedFailure.state_changed || repeatedFailure.findings.length !== 0) {
  throw new Error(`unchanged hard failure must dedupe: ${JSON.stringify(repeatedFailure)}`);
}

const recovered = await watchActiveBridgeDomains({ bridges, state, applySignal, observedAt: "2026-08-09T09:04:00Z", limit: 8, probe: healthy });
if (!recovered.state_changed || recovered.findings.length !== 1 || recovered.findings[0].category !== "bridge_official_url_recovered") {
  throw new Error(`two-pass healthy result must rearm a previous hard failure: ${JSON.stringify(recovered)}`);
}

const movedResult = await watchActiveBridgeDomains({ bridges, state, applySignal, observedAt: "2026-08-09T09:05:00Z", limit: 8, probe: moved });
if (!movedResult.state_changed || movedResult.findings.length !== 1 || movedResult.findings[0].category !== "bridge_official_domain_changed") {
  throw new Error(`consistent new final domain must emit one review finding: ${JSON.stringify(movedResult)}`);
}

const blockedState = { version: 1, signals: {} };
const blocked = await watchActiveBridgeDomains({ bridges, state: blockedState, applySignal, observedAt: "2026-08-09T09:06:00Z", limit: 8, probe: blocked403 });
if (blocked.state_changed || blocked.findings.length !== 0 || Object.keys(blockedState.signals).length !== 0) {
  throw new Error(`403 access blocking must not seed failure or baseline state: ${JSON.stringify(blocked)}`);
}

const mismatchState = { version: 1, signals: {} };
const mismatch = await watchActiveBridgeDomains({ bridges, state: mismatchState, applySignal, observedAt: "2026-08-09T09:07:00Z", limit: 8, probe: moved });
if (!mismatch.state_changed || mismatch.baseline_seeded_count !== 1 || mismatch.findings.length !== 1 || mismatch.findings[0].category !== "bridge_official_domain_redirect_mismatch") {
  throw new Error(`first healthy redirect to a different host must seed baseline plus review finding: ${JSON.stringify(mismatch)}`);
}

let pass = 0;
const mixedProbe = async () => {
  pass += 1;
  return pass % 2 === 1
    ? { ok: true, status: 200, final_url: active.official_url, error: null }
    : { ok: false, status: 404, final_url: active.official_url, error: null };
};
const mixedState = { version: 1, signals: {} };
const mixed = await watchActiveBridgeDomains({ bridges, state: mixedState, applySignal, observedAt: "2026-08-09T09:08:00Z", limit: 8, probe: mixedProbe });
if (mixed.state_changed || mixed.findings.length !== 0 || Object.keys(mixedState.signals).length !== 0) {
  throw new Error(`mixed probe results must not create monitoring state: ${JSON.stringify(mixed)}`);
}

console.log("Active bridge domain controlled tests passed (eligibility, baseline, dedupe, hard failure, recovery, domain change, blocked/mixed suppression).");
