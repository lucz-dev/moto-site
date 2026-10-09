import type { Metadata } from "next";
import Link from "next/link";
import Icon from "./components/Icon";
import Wordmark from "./components/Wordmark";
import { FONT_VARIABLES } from "./fonts";
import { pathOf } from "./i18n/config";
import { SITE_URL } from "./i18n/metadata";
import "./globals.css";

// Addresses that match no route at all. The root layout lives under [lang],
// so this page brings its own <html> and speaks both languages.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "404 · Motor District",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={FONT_VARIABLES}>
      <body>
        <main id="main" className="lost">
          <Link href={pathOf("en")} aria-label="Motor District">
            <Wordmark />
          </Link>
          <h1 className="lost__title">Road closed.</h1>
          <p className="intro">
            This page doesn&apos;t exist, or it has moved.{" "}
            <span lang="it">Questa pagina non esiste, o è stata spostata.</span>
          </p>
          <p className="lost__actions">
            <Link className="btn btn--primary" href={pathOf("en")} hrefLang="en">
              <Icon name="back" /> Back to the home page
            </Link>
            <Link className="btn btn--ghost" href={pathOf("it")} hrefLang="it" lang="it">
              Torna alla home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
