import { createFileRoute, redirect } from '@tanstack/react-router'

import { getPreferredLanguage } from '@/features/localization/utils/getPreferredLanguage'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const preferredLang = getPreferredLanguage()
    throw redirect({
      to: '/$lang/perpetua',
      params: { lang: preferredLang },
    })
  },
  component: () => null,
})
