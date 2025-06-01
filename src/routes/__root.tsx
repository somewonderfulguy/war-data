import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useLayoutEffect, type ReactNode } from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import {
  DEFAULT_LANGUAGE,
  type Language,
  localeRedirect,
  savePreferredLanguage,
} from '@/features/localization'
import '@/features/localization/langSetup'
import appCss from '@/styles/globals.css?url'

const getLangFromParams = (params: Record<string, string>) => {
  const lang = (params as { lang?: Language }).lang
  return lang ?? null
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    beforeLoad: ({ params }) => {
      const lang = getLangFromParams(params)
      localeRedirect(lang)
    },
    head: () => ({
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: 'War Data' },
      ],
      links: [{ rel: 'stylesheet', href: appCss }],
    }),

    component: () => (
      <RootDocument>
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
      </RootDocument>
    ),
  },
)

type Props = { children: ReactNode }

function RootDocument({ children }: Props) {
  const params = Route.useParams()
  const urlLang = getLangFromParams(params)
  const {
    i18n: { language: currentLanguage },
  } = useTranslation()

  useLayoutEffect(() => {
    if (urlLang && urlLang !== currentLanguage) {
      savePreferredLanguage(urlLang)
    }
  }, [urlLang])

  return (
    <html lang={urlLang ?? DEFAULT_LANGUAGE}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
