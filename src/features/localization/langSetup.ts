import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { DEFAULT_LANGUAGE } from './constants/localizationConst'
import enTranslation from './locales/en.json'
import jpTranslation from './locales/jp.json'
import uaTranslation from './locales/ua.json'
import plTranslation from './locales/pl.json'

i18n
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
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0,
    },
  })

export default i18n
