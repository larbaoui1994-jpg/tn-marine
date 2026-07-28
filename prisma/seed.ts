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

  // --- C-MAP -------------------------------------------------------------
  {
    slug: "cmap-discover-x",
    name: "C-MAP Discover X",
    brand: "cmap",
    category: "cartographie",
    shortDescription: "Cartographie marine détaillée pour la navigation côtière",
    description:
      "C-MAP Discover X propose une cartographie vectorielle détaillée incluant les données bathymétriques, les aides à la navigation et les points d'intérêt portuaires, avec mises à jour régulières.",
    specs: [
      { label: "Format", value: "Carte mémoire, mise à jour en ligne" },
      { label: "Couverture", value: "Zone côtière détaillée" },
      { label: "Données", value: "Bathymétrie, aides à la navigation, ports" },
    ],
  },
  {
    slug: "cmap-reveal-x",
    name: "C-MAP Reveal X",
    brand: "cmap",
    category: "cartographie",
    shortDescription: "Cartographie avec relief 3D et imagerie satellite haute résolution",
    description:
      "C-MAP Reveal X ajoute le relief sous-marin en 3D et l'imagerie satellite haute résolution à la cartographie vectorielle, pour une meilleure lecture des zones côtières et des fonds marins.",
    specs: [
      { label: "Relief", value: "Vue 3D des fonds marins" },
      { label: "Imagerie", value: "Satellite haute résolution" },
      { label: "Compatibilité", value: "Traceurs C-MAP compatibles" },
    ],
  },
  {
    slug: "cmap-genesis",
    name: "C-MAP Genesis",
    brand: "cmap",
    category: "cartographie",
    shortDescription:
      "Création de cartes bathymétriques personnalisées à partir des relevés du sondeur",
    description:
      "La fonction Genesis permet de générer ses propres cartes bathymétriques haute précision à partir des données collectées par le sondeur du bord, puis de les partager avec la communauté C-MAP.",
    specs: [
      { label: "Fonction", value: "Cartographie bathymétrique participative" },
      { label: "Source", value: "Données du sondeur du bord" },
      { label: "Partage", value: "Communauté C-MAP en ligne" },
    ],
  },

  // --- Navionics -------------------------------------------------------
  {
    slug: "navionics-plus-regular",
    name: "Navionics+ Regular",
    brand: "navionics",
    category: "cartographie",
    shortDescription: "Carte marine régionale avec données de pêche SonarChart",
    description:
      "Navionics+ Regular couvre une zone de navigation régionale avec cartographie détaillée, courbes bathymétriques SonarChart et informations utiles à la pêche et à la plaisance.",
    specs: [
      { label: "Couverture", value: "Régionale" },
      { label: "Bathymétrie", value: "SonarChart" },
      { label: "Mises à jour", value: "Via l'application Navionics Boating" },
    ],
  },
  {
    slug: "navionics-platinum-plus",
    name: "Navionics Platinum+",
    brand: "navionics",
    category: "cartographie",
    shortDescription:
      "Cartographie haut de gamme avec relief ombré et données bathymétriques enrichies",
    description:
      "Navionics Platinum+ ajoute le relief ombré terrestre et sous-marin ainsi que des courbes bathymétriques enrichies pour une lecture fine du relief des fonds, idéale pour la pêche et la navigation de précision.",
    specs: [
      { label: "Relief", value: "Relief ombré terre et mer" },
      { label: "Bathymétrie", value: "Courbes enrichies SonarChart+" },
      { label: "Usage", value: "Pêche et navigation de précision" },
    ],
  },
  {
    slug: "navionics-small-craft",
    name: "Navionics Small Craft Chart",
    brand: "navionics",
    category: "cartographie",
    shortDescription: "Cartographie détaillée pour petites embarcations en zone côtière",
    description:
      "Pensée pour les petites unités naviguant près des côtes, cette carte met l'accent sur le détail des zones portuaires, des chenaux et des mouillages.",
    specs: [
      { label: "Couverture", value: "Zone côtière rapprochée" },
      { label: "Détail", value: "Ports, chenaux, mouillages" },
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

  // --- Minn Kota ---------------------------------------------------------
  {
    slug: "minn-kota-riptide-terrova",
    name: "Minn Kota Riptide Terrova",
    brand: "minn-kota",
    category: "moteurs-electriques",
    shortDescription:
      "Moteur de traîne électrique avec pointeur GPS et fonction ancre virtuelle",
    description:
      "Le Riptide Terrova intègre la technologie i-Pilot avec pointeur GPS, mémorisation d'itinéraires et ancre virtuelle Spot-Lock, pour un positionnement précis en toutes conditions, y compris en eau salée.",
    specs: [
      { label: "Usage", value: "Eau salée" },
      { label: "Technologie", value: "i-Pilot, Spot-Lock (ancre virtuelle)" },
      { label: "Commande", value: "Télécommande et pédale sans fil" },
    ],
  },
  {
    slug: "minn-kota-endura-max",
    name: "Minn Kota Endura Max",
    brand: "minn-kota",
    category: "moteurs-electriques",
    shortDescription: "Moteur de traîne manuel, entrée de gamme, fiable et robuste",
    description:
      "L'Endura Max est un moteur de traîne manuel simple d'utilisation, au rapport qualité/prix reconnu, adapté aux plaisanciers et pêcheurs occasionnels.",
    specs: [
      { label: "Commande", value: "Manuelle (manche directionnel)" },
      { label: "Usage", value: "Eau douce" },
      { label: "Vitesses", value: "5 vitesses avant, 3 arrière" },
    ],
  },
  {
    slug: "minn-kota-ulterra",
    name: "Minn Kota Ulterra",
    brand: "minn-kota",
    category: "moteurs-electriques",
    shortDescription: "Moteur de traîne rétractable avec télécommande et déploiement automatique",
    description:
      "L'Ulterra se déploie et se range automatiquement d'une simple pression, et se pilote à distance via télécommande ou application. Il intègre également la technologie i-Pilot avec pointeur GPS.",
    specs: [
      { label: "Déploiement", value: "Automatique, motorisé" },
      { label: "Technologie", value: "i-Pilot avec pointeur GPS" },
      { label: "Commande", value: "Télécommande, application mobile" },
    ],
  },

  // --- International -------------------------------------------------
  {
    slug: "international-micron-350",
    name: "International Micron 350",
    brand: "international",
    category: "peintures-antifouling",
    shortDescription: "Antifouling matrice dure haute performance, usage professionnel et plaisance",
    description:
      "Micron 350 est un antifouling à matrice dure offrant une protection longue durée contre les salissures marines, adapté aux coques régulièrement carénées et aux bateaux rapides.",
    specs: [
      { label: "Type", value: "Antifouling matrice dure" },
      { label: "Usage", value: "Coques régulièrement carénées, bateaux rapides" },
      { label: "Application", value: "Rouleau, pistolet ou brosse" },
    ],
  },
  {
    slug: "international-interprotect",
    name: "International Interprotect",
    brand: "international",
    category: "peintures-antifouling",
    shortDescription: "Primaire époxy de protection de coque contre l'osmose",
    description:
      "Interprotect est un système époxy multicouche qui protège la coque contre la pénétration d'eau et le risque d'osmose, à appliquer avant toute couche d'antifouling.",
    specs: [
      { label: "Type", value: "Primaire époxy multicouche" },
      { label: "Fonction", value: "Protection contre l'osmose" },
      { label: "Support", value: "Coques polyester" },
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
    name: "Cobra Marine MR HH350 FLT",
    brand: "cobra-marine",
    category: "vhf-communication",
    shortDescription: "VHF portable flottante, étanche IPX7",
    description:
      "La MR HH350 FLT est une VHF portable flottante et étanche IPX7, équipée de canaux météo et d'une fonction d'appel de détresse, pensée pour rester à portée de main en toutes circonstances.",
    specs: [
      { label: "Type", value: "VHF portable, flottante" },
      { label: "Étanchéité", value: "IPX7" },
      { label: "Fonctions", value: "Canaux météo, appel de détresse" },
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

  // --- Airmar --------------------------------------------------------
  {
    slug: "airmar-b175c",
    name: "Airmar B175C",
    brand: "airmar",
    category: "sondeurs",
    shortDescription: "Sonde traversante CHIRP large bande, coque composite",
    description:
      "La B175C est une sonde traversante large bande CHIRP conçue pour les coques composites, offrant une image sonar haute résolution compatible avec les principaux traceurs du marché.",
    specs: [
      { label: "Type", value: "Sonde traversante, large bande CHIRP" },
      { label: "Support", value: "Coques composites" },
      { label: "Compatibilité", value: "Principaux traceurs du marché" },
    ],
  },
  {
    slug: "airmar-p79",
    name: "Airmar P79",
    brand: "airmar",
    category: "sondeurs",
    shortDescription: "Sonde tableau arrière en plastique, montage simple",
    description:
      "La P79 est une sonde économique à montage sur tableau arrière, en boîtier plastique, adaptée aux petites embarcations de plaisance et de pêche.",
    specs: [
      { label: "Type", value: "Sonde tableau arrière" },
      { label: "Boîtier", value: "Plastique" },
      { label: "Usage", value: "Petites embarcations" },
    ],
  },
  {
    slug: "airmar-dst800",
    name: "Airmar DST800",
    brand: "airmar",
    category: "sondeurs",
    shortDescription: "Capteur tri-fonction : vitesse, profondeur et température",
    description:
      "Le DST800 regroupe en une seule sonde la mesure de la vitesse surface, de la profondeur et de la température de l'eau, avec une grande précision et une installation simplifiée.",
    specs: [
      { label: "Mesures", value: "Vitesse, profondeur, température" },
      { label: "Installation", value: "Simplifiée, capteur unique" },
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
