import type { Metadata } from 'next'

import { getScopedI18n } from '@/locales/server'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import AppSidebar from './AppSidebar'
import AppControlButton from '@/components/ApplicationLayout/components/AppControlButton'

export async function generateMetadata() {
  const t = await getScopedI18n('home')
  return {
    title: t('title')
  } satisfies Metadata
}

const HomePage = () => {
  return (
    <div className="flex h-full min-h-full items-center justify-center">
      <SidebarProvider>
        <AppSidebar />

        <div>
          <SidebarTrigger />
          <div>
            <AppControlButton>Test</AppControlButton>
          </div>
          This is main content
        </div>
      </SidebarProvider>
    </div>
  )
}

export default HomePage
