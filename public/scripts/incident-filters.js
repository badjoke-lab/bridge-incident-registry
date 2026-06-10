const form = document.querySelector("#incident-filters");
const rows = Array.from(document.querySelectorAll(".registry-row"));
const count = document.querySelector("#incident-result-count");
const noResults = document.querySelector("#incident-no-results");

function applyFilters() {
  if (!form) return;

  const data = new FormData(form);
  const search = String(data.get("search") || "").trim().toLowerCase();
  const type = String(data.get("type") || "");
  const recovery = String(data.get("recovery") || "");
  const reimbursement = String(data.get("reimbursement") || "");
  const outcome = String(data.get("outcome") || "");
  const unresolved = String(data.get("unresolved") || "");

  let visible = 0;

  for (const row of rows) {
    const matches =
      (!search || (row.dataset.search || "").includes(search)) &&
      (!type || row.dataset.type === type) &&
      (!recovery || row.dataset.recovery === recovery) &&
      (!reimbursement || row.dataset.reimbursement === reimbursement) &&
      (!outcome || row.dataset.outcome === outcome) &&
      (!unresolved || row.dataset.unresolved === unresolved);

    row.hidden = !matches;
    if (matches) visible += 1;
  }

  if (count) count.textContent = `${visible} incident ${visible === 1 ? "case" : "cases"}`;
  if (noResults) noResults.hidden = visible !== 0;
}

form?.addEventListener("input", applyFilters);
form?.addEventListener("change", applyFilters);
form?.addEventListener("reset", () => window.setTimeout(applyFilters, 0));
