import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

// Chemins nécessitant une session (espace Réservation, cahier des charges §6.5).
const PROTECTED_SEGMENT = "reservation";

function isProtectedPathname(pathname: string) {
  const withoutLocale = routing.locales.reduce(
    (path, locale) =>
      path === `/${locale}` || path.startsWith(`/${locale}/`)
        ? path.slice(locale.length + 1) || "/"
        : path,
    pathname,
  );
  return (
    withoutLocale === `/${PROTECTED_SEGMENT}` ||
    withoutLocale.startsWith(`/${PROTECTED_SEGMENT}/`)
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (isProtectedPathname(pathname) && !req.auth) {
    const locale =
      routing.locales.find(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
      ) ?? routing.defaultLocale;
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    const signInUrl = new URL(`${prefix}/connexion`, req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(signInUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
