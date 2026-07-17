"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // `signIn()`/`signOut()` appelés depuis une Server Action redirigent en
  // navigation "douce" : le cache client de next-auth ne se met pas à jour
  // tout seul. Remonter le provider à chaque changement de route force une
  // relecture fraîche de la session (simple et fiable, contrairement à un
  // useEffect + update() dont les dépendances sont instables ici).
  return <SessionProvider key={pathname}>{children}</SessionProvider>;
}
