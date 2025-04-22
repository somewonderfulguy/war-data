'use client'

import type { ComponentProps } from 'react'
import { useTranslations } from 'next-intl'

import { cn } from '~/utils/utils'
import { Button } from '~/components/shadcn/button'
import { Input } from '~/components/shadcn/input'
import { Label } from '~/components/shadcn/label'

import { google, github, microsoft, discord } from './assets/oAuthIcons'

export const LoginForm = ({ className, ...props }: ComponentProps<'form'>) => {
  const t = useTranslations('auth')

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <h1 className="text-center text-2xl font-bold">{t('signIn')}</h1>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">{t('emailLabel')}</Label>
          <Input id="email" type="text" placeholder="mail@example.com" />
        </div>
        <Button type="submit" className="w-full">
          {t('emailButton')}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            {t('orSeparator')}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full">
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
    </form>
  )
}
