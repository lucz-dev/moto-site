import { open } from './lib.mjs';
import { writeFileSync } from 'node:fs';
const { browser, page, errors } = await open({ width: 800, height: 500 });
const data = await page.evaluate(async () => {
  const { it } = await import('/src/locales/it.ts');
  const { en } = await import('/src/locales/en.ts');
  const { vehicleKind } = await import('/src/client/economy/vehicleShop.ts');
  const cat = GAME.dealership().catalog;
  return cat.map((v) => ({ ...v, kind: vehicleKind(v.preset), it: it.vehicles[v.preset], en: en.vehicles[v.preset] }));
});
writeFileSync('catalog.json', JSON.stringify(data, null, 1));
console.log(data.length, JSON.stringify(data[0], null, 1), JSON.stringify(data.find(d=>d.preset.startsWith('arcade')), null, 1));
await browser.close(); console.log(errors.filter(e=>!e.includes('502') && !e.includes('404')));
