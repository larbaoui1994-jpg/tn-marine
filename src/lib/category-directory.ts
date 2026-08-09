/**
 * Répertoire des familles de produits (cahier des charges §6.2).
 * Source unique pour le slug, le nom canonique (FR, stocké aussi en
 * base) et l'icône utilisée comme visuel provisoire sur les cartes
 * produit tant qu'aucune photo officielle n'est disponible.
 */
export const CATEGORY_DIRECTORY = [
  { slug: "gps-traceurs", name: "GPS & traceurs", icon: "🧭" },
  { slug: "sondeurs", name: "Sondeurs", icon: "🐟" },
  { slug: "sondes", name: "Sondes (transducteurs)", icon: "📌" },
  { slug: "cartographie", name: "Cartographie marine", icon: "🗺️" },
  { slug: "vhf-communication", name: "VHF & communication", icon: "📻" },
  { slug: "radars", name: "Radars", icon: "📡" },
  { slug: "pilotes-automatiques", name: "Pilotes automatiques", icon: "🕹️" },
  { slug: "moteurs-electriques", name: "Moteurs électriques", icon: "⚙️" },
  { slug: "audio-marine", name: "Audio marine", icon: "🔊" },
  { slug: "peintures-antifouling", name: "Peintures & antifouling", icon: "🎨" },
] as const;

export type CategorySlug = (typeof CATEGORY_DIRECTORY)[number]["slug"];

export function categoryIcon(slug: string): string {
  return CATEGORY_DIRECTORY.find((c) => c.slug === slug)?.icon ?? "⚓";
}

// Catégories dont les fiches produit portent la mention "Autorisation
// ANF nécessaire" (cahier des charges §8 : VHF, sondeur/GPS, radar).
export const ANF_CATEGORY_SLUGS: CategorySlug[] = [
  "vhf-communication",
  "sondeurs",
  "gps-traceurs",
  "radars",
];
