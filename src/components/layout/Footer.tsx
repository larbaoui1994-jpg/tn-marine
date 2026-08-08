import Image from "next/image";
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
            <Image
              src="/logo/tn-marine-logo-white.png"
              alt="TN Marine — Technic Nautic Marine Import"
              width={464}
              height={96}
              className="h-8 w-auto"
            />
            <p className="mt-2 text-xs text-text-inverse/60">{t("companyLegal")}</p>
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
              <li>
                <a
                  href="tel:+213555562122"
                  dir="ltr"
                  className="inline-block hover:text-accent-light"
                >
                  +213 555 56 21 22
                </a>
              </li>
            </ul>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-accent-light">
              {t("hours")}
            </h3>
            <p className="mt-2 text-sm text-text-inverse/80">{t("hoursText")}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-text-inverse/60">
            © {year} {t("companyName")} — {t("rights")}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/TNMImport/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-text-inverse/80 hover:border-accent-light hover:text-accent-light"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/lowrance_simrad_algerie/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-text-inverse/80 hover:border-accent-light hover:text-accent-light"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M12 2.2c2.7 0 3 .01 4.06.06 1.05.05 1.77.22 2.4.46.65.25 1.2.6 1.75 1.14.54.55.9 1.1 1.14 1.75.24.63.4 1.35.46 2.4.05 1.06.06 1.36.06 4.06s-.01 3-.06 4.06c-.05 1.05-.22 1.77-.46 2.4a4.7 4.7 0 0 1-1.14 1.75 4.7 4.7 0 0 1-1.75 1.14c-.63.24-1.35.4-2.4.46-1.06.05-1.36.06-4.06.06s-3-.01-4.06-.06c-1.05-.05-1.77-.22-2.4-.46a4.7 4.7 0 0 1-1.75-1.14 4.7 4.7 0 0 1-1.14-1.75c-.24-.63-.4-1.35-.46-2.4C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.06c.05-1.05.22-1.77.46-2.4.25-.65.6-1.2 1.14-1.75A4.7 4.7 0 0 1 5.6 2.65c.63-.24 1.35-.4 2.4-.46C9.06 2.2 9.36 2.2 12 2.2Zm0 1.8c-2.66 0-2.97.01-4.02.06-.86.04-1.32.18-1.63.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.77-.3 1.63C4.33 8.7 4.32 9 4.32 12s.01 3.3.06 4.35c.04.86.18 1.32.3 1.63.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.77.26 1.63.3 1.05.05 1.36.06 4.02.06s2.97-.01 4.02-.06c.86-.04 1.32-.18 1.63-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.77.3-1.63.05-1.05.06-1.36.06-4.35s-.01-3.3-.06-4.35c-.04-.86-.18-1.32-.3-1.63a2.9 2.9 0 0 0-.66-1.01 2.9 2.9 0 0 0-1.01-.66c-.31-.12-.77-.26-1.63-.3C14.97 4.01 14.66 4 12 4Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-1.98a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@raouf.lowrance.si"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-text-inverse/80 hover:border-accent-light hover:text-accent-light"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M16.6 5.82c-1.36-1.19-2.06-2.9-2.06-4.82h-3.09v14.4c0 1.44-1.16 2.6-2.6 2.6a2.6 2.6 0 0 1-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@RaoufLowranceSimradAlgerie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-text-inverse/80 hover:border-accent-light hover:text-accent-light"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.87.56 9.38.56 9.38.56s7.51 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
