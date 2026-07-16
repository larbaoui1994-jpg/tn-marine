import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "shop", href: "/boutique" },
  { key: "brands", href: "/marques" },
  { key: "about", href: "/a-propos" },
  { key: "contact", href: "/contact" },
] as const;

const RESOURCE_LINKS = [
  { key: "authGuideLink", href: "/guide-autorisations" },
  { key: "booking", href: "/reservation" },
  { key: "proforma", href: "/proforma" },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-text-inverse">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-primary-dark font-bold">
                TN
              </span>
              <span className="font-bold text-lg">{t("companyName")}</span>
            </div>
            <p className="mt-1 text-xs text-text-inverse/60">{t("companyLegal")}</p>
            <p className="mt-3 text-sm text-text-inverse/80">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-light">
              {t("columnsNav")}
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-inverse/80 hover:text-accent-light"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-light">
              {t("columnsResources")}
            </h3>
            <ul className="mt-4 space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-inverse/80 hover:text-accent-light"
                  >
                    {link.key === "authGuideLink" ? t(link.key) : tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-light">
              {t("columnsContact")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-text-inverse/80">
              <li>Lotissement Zagami N°09, La Madrague, Aïn Benian 16018, Alger</li>
              <li>
                <a
                  href="tel:+213561620752"
                  dir="ltr"
                  className="inline-block hover:text-accent-light"
                >
                  +213 561 62 07 52
                </a>
              </li>
            </ul>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-accent-light">
              {t("hours")}
            </h3>
            <p className="mt-2 text-sm text-text-inverse/80">
              {t("hoursText")}
              <br />
              <span className="text-xs text-text-inverse/50">{t("hoursNotice")}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-text-inverse/60">
            © {year} {t("companyName")} — {t("rights")}
          </p>
          {/* Réseaux sociaux — liens provisoires, à remplacer par les URLs officielles TN Marine */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-text-inverse/80 hover:border-accent-light hover:text-accent-light"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-text-inverse/80 hover:border-accent-light hover:text-accent-light"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M12 2.2c2.7 0 3 .01 4.06.06 1.05.05 1.77.22 2.4.46.65.25 1.2.6 1.75 1.14.54.55.9 1.1 1.14 1.75.24.63.4 1.35.46 2.4.05 1.06.06 1.36.06 4.06s-.01 3-.06 4.06c-.05 1.05-.22 1.77-.46 2.4a4.7 4.7 0 0 1-1.14 1.75 4.7 4.7 0 0 1-1.75 1.14c-.63.24-1.35.4-2.4.46-1.06.05-1.36.06-4.06.06s-3-.01-4.06-.06c-1.05-.05-1.77-.22-2.4-.46a4.7 4.7 0 0 1-1.75-1.14 4.7 4.7 0 0 1-1.14-1.75c-.24-.63-.4-1.35-.46-2.4C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.06c.05-1.05.22-1.77.46-2.4.25-.65.6-1.2 1.14-1.75A4.7 4.7 0 0 1 5.6 2.65c.63-.24 1.35-.4 2.4-.46C9.06 2.2 9.36 2.2 12 2.2Zm0 1.8c-2.66 0-2.97.01-4.02.06-.86.04-1.32.18-1.63.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.77-.3 1.63C4.33 8.7 4.32 9 4.32 12s.01 3.3.06 4.35c.04.86.18 1.32.3 1.63.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.77.26 1.63.3 1.05.05 1.36.06 4.02.06s2.97-.01 4.02-.06c.86-.04 1.32-.18 1.63-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.77.3-1.63.05-1.05.06-1.36.06-4.35s-.01-3.3-.06-4.35c-.04-.86-.18-1.32-.3-1.63a2.9 2.9 0 0 0-.66-1.01 2.9 2.9 0 0 0-1.01-.66c-.31-.12-.77-.26-1.63-.3C14.97 4.01 14.66 4 12 4Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-1.98a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
