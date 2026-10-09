import { chromium, CHROME, GAME_URL } from './env.mjs';
import { readFileSync, existsSync } from 'node:fs';
const cat = JSON.parse(readFileSync('catalog.json', 'utf8'));
const only = process.argv[2] ? process.argv[2].split(',') : null;
const browser = await chromium.launch({ headless: true, executablePath: CHROME, args: ['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 1.5, locale: 'en-US' });
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
await page.goto(GAME_URL);
await page.evaluate(() => GAME.ready());
await page.addStyleTag({ content: 'html,body,#ui,#app,*:not(canvas){background:transparent!important;background-image:none!important} #app,#ui,#version{display:none!important} html::before,html::after,body::before,body::after{display:none!important} canvas.look-preview{background:none!important;box-shadow:none!important;border:0!important;border-radius:0!important;filter:none!important}' });
await page.evaluate(async () => {
  const { CarPreview } = await import('/src/client/ui/carPreview.ts');
  const p = new CarPreview('render');
  Object.assign(p.canvas.style, { position: 'fixed', left: '0', top: '0', width: '1200px', height: '750px', zIndex: 10 });
  document.body.append(p.canvas);
  p.open();
  window.__p = p;
});
let n = 0;
for (const v of cat) {
  if (only && !only.includes(v.preset)) continue;
  const out = `renders/all2/${v.preset}.png`;
  if (!only && existsSync(out)) continue;
  const yaw = v.kind === 'bike' ? 1.0 : 0.7;
  await page.evaluate(({ id, yaw }) => { __p.show(id, { paint: 0, wheels: null }); __p.yaw = yaw; __p.still = -1e9; }, { id: v.preset, yaw });
  await page.waitForTimeout(n === 0 ? 3000 : 1600);
  await page.screenshot({ path: out, omitBackground: true });
  n++;
  if (n % 20 === 0) console.log(n, v.preset);
}
console.log('done', n, errors);
await browser.close();
