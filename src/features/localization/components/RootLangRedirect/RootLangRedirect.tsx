import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { getPreferredLanguage } from '@/features/localization/utils'

/**
 * Root language redirect component. From / to /$lang (e.g /en, /ua)
 */
export const RootLangRedirectRoute = createFileRoute('/')({
  component: () => {
    const preferredLang = getPreferredLanguage()
    const navigate = useNavigate()
    navigate({
      to: '/$lang',
      params: { lang: preferredLang },
    })
  },
})
