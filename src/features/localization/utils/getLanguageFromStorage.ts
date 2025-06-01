import { LANG_STORAGE_KEY } from '../constants'
import type { Language } from '../types'
import { isValidLanguage } from '.'

export const getLanguageFromStorage = (): Language | null => {
  if (typeof localStorage === 'undefined') return null

  try {
    const storedLang = localStorage.getItem(LANG_STORAGE_KEY)
    if (storedLang && isValidLanguage(storedLang)) {
      return storedLang as Language
    }
  } catch (e) {
    console.warn('Error accessing localStorage:', e)
  }

  return null
}
