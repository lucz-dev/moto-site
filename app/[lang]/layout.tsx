import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, LOCALES } from "../i18n";
import { SITE_URL } from "../i18n/metadata";
import { FONT_VARIABLES } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Motor District", template: "%s · Motor District" },
  applicationName: "Motor District",
  keywords: ["Motor District", "open world", "browser game", "driving game", "gioco di guida", "moto", "auto", "indie", "LuCz"],
  authors: [{ name: "LuCz Development", url: "https://lucz.dev" }],
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={FONT_VARIABLES}>
      <body>{children}</body>
    </html>
  );
}
