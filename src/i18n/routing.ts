import { defineRouting } from "next-intl/routing";

/**
 * Langues supportées par TN Marine.
 * FR = langue par défaut (pas de préfixe d'URL), AR et EN préfixées (/ar, /en).
 */
export const routing = defineRouting({
  locales: ["fr", "ar", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}
