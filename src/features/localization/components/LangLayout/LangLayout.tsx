import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLayoutEffect } from 'react'

import { isValidLanguage } from '../../utils'

export const LangLayoutRoute = createFileRoute('/$lang')({
  parseParams: (params) => {
    const { lang } = params
    if (!isValidLanguage(lang)) {
      throw notFound()
    }
    return { lang }
  },
  component: LangLayout,
})

/**
 * Component that changes language of i18next when route changes
 */
function LangLayout() {
  const { lang } = LangLayoutRoute.useParams()
  const { i18n } = useTranslation()

  useLayoutEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [i18n, lang])

  return <Outlet />
}
