import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const LANGUAGES = ['en', 'jp', 'ua', 'pl'] as const
export type Language = typeof LANGUAGES[number]
export const DEFAULT_LANGUAGE: Language = 'en'

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      login: 'Login',
    },
  },
  jp: {
    translation: {
      welcome: 'ようこそ',
      login: 'ログイン',
    },
  },
  ua: {
    translation: {
      welcome: 'Ласкаво просимо',
      login: 'Вхід',
    },
  },
  pl: {
    translation: {
      welcome: 'Witamy',
      login: 'Logowanie',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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

export function isValidLanguage(lang: string): lang is Language {
  return LANGUAGES.includes(lang as Language)
}
