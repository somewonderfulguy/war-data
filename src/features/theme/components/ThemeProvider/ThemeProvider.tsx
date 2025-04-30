import { ThemeProvider as ThemeProviderLib } from 'next-themes'
import type { ReactNode } from 'react'

import { themes } from '../../constants/themes'

type Props = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: Props) => (
  <ThemeProviderLib attribute="class" themes={themes as unknown as string[]}>
    {children}
  </ThemeProviderLib>
)
