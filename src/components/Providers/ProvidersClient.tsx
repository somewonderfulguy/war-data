'use client'

import type { ReactNode } from 'react'
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { isStorybook } from '@/constants/envVarsClient'

type Props = {
  children: ReactNode
}

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 5000,
        ...(isStorybook && {
          staleTime: Number.POSITIVE_INFINITY,
          refetchOnMount: false
        })
      }
    }
  })

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (isServer) return makeQueryClient()
  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
}

export const ProvidersClient = ({ children }: Props) => {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
