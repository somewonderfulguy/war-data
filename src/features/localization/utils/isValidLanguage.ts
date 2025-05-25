import type { Language } from '../types/localizationTypes'
import { LANGUAGES } from '../constants/localizationConstants'

export const isValidLanguage = (lang: string): lang is Language =>
  LANGUAGES.includes(lang as Language)
