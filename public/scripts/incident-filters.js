const PAGE_SIZE = 25;
const form = document.querySelector("#incident-filters");
const rows = Array.from(document.querySelectorAll(".registry-row"));
const count = document.querySelector("#incident-result-count");
const noResults = document.querySelector("#incident-no-results");
const previousPage = document.querySelector("#incident-previous-page");
const nextPage = document.querySelector("#incident-next-page");
const currentPageLabel = document.querySelector("#incident-current-page");
const pageCountLabel = document.querySelector("#incident-page-count");
const body = document.querySelector("#incident-table-body");
let currentPage = 1;

function readState() {
  const data = new FormData(form);
  return Object.fromEntries([...data.entries()].map(([key, value]) => [key, String(value || "").trim()]));
}

function matches(row, state) {
  const search = state.search.toLowerCase();
  const loss = Number(row.dataset.loss || 0);
  const lossMatch = !state.loss || (state.loss === "known" ? row.dataset.lossKnown === "true" : loss >= Number(state.loss));
  return (!search || (row.dataset.search || "").includes(search))
    && (!state.type || row.dataset.type === state.type)
    && (!state.attack || row.dataset.attack === state.attack)
    && (!state.recovery || row.dataset.recovery === state.recovery)
    && (!state.reimbursement || row.dataset.reimbursement === state.reimbursement)
    && (!state.restart || row.dataset.restart === state.restart)
    && (!state.outcome || row.dataset.outcome === state.outcome)
    && (!state.unresolved || row.dataset.unresolved === state.unresolved)
    && (!state.date_from || row.dataset.date >= state.date_from)
    && (!state.date_to || row.dataset.date <= state.date_to)
    && lossMatch;
}

function compareRows(a, b, sort) {
  if (sort === "loss-desc") return Number(b.dataset.loss) - Number(a.dataset.loss) || String(b.dataset.date).localeCompare(String(a.dataset.date));
  if (sort === "reviewed-desc") return String(b.dataset.reviewed).localeCompare(String(a.dataset.reviewed)) || String(b.dataset.date).localeCompare(String(a.dataset.date));
  if (sort === "name-asc") return a.dataset.name.localeCompare(b.dataset.name);
  return String(b.dataset.date).localeCompare(String(a.dataset.date)) || a.dataset.name.localeCompare(b.dataset.name);
}

function writeUrl(state) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(state)) {
    if (value && !(key === "sort" && value === "date-desc")) params.set(key, value);
  }
  if (currentPage > 1) params.set("page", String(currentPage));
  history.replaceState(null, "", `${location.pathname}${params.size ? `?${params}` : ""}`);
}

function applyFilters({ preservePage = false } = {}) {
  if (!form) return;
  const state = readState();
  const matched = rows.filter((row) => matches(row, state)).sort((a, b) => compareRows(a, b, state.sort || "date-desc"));
  const pageCount = Math.max(1, Math.ceil(matched.length / PAGE_SIZE));
  if (!preservePage) currentPage = 1;
  currentPage = Math.min(Math.max(1, currentPage), pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = new Set(matched.slice(start, start + PAGE_SIZE));
  for (const row of matched) body?.append(row);
  for (const row of rows) row.hidden = !pageRows.has(row);
  if (count) count.textContent = `${matched.length} incident ${matched.length === 1 ? "case" : "cases"}`;
  if (noResults) noResults.hidden = matched.length !== 0;
  if (currentPageLabel) currentPageLabel.textContent = String(currentPage);
  if (pageCountLabel) pageCountLabel.textContent = String(pageCount);
  if (previousPage) previousPage.disabled = currentPage <= 1;
  if (nextPage) nextPage.disabled = currentPage >= pageCount;
  writeUrl(state);
}

function restoreFromUrl() {
  if (!form) return;
  const params = new URLSearchParams(location.search);
  for (const element of form.elements) {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) continue;
    if (!element.name) continue;
    element.value = params.get(element.name) || (element.name === "sort" ? "date-desc" : "");
  }
  currentPage = Number.parseInt(params.get("page") || "1", 10) || 1;
  applyFilters({ preservePage: true });
}

form?.addEventListener("input", () => applyFilters());
form?.addEventListener("change", () => applyFilters());
form?.addEventListener("reset", () => window.setTimeout(() => applyFilters(), 0));
previousPage?.addEventListener("click", () => { currentPage -= 1; applyFilters({ preservePage: true }); form?.scrollIntoView(); });
nextPage?.addEventListener("click", () => { currentPage += 1; applyFilters({ preservePage: true }); form?.scrollIntoView(); });
restoreFromUrl();
