import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { isValidLanguage } from '../i18n'

// Create a language-specific route with validation
export const Route = createFileRoute('/$lang')({
  parseParams: (params) => {
    const { lang } = params
    if (!isValidLanguage(lang)) {
      throw notFound()
    }
    return { lang }
  },
  // We've removed the beforeLoad redirect that was causing an infinite loop
  loader: ({ params }) => {
    // Return the language to make it available to components
    return {
      lang: params.lang,
    }
  },
  component: LangLayout,
})

function LangLayout() {
  const { lang } = Route.useParams()
  const { i18n } = useTranslation()
  
  // Change language when the route parameter changes
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [i18n, lang])
  
  return <Outlet />
}
