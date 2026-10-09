import { open, hideHud } from './lib.mjs';
import { readFileSync } from 'node:fs';
const shots = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const { browser, page, errors } = await open({ width: 1920, height: 1080 });
await page.evaluate(() => GAME.setQuality('ultra', true));
await page.evaluate(() => GAME.load({ map: 'island-empty', place: 'portoreale', vehicle: 'foot', seed: 7 }));
await hideHud(page);
await page.evaluate(() => GAME.pursuit?.({ enabled: false }));
for (const s of shots) {
  if (s.place || s.at) {
    await page.evaluate((s) => { GAME.camera('follow'); if (s.place) GAME.teleport(s.place); else GAME.teleport(s.at[0], s.at[1]); }, s);
    await page.waitForTimeout(s.wait ?? 6000);
  }
  await page.evaluate((s) => { GAME.camera('free'); GAME.cameraPose({ x: s.eye[0], y: s.eye[1], z: s.eye[2], tx: s.look[0], ty: s.look[1], tz: s.look[2] }); }, s);
  await page.waitForTimeout(s.settle ?? 2500);
  await page.screenshot({ path: `scenes/${s.name}.png` });
  console.log('shot', s.name);
}
await browser.close(); console.log(errors.filter(e=>!e.includes('502') && !e.includes('404')));
