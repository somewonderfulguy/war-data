import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import appCss from '../styles/globals.css?url'
import { LanguageSwitcher, i18n } from '../features/localization'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </RootDocument>
  ),
})

interface Props {
  children: ReactNode
}

function RootDocument({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          <div className="min-h-screen flex flex-col">
            <header className="p-4 border-b">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">War Data</h1>
                <LanguageSwitcher />
              </div>
            </header>
            <main className="flex-1 container mx-auto p-4">
              {children}
            </main>
          </div>
        </I18nextProvider>
        <Scripts />
      </body>
    </html>
  )
}
