import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { DEFAULT_LOCALE, LOCALES } from './config';

// Import all translation files
import translationEN from './translations/en.json';
import translationJP from './translations/jp.json';
import translationPL from './translations/pl.json';
import translationUA from './translations/ua.json';

// Create resources object with all translations
const resources = {
  en: {
    translation: translationEN
  },
  jp: {
    translation: translationJP
  },
  pl: {
    translation: translationPL
  },
  ua: {
    translation: translationUA
  }
};

// Create i18n config object
const i18nConfig = {
  resources,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: [...LOCALES] as Array<string>,
  
  // Allow keys to be phrases having `:`, `.`
  keySeparator: false,
  nsSeparator: false,
  
  interpolation: {
    escapeValue: false, // React already safes from XSS
  },
  
  // Options for language detection
  detection: {
    order: ['path', 'cookie', 'navigator'],
    lookupFromPathIndex: 0,
    caches: ['cookie'],
    // Use cookie options instead of cookieExpirationDate
    cookieOptions: {
      expires: 365, // days
    },
  },

  react: {
    useSuspense: false, // Important for SSR
  },
};

i18n
  // Load translations from backend for dynamic loading (optional)
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init(i18nConfig);

export default i18n;
