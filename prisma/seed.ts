import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { BRAND_DIRECTORY } from "../src/lib/brand-directory";
import {
  CATEGORY_DIRECTORY,
  ANF_CATEGORY_SLUGS,
  type CategorySlug,
} from "../src/lib/category-directory";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

type Spec = { label: string; value: string };

interface ProductSeed {
  slug: string;
  name: string;
  brand: (typeof BRAND_DIRECTORY)[number]["slug"];
  category: CategorySlug;
  productLine?: string;
  images?: string[];
  shortDescription: string;
  description: string;
  specs: Spec[];
}

// Contenu d'exemple réaliste, rédigé pour TN Marine (pas de copie des
// sites de marques — cf. cahier des charges §4). À remplacer/compléter
// par TN Marine avec les fiches techniques officielles.
const products: ProductSeed[] = [
  // --- Lowrance — Gamme Eagle (entrée de gamme, accessible) --------------
  {
    slug: "lowrance-eagle-4x",
    name: "Lowrance Eagle 4X",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Eagle",
    images: [
      "/products/lowrance-eagle-4x-1.png",
      "/products/lowrance-eagle-4x-2.png",
      "/products/lowrance-eagle-4x-3.png",
      "/products/lowrance-eagle-4x-4.png",
    ],
    shortDescription: "Sondeur seul (sans GPS), écran 4 pouces, idéal petites embarcations",
    description:
      "L'Eagle 4X est le sondeur le plus simple de la gamme Lowrance, à commande par boutons et sans cartographie GPS intégrée. Son défilement en continu facilite la détection des poissons et la lecture de la colonne d'eau, un atout pour la pêche côtière sur petites embarcations ou annexes en Méditerranée. Ses réglages automatiques le rendent immédiatement opérationnel, sans réglage préalable.",
    specs: [
      { label: "Écran", value: "4 pouces IPS, format portrait" },
      { label: "Sondeur", value: "CHIRP, sonde Bullet grand angle" },
      { label: "Cartographie", value: "Aucune — sondeur seul, sans GPS" },
      { label: "Réglages", value: "Configuration automatique, commande par boutons" },
    ],
  },
  {
    slug: "lowrance-eagle-5",
    name: "Lowrance Eagle 5",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Eagle",
    images: Array.from({ length: 11 }, (_, i) => `/products/lowrance-eagle-5-${i + 1}.png`),
    shortDescription: "Sondeur/traceur compact, écran tactile 5 pouces, réglages automatiques",
    description:
      "L'Eagle 5 associe sondeur et cartographie GPS sur un écran tactile compact, pensé pour les petites unités de pêche côtière. Sa sonde combine CHIRP et imagerie latérale/verticale pour repérer rapidement les zones de poisson, avec une cartographie de base préchargée évolutive vers C-MAP.",
    specs: [
      { label: "Écran", value: "5 pouces tactile, dalle IPS" },
      { label: "Sondeur", value: "CHIRP, imagerie SplitShot/TripleShot HD selon version" },
      { label: "Cartographie", value: "Carte de base mondiale préchargée, évolutive vers C-MAP" },
      { label: "Réglages", value: "Configuration automatique" },
    ],
  },
  {
    slug: "lowrance-eagle-7",
    name: "Lowrance Eagle 7",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Eagle",
    images: Array.from({ length: 19 }, (_, i) => `/products/lowrance-eagle-7-${i + 1}.png`),
    shortDescription: "Sondeur/traceur d'entrée de gamme, écran 7 pouces, réglages automatiques",
    description:
      "L'Eagle 7 est le sondeur/traceur Lowrance le plus accessible, pensé pour une prise en main immédiate grâce à ses réglages automatiques. Sa sonde combine sondeur CHIRP et imagerie latérale/verticale pour repérer rapidement les fonds et les bancs de poisson le long des côtes algériennes. Une cartographie de base mondiale est préchargée, évolutive vers C-MAP — un choix adapté aux petites et moyennes embarcations de pêche côtière.",
    specs: [
      { label: "Écran", value: "7 pouces, dalle IPS lisible au soleil" },
      { label: "Sondeur", value: "CHIRP, imagerie SideScan/DownScan (selon sonde)" },
      { label: "Cartographie", value: "Carte de base mondiale préchargée, évolutive vers C-MAP" },
      { label: "Réglages", value: "Configuration automatique" },
    ],
  },
  {
    slug: "lowrance-eagle-9",
    name: "Lowrance Eagle 9",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Eagle",
    images: Array.from({ length: 19 }, (_, i) => `/products/lowrance-eagle-9-${i + 1}.png`),
    shortDescription: "Sondeur/traceur d'entrée de gamme, grand écran 9 pouces",
    description:
      "L'Eagle 9 reprend la simplicité d'utilisation de la gamme Eagle sur un grand écran tactile, apprécié pour sa lisibilité au poste de barre. Sa sonde TripleShot HD combine CHIRP, imagerie latérale et verticale pour couvrir efficacement les zones de pêche côtières et hauturières le long du littoral algérien. Une cartographie de base mondiale est incluse, évolutive vers C-MAP.",
    specs: [
      { label: "Écran", value: "9 pouces tactile, dalle IPS" },
      { label: "Sondeur", value: "CHIRP, TripleShot HD (SideScan et DownScan)" },
      { label: "Cartographie", value: "Carte de base mondiale préchargée, évolutive vers C-MAP" },
      { label: "Réglages", value: "Configuration automatique" },
    ],
  },

  // --- Lowrance — Gamme Elite FS (milieu-haut de gamme, pêche) -----------
  {
    slug: "lowrance-elite-fs-7",
    name: "Lowrance Elite FS 7",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Elite FS",
    images: Array.from({ length: 9 }, (_, i) => `/products/lowrance-elite-fs-7-${i + 1}.png`),
    shortDescription: "Sondeur/GPS combiné pour la pêche, écran tactile 7 pouces",
    description:
      "L'Elite FS 7 donne accès aux outils de détection Lowrance les plus avancés — Active Imaging 3-en-1 et compatibilité ActiveTarget 2 — sur un écran tactile multi-touch à verre plat anti-reflet. Compact et lisible en plein soleil, il convient aux petites et moyennes embarcations de pêche côtière en Méditerranée.",
    specs: [
      { label: "Écran", value: "7 pouces tactile multi-touch, verre plat anti-reflet" },
      { label: "Sondeur", value: "CHIRP, Active Imaging 3-en-1, compatible ActiveTarget 2" },
      { label: "Cartographie", value: "Compatible C-MAP et Navionics" },
      { label: "Connectivité", value: "Wi-Fi, NMEA 2000" },
    ],
  },
  {
    slug: "lowrance-elite-fs-9",
    name: "Lowrance Elite FS 9",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Elite FS",
    images: Array.from({ length: 7 }, (_, i) => `/products/lowrance-elite-fs-9-${i + 1}.png`),
    shortDescription: "Sondeur/GPS combiné, écran tactile 9 pouces, compatible ActiveTarget 2",
    description:
      "L'Elite FS 9 embarque l'ensemble des outils de détection de poissons Lowrance sur un plus grand écran tactile, avec commande directe des ancres Power-Pole et moteurs électriques compatibles. Un choix adapté aux embarcations de 6 à 8 mètres pratiquant la pêche côtière et hauturière en Méditerranée.",
    specs: [
      { label: "Écran", value: "9 pouces tactile multi-touch" },
      { label: "Sondeur", value: "CHIRP, Active Imaging 3-en-1, compatible ActiveTarget 2" },
      { label: "Cartographie", value: "Compatible C-MAP et Navionics" },
      { label: "Intégration", value: "Commande des ancres Power-Pole et moteurs électriques compatibles" },
    ],
  },
  {
    slug: "lowrance-elite-fs-10",
    name: "Lowrance Elite FS 10",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Elite FS",
    images: Array.from({ length: 28 }, (_, i) => `/products/lowrance-elite-fs-10-${i + 1}.png`),
    shortDescription: "Sondeur/GPS combiné, écran tactile 10 pouces",
    description:
      "L'Elite FS 10 offre une plus grande surface d'affichage pour exploiter pleinement la cartographie et l'imagerie sonar Active Imaging, avec un écran tactile multi-touch lisible en plein soleil. Idéal pour les sorties de pêche prolongées sur la côte algérienne, sur des unités de 6 à 9 mètres.",
    specs: [
      { label: "Écran", value: "10 pouces tactile multi-touch" },
      { label: "Sondeur", value: "CHIRP, Active Imaging 3-en-1, compatible ActiveTarget 2" },
      { label: "Cartographie", value: "Compatible C-MAP et Navionics" },
      { label: "Connectivité", value: "Wi-Fi, NMEA 2000" },
    ],
  },
  {
    slug: "lowrance-elite-fs-12",
    name: "Lowrance Elite FS 12",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Elite FS",
    images: Array.from({ length: 28 }, (_, i) => `/products/lowrance-elite-fs-12-${i + 1}.png`),
    shortDescription: "Sondeur/GPS combiné haut de gamme, écran tactile 12 pouces",
    description:
      "L'Elite FS 12 est le plus grand modèle de la gamme, pensé pour une lecture confortable de la cartographie et des images sonar à plusieurs à bord. Il conserve l'accès complet aux outils de détection Lowrance (Active Imaging, ActiveTarget 2) sur un écran tactile multi-touch, pour la pêche côtière et hauturière en Méditerranée.",
    specs: [
      { label: "Écran", value: "12 pouces tactile multi-touch" },
      { label: "Sondeur", value: "CHIRP, Active Imaging 3-en-1, compatible ActiveTarget 2" },
      { label: "Cartographie", value: "Compatible C-MAP et Navionics" },
      { label: "Connectivité", value: "Wi-Fi, NMEA 2000" },
    ],
  },

  // --- Lowrance — Gamme HDS PRO (haut de gamme, professionnel) -----------
  {
    slug: "lowrance-hds-pro-9",
    name: "Lowrance HDS PRO 9",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "HDS PRO",
    images: Array.from({ length: 15 }, (_, i) => `/products/lowrance-hds-pro-9-${i + 1}.png`),
    shortDescription: "Sondeur/traceur professionnel 9 pouces, contrôle proue à poupe",
    description:
      "Le HDS PRO 9 ouvre la gamme professionnelle Lowrance : cartographie C-MAP dernière génération, écran tactile SolarMAX HD lisible en plein soleil, et pilotage du bateau de la proue à la poupe. Un format compact adapté aux petites et moyennes unités de pêche côtière en Méditerranée.",
    specs: [
      { label: "Écran", value: "9 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "CHIRP, compatible ActiveTarget 2 et Active Imaging HD" },
      { label: "Cartographie", value: "C-MAP dernière génération" },
      { label: "Intégration", value: "Contrôle proue à poupe (moteur électrique, ancre, pilote automatique)" },
    ],
  },
  {
    slug: "lowrance-hds-pro-10",
    name: "Lowrance HDS PRO 10",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "HDS PRO",
    images: Array.from({ length: 16 }, (_, i) => `/products/lowrance-hds-pro-10-${i + 1}.png`),
    shortDescription: "Sondeur/traceur professionnel 10 pouces",
    description:
      "Le HDS PRO 10 associe un écran tactile SolarMAX HD à la cartographie C-MAP la plus récente, avec un contrôle complet du bateau de la proue à la poupe. Une solution professionnelle pour la pêche côtière et hauturière sur des unités de 6 à 9 mètres en Méditerranée.",
    specs: [
      { label: "Écran", value: "10 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "CHIRP, compatible ActiveTarget 2 et Active Imaging HD" },
      { label: "Cartographie", value: "C-MAP dernière génération" },
      { label: "Intégration", value: "Contrôle proue à poupe (moteur électrique, ancre, pilote automatique)" },
    ],
  },
  {
    slug: "lowrance-hds-pro-12",
    name: "Lowrance HDS PRO 12",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "HDS PRO",
    images: Array.from({ length: 16 }, (_, i) => `/products/lowrance-hds-pro-12-${i + 1}.png`),
    shortDescription: "Sondeur/traceur professionnel 12 pouces, contrôle proue à poupe",
    description:
      "Le HDS PRO 12 se positionne au sommet de la gamme Lowrance : cartographie C-MAP dernière génération, écran tactile SolarMAX HD lisible en plein soleil, et pilotage du bateau de la proue à la poupe (moteur électrique, ancre, pilote automatique) depuis un seul écran. Son grand format et la clarté de son sondeur en font une solution taillée pour la pêche côtière et hauturière en Méditerranée, sur des unités de 6 à 9 mètres.",
    specs: [
      { label: "Écran", value: "12 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "CHIRP, compatible ActiveTarget 2 et Active Imaging HD" },
      { label: "Cartographie", value: "C-MAP dernière génération" },
      { label: "Intégration", value: "Contrôle proue à poupe (moteur électrique, ancre, pilote automatique)" },
    ],
  },
  {
    slug: "lowrance-hds-pro-16",
    name: "Lowrance HDS PRO 16",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "HDS PRO",
    images: Array.from({ length: 17 }, (_, i) => `/products/lowrance-hds-pro-16-${i + 1}.png`),
    shortDescription: "Sondeur/traceur professionnel haut de gamme, écran 16 pouces",
    description:
      "Le HDS PRO 16 est le modèle amiral de la gamme Lowrance, avec un très grand écran tactile SolarMAX HD pour une lecture précise de la cartographie C-MAP et des images sonar. Il centralise le contrôle du bateau de la proue à la poupe, pour les unités de pêche hauturière en Méditerranée jusqu'à 9 mètres.",
    specs: [
      { label: "Écran", value: "16 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "CHIRP, compatible ActiveTarget 2 et Active Imaging HD" },
      { label: "Cartographie", value: "C-MAP dernière génération" },
      { label: "Intégration", value: "Contrôle proue à poupe (moteur électrique, ancre, pilote automatique)" },
    ],
  },
  // --- Simrad — Gamme GO (entrée de gamme, compacte) ---------------------
  {
    slug: "simrad-go7",
    name: "Simrad GO7",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "GO",
    images: Array.from({ length: 4 }, (_, i) => `/products/simrad-go7-${i + 1}.png`),
    shortDescription: "Traceur/sondeur compact 7 pouces, écran tactile lisible au soleil",
    description:
      "Le GO7 associe cartographie et sondeur sur un format compact taillé pour les petites embarcations. Son écran tactile résiste aux embruns et reste lisible en plein soleil, avec une cartographie C-MAP intégrée prête à l'emploi dès la sortie du carton.",
    specs: [
      { label: "Écran", value: "7 pouces tactile, verre trempé anti-reflet" },
      { label: "Sondeur", value: "CHIRP large bande intégré" },
      { label: "Cartographie", value: "C-MAP intégrée, compatible cartes SD" },
      { label: "Connectivité", value: "Wi-Fi, NMEA 2000" },
    ],
  },
  {
    slug: "simrad-go9",
    name: "Simrad GO9",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "GO",
    images: Array.from({ length: 4 }, (_, i) => `/products/simrad-go9-${i + 1}.png`),
    shortDescription: "Traceur/sondeur compact 9 pouces, écran tactile lisible au soleil",
    description:
      "Le GO9 reprend la simplicité d'utilisation de la gamme GO sur un écran plus grand, pour une lecture confortable de la cartographie et du sondeur au poste de barre. Sa cartographie C-MAP intégrée et son sondeur CHIRP en font une solution accessible pour la pêche côtière.",
    specs: [
      { label: "Écran", value: "9 pouces tactile, verre trempé anti-reflet" },
      { label: "Sondeur", value: "CHIRP large bande intégré" },
      { label: "Cartographie", value: "C-MAP intégrée, compatible cartes SD" },
      { label: "Connectivité", value: "Wi-Fi, NMEA 2000" },
    ],
  },

  // --- Simrad — Gamme NSX (milieu de gamme, tactile) ----------------------
  {
    slug: "simrad-nsx-3007",
    name: "Simrad NSX 3007",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSX",
    images: Array.from({ length: 16 }, (_, i) => `/products/simrad-nsx-3007-${i + 1}.png`),
    shortDescription: "Traceur multifonction 7 pouces à écran tactile haute définition",
    description:
      "Le NSX 3007 ouvre la gamme NSX avec une interface tactile fluide et un sondeur intégré large bande, dans un format compact adapté aux petites unités. Il partage la même compatibilité avec les radars Halo et pilotes automatiques que le reste de la gamme.",
    specs: [
      { label: "Écran", value: "7 pouces tactile haute définition" },
      { label: "Sondeur", value: "Actif large bande intégré" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
      { label: "Connectivité", value: "Wi-Fi, Ethernet, NMEA 2000" },
    ],
  },
  {
    slug: "simrad-nsx-3009",
    name: "Simrad NSX 3009",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSX",
    images: Array.from({ length: 8 }, (_, i) => `/products/simrad-nsx-3009-${i + 1}.png`),
    shortDescription: "Traceur multifonction 9 pouces à écran tactile haute définition",
    description:
      "Le NSX 3009 offre une interface tactile fluide, un sondeur intégré large bande et la compatibilité avec les radars et pilotes automatiques Simrad. Conçu pour une intégration complète du poste de barre.",
    specs: [
      { label: "Écran", value: "9 pouces tactile haute définition" },
      { label: "Sondeur", value: "Actif large bande intégré" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
      { label: "Connectivité", value: "Wi-Fi, Ethernet, NMEA 2000" },
    ],
  },
  {
    slug: "simrad-nsx-3012",
    name: "Simrad NSX 3012",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSX",
    images: Array.from({ length: 8 }, (_, i) => `/products/simrad-nsx-3012-${i + 1}.png`),
    shortDescription: "Traceur multifonction 12 pouces à écran tactile haute définition",
    description:
      "Le NSX 3012 est le plus grand modèle de la gamme NSX, avec une surface d'affichage étendue pour la cartographie et le sondeur large bande intégré. Il conserve la compatibilité complète avec les radars Halo et pilotes automatiques Simrad.",
    specs: [
      { label: "Écran", value: "12 pouces tactile haute définition" },
      { label: "Sondeur", value: "Actif large bande intégré" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
      { label: "Connectivité", value: "Wi-Fi, Ethernet, NMEA 2000" },
    ],
  },

  // --- Simrad — Gamme NSX Ultrawide (écran panoramique) -------------------
  {
    slug: "simrad-nsx-ultrawide-3012",
    name: "Simrad NSX Ultrawide 3012",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSX ULTRAWIDE",
    images: Array.from(
      { length: 5 },
      (_, i) => `/products/simrad-nsx-ultrawide-3012-${i + 1}.png`,
    ),
    shortDescription: "Traceur multifonction 12 pouces au format ultra-large, écran tactile",
    description:
      "Le NSX Ultrawide 3012 reprend l'électronique de la gamme NSX sur un écran au format panoramique, offrant davantage d'espace pour afficher plusieurs vues côte à côte — cartographie, sondeur et données de navigation — sans compromis de lisibilité.",
    specs: [
      { label: "Écran", value: "12 pouces tactile, format ultra-large panoramique" },
      { label: "Sondeur", value: "Actif large bande intégré" },
      { label: "Affichage", value: "Multi-fenêtres simultanées (cartographie, sondeur, instruments)" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },
  {
    slug: "simrad-nsx-ultrawide-3015",
    name: "Simrad NSX Ultrawide 3015",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSX ULTRAWIDE",
    images: Array.from(
      { length: 11 },
      (_, i) => `/products/simrad-nsx-ultrawide-3015-${i + 1}.png`,
    ),
    shortDescription: "Traceur multifonction 15 pouces au format ultra-large, écran tactile",
    description:
      "Le NSX Ultrawide 3015 est le plus grand écran de la gamme NSX, au format panoramique. Il permet d'afficher simultanément cartographie, sondeur et instruments sur une seule dalle tactile, un atout pour le poste de barre des unités de pêche hauturière.",
    specs: [
      { label: "Écran", value: "15 pouces tactile, format ultra-large panoramique" },
      { label: "Sondeur", value: "Actif large bande intégré" },
      { label: "Affichage", value: "Multi-fenêtres simultanées (cartographie, sondeur, instruments)" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },

  // --- Simrad — Gamme NSS evo3 (professionnelle) --------------------------
  {
    slug: "simrad-nss-7-evo3",
    name: "Simrad NSS 7 EVO 3",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSS EVO 3",
    images: Array.from({ length: 4 }, (_, i) => `/products/simrad-nss-7-evo3-${i + 1}.png`),
    shortDescription: "Traceur multifonction professionnel 7 pouces, écran SolarMAX HD",
    description:
      "Le NSS 7 evo3 associe un écran SolarMAX HD lisible en plein soleil à un sondeur large bande intégré, avec une compatibilité complète avec l'écosystème Simrad — radars Halo, pilotes automatiques et sondes StructureScan. Une base solide pour équiper un poste de barre professionnel.",
    specs: [
      { label: "Écran", value: "7 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "Large bande intégré, compatible StructureScan" },
      { label: "Cartographie", value: "C-MAP, compatible cartes SD" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },

  // --- Simrad — Gamme NSS evo3S (processeur renforcé) ---------------------
  {
    slug: "simrad-nss-9-evo3s",
    name: "Simrad NSS 9 EVO 3S",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSS EVO 3S",
    images: Array.from({ length: 4 }, (_, i) => `/products/simrad-nss-9-evo3s-${i + 1}.png`),
    shortDescription: "Traceur multifonction professionnel 9 pouces, processeur renforcé",
    description:
      "Le NSS 9 evo3S reprend l'écran SolarMAX HD de la gamme evo3 avec un processeur plus puissant et des connectiques élargies, pour intégrer davantage de capteurs et de sources vidéo au poste de barre.",
    specs: [
      { label: "Écran", value: "9 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "Large bande intégré, compatible StructureScan 3D" },
      { label: "Connectivité", value: "Ethernet, NMEA 2000, ports vidéo additionnels" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },
  {
    slug: "simrad-nss-12-evo3s",
    name: "Simrad NSS 12 EVO 3S",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSS EVO 3S",
    images: Array.from({ length: 4 }, (_, i) => `/products/simrad-nss-12-evo3s-${i + 1}.png`),
    shortDescription: "Traceur multifonction professionnel 12 pouces, processeur renforcé",
    description:
      "Le NSS 12 evo3S offre une plus grande surface d'affichage pour exploiter pleinement la cartographie et le sondeur large bande, avec le processeur renforcé et les connectiques élargies de la gamme evo3S.",
    specs: [
      { label: "Écran", value: "12 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "Large bande intégré, compatible StructureScan 3D" },
      { label: "Connectivité", value: "Ethernet, NMEA 2000, ports vidéo additionnels" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },
  {
    slug: "simrad-nss-16-evo3s",
    name: "Simrad NSS 16 EVO 3S",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSS EVO 3S",
    images: Array.from({ length: 4 }, (_, i) => `/products/simrad-nss-16-evo3s-${i + 1}.png`),
    shortDescription: "Traceur multifonction professionnel haut de gamme, écran 16 pouces",
    description:
      "Le NSS 16 evo3S est le modèle amiral de la gamme evo3S, avec un très grand écran SolarMAX HD pour une lecture précise de la cartographie et des images sonar à plusieurs à bord. Il centralise le contrôle du poste de barre pour les unités de pêche hauturière.",
    specs: [
      { label: "Écran", value: "16 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "Large bande intégré, compatible StructureScan 3D" },
      { label: "Connectivité", value: "Ethernet, NMEA 2000, ports vidéo additionnels" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },

  // --- Simrad — Gamme NSS4 (nouvelle génération) ---------------------------
  {
    slug: "simrad-nss4-10",
    name: "Simrad NSS4-10",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSS 4",
    images: Array.from({ length: 9 }, (_, i) => `/products/simrad-nss4-10-${i + 1}.png`),
    shortDescription: "Traceur multifonction nouvelle génération, écran tactile 10 pouces",
    description:
      "Le NSS4-10 inaugure la nouvelle génération d'interface Simrad, avec un écran SolarMAX HD et une intégration étendue à l'ensemble de l'écosystème Simrad — radars Halo, sondes StructureScan et pilotes automatiques — pour un poste de barre professionnel évolutif.",
    specs: [
      { label: "Écran", value: "10 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "Large bande intégré, compatible StructureScan 3D et Forward Scan" },
      { label: "Cartographie", value: "C-MAP dernière génération" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },
  {
    slug: "simrad-nss4-12",
    name: "Simrad NSS4-12",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSS 4",
    images: Array.from({ length: 7 }, (_, i) => `/products/simrad-nss4-12-${i + 1}.png`),
    shortDescription: "Traceur multifonction nouvelle génération, écran tactile 12 pouces",
    description:
      "Le NSS4-12 offre une plus grande surface d'affichage pour la nouvelle génération d'interface Simrad, avec une intégration étendue à l'ensemble de l'écosystème Simrad — radars Halo, sondes StructureScan et pilotes automatiques.",
    specs: [
      { label: "Écran", value: "12 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "Large bande intégré, compatible StructureScan 3D et Forward Scan" },
      { label: "Cartographie", value: "C-MAP dernière génération" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad" },
    ],
  },
  {
    slug: "simrad-nss4-16",
    name: "Simrad NSS4-16",
    brand: "simrad",
    category: "gps-traceurs",
    productLine: "NSS 4",
    images: Array.from({ length: 8 }, (_, i) => `/products/simrad-nss4-16-${i + 1}.png`),
    shortDescription: "Traceur multifonction nouvelle génération, grand écran tactile 16 pouces",
    description:
      "Le NSS4-16 est le plus grand modèle de la nouvelle génération d'interface Simrad, avec un vaste écran SolarMAX HD pour afficher simultanément cartographie, sondeur et caméras IP. Une intégration étendue à l'ensemble de l'écosystème Simrad — radars Halo, sondes StructureScan et pilotes automatiques — pour un poste de barre professionnel complet.",
    specs: [
      { label: "Écran", value: "16 pouces tactile, SolarMAX HD" },
      { label: "Sondeur", value: "Large bande intégré, compatible StructureScan 3D et Forward Scan" },
      { label: "Cartographie", value: "C-MAP dernière génération" },
      { label: "Compatibilité", value: "Radar Halo, pilote automatique Simrad, caméras IP" },
    ],
  },
  // Halo20+ (radar) et AP44 (pilote automatique) retirés temporairement
  // du catalogue à la demande de TN Marine — seront réajoutés plus tard.

  // --- Garmin ---------------------------------------------------------
  {
    slug: "garmin-gpsmap-943xsv",
    name: "Garmin GPSMAP 943xsv",
    brand: "garmin",
    category: "gps-traceurs",
    shortDescription:
      "Traceur/sondeur combiné 9 pouces avec sondeur CHIRP traditionnel et ClearVü",
    description:
      "Le GPSMAP 943xsv associe cartographie marine détaillée et sondeur haute résolution CHIRP, ClearVü et SideVü. Sa connectivité étendue permet de contrôler moteurs, pilote automatique et radar depuis un seul écran.",
    specs: [
      { label: "Écran", value: "9 pouces tactile" },
      { label: "Sondeur", value: "CHIRP traditionnel, ClearVü, SideVü" },
      { label: "Cartographie", value: "Compatible Garmin Navionics+" },
      { label: "Connectivité", value: "Wi-Fi, NMEA 2000, réseau Garmin Marine" },
    ],
  },
  {
    slug: "garmin-echomap-uhd2-63cv",
    name: "Garmin ECHOMAP UHD2 63cv",
    brand: "garmin",
    category: "sondeurs",
    shortDescription: "Sondeur/GPS 6 pouces avec cartographie préchargée",
    description:
      "L'ECHOMAP UHD2 63cv embarque un écran haute définition, un sondeur CHIRP traditionnel et ClearVü, ainsi que la cartographie côtière préchargée pour une mise en route immédiate.",
    specs: [
      { label: "Écran", value: "6 pouces haute définition" },
      { label: "Sondeur", value: "CHIRP traditionnel, ClearVü" },
      { label: "Cartographie", value: "Côtière préchargée" },
      { label: "Connectivité", value: "NMEA 2000, Garmin Quickdraw Contours" },
    ],
  },
  {
    slug: "garmin-gnx-130",
    name: "Garmin GNX 130",
    brand: "garmin",
    category: "gps-traceurs",
    shortDescription: "Instrument de navigation multifonction, écran couleur lisible au soleil",
    description:
      "Le GNX 130 affiche les données essentielles de navigation — vitesse, cap, profondeur, vent — sur un écran couleur circulaire lisible en plein soleil. Il s'intègre au réseau NMEA 2000 existant du bord.",
    specs: [
      { label: "Écran", value: "4 pouces couleur, circulaire" },
      { label: "Données affichées", value: "Vitesse, cap, profondeur, vent" },
      { label: "Réseau", value: "NMEA 2000" },
      { label: "Étanchéité", value: "IPX7" },
    ],
  },

  // --- C-MAP — Gamme Reveal ------------------------------------------------
  {
    slug: "cmap-reveal-y076",
    name: "C-MAP Reveal EM-Y076 Méditerranée Sud-Ouest",
    brand: "cmap",
    category: "cartographie",
    productLine: "Reveal",
    images: ["/products/cmap-reveal-y076.png"],
    shortDescription: "Carte Reveal Large, relief ombragé et imagerie satellite, Méditerranée sud-ouest",
    description:
      "C-MAP Reveal EM-Y076 couvre la Méditerranée sud-ouest (Gibraltar à Corfou), les Açores et les Canaries. Elle ajoute le relief ombragé des fonds marins, l'imagerie satellite et la bathymétrie haute résolution à la cartographie vectorielle complète, avec 12 mois de mises à jour en ligne inclus.",
    specs: [
      { label: "Zone", value: "Méditerranée sud-ouest, Açores, Canaries" },
      { label: "Support", value: "Carte micro-SD/SD, 64 Go" },
      { label: "Compatibilité", value: "Traceurs Lowrance, Simrad et B&G" },
      { label: "Référence", value: "M-EM-Y076-MS" },
    ],
  },

  // --- C-MAP — Gamme Discover ----------------------------------------------
  {
    slug: "cmap-discover-y045",
    name: "C-MAP Discover Southern Europe",
    brand: "cmap",
    category: "cartographie",
    productLine: "Discover",
    images: ["/products/cmap-discover-y045.png"],
    shortDescription: "Carte Discover Extra Large, bathymétrie haute résolution, Europe du Sud",
    description:
      "C-MAP Discover Southern Europe couvre une large zone incluant l'Europe du Sud et la Méditerranée. Elle offre une cartographie vectorielle complète avec bathymétrie haute résolution (données Genesis intégrées), personnalisation des couleurs de profondeur, marées et courants, et Easy Routing sans abonnement.",
    specs: [
      { label: "Zone", value: "Europe du Sud (Extra Large)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Traceurs Lowrance, Simrad et B&G" },
      { label: "Référence", value: "M-EM-Y045-MS" },
    ],
  },
  {
    slug: "cmap-discover-y200",
    name: "C-MAP Discover West Mediterranean",
    brand: "cmap",
    category: "cartographie",
    productLine: "Discover",
    images: ["/products/cmap-discover-y200.png"],
    shortDescription: "Carte Discover Medium, bathymétrie haute résolution, Méditerranée occidentale",
    description:
      "C-MAP Discover West Mediterranean couvre la Méditerranée occidentale. Elle offre une cartographie vectorielle complète avec bathymétrie haute résolution (données Genesis intégrées), personnalisation des couleurs de profondeur, marées et courants, et Easy Routing sans abonnement.",
    specs: [
      { label: "Zone", value: "Méditerranée occidentale (Medium)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Traceurs Lowrance, Simrad et B&G" },
      { label: "Référence", value: "M-EM-Y200-MS" },
    ],
  },
  {
    slug: "cmap-discover-y202",
    name: "C-MAP Discover Mediterranean South Central",
    brand: "cmap",
    category: "cartographie",
    productLine: "Discover",
    images: ["/products/cmap-discover-y202.png"],
    shortDescription: "Carte Discover Medium, bathymétrie haute résolution, Méditerranée centre-sud",
    description:
      "C-MAP Discover Mediterranean South Central couvre le centre-sud de la Méditerranée. Elle offre une cartographie vectorielle complète avec bathymétrie haute résolution (données Genesis intégrées), personnalisation des couleurs de profondeur, marées et courants, et Easy Routing sans abonnement.",
    specs: [
      { label: "Zone", value: "Méditerranée centre-sud (Medium)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Traceurs Lowrance, Simrad et B&G" },
      { label: "Référence", value: "M-EM-Y202-MS" },
    ],
  },

  // --- C-MAP — Génération X (Discover X / Reveal X) -------------------------
  {
    slug: "cmap-discover-x-t076",
    name: "C-MAP Discover X West Mediterranean",
    brand: "cmap",
    category: "cartographie",
    productLine: "Génération X",
    images: ["/products/cmap-discover-x-t076.png"],
    shortDescription: "Carte Discover X Large, Méditerranée occidentale, Açores et Canaries",
    description:
      "C-MAP Discover X West Mediterranean est la nouvelle génération de cartographie C-MAP, avec l'outil Map Inspector, une bathymétrie haute résolution et une cartographie vectorielle complète. Couvre la Méditerranée occidentale, les Açores et les Canaries.",
    specs: [
      { label: "Zone", value: "Méditerranée occidentale, Açores, Canaries (Large)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Traceurs Simrad NSX et NSS4 uniquement" },
      { label: "Référence", value: "M-EM-T076-D-MS" },
    ],
  },
  {
    slug: "cmap-reveal-x-t076",
    name: "C-MAP Reveal X West Mediterranean",
    brand: "cmap",
    category: "cartographie",
    productLine: "Génération X",
    images: ["/products/cmap-reveal-x-t076.png"],
    shortDescription: "Carte Reveal X Large, Méditerranée occidentale, Açores et Canaries",
    description:
      "C-MAP Reveal X West Mediterranean apporte toutes les fonctionnalités de Discover X, avec en plus le relief ombragé des fonds marins et l'imagerie satellite haute résolution. Couvre la Méditerranée occidentale, les Açores et les Canaries.",
    specs: [
      { label: "Zone", value: "Méditerranée occidentale, Açores, Canaries (Large)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Traceurs Simrad NSX et NSS4 uniquement" },
      { label: "Référence", value: "M-EM-T076-R-MS" },
    ],
  },

  // --- Navionics — Compatible Lowrance & Simrad ---------------------------
  {
    slug: "navionics-plus-eu646l",
    name: "Navionics+ EU646L Europe Centrale et Occidentale",
    brand: "navionics",
    category: "cartographie",
    productLine: "Compatible Lowrance & Simrad",
    images: ["/products/navionics-plus-eu646l.png"],
    shortDescription: "Carte Large, Europe centrale et occidentale, données de pêche SonarChart",
    description:
      "Navionics+ EU646L couvre l'Europe centrale et occidentale (Royaume-Uni, France, Espagne, Portugal, Italie, Açores...) avec cartographie détaillée, courbes bathymétriques SonarChart et informations utiles à la pêche et à la plaisance. Compatible Lowrance, Simrad, B&G, Raymarine et Humminbird — non compatible Garmin.",
    specs: [
      { label: "Couverture", value: "Europe centrale et occidentale (Large)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Lowrance, Simrad, B&G, Raymarine, Humminbird" },
      { label: "Référence", value: "NAEU646L" },
    ],
  },
  {
    slug: "navionics-plus-eu643l",
    name: "Navionics+ EU643L Méditerranée et Mer Noire",
    brand: "navionics",
    category: "cartographie",
    productLine: "Compatible Lowrance & Simrad",
    images: ["/products/navionics-plus-eu643l.png"],
    shortDescription: "Carte Large, Méditerranée et mer Noire, données de pêche SonarChart",
    description:
      "Navionics+ EU643L couvre l'ensemble de la Méditerranée et de la mer Noire, des Açores au Bosphore, avec cartographie détaillée, courbes bathymétriques SonarChart et informations utiles à la pêche et à la plaisance. Compatible Lowrance, Simrad, B&G, Raymarine et Humminbird — non compatible Garmin.",
    specs: [
      { label: "Couverture", value: "Méditerranée et mer Noire (Large)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Lowrance, Simrad, B&G, Raymarine, Humminbird" },
      { label: "Référence", value: "NAEU643L" },
    ],
  },

  {
    slug: "navionics-platinum-plus-eu646l",
    name: "Navionics Platinum+ EU646L Europe Centrale et Occidentale",
    brand: "navionics",
    category: "cartographie",
    productLine: "Compatible Lowrance & Simrad",
    images: ["/products/navionics-platinum-plus-eu646l.png"],
    shortDescription: "Carte Large haut de gamme, Europe centrale et occidentale, relief ombré",
    description:
      "Navionics Platinum+ EU646L couvre l'Europe centrale et occidentale et ajoute le relief ombré terrestre et sous-marin ainsi que des courbes bathymétriques enrichies pour une lecture fine du relief des fonds. Compatible Lowrance, Simrad, B&G, Raymarine et Humminbird — non compatible Garmin.",
    specs: [
      { label: "Couverture", value: "Europe centrale et occidentale (Large)" },
      { label: "Relief", value: "Relief ombré terre et mer" },
      { label: "Compatibilité", value: "Lowrance, Simrad, B&G, Raymarine, Humminbird" },
      { label: "Référence", value: "NPEU646L" },
    ],
  },
  {
    slug: "navionics-platinum-plus-eu643l",
    name: "Navionics Platinum+ EU643L Méditerranée et Mer Noire",
    brand: "navionics",
    category: "cartographie",
    productLine: "Compatible Lowrance & Simrad",
    images: ["/products/navionics-platinum-plus-eu643l.png"],
    shortDescription: "Carte Large haut de gamme, Méditerranée et mer Noire, relief ombré",
    description:
      "Navionics Platinum+ EU643L couvre l'ensemble de la Méditerranée et de la mer Noire et ajoute le relief ombré terrestre et sous-marin ainsi que des courbes bathymétriques enrichies pour une lecture fine du relief des fonds. Compatible Lowrance, Simrad, B&G, Raymarine et Humminbird — non compatible Garmin.",
    specs: [
      { label: "Couverture", value: "Méditerranée et mer Noire (Large)" },
      { label: "Relief", value: "Relief ombré terre et mer" },
      { label: "Compatibilité", value: "Lowrance, Simrad, B&G, Raymarine, Humminbird" },
      { label: "Référence", value: "NPEU643L" },
    ],
  },

  // --- Navionics — Compatible Garmin ---------------------------------------
  {
    slug: "garmin-navionics-plus-nseu010r",
    name: "Garmin Navionics+ NSEU010R Espagne, Côte Méditerranéenne",
    brand: "navionics",
    category: "cartographie",
    productLine: "Compatible Garmin",
    images: ["/products/garmin-navionics-plus-nseu010r.png"],
    shortDescription: "Carte Regular, Espagne et côte méditerranéenne, écrans Garmin uniquement",
    description:
      "Garmin Navionics+ NSEU010R couvre la côte méditerranéenne de Lagos (Portugal) à La Spezia (Italie), avec cartographie détaillée, courbes bathymétriques SonarChart et informations utiles à la pêche et à la plaisance. Carte au format micro-SD compatible uniquement avec les écrans Garmin les plus récents.",
    specs: [
      { label: "Couverture", value: "Espagne, côte méditerranéenne (Regular)" },
      { label: "Support", value: "Carte micro-SD/SD" },
      { label: "Compatibilité", value: "Écrans Garmin récents uniquement" },
      { label: "Référence", value: "NSEU010R" },
    ],
  },
  {
    slug: "garmin-navionics-vision-plus-nveu010r",
    name: "Garmin Navionics Vision+ NVEU010R Espagne, Côte Méditerranéenne",
    brand: "navionics",
    category: "cartographie",
    productLine: "Compatible Garmin",
    images: ["/products/garmin-navionics-vision-plus-nveu010r.png"],
    shortDescription: "Carte Regular haut de gamme, Espagne et côte méditerranéenne, écrans Garmin uniquement",
    description:
      "Garmin Navionics Vision+ NVEU010R couvre la côte méditerranéenne de Lagos (Portugal) à La Spezia (Italie), avec en plus du relief ombré terrestre et sous-marin, l'imagerie satellite et une bathymétrie enrichie. Carte au format micro-SD compatible uniquement avec les écrans Garmin les plus récents.",
    specs: [
      { label: "Couverture", value: "Espagne, côte méditerranéenne (Regular)" },
      { label: "Relief", value: "Relief ombré, imagerie satellite" },
      { label: "Compatibilité", value: "Écrans Garmin récents uniquement" },
      { label: "Référence", value: "NVEU010R" },
    ],
  },
  // --- Fusion — Gamme Stéréos & Radios ------------------------------------
  {
    slug: "fusion-ra800",
    name: "Fusion Apollo RA800",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Stéréos & Radios",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-ra800-${i + 1}.png`),
    shortDescription: "Système audio écran tactile 4,3 pouces, 4x40 W, IPX7, Wi-Fi",
    description:
      "L'Apollo RA800 pilote la sono du bord depuis un écran tactile couleur 4,3 pouces lisible en plein soleil. Sa connectivité Wi-Fi et Bluetooth permet le streaming et le contrôle via l'application Fusion-Link, avec une façade étanche IPX7 pour résister aux embruns.",
    specs: [
      { label: "Écran", value: "4,3 pouces tactile couleur" },
      { label: "Puissance", value: "4 x 40 W" },
      { label: "Connectivité", value: "Wi-Fi, Bluetooth, Fusion-Link" },
      { label: "Étanchéité", value: "IPX7" },
    ],
  },
  {
    slug: "fusion-ra670",
    name: "Fusion Apollo RA670",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Stéréos & Radios",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-ra670-${i + 1}.png`),
    shortDescription: "Système audio écran LCD 2,7 pouces, 4x70 W",
    description:
      "L'Apollo RA670 associe un écran LCD 2,7 pouces à une puissance de sortie de 4x70 W, pour une sonorisation généreuse sur les unités de taille moyenne. Compatible Bluetooth et application Fusion-Link pour un contrôle à distance.",
    specs: [
      { label: "Écran", value: "2,7 pouces LCD" },
      { label: "Puissance", value: "4 x 70 W" },
      { label: "Connectivité", value: "Bluetooth, Fusion-Link" },
    ],
  },
  {
    slug: "fusion-ra210",
    name: "Fusion Radio Marine RA210",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Stéréos & Radios",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-ra210-${i + 1}.png`),
    shortDescription: "Radio marine DSP, compatible NMEA 2000",
    description:
      "La RA210 embarque un processeur de signal numérique (DSP) pour un rendu audio optimisé et se connecte au réseau NMEA 2000 du bord, pour un contrôle centralisé depuis les instruments compatibles.",
    specs: [
      { label: "Traitement", value: "DSP intégré" },
      { label: "Connectivité", value: "NMEA 2000" },
    ],
  },
  {
    slug: "fusion-ra70n",
    name: "Fusion RA70N",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Stéréos & Radios",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-ra70n-${i + 1}.png`),
    shortDescription: "Lecteur stéréo et radio marine, compatible NMEA 2000",
    description:
      "Le RA70N combine lecteur stéréo et radio marine dans un format compact, avec intégration NMEA 2000 pour un contrôle direct depuis l'écran de navigation. Une solution fiable et accessible pour équiper un poste de pilotage.",
    specs: [
      { label: "Fonctions", value: "Lecteur stéréo, radio marine" },
      { label: "Connectivité", value: "NMEA 2000" },
    ],
  },
  {
    slug: "fusion-ra60",
    name: "Fusion RA60",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Stéréos & Radios",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-ra60-${i + 1}.png`),
    shortDescription: "Lecteur stéréo et radio marine, IPX7, Bluetooth",
    description:
      "Le RA60 est un lecteur stéréo radio marine étanche IPX7 avec connectivité Bluetooth intégrée, pensé comme une solution audio accessible et robuste pour les petites et moyennes embarcations.",
    specs: [
      { label: "Connectivité", value: "Bluetooth" },
      { label: "Étanchéité", value: "IPX7" },
    ],
  },
  {
    slug: "fusion-bb100",
    name: "Fusion BlackBox BB100",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Stéréos & Radios",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-bb100-${i + 1}.png`),
    shortDescription: "Système audio compact contrôlable à distance via NMEA 2000",
    description:
      "Le BlackBox BB100 déporte l'électronique audio dans un boîtier compact à installer hors de vue, contrôlable à distance depuis un traceur compatible NMEA 2000 ou l'application Fusion-Link — idéal pour libérer de l'espace au poste de barre.",
    specs: [
      { label: "Format", value: "Boîtier compact déporté (BlackBox)" },
      { label: "Connectivité", value: "NMEA 2000, Fusion-Link" },
    ],
  },

  // --- Fusion — Gamme Haut-parleurs XS Sport -------------------------------
  {
    slug: "fusion-xs-f65-sport",
    name: "Fusion HP XS Sport 6.5\"",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP XS Sport",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-xs-f65-sport-${i + 1}.png`),
    shortDescription: "Haut-parleur 6,5 pouces, 200 W, gris et blanc, sans LED",
    description:
      "Le haut-parleur XS Sport 6,5 pouces délivre 200 W avec une grille interchangeable gris et blanc, pour une intégration esthétique au pont ou au cockpit. Conçu pour résister aux UV et aux embruns.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Puissance", value: "200 W" },
      { label: "Finition", value: "Gris et blanc, sans LED" },
    ],
  },
  {
    slug: "fusion-xs-fl65-sport",
    name: "Fusion HP XS Sport 6.5\" LED",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP XS Sport",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-xs-fl65-sport-${i + 1}.png`),
    shortDescription: "Haut-parleur 6,5 pouces, 200 W, gris et blanc, avec LED",
    description:
      "Version éclairée du haut-parleur XS Sport 6,5 pouces, avec LED intégrée pour une ambiance lumineuse à bord en plus des 200 W de puissance audio.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Puissance", value: "200 W" },
      { label: "Finition", value: "Gris et blanc, avec LED" },
    ],
  },
  {
    slug: "fusion-xs-f77-sport",
    name: "Fusion HP XS Sport 7.7\"",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP XS Sport",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-xs-f77-sport-${i + 1}.png`),
    shortDescription: "Haut-parleur 7,7 pouces, 240 W, gris et blanc, sans LED",
    description:
      "Le haut-parleur XS Sport 7,7 pouces monte en puissance à 240 W pour une sonorisation plus large, avec la même grille interchangeable gris et blanc que le reste de la gamme.",
    specs: [
      { label: "Taille", value: "7,7 pouces" },
      { label: "Puissance", value: "240 W" },
      { label: "Finition", value: "Gris et blanc, sans LED" },
    ],
  },
  {
    slug: "fusion-xs-fl77-sport",
    name: "Fusion HP XS Sport 7.7\" LED",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP XS Sport",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-xs-fl77-sport-${i + 1}.png`),
    shortDescription: "Haut-parleur 7,7 pouces, 240 W, gris et blanc, avec LED",
    description:
      "Version éclairée du haut-parleur XS Sport 7,7 pouces, associant 240 W de puissance à un éclairage LED intégré pour le confort visuel à bord de nuit.",
    specs: [
      { label: "Taille", value: "7,7 pouces" },
      { label: "Puissance", value: "240 W" },
      { label: "Finition", value: "Gris et blanc, avec LED" },
    ],
  },
  {
    slug: "fusion-xs-sl10-sport",
    name: "Fusion Subwoofer XS Sport 10\"",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP XS Sport",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-xs-sl10-sport-${i + 1}.png`),
    shortDescription: "Subwoofer 10 pouces, 600 W",
    description:
      "Le subwoofer XS Sport 10 pouces complète la gamme avec 600 W de puissance, pour renforcer les basses de l'installation audio marine sans sacrifier la résistance aux conditions embarquées.",
    specs: [
      { label: "Taille", value: "10 pouces" },
      { label: "Puissance", value: "600 W" },
    ],
  },

  // --- Fusion — Gamme Tower XS Sport ----------------------------------------
  {
    slug: "fusion-xs-flt652-white",
    name: "Fusion Tower XS Sport 6.5\" Blanc",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Tower XS Sport",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-xs-flt652-white-${i + 1}.png`),
    shortDescription: "Haut-parleur wake tower 6,5 pouces, 200 W, blanc, LED RVB",
    description:
      "Le haut-parleur Tower XS Sport 6,5 pouces en finition blanche, 200 W avec éclairage LED RVB intégré, pour équiper une wake tower à un tarif plus accessible que la gamme Signature.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Puissance", value: "200 W" },
      { label: "Montage", value: "Wake tower" },
      { label: "Finition", value: "Blanc, LED RVB" },
    ],
  },
  {
    slug: "fusion-xs-flt652-black",
    name: "Fusion Tower XS Sport 6.5\" Noir",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Tower XS Sport",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-xs-flt652-black-${i + 1}.png`),
    shortDescription: "Haut-parleur wake tower 6,5 pouces, 200 W, noir, LED RVB",
    description:
      "Version noire du haut-parleur Tower XS Sport 6,5 pouces, 200 W avec éclairage LED RVB intégré, pour une finition discrète sur la wake tower.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Puissance", value: "200 W" },
      { label: "Montage", value: "Wake tower" },
      { label: "Finition", value: "Noir, LED RVB" },
    ],
  },

  // --- Fusion — Gamme HP Wake Tower Signature ------------------------------
  {
    slug: "fusion-signature-flt653-white",
    name: "Fusion HP Wake Tower Signature 3i 6.5\" Blanc",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Wake Tower Signature",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-signature-flt653-white-${i + 1}.png`),
    shortDescription: "Haut-parleur wake tower 6,5 pouces, blanc, avec LEDs",
    description:
      "Conçu pour un montage sur wake tower, ce haut-parleur Signature Série 3i 6,5 pouces en finition blanche intègre un éclairage LED, pour une sonorisation dirigée vers l'eau lors des activités de wakeboard et de ski nautique.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Montage", value: "Wake tower" },
      { label: "Finition", value: "Blanc, avec LEDs" },
    ],
  },
  {
    slug: "fusion-signature-flt653-black",
    name: "Fusion HP Wake Tower Signature 3i 6.5\" Noir",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Wake Tower Signature",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-signature-flt653-black-${i + 1}.png`),
    shortDescription: "Haut-parleur wake tower 6,5 pouces, noir, avec LEDs",
    description:
      "Version noire du haut-parleur Signature Série 3i 6,5 pouces pour montage sur wake tower, avec éclairage LED intégré et une finition discrète adaptée aux structures sombres.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Montage", value: "Wake tower" },
      { label: "Finition", value: "Noir, avec LEDs" },
    ],
  },

  // --- Fusion — Gamme HP Apollo ---------------------------------------------
  {
    slug: "fusion-apollo-fl65-white",
    name: "Fusion HP Apollo 6.5\" Blanc",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-fl65-white-${i + 1}.png`),
    shortDescription: "Haut-parleur Apollo 6,5 pouces, 300 W, blanc, avec LEDs",
    description:
      "Le haut-parleur Apollo 6,5 pouces délivre 300 W avec un éclairage LED intégré, en finition blanche. Le haut de gamme Fusion pour une sonorisation puissante et une ambiance lumineuse personnalisable.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Puissance", value: "300 W" },
      { label: "Finition", value: "Blanc, avec LEDs" },
    ],
  },
  {
    slug: "fusion-apollo-fl65-grey",
    name: "Fusion HP Apollo 6.5\" Gris",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-fl65-grey-${i + 1}.png`),
    shortDescription: "Haut-parleur Apollo 6,5 pouces, 300 W, gris, avec LEDs",
    description:
      "Version grise du haut-parleur Apollo 6,5 pouces, 300 W avec éclairage LED intégré, pour s'harmoniser avec les finitions plus sombres du pont.",
    specs: [
      { label: "Taille", value: "6,5 pouces" },
      { label: "Puissance", value: "300 W" },
      { label: "Finition", value: "Gris, avec LEDs" },
    ],
  },
  {
    slug: "fusion-apollo-fl77-white",
    name: "Fusion HP Apollo 7.7\" Blanc",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-fl77-white-${i + 1}.png`),
    shortDescription: "Haut-parleur Apollo 7,7 pouces, 400 W, blanc, avec LEDs",
    description:
      "Le haut-parleur Apollo 7,7 pouces monte à 400 W pour une sonorisation plus ample, avec éclairage LED intégré et finition blanche assortie au reste de la gamme Apollo.",
    specs: [
      { label: "Taille", value: "7,7 pouces" },
      { label: "Puissance", value: "400 W" },
      { label: "Finition", value: "Blanc, avec LEDs" },
    ],
  },
  {
    slug: "fusion-apollo-fl77-grey",
    name: "Fusion HP Apollo 7.7\" Gris",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-fl77-grey-${i + 1}.png`),
    shortDescription: "Haut-parleur Apollo 7,7 pouces, 400 W, gris, avec LEDs",
    description:
      "Version grise du haut-parleur Apollo 7,7 pouces, 400 W avec éclairage LED intégré, pour s'harmoniser avec les finitions plus sombres du pont.",
    specs: [
      { label: "Taille", value: "7,7 pouces" },
      { label: "Puissance", value: "400 W" },
      { label: "Finition", value: "Gris, avec LEDs" },
    ],
  },
  {
    slug: "fusion-apollo-fl88-white",
    name: "Fusion HP Apollo 8.8\" Blanc",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-fl88-white-${i + 1}.png`),
    shortDescription: "Haut-parleur Apollo 8,8 pouces, 520 W, blanc, avec LEDs",
    description:
      "Le haut-parleur Apollo 8,8 pouces est le plus puissant de la gamme, avec 520 W et un éclairage LED intégré, pour une sonorisation généreuse en finition blanche.",
    specs: [
      { label: "Taille", value: "8,8 pouces" },
      { label: "Puissance", value: "520 W" },
      { label: "Finition", value: "Blanc, avec LEDs" },
    ],
  },
  {
    slug: "fusion-apollo-fl88-grey",
    name: "Fusion HP Apollo 8.8\" Gris",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-fl88-grey-${i + 1}.png`),
    shortDescription: "Haut-parleur Apollo 8,8 pouces, 520 W, gris, avec LEDs",
    description:
      "Version grise du haut-parleur Apollo 8,8 pouces, 520 W avec éclairage LED intégré, pour s'harmoniser avec les finitions plus sombres du pont.",
    specs: [
      { label: "Taille", value: "8,8 pouces" },
      { label: "Puissance", value: "520 W" },
      { label: "Finition", value: "Gris, avec LEDs" },
    ],
  },
  {
    slug: "fusion-apollo-sl10-white",
    name: "Fusion Subwoofer Apollo 10\" Blanc",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-sl10-white-${i + 1}.png`),
    shortDescription: "Subwoofer Apollo 10 pouces, 600 W, blanc, avec LEDs",
    description:
      "Le subwoofer Apollo 10 pouces en finition blanche complète la gamme haut de gamme Fusion avec 600 W de puissance et un éclairage LED intégré.",
    specs: [
      { label: "Taille", value: "10 pouces" },
      { label: "Puissance", value: "600 W" },
      { label: "Finition", value: "Blanc, avec LEDs" },
    ],
  },
  {
    slug: "fusion-apollo-sl10-grey",
    name: "Fusion Subwoofer Apollo 10\" Gris",
    brand: "fusion",
    category: "audio-marine",
    productLine: "HP Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-sl10-grey-${i + 1}.png`),
    shortDescription: "Subwoofer Apollo 10 pouces, 600 W, gris, avec LEDs",
    description:
      "Version grise du subwoofer Apollo 10 pouces, 600 W avec éclairage LED intégré, pour compléter une installation Apollo en finition gris.",
    specs: [
      { label: "Taille", value: "10 pouces" },
      { label: "Puissance", value: "600 W" },
      { label: "Finition", value: "Gris, avec LEDs" },
    ],
  },

  // --- Fusion — Gamme Amplificateurs Signature -----------------------------
  {
    slug: "fusion-signature-da4-1400",
    name: "Fusion Amplificateur Signature DA4 1400W",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Amplificateurs Signature",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-signature-da4-1400-${i + 1}.png`),
    shortDescription: "Amplificateur marinisé 4 voies, Classe D, 1400 W, pour 4 HP",
    description:
      "L'amplificateur Signature 4 voies délivre 1400 W en Classe D pour alimenter jusqu'à 4 haut-parleurs, avec un boîtier marinisé résistant aux conditions embarquées.",
    specs: [
      { label: "Voies", value: "4 voies" },
      { label: "Puissance", value: "1400 W, Classe D" },
      { label: "Compatibilité", value: "Jusqu'à 4 haut-parleurs" },
    ],
  },
  {
    slug: "fusion-signature-da5-1600",
    name: "Fusion Amplificateur Signature DA5 1600W",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Amplificateurs Signature",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-signature-da5-1600-${i + 1}.png`),
    shortDescription: "Amplificateur marinisé 5 voies, Classe D, 1600 W",
    description:
      "L'amplificateur Signature 5 voies offre 1600 W en Classe D, une voie supplémentaire dédiée au caisson de basses pour une installation audio complète.",
    specs: [
      { label: "Voies", value: "5 voies" },
      { label: "Puissance", value: "1600 W, Classe D" },
    ],
  },
  {
    slug: "fusion-signature-24v-da6-2000",
    name: "Fusion Amplificateur Signature DA6 24V 2000W",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Amplificateurs Signature",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-signature-24v-da6-2000-${i + 1}.png`),
    shortDescription: "Amplificateur marinisé 6 voies, 24 volts, Classe D, 2000 W",
    description:
      "Version 24 volts de l'amplificateur Signature 6 voies, taillée pour les installations électriques 24 V des unités professionnelles, avec 2000 W de puissance en Classe D.",
    specs: [
      { label: "Voies", value: "6 voies" },
      { label: "Alimentation", value: "24 volts" },
      { label: "Puissance", value: "2000 W, Classe D" },
    ],
  },

  // --- Fusion — Gamme Amplificateurs Apollo --------------------------------
  {
    slug: "fusion-apollo-ap6-1800",
    name: "Fusion Amplificateur Apollo AP6 1800W",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Amplificateurs Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-ap6-1800-${i + 1}.png`),
    shortDescription: "Amplificateur marin Apollo 6 canaux, Classe D, 1800 W",
    description:
      "L'amplificateur Apollo 6 canaux délivre 1800 W en Classe D pour une installation audio marine haut de gamme, avec la robustesse et la finition de la série Apollo.",
    specs: [
      { label: "Canaux", value: "6 canaux" },
      { label: "Puissance", value: "1800 W, Classe D" },
    ],
  },
  {
    slug: "fusion-apollo-ap8-2400",
    name: "Fusion Amplificateur Apollo AP8 2400W",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Amplificateurs Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-ap8-2400-${i + 1}.png`),
    shortDescription: "Amplificateur marin Apollo 8 canaux, Classe D, 2400 W",
    description:
      "Le haut de gamme des amplificateurs Apollo : 8 canaux et 2400 W en Classe D pour piloter une installation audio marine complète sur plusieurs zones.",
    specs: [
      { label: "Canaux", value: "8 canaux" },
      { label: "Puissance", value: "2400 W, Classe D" },
    ],
  },
  {
    slug: "fusion-apollo-ap1-2000",
    name: "Fusion Amplificateur Apollo AP1 Monobloc 2000W",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Amplificateurs Apollo",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-apollo-ap1-2000-${i + 1}.png`),
    shortDescription: "Amplificateur marin Apollo monobloc, Classe D, 2000 W",
    description:
      "Amplificateur monobloc Apollo dédié, délivrant 2000 W en Classe D — idéal pour alimenter un caisson de basses dans une installation audio marine Apollo.",
    specs: [
      { label: "Format", value: "Monobloc" },
      { label: "Puissance", value: "2000 W, Classe D" },
    ],
  },

  // --- Fusion — Accessoires -------------------------------------------------
  {
    slug: "fusion-led-rgb-controller",
    name: "Fusion Commande LED RGB",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Accessoires",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-led-rgb-controller-${i + 1}.png`),
    shortDescription: "Boîtier de commande pour éclairage LED RGB Fusion",
    description:
      "Ce boîtier de commande pilote l'éclairage LED RGB des haut-parleurs et subwoofers Fusion compatibles, pour synchroniser les couleurs et les effets lumineux à bord.",
    specs: [
      { label: "Compatibilité", value: "Haut-parleurs et subwoofers LED RGB Fusion" },
    ],
  },
  {
    slug: "fusion-led-crgbw-controller",
    name: "Fusion Commande LED CRGBW",
    brand: "fusion",
    category: "audio-marine",
    productLine: "Accessoires",
    images: Array.from({ length: 2 }, (_, i) => `/products/fusion-led-crgbw-controller-${i + 1}.png`),
    shortDescription: "Boîtier de commande pour éclairage LED CRGBW Fusion",
    description:
      "Variante CRGBW du boîtier de commande Fusion, avec un canal blanc dédié en complément du RGB pour un éclairage LED plus nuancé sur les haut-parleurs et subwoofers compatibles.",
    specs: [
      { label: "Compatibilité", value: "Haut-parleurs et subwoofers LED CRGBW Fusion" },
    ],
  },

  // --- Minn Kota — Gamme Riptide Terrova GPS ------------------------------
  {
    slug: "minn-kota-riptide-terrova-gps-55-137",
    name: "Minn Kota Riptide Terrova GPS 55 Lbs 137 cm",
    brand: "minn-kota",
    category: "moteurs-electriques",
    productLine: "Riptide Terrova GPS 55 Lbs",
    images: ["/products/minn-kota-riptide-terrova-gps.png"],
    shortDescription: "Moteur de traîne eau salée 55 Lbs, arbre 137 cm, GPS i-Pilot et Spot-Lock",
    description:
      "Le Riptide Terrova GPS 55 Lbs intègre le système de navigation GPS i-Pilot avec ancre virtuelle Spot-Lock, mémorisation et rappel d'itinéraires, et pilotage automatique AutoPilot. Conçu pour l'eau salée, il se pilote à distance via télécommande sans fil et s'intègre au réseau One-Boat Network des sondeurs Humminbird.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Poussée", value: "55 Lbs" },
      { label: "Longueur d'arbre", value: "137 cm" },
      { label: "Alimentation", value: "12V" },
      { label: "Technologie", value: "GPS i-Pilot, Spot-Lock, AutoPilot, Drift Mode" },
      { label: "Commande", value: "Télécommande sans fil" },
    ],
  },
  {
    slug: "minn-kota-riptide-terrova-gps-55-152",
    name: "Minn Kota Riptide Terrova GPS 55 Lbs 152 cm",
    brand: "minn-kota",
    category: "moteurs-electriques",
    productLine: "Riptide Terrova GPS 55 Lbs",
    images: ["/products/minn-kota-riptide-terrova-gps.png"],
    shortDescription: "Moteur de traîne eau salée 55 Lbs, arbre 152 cm, GPS i-Pilot et Spot-Lock",
    description:
      "Le Riptide Terrova GPS 55 Lbs intègre le système de navigation GPS i-Pilot avec ancre virtuelle Spot-Lock, mémorisation et rappel d'itinéraires, et pilotage automatique AutoPilot. Conçu pour l'eau salée, il se pilote à distance via télécommande sans fil et s'intègre au réseau One-Boat Network des sondeurs Humminbird.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Poussée", value: "55 Lbs" },
      { label: "Longueur d'arbre", value: "152 cm" },
      { label: "Alimentation", value: "12V" },
      { label: "Technologie", value: "GPS i-Pilot, Spot-Lock, AutoPilot, Drift Mode" },
      { label: "Commande", value: "Télécommande sans fil" },
    ],
  },
  {
    slug: "minn-kota-riptide-terrova-gps-80-137",
    name: "Minn Kota Riptide Terrova GPS 80 Lbs 137 cm",
    brand: "minn-kota",
    category: "moteurs-electriques",
    productLine: "Riptide Terrova GPS 80 Lbs",
    images: ["/products/minn-kota-riptide-terrova-gps.png"],
    shortDescription: "Moteur de traîne eau salée 80 Lbs, arbre 137 cm, GPS i-Pilot et Spot-Lock",
    description:
      "Le Riptide Terrova GPS 80 Lbs intègre le système de navigation GPS i-Pilot avec ancre virtuelle Spot-Lock, mémorisation et rappel d'itinéraires, et pilotage automatique AutoPilot. Conçu pour l'eau salée, il se pilote à distance via télécommande sans fil et s'intègre au réseau One-Boat Network des sondeurs Humminbird.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Poussée", value: "80 Lbs" },
      { label: "Longueur d'arbre", value: "137 cm" },
      { label: "Alimentation", value: "24V" },
      { label: "Technologie", value: "GPS i-Pilot, Spot-Lock, AutoPilot, Drift Mode" },
      { label: "Commande", value: "Télécommande sans fil, direction assistée électrique" },
    ],
  },
  {
    slug: "minn-kota-riptide-terrova-gps-80-152",
    name: "Minn Kota Riptide Terrova GPS 80 Lbs 152 cm",
    brand: "minn-kota",
    category: "moteurs-electriques",
    productLine: "Riptide Terrova GPS 80 Lbs",
    images: ["/products/minn-kota-riptide-terrova-gps.png"],
    shortDescription: "Moteur de traîne eau salée 80 Lbs, arbre 152 cm, GPS i-Pilot et Spot-Lock",
    description:
      "Le Riptide Terrova GPS 80 Lbs intègre le système de navigation GPS i-Pilot avec ancre virtuelle Spot-Lock, mémorisation et rappel d'itinéraires, et pilotage automatique AutoPilot. Conçu pour l'eau salée, il se pilote à distance via télécommande sans fil et s'intègre au réseau One-Boat Network des sondeurs Humminbird.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Poussée", value: "80 Lbs" },
      { label: "Longueur d'arbre", value: "152 cm" },
      { label: "Alimentation", value: "24V" },
      { label: "Technologie", value: "GPS i-Pilot, Spot-Lock, AutoPilot, Drift Mode" },
      { label: "Commande", value: "Télécommande sans fil, direction assistée électrique" },
    ],
  },
  {
    slug: "minn-kota-riptide-terrova-gps-80-182",
    name: "Minn Kota Riptide Terrova GPS 80 Lbs 182 cm",
    brand: "minn-kota",
    category: "moteurs-electriques",
    productLine: "Riptide Terrova GPS 80 Lbs",
    images: ["/products/minn-kota-riptide-terrova-gps.png"],
    shortDescription: "Moteur de traîne eau salée 80 Lbs, arbre 182 cm, GPS i-Pilot et Spot-Lock",
    description:
      "Le Riptide Terrova GPS 80 Lbs intègre le système de navigation GPS i-Pilot avec ancre virtuelle Spot-Lock, mémorisation et rappel d'itinéraires, et pilotage automatique AutoPilot. Conçu pour l'eau salée, il se pilote à distance via télécommande sans fil et s'intègre au réseau One-Boat Network des sondeurs Humminbird.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Poussée", value: "80 Lbs" },
      { label: "Longueur d'arbre", value: "182 cm" },
      { label: "Alimentation", value: "24V" },
      { label: "Technologie", value: "GPS i-Pilot, Spot-Lock, AutoPilot, Drift Mode" },
      { label: "Commande", value: "Télécommande sans fil, direction assistée électrique" },
    ],
  },
  {
    slug: "minn-kota-riptide-terrova-gps-112-182",
    name: "Minn Kota Riptide Terrova GPS 112 Lbs 182 cm",
    brand: "minn-kota",
    category: "moteurs-electriques",
    productLine: "Riptide Terrova GPS 112 Lbs",
    images: ["/products/minn-kota-riptide-terrova-gps.png"],
    shortDescription: "Moteur de traîne eau salée 112 Lbs, arbre 182 cm, GPS i-Pilot et Spot-Lock",
    description:
      "Le Riptide Terrova GPS 112 Lbs intègre le système de navigation GPS i-Pilot avec ancre virtuelle Spot-Lock, mémorisation et rappel d'itinéraires, et pilotage automatique AutoPilot. Conçu pour l'eau salée, il se pilote à distance via télécommande sans fil et s'intègre au réseau One-Boat Network des sondeurs Humminbird.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Poussée", value: "112 Lbs" },
      { label: "Longueur d'arbre", value: "182 cm" },
      { label: "Alimentation", value: "36V" },
      { label: "Technologie", value: "GPS i-Pilot, Spot-Lock, AutoPilot, Drift Mode" },
      { label: "Commande", value: "Télécommande sans fil, direction assistée électrique" },
    ],
  },
  {
    slug: "minn-kota-riptide-terrova-gps-112-220",
    name: "Minn Kota Riptide Terrova GPS 112 Lbs 220 cm",
    brand: "minn-kota",
    category: "moteurs-electriques",
    productLine: "Riptide Terrova GPS 112 Lbs",
    images: ["/products/minn-kota-riptide-terrova-gps.png"],
    shortDescription: "Moteur de traîne eau salée 112 Lbs, arbre 220 cm, GPS i-Pilot et Spot-Lock",
    description:
      "Le Riptide Terrova GPS 112 Lbs intègre le système de navigation GPS i-Pilot avec ancre virtuelle Spot-Lock, mémorisation et rappel d'itinéraires, et pilotage automatique AutoPilot. Conçu pour l'eau salée, il se pilote à distance via télécommande sans fil et s'intègre au réseau One-Boat Network des sondeurs Humminbird.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Poussée", value: "112 Lbs" },
      { label: "Longueur d'arbre", value: "220 cm" },
      { label: "Alimentation", value: "36V" },
      { label: "Technologie", value: "GPS i-Pilot, Spot-Lock, AutoPilot, Drift Mode" },
      { label: "Commande", value: "Télécommande sans fil, direction assistée électrique" },
    ],
  },

  // --- International — Gamme Boatguard 100 ----------------------------
  {
    slug: "international-boatguard-100-noir-075l",
    name: "International Boatguard 100 Noir 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Boatguard 100",
    images: ["/products/international-boatguard-100.png"],
    shortDescription: "Antifouling économique érodable, noir, bidon 0,75L",
    description:
      "Boatguard 100 est un antifouling économique érodable/semi-érodable, formulé pour protéger la coque contre tous les types de salissures en zones de salissures moyennes pendant toute une saison.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Application", value: "Brosse, rouleau ou pistolet airless" },
    ],
  },
  {
    slug: "international-boatguard-100-noir-25l",
    name: "International Boatguard 100 Noir 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Boatguard 100",
    images: ["/products/international-boatguard-100.png"],
    shortDescription: "Antifouling économique érodable, noir, bidon 2,5L",
    description:
      "Boatguard 100 est un antifouling économique érodable/semi-érodable, formulé pour protéger la coque contre tous les types de salissures en zones de salissures moyennes pendant toute une saison.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Application", value: "Brosse, rouleau ou pistolet airless" },
    ],
  },
  {
    slug: "international-boatguard-100-navy-075l",
    name: "International Boatguard 100 Navy 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Boatguard 100",
    images: ["/products/international-boatguard-100.png"],
    shortDescription: "Antifouling économique érodable, navy, bidon 0,75L",
    description:
      "Boatguard 100 est un antifouling économique érodable/semi-érodable, formulé pour protéger la coque contre tous les types de salissures en zones de salissures moyennes pendant toute une saison.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Application", value: "Brosse, rouleau ou pistolet airless" },
    ],
  },
  {
    slug: "international-boatguard-100-navy-25l",
    name: "International Boatguard 100 Navy 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Boatguard 100",
    images: ["/products/international-boatguard-100.png"],
    shortDescription: "Antifouling économique érodable, navy, bidon 2,5L",
    description:
      "Boatguard 100 est un antifouling économique érodable/semi-érodable, formulé pour protéger la coque contre tous les types de salissures en zones de salissures moyennes pendant toute une saison.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Application", value: "Brosse, rouleau ou pistolet airless" },
    ],
  },

  // --- International — Gamme Cruiser 200 --------------------------------
  {
    slug: "international-cruiser-200-noir-075l",
    name: "International Cruiser 200 Noir 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Cruiser 200",
    images: ["/products/international-cruiser-200.png"],
    shortDescription: "Antifouling érodable polyvalent, compatible aluminium, noir, bidon 0,75L",
    description:
      "Cruiser 200 est un antifouling érodable polyvalent offrant une bonne protection sur tous supports, y compris l'aluminium, avec une application facile permettant des réparations rapides.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Compatibilité", value: "Coques aluminium" },
    ],
  },
  {
    slug: "international-cruiser-200-noir-25l",
    name: "International Cruiser 200 Noir 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Cruiser 200",
    images: ["/products/international-cruiser-200.png"],
    shortDescription: "Antifouling érodable polyvalent, compatible aluminium, noir, bidon 2,5L",
    description:
      "Cruiser 200 est un antifouling érodable polyvalent offrant une bonne protection sur tous supports, y compris l'aluminium, avec une application facile permettant des réparations rapides.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Compatibilité", value: "Coques aluminium" },
    ],
  },
  {
    slug: "international-cruiser-200-navy-075l",
    name: "International Cruiser 200 Navy 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Cruiser 200",
    images: ["/products/international-cruiser-200.png"],
    shortDescription: "Antifouling érodable polyvalent, compatible aluminium, navy, bidon 0,75L",
    description:
      "Cruiser 200 est un antifouling érodable polyvalent offrant une bonne protection sur tous supports, y compris l'aluminium, avec une application facile permettant des réparations rapides.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Compatibilité", value: "Coques aluminium" },
    ],
  },
  {
    slug: "international-cruiser-200-navy-25l",
    name: "International Cruiser 200 Navy 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Cruiser 200",
    images: ["/products/international-cruiser-200.png"],
    shortDescription: "Antifouling érodable polyvalent, compatible aluminium, navy, bidon 2,5L",
    description:
      "Cruiser 200 est un antifouling érodable polyvalent offrant une bonne protection sur tous supports, y compris l'aluminium, avec une application facile permettant des réparations rapides.",
    specs: [
      { label: "Type", value: "Érodable, semi-érodable" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Compatibilité", value: "Coques aluminium" },
    ],
  },

  // --- International — Gamme Ultra 300 -----------------------------------
  {
    slug: "international-ultra-300-noir-075l",
    name: "International Ultra 300 Noir 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Ultra 300",
    images: ["/products/international-ultra-300.png"],
    shortDescription: "Antifouling matrice dure haute performance, noir, bidon 0,75L, usage professionnel",
    description:
      "Ultra 300 est l'antifouling à matrice dure le plus performant d'International, offrant une protection d'un an idéale pour les bateaux à moteur ou rapides, même dans les pires conditions de salissures. Produit réservé à l'application par un professionnel.",
    specs: [
      { label: "Type", value: "Matrice dure" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Usage", value: "Application par professionnel uniquement" },
    ],
  },
  {
    slug: "international-ultra-300-noir-25l",
    name: "International Ultra 300 Noir 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Ultra 300",
    images: ["/products/international-ultra-300.png"],
    shortDescription: "Antifouling matrice dure haute performance, noir, bidon 2,5L, usage professionnel",
    description:
      "Ultra 300 est l'antifouling à matrice dure le plus performant d'International, offrant une protection d'un an idéale pour les bateaux à moteur ou rapides, même dans les pires conditions de salissures. Produit réservé à l'application par un professionnel.",
    specs: [
      { label: "Type", value: "Matrice dure" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Usage", value: "Application par professionnel uniquement" },
    ],
  },
  {
    slug: "international-ultra-300-navy-075l",
    name: "International Ultra 300 Navy 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Ultra 300",
    images: ["/products/international-ultra-300.png"],
    shortDescription: "Antifouling matrice dure haute performance, navy, bidon 0,75L, usage professionnel",
    description:
      "Ultra 300 est l'antifouling à matrice dure le plus performant d'International, offrant une protection d'un an idéale pour les bateaux à moteur ou rapides, même dans les pires conditions de salissures. Produit réservé à l'application par un professionnel.",
    specs: [
      { label: "Type", value: "Matrice dure" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Usage", value: "Application par professionnel uniquement" },
    ],
  },
  {
    slug: "international-ultra-300-navy-25l",
    name: "International Ultra 300 Navy 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Ultra 300",
    images: ["/products/international-ultra-300.png"],
    shortDescription: "Antifouling matrice dure haute performance, navy, bidon 2,5L, usage professionnel",
    description:
      "Ultra 300 est l'antifouling à matrice dure le plus performant d'International, offrant une protection d'un an idéale pour les bateaux à moteur ou rapides, même dans les pires conditions de salissures. Produit réservé à l'application par un professionnel.",
    specs: [
      { label: "Type", value: "Matrice dure" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Usage", value: "Application par professionnel uniquement" },
    ],
  },

  // --- International — Gamme Micron 350 ----------------------------------
  {
    slug: "international-micron-350-noir-075l",
    name: "International Micron 350 Noir 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Micron 350",
    images: ["/products/international-micron-350.png"],
    shortDescription: "Antifouling SPC autopolissant haut de gamme, noir, bidon 0,75L, protection 2 ans",
    description:
      "Micron 350 est un antifouling haut de gamme à copolymère autopolissant (SPC), offrant une protection continue jusqu'à 2 ans quelles que soient les conditions de salissures, avec des performances constantes même à l'arrêt.",
    specs: [
      { label: "Type", value: "Copolymère autopolissant (SPC)" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Protection", value: "Jusqu'à 2 ans" },
    ],
  },
  {
    slug: "international-micron-350-noir-25l",
    name: "International Micron 350 Noir 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Micron 350",
    images: ["/products/international-micron-350.png"],
    shortDescription: "Antifouling SPC autopolissant haut de gamme, noir, bidon 2,5L, protection 2 ans",
    description:
      "Micron 350 est un antifouling haut de gamme à copolymère autopolissant (SPC), offrant une protection continue jusqu'à 2 ans quelles que soient les conditions de salissures, avec des performances constantes même à l'arrêt.",
    specs: [
      { label: "Type", value: "Copolymère autopolissant (SPC)" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Protection", value: "Jusqu'à 2 ans" },
    ],
  },
  {
    slug: "international-micron-350-navy-075l",
    name: "International Micron 350 Navy 0,75L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Micron 350",
    images: ["/products/international-micron-350.png"],
    shortDescription: "Antifouling SPC autopolissant haut de gamme, navy, bidon 0,75L, protection 2 ans",
    description:
      "Micron 350 est un antifouling haut de gamme à copolymère autopolissant (SPC), offrant une protection continue jusqu'à 2 ans quelles que soient les conditions de salissures, avec des performances constantes même à l'arrêt.",
    specs: [
      { label: "Type", value: "Copolymère autopolissant (SPC)" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "0,75 L" },
      { label: "Protection", value: "Jusqu'à 2 ans" },
    ],
  },
  {
    slug: "international-micron-350-navy-25l",
    name: "International Micron 350 Navy 2,5L",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Micron 350",
    images: ["/products/international-micron-350.png"],
    shortDescription: "Antifouling SPC autopolissant haut de gamme, navy, bidon 2,5L, protection 2 ans",
    description:
      "Micron 350 est un antifouling haut de gamme à copolymère autopolissant (SPC), offrant une protection continue jusqu'à 2 ans quelles que soient les conditions de salissures, avec des performances constantes même à l'arrêt.",
    specs: [
      { label: "Type", value: "Copolymère autopolissant (SPC)" },
      { label: "Couleur", value: "Navy" },
      { label: "Conditionnement", value: "2,5 L" },
      { label: "Protection", value: "Jusqu'à 2 ans" },
    ],
  },

  // --- International — Antifouling hélices & embases ---------------------
  {
    slug: "international-trilux-prop-o-drev-gris",
    name: "International Trilux Prop-O-Drev Gris",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Antifouling hélices & embases",
    images: ["/products/international-trilux-prop-o-drev.png"],
    shortDescription: "Antifouling aérosol matrice dure pour hélices, Z-Drive et embases hors-bord, gris",
    description:
      "Trilux Prop-O-Drev est un antifouling à matrice dure spécialement formulé pour les hélices, Z-Drive et embases de moteur hors-bord, en aluminium, acier inoxydable ou alliage. Son format aérosol facilite l'application sur les zones difficiles d'accès.",
    specs: [
      { label: "Type", value: "Matrice dure, aérosol" },
      { label: "Couleur", value: "Gris" },
      { label: "Conditionnement", value: "500 ml" },
      { label: "Usage", value: "Hélices, Z-Drive, embases hors-bord" },
    ],
  },
  {
    slug: "international-trilux-prop-o-drev-noir",
    name: "International Trilux Prop-O-Drev Noir",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Antifouling hélices & embases",
    images: ["/products/international-trilux-prop-o-drev.png"],
    shortDescription: "Antifouling aérosol matrice dure pour hélices, Z-Drive et embases hors-bord, noir",
    description:
      "Trilux Prop-O-Drev est un antifouling à matrice dure spécialement formulé pour les hélices, Z-Drive et embases de moteur hors-bord, en aluminium, acier inoxydable ou alliage. Son format aérosol facilite l'application sur les zones difficiles d'accès.",
    specs: [
      { label: "Type", value: "Matrice dure, aérosol" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "500 ml" },
      { label: "Usage", value: "Hélices, Z-Drive, embases hors-bord" },
    ],
  },

  // --- International — Gamme Interspeed 6400 ------------------------------
  {
    slug: "international-interspeed-6400-noir",
    name: "International Interspeed 6400 Noir",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Interspeed 6400",
    images: ["/products/international-interspeed-6400.png"],
    shortDescription: "Antifouling professionnel CDP semi-dur autopolissant, noir",
    description:
      "Interspeed 6400 est un antifouling professionnel à polymère à déplétion contrôlée (CDP), semi-dur et autopolissant, conçu pour la construction neuve, l'entretien et la réparation, pour des périodes de service allant jusqu'à 36 mois.",
    specs: [
      { label: "Type", value: "CDP semi-dur, autopolissant" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "5 L, 20 L" },
      { label: "Usage", value: "Construction neuve, entretien professionnel" },
    ],
  },
  {
    slug: "international-interspeed-6400-bleu",
    name: "International Interspeed 6400 Bleu",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Interspeed 6400",
    images: ["/products/international-interspeed-6400.png"],
    shortDescription: "Antifouling professionnel CDP semi-dur autopolissant, bleu",
    description:
      "Interspeed 6400 est un antifouling professionnel à polymère à déplétion contrôlée (CDP), semi-dur et autopolissant, conçu pour la construction neuve, l'entretien et la réparation, pour des périodes de service allant jusqu'à 36 mois.",
    specs: [
      { label: "Type", value: "CDP semi-dur, autopolissant" },
      { label: "Couleur", value: "Bleu" },
      { label: "Conditionnement", value: "5 L" },
      { label: "Usage", value: "Construction neuve, entretien professionnel" },
    ],
  },

  // --- International — Primaires ------------------------------------------
  {
    slug: "international-intertuf-203-aluminium",
    name: "International Intertuf 203 Aluminium",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Primaires",
    images: ["/products/international-intertuf-203.png"],
    shortDescription: "Primaire anticorrosif vinylique monocomposant, aluminium, sans brai",
    description:
      "Intertuf 203 est un primaire anticorrosif vinylique monocomposant sans brai, utilisable au-dessus comme au-dessous de la ligne de flottaison, ou comme isolant sur d'anciens antifoulings aux sels d'étain (TBT). Applicable à basse température jusqu'à -5°C.",
    specs: [
      { label: "Type", value: "Primaire vinylique monocomposant, sans brai" },
      { label: "Couleur", value: "Aluminium" },
      { label: "Référence", value: "JVA202" },
      { label: "Application", value: "Brosse, rouleau ou pistolet, jusqu'à -5°C" },
    ],
  },
  {
    slug: "international-primocon",
    name: "International Primocon",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Primaires",
    images: ["/products/international-primocon.png"],
    shortDescription: "Primaire monocomposant anticorrosif à séchage rapide, sous la ligne de flottaison",
    description:
      "Primocon est un primaire monocomposant anticorrosif en vinyl pigmenté à l'aluminium, à utiliser sous la ligne de flottaison avant application d'un antifouling. Séchage rapide, il peut être surcouché par lui-même après de longues périodes.",
    specs: [
      { label: "Type", value: "Primaire monocomposant anticorrosif" },
      { label: "Conditionnement", value: "0,75 L, 2,5 L, 5 L" },
      { label: "Support", value: "Bois, acier, aluminium, quilles fonte et plomb" },
      { label: "Application", value: "Brosse, rouleau ou pistolet airless" },
    ],
  },
  {
    slug: "international-interprotect",
    name: "International Interprotect",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Primaires",
    images: ["/products/international-interprotect.png"],
    shortDescription: "Primaire époxy bi-composants haute performance, au-dessus et au-dessous de la ligne de flottaison",
    description:
      "Interprotect est un primaire/sous-couche bi-composants époxy-polyamide haute performance, adapté au polyester, vinylester, époxy, acier, aluminium, ferrociment et bois, au-dessus comme au-dessous de la ligne de flottaison. Il peut être surcouché par lui-même jusqu'à 6 mois.",
    specs: [
      { label: "Type", value: "Primaire époxy-polyamide bi-composants" },
      { label: "Conditionnement", value: "0,75 L, 2,5 L, 5 L" },
      { label: "Support", value: "Polyester, acier, aluminium, bois, ferrociment" },
      { label: "Application", value: "Brosse ou rouleau" },
    ],
  },
  // --- International — Finitions -------------------------------------------
  {
    slug: "international-interlac-665-blanche",
    name: "International Interlac 665 Blanche",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Finitions",
    images: ["/products/international-interlac-665-blanche.png"],
    shortDescription: "Finition émail brillant alkyde monocomposante, blanche, œuvres mortes",
    description:
      "Interlac 665 est une peinture de finition émail brillant alkyde monocomposante, simple d'emploi, pour les œuvres mortes, superstructures et intérieurs. Utilisable au neuvage, en entretien ou en réparation.",
    specs: [
      { label: "Type", value: "Émail alkyde monocomposant, brillant" },
      { label: "Couleur", value: "Blanche" },
      { label: "Conditionnement", value: "0,75 L, 2,5 L, 5 L" },
      { label: "Application", value: "Brosse, rouleau ou pistolet" },
    ],
  },
  {
    slug: "international-interlac-665-noir",
    name: "International Interlac 665 Noir",
    brand: "international",
    category: "peintures-antifouling",
    productLine: "Finitions",
    images: ["/products/international-interlac-665-noir.png"],
    shortDescription: "Finition émail brillant alkyde monocomposante, noire, œuvres mortes",
    description:
      "Interlac 665 est une peinture de finition émail brillant alkyde monocomposante, simple d'emploi, pour les œuvres mortes, superstructures et intérieurs. Utilisable au neuvage, en entretien ou en réparation.",
    specs: [
      { label: "Type", value: "Émail alkyde monocomposant, brillant" },
      { label: "Couleur", value: "Noir" },
      { label: "Conditionnement", value: "0,75 L, 2,5 L, 5 L" },
      { label: "Application", value: "Brosse, rouleau ou pistolet" },
    ],
  },
  {
    slug: "international-perfection",
    name: "International Perfection",
    brand: "international",
    category: "peintures-antifouling",
    shortDescription: "Vernis marine haute brillance pour bois extérieur",
    description:
      "Perfection est un vernis monocomposant qui offre une finition haute brillance et une excellente résistance aux UV, pour protéger et sublimer les boiseries extérieures.",
    specs: [
      { label: "Type", value: "Vernis monocomposant" },
      { label: "Finition", value: "Haute brillance" },
      { label: "Résistance", value: "UV et intempéries" },
    ],
  },

  // --- Cobra Marine --------------------------------------------------
  {
    slug: "cobra-marine-mr-hh350-flt",
    name: "Cobra MR HH350 FLT",
    brand: "cobra-marine",
    category: "vhf-communication",
    images: ["/products/cobra-mr-hh350-flt.png"],
    shortDescription: "VHF portable flottante 6W, étanche IPX7, micro anti-bruit",
    description:
      "La MR HH350 FLT est la VHF portable d'entrée de gamme de Cobra, flottante avec âme orange pour la retrouver facilement à l'eau. Elle offre 6 W de puissance sélectionnable, un micro anti-bruit, le mode Tri-Watch, le balayage mémoire et la fonction BURP pour évacuer l'eau du haut-parleur.",
    specs: [
      { label: "Type", value: "VHF portable, flottante" },
      { label: "Puissance", value: "1/3/6 W sélectionnable" },
      { label: "Étanchéité", value: "IPX7, submersible" },
      { label: "Fonctions", value: "Tri-Watch, balayage mémoire, BURP" },
    ],
  },
  {
    slug: "cobra-marine-mr-hh500-flt-bt",
    name: "Cobra MR HH500 FLT BT",
    brand: "cobra-marine",
    category: "vhf-communication",
    images: ["/products/cobra-mr-hh500-flt-bt.png"],
    shortDescription: "VHF portable flottante 6W avec Bluetooth et Rewind-Say-Again",
    description:
      "La MR HH500 FLT BT reprend toutes les qualités de la HH350 et ajoute le Bluetooth pour passer des appels téléphoniques directement depuis la VHF, ainsi que la fonction Rewind-Say-Again qui réécoute les 20 dernières secondes d'un appel manqué. Un second bac à piles est fourni de série.",
    specs: [
      { label: "Type", value: "VHF portable, flottante" },
      { label: "Puissance", value: "1/3/6 W sélectionnable" },
      { label: "Étanchéité", value: "IPX7, submersible" },
      { label: "Bluetooth", value: "Appels téléphoniques depuis la VHF" },
      { label: "Fonctions", value: "Rewind-Say-Again, Tri-Watch, balayage mémoire" },
    ],
  },
  {
    slug: "cobra-marine-mr-hh600-flt-gps-bt",
    name: "Cobra MR HH600 FLT GPS BT",
    brand: "cobra-marine",
    category: "vhf-communication",
    images: ["/products/cobra-mr-hh600-flt-gps-bt.png"],
    shortDescription: "VHF portable flottante haut de gamme avec GPS intégré, DSC et Bluetooth",
    description:
      "La MR HH600 FLT GPS BT est le haut de gamme portable de Cobra : GPS intégré qui affiche la position et l'envoie automatiquement lors d'un appel DSC, Bluetooth pour téléphoner depuis la VHF, lampe torche avec strobe d'urgence, le tout dans un boîtier flottant étanche.",
    specs: [
      { label: "Type", value: "VHF portable, flottante" },
      { label: "Puissance", value: "1/3/6 W sélectionnable" },
      { label: "GPS", value: "Récepteur intégré, position envoyée en DSC" },
      { label: "Bluetooth", value: "Appels téléphoniques depuis la VHF" },
      { label: "Fonctions", value: "Lampe torche + strobe d'urgence, Rewind-Say-Again" },
    ],
  },
  {
    slug: "cobra-am1055",
    name: "Cobra AM1055",
    brand: "cobra-marine",
    category: "vhf-communication",
    images: ["/products/cobra-am1055.png"],
    shortDescription: "Talkie-walkie PMR446 flottant et étanche, portée jusqu'à 12 km",
    description:
      "Le Cobra AM1055 est un talkie-walkie PMR446 flottant et étanche IPX7, offrant une portée annoncée jusqu'à 12 km selon les conditions. Il propose 16 canaux et 121 codes de confidentialité, la fonction mains libres VOX, un signal vibrant VibrAlert pour les appels entrants et un chargement micro-USB.",
    specs: [
      { label: "Type", value: "Talkie-walkie PMR446" },
      { label: "Portée", value: "Jusqu'à 12 km" },
      { label: "Canaux", value: "16 canaux, 121 codes de confidentialité" },
      { label: "Étanchéité", value: "IPX7, flottant" },
      { label: "Fonctions", value: "VOX mains libres, VibrAlert, chargement micro-USB" },
    ],
  },
  {
    slug: "cobra-marine-mr-f80b",
    name: "Cobra Marine MR F80B",
    brand: "cobra-marine",
    category: "vhf-communication",
    shortDescription: "VHF fixe avec DSC et haut-parleur externe",
    description:
      "La MR F80B est une VHF fixe intégrant l'appel sélectif numérique (DSC) relié au GPS du bord, avec sortie haut-parleur externe pour une meilleure écoute au poste de barre.",
    specs: [
      { label: "Type", value: "VHF fixe" },
      { label: "DSC", value: "Appel sélectif numérique, relié au GPS" },
      { label: "Sortie audio", value: "Haut-parleur externe" },
    ],
  },
  {
    slug: "cobra-marine-mr-hh125",
    name: "Cobra Marine MR HH125",
    brand: "cobra-marine",
    category: "vhf-communication",
    shortDescription: "VHF portable compacte et légère pour la plaisance",
    description:
      "La MR HH125 est une VHF portable compacte, simple d'utilisation, idéale comme radio de secours ou pour l'annexe.",
    specs: [
      { label: "Type", value: "VHF portable compacte" },
      { label: "Usage", value: "Radio de secours, annexe" },
    ],
  },

  // --- Airmar — Sondes tableau arrière compatibles Lowrance / Simrad -----
  {
    slug: "airmar-p66-dt",
    name: "Airmar P66 DT",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-p66.png"],
    shortDescription: "Sonde tableau arrière 600W, profondeur/température, connecteur bleu Simrad/Lowrance",
    description:
      "La P66 DT est une sonde tableau arrière robuste en boîtier plastique, mesurant la profondeur et la température. Livrée avec le connecteur bleu 7 broches, elle se branche directement sur les traceurs Simrad, Lowrance et B&G.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière" },
      { label: "Puissance", value: "600 W" },
      { label: "Fréquence", value: "50/200 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "Bleu 7 broches Simrad / Lowrance / B&G" },
    ],
  },
  {
    slug: "airmar-tm150m",
    name: "Airmar TM150M",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm150m.png"],
    shortDescription: "Sonde tableau arrière CHIRP medium 300W, connecteur XSonic/Navico",
    description:
      "La TM150M est une sonde tableau arrière prête pour le CHIRP, en fréquence medium, adaptée aux petites et moyennes embarcations. Disponible avec câble et connecteur XSonic 9 broches ou 7 broches Navico pour un branchement direct sur les traceurs Simrad et Lowrance.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière CHIRP" },
      { label: "Puissance", value: "300 W" },
      { label: "Fréquence", value: "CHIRP medium 95/155 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "XSonic 9 broches ou Navico 7 broches" },
    ],
  },
  {
    slug: "airmar-tm165hw",
    name: "Airmar TM165H-W",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm165hw.png"],
    shortDescription: "Sonde tableau arrière CHIRP haute fréquence large faisceau 600W, connecteur XSonic",
    description:
      "La TM165H-W combine une fréquence CHIRP élevée et un faisceau large pour une couverture étendue sous la coque. Livrée avec câble et connecteur XSonic 9 broches, compatible directement avec les traceurs Simrad et Lowrance.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière CHIRP large faisceau" },
      { label: "Puissance", value: "600 W" },
      { label: "Fréquence", value: "CHIRP haute 150/250 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "XSonic 9 broches" },
    ],
  },
  {
    slug: "airmar-tm185m",
    name: "Airmar TM185M",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm185m.png"],
    shortDescription: "Sonde tableau arrière CHIRP medium 1kW, connecteur XSonic",
    description:
      "La TM185M offre une portée en profondeur accrue grâce à sa fréquence CHIRP medium et sa puissance de 1 kW, idéale pour la pêche hauturière. Livrée avec câble et connecteur XSonic 9 broches pour un branchement direct sur les traceurs Simrad et Lowrance.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière CHIRP" },
      { label: "Puissance", value: "1 kW" },
      { label: "Fréquence", value: "CHIRP medium 85/135 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "XSonic 9 broches" },
    ],
  },
  {
    slug: "airmar-tm185hw",
    name: "Airmar TM185H-W",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm185m.png"],
    shortDescription: "Sonde tableau arrière CHIRP haute fréquence large faisceau 1kW, connecteur XSonic",
    description:
      "La TM185H-W associe une fréquence CHIRP élevée à un faisceau large pour une couverture optimale à 1 kW de puissance. Livrée avec câble et connecteur XSonic 9 broches, compatible directement avec les traceurs Simrad et Lowrance.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière CHIRP large faisceau" },
      { label: "Puissance", value: "1 kW" },
      { label: "Fréquence", value: "CHIRP haute 150/250 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "XSonic 9 broches" },
    ],
  },
  {
    slug: "airmar-tm258",
    name: "Airmar TM258",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm258.png"],
    shortDescription: "Sonde tableau arrière classique 1kW, connecteur Mix & Match Simrad/Lowrance",
    description:
      "La TM258 est une sonde tableau arrière classique de forte puissance, pour une lecture fiable de la profondeur et de la température. Disponible avec câble Mix & Match et adaptateur pour un branchement sur les traceurs Simrad et Lowrance.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière classique" },
      { label: "Puissance", value: "1 kW" },
      { label: "Fréquence", value: "50/200 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "Mix & Match, adaptateur Simrad / Lowrance" },
    ],
  },
  {
    slug: "airmar-tm260",
    name: "Airmar TM260",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm258.png"],
    shortDescription: "Sonde tableau arrière classique 1kW, connecteur bleu Simrad/Lowrance",
    description:
      "La TM260 est une sonde tableau arrière classique de forte puissance, pour une lecture fiable de la profondeur et de la température, avec un angle de montage étendu jusqu'à 28°. Livrée avec câble et connecteur bleu Simrad/Lowrance/B&G ou XSonic 9 broches.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière classique" },
      { label: "Puissance", value: "1 kW" },
      { label: "Fréquence", value: "50/200 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "Bleu Simrad / Lowrance / B&G ou XSonic 9 broches" },
    ],
  },
  {
    slug: "airmar-tm265lh",
    name: "Airmar TM265LH",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm265lh.png"],
    shortDescription: "Sonde tableau arrière CHIRP double fréquence low/high 1kW, connecteur bleu Simrad/Lowrance",
    description:
      "La TM265LH combine deux fréquences CHIRP, basse et haute, pour couvrir aussi bien la grande profondeur que le détail des structures proches. Livrée avec câble et connecteur bleu 7 broches Simrad/Lowrance ou XSonic 9 broches noir.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière CHIRP double fréquence" },
      { label: "Puissance", value: "1 kW" },
      { label: "Fréquence", value: "CHIRP basse 42/65 kHz et haute 130/210 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "Bleu 7 broches Simrad / Lowrance ou XSonic 9 broches" },
    ],
  },
  {
    slug: "airmar-tm265lm",
    name: "Airmar TM265LM",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm265lh.png"],
    shortDescription: "Sonde tableau arrière CHIRP double fréquence low/medium 1kW, connecteur XSonic Simrad/Lowrance",
    description:
      "La TM265LM combine deux fréquences CHIRP, basse et medium, pour un bon compromis entre portée en profondeur et détail à mi-profondeur. Livrée avec câble et connecteur XSonic 9 broches ou Mix & Match pour les traceurs Simrad et Lowrance.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière CHIRP double fréquence" },
      { label: "Puissance", value: "1 kW" },
      { label: "Fréquence", value: "CHIRP basse 42/65 kHz et medium 85/135 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "XSonic 9 broches ou Mix & Match" },
    ],
  },
  {
    slug: "airmar-tm275lhw",
    name: "Airmar TM275LH-W",
    brand: "airmar",
    category: "sondeurs",
    images: ["/products/airmar-tm258.png"],
    shortDescription: "Sonde tableau arrière CHIRP low/high-wide 1kW, connecteur XSonic Simrad/Lowrance",
    description:
      "La TM275LH-W associe une fréquence basse et un faisceau large en haute fréquence pour offrir la couverture la plus étendue de la gamme 1 kW. Livrée avec câble et connecteur XSonic 9 broches pour un branchement direct sur les traceurs Simrad et Lowrance.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière CHIRP large faisceau" },
      { label: "Puissance", value: "1 kW" },
      { label: "Fréquence", value: "CHIRP basse et haute large faisceau" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "XSonic 9 broches" },
    ],
  },

  // --- Lowrance — Gamme Sonde (sondes d'origine Navico) -------------------
  {
    slug: "lowrance-sonde-50-200-eagle-hook",
    name: "Lowrance Sonde HDI 50/200 fiche Eagle/Hook",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-eagle-hook.png"],
    shortDescription: "Sonde tableau arrière HDI 50/200, DownScan 455/800, connecteur Eagle/Hook",
    description:
      "Sonde HDI Skimmer 50/200 kHz avec DownScan Imaging 455/800 kHz et capteur de température intégré, livrée avec le connecteur à encliquetage propre aux traceurs Eagle et HOOK²/Hook Reveal.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière HDI" },
      { label: "Fréquence", value: "50/200 kHz + DownScan 455/800 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "8 broches à encliquetage, Eagle / Hook²/Hook Reveal" },
    ],
  },
  {
    slug: "lowrance-sonde-83-200-eagle-hook",
    name: "Lowrance Sonde 83/200 fiche Eagle/Hook",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-83-200-eagle-hook.png"],
    shortDescription: "Sonde tableau arrière Skimmer 83/200 kHz, connecteur Eagle/Hook",
    description:
      "Sonde Skimmer classique 83/200 kHz, compacte et économique, avec le connecteur à encliquetage propre aux traceurs Cruise et HOOK².",
    specs: [
      { label: "Type", value: "Sonde tableau arrière Skimmer" },
      { label: "Fréquence", value: "83/200 kHz" },
      { label: "Mesures", value: "Profondeur" },
      { label: "Connecteur", value: "Encliquetage Cruise / Hook²" },
    ],
  },
  {
    slug: "lowrance-sonde-tripleshot-hd",
    name: "Lowrance Sonde TripleShot HD",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-tripleshot-hd.png"],
    shortDescription: "Sonde 3-en-1 CHIRP large faisceau, SideScan et DownScan avec FishReveal, exclusive Eagle",
    description:
      "La TripleShot HD combine CHIRP grand angle, SideScan et DownScan Imaging dans une seule sonde, avec la fonction FishReveal pour distinguer les poissons de la structure. Exclusive aux traceurs Lowrance Eagle.",
    specs: [
      { label: "Type", value: "Sonde 3-en-1 CHIRP / SideScan / DownScan" },
      { label: "Fonctions", value: "FishReveal" },
      { label: "Compatibilité", value: "Traceurs Lowrance Eagle" },
    ],
  },
  {
    slug: "lowrance-sonde-83-200-455-800-9pin",
    name: "Lowrance Sonde HDI 83/200/455/800 9 broches",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-83-200-455-800-9pin.png"],
    shortDescription: "Sonde tableau arrière HDI medium/high CHIRP + DownScan, connecteur 9 broches",
    description:
      "Sonde HDI Skimmer CHIRP medium/high (83/200 kHz) avec DownScan Imaging 455/800 kHz et capteur de température intégré, connecteur 9 broches xSonic pour les traceurs Lowrance et Simrad.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière HDI" },
      { label: "Fréquence", value: "CHIRP medium/high 83/200 kHz + DownScan 455/800 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "9 broches xSonic" },
    ],
  },
  {
    slug: "lowrance-sonde-50-200-9pin",
    name: "Lowrance Sonde 50/200 9 broches",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-9pin.png"],
    shortDescription: "Sonde tableau arrière Skimmer haute vitesse 50/200 kHz, connecteur 9 broches",
    description:
      "Sonde Skimmer 50/200 kHz haute vitesse, profondeur et température, avec connecteur 9 broches noir compatible directement avec les traceurs Lowrance, Simrad et B&G.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière Skimmer" },
      { label: "Fréquence", value: "50/200 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "9 broches noir" },
    ],
  },
  {
    slug: "lowrance-sonde-50-200-455-800-9pin",
    name: "Lowrance Sonde HDI 50/200/455/800 9 broches",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-455-800-9pin.png"],
    shortDescription: "Sonde tableau arrière HDI low/high CHIRP + DownScan, connecteur 9 broches",
    description:
      "Sonde HDI Skimmer CHIRP low/high (50/200 kHz) avec DownScan Imaging 455/800 kHz et capteur de température intégré, connecteur 9 broches xSonic pour un rendu sondeur optimal sur les traceurs Lowrance et Simrad.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière HDI" },
      { label: "Fréquence", value: "CHIRP low/high 50/200 kHz + DownScan 455/800 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "9 broches xSonic" },
    ],
  },
  {
    slug: "lowrance-sonde-50-200-7pin",
    name: "Lowrance Sonde HST-DFSBL 50/200 7 broches",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-7pin.png"],
    shortDescription: "Sonde tableau arrière Skimmer 50/200 kHz, connecteur bleu 7 broches",
    description:
      "La HST-DFSBL est une sonde tableau arrière Skimmer 50/200 kHz avec capteur de température intégré, livrée avec le connecteur bleu 7 broches historique des traceurs Lowrance et Simrad.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière Skimmer" },
      { label: "Fréquence", value: "50/200 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "Bleu 7 broches" },
    ],
  },
  {
    slug: "lowrance-sonde-active-imaging-3in1",
    name: "Lowrance Sonde Active Imaging 3-en-1",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-active-imaging-3in1.png"],
    shortDescription: "Sonde CHIRP, SideScan et DownScan avec FishReveal, pour HDS LIVE, HDS Carbon, Elite Ti2",
    description:
      "Active Imaging 3-en-1 combine CHIRP medium/high (83/200 kHz), SideScan et DownScan Imaging (455/800 kHz) avec la fonction FishReveal pour une identification fine des poissons près des structures. Compatible avec les traceurs Lowrance HDS LIVE, HDS Carbon et Elite Ti2.",
    specs: [
      { label: "Type", value: "Sonde 3-en-1 CHIRP / SideScan / DownScan" },
      { label: "Fréquence", value: "CHIRP 83/200 kHz + 455/800 kHz" },
      { label: "Fonctions", value: "FishReveal" },
      { label: "Compatibilité", value: "HDS LIVE, HDS Carbon, Elite Ti2" },
    ],
  },
  {
    slug: "lowrance-sonde-active-imaging-hd",
    name: "Lowrance Sonde Active Imaging HD",
    brand: "lowrance",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-active-imaging-hd.png"],
    shortDescription: "Sonde CHIRP, SideScan HD et DownScan HD avec FishReveal, jusqu'à 1,2 MHz",
    description:
      "Active Imaging HD pousse la clarté jusqu'à 1,2 MHz avec un CHIRP medium/high, un SideScan HD et un DownScan HD accompagnés de la fonction FishReveal, pour la meilleure définition d'image de la gamme Lowrance/Simrad.",
    specs: [
      { label: "Type", value: "Sonde 3-en-1 CHIRP / SideScan HD / DownScan HD" },
      { label: "Fréquence", value: "Jusqu'à 1,2 MHz" },
      { label: "Fonctions", value: "FishReveal" },
      { label: "Montage", value: "Tableau arrière" },
    ],
  },

  // --- Simrad — Gamme Sonde (sondes d'origine Navico) ---------------------
  {
    slug: "simrad-sonde-50-200-eagle-hook",
    name: "Simrad Sonde HDI 50/200 fiche Eagle/Hook",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-eagle-hook.png"],
    shortDescription: "Sonde tableau arrière HDI 50/200, DownScan 455/800, connecteur Eagle/Hook",
    description:
      "Sonde HDI Skimmer 50/200 kHz avec DownScan Imaging 455/800 kHz et capteur de température intégré, livrée avec le connecteur à encliquetage propre aux traceurs Eagle et HOOK²/Hook Reveal.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière HDI" },
      { label: "Fréquence", value: "50/200 kHz + DownScan 455/800 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "8 broches à encliquetage, Eagle / Hook²/Hook Reveal" },
    ],
  },
  {
    slug: "simrad-sonde-83-200-eagle-hook",
    name: "Simrad Sonde 83/200 fiche Eagle/Hook",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-83-200-eagle-hook.png"],
    shortDescription: "Sonde tableau arrière Skimmer 83/200 kHz, connecteur Eagle/Hook",
    description:
      "Sonde Skimmer classique 83/200 kHz, compacte et économique, avec le connecteur à encliquetage propre aux traceurs Cruise et HOOK².",
    specs: [
      { label: "Type", value: "Sonde tableau arrière Skimmer" },
      { label: "Fréquence", value: "83/200 kHz" },
      { label: "Mesures", value: "Profondeur" },
      { label: "Connecteur", value: "Encliquetage Cruise / Hook²" },
    ],
  },
  {
    slug: "simrad-sonde-tripleshot-hd",
    name: "Simrad Sonde TripleShot HD",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-tripleshot-hd.png"],
    shortDescription: "Sonde 3-en-1 CHIRP large faisceau, SideScan et DownScan avec FishReveal, exclusive Eagle",
    description:
      "La TripleShot HD combine CHIRP grand angle, SideScan et DownScan Imaging dans une seule sonde, avec la fonction FishReveal pour distinguer les poissons de la structure. Exclusive aux traceurs Lowrance Eagle.",
    specs: [
      { label: "Type", value: "Sonde 3-en-1 CHIRP / SideScan / DownScan" },
      { label: "Fonctions", value: "FishReveal" },
      { label: "Compatibilité", value: "Traceurs Lowrance Eagle" },
    ],
  },
  {
    slug: "simrad-sonde-83-200-455-800-9pin",
    name: "Simrad Sonde HDI 83/200/455/800 9 broches",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-83-200-455-800-9pin.png"],
    shortDescription: "Sonde tableau arrière HDI medium/high CHIRP + DownScan, connecteur 9 broches",
    description:
      "Sonde HDI Skimmer CHIRP medium/high (83/200 kHz) avec DownScan Imaging 455/800 kHz et capteur de température intégré, connecteur 9 broches xSonic pour les traceurs Lowrance et Simrad.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière HDI" },
      { label: "Fréquence", value: "CHIRP medium/high 83/200 kHz + DownScan 455/800 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "9 broches xSonic" },
    ],
  },
  {
    slug: "simrad-sonde-50-200-9pin",
    name: "Simrad Sonde 50/200 9 broches",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-9pin.png"],
    shortDescription: "Sonde tableau arrière Skimmer haute vitesse 50/200 kHz, connecteur 9 broches",
    description:
      "Sonde Skimmer 50/200 kHz haute vitesse, profondeur et température, avec connecteur 9 broches noir compatible directement avec les traceurs Lowrance, Simrad et B&G.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière Skimmer" },
      { label: "Fréquence", value: "50/200 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "9 broches noir" },
    ],
  },
  {
    slug: "simrad-sonde-50-200-455-800-9pin",
    name: "Simrad Sonde HDI 50/200/455/800 9 broches",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-455-800-9pin.png"],
    shortDescription: "Sonde tableau arrière HDI low/high CHIRP + DownScan, connecteur 9 broches",
    description:
      "Sonde HDI Skimmer CHIRP low/high (50/200 kHz) avec DownScan Imaging 455/800 kHz et capteur de température intégré, connecteur 9 broches xSonic pour un rendu sondeur optimal sur les traceurs Lowrance et Simrad.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière HDI" },
      { label: "Fréquence", value: "CHIRP low/high 50/200 kHz + DownScan 455/800 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "9 broches xSonic" },
    ],
  },
  {
    slug: "simrad-sonde-50-200-7pin",
    name: "Simrad Sonde HST-DFSBL 50/200 7 broches",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-50-200-7pin.png"],
    shortDescription: "Sonde tableau arrière Skimmer 50/200 kHz, connecteur bleu 7 broches",
    description:
      "La HST-DFSBL est une sonde tableau arrière Skimmer 50/200 kHz avec capteur de température intégré, livrée avec le connecteur bleu 7 broches historique des traceurs Lowrance et Simrad.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière Skimmer" },
      { label: "Fréquence", value: "50/200 kHz" },
      { label: "Mesures", value: "Profondeur, température" },
      { label: "Connecteur", value: "Bleu 7 broches" },
    ],
  },
  {
    slug: "simrad-sonde-active-imaging-3in1",
    name: "Simrad Sonde Active Imaging 3-en-1",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-active-imaging-3in1.png"],
    shortDescription: "Sonde CHIRP, SideScan et DownScan avec FishReveal, pour HDS LIVE, HDS Carbon, Elite Ti2",
    description:
      "Active Imaging 3-en-1 combine CHIRP medium/high (83/200 kHz), SideScan et DownScan Imaging (455/800 kHz) avec la fonction FishReveal pour une identification fine des poissons près des structures. Compatible avec les traceurs Lowrance HDS LIVE, HDS Carbon et Elite Ti2.",
    specs: [
      { label: "Type", value: "Sonde 3-en-1 CHIRP / SideScan / DownScan" },
      { label: "Fréquence", value: "CHIRP 83/200 kHz + 455/800 kHz" },
      { label: "Fonctions", value: "FishReveal" },
      { label: "Compatibilité", value: "HDS LIVE, HDS Carbon, Elite Ti2" },
    ],
  },
  {
    slug: "simrad-sonde-active-imaging-hd",
    name: "Simrad Sonde Active Imaging HD",
    brand: "simrad",
    category: "sondeurs",
    productLine: "Sonde",
    images: ["/products/navico-active-imaging-hd.png"],
    shortDescription: "Sonde CHIRP, SideScan HD et DownScan HD avec FishReveal, jusqu'à 1,2 MHz",
    description:
      "Active Imaging HD pousse la clarté jusqu'à 1,2 MHz avec un CHIRP medium/high, un SideScan HD et un DownScan HD accompagnés de la fonction FishReveal, pour la meilleure définition d'image de la gamme Lowrance/Simrad.",
    specs: [
      { label: "Type", value: "Sonde 3-en-1 CHIRP / SideScan HD / DownScan HD" },
      { label: "Fréquence", value: "Jusqu'à 1,2 MHz" },
      { label: "Fonctions", value: "FishReveal" },
      { label: "Montage", value: "Tableau arrière" },
    ],
  },

  // --- Lowrance — Gamme Recon SW (moteur électrique avant, eau salée) ----
  {
    slug: "lowrance-recon-sw-54",
    name: "Lowrance Recon SW 54 pouces",
    brand: "lowrance",
    category: "moteurs-electriques",
    productLine: "Recon SW",
    images: ["/products/recon-sw.png"],
    shortDescription: "Moteur électrique avant pour mer, arbre 54 pouces, poussée 115 Lbs (36V) / 90 Lbs (24V)",
    description:
      "Le Recon SW est le moteur électrique de proue Lowrance/Simrad conçu pour la pêche en mer. Piloté par le joystick de commande à distance FreeSteer, il assure un positionnement GPS précis et un maintien de cap dans le vent et le courant. Son moteur brushless 24V/36V silencieux et son arbre en composite fibre de carbone, garanti à vie, en font une solution robuste pour la pêche côtière et hauturière.",
    specs: [
      { label: "Référence constructeur", value: "000-16179-001" },
      { label: "Longueur d'arbre", value: "54 pouces (137 cm)" },
      { label: "Poussée maximale", value: "115 Lbs à 36V / 90 Lbs à 24V" },
      { label: "Alimentation", value: "24V ou 36V" },
      { label: "Commande", value: "Joystick de commande à distance FreeSteer" },
      { label: "Montage", value: "Collier de serrage à verrouillage à came, type pivot" },
      { label: "Garantie", value: "3 ans moteur, arbre garanti à vie" },
    ],
  },
  {
    slug: "lowrance-recon-sw-60",
    name: "Lowrance Recon SW 60 pouces",
    brand: "lowrance",
    category: "moteurs-electriques",
    productLine: "Recon SW",
    images: ["/products/recon-sw.png"],
    shortDescription: "Moteur électrique avant pour mer, arbre 60 pouces, poussée 120 Lbs (36V) / 97 Lbs (24V)",
    description:
      "Le Recon SW est le moteur électrique de proue Lowrance/Simrad conçu pour la pêche en mer. Piloté par le joystick de commande à distance FreeSteer, il assure un positionnement GPS précis et un maintien de cap dans le vent et le courant. Son moteur brushless 24V/36V silencieux et son arbre en composite fibre de carbone, garanti à vie, en font une solution robuste pour la pêche côtière et hauturière.",
    specs: [
      { label: "Référence constructeur", value: "000-16180-001" },
      { label: "Longueur d'arbre", value: "60 pouces (152 cm)" },
      { label: "Poussée maximale", value: "120 Lbs à 36V / 97 Lbs à 24V" },
      { label: "Alimentation", value: "24V ou 36V" },
      { label: "Commande", value: "Joystick de commande à distance FreeSteer" },
      { label: "Montage", value: "Collier de serrage à verrouillage à came, type pivot" },
      { label: "Garantie", value: "3 ans moteur, arbre garanti à vie" },
    ],
  },
  {
    slug: "lowrance-recon-sw-72",
    name: "Lowrance Recon SW 72 pouces",
    brand: "lowrance",
    category: "moteurs-electriques",
    productLine: "Recon SW",
    images: ["/products/recon-sw.png"],
    shortDescription: "Moteur électrique avant pour mer, arbre 72 pouces, poussée 115 Lbs (36V) / 90 Lbs (24V)",
    description:
      "Le Recon SW est le moteur électrique de proue Lowrance/Simrad conçu pour la pêche en mer. Piloté par le joystick de commande à distance FreeSteer, il assure un positionnement GPS précis et un maintien de cap dans le vent et le courant. Son moteur brushless 24V/36V silencieux et son arbre en composite fibre de carbone, garanti à vie, en font une solution robuste pour les grandes unités et les plateformes hautes.",
    specs: [
      { label: "Référence constructeur", value: "000-16181-001" },
      { label: "Longueur d'arbre", value: "72 pouces (183 cm)" },
      { label: "Poussée maximale", value: "115 Lbs à 36V / 90 Lbs à 24V" },
      { label: "Alimentation", value: "24V ou 36V" },
      { label: "Commande", value: "Joystick de commande à distance FreeSteer" },
      { label: "Montage", value: "Collier de serrage à verrouillage à came, type pivot" },
      { label: "Garantie", value: "3 ans moteur, arbre garanti à vie" },
    ],
  },

  // --- Simrad — Gamme Recon SW (moteur électrique avant, eau salée) ------
  {
    slug: "simrad-recon-sw-54",
    name: "Simrad Recon SW 54 pouces",
    brand: "simrad",
    category: "moteurs-electriques",
    productLine: "Recon SW",
    images: ["/products/recon-sw.png"],
    shortDescription: "Moteur électrique avant pour mer, arbre 54 pouces, poussée 115 Lbs (36V) / 90 Lbs (24V)",
    description:
      "Le Recon SW est le moteur électrique de proue Lowrance/Simrad conçu pour la pêche en mer. Piloté par le joystick de commande à distance FreeSteer, il assure un positionnement GPS précis et un maintien de cap dans le vent et le courant. Son moteur brushless 24V/36V silencieux et son arbre en composite fibre de carbone, garanti à vie, en font une solution robuste pour la pêche côtière et hauturière.",
    specs: [
      { label: "Référence constructeur", value: "000-16179-001" },
      { label: "Longueur d'arbre", value: "54 pouces (137 cm)" },
      { label: "Poussée maximale", value: "115 Lbs à 36V / 90 Lbs à 24V" },
      { label: "Alimentation", value: "24V ou 36V" },
      { label: "Commande", value: "Joystick de commande à distance FreeSteer" },
      { label: "Montage", value: "Collier de serrage à verrouillage à came, type pivot" },
      { label: "Garantie", value: "3 ans moteur, arbre garanti à vie" },
    ],
  },
  {
    slug: "simrad-recon-sw-60",
    name: "Simrad Recon SW 60 pouces",
    brand: "simrad",
    category: "moteurs-electriques",
    productLine: "Recon SW",
    images: ["/products/recon-sw.png"],
    shortDescription: "Moteur électrique avant pour mer, arbre 60 pouces, poussée 120 Lbs (36V) / 97 Lbs (24V)",
    description:
      "Le Recon SW est le moteur électrique de proue Lowrance/Simrad conçu pour la pêche en mer. Piloté par le joystick de commande à distance FreeSteer, il assure un positionnement GPS précis et un maintien de cap dans le vent et le courant. Son moteur brushless 24V/36V silencieux et son arbre en composite fibre de carbone, garanti à vie, en font une solution robuste pour la pêche côtière et hauturière.",
    specs: [
      { label: "Référence constructeur", value: "000-16180-001" },
      { label: "Longueur d'arbre", value: "60 pouces (152 cm)" },
      { label: "Poussée maximale", value: "120 Lbs à 36V / 97 Lbs à 24V" },
      { label: "Alimentation", value: "24V ou 36V" },
      { label: "Commande", value: "Joystick de commande à distance FreeSteer" },
      { label: "Montage", value: "Collier de serrage à verrouillage à came, type pivot" },
      { label: "Garantie", value: "3 ans moteur, arbre garanti à vie" },
    ],
  },
  {
    slug: "simrad-recon-sw-72",
    name: "Simrad Recon SW 72 pouces",
    brand: "simrad",
    category: "moteurs-electriques",
    productLine: "Recon SW",
    images: ["/products/recon-sw.png"],
    shortDescription: "Moteur électrique avant pour mer, arbre 72 pouces, poussée 115 Lbs (36V) / 90 Lbs (24V)",
    description:
      "Le Recon SW est le moteur électrique de proue Lowrance/Simrad conçu pour la pêche en mer. Piloté par le joystick de commande à distance FreeSteer, il assure un positionnement GPS précis et un maintien de cap dans le vent et le courant. Son moteur brushless 24V/36V silencieux et son arbre en composite fibre de carbone, garanti à vie, en font une solution robuste pour les grandes unités et les plateformes hautes.",
    specs: [
      { label: "Référence constructeur", value: "000-16181-001" },
      { label: "Longueur d'arbre", value: "72 pouces (183 cm)" },
      { label: "Poussée maximale", value: "115 Lbs à 36V / 90 Lbs à 24V" },
      { label: "Alimentation", value: "24V ou 36V" },
      { label: "Commande", value: "Joystick de commande à distance FreeSteer" },
      { label: "Montage", value: "Collier de serrage à verrouillage à came, type pivot" },
      { label: "Garantie", value: "3 ans moteur, arbre garanti à vie" },
    ],
  },
];

async function main() {
  await prisma.proformaLine.deleteMany();
  await prisma.proformaRequest.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  for (const c of CATEGORY_DIRECTORY) {
    await prisma.category.create({ data: { slug: c.slug, name: c.name } });
  }

  for (const b of BRAND_DIRECTORY) {
    await prisma.brand.create({ data: { slug: b.slug, name: b.name } });
  }

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        shortDescription: p.shortDescription,
        description: p.description,
        specs: p.specs,
        productLine: p.productLine,
        images: p.images ?? [],
        requiresAnfAuth: ANF_CATEGORY_SLUGS.includes(p.category),
        brand: { connect: { slug: p.brand } },
        category: { connect: { slug: p.category } },
      },
    });
  }

  console.log(
    `Seed terminé : ${CATEGORY_DIRECTORY.length} catégories, ${BRAND_DIRECTORY.length} marques, ${products.length} produits.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
