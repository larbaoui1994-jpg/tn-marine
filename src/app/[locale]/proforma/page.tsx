import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProformaForm from "@/components/proforma/ProformaForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Proforma" });
  return { title: t("metaTitle") };
}

export default async function ProformaPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ produit?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { produit } = await searchParams;
  const t = await getTranslations("Proforma");
  const session = await auth();

  const [products, initialProduct] = await Promise.all([
    prisma.product.findMany({
      include: { brand: true },
      orderBy: [{ brand: { name: "asc" } }, { name: "asc" }],
    }),
    produit
      ? prisma.product.findUnique({ where: { slug: produit } })
      : Promise.resolve(null),
  ]);

  const productOptions = products.map((product) => ({
    id: product.id,
    name: product.name,
    brandName: product.brand.name,
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
        {t("kicker")}
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-text-muted">{t("intro")}</p>

      <div className="mt-10 rounded-xl border border-border bg-surface-alt p-6 sm:p-8">
        <ProformaForm
          products={productOptions}
          initialProductId={initialProduct?.id}
          defaultFullName={session?.user?.name ?? undefined}
          defaultEmail={session?.user?.email ?? undefined}
        />
      </div>
    </div>
  );
}
