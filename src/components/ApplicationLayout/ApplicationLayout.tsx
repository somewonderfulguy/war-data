'use client'

import { useEffect, useState, type ComponentProps } from 'react'

import { SidebarProvider, SidebarTrigger } from '~/components/shadcn/sidebar'
import { AppSidebar } from '~/components/AppSidebar'
import { cn } from '~/utils'
import { usePathname } from '~/features/localization/navigation'

const hideOnRoutes = ['/login']

export const ApplicationLayout = ({
  className,
  children,
  onOpenChange,
  ...props
}: ComponentProps<typeof SidebarProvider>) => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(
    () => !hideOnRoutes.some((route) => pathname.startsWith(route))
  )

  useEffect(() => {
    if (hideOnRoutes.some((route) => pathname.startsWith(route))) {
      setSidebarOpen(false)
      return () => setSidebarOpen(true)
    }
  }, [pathname])

  return (
    <SidebarProvider
      {...props}
      className={cn('h-full', className)}
      open={sidebarOpen}
      onOpenChange={(open) => {
        setSidebarOpen(open)
        onOpenChange?.(open)
      }}
    >
      <AppSidebar />
      <SidebarTrigger />

      <div className={`fixed top-4 left-4 z-20 flex gap-1`}>
        {/* <TooltipGroup tooltipContent={<p>Toggle sidebar</p>}>
            <AppControlButton onClick={() => setIsDrawerOpen((prev) => !prev)}>
              {isDrawerOpen ? <XIcon className={iconSharedClassName} /> : <MenuIcon className={iconSharedClassName} />}
            </AppControlButton>
          </TooltipGroup> */}
      </div>

      <div className="h-full w-full">{children}</div>
    </SidebarProvider>
  )
}
