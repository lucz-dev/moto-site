import { NUMBER_LOCALE, type Locale } from "./config";
import en from "./en";
import it, { type Dictionary } from "./it";

export type { Dictionary };
export * from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { it, en };

export const getDictionary = (lang: Locale): Dictionary => DICTIONARIES[lang];

/** A date as the language writes it, e.g. "8 ottobre 2026" / "8 October 2026". */
export const formatDate = (lang: Locale, iso: string) =>
  new Intl.DateTimeFormat(NUMBER_LOCALE[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
