import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import {
  DEFAULT_LANGUAGE,
  LANG_STORAGE_KEY,
  LANG_COOKIE_NAME,
} from './constants/localizationConstants'
import { enTranslation } from './locales/en'
import { jpTranslation } from './locales/jp'
import { uaTranslation } from './locales/ua'
import { plTranslation } from './locales/pl'

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      jp: { translation: jpTranslation },
      ua: { translation: uaTranslation },
      pl: { translation: plTranslation },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    load: 'currentOnly',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupCookie: LANG_COOKIE_NAME,
      lookupLocalStorage: LANG_STORAGE_KEY,
      caches: ['localStorage', 'cookie'],
    },
    // debug: true,
  })
