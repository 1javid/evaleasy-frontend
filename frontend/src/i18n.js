// filepath: /frontend/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import ru from './locales/ru.json';
import az from './locales/az.json';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            az: { translation: az },
        },
        lng: savedLanguage, // use saved language or default to English
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;