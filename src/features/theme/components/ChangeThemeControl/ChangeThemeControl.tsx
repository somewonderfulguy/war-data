import { useTranslations } from 'next-intl'
import { MoonIcon, SunIcon } from 'lucide-react'

import { AppControlSelect } from '~/components/AppControlSelect'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/shadcn/tooltip'
import { useIsMounted } from '~/hooks/useIsMounted'

import { useTheme } from '../../hooks/useTheme'
import type { Theme } from '../../types/themeTypes'

const options = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' }
]

export const ChangeThemeControl = () => {
  const t = useTranslations('theme')

  const { theme, resolvedTheme, setTheme } = useTheme()

  const isMounted = useIsMounted()

  return (
    <AppControlSelect
      value={isMounted ? theme : undefined}
      onValueChange={(theme) => setTheme(theme as Theme)}
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <AppControlSelect.Trigger>
              {resolvedTheme === 'dark' ? (
                <MoonIcon className="text-foreground h-4 w-4" />
              ) : (
                <SunIcon className="h-4 w-4" />
              )}
            </AppControlSelect.Trigger>
          </TooltipTrigger>
          <TooltipContent>{t('changeTheme')}</TooltipContent>
        </Tooltip>
      }
      options={options}
    />
  )
}
