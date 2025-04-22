import '~/styles/globals.css'

import { type Metadata } from 'next'
import { Geist } from 'next/font/google'
import { hasLocale } from 'next-intl'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'

import { ApplicationLayout } from '~/components/ApplicationLayout'
import { Providers } from '~/components/Providers'
import type { NextPageProps } from '~/types/NextPageProps'
import { routing } from '~/features/localization/routing'

export const metadata: Metadata = {
  title: 'War Data',
  description: 'Application to visualize stats and data of the war in Ukraine',
  authors: [{ name: 'Dmitriy Yastrebov' }],
  icons: [{ rel: 'icon', url: '/favicon.svg' }]
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
})

type Props = NextPageProps & {
  children: ReactNode
}

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={`${geist.variable} h-full`}>
      <body className="h-full">
        <Providers>
          <ApplicationLayout>{children}</ApplicationLayout>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
