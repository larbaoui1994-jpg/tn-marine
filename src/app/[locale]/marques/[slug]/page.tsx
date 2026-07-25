import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { BRAND_DIRECTORY, brandKeyFromSlug, brandLogoUrl } from "@/lib/brand-directory";
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
        <h1 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">{brand.name}</h1>
        {key && <p className="mt-3 text-text-muted">{t(`items.${key}.tagline`)}</p>}
      </div>

      {brand.products.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brand.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-lg border border-border bg-surface-alt px-6 py-10 text-center text-text-muted">
          {tShop("noResults")}
        </p>
      )}
    </div>
  );
}
