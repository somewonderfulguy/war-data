import { LANG_COOKIE_NAME } from '../constants'
import type { Language } from '../types'
import { isValidLanguage } from '.'

export const getLanguageFromCookie = (): Language | null => {
  if (typeof document === 'undefined') return null

  try {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=')
      if (name === LANG_COOKIE_NAME && isValidLanguage(value)) {
        return value as Language
      }
    }
  } catch (e) {
    console.warn('Error accessing cookies:', e)
  }

  return null
}
