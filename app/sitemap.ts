import type { MetadataRoute } from "next";
import { LOCALES, PAGE_KEYS, pathOf, type PageKey } from "./i18n/config";
import { SITE_URL } from "./i18n/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: (PageKey | undefined)[] = [undefined, ...PAGE_KEYS];
  return pages.flatMap((page) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}${pathOf(lang, page)}`,
      changeFrequency: "weekly" as const,
      priority: page ? 0.8 : 1,
      alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${pathOf(l, page)}`])) },
    })),
  );
}
