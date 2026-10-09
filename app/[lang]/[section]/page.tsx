import { notFound } from "next/navigation";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { hasLocale, PAGE_KEYS, pageOfSlug, SLUGS, type Locale, type PageKey } from "../../i18n";
import { pageMetadata } from "../../i18n/metadata";
import ActivitiesPage from "../../sections/Activities";
import DealershipPage from "../../sections/Dealership";
import IslandPage from "../../sections/Island";
import LifePage from "../../sections/Life";
import PlayPage from "../../sections/Play";
import WorkshopPage from "../../sections/Workshop";

type Params = { params: Promise<{ lang: string; section: string }> };

const PAGES: Record<PageKey, (props: { lang: Locale }) => React.ReactNode> = {
  island: IslandPage,
  activities: ActivitiesPage,
  dealership: DealershipPage,
  workshop: WorkshopPage,
  life: LifePage,
  play: PlayPage,
};

// Each language has its own slugs (/it/officina, /en/workshop); anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale;
  return PAGE_KEYS.map((key) => ({ section: SLUGS[key][lang] }));
}

async function resolve(params: Params["params"]) {
  const { lang, section } = await params;
  if (!hasLocale(lang)) return null;
  const page = pageOfSlug(lang, section);
  return page ? { lang, page } : null;
}

export async function generateMetadata({ params }: Params) {
  const found = await resolve(params);
  return found ? pageMetadata(found.lang, found.page) : {};
}

export default async function PreviewPage({ params }: Params) {
  const found = await resolve(params);
  if (!found) notFound();
  const { lang, page } = found;
  const Body = PAGES[page];
  return (
    <>
      <SiteHeader lang={lang} page={page} />
      <main id="main" className="page">
        <Body lang={lang} />
      </main>
      <SiteFooter lang={lang} page={page} />
    </>
  );
}
