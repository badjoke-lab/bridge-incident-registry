#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const config = JSON.parse(await readFile(process.env.VISUAL_REVIEW_CONFIG ?? 'config/representative-visual-review.json', 'utf8'));
const baseUrl = (process.env.CAPTURE_BASE_URL ?? 'http://127.0.0.1:4173').replace(/\/$/, '');
const output = process.env.VISUAL_REVIEW_OUTPUT ?? 'artifacts/representative-visual-review';
const devices = config.devices ?? {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true }
};
const slug = (value) => String(value).replace(/[^a-z0-9-]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ args: ['--disable-lcd-text'] });
const records = [];
const failures = [];

for (const [deviceName, device] of Object.entries(devices)) {
  const dir = path.join(output, deviceName);
  await mkdir(dir, { recursive: true });
  for (const spec of config.pages) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      isMobile: Boolean(device.isMobile),
      hasTouch: Boolean(device.hasTouch),
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    const id = `${slug(spec.id)}-${deviceName}`;
    try {
      const response = await page.goto(`${baseUrl}${spec.route}`, { waitUntil: 'networkidle', timeout: 60000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
      await page.evaluate(() => document.fonts?.ready);
      const metrics = await page.evaluate(() => {
        const visible = (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const supportPattern = /(support|donat(?:e|ion)|contribut|fund|back this|help keep|tip|wallet)/i;
        const supportLinks = [...document.querySelectorAll('a,button')].filter(visible).map((element) => {
          const rect = element.getBoundingClientRect();
          const text = `${element.textContent ?? ''} ${element.getAttribute('aria-label') ?? ''}`.replace(/\s+/g, ' ').trim();
          const href = element instanceof HTMLAnchorElement ? element.href : '';
          return {
            text, href,
            location: element.closest('header') ? 'header' : element.closest('footer') ? 'footer' : element.closest('main') ? 'main' : 'other',
            top: Math.round(rect.top + scrollY),
            in_initial_viewport: rect.bottom > 0 && rect.top < innerHeight
          };
        }).filter((item) => supportPattern.test(`${item.text} ${item.href}`));
        const root = document.documentElement;
        return {
          title: document.title,
          h1_count: document.querySelectorAll('h1').length,
          main_count: document.querySelectorAll('main').length,
          horizontal_overflow_px: Math.max(0, root.scrollWidth - root.clientWidth),
          body_height: Math.round(document.body.getBoundingClientRect().height),
          broken_images: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
          support_links: supportLinks,
          support_link_count: supportLinks.length,
          support_links_in_initial_viewport: supportLinks.filter((item) => item.in_initial_viewport).length
        };
      });
      const viewportFile = path.join(dir, `${id}.viewport.png`);
      const fullFile = path.join(dir, `${id}.full.png`);
      await page.screenshot({ path: viewportFile });
      await page.screenshot({ path: fullFile, fullPage: true });
      const issues = [];
      if (metrics.h1_count !== 1) issues.push(`expected one h1, found ${metrics.h1_count}`);
      if (metrics.main_count !== 1) issues.push(`expected one main, found ${metrics.main_count}`);
      if (metrics.horizontal_overflow_px > 2) issues.push(`horizontal overflow ${metrics.horizontal_overflow_px}px`);
      if (metrics.broken_images.length) issues.push(`${metrics.broken_images.length} broken image(s)`);
      const record = { id, page_id: spec.id, route: spec.route, device: deviceName, viewport: device, viewport_file: viewportFile, full_file: fullFile, metrics, issues };
      records.push(record);
      if (issues.length) failures.push(record);
      console.log(`[${deviceName}] captured ${spec.route}`);
    } catch (error) {
      failures.push({ id, page_id: spec.id, route: spec.route, device: deviceName, issues: [error instanceof Error ? error.message : String(error)] });
      console.error(`[${deviceName}] failed ${spec.route}: ${error}`);
    } finally {
      await context.close();
    }
  }
}
await browser.close();

const manifest = {
  schema_version: '1.0',
  site: config.site,
  generated_at: new Date().toISOString(),
  expected_state_count: config.pages.length * Object.keys(devices).length,
  captured_state_count: records.length,
  screenshot_count: records.length * 2,
  failure_count: failures.length,
  status: failures.length === 0 ? 'pass' : 'fail',
  records,
  failures
};
await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
const cards = records.map((record) => `<article><h2>${record.page_id} · ${record.device}</h2><p><code>${record.route}</code></p><img src="${path.relative(output, record.viewport_file)}"><img src="${path.relative(output, record.full_file)}"><p>Support-like links: ${record.metrics.support_link_count}; initial viewport: ${record.metrics.support_links_in_initial_viewport}</p></article>`).join('');
await writeFile(path.join(output, 'index.html'), `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${config.site} visual review</title><style>body{font-family:system-ui;margin:24px;background:#eee}article{background:#fff;border:1px solid #bbb;padding:16px;margin:24px 0}img{display:block;max-width:100%;border:1px solid #ddd;margin:12px 0}</style><h1>${config.site} representative visual review</h1>${cards}`);
console.log(JSON.stringify({ site: config.site, states: `${records.length}/${manifest.expected_state_count}`, failures: failures.length }, null, 2));
if (manifest.status !== 'pass') process.exitCode = 1;
