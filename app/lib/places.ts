import type { StaticImageData } from "next/image";
import portoReale from "../media/porto-reale.jpg";
import porto from "../media/porto.jpg";
import valdoria from "../media/valdoria.jpg";
import portoBadisco from "../media/porto-badisco.jpg";
import santaCesarea from "../media/santa-cesarea.jpg";
import valChiaro from "../media/val-chiaro.jpg";
import aeroporto from "../media/aeroporto.jpg";
import mugello from "../media/mugello.jpg";

// The island's areas, in the order of the game's start menu. Their texts are in the
// dictionaries (pages.island.places), keyed by these ids.
export const PLACE_IDS = ["porto-reale", "porto", "valdoria", "porto-badisco", "santa-cesarea", "val-chiaro", "aeroporto", "mugello"] as const;
export type PlaceId = (typeof PLACE_IDS)[number];

export const PLACE_IMAGES: Record<PlaceId, StaticImageData> = {
  "porto-reale": portoReale,
  porto,
  valdoria,
  "porto-badisco": portoBadisco,
  "santa-cesarea": santaCesarea,
  "val-chiaro": valChiaro,
  aeroporto,
  mugello,
};

export type PlaceText = { name: string; start: string; alt: string; body: string; facts: string[] };
