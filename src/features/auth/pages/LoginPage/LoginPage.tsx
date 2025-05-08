import Image from 'next/image'
import { RedirectType } from 'next/navigation'
import { setCookie } from 'cookies-next/server'
import { cookies } from 'next/headers'

import type { NextPageProps } from '@/types/NextPageProps'
import { getSession } from '@/features/auth/utils/authServer'
import { redirect } from '@/features/localization/navigation'

import { LoginForm } from './components/LoginForm'
import img from './assets/donets.jpg'
import { loginEmailSchema } from './schemas/loginEmailSchema'
import { authClient } from '../../utils/authClient'
import { redirectAfterLoginKey } from '../../constants/authCookieKeys'

export const LoginPage = async ({ params, searchParams }: NextPageProps) => {
  const { locale } = await params

  const searchParameters = await searchParams
  const returnUrl = searchParameters?.returnUrl

  const session = await getSession()
  const user = session?.user

  if (user) {
    redirect({ href: returnUrl ? String(returnUrl) : '/', locale }, RedirectType.replace)
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginForm
            emailAction={async (_prevState, formData) => {
              'use server'

              try {
                const emailData = Object.fromEntries(formData)
                const parsed = loginEmailSchema.safeParse(emailData)

                if (!parsed.success) return 'error'

                await setCookie(redirectAfterLoginKey, returnUrl, { cookies, maxAge: 60 * 10 })

                const { email } = parsed.data
                await authClient.signIn.magicLink({ email, callbackURL: '/sign-in' })
              } catch (error) {
                console.error('Error parsing email data:', error)
                return 'error'
              }

              return redirect({ href: '/check-your-email', locale }, RedirectType.replace)
            }}
          />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={img}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale-50"
          fill
          placeholder="blur"
          blurDataURL={img.src}
        />
      </div>
    </div>
  )
}
