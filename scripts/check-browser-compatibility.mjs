import { chromium, firefox, webkit } from "playwright";

const baseUrl = process.env.BIR_COMPAT_BASE_URL || "http://127.0.0.1:4173";
const engines = [
  ["chromium", chromium],
  ["firefox", firefox],
  ["webkit", webkit],
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function open(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  assert(response, `${route}: missing navigation response`);
  const status = response.status();
  assert(
    (status >= 200 && status < 300) || status === 304,
    `${route}: expected HTTP 2xx/304, got ${status}`,
  );
  await page.locator("main#main-content").waitFor({ state: "visible" });
}

async function checkRegistryInteractions(page, kind) {
  const isBridge = kind === "bridge";
  const route = isBridge ? "/bridges/" : "/incidents/";
  const search = isBridge ? "#bridge-search" : "#incident-search";
  const count = isBridge ? "#bridge-result-count" : "#incident-result-count";
  const row = isBridge ? "#bridge-table-body .registry-row:not([hidden])" : "#incident-table-body .registry-row:not([hidden])";
  const next = isBridge ? "#bridge-next-page" : "#incident-next-page";
  const current = isBridge ? "#bridge-current-page" : "#incident-current-page";
  const query = isBridge ? "ronin" : "qubit";
  const singular = isBridge ? "1 bridge record" : "1 incident case";

  await open(page, route);
  assert(await page.locator(count).isVisible(), `${kind}: result count is not visible`);
  assert(await page.locator(row).count() === 25, `${kind}: expected 25 visible rows on initial page`);

  await page.locator(next).click();
  await page.waitForFunction((selector) => document.querySelector(selector)?.textContent === "2", current);
  assert(new URL(page.url()).searchParams.get("page") === "2", `${kind}: pagination did not update URL state`);

  await page.locator(search).fill(query);
  await page.waitForFunction(({ selector, expected }) => document.querySelector(selector)?.textContent?.trim() === expected, { selector: count, expected: singular });
  assert(await page.locator(row).count() === 1, `${kind}: expected one visible filtered row`);
  assert(new URL(page.url()).searchParams.get("search") === query, `${kind}: search did not update URL state`);
  assert(new URL(page.url()).searchParams.has("page") === false, `${kind}: filtering did not reset page state`);
}

async function checkIncidentFacet(page, selector, parameter, dataAttribute, listValue = false) {
  await open(page, "/incidents/");
  const values = await page.locator(`${selector} option`).evaluateAll((options) => options.map((option) => option.value).filter(Boolean));
  assert(values.length > 0, `${selector}: expected at least one explicit facet option`);
  const value = values[0];

  await page.locator(selector).selectOption(value);
  await page.waitForFunction(
    ({ parameter: key, value: expected }) => new URL(window.location.href).searchParams.get(key) === expected,
    { parameter, value },
  );

  const visibleRows = page.locator("#incident-table-body .registry-row:not([hidden])");
  const visibleCount = await visibleRows.count();
  assert(visibleCount > 0, `${selector}: facet produced no visible incident rows for ${value}`);
  const attributes = await visibleRows.evaluateAll((rows, attribute) => rows.map((row) => row.getAttribute(attribute) || ""), dataAttribute);
  const matches = attributes.every((attributeValue) => listValue
    ? attributeValue.split(" ").filter(Boolean).includes(value)
    : attributeValue === value);
  assert(matches, `${selector}: visible rows do not all match selected value ${value}`);
}

async function selectFirstTwo(page, leftSelector, rightSelector) {
  const values = await page.locator(`${leftSelector} option`).evaluateAll((options) => options.map((option) => option.value).filter(Boolean));
  assert(values.length >= 2, `${leftSelector}: expected at least two comparison options`);
  await page.locator(leftSelector).selectOption(values[0]);
  await page.locator(rightSelector).selectOption(values[1]);
  return values.slice(0, 2);
}

async function checkCompare(page) {
  await open(page, "/compare/");

  const incidentValues = await selectFirstTwo(page, "#compare-incident-left", "#compare-incident-right-select");
  await page.locator("#compare-controls button[type='submit']").click();
  await page.locator("#compare-results").waitFor({ state: "visible" });
  assert(await page.locator("#compare-body tr").count() >= 15, "compare: incident comparison has too few canonical fields");
  let url = new URL(page.url());
  assert(url.searchParams.get("kind") === "incident", "compare: incident kind missing from URL state");
  assert(url.searchParams.get("left") === incidentValues[0], "compare: incident left selection missing from URL state");
  assert(url.searchParams.get("right") === incidentValues[1], "compare: incident right selection missing from URL state");
  assert((await page.locator("#compare-left-data").getAttribute("href"))?.includes("/data/incident/"), "compare: incident dossier link missing");

  await page.locator("#compare-kind").selectOption("bridge");
  const bridgeValues = await selectFirstTwo(page, "#compare-bridge-left", "#compare-bridge-right-select");
  await page.locator("#compare-controls button[type='submit']").click();
  await page.locator("#compare-results").waitFor({ state: "visible" });
  assert(await page.locator("#compare-body tr").count() >= 12, "compare: bridge comparison has too few canonical fields");
  url = new URL(page.url());
  assert(url.searchParams.get("kind") === "bridge", "compare: bridge kind missing from URL state");
  assert(url.searchParams.get("left") === bridgeValues[0], "compare: bridge left selection missing from URL state");
  assert(url.searchParams.get("right") === bridgeValues[1], "compare: bridge right selection missing from URL state");
  assert((await page.locator("#compare-left-data").getAttribute("href"))?.includes("/data/bridge/"), "compare: bridge dossier link missing");
}

async function checkBrowser(name, browserType) {
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1365, height: 900 } });
  const page = await context.newPage();
  const runtimeErrors = [];

  page.on("pageerror", (error) => runtimeErrors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
  });

  try {
    for (const route of [
      "/",
      "/about/",
      "/methodology/",
      "/support/",
      "/compare/",
      "/bridge/ronin-bridge/",
      "/incident/ronin-bridge-2022-validator-key-compromise/",
    ]) {
      await open(page, route);
    }

    await checkRegistryInteractions(page, "bridge");
    await checkRegistryInteractions(page, "incident");
    await checkIncidentFacet(page, "#incident-chain", "chain", "data-chains", true);
    await checkIncidentFacet(page, "#incident-bridge-type", "bridge_type", "data-bridge-type");
    await checkCompare(page);

    await open(page, "/support/");
    const copyButtons = page.locator("button[data-copy-address]");
    assert(await copyButtons.count() > 0, `${name}: support copy controls missing`);
    for (let index = 0; index < await copyButtons.count(); index += 1) {
      assert((await copyButtons.nth(index).getAttribute("aria-label"))?.startsWith("Copy "), `${name}: support copy control lacks accessible label`);
    }

    assert(runtimeErrors.length === 0, `${name}: browser runtime errors:\n${runtimeErrors.join("\n")}`);
    console.log(`${name}: compatibility smoke passed.`);
  } finally {
    await context.close();
    await browser.close();
  }
}

for (const [name, browserType] of engines) {
  await checkBrowser(name, browserType);
}

console.log("Browser compatibility smoke passed for Chromium, Firefox, and WebKit.");
