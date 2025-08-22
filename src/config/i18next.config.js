import i18next from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next.use(backend).use(initReactI18next).init({
    fallbackLng: 'es',
})
