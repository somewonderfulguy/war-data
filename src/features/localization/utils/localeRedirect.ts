import { redirect } from '@tanstack/react-router'

import { isValidLanguage } from './isValidLanguage'
import { getPreferredLanguage } from './getPreferredLanguage'
import type { Language } from '../types/localizationTypes'

export const localeRedirect = (
  providedLang: Language | '.well-known' | null,
): ReturnType<typeof redirect> | null => {
  // TODO: check on later versions
  // .well-known is internal of TanStack Start
  if (providedLang === '.well-known') {
    return null
  }

  const lang =
    providedLang && isValidLanguage(providedLang)
      ? providedLang
      : getPreferredLanguage()

  return redirect({
    to: `/${lang}`,
    replace: true,
  })
}
