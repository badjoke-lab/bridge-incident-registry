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
  assert(response.status() === 200, `${route}: expected HTTP 200, got ${response.status()}`);
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
  const query = isBridge ? "ronin" : "wormhole";
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
      "/bridge/ronin-bridge/",
      "/incident/ronin-bridge-2022-validator-key-compromise/",
    ]) {
      await open(page, route);
    }

    await checkRegistryInteractions(page, "bridge");
    await checkRegistryInteractions(page, "incident");

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
