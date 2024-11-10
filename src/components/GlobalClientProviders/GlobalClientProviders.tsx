'use-client'

import { ReactNode } from 'react'

import { I18nProviderClient } from '@/locales/client'
import ThemeProvider from '@/features/theme/providers/ThemeProvider'

import { SessionProvider } from './SessionProvider'

type Props = {
  children: ReactNode
  locale: string
}

const GlobalClientProviders = ({ children, locale }: Props) => (
  <SessionProvider>
    <I18nProviderClient locale={locale}>
      <ThemeProvider>{children}</ThemeProvider>
    </I18nProviderClient>
  </SessionProvider>
)

export default GlobalClientProviders
