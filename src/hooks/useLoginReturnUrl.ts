import { useSearchParams } from 'next/navigation'

import { usePathname } from '@/features/localization/navigation'

/** Reusable logic of getting login url with `returnUrl` based on current location & query params */
export const useLoginReturnUrl = () => {
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const searchParamsStr = searchParams.toString()

  const rawReturnUrl = `${pathname}${searchParamsStr ? `?${searchParamsStr}` : ''}`
  const returnUrl = encodeURIComponent(rawReturnUrl)

  if (pathname === '/login' || !returnUrl) {
    return '/login'
  }
  return `/login?returnUrl=${returnUrl}`
}
