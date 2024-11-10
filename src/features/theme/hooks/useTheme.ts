import { useTheme as useNextTheme } from 'next-themes'
import type { Dispatch, SetStateAction } from 'react'

import type { Theme, ResolvedTheme } from '../types/themeTypes'

/** Typed wrapper around `useTheme` from `next-themes` */
export const useTheme = () => {
  const hookResult = useNextTheme()
  return {
    ...hookResult,
    theme: hookResult.theme as Theme | undefined,
    resolvedTheme: hookResult.resolvedTheme as ResolvedTheme | undefined,
    setTheme: hookResult.setTheme as Dispatch<SetStateAction<Theme>>
  }
}
