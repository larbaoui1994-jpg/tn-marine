import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DM_Sans, Barlow_Condensed, Roboto, Oswald, Open_Sans, Exo_2, Archivo, Archivo_Black, Inter } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { BRAND_DIRECTORY, brandKeyFromSlug, brandLogoUrl } from "@/lib/brand-directory";
import { groupByProductLine, sectionForProductLine } from "@/lib/product-grouping";
import ProductCard from "@/components/shop/ProductCard";
import EagleVideoPlaylist from "@/components/brand/EagleVideoPlaylist";
import HeroVideo from "@/components/brand/HeroVideo";

// Typographie de lowrance.com/fr-fr/ : DM Sans pour le texte courant,
// Barlow Condensed (Medium) pour les grands titres — appliquée
// uniquement sur la page Lowrance (cf. `isLowrance`).
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600"] });

// Typographie de garmin.com : Roboto pour le texte courant, Oswald en
// majuscules pour les grands titres — appliquée uniquement sur la page
// Garmin (cf. `isGarmin`).
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "700"] });

// Typographie de c-map.com : Open Sans pour le texte courant, Exo 2 pour
// les titres, avec l'orange de marque (#FC5000) en accent — appliquée
// uniquement sur la page C-MAP (cf. `isCmap`).
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });
const exo2 = Exo_2({ subsets: ["latin"], weight: ["600", "700"] });

// Typographie de minnkotamotors.com (Trade Gothic / Industry, polices
// commerciales) : Archivo + Archivo Black en équivalents libres, avec
// l'ambre de marque (#FDB924) en accent — uniquement sur la page Minn
// Kota (cf. `isMinnKota`).
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "600", "700"] });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: ["400"] });

// Typographie de cobra.com (Helvetica Neue, police commerciale) : Inter en
// équivalent libre, avec le rouge de marque (#C10030) en accent —
// uniquement sur la page Cobra Marine (cf. `isCobraMarine`).
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

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
  const tCommon = await getTranslations("Common");

  const brand = await getBrand(slug);
  if (!brand) {
    notFound();
  }

  const key = brandKeyFromSlug(brand.slug);
  const logoUrl = brandLogoUrl(brand.slug);
  const isLowrance = brand.slug === "lowrance";
  const isSimrad = brand.slug === "simrad";
  const isGarmin = brand.slug === "garmin";
  const isCmap = brand.slug === "cmap";
  // navionics.com et fusionentertainment.com redirigent aujourd'hui
  // entièrement vers garmin.com (marques rachetées par Garmin) : même
  // direction artistique que la page Garmin.
  const isNavionics = brand.slug === "navionics";
  const isFusion = brand.slug === "fusion";
  const usesGarminStyle = isGarmin || isNavionics || isFusion;
  const isMinnKota = brand.slug === "minn-kota";
  const isInternational = brand.slug === "international";
  const isCobraMarine = brand.slug === "cobra-marine";
  const isAirmar = brand.slug === "airmar";
  const cartographyProducts = isLowrance ? await getLowranceCompatibleCharts() : [];

  // Direction artistique inspirée de lowrance.com/fr-fr/ et
  // simrad-yachting.com/fr-fr/ : titres en majuscules avec liseré d'accent
  // turquoise. Réservée aux pages Lowrance et Simrad.
  const sectionHeading = (text: string) =>
    isLowrance ? (
      <div>
        <h2 className={`${barlowCondensed.className} text-3xl font-medium uppercase tracking-wide text-primary`}>
          {text}
        </h2>
        <span className="mt-2 block h-0.5 w-12 bg-secondary" aria-hidden="true" />
      </div>
    ) : isSimrad ? (
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-wide text-primary">{text}</h2>
        <span className="mt-2 block h-0.5 w-12 bg-secondary" aria-hidden="true" />
      </div>
    ) : (
      <h2 className="text-2xl font-bold text-primary">{text}</h2>
    );

  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${
        isLowrance
          ? dmSans.className
          : usesGarminStyle || isAirmar
            ? roboto.className
            : isCmap || isInternational
              ? openSans.className
              : isMinnKota
                ? archivo.className
                : isCobraMarine
                  ? inter.className
                  : ""
      }`}
    >
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
        {key &&
          (usesGarminStyle ? (
            <h2
              className={`${oswald.className} mt-6 text-4xl font-medium uppercase tracking-tight text-black sm:text-5xl`}
            >
              {t(`items.${key}.tagline`)}
            </h2>
          ) : isCobraMarine ? (
            <h2 className={`${inter.className} mt-6 text-3xl font-bold text-black sm:text-4xl`}>
              {t(`items.${key}.tagline`)}
            </h2>
          ) : isAirmar ? (
            <h2 className={`${roboto.className} mt-6 text-3xl font-bold text-[#2E64B0] sm:text-4xl`}>
              {t(`items.${key}.tagline`)}
            </h2>
          ) : (
            <p className="mt-3 text-text-muted">{t(`items.${key}.tagline`)}</p>
          ))}
      </div>

      {isCobraMarine && <span className="mt-4 block h-1 w-16 bg-[#C10030]" aria-hidden="true" />}
      {isAirmar && <span className="mt-4 block h-1 w-16 bg-[#2E64B0]" aria-hidden="true" />}

      {usesGarminStyle && (
        <span className="mt-6 block h-0.5 w-16 bg-black" aria-hidden="true" />
      )}

      {isLowrance && (
        <>
          <div className="relative left-1/2 right-1/2 -mx-[50vw] mt-8 w-screen overflow-x-hidden bg-primary-dark">
            <HeroVideo src="/videos/lowrance-we-make-fishing.mp4" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {[
              {
                anchor: "gamme-eagle",
                image: "/products/lowrance-eagle-9-1.png",
                title: "Eagle",
                text: "Le sondeur/traceur le plus accessible et le plus facile à utiliser de Lowrance.",
              },
              {
                anchor: "gamme-elite-fs",
                image: "/products/lowrance-elite-fs-9-1.png",
                title: "Elite FS",
                text: "Tous les outils de détection de poissons Lowrance sur un écran facile à installer.",
              },
              {
                anchor: "gamme-hds-pro",
                image: "/products/lowrance-hds-pro-9-1.png",
                title: "HDS PRO",
                text: "Le niveau supérieur : clarté sondeur ultime, cartographie C-MAP et contrôle proue à poupe.",
              },
            ].map((tile) => (
              <a key={tile.anchor} href={`#${tile.anchor}`} className="group flex flex-col">
                <div className="relative aspect-square w-full bg-surface">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className={`${barlowCondensed.className} text-3xl font-medium text-primary`}>
                    {tile.title}
                  </h3>
                  <span className="mt-1.5 block h-0.5 w-10 bg-secondary" aria-hidden="true" />
                  <p className="mt-3 text-sm text-text-muted">{tile.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-secondary group-hover:underline">
                    {tCommon("readMore")} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {isSimrad && (
        <div className="relative left-1/2 right-1/2 -mx-[50vw] mt-8 w-screen overflow-x-hidden bg-primary-dark">
          <HeroVideo src="/videos/simrad-introducing-nsx-ultrawide.mp4" />
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {[
                {
                  anchor: "gamme-go",
                  image: "/products/simrad-go9-1.png",
                  title: "GO",
                  text: "La gamme d'entrée, compacte et tactile, pour équiper rapidement votre poste de barre.",
                },
                {
                  anchor: "gamme-nsx",
                  image: "/products/simrad-nsx-3009-1.png",
                  title: "NSX",
                  text: "Notre système d'exploitation le plus fluide et le plus rapide, en version tactile.",
                },
                {
                  anchor: "gamme-nsx-ultrawide",
                  image: "/products/simrad-nsx-ultrawide-3012-1.png",
                  title: "NSX Ultrawide",
                  text: "Le format panoramique NSX pour multiplier les vues sans perdre en lisibilité.",
                },
                {
                  anchor: "gamme-nss-evo-3",
                  image: "/products/simrad-nss-7-evo3-1.png",
                  title: "NSS evo3",
                  text: "Traceur professionnel SolarMAX HD, compatible radar Halo et pilote automatique.",
                },
                {
                  anchor: "gamme-nss-4",
                  image: "/products/simrad-nss4-12-1.png",
                  title: "NSS4",
                  text: "La nouvelle génération Simrad : SolarMAX HD et intégration complète du poste de barre.",
                },
              ].map((tile) => (
                <a
                  key={tile.anchor}
                  href={`#${tile.anchor}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={tile.image}
                      alt={tile.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                    {tile.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/70">{tile.text}</p>
                  <span className="mt-4 rounded border border-white/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white transition-colors group-hover:bg-white/10">
                    {tCommon("readMore")}
                  </span>
                </a>
              ))}
            </div>
          </div>
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
              <h3
                id={`gamme-${line.toLowerCase().replace(/\s+/g, "-")}`}
                className={
                  isLowrance
                    ? `${barlowCondensed.className} scroll-mt-24 text-2xl font-medium text-primary`
                    : isCmap
                      ? `${exo2.className} scroll-mt-24 text-2xl font-bold uppercase text-[#242424]`
                      : usesGarminStyle
                        ? `${oswald.className} scroll-mt-24 text-2xl font-medium uppercase text-black`
                        : isMinnKota
                          ? `${archivoBlack.className} scroll-mt-24 text-xl uppercase text-black`
                          : isInternational
                            ? `${openSans.className} scroll-mt-24 text-2xl font-bold uppercase text-[#005192]`
                            : "scroll-mt-24 text-lg font-semibold text-primary"
                }
              >
                {tShop("productLine", { line })}
              </h3>
              {isCmap && <span className="mt-1.5 block h-1 w-12 bg-[#FC5000]" aria-hidden="true" />}
              {isMinnKota && <span className="mt-1.5 block h-1 w-12 bg-[#FDB924]" aria-hidden="true" />}
              {isInternational && <span className="mt-1.5 block h-1 w-12 bg-[#008BC5]" aria-hidden="true" />}
              {isLowrance && line === "Eagle" && <EagleVideoPlaylist />}
              <div className="mt-4">{renderGrid(lineProducts)}</div>
            </div>
          );

          return (
            <div className="mt-10 space-y-12">
              {sections.map(({ section, lines }, index) =>
                section ? (
                  <div key={`${section}-${index}`}>
                    {sectionHeading(tShop(`sections.${section}`))}
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
              {sectionHeading(tShop("sections.cartographie"))}
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
