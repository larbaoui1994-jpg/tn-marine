import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BRAND_DIRECTORY } from "@/lib/brand-directory";

export default async function BrandsTable() {
  const t = await getTranslations("About");

  return (
    <>
      {/* Table — desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
        <table className="w-full text-start text-sm">
          <thead className="bg-primary text-text-inverse">
            <tr>
              <th className="px-5 py-3 text-start font-semibold">
                {t("brandsTableName")}
              </th>
              <th className="px-5 py-3 text-start font-semibold">
                {t("brandsTableDomain")}
              </th>
              <th className="px-5 py-3 text-start font-semibold">
                <span className="sr-only">{t("brandsCta")}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface-alt">
            {BRAND_DIRECTORY.map((brand) => (
              <tr key={brand.slug}>
                <td className="px-5 py-4 font-semibold text-primary">
                  {brand.name}
                </td>
                <td className="px-5 py-4 text-text-muted">
                  {t(`brands.${brand.key}.domain`)}
                </td>
                <td className="px-5 py-4 text-end">
                  <Link
                    href={`/marques/${brand.slug}`}
                    className="font-medium text-secondary hover:underline"
                  >
                    {t("brandsCta")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cartes — mobile */}
      <ul className="grid grid-cols-1 gap-4 sm:hidden">
        {BRAND_DIRECTORY.map((brand) => (
          <li
            key={brand.slug}
            className="rounded-lg border border-border bg-surface-alt p-4"
          >
            <p className="font-semibold text-primary">{brand.name}</p>
            <p className="mt-1 text-sm text-text-muted">
              {t(`brands.${brand.key}.domain`)}
            </p>
            <Link
              href={`/marques/${brand.slug}`}
              className="mt-2 inline-block text-sm font-medium text-secondary hover:underline"
            >
              {t("brandsCta")}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
