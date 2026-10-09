// Languages and localized routes. The site is in Italian and English; every page has
// its own slug per language, so /it/concessionaria and /en/dealership are the same page.

export const LOCALES = ["it", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** For visitors whose browser asks for neither language (the game itself starts in English). */
export const DEFAULT_LOCALE: Locale = "en";

export const hasLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** Number formatting per language (in-game English uses British spelling). */
export const NUMBER_LOCALE: Record<Locale, string> = { it: "it-IT", en: "en-GB" };

/** The preview pages, in reading order: header, footer and the prev/next links follow it. */
export const PAGE_KEYS = ["island", "activities", "dealership", "workshop", "life", "play"] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export const SLUGS: Record<PageKey, Record<Locale, string>> = {
  island: { it: "isola", en: "island" },
  activities: { it: "attivita", en: "activities" },
  dealership: { it: "concessionaria", en: "dealership" },
  workshop: { it: "officina", en: "workshop" },
  life: { it: "vita", en: "life" },
  play: { it: "come-si-gioca", en: "how-to-play" },
};

/** Path of the home (no key) or of a preview page in `lang`. */
export const pathOf = (lang: Locale, page?: PageKey) => (page ? `/${lang}/${SLUGS[page][lang]}` : `/${lang}`);

export const pageOfSlug = (lang: Locale, slug: string): PageKey | undefined =>
  PAGE_KEYS.find((key) => SLUGS[key][lang] === slug);
