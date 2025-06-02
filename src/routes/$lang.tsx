import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useLayoutEffect } from 'react'

import { isValidLanguage } from '@/features/localization/utils/isValidLanguage'

export const Route = createFileRoute('/$lang')({
  parseParams: (params) => {
    const { lang } = params
    if (!isValidLanguage(lang)) {
      throw notFound()
    }
    return { lang }
  },
  component: LangLayout,
})

function LangLayout() {
  const { lang } = Route.useParams()
  const { i18n } = useTranslation()

  useLayoutEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [i18n, lang])

  return <Outlet />
}
