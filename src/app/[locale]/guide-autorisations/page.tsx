import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import PrintButton from "@/components/auth-guide/PrintButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthGuide" });
  return { title: t("metaTitle") };
}

// Pièces à fournir — contenu fourni par TN Marine sur la base de son
// expérience terrain (cahier des charges §8). À tenir à jour si la
// procédure administrative de l'ANF évolue.
const CHECKLIST_KEYS = [
  "proforma",
  "role",
  "fishingCard",
  "birthCertificate",
  "idCard",
  "proofOfResidence",
] as const;

export default async function AuthGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AuthGuide");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
        {t("kicker")}
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-text-muted">{t("intro")}</p>
      <p className="mt-4 font-semibold text-primary">{t("equipmentConcerned")}</p>

      <blockquote className="mt-6 border-s-4 border-accent bg-accent/10 px-5 py-4 italic text-text">
        {t("mentionQuote")}
      </blockquote>
      <p className="mt-3 text-sm text-text-muted">{t("mentionExplanation")}</p>

      {/* Checklist */}
      <div className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">{t("checklistHeading")}</h2>
          <PrintButton />
        </div>
        <p className="mt-3 text-text-muted">{t("checklistIntro")}</p>

        <ul className="mt-6 space-y-3 rounded-xl border border-border bg-surface-alt p-6">
          {CHECKLIST_KEYS.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="text-text">{t(`checklist.${key}`)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-xs text-text-muted/70">{t("provisionalNotice")}</p>
      </div>

      {/* Proforma = première étape */}
      <div className="mt-12 flex flex-col items-start gap-4 rounded-xl bg-primary px-6 py-8 text-text-inverse sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{t("firstStepHeading")}</h2>
          <p className="mt-2 max-w-xl text-text-inverse/85">{t("firstStepText")}</p>
        </div>
        <Link
          href="/proforma"
          className="shrink-0 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-dark transition-colors"
        >
          {t("firstStepCta")}
        </Link>
      </div>

      {/* Base légale */}
      <div className="mt-12">
        <h2 className="text-xl font-bold">{t("legalHeading")}</h2>
        <p className="mt-3 text-text-muted">{t("legalText")}</p>
      </div>

      {/* Contact ANF */}
      <div className="mt-12 rounded-xl border border-border bg-surface-alt p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-primary">{t("contactHeading")}</h2>
        <p className="mt-2 text-text-muted">{t("contactText")}</p>
        <a
          href="https://www.anf.dz"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-md border border-secondary px-4 py-2.5 text-sm font-medium text-secondary hover:bg-secondary hover:text-surface-alt transition-colors"
        >
          {t("contactCta")}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
