'use client'

import { useEffect, type ComponentProps, type ReactNode } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { SidebarProvider, useSidebar } from '@/components/shadcn/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { cn } from '@/utils'
import { usePathname } from '@/features/localization/navigation'
import { usePrevious } from '@/hooks/usePrevious'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import { ChangeLocaleControl } from '@/features/localization/components/ChangeLocaleControl'
import { ChangeThemeControl } from '@/features/theme/components/ChangeThemeControl'
import { ProfileControl } from '@/features/auth/components/ProfileControl'

import { AppControlButton } from './components/AppControlButton'

const hideOnRoutes = ['/login']

/** Component that orchestrates sidebar */
export const ApplicationLayout = ({
  className,
  children,
  defaultOpen,
  ...props
}: ComponentProps<typeof SidebarProvider>) => {
  const pathname = usePathname()
  const isHideOnRoute = hideOnRoutes.some((route) => pathname.startsWith(route))
  return (
    <SidebarProvider
      {...props}
      className={cn('h-full', className)}
      defaultOpen={
        // if the route is in the hideOnRoutes array, we want to hide the sidebar
        // otherwise we want to show it based on the localStorage value
        isHideOnRoute ? false : defaultOpen
      }
      cookieIgnorePaths={hideOnRoutes}
    >
      <ApplicationLayoutImpl>{children}</ApplicationLayoutImpl>
    </SidebarProvider>
  )
}

const SidebarToggle = () => {
  const { toggleSidebar, open, openMobile, isMobile } = useSidebar()

  const isOpen = isMobile ? openMobile : open

  const t = useTranslations('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <AppControlButton onClick={toggleSidebar}>
          {isOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
        </AppControlButton>
      </TooltipTrigger>
      <TooltipContent>{t('toggleSidebar')}</TooltipContent>
    </Tooltip>
  )
}

const ApplicationLayoutImpl = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const { setOpen } = useSidebar()

  const prevPathname = usePrevious(pathname)
  useEffect(() => {
    if (pathname === prevPathname || prevPathname === null) return

    const isHideOnRoute = hideOnRoutes.some((route) => pathname.startsWith(route))
    setOpen(!isHideOnRoute)
  }, [pathname, prevPathname, setOpen])

  return (
    <>
      <AppSidebar />

      <div className={`fixed top-4 left-4 z-20 flex gap-1`}>
        <SidebarToggle />

        <ChangeThemeControl />

        <ChangeLocaleControl />

        <ProfileControl />
      </div>

      <div className="h-full w-full">{children}</div>
    </>
  )
}
