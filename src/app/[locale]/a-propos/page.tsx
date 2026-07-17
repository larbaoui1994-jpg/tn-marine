import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import BrandsTable from "@/components/about/BrandsTable";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("metaTitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Intro */}
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
          {t("kicker")}
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-text-muted">{t("intro")}</p>
      </div>

      {/* Histoire / expertise / agréments */}
      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface-alt p-6">
          <h2 className="text-lg font-semibold text-primary">
            {t("historyHeading")}
          </h2>
          <p className="mt-2 text-sm text-text-muted">{t("historyText")}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-alt p-6">
          <h2 className="text-lg font-semibold text-primary">
            {t("expertiseHeading")}
          </h2>
          <p className="mt-2 text-sm text-text-muted">{t("expertiseText")}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-alt p-6">
          <h2 className="text-lg font-semibold text-primary">
            {t("agreementsHeading")}
          </h2>
          <p className="mt-2 text-sm text-text-muted">{t("agreementsText")}</p>
        </div>
      </div>

      {/* Table des marques */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">{t("brandsHeading")}</h2>
        <p className="mt-2 max-w-2xl text-text-muted">{t("brandsSubtitle")}</p>
        <div className="mt-8">
          <BrandsTable />
        </div>
      </div>

      {/* Localisation */}
      <div className="mt-16 flex flex-col items-start gap-4 rounded-xl bg-primary px-6 py-8 text-text-inverse sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{t("locationHeading")}</h2>
          <p className="mt-2 max-w-xl text-text-inverse/85">
            {t("locationText")}
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-dark transition-colors"
        >
          {t("locationCta")}
        </Link>
      </div>
    </div>
  );
}
