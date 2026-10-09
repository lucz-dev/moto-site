import { chromium, CHROME, GAME_URL } from './env.mjs';
/** Launch Chrome on the game; `init` scripts run in the page before the game loads. */
export async function open({ width = 1920, height = 1080, init = [] } = {}) {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME, args: ['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist','--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage({ viewport: { width, height }, locale: 'en-US' });
  for (const script of init) await page.addInitScript(script);
  const errors = []; page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(GAME_URL);
  await page.evaluate(() => GAME.ready());
  await page.evaluate(() => { GAME.setQuality('high', true); GAME.audio?.({ enabled: false }); });
  return { browser, page, errors };
}
export const hideHud = (page) => page.addStyleTag({ content: '#ui, #version { display: none !important; }' });
