"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CATEGORY_DIRECTORY } from "@/lib/category-directory";
import { BRAND_DIRECTORY } from "@/lib/brand-directory";

interface CatalogFiltersProps {
  categorySlug?: string;
  brandSlug?: string;
}

export default function CatalogFilters({
  categorySlug,
  brandSlug,
}: CatalogFiltersProps) {
  const t = useTranslations("Shop");
  const tCategories = useTranslations("Categories");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: "categorie" | "marque", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const hasFilters = Boolean(categorySlug || brandSlug);

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div>
        <label htmlFor="filter-category" className="block text-sm font-medium text-text">
          {t("filterCategoryLabel")}
        </label>
        <select
          id="filter-category"
          value={categorySlug ?? ""}
          onChange={(e) => updateFilter("categorie", e.target.value)}
          className="mt-1.5 min-w-56 rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        >
          <option value="">{t("allCategories")}</option>
          {CATEGORY_DIRECTORY.map((c) => (
            <option key={c.slug} value={c.slug}>
              {tCategories(c.slug)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-brand" className="block text-sm font-medium text-text">
          {t("filterBrandLabel")}
        </label>
        <select
          id="filter-brand"
          value={brandSlug ?? ""}
          onChange={(e) => updateFilter("marque", e.target.value)}
          className="mt-1.5 min-w-56 rounded-md border border-border bg-surface-alt px-3.5 py-2.5 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        >
          <option value="">{t("allBrands")}</option>
          {BRAND_DIRECTORY.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="rounded-md border border-border px-3.5 py-2.5 text-sm font-medium text-text-muted hover:border-secondary hover:text-secondary"
        >
          {t("resetFilters")}
        </button>
      )}
    </div>
  );
}
