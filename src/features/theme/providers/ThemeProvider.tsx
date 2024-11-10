'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

import { Themes } from '../constants/themes'

type Props = {
  children: ReactNode
}

const ThemeProvider = ({ children }: Props) => (
  <NextThemeProvider attribute="class" themes={Themes as unknown as string[]}>
    {children}
  </NextThemeProvider>
)

export default ThemeProvider
