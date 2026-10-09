import { chromium, CHROME, GAME_URL } from './env.mjs';
const ids = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, executablePath: CHROME, args: ['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist'] });
for (const id of ids) {
  const [pid, view] = id.split(':');
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, locale: 'en-US' });
  await page.addInitScript(() => { try { localStorage.setItem('moto2.settings', JSON.stringify({ quality: 'ultra', shadows: true })); } catch {} });
  await page.goto(`${GAME_URL}/?preview=${pid}${view ? '&view=' + view : ''}`);
  await page.evaluate(() => GAME.ready());
  for (let i = 0; i < 80; i++) { const ok = await page.evaluate(() => !!GAME.getState?.()?.session || GAME.camera?.() === 'free'); if (ok) break; await page.waitForTimeout(500); }
  await page.addStyleTag({ content: '#ui, #version { display: none !important; }' });
  await page.waitForTimeout(9000);
  await page.screenshot({ path: `bld/${pid}${view ? '-' + view : ''}.png` });
  console.log('ok', id, await page.evaluate(() => GAME.quality().level));
  await page.close();
}
await browser.close();
