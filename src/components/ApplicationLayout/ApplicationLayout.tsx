'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { usePathname } from 'next/navigation'

import { SidebarProvider, SidebarTrigger } from '~/components/shadcn/sidebar'
import { AppSidebar } from '~/components/AppSidebar'
import { cn } from '~/utils'

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

      <div className="h-full w-full">{children}</div>
    </SidebarProvider>
  )
}
