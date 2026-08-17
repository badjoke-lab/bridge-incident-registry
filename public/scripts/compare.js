const form = document.querySelector("#compare-controls");
const kindSelect = document.querySelector("#compare-kind");
const incidentLeft = document.querySelector("#compare-incident-left");
const incidentRight = document.querySelector("#compare-incident-right-select");
const bridgeLeft = document.querySelector("#compare-bridge-left");
const bridgeRight = document.querySelector("#compare-bridge-right-select");
const incidentLeftWrap = document.querySelector("#compare-incident-controls");
const incidentRightWrap = document.querySelector("#compare-incident-right");
const bridgeLeftWrap = document.querySelector("#compare-bridge-controls");
const bridgeRightWrap = document.querySelector("#compare-bridge-right");
const swapButton = document.querySelector("#compare-swap");
const statusEl = document.querySelector("#compare-result-count");
const results = document.querySelector("#compare-results");
const errorBox = document.querySelector("#compare-error");
const body = document.querySelector("#compare-body");
const leftHeading = document.querySelector("#compare-left-heading");
const rightHeading = document.querySelector("#compare-right-heading");
const leftPage = document.querySelector("#compare-left-page");
const rightPage = document.querySelector("#compare-right-page");
const leftData = document.querySelector("#compare-left-data");
const rightData = document.querySelector("#compare-right-data");

function humanize(value) {
  if (value === null || value === undefined || value === "") return "Unknown";
  return String(value)
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function arrayValue(values, empty = "Unknown") {
  if (!Array.isArray(values) || values.length === 0) return empty;
  return values.map(humanize).join(", ");
}

function boolValue(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Unknown";
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== null && value !== undefined && value !== ""))];
}

function recoveredAmounts(dossier) {
  const values = unique((dossier.related?.events ?? []).map((event) => event.recovered_amount_text));
  return values.length ? values.join("; ") : "None recorded";
}

function evidenceCount(dossier, predicate) {
  return (dossier.related?.evidence ?? []).filter(predicate).length;
}

function incidentRows(dossier) {
  const record = dossier.record ?? {};
  const bridge = dossier.bridge ?? {};
  return {
    "Incident date": record.incident_date ?? "Unknown",
    "Bridge": bridge.canonical_name ?? record.bridge_id ?? "Unknown",
    "Bridge type": humanize(bridge.type),
    "Incident type": humanize(record.incident_type),
    "Attack category": humanize(record.attack_vector_category),
    "Reported loss": record.reported_loss_usd_display ?? record.reported_loss_text ?? "Unknown",
    "Amount confidence": humanize(record.amount_confidence),
    "Recovery status": humanize(record.recovery_status),
    "Recorded recovered amounts": recoveredAmounts(dossier),
    "Recovery evidence sources": String(evidenceCount(dossier, (source) => source.supports_recovery === true)),
    "Reimbursement status": humanize(record.reimbursement_status),
    "Reimbursement evidence sources": String(evidenceCount(dossier, (source) => source.supports_reimbursement === true)),
    "Restart status": humanize(record.restart_status),
    "Current outcome": humanize(record.current_outcome),
    "Unresolved": boolValue(record.is_unresolved),
    "Affected chains": arrayValue(record.affected_chains),
    "Affected assets": arrayValue(record.affected_assets),
    "Postmortem": humanize(record.postmortem_available),
    "Lifecycle events": String(dossier.record_counts?.events ?? dossier.related?.events?.length ?? 0),
    "Evidence sources": String(dossier.record_counts?.evidence ?? dossier.related?.evidence?.length ?? 0),
    "Known unknowns": arrayValue(record.known_unknowns, "None recorded"),
    "Last verified": record.last_verified_at ?? "Unknown"
  };
}

function incidentStates(dossier, field) {
  const values = unique((dossier.related?.incidents ?? []).map((incident) => incident[field]));
  return values.length ? values.map(humanize).join(", ") : "None recorded";
}

function bridgeRows(dossier) {
  const record = dossier.record ?? {};
  return {
    "Bridge type": humanize(record.type),
    "Current status": humanize(record.status),
    "Primary chains": arrayValue(record.primary_chains),
    "Launch date": record.launch_date ?? "Unknown",
    "End date": record.end_date ?? "Unknown",
    "Terminal reason": record.terminal_reason ?? "Unknown",
    "Major incident count": String(record.major_incident_count ?? 0),
    "Has unresolved incident": boolValue(record.has_unresolved_incident),
    "Has reimbursement history": boolValue(record.has_reimbursement_history),
    "Incident recovery states": incidentStates(dossier, "recovery_status"),
    "Incident reimbursement states": incidentStates(dossier, "reimbursement_status"),
    "Incident restart states": incidentStates(dossier, "restart_status"),
    "Incident current outcomes": incidentStates(dossier, "current_outcome"),
    "Related incidents": String(dossier.record_counts?.incidents ?? dossier.related?.incidents?.length ?? 0),
    "Lifecycle events": String(dossier.record_counts?.events ?? dossier.related?.events?.length ?? 0),
    "Evidence sources": String(dossier.record_counts?.evidence ?? dossier.related?.evidence?.length ?? 0),
    "Record maturity": humanize(record.record_maturity),
    "Last verified": record.last_verified_at ?? "Unknown"
  };
}

function recordName(kind, dossier) {
  return kind === "incident"
    ? dossier.record?.title ?? dossier.record_id ?? "Unknown incident"
    : dossier.record?.canonical_name ?? dossier.record_id ?? "Unknown bridge";
}

function activeSelects(kind) {
  return kind === "bridge" ? [bridgeLeft, bridgeRight] : [incidentLeft, incidentRight];
}

function setKindVisibility(kind) {
  const bridgeMode = kind === "bridge";
  if (incidentLeftWrap) incidentLeftWrap.hidden = bridgeMode;
  if (incidentRightWrap) incidentRightWrap.hidden = bridgeMode;
  if (bridgeLeftWrap) bridgeLeftWrap.hidden = !bridgeMode;
  if (bridgeRightWrap) bridgeRightWrap.hidden = !bridgeMode;
}

function showError(message) {
  if (errorBox) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }
  if (results) results.hidden = true;
  if (statusEl) statusEl.textContent = message;
}

function clearError() {
  if (!errorBox) return;
  errorBox.textContent = "";
  errorBox.hidden = true;
}

async function fetchDossier(kind, slug) {
  const response = await fetch(`/data/${kind}/${encodeURIComponent(slug)}.json`, {
    headers: { accept: "application/json" }
  });
  if (!response.ok) throw new Error(`${kind} dossier returned HTTP ${response.status}`);
  const dossier = await response.json();
  if (dossier?.canonical_only !== true || dossier?.record_type !== kind || dossier?.slug !== slug) {
    throw new Error(`${kind} dossier failed canonical identity checks`);
  }
  return dossier;
}

function renderComparison(kind, left, right) {
  const leftRows = kind === "incident" ? incidentRows(left) : bridgeRows(left);
  const rightRows = kind === "incident" ? incidentRows(right) : bridgeRows(right);
  const fields = unique([...Object.keys(leftRows), ...Object.keys(rightRows)]);

  if (body) {
    body.replaceChildren();
    for (const field of fields) {
      const row = document.createElement("tr");
      const label = document.createElement("th");
      label.scope = "row";
      label.textContent = field;
      const leftCell = document.createElement("td");
      leftCell.textContent = leftRows[field] ?? "Unknown";
      const rightCell = document.createElement("td");
      rightCell.textContent = rightRows[field] ?? "Unknown";
      row.append(label, leftCell, rightCell);
      body.append(row);
    }
  }

  const leftName = recordName(kind, left);
  const rightName = recordName(kind, right);
  if (leftHeading) leftHeading.textContent = leftName;
  if (rightHeading) rightHeading.textContent = rightName;
  if (leftPage) leftPage.href = left.canonical_page_url;
  if (rightPage) rightPage.href = right.canonical_page_url;
  if (leftData) leftData.href = left.self_url;
  if (rightData) rightData.href = right.self_url;
  if (results) results.hidden = false;
  if (statusEl) statusEl.textContent = `Comparing ${leftName} and ${rightName}.`;
}

function writeUrl(kind, left, right) {
  const params = new URLSearchParams({ kind, left, right });
  history.replaceState(null, "", `${location.pathname}?${params}`);
}

async function compareSelected({ writeState = true } = {}) {
  clearError();
  const kind = kindSelect?.value === "bridge" ? "bridge" : "incident";
  const [leftSelect, rightSelect] = activeSelects(kind);
  const leftSlug = leftSelect?.value ?? "";
  const rightSlug = rightSelect?.value ?? "";

  if (!leftSlug || !rightSlug) {
    showError("Select two records before comparing.");
    return;
  }
  if (leftSlug === rightSlug) {
    showError("Select two different records.");
    return;
  }

  if (statusEl) statusEl.textContent = "Loading canonical record dossiers…";
  if (results) results.hidden = true;
  try {
    const [left, right] = await Promise.all([
      fetchDossier(kind, leftSlug),
      fetchDossier(kind, rightSlug)
    ]);
    if (writeState) writeUrl(kind, leftSlug, rightSlug);
    renderComparison(kind, left, right);
  } catch (error) {
    showError(`Comparison failed: ${error.message}`);
  }
}

function restoreFromUrl() {
  const params = new URLSearchParams(location.search);
  const kind = params.get("kind") === "bridge" ? "bridge" : "incident";
  if (kindSelect) kindSelect.value = kind;
  setKindVisibility(kind);
  const [leftSelect, rightSelect] = activeSelects(kind);
  const left = params.get("left") ?? "";
  const right = params.get("right") ?? "";
  if (leftSelect && [...leftSelect.options].some((option) => option.value === left)) leftSelect.value = left;
  if (rightSelect && [...rightSelect.options].some((option) => option.value === right)) rightSelect.value = right;
  if (leftSelect?.value && rightSelect?.value && leftSelect.value !== rightSelect.value) {
    compareSelected({ writeState: false });
  }
}

kindSelect?.addEventListener("change", () => {
  const kind = kindSelect.value === "bridge" ? "bridge" : "incident";
  setKindVisibility(kind);
  clearError();
  if (results) results.hidden = true;
  if (statusEl) statusEl.textContent = `Select two different ${kind} records.`;
  history.replaceState(null, "", `${location.pathname}?kind=${kind}`);
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  compareSelected();
});

swapButton?.addEventListener("click", () => {
  const kind = kindSelect?.value === "bridge" ? "bridge" : "incident";
  const [leftSelect, rightSelect] = activeSelects(kind);
  if (!leftSelect || !rightSelect) return;
  const left = leftSelect.value;
  leftSelect.value = rightSelect.value;
  rightSelect.value = left;
  if (leftSelect.value && rightSelect.value) compareSelected();
});

restoreFromUrl();
