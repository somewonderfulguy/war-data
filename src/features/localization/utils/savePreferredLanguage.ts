import { LANG_COOKIE_NAME, LANG_STORAGE_KEY } from '../constants'
import type { Language } from '../types'
import { isValidLanguage } from './isValidLanguage'

export const savePreferredLanguage = (lang: Language): void => {
  if (!isValidLanguage(lang)) return

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang)
    } catch (e) {
      console.warn('Error saving to localStorage:', e)
    }
  }

  if (typeof document !== 'undefined') {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30) // 30 days
    document.cookie = `${LANG_COOKIE_NAME}=${lang};expires=${expirationDate.toUTCString()};path=/;SameSite=Lax`
  }
}
