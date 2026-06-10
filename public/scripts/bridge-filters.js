const form = document.querySelector("#bridge-filters");
const rows = Array.from(document.querySelectorAll(".registry-row"));
const count = document.querySelector("#bridge-result-count");
const noResults = document.querySelector("#bridge-no-results");

function applyFilters() {
  if (!form) return;

  const data = new FormData(form);
  const search = String(data.get("search") || "").trim().toLowerCase();
  const type = String(data.get("type") || "");
  const status = String(data.get("status") || "");
  const maturity = String(data.get("maturity") || "");
  const updateStatus = String(data.get("update_status") || "");

  let visible = 0;

  for (const row of rows) {
    const matches =
      (!search || (row.dataset.search || "").includes(search)) &&
      (!type || row.dataset.type === type) &&
      (!status || row.dataset.status === status) &&
      (!maturity || row.dataset.maturity === maturity) &&
      (!updateStatus || row.dataset.updateStatus === updateStatus);

    row.hidden = !matches;
    if (matches) visible += 1;
  }

  if (count) {
    count.textContent = `${visible} bridge ${visible === 1 ? "record" : "records"}`;
  }

  if (noResults) {
    noResults.hidden = visible !== 0;
  }
}

form?.addEventListener("input", applyFilters);
form?.addEventListener("change", applyFilters);
form?.addEventListener("reset", () => window.setTimeout(applyFilters, 0));
