import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PACK_DIR = path.join(ROOT, 'test-pack');
const LOGS_DIR = path.join(PACK_DIR, 'logs');
const INTERACT_DIR = path.join(PACK_DIR, 'interactions');
const LH_DIR = path.join(PACK_DIR, 'lighthouse');
const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const consoleLogs = [];
  const failedRequests = [];
  let consoleErrorCount = 0;
  let failedRequestCount = 0;

  const attach = (page, label) => {
    page.on('console', (msg) => {
      consoleLogs.push(`[${label}] [${msg.type()}] ${msg.text()}`);
      if (msg.type() === 'error') consoleErrorCount++;
    });
    page.on('pageerror', (err) => {
      consoleLogs.push(`[${label}] [pageerror] ${err.message}`);
      consoleErrorCount++;
    });
    page.on('requestfailed', (req) => {
      failedRequests.push(`[${label}] FAILED ${req.method()} ${req.url()} -> ${req.failure()?.errorText}`);
      failedRequestCount++;
    });
    page.on('response', (res) => {
      if (res.status() >= 400) {
        failedRequests.push(`[${label}] HTTP ${res.status()} ${res.url()}`);
        failedRequestCount++;
      }
    });
  };

  // Desktop: Lookbook + Contact Form + Configurator WhatsApp URL check
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  attach(page, 'desktop');
  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.evaluate(() => window.dispatchEvent(new Event('pointerdown')));
  await page.waitForTimeout(1500);

  // Configurator WhatsApp URL
  await page.evaluate(() => document.querySelector('#design-your-look')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  const waHref = await page.locator('#design-your-look a[href*="wa.me"]').first().getAttribute('href').catch(() => null);
  fs.writeFileSync(path.join(LOGS_DIR, 'configurator-whatsapp.txt'), waHref || 'NOT_FOUND', 'utf8');

  // Lookbook
  await page.evaluate(() => document.querySelector('#lookbook')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-before.png'), animations: 'disabled' });
  await page.locator('#lookbook [data-cursor="view"]').first().click({ force: true, timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-after.png'), animations: 'disabled' });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // Contact form
  await page.evaluate(() => document.querySelector('#visit-us')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-before.png'), animations: 'disabled' });
  await page.locator('#visit-us input[type="text"]').first().fill('Arjun Kapoor', { force: true, timeout: 4000 }).catch(() => {});
  await page.locator('#visit-us input[type="tel"]').first().fill('+91 98111 22334', { force: true, timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-after.png'), animations: 'disabled' });
  await context.close();

  // Mobile menu
  const mCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mCtx.newPage();
  attach(mPage, 'mobile-menu');
  await mPage.goto(BASE_URL, { waitUntil: 'load' });
  await mPage.waitForTimeout(800);
  await mPage.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-before.png'), animations: 'disabled' });
  await mPage.locator('header button[aria-label*="menu" i]').click({ force: true, timeout: 4000 }).catch(() => {});
  await mPage.waitForTimeout(600);
  await mPage.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-after.png'), animations: 'disabled' });
  await mCtx.close();

  await browser.close();

  fs.writeFileSync(path.join(LOGS_DIR, 'console.log'), consoleLogs.join('\n'), 'utf8');
  fs.writeFileSync(path.join(LOGS_DIR, 'failed-requests.log'), failedRequests.join('\n'), 'utf8');

  const summary = {
    configuratorWhatsAppUrl: waHref,
    consoleErrorCount,
    failedRequestCount,
  };
  for (const kind of ['mobile', 'desktop']) {
    const lp = path.join(LH_DIR, `${kind}.json`);
    if (fs.existsSync(lp)) {
      const j = JSON.parse(fs.readFileSync(lp, 'utf8'));
      summary[`lighthouse_${kind}`] = {
        performance: Math.round((j.categories?.performance?.score ?? 0) * 100),
        accessibility: Math.round((j.categories?.accessibility?.score ?? 0) * 100),
        bestPractices: Math.round((j.categories?.['best-practices']?.score ?? 0) * 100),
        seo: Math.round((j.categories?.seo?.score ?? 0) * 100),
        fcp: j.audits['first-contentful-paint']?.displayValue,
        lcp: j.audits['largest-contentful-paint']?.displayValue,
        tbt: j.audits['total-blocking-time']?.displayValue,
        cls: j.audits['cumulative-layout-shift']?.displayValue,
        si: j.audits['speed-index']?.displayValue,
        totalMB: Number(((j.audits['total-byte-weight']?.numericValue ?? 0) / 1048576).toFixed(2)),
      };
    }
  }
  fs.writeFileSync(path.join(LOGS_DIR, 'summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('FINISH_DONE', JSON.stringify(summary));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
