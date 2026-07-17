import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ContactForm from "@/components/contact/ContactForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("metaTitle") };
}

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=36.8008704,2.9021487&z=16&output=embed";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
          {t("kicker")}
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-text-muted">{t("intro")}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* Formulaire */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-surface-alt p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">
              {t("form.heading")}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Coordonnées */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-surface-alt p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">{t("infoHeading")}</h2>

            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-medium text-text">{t("addressLabel")}</dt>
                <dd className="mt-1 text-text-muted">
                  Lotissement Zagami N°09, La Madrague, Aïn Benian 16018, Alger
                </dd>
              </div>
              <div>
                <dt className="font-medium text-text">{t("phoneLabel")}</dt>
                <dd className="mt-1">
                  <a
                    href="tel:+213561620752"
                    dir="ltr"
                    className="inline-block text-secondary hover:underline"
                  >
                    +213 561 62 07 52
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-text">{t("hoursLabel")}</dt>
                <dd className="mt-1 text-text-muted">
                  {t("hoursText")}
                  <br />
                  <span className="text-xs text-text-muted/70">
                    {t("hoursNotice")}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-text">{t("socialLabel")}</dt>
                <dd className="mt-2 flex items-center gap-3">
                  {/* Réseaux sociaux — liens provisoires */}
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted hover:border-secondary hover:text-secondary"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted hover:border-secondary hover:text-secondary"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 2.2c2.7 0 3 .01 4.06.06 1.05.05 1.77.22 2.4.46.65.25 1.2.6 1.75 1.14.54.55.9 1.1 1.14 1.75.24.63.4 1.35.46 2.4.05 1.06.06 1.36.06 4.06s-.01 3-.06 4.06c-.05 1.05-.22 1.77-.46 2.4a4.7 4.7 0 0 1-1.14 1.75 4.7 4.7 0 0 1-1.75 1.14c-.63.24-1.35.4-2.4.46-1.06.05-1.36.06-4.06.06s-3-.01-4.06-.06c-1.05-.05-1.77-.22-2.4-.46a4.7 4.7 0 0 1-1.75-1.14 4.7 4.7 0 0 1-1.14-1.75c-.24-.63-.4-1.35-.46-2.4C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.06c.05-1.05.22-1.77.46-2.4.25-.65.6-1.2 1.14-1.75A4.7 4.7 0 0 1 5.6 2.65c.63-.24 1.35-.4 2.4-.46C9.06 2.2 9.36 2.2 12 2.2Zm0 1.8c-2.66 0-2.97.01-4.02.06-.86.04-1.32.18-1.63.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.77-.3 1.63C4.33 8.7 4.32 9 4.32 12s.01 3.3.06 4.35c.04.86.18 1.32.3 1.63.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.77.26 1.63.3 1.05.05 1.36.06 4.02.06s2.97-.01 4.02-.06c.86-.04 1.32-.18 1.63-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.77.3-1.63.05-1.05.06-1.36.06-4.35s-.01-3.3-.06-4.35c-.04-.86-.18-1.32-.3-1.63a2.9 2.9 0 0 0-.66-1.01 2.9 2.9 0 0 0-1.01-.66c-.31-.12-.77-.26-1.63-.3C14.97 4.01 14.66 4 12 4Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-1.98a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
                    </svg>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <iframe
              title={t("mapTitle")}
              src={MAP_EMBED_SRC}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
