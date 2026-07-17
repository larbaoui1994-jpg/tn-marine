"use client";

import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AccountMenu() {
  const { data: session, status } = useSession();
  const t = useTranslations("Nav");

  if (status === "loading") {
    return <span className="h-5 w-16" aria-hidden="true" />;
  }

  if (!session) {
    return (
      <Link
        href="/connexion"
        className="text-sm font-medium text-text hover:text-secondary"
      >
        {t("login")}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Link
        href="/reservation"
        className="max-w-32 truncate font-medium text-text hover:text-secondary"
        title={session.user?.name ?? t("account")}
      >
        {session.user?.name || t("account")}
      </Link>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-text-muted hover:text-secondary"
      >
        {t("logout")}
      </button>
    </div>
  );
}
