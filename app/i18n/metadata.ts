import type { Metadata } from "next";
import { LOCALES, pathOf, type Locale, type PageKey } from "./config";
import { getDictionary } from "./index";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moto.lucz.dev";

// Set on every page: a page's openGraph replaces the parent's, images included.
const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: "Motor District — Your island. Your rules." };

/** Title, description, canonical and hreflang links of the home (no key) or a preview page. */
export function pageMetadata(lang: Locale, page?: PageKey): Metadata {
  const t = getDictionary(lang);
  const title = page ? t.pages[page].meta.title : t.meta.title;
  const description = page ? t.pages[page].meta.description : t.meta.description;
  const languages = Object.fromEntries(LOCALES.map((l) => [l, pathOf(l, page)]));
  return {
    title: page ? title : { absolute: title },
    description,
    alternates: { canonical: pathOf(lang, page), languages: { ...languages, "x-default": pathOf("en", page) } },
    openGraph: {
      title: page ? `${title} · Motor District` : title,
      description,
      url: pathOf(lang, page),
      siteName: "Motor District",
      type: "website",
      locale: t.meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => getDictionary(l).meta.ogLocale),
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE] },
  };
}
