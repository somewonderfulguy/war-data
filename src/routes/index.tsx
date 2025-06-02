import { createFileRoute } from '@tanstack/react-router'

import { RedirectLang } from '@/features/localization/components'

// This route redirects to the preferred language
export const Route = createFileRoute('/')({
  component: RedirectLang,
})
