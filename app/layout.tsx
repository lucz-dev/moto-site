import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://moto-site.vercel.app"),
  title: "MOTO — free-roam arcade di moto e auto, nel browser",
  description:
    "Otto moto, ventuno auto, una città-isola intera da scorrazzare in free-roam. Traffico, ponti sul mare, consegne, officina e tuning. Niente download: apri il browser e parti.",
  keywords: ["MOTO", "gioco di guida", "free roam", "browser game", "arcade", "moto", "auto", "indie game"],
  authors: [{ name: "lucz" }],
  openGraph: {
    title: "MOTO — guida tutta la città, nel browser",
    description:
      "Free-roam arcade di moto e auto: una città-isola con traffico, ponti e consegne. Gira nel browser, su desktop e mobile.",
    type: "website",
    images: ["/media/boulevard.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0F12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
