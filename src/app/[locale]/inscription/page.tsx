import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import SignUpForm from "@/components/auth/SignUpForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });
  return { title: t("signupTitle") };
}

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Auth");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-primary">{t("signupTitle")}</h1>
      <p className="mt-2 text-text-muted">{t("signupIntro")}</p>

      <div className="mt-8 rounded-xl border border-border bg-surface-alt p-6 sm:p-8">
        <SignUpForm />
      </div>

      <p className="mt-6 text-center text-sm text-text-muted">
        {t("alreadyAccount")}{" "}
        <Link href="/connexion" className="font-medium text-secondary hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
