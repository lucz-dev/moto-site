import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import MotionProvider from "@/app/components/MotionProvider";
import { SITE_URL } from "@/app/lib/content";
import { routing } from "@/i18n/routing";
import "../globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "optional",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "optional",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mono",
  display: "optional",
});

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonical = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    applicationName: "MOTO",
    keywords: ["MOTO", "free roam", "browser game", "arcade", "motorcycle game", "car game", "indie game"],
    authors: [{ name: "lucz" }],
    creator: "lucz",
    alternates: {
      canonical,
      languages: {
        it: `${SITE_URL}/it`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/it`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "MOTO",
      locale: locale === "it" ? "it_IT" : "en_US",
      alternateLocale: locale === "it" ? ["en_US"] : ["it_IT"],
      title: t("title"),
      description: t("description"),
      images: [{ url: "/media/wheelie-hero-poster.webp", width: 1920, height: 1080, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/media/wheelie-hero-poster.webp"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
