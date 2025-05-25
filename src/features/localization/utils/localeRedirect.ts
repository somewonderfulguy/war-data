import { redirect } from '@tanstack/react-router'

import { isValidLanguage } from './isValidLanguage'
import { getPreferredLanguage } from './getPreferredLanguage'

export function localeRedirect(pathname: string): ReturnType<typeof redirect> | null {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && isValidLanguage(firstSegment)) {
    return null
  }

  const preferredLang = getPreferredLanguage()

  let newPath = `/${preferredLang}`

  if (pathname !== '/') {
    newPath += pathname
  }

  return redirect({
    to: newPath,
    replace: true,
  })
}
