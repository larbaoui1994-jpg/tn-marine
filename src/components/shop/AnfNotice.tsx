import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AnfNotice() {
  const t = await getTranslations("Shop.anf");

  return (
    <div className="flex gap-3 rounded-lg border border-accent/40 bg-accent/10 p-4">
      <Image
        src="/logo/anf-logo.png"
        alt="ANF — Agence Nationale des Fréquences"
        width={144}
        height={138}
        className="h-10 w-auto shrink-0"
      />
      <div>
        <p className="font-semibold text-accent-dark">{t("title")}</p>
        <p className="mt-1 text-sm text-text-muted">{t("text")}</p>
        <Link
          href="/guide-autorisations"
          className="mt-2 inline-block text-sm font-medium text-secondary hover:underline"
        >
          {t("link")}
        </Link>
      </div>
    </div>
  );
}
