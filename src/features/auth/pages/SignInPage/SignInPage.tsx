import { RedirectType } from 'next/navigation'
import { getCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'

import { redirect } from '@/features/localization/navigation'
import type { NextPageProps } from '@/types/NextPageProps'

import { redirectAfterLoginKey } from '../../constants/authCookieKeys'

/**
 * When user logs in, redirect them to the page from cookie (if exists).
 * Cookie is set on login (any login method).
 * If no cookie, redirect to main page.
 * */
export const SignInPage = async ({ params }: NextPageProps) => {
  const { locale } = await params

  const redirectCookie = await getCookie(redirectAfterLoginKey, { cookies })

  return redirect(
    { href: redirectCookie ? String(redirectCookie) : '/', locale },
    RedirectType.replace
  )
}
