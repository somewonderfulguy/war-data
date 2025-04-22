import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'

import { TooltipProvider } from '../shadcn/tooltip'

import { ProvidersClient } from './ProvidersClient'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <NextIntlClientProvider>
    <TooltipProvider>
      <ProvidersClient>{children}</ProvidersClient>
    </TooltipProvider>
  </NextIntlClientProvider>
)
