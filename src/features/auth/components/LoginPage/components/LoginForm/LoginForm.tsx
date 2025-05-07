'use client'

import { useActionState, useRef, useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next/client'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/shadcn/formControls/button'
import { Label } from '@/components/shadcn/formControls/label'
import { Form } from '@/components/shadcn/formControls/form'
import { redirectAfterLoginKey } from '@/features/auth/constants/authCookieKeys'
import { ErrorMessage } from '@/components/ErrorMessage'
import { FormInput } from '@/components/form/FormInput'
import { cn } from '@/utils'

import { loginEmailSchema, type LoginEmailSchema } from '../../schemas/loginEmailSchema'
import { google, github, microsoft, discord } from './assets/oAuthIcons'
import { signInGoogle } from './utils/oAuth'

type ServerState = 'success' | 'error' | 'idle'

type Props = {
  emailAction: (prevState: ServerState, formData: FormData) => Promise<ServerState>
}

export const LoginForm = ({ emailAction }: Props) => {
  const t = useTranslations('auth')

  const searchParams = useSearchParams()
  /**
   * utility that sets a cookie of url where user was before login,
   * so after redirect to /sign-in page, user can be redirected back to that page
   */
  const setCookieReturnUrl = () => {
    const returnUrl = searchParams.get('returnUrl')
    if (returnUrl) {
      setCookie(redirectAfterLoginKey, returnUrl, {
        maxAge: 60 * 10 // 10 minutes
      })
    }
  }

  const [emailServerState, emailFormAction, isEmailFormPending] = useActionState(
    emailAction,
    'idle'
  )
  const [, startTransition] = useTransition()

  const [googleLoading, setGoogleLoading] = useState(false)

  const disabled = isEmailFormPending || googleLoading

  const form = useForm<LoginEmailSchema>({
    resolver: zodResolver(loginEmailSchema),
    defaultValues: { email: '' }
  })

  const emailFormRef = useRef<HTMLFormElement>(null)

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-2xl font-bold">{t('signIn')}</h1>
      {emailServerState === 'error' && (
        <ErrorMessage>
          {t('emailLabel')}: {t('loginFailed')}
        </ErrorMessage>
      )}
      <div className="grid gap-6">
        <Form {...form}>
          <form
            ref={emailFormRef}
            action={emailFormAction}
            onSubmit={async (e) => {
              e.preventDefault()

              await form.handleSubmit(() => {
                startTransition(() => {
                  emailFormAction(new FormData(emailFormRef.current!))
                })
              })(e)
            }}
            className="flex flex-col gap-3"
          >
            <div className="grid gap-3">
              <Label htmlFor="email">{t('emailLabel')}</Label>
              <FormInput<LoginEmailSchema>
                name="email"
                type="text"
                placeholder="mail@example.com"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              loading={isEmailFormPending}
              disabled={disabled}
            >
              {t('emailButton')}
            </Button>
          </form>
        </Form>

        <div
          className={cn(
            'after:border-border relative text-center text-sm after:absolute',
            'after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'
          )}
        >
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            {t('orSeparator')}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setCookieReturnUrl()
              setGoogleLoading(true)
              void signInGoogle().finally(() => {
                setGoogleLoading(false)
              })
            }}
            disabled={disabled}
            loading={googleLoading}
          >
            {google}
            {t('signInWithGoogle')}
          </Button>
          <Button variant="outline" className="w-full">
            {microsoft}
            {t('signInWithMicrosoft')}
          </Button>
          <Button variant="outline" className="w-full">
            {discord}
            {t('signInWithDiscord')}
          </Button>
          <Button variant="outline" className="w-full">
            {github}
            {t('signInWithGitHub')}
          </Button>
        </div>
      </div>
    </div>
  )
}
