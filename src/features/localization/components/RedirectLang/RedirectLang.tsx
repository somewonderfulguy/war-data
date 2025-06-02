import { useNavigate } from '@tanstack/react-router'

import { getPreferredLanguage } from '../../utils'

export const RedirectLang = () => {
  const preferredLang = getPreferredLanguage()
  const navigate = useNavigate()

  navigate({
    to: '/$lang',
    params: { lang: preferredLang },
  })

  return null
}
