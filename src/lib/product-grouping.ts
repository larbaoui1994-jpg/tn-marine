/**
 * Regroupement des produits d'une marque par sous-gamme (`productLine`),
 * utilisé sur la page marque et le catalogue filtré par marque (ex.
 * Lowrance : Eagle → Elite FS → HDS PRO ; Simrad : GO → NSX → NSX
 * ULTRAWIDE → NSS EVO 3 → NSS EVO 3S → NSS 4).
 */
const PRODUCT_LINE_ORDER = [
  "Eagle",
  "Elite FS",
  "HDS PRO",
  "GO",
  "NSX",
  "NSX ULTRAWIDE",
  "NSS EVO 3",
  "NSS EVO 3S",
  "NSS 4",
  "Stéréos & Radios",
  "HP XS Sport",
  "HP Tower XS Sport",
  "HP Wake Tower Signature",
  "HP Apollo",
  "Amplificateurs Signature",
  "Amplificateurs Apollo",
  "Accessoires",
  "Boatguard 100",
  "Cruiser 200",
  "Ultra 300",
  "Micron 350",
  "Antifouling hélices & embases",
  "Primaires",
];

// Extrait la taille d'écran depuis le nom du produit (ex. "Eagle 4X" → 4,
// "NSS 9 EVO 3S" → 9) pour trier chaque gamme du plus petit écran au plus
// grand plutôt que par ordre alphabétique. On prend le plus grand nombre
// trouvé dans le nom : les noms Simrad contiennent parfois un second
// nombre qui ne désigne pas la taille d'écran (ex. le "3" de "EVO 3S" ou
// le "4" de "NSS 4"), toujours inférieur à la taille d'écran réelle.
function modelSizeFromName(name: string): number {
  const matches = name.match(/\d+/g);
  return matches ? Math.max(...matches.map(Number)) : 0;
}

export function groupByProductLine<T extends { productLine: string | null; name: string }>(
  products: T[],
) {
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
    groups: orderedLines.map((line) => ({
      line,
      products: [...byLine.get(line)!].sort(
        (a, b) => modelSizeFromName(a.name) - modelSizeFromName(b.name),
      ),
    })),
    ungrouped,
  };
}
