import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { AppControlSelect } from '~/components/AppControlSelect'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/shadcn/tooltip'

import { usePathname, useRouter } from '../../navigation'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'jp', label: '日本語' },
  { code: 'pl', label: 'Polski' },
  { code: 'ua', label: 'Українська' }
]

export const ChangeLocaleControl = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const [isPending, startTransition] = useTransition()

  const t = useTranslations('localization')

  return (
    <AppControlSelect
      value={currentLocale}
      onValueChange={(locale) => {
        startTransition(() => {
          router.push(pathname, { locale })
        })
      }}
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <AppControlSelect.Trigger disabled={isPending}>
              {currentLocale.toUpperCase()}
            </AppControlSelect.Trigger>
          </TooltipTrigger>
          <TooltipContent>{t('changeLanguage')}</TooltipContent>
        </Tooltip>
      }
      options={languages.map((lang) => ({ value: lang.code, label: lang.label }))}
    />
  )
}
