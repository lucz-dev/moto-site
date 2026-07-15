import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["it", "en"].map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: {
      languages: {
        it: `${SITE_URL}/it`,
        en: `${SITE_URL}/en`,
      },
    },
    images: [`${SITE_URL}/media/hero-poster.webp`],
  }));
}
