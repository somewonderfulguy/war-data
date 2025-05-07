import { UserIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

// import { AppControlSelect } from '@/components/AppControlSelect'
import { AppControlButton } from '@/components/ApplicationLayout/components/AppControlButton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import { Link } from '@/features/localization/navigation'
import { useLoginReturnUrl } from '@/hooks/useLoginReturnUrl'

export const ProfileControl = () => {
  const t = useTranslations('auth')

  const loginUrl = useLoginReturnUrl()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <AppControlButton asChild>
          <Link href={loginUrl}>
            <UserIcon className="h-4 w-4" />
          </Link>
        </AppControlButton>
      </TooltipTrigger>
      <TooltipContent>{t('signIn')}</TooltipContent>
    </Tooltip>
  )
}
