import { SITE } from './env.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const cat = JSON.parse(readFileSync('catalog.json', 'utf8'));
const dims = JSON.parse(readFileSync('dims.json', 'utf8'));
const K = ['speed', 'acceleration', 'grip', 'braking', 'launch', 'offroad'];
const rows = cat.map((v) => [
  v.preset, v.category, v.kind === 'bike' ? 1 : 0, v.it.name, [v.it.type, v.en.type], [v.it.blurb, v.en.blurb], v.price, v.stats.cls, v.stats.pi,
  Math.round(v.stats.powerKw), Math.round(v.stats.mass), v.stats.gearCount,
  K.map((k) => Math.round(Math.min(1, Math.max(0, v.stats.scores[k])) * 100)),
  v.garageAllowed ? 1 : 0, dims[v.preset],
]);
const out = `// Generated from the Motor District build (window.GAME.dealership().catalog and the
// it/en locales) by scripts/capture/gen-catalog.mjs — do not edit by hand. Values are what
// the in-game dealership shows: class + PI, kW, kg, six 0–10 bars (stored ×10).
// Regenerate with the game's dev server running, see scripts/capture/README.md.

export type CategoryKey = "city" | "sport" | "super" | "utility" | "race" | "bikes";

/** Dealership order of the categories (labels are in the dictionaries). */
export const CATEGORY_KEYS: CategoryKey[] = ["city", "sport", "super", "utility", "race", "bikes"];

type Text = { it: string; en: string };

export type Vehicle = {
  id: string;
  category: CategoryKey;
  bike: boolean;
  name: string;
  type: Text;
  blurb: Text;
  price: number;
  cls: string;
  pi: number;
  kw: number;
  kg: number;
  gears: number;
  /** Speed, acceleration, handling, braking, launch, off-road: 0…100 (shown ÷10). */
  bars: [number, number, number, number, number, number];
  garage: boolean;
  /** Pixel size of /media/vehicles/<id>.webp. */
  size: [number, number];
};

type Row = [string, CategoryKey, 0 | 1, string, [string, string], [string, string], number, string, number, number, number, number, number[], 0 | 1, number[]];

const ROWS: Row[] = [
${rows.map((r) => '  ' + JSON.stringify(r)).join(',\n')}
];

export const VEHICLES: Vehicle[] = ROWS.map(([id, category, bike, name, type, blurb, price, cls, pi, kw, kg, gears, bars, garage, size]) => ({
  id, category, bike: bike === 1, name, type: { it: type[0], en: type[1] }, blurb: { it: blurb[0], en: blurb[1] },
  price, cls, pi, kw, kg, gears, bars: bars as Vehicle["bars"], garage: garage === 1, size: size as [number, number],
}));

export const COUNTS = {
  total: VEHICLES.length,
  cars: VEHICLES.filter((v) => !v.bike).length,
  bikes: VEHICLES.filter((v) => v.bike).length,
};
`;
writeFileSync(`${SITE}/app/lib/catalog.ts`, out);
console.log(rows.length, out.length);
