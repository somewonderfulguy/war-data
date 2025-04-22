import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'

import { ProvidersClient } from './ProvidersClient'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <NextIntlClientProvider>
    <ProvidersClient>{children}</ProvidersClient>
  </NextIntlClientProvider>
)
