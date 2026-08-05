#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const config = JSON.parse(await readFile(process.env.VISUAL_REVIEW_CONFIG ?? 'config/representative-visual-review.json', 'utf8'));
const baseUrl = (process.env.CAPTURE_BASE_URL ?? 'http://127.0.0.1:4173').replace(/\/$/, '');
const output = process.env.VISUAL_REVIEW_OUTPUT ?? 'artifacts/representative-visual-review';
const devices = config.devices ?? { desktop: { width: 1440, height: 1000 }, mobile: { width: 390, height: 844, isMobile: true, hasTouch: true } };
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
    const context = await browser.newContext({ viewport: { width: device.width, height: device.height }, isMobile: Boolean(device.isMobile), hasTouch: Boolean(device.hasTouch), reducedMotion: 'reduce' });
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
        const supportPattern = /(support|donat(?:e|ion)|contribut|fund|back this|help keep|wallet)/i;
        const supportControls = [...document.querySelectorAll('a,button,[aria-current="page"]')].filter(visible).map((element) => {
          const rect = element.getBoundingClientRect();
          const text = `${element.textContent ?? ''} ${element.getAttribute('aria-label') ?? ''}`.replace(/\s+/g, ' ').trim();
          const href = element instanceof HTMLAnchorElement ? element.href : '';
          return { tag: element.tagName.toLowerCase(), text, href, in_initial_viewport: rect.bottom > 0 && rect.top < innerHeight };
        }).filter((item) => supportPattern.test(`${item.text} ${item.href}`));
        const root = document.documentElement;
        return {
          title: document.title,
          h1_count: document.querySelectorAll('h1').length,
          main_count: document.querySelectorAll('main').length,
          horizontal_overflow_px: Math.max(0, root.scrollWidth - root.clientWidth),
          broken_images: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
          support_control_count: supportControls.length,
          support_controls_in_initial_viewport: supportControls.filter((item) => item.in_initial_viewport).length,
          support_self_link_count: supportControls.filter((item) => {
            if (item.tag !== 'a' || !item.href || location.pathname !== '/support/') return false;
            try { return new URL(item.href).pathname === '/support/'; } catch { return false; }
          }).length,
          footer_group_count: document.querySelectorAll('.footer-group').length,
          visible_registry_row_count: [...document.querySelectorAll('.registry-row')].filter(visible).length,
          detail_toc_count: document.querySelectorAll('.detail-page-toc').length,
          stale_foundation_copy_count: [...document.querySelectorAll('body *')].filter((element) => /registry primitives before registry data|before canonical json records are added/i.test(element.textContent || '') && element.children.length === 0).length
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
      if (metrics.footer_group_count !== 4) issues.push(`expected four footer groups, found ${metrics.footer_group_count}`);
      if (metrics.support_controls_in_initial_viewport === 0) issues.push('support control is not visible in the initial viewport');
      if (spec.route === '/support/' && metrics.support_self_link_count > 0) issues.push(`support page contains ${metrics.support_self_link_count} self-link(s)`);
      if ((spec.route === '/bridges/' || spec.route === '/incidents/') && metrics.visible_registry_row_count > 25) issues.push(`registry renders ${metrics.visible_registry_row_count} visible rows; maximum is 25`);
      if ((spec.route.startsWith('/bridge/') || spec.route.startsWith('/incident/')) && metrics.detail_toc_count !== 1) issues.push(`expected one detail TOC, found ${metrics.detail_toc_count}`);
      if (spec.route === '/' && metrics.stale_foundation_copy_count > 0) issues.push('stale pre-data foundation copy is still present');
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

const manifest = { schema_version: '1.1', site: config.site, generated_at: new Date().toISOString(), expected_state_count: config.pages.length * Object.keys(devices).length, captured_state_count: records.length, screenshot_count: records.length * 2, failure_count: failures.length, status: failures.length === 0 ? 'pass' : 'fail', records, failures };
await writeFile(path.join(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
const cards = records.map((record) => `<article><h2>${record.page_id} · ${record.device}</h2><p><code>${record.route}</code></p><img src="${path.relative(output, record.viewport_file)}"><img src="${path.relative(output, record.full_file)}"><p>Support controls: ${record.metrics.support_control_count}; initial viewport: ${record.metrics.support_controls_in_initial_viewport}; footer groups: ${record.metrics.footer_group_count}</p></article>`).join('');
await writeFile(path.join(output, 'index.html'), `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${config.site} visual review</title><style>body{font-family:system-ui;margin:24px;background:#eee}article{background:#fff;border:1px solid #bbb;padding:16px;margin:24px 0}img{display:block;max-width:100%;border:1px solid #ddd;margin:12px 0}</style><h1>${config.site} representative visual review</h1>${cards}`);
console.log(JSON.stringify({ site: config.site, states: `${records.length}/${manifest.expected_state_count}`, failures: failures.length }, null, 2));
if (manifest.status !== 'pass') process.exitCode = 1;
