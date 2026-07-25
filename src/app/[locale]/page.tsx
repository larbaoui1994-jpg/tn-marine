import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { BRAND_DIRECTORY } from "@/lib/brand-directory";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const WHY_ITEMS = [
  { key: "whyItem1", icon: "🧭" },
  { key: "whyItem2", icon: "⚓" },
  { key: "whyItem3", icon: "🤝" },
  { key: "whyItem4", icon: "🛥️" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-text-inverse">
        <Image
          src="/lifestyle/eagle-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/50 rtl:bg-gradient-to-l" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-light">
            {t("heroKicker")}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold text-text-inverse sm:text-4xl lg:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-text-inverse/80 sm:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/boutique"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-dark transition-colors"
            >
              {t("heroCtaShop")}
            </Link>
            <Link
              href="/reservation"
              className="rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-text-inverse hover:bg-white/10 transition-colors"
            >
              {t("heroCtaBooking")}
            </Link>
            <Link
              href="/proforma"
              className="rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-text-inverse hover:bg-white/10 transition-colors"
            >
              {t("heroCtaProforma")}
            </Link>
          </div>
        </div>
      </section>

      {/* Marques partenaires */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("brandsTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-text-muted">{t("brandsSubtitle")}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BRAND_DIRECTORY.map((brand) => (
            <Link
              key={brand.slug}
              href={`/marques/${brand.slug}`}
              className="flex items-center justify-center rounded-lg border border-border bg-surface-alt px-4 py-6 text-center font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">{t("whyTitle")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.key}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <span className="text-3xl" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-primary">
                  {t(`${item.key}Title`)}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{t(`${item.key}Text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-text-inverse">
              {t("ctaSectionTitle")}
            </h2>
            <p className="mt-2 max-w-xl text-text-inverse/85">{t("ctaSectionText")}</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-dark transition-colors"
          >
            {t("heroCtaProforma")}
          </Link>
        </div>
      </section>

      {/* Contenu provisoire — à remplacer par les textes définitifs de TN Marine (voir cahier des charges §12) */}
      <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-text-muted/70 sm:px-6 lg:px-8">
        {t("provisionalNotice")}
      </p>
    </>
  );
}
