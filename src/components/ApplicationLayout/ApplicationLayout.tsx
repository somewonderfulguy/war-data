'use client'

import { useEffect, type ComponentProps, type ReactNode } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'

import { SidebarProvider, useSidebar } from '~/components/shadcn/sidebar'
import { AppSidebar } from '~/components/AppSidebar'
import { cn } from '~/utils'
import { usePathname } from '~/features/localization/navigation'

import { AppControlButton } from './components/AppControlButton'

const hideOnRoutes = ['/login']

export const ApplicationLayout = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SidebarProvider>) => (
  <SidebarProvider {...props} className={cn('h-full', className)}>
    <ApplicationLayoutImpl>{children}</ApplicationLayoutImpl>
  </SidebarProvider>
)

const SidebarToggle = () => {
  const { toggleSidebar, open, openMobile, isMobile } = useSidebar()

  const isOpen = isMobile ? openMobile : open

  return (
    <AppControlButton onClick={() => toggleSidebar()}>
      {isOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
    </AppControlButton>
  )
}

const ApplicationLayoutImpl = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  const { setOpen } = useSidebar()

  useEffect(() => {
    if (hideOnRoutes.some((route) => pathname.startsWith(route))) {
      setOpen(false)
      return () => setOpen(true)
    }
    // setOpen refreshes on every `open` change, the hook won't work on `/login`, for instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <AppSidebar />

      <div className={`fixed top-4 left-4 z-20 flex gap-1`}>
        <SidebarToggle />
      </div>

      <div className="h-full w-full">{children}</div>
    </>
  )
}
