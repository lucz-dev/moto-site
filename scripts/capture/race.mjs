import { open, hideHud } from './lib.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
// args: name place vehicle course kind rivals followId [chase json] [recordMs]
const [name, place, vehicle, course, kind, rivals, followId, chaseJson, recordMs, stillsJson] = process.argv.slice(2);
const { browser, page, errors } = await open({ width: 1920, height: 1080 });
await page.evaluate(() => GAME.setQuality('ultra', true));
await page.evaluate(({ place, vehicle }) => GAME.load({ map: 'island-empty', place, vehicle, seed: 11 }), { place, vehicle });
await page.addScriptTag({ content: readFileSync('chase.js', 'utf8') });
await hideHud(page);
await page.evaluate(() => GAME.pursuit?.({ enabled: false }));
console.log(await page.evaluate(({ course, kind, rivals }) => JSON.stringify(GAME.roadRace(course, { kind, rivals: +rivals })), { course, kind, rivals }));
// grid still: camera ahead of the grid looking back
const grid = await page.evaluate(({ kind }) => { const list = kind === 'bike' ? GAME.bikes() : GAME.cars(); return list.map(b => ({ id: b.id, x: b.x, y: b.y, z: b.z, h: b.heading })); }, { kind });
writeFileSync(`clips/${name}-grid.json`, JSON.stringify(grid));
await page.waitForTimeout(1500);
const lead = grid.find(b => b.id === +followId) ?? grid[0];
const fx = Math.sin(lead.h), fz = Math.cos(lead.h);
await page.evaluate(({ e, t }) => { GAME.camera('free'); GAME.cameraPose({ x: e[0], y: e[1], z: e[2], tx: t[0], ty: t[1], tz: t[2] }); }, { e: [lead.x + fx * 14 + fz * 4, lead.y + 1.4, lead.z + fz * 14 - fx * 4], t: [lead.x - fx * 6, lead.y + 0.6, lead.z - fz * 6] });
await page.waitForTimeout(1200);
await page.screenshot({ path: `clips/${name}-grid.png` });
// wait for green
for (let i = 0; i < 60; i++) { const s = await page.evaluate(() => GAME.roadRaceInfo()?.state); if (s === 'racing') break; await page.waitForTimeout(250); }
const chase = Object.assign({ kind, id: +followId }, JSON.parse(chaseJson || '{}'));
await page.evaluate((c) => window.__chase(c), chase);
await page.waitForTimeout(600);
const stills = JSON.parse(stillsJson || '[]');
const recP = +recordMs ? page.evaluate((ms) => window.__record(ms), +recordMs) : null;
let t = 600;
for (const at of stills) { await page.waitForTimeout(Math.max(0, at - t)); t = at; await page.screenshot({ path: `clips/${name}-${at}.png` }); }
if (recP) { const b64 = await recP; writeFileSync(`clips/${name}.mp4`, Buffer.from(b64, 'base64')); console.log('video bytes', Buffer.from(b64, 'base64').length); }
console.log(await page.evaluate(() => { const i = GAME.roadRaceInfo(); return i.state + ' ' + i.standings.slice(0, 3).map(s => s.name + ':' + Math.round(s.progress)).join(' '); }));
await browser.close(); console.log(errors.filter(e => !e.includes('502') && !e.includes('404')));
