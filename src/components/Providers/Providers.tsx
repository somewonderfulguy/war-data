import { NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'

import { ThemeProvider } from '@/features/theme/components/ThemeProvider'

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
