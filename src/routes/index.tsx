import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { getPreferredLanguage } from '@/features/localization/utils/getPreferredLanguage'

export const Route = createFileRoute('/')({
  component: () => {
    const preferredLang = getPreferredLanguage()
    const navigate = useNavigate()
    navigate({
      to: '/$lang/perpetua',
      params: { lang: preferredLang },
    })
  },
})
