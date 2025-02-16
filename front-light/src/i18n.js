import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import translationAZ from "./locales/az.json";
import translationEN from "./locales/en.json";
import translationRU from "./locales/ru.json";

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Detect browser language
  .init({
    resources: {
      az: { translation: translationAZ },
      en: { translation: translationEN },
      ru: { translation: translationRU },
    },
    lng: localStorage.getItem("language") || "en", // Default language
    fallbackLng: "en", // Fallback if language not found
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
