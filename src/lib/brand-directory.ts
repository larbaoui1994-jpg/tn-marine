/**
 * Répertoire des 10 marques représentées (cahier des charges §5).
 * Source unique pour le slug d'URL (/marques/[slug]), le nom affiché
 * et la clé utilisée pour retrouver les traductions (namespaces
 * "About" et "Brands" dans les fichiers de messages).
 */
export const BRAND_DIRECTORY = [
  { key: "lowrance", slug: "lowrance", name: "Lowrance", logoUrl: "/brands/lowrance.png" },
  { key: "simrad", slug: "simrad", name: "Simrad", logoUrl: "/brands/simrad.png" },
  { key: "garmin", slug: "garmin", name: "Garmin", logoUrl: "/brands/garmin.png" },
  { key: "cmap", slug: "cmap", name: "C-MAP", logoUrl: "/brands/cmap.png" },
  { key: "navionics", slug: "navionics", name: "Navionics", logoUrl: "/brands/navionics.png" },
  { key: "fusion", slug: "fusion", name: "Fusion", logoUrl: "/brands/fusion.png" },
  { key: "minnKota", slug: "minn-kota", name: "Minn Kota", logoUrl: "/brands/minn-kota.png" },
  { key: "international", slug: "international", name: "International", logoUrl: "/brands/international.png" },
  { key: "cobraMarine", slug: "cobra-marine", name: "Cobra Marine", logoUrl: "/brands/cobra-marine.png" },
  { key: "airmar", slug: "airmar", name: "Airmar", logoUrl: "/brands/airmar.png" },
] as const;

export type BrandKey = (typeof BRAND_DIRECTORY)[number]["key"];

export function brandKeyFromSlug(slug: string): BrandKey | undefined {
  return BRAND_DIRECTORY.find((b) => b.slug === slug)?.key;
}

// Certaines marques n'ont pas encore de logo fourni ; on affiche alors le
// nom en texte (voir les usages de cette fonction).
export function brandLogoUrl(slug: string): string | undefined {
  const brand = BRAND_DIRECTORY.find((b) => b.slug === slug);
  return brand && "logoUrl" in brand ? brand.logoUrl : undefined;
}
