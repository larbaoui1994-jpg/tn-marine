import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { categoryIcon } from "@/lib/category-directory";
import AnfNotice from "@/components/shop/AnfNotice";
import ProductCard from "@/components/shop/ProductCard";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

const getProduct = cache(async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: { brand: true, category: true },
  });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product ? `${product.name} — TN Marine` : "TN Marine" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Shop");
  const tCategories = await getTranslations("Categories");

  const product = await getProduct(slug);
  if (!product) {
    notFound();
  }

  const specs = product.specs as { label: string; value: string }[];

  const relatedProducts = await prisma.product.findMany({
    where: { brandId: product.brandId, id: { not: product.id } },
    include: { brand: true, category: true },
    take: 3,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/boutique"
        className="text-sm font-medium text-secondary hover:underline"
      >
        ← {t("backToShop")}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {product.imageUrl ? (
          <div className="relative h-72 rounded-xl bg-surface-alt sm:h-96">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-contain p-6"
            />
          </div>
        ) : (
          // Visuel provisoire — en attendant les photos officielles du produit
          <div className="flex h-72 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-7xl sm:h-96">
            <span aria-hidden="true">{categoryIcon(product.category.slug)}</span>
          </div>
        )}

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            {product.brand.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-primary">{product.name}</h1>
          <p className="mt-3 text-text-muted">{product.shortDescription}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-muted">
              {t("categoryLabel")} : {tCategories(product.category.slug)}
            </span>
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-muted">
              {t("brandLabel")} : {product.brand.name}
            </span>
          </div>

          {product.requiresAnfAuth && (
            <div className="mt-6">
              <AnfNotice />
            </div>
          )}

          <Link
            href={`/proforma?produit=${product.slug}`}
            className="mt-6 inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-primary-dark hover:bg-accent-dark transition-colors"
          >
            {t("requestProforma")}
          </Link>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-primary">
              {t("descriptionHeading")}
            </h2>
            <p className="mt-2 text-text-muted">{product.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-primary">
              {t("specsHeading")}
            </h2>
            <dl className="mt-3 divide-y divide-border rounded-lg border border-border bg-surface-alt">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:justify-between"
                >
                  <dt className="font-medium text-text">{spec.label}</dt>
                  <dd className="text-text-muted sm:text-end">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold">{t("relatedProducts")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
