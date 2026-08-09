"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import AccountMenu from "@/components/auth/AccountMenu";
import CategoriesMenu from "./CategoriesMenu";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "shop", href: "/boutique" },
  { key: "brands", href: "/marques" },
  { key: "about", href: "/a-propos" },
  { key: "authGuide", href: "/guide-autorisations" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-alt/95 backdrop-blur supports-[backdrop-filter]:bg-surface-alt/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 shrink-0">
          <CategoriesMenu />
          <Link
            href="/"
            className="flex items-center shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo/tn-marine-logo.png"
              alt="TN Marine — Technic Nautic Marine Import"
              width={464}
              height={96}
              priority
              className="h-9 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-1" aria-label={t("menu")}>
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-secondary"
                    : "text-text hover:text-secondary"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <AccountMenu />
          <Link
            href="/reservation"
            className="rounded-md border border-primary px-3.5 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-surface-alt transition-colors"
          >
            {t("booking")}
          </Link>
          <Link
            href="/proforma"
            className="rounded-md bg-accent px-3.5 py-2 text-sm font-semibold text-primary-dark hover:bg-accent-dark transition-colors"
          >
            {t("proforma")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("closeMenu") : t("menu")}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-primary"
          >
            <span className="sr-only">{t("menu")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="lg:hidden border-t border-border bg-surface-alt px-4 py-3 sm:px-6"
          aria-label={t("menu")}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-text hover:bg-surface hover:text-secondary"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <AccountMenu />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/reservation"
              onClick={() => setMobileOpen(false)}
              className="rounded-md border border-primary px-3.5 py-2.5 text-center text-sm font-medium text-primary"
            >
              {t("booking")}
            </Link>
            <Link
              href="/proforma"
              onClick={() => setMobileOpen(false)}
              className="rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-primary-dark"
            >
              {t("proforma")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
