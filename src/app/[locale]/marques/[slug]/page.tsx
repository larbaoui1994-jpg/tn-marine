import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { BRAND_DIRECTORY, brandKeyFromSlug, brandLogoUrl } from "@/lib/brand-directory";
import { groupByProductLine, sectionForProductLine } from "@/lib/product-grouping";
import ProductCard from "@/components/shop/ProductCard";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BRAND_DIRECTORY.map((b) => ({ locale, slug: b.slug })),
  );
}

const getBrand = cache(async (slug: string) => {
  return prisma.brand.findUnique({
    where: { slug },
    include: {
      products: { include: { brand: true, category: true }, orderBy: { name: "asc" } },
    },
  });
});

// Cartes C-MAP compatibles Lowrance (Reveal, Discover) affichées dans la
// section "Cartographie" de la page Lowrance. La gamme "Génération X" est
// exclue : elle n'est compatible qu'avec les traceurs Simrad NSX/NSS4.
const getLowranceCompatibleCharts = cache(async () => {
  return prisma.product.findMany({
    where: { brand: { slug: "cmap" }, productLine: { in: ["Reveal", "Discover"] } },
    include: { brand: true, category: true },
    orderBy: { name: "asc" },
  });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  return { title: brand ? `${brand.name} — TN Marine` : "TN Marine" };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Brands");
  const tShop = await getTranslations("Shop");

  const brand = await getBrand(slug);
  if (!brand) {
    notFound();
  }

  const key = brandKeyFromSlug(brand.slug);
  const logoUrl = brandLogoUrl(brand.slug);
  const cartographyProducts = brand.slug === "lowrance" ? await getLowranceCompatibleCharts() : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/marques" className="text-sm font-medium text-secondary hover:underline">
        ← {t("kicker")}
      </Link>

      <div className="mt-4 max-w-2xl">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={brand.name}
            width={220}
            height={48}
            className="h-10 w-auto object-contain"
          />
        )}
        <h1 className={logoUrl ? "sr-only" : "mt-3 text-3xl font-bold text-primary sm:text-4xl"}>
          {brand.name}
        </h1>
        {key && <p className="mt-3 text-text-muted">{t(`items.${key}.tagline`)}</p>}
      </div>

      {brand.slug === "lowrance" && (
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl bg-black">
          <video
            className="h-full w-full"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/videos/lowrance-we-make-fishing.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {brand.products.length > 0 ? (
        (() => {
          const { groups, ungrouped } = groupByProductLine(brand.products);

          // Regroupe les gammes consécutives partageant la même section
          // (ex. Lowrance/Simrad : "Sondeurs GPS" puis "Sondes"). Les
          // marques sans mapping de section gardent un seul bloc sans
          // en-tête de section, identique au rendu précédent.
          const sections: { section?: string; lines: typeof groups }[] = [];
          for (const group of groups) {
            const section = sectionForProductLine(group.line);
            const current = sections[sections.length - 1];
            if (current && current.section === section) {
              current.lines.push(group);
            } else {
              sections.push({ section, lines: [group] });
            }
          }

          const renderGrid = (lineProducts: (typeof groups)[number]["products"]) => (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lineProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          );

          const renderLine = ({ line, products: lineProducts }: (typeof groups)[number]) => (
            <div key={line}>
              <h3 className="text-lg font-semibold text-primary">
                {tShop("productLine", { line })}
              </h3>
              <div className="mt-4">{renderGrid(lineProducts)}</div>
            </div>
          );

          return (
            <div className="mt-10 space-y-12">
              {sections.map(({ section, lines }, index) =>
                section ? (
                  <div key={`${section}-${index}`}>
                    <h2 className="text-2xl font-bold text-primary">
                      {tShop(`sections.${section}`)}
                    </h2>
                    <div className="mt-6 space-y-10">
                      {lines.length === 1
                        ? renderGrid(lines[0].products)
                        : lines.map(renderLine)}
                    </div>
                  </div>
                ) : (
                  <div key={`nosection-${index}`} className="space-y-10">
                    {lines.map(renderLine)}
                  </div>
                ),
              )}
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
        <p className="mt-12 rounded-lg border border-border bg-surface-alt px-6 py-10 text-center text-text-muted">
          {tShop("noResults")}
        </p>
      )}

      {cartographyProducts.length > 0 &&
        (() => {
          const { groups: chartGroups } = groupByProductLine(cartographyProducts);
          return (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-primary">{tShop("sections.cartographie")}</h2>
              <div className="mt-6 space-y-10">
                {chartGroups.map(({ line, products: lineProducts }) => (
                  <div key={line}>
                    <h3 className="text-lg font-semibold text-primary">
                      {tShop("productLine", { line })}
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {lineProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
    </div>
  );
}
