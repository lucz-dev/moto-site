"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../components/Icon";
import Wordmark from "../components/Wordmark";
import { DEFAULT_LOCALE, hasLocale, pathOf } from "../i18n/config";

// Not-found pages get no params: the language comes from the address.
const TEXT = {
  it: { title: "Strada chiusa.", body: "Questa pagina non esiste, o è stata spostata.", back: "Torna alla home" },
  en: { title: "Road closed.", body: "This page doesn't exist, or it has moved.", back: "Back to the home page" },
};

export default function NotFound() {
  const first = usePathname()?.split("/")[1] ?? "";
  const lang = hasLocale(first) ? first : DEFAULT_LOCALE;
  const t = TEXT[lang];
  return (
    <main id="main" className="lost">
      <Link href={pathOf(lang)} aria-label="Motor District">
        <Wordmark />
      </Link>
      <h1 className="lost__title">{t.title}</h1>
      <p className="intro">{t.body}</p>
      <Link className="btn btn--primary" href={pathOf(lang)}>
        <Icon name="back" /> {t.back}
      </Link>
    </main>
  );
}
