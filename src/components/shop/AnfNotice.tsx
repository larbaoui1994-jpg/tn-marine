import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AnfNotice() {
  const t = await getTranslations("Shop.anf");

  return (
    <div className="flex gap-3 rounded-lg border border-accent/40 bg-accent/10 p-4">
      <span className="text-xl" aria-hidden="true">
        ⚠️
      </span>
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
