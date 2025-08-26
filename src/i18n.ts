import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esTranslation from "../public/locales/es/traducion.json";
import enTranslation from "../public/locales/en/traducion.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "es", // Idioma predeterminado
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: esTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
  });

export default i18n;
