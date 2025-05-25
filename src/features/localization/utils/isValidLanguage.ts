import type { Language } from '../types/localizationTypes'
import { LANGUAGES } from '../constants/localizationConst'

export function isValidLanguage(lang: string): lang is Language {
  return LANGUAGES.includes(lang as Language)
}
