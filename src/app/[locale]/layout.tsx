import { ReactNode } from 'react'
import Locale from 'intl-locale-textinfo-polyfill'
import { Metadata } from 'next'

import { inter } from '@/constants/fonts'
import ClientProviders from '@/components/GlobalClientProviders'
import ApplicationLayout from '@/components/ApplicationLayout'

import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg'
  }
}

type Props = {
  children: ReactNode
  params: { locale: string }
}

const AppLayout = ({ children, params: { locale } }: Props) => {
  const { direction: dir } = new Locale(locale).textInfo

  return (
    <html lang={locale} dir={dir} className="h-full min-h-full" suppressHydrationWarning>
      <body className={`h-full min-h-full antialiased ${inter.className}`}>
        <ClientProviders locale={locale}>
          <ApplicationLayout>
            <main className="h-full min-h-full bg-background p-12 pt-16 text-primary">{children}</main>
          </ApplicationLayout>
        </ClientProviders>
      </body>
    </html>
  )
}

export default AppLayout
