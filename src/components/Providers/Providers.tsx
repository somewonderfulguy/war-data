import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { TooltipProvider } from '../shadcn/tooltip'

import { ProvidersClient } from './ProvidersClient'
import { themes } from '~/features/theme/constants/themes'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => (
  <NextIntlClientProvider>
    <TooltipProvider>
      <ThemeProvider attribute="class" themes={themes as unknown as string[]}>
        <ProvidersClient>{children}</ProvidersClient>
      </ThemeProvider>
    </TooltipProvider>
  </NextIntlClientProvider>
)
