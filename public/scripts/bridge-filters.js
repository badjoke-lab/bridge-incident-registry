const PAGE_SIZE = 25;
const form = document.querySelector("#bridge-filters");
const rows = Array.from(document.querySelectorAll(".registry-row"));
const count = document.querySelector("#bridge-result-count");
const noResults = document.querySelector("#bridge-no-results");
const previousPage = document.querySelector("#bridge-previous-page");
const nextPage = document.querySelector("#bridge-next-page");
const currentPageLabel = document.querySelector("#bridge-current-page");
const pageCountLabel = document.querySelector("#bridge-page-count");
const body = document.querySelector("#bridge-table-body");
let currentPage = 1;

function readState() {
  const data = new FormData(form);
  return Object.fromEntries([...data.entries()].map(([key, value]) => [key, String(value || "").trim()]));
}

function matches(row, state) {
  const search = state.search.toLowerCase();
  return (!search || (row.dataset.search || "").includes(search))
    && (!state.type || row.dataset.type === state.type)
    && (!state.status || row.dataset.status === state.status)
    && (!state.chain || (row.dataset.chains || "").split(" ").includes(state.chain))
    && (!state.major || row.dataset.major === state.major)
    && (!state.unresolved || row.dataset.unresolved === state.unresolved)
    && (!state.reimbursement || row.dataset.reimbursement === state.reimbursement);
}

function compareRows(a, b, sort) {
  if (sort === "reviewed-desc") return String(b.dataset.reviewed).localeCompare(String(a.dataset.reviewed)) || a.dataset.name.localeCompare(b.dataset.name);
  if (sort === "name-asc") return a.dataset.name.localeCompare(b.dataset.name);
  return Number(b.dataset.majorCount) - Number(a.dataset.majorCount) || a.dataset.name.localeCompare(b.dataset.name);
}

function writeUrl(state) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(state)) {
    if (value && !(key === "sort" && value === "incidents-desc")) params.set(key, value);
  }
  if (currentPage > 1) params.set("page", String(currentPage));
  history.replaceState(null, "", `${location.pathname}${params.size ? `?${params}` : ""}`);
}

function applyFilters({ preservePage = false } = {}) {
  if (!form) return;
  const state = readState();
  const matched = rows.filter((row) => matches(row, state)).sort((a, b) => compareRows(a, b, state.sort || "incidents-desc"));
  const pageCount = Math.max(1, Math.ceil(matched.length / PAGE_SIZE));
  if (!preservePage) currentPage = 1;
  currentPage = Math.min(Math.max(1, currentPage), pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = new Set(matched.slice(start, start + PAGE_SIZE));
  for (const row of matched) body?.append(row);
  for (const row of rows) row.hidden = !pageRows.has(row);
  if (count) count.textContent = `${matched.length} bridge ${matched.length === 1 ? "record" : "records"}`;
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
    element.value = params.get(element.name) || (element.name === "sort" ? "incidents-desc" : "");
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
