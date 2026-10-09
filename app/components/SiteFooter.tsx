import Link from "next/link";
import { getDictionary, PAGE_KEYS, pathOf, type Locale, type PageKey } from "../i18n";
import { STUDIO_URL } from "../lib/site";
import { LangSwitch } from "./SiteHeader";
import Wordmark from "./Wordmark";

export default function SiteFooter({ lang, page }: { lang: Locale; page?: PageKey }) {
  const t = getDictionary(lang);
  return (
    <footer className="foot">
      <div className="foot__top">
        <Link href={pathOf(lang)} aria-label={t.ui.home}>
          <Wordmark className="wordmark--foot" />
        </Link>
        <nav className="foot__nav" aria-label={t.ui.sections}>
          {PAGE_KEYS.map((key) => (
            <Link key={key} href={pathOf(lang, key)} aria-current={key === page ? "page" : undefined}>
              {t.nav[key]}
            </Link>
          ))}
        </nav>
        <LangSwitch lang={lang} page={page} />
      </div>
      <div className="foot__bottom">
        <p className="foot__meta">
          {t.ui.footerBy}{" "}
          <a href={STUDIO_URL} target="_blank" rel="noopener">
            LuCz Development
          </a>
          . {t.ui.footerRest}
        </p>
        <p className="foot__meta">© 2026 LuCz</p>
      </div>
    </footer>
  );
}
