import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { TooltipProvider } from '../shadcn/tooltip'

import { ProvidersClient } from './ProvidersClient'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <NextIntlClientProvider>
    <TooltipProvider>
      <ThemeProvider>
        <ProvidersClient>{children}</ProvidersClient>
      </ThemeProvider>
    </TooltipProvider>
  </NextIntlClientProvider>
)
