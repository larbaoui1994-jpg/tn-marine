import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { categoryIcon } from "@/lib/category-directory";

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    shortDescription: string;
    requiresAnfAuth: boolean;
    brand: { name: string };
    category: { slug: string };
  };
}

export default async function ProductCard({ product }: ProductCardProps) {
  const t = await getTranslations("Shop");
  const tCategories = await getTranslations("Categories");

  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface-alt transition-all hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
    >
      {/* Visuel provisoire — en attendant les photos officielles des produits */}
      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary to-secondary text-4xl">
        <span aria-hidden="true">{categoryIcon(product.category.slug)}</span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {product.brand.name}
        </p>
        <h3 className="mt-1 font-semibold text-primary">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-text-muted">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-surface px-2.5 py-1 text-xs text-text-muted">
            {tCategories(product.category.slug)}
          </span>
          {product.requiresAnfAuth && (
            <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-dark">
              {t("anf.title")}
            </span>
          )}
        </div>

        <span className="mt-4 text-sm font-medium text-secondary group-hover:underline">
          {t("viewProduct")}
        </span>
      </div>
    </Link>
  );
}
