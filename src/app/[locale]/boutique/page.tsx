import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import CatalogFilters from "@/components/shop/CatalogFilters";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Ordre d'affichage des sous-gammes lorsque le catalogue est filtré par
// marque et que les produits renseignent `productLine` (ex. Lowrance
// Sondeurs : Eagle → Elite FS → HDS PRO, du plus accessible au plus haut
// de gamme).
const PRODUCT_LINE_ORDER = ["Eagle", "Elite FS", "HDS PRO"];

function groupByProductLine<T extends { productLine: string | null }>(products: T[]) {
  const byLine = new Map<string, T[]>();
  const ungrouped: T[] = [];

  for (const product of products) {
    if (product.productLine) {
      const list = byLine.get(product.productLine) ?? [];
      list.push(product);
      byLine.set(product.productLine, list);
    } else {
      ungrouped.push(product);
    }
  }

  const orderedLines = [...byLine.keys()].sort(
    (a, b) => PRODUCT_LINE_ORDER.indexOf(a) - PRODUCT_LINE_ORDER.indexOf(b),
  );

  return {
    groups: orderedLines.map((line) => ({ line, products: byLine.get(line)! })),
    ungrouped,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Shop" });
  return { title: t("metaTitle") };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ categorie?: string; marque?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { categorie, marque } = await searchParams;
  const t = await getTranslations("Shop");

  const products = await prisma.product.findMany({
    where: {
      ...(categorie ? { category: { slug: categorie } } : {}),
      ...(marque ? { brand: { slug: marque } } : {}),
    },
    include: { brand: true, category: true },
    orderBy: { name: "asc" },
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

      <div className="mt-10 flex flex-col gap-6 border-y border-border py-6 sm:flex-row sm:items-end sm:justify-between">
        <CatalogFilters categorySlug={categorie} brandSlug={marque} />
        <p className="text-sm text-text-muted">
          {t("resultsCount", { count: products.length })}
        </p>
      </div>

      {products.length > 0 ? (
        marque === "lowrance" ? (
          (() => {
            const { groups, ungrouped } = groupByProductLine(products);
            return (
              <div className="mt-8 space-y-10">
                {groups.map(({ line, products: lineProducts }) => (
                  <div key={line}>
                    <h2 className="text-lg font-semibold text-primary">
                      {t("productLine", { line })}
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {lineProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
                {ungrouped.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ungrouped.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            );
          })()
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )
      ) : (
        <p className="mt-12 rounded-lg border border-border bg-surface-alt px-6 py-10 text-center text-text-muted">
          {t("noResults")}
        </p>
      )}
    </div>
  );
}
