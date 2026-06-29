// Real in-game vehicle data, pulled live from the MOTO build's catalog
// (window.GAME.vehicles). Stats are 0–100: accelerazione, velocità,
// maneggevolezza, peso.
export type Vehicle = {
  id: string;
  name: string;
  type: string;
  kind: "bike" | "car";
  stats: { acc: number; top: number; hand: number; weight: number };
};

export const FEATURED: Vehicle[] = [
  { id: "hadar", name: "Hadar", type: "Formula 1", kind: "car", stats: { acc: 100, top: 100, hand: 98, weight: 8 } },
  { id: "thalassa", name: "Thalassa", type: "Hypercar", kind: "car", stats: { acc: 95, top: 97, hand: 90, weight: 12 } },
  { id: "aphrodite", name: "Aphrodite", type: "Supercar", kind: "car", stats: { acc: 93, top: 95, hand: 80, weight: 63 } },
  { id: "makhai", name: "Makhai", type: "Moto sportiva", kind: "bike", stats: { acc: 92, top: 100, hand: 68, weight: 68 } },
  { id: "nausikaa", name: "Nausikaa", type: "Moto sportiva", kind: "bike", stats: { acc: 88, top: 92, hand: 85, weight: 50 } },
  { id: "centauri", name: "Centauri", type: "Muscle", kind: "car", stats: { acc: 82, top: 86, hand: 64, weight: 60 } },
  { id: "massalia", name: "Massalia", type: "Moto enduro", kind: "bike", stats: { acc: 66, top: 52, hand: 90, weight: 35 } },
  { id: "pluton", name: "Pluton", type: "Citycar", kind: "car", stats: { acc: 58, top: 50, hand: 86, weight: 26 } },
];

export const ROSTER = { bikes: 8, cars: 21, total: 29 };
