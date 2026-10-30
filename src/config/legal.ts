export type LegalLocale = "de" | "en";

export const LEGAL_DOCUMENT_URLS = {
  terms: { en: "https://vace.gg/tos", de: "https://vace.gg/de/agbs" },
  privacy: { en: "https://vace.gg/privacy", de: "https://vace.gg/de/datenschutzerklaerung" },
  licenses: { en: "https://vace.gg/licenses", de: "https://vace.gg/de/lizenzen" },
} satisfies Record<string, Record<LegalLocale, string>>;

export const legalLocale = (language: string | undefined): LegalLocale =>
  language?.startsWith("de") ? "de" : "en";

export const legalDocumentUrl = (slug: string, locale: LegalLocale): string | undefined =>
  LEGAL_DOCUMENT_URLS[slug as keyof typeof LEGAL_DOCUMENT_URLS]?.[locale];

export const formatLegalDate = (timestamp: number, language: string): string =>
  new Date(timestamp).toLocaleDateString(language, { day: "2-digit", month: "2-digit", year: "numeric" });
