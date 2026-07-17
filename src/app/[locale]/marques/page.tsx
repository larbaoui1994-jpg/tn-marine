import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { brandKeyFromSlug } from "@/lib/brand-directory";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Brands" });
  return { title: t("metaTitle") };
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Brands");

  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
          {t("kicker")}
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-text-muted">{t("intro")}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => {
          const key = brandKeyFromSlug(brand.slug);
          return (
            <Link
              key={brand.id}
              href={`/marques/${brand.slug}`}
              className="flex flex-col rounded-xl border border-border bg-surface-alt p-6 transition-all hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-primary">{brand.name}</h2>
              {key && (
                <p className="mt-2 flex-1 text-sm text-text-muted">
                  {t(`items.${key}.tagline`)}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  {t("productsCount", { count: brand._count.products })}
                </span>
                <span className="text-sm font-medium text-secondary group-hover:underline">
                  {t("viewBrand")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
