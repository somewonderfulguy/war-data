import { redirect } from '@tanstack/react-router'
import { DEFAULT_LANGUAGE, isValidLanguage } from '../i18n'
import type { Language } from '../i18n'

// Function to get preferred language from navigator
export function getPreferredLanguage(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE
  
  const browserLangs = navigator.languages || [navigator.language]
  
  // Try to find a matching language from browser preferences
  for (const lang of browserLangs) {
    const langCode = lang.split('-')[0].toLowerCase()
    if (isValidLanguage(langCode)) {
      return langCode
    }
  }
  
  return DEFAULT_LANGUAGE
}

// Middleware to handle language-specific routing
export function languageMiddleware(pathname: string): ReturnType<typeof redirect> | null {
  // Check if URL already has a language prefix
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  // If we already have a valid language prefix, we're good
  if (firstSegment && isValidLanguage(firstSegment)) {
    return null // No redirect needed
  }
  
  // No language prefix found, redirect to preferred language
  const preferredLang = getPreferredLanguage()
  
  // Build the new path with the language prefix
  let newPath = `/${preferredLang}`
  
  // Add the rest of the original path if it exists
  if (pathname !== '/') {
    newPath += pathname
  }
  
  // Redirect to the new language-prefixed path
  return redirect({
    to: newPath,
    replace: true,
  })
}
