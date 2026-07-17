import type { NextAuthConfig } from "next-auth";

/**
 * Config "edge-safe" : pas d'import Prisma/bcrypt ici, car elle est
 * aussi chargée par le middleware (src/proxy.ts). Le provider
 * Credentials (qui a besoin de la base de données) est ajouté dans
 * src/auth.ts, utilisé uniquement côté serveur Node.js.
 */
export default {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/connexion",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
