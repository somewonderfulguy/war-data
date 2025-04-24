import { useTheme as useNextTheme } from 'next-themes'
import { useMemo, type Dispatch, type SetStateAction } from 'react'

import type { Theme, ResolvedTheme } from '../types/themeTypes'

export const useTheme = () => {
  const hookResult = useNextTheme()
  return useMemo(
    () => ({
      ...hookResult,
      theme: hookResult.theme as Theme | undefined,
      resolvedTheme: hookResult.resolvedTheme as ResolvedTheme | undefined,
      setTheme: hookResult.setTheme as Dispatch<SetStateAction<Theme>>
    }),
    [hookResult]
  )
}
