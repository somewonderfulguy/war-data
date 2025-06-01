import { DEFAULT_LANGUAGE } from '../constants'
import type { Language } from '../types'
import {
  getLanguageFromCookie,
  getLanguageFromStorage,
  isValidLanguage,
} from '.'

export const getPreferredLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  const storageLang = getLanguageFromStorage()
  if (storageLang) return storageLang

  const cookieLang = getLanguageFromCookie()
  if (cookieLang) return cookieLang

  const browserLangs = navigator.languages || [navigator.language]
  for (const lang of browserLangs) {
    const langCode = lang.split('-')[0].toLowerCase()
    if (isValidLanguage(langCode)) {
      return langCode as Language
    }
  }

  return DEFAULT_LANGUAGE
}
