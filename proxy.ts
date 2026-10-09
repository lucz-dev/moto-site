import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "./app/i18n/config";

const COOKIE = "NEXT_LOCALE";

/** The language last used on the site, else the browser's first supported one, else English. */
function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;
  const wanted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number.parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = wanted.map((w) => w.lang).find(hasLocale);
  return match ?? DEFAULT_LOCALE;
}

/** Every page lives under /it or /en: anything else is redirected to the visitor's language. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (hasLocale(first)) {
    const response = NextResponse.next();
    if (request.cookies.get(COOKIE)?.value !== first) {
      response.cookies.set(COOKIE, first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return response;
  }
  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Pages only: no Next internals, no files (anything with a dot: media, icons, sitemap.xml…).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
