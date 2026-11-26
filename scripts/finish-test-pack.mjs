import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PACK_DIR = path.join(ROOT, 'test-pack');
const LOGS_DIR = path.join(PACK_DIR, 'logs');
const LH_DIR = path.join(PACK_DIR, 'lighthouse');
const INTERACT_DIR = path.join(PACK_DIR, 'interactions');

const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function waitForPreloader(page) {
  await page.waitForTimeout(3600);
  const skipBtn = page.getByRole('button', { name: /enter atelier/i });
  if (await skipBtn.isVisible().catch(() => false)) {
    await skipBtn.click({ force: true }).catch(() => {});
    await page.waitForTimeout(900);
  }
}

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

  // Desktop interactions: Configurator, Lookbook, Contact Form
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    attach(page, 'desktop-interactions');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await waitForPreloader(page);

    // Configurator all 5 steps + final WhatsApp URL
    await page.evaluate(() => document.querySelector('#design-your-look')?.scrollIntoView());
    await page.waitForTimeout(700);
    for (let s = 1; s <= 5; s++) {
      const stepBtn = page.locator('#design-your-look button').filter({ hasText: `0${s}` }).first();
      if (await stepBtn.count()) {
        await stepBtn.click({ force: true, timeout: 4000 }).catch(() => {});
        await page.waitForTimeout(550);
      }
      await page.screenshot({ path: path.join(INTERACT_DIR, `configurator-step-${s}.png`) });
    }
    const waHref = await page
      .locator('#design-your-look a[href*="wa.me"]')
      .first()
      .getAttribute('href')
      .catch(() => null);
    fs.writeFileSync(path.join(LOGS_DIR, 'configurator-whatsapp.txt'), waHref || 'NOT_FOUND', 'utf8');
    console.log('Configurator WhatsApp URL:', waHref);

    // Lookbook lightbox before/after
    await page.evaluate(() => document.querySelector('#lookbook')?.scrollIntoView());
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-before.png') });
    await page
      .locator('#lookbook [data-cursor="view"]')
      .first()
      .click({ force: true, timeout: 4000 })
      .catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-after.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);

    // Contact form before/after
    await page.evaluate(() => document.querySelector('#visit-us')?.scrollIntoView());
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-before.png') });
    const nameInput = page.locator('#visit-us input[type="text"]').first();
    const phoneInput = page.locator('#visit-us input[type="tel"]').first();
    if (await nameInput.count()) {
      await nameInput.fill('Arjun Kapoor', { force: true, timeout: 4000 }).catch(() => {});
    }
    if (await phoneInput.count()) {
      await phoneInput.fill('+91 98111 22334', { force: true, timeout: 4000 }).catch(() => {});
    }
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-after.png') });
    await context.close();
  }

  // Mobile menu before/after at 390x844
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    attach(page, 'mobile-menu');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await waitForPreloader(page);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-before.png') });
    await page
      .locator('header button[aria-label*="menu" i]')
      .click({ force: true, timeout: 4000 })
      .catch(() => {});
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-after.png') });
    await context.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(LOGS_DIR, 'console.log'), consoleLogs.join('\n'), 'utf8');
  fs.writeFileSync(path.join(LOGS_DIR, 'failed-requests.log'), failedRequests.join('\n'), 'utf8');

  // Lighthouse mobile & desktop JSON
  console.log('Running Lighthouse mobile...');
  try {
    execSync(
      `npx lighthouse ${BASE_URL} --output=json --output-path="${path.join(
        LH_DIR,
        'mobile.json'
      )}" --chrome-path="${CHROME_PATH}" --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo`,
      { cwd: ROOT, stdio: 'pipe', timeout: 90000 }
    );
  } catch (e) {
    console.warn('Lighthouse mobile warning:', e.message);
  }

  console.log('Running Lighthouse desktop...');
  try {
    execSync(
      `npx lighthouse ${BASE_URL} --preset=desktop --output=json --output-path="${path.join(
        LH_DIR,
        'desktop.json'
      )}" --chrome-path="${CHROME_PATH}" --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo`,
      { cwd: ROOT, stdio: 'pipe', timeout: 90000 }
    );
  } catch (e) {
    console.warn('Lighthouse desktop warning:', e.message);
  }

  const lhSummary = {};
  for (const kind of ['mobile', 'desktop']) {
    const lp = path.join(LH_DIR, `${kind}.json`);
    if (fs.existsSync(lp)) {
      const j = JSON.parse(fs.readFileSync(lp, 'utf8'));
      lhSummary[kind] = {
        performance: Math.round((j.categories?.performance?.score ?? 0) * 100),
        accessibility: Math.round((j.categories?.accessibility?.score ?? 0) * 100),
        bestPractices: Math.round((j.categories?.['best-practices']?.score ?? 0) * 100),
        seo: Math.round((j.categories?.seo?.score ?? 0) * 100),
      };
    }
  }

  console.log('DONE_FINISH_TEST_PACK', JSON.stringify({ consoleErrorCount, failedRequestCount, lhSummary }));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
