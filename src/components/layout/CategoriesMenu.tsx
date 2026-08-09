"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { categoryIcon } from "@/lib/category-directory";

// Sous-ensemble et ordre de familles de produits demandés pour le menu
// rapide de la page d'accueil (§ demande client, style Comptoir Nautique) :
// SONDEUR TRACEUR GPS / SONDEUR / SONDE / CARTOGRAPHIE / VHF / RADAR /
// MOTEUR ÉLECTRIQUE / AUDIO MARIN / PEINTURE MARINE.
const HOME_MENU_CATEGORY_SLUGS = [
  "gps-traceurs",
  "sondeurs",
  "sondes",
  "cartographie",
  "vhf-communication",
  "radars",
  "moteurs-electriques",
  "audio-marine",
  "peintures-antifouling",
] as const;

export default function CategoriesMenu() {
  const t = useTranslations("Nav");
  const tCategories = useTranslations("Categories");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-10 w-10 items-center justify-center gap-2 rounded-md border border-border text-primary hover:border-secondary hover:text-secondary transition-colors sm:h-auto sm:w-auto sm:px-3 sm:py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="hidden text-sm font-semibold sm:inline">{t("productsMenu")}</span>
        <span className="sr-only">{t("productsMenu")}</span>
      </button>

      {open && (
        <div className="absolute start-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-surface-alt py-2 shadow-lg sm:w-72">
          <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t("productsMenuTitle")}
          </p>
          <ul>
            {HOME_MENU_CATEGORY_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/boutique?categorie=${slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-surface hover:text-secondary transition-colors"
                >
                  <span className="text-base" aria-hidden="true">
                    {categoryIcon(slug)}
                  </span>
                  {tCategories(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
