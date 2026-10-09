import { open, hideHud } from './lib.mjs';
const { browser, page, errors } = await open({ width: 1920, height: 1080 });
await page.evaluate(() => GAME.setQuality('ultra', true));
const pose = (e, t) => page.evaluate(({ e, t }) => { GAME.camera('free'); GAME.cameraPose({ x: e[0], y: e[1], z: e[2], tx: t[0], ty: t[1], tz: t[2] }); }, { e, t });
const shot = (n) => page.screenshot({ path: `action/${n}.png` });
let MY = null;
const me = () => page.evaluate((id) => GAME.cars().find(c => c.id === id), MY);
async function rel(b, f, s, h, tf, ts, th) { // camera relative to body heading: forward f, left s, up h; target likewise
  const fx = Math.sin(b.heading), fz = Math.cos(b.heading), lx = fz, lz = -fx;
  await pose([b.x + fx * f + lx * s, b.y + h, b.z + fz * f + lz * s], [b.x + fx * tf + lx * ts, b.y + th, b.z + fz * tf + lz * ts]);
}
// --- police chase in Valdoria
try {
  await page.evaluate(() => GAME.load({ map: 'island-empty', place: 'metropolis', vehicle: 'centauri', seed: 5 }));
  await hideHud(page);
  MY = await page.evaluate(() => { const p = GAME.player(); GAME.driveCar(p.nearId); return p.nearId; });
  await page.waitForTimeout(1500);
  await page.evaluate(() => GAME.camera('follow'));
  await page.evaluate(() => { GAME.pursuit({ level: 3 }); GAME.pursuit({ unit: true }); GAME.pursuit({ unit: true }); });
  await page.evaluate(() => GAME.setInput({ throttle: 0.5 }));
  for (let i = 0; i < 5; i++) {
    await page.waitForTimeout(1200);
    const b = await me();
    await rel(b, 9, -2.5, 1.0, -6, 0.5, 1.0);
    await page.waitForTimeout(150);
    await shot(`police-${i}`);
    console.log('police', i, JSON.stringify(await page.evaluate(() => { const p = GAME.pursuit(); return { level: p.level, units: p.units?.length ?? p.units }; })));
  }
  await page.evaluate(() => GAME.setInput({ throttle: 0, brake: 1 }));
} catch (e) { console.log('police failed', e.message); }
// --- drag at the airport
try {
  await page.evaluate(() => { GAME.pursuit({ level: 0 }); GAME.pursuit({ enabled: false }); });
  await page.evaluate(() => GAME.load({ map: 'island-empty', place: 'airport', vehicle: 'mercurio', seed: 5 }));
  await hideHud(page);
  const dr = await page.evaluate(() => GAME.drag({ mode: 'challenge', kind: 'car', preset: 'mercurio', opponent: 'centauri' }));
  MY = dr.player.id; console.log('drag', JSON.stringify(dr).slice(0, 200));
  await page.waitForTimeout(1500);
  let b = await me();
  await rel(b, 10, 2.2, 1.1, 0, 2.2, 0.7); await page.waitForTimeout(400); await shot('drag-staged');
  await rel(b, 5, -3.5, 0.8, 0, 2, 0.7); await page.waitForTimeout(400); await shot('drag-staged2');
  for (let i = 0; i < 40; i++) { const s = await page.evaluate(() => JSON.stringify(GAME.drag())); if (/"phase":"(go|run|racing)"|"green"/.test(s) || i === 39) { console.log('drag state', s.slice(0, 300)); break; } await page.waitForTimeout(150); }
  await page.evaluate(() => GAME.setInput({ throttle: 1 }));
  for (const [i, wait] of [[0, 900], [1, 1300], [2, 1800]]) {
    await page.waitForTimeout(wait);
    b = await me();
    await rel(b, 6, -7, 1.2, 0, 2.5, 0.7); await page.waitForTimeout(60); await shot(`drag-run-${i}`);
  }
} catch (e) { console.log('drag failed', e.message); }
await browser.close(); console.log(errors.filter(e => !e.includes('502') && !e.includes('404')));
