# TN Marine — EURL Technic Nautic Marine Import

Site vitrine et catalogue en ligne de TN Marine : présentation de l'entreprise, catalogue de produits par marque, demandes de proforma multi-produits, prise de rendez-vous, guide des autorisations ANF et assistant de vente par IA. Disponible en français, arabe (RTL) et anglais.

## Stack technique

- [Next.js 16](https://nextjs.org) (App Router, Server Actions)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Prisma 7](https://www.prisma.io) + Postgres (adaptateur `pg`, hébergé sur [Neon](https://neon.tech))
- [NextAuth.js v5](https://authjs.dev) (authentification par identifiants + bcrypt)
- [next-intl](https://next-intl.dev) (i18n FR/AR/EN, RTL natif)
- [Claude API](https://docs.claude.com) (Anthropic) pour le chatbot

## Prérequis

- Node.js ≥ 20
- npm

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/larbaoui1994-jpg/tn-marine.git
   cd tn-marine
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

   En cas d'erreur de peer dependency (conflit `nodemailer` / `next-auth`) :

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configurer les variables d'environnement**

   ```bash
   cp .env.example .env
   ```

   Puis renseigner `.env` :

   | Variable | Description |
   |---|---|
   | `DATABASE_URL` | Chaîne de connexion Postgres (créer un projet gratuit sur [Neon](https://neon.tech) et utiliser la chaîne de connexion "pooled") |
   | `AUTH_SECRET` | Secret NextAuth, à générer avec `openssl rand -base64 32` |
   | `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASSWORD` | Optionnel — sans SMTP configuré, les e-mails (contact, proforma) sont simplement journalisés dans la console serveur |
   | `CONTACT_TO_EMAIL` | Adresse de réception des demandes (contact, proforma) |
   | `ANTHROPIC_API_KEY` | Optionnel — sans clé, le chatbot répond avec un message invitant à contacter TN Marine directement |

4. **Initialiser la base de données**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

   Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

```bash
npm run dev     # serveur de développement
npm run build   # build de production
npm run start   # démarrer le build de production
npm run lint    # ESLint
```

## Déploiement

Le site est prévu pour être déployé sur [Vercel](https://vercel.com), avec la base de données hébergée sur [Neon](https://neon.tech) (Postgres serverless) :

1. Créer un projet Neon, copier sa chaîne de connexion "pooled".
2. Connecter le dépôt GitHub à un nouveau projet Vercel.
3. Renseigner les variables d'environnement du tableau ci-dessus dans les réglages du projet Vercel (`DATABASE_URL` pointant vers Neon).
4. Déployer — Vercel exécute `npm run build` automatiquement à chaque push sur `main`.

Les migrations Prisma (`npx prisma migrate deploy`) doivent être appliquées à la base Neon avant ou pendant le premier déploiement.

## Structure du projet

```
src/
  app/[locale]/     pages (routage par langue : /fr, /ar, /en)
  app/actions/       Server Actions (contact, proforma, auth, rendez-vous)
  app/api/           routes API (NextAuth, chatbot)
  components/        composants React par domaine
  lib/               utilitaires (Prisma, e-mail, catalogue, client Anthropic)
  messages/          traductions FR/AR/EN
prisma/
  schema.prisma      modèle de données
  migrations/        migrations SQL
  seed.ts            jeu de données de démonstration (catalogue)
```
