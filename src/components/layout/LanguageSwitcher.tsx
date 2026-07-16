"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function switchTo(nextLocale: Locale) {
    setOpen(false);
    router.replace(
      // @ts-expect-error -- dynamic route params are fine here
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium text-text hover:border-secondary hover:text-secondary transition-colors"
      >
        <span aria-hidden="true">🌐</span>
        <span>{locale.toUpperCase()}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-40 overflow-hidden rounded-md border border-border bg-surface-alt py-1 shadow-lg"
        >
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onClick={() => switchTo(loc)}
                role="option"
                aria-selected={loc === locale}
                className={`block w-full px-3 py-2 text-start text-sm hover:bg-surface ${
                  loc === locale
                    ? "font-semibold text-secondary"
                    : "text-text"
                }`}
              >
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
