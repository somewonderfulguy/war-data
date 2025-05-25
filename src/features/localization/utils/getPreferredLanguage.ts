import { DEFAULT_LANGUAGE } from '../constants/localizationConstants'
import type { Language } from '../types/localizationTypes'
import { isValidLanguage } from './isValidLanguage'

export const getPreferredLanguage = (): Language => {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE

  const browserLangs = navigator.languages || [navigator.language]

  for (const lang of browserLangs) {
    const langCode = lang.split('-')[0].toLowerCase()
    if (isValidLanguage(langCode)) {
      return langCode
    }
  }

  return DEFAULT_LANGUAGE
}
