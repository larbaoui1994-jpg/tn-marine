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
    slug: "simrad-halo-20-plus",
    name: "Simrad Halo20+",
    brand: "simrad",
    category: "radars",
    shortDescription: "Radar à balayage automatique, portée jusqu'à 36 milles nautiques",
    description:
      "Le Halo20+ est un radar à impulsions compact combinant les technologies pulse compression courte, moyenne et longue portée pour une détection fiable, de la navigation côtière à la haute mer.",
    specs: [
      { label: "Portée", value: "Jusqu'à 36 milles nautiques" },
      { label: "Technologie", value: "Pulse compression multi-portée" },
      { label: "Rotation", value: "24 à 60 tr/min selon le mode" },
      { label: "Zone de garde", value: "MARPA, alarme anticollision" },
    ],
  },
  {
    slug: "simrad-ap44",
    name: "Simrad AP44",
    brand: "simrad",
    category: "pilotes-automatiques",
    shortDescription:
      "Écran de contrôle pour pilote automatique, interface tactile et boutons physiques",
    description:
      "L'AP44 pilote les systèmes de pilotage automatique Simrad avec une interface tactile combinée à des commandes physiques utilisables même par mer formée. Compatible avec les réseaux NMEA 2000 et SimNet.",
    specs: [
      { label: "Écran", value: "4,1 pouces tactile + boutons physiques" },
      { label: "Réseau", value: "NMEA 2000, SimNet" },
      { label: "Étanchéité", value: "IPX7" },
      { label: "Modes", value: "Suivi de route, de cap et de vent" },
    ],
  },

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

  // --- Fusion -------------------------------------------------------------
  {
    slug: "fusion-ms-ra70n",
    name: "Fusion MS-RA70N",
    brand: "fusion",
    category: "audio-marine",
    shortDescription: "Récepteur audio marin multizone avec contrôle par application",
    description:
      "Le MS-RA70N pilote jusqu'à trois zones audio indépendantes, intègre le Bluetooth et le contrôle via l'application Fusion-Link, et se connecte aux traceurs compatibles NMEA 2000 pour un contrôle direct depuis l'écran de navigation.",
    specs: [
      { label: "Zones audio", value: "3 zones indépendantes" },
      { label: "Connectivité", value: "Bluetooth, Fusion-Link, NMEA 2000" },
      { label: "Étanchéité", value: "Façade IPX6/6K9K" },
    ],
  },
  {
    slug: "fusion-apollo-srx400",
    name: "Fusion Apollo SRX400",
    brand: "fusion",
    category: "audio-marine",
    shortDescription: "Amplificateur marin 4 canaux, 400 watts",
    description:
      "L'amplificateur Apollo SRX400 délivre une puissance de 400 watts répartie sur 4 canaux pour animer plusieurs paires de haut-parleurs marins avec un son puissant et clair, même en navigation.",
    specs: [
      { label: "Puissance", value: "400 W sur 4 canaux" },
      { label: "Étanchéité", value: "Résistant aux embruns" },
      { label: "Usage", value: "Amplification de haut-parleurs marins" },
    ],
  },
  {
    slug: "fusion-ms-el602",
    name: "Fusion MS-EL602",
    brand: "fusion",
    category: "audio-marine",
    shortDescription: "Paire de haut-parleurs marins étanches 6,5 pouces",
    description:
      "Ces haut-parleurs 6,5 pouces certifiés résistants aux UV et à l'eau salée offrent un rendu audio équilibré, avec éclairage LED intégré disponible en plusieurs finitions de grille.",
    specs: [
      { label: "Taille", value: "6,5 pouces (par paire)" },
      { label: "Résistance", value: "UV et eau salée" },
      { label: "Éclairage", value: "LED intégré" },
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
