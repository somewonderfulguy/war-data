import type { Language } from '../types/localizationTypes'

export const LANGUAGES = ['en', 'jp', 'ua', 'pl'] as const
export const DEFAULT_LANGUAGE: Language = 'en'

export const LANG_STORAGE_KEY = 'app_preferred_language'
export const LANG_COOKIE_NAME = 'app_language'
