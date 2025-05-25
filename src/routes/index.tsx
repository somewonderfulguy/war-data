import { createFileRoute, redirect } from '@tanstack/react-router'
import { getPreferredLanguage } from '../middleware/language'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const preferredLang = getPreferredLanguage()
    // Redirect directly to the language-specific perpetua page
    throw redirect({
      to: '/$lang/perpetua',
      params: { lang: preferredLang },
    })
  },
  component: () => null,
})
