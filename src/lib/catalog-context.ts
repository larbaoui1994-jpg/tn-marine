import { prisma } from "@/lib/prisma";

/**
 * RAG « léger » pour le chatbot : le catalogue (30 produits) tient
 * confortablement dans le contexte du modèle, donc on l'injecte en
 * intégralité plutôt que de mettre en place une recherche vectorielle —
 * cela garantit des réponses toujours à jour et sans invention, ce que
 * demande le cahier des charges (§11).
 */
export async function buildCatalogContext(): Promise<string> {
  const products = await prisma.product.findMany({
    include: { brand: true, category: true },
    orderBy: [{ brand: { name: "asc" } }, { name: "asc" }],
  });

  return products
    .map((product) => {
      const specs = product.specs as { label: string; value: string }[];
      const specsText = specs.map((s) => `${s.label}: ${s.value}`).join("; ");
      const anf = product.requiresAnfAuth
        ? " [Autorisation ANF nécessaire]"
        : "";
      return (
        `- ${product.name} (marque: ${product.brand.name}, catégorie: ${product.category.name})${anf}\n` +
        `  ${product.shortDescription}\n` +
        `  Caractéristiques: ${specsText}`
      );
    })
    .join("\n");
}
