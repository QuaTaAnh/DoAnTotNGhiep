import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en.json";
import viTranslations from "../locales/vi.json";

const currentLanguage = localStorage.getItem("i18n") || "vi";

i18n.use(initReactI18next).init({
  lng: currentLanguage,
  resources: {
    en: {
      translation: enTranslations,
    },
    vi: {
      translation: viTranslations,
    },
  },
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
