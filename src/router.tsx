import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { QueryClient } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()
const getContext = () => ({ queryClient })

export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: getContext(),
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
    }),
    getContext().queryClient,
  )

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
