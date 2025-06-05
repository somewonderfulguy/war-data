import {
  useParams,
  useRouter as useTanStackRouter,
} from '@tanstack/react-router'

export const useRouter = () => {
  const router = useTanStackRouter()
  const { lang = 'en' } = useParams({ strict: false })

  // Create a wrapper object with the same properties as the router
  // but with a modified navigate function
  const wrappedRouter = {
    ...router,
    navigate: (options: Parameters<typeof router.navigate>[0]) => {
      // If the 'to' property is a string and doesn't include the language prefix
      if (
        typeof options === 'object' &&
        'to' in options &&
        typeof options.to === 'string'
      ) {
        // Add the language prefix
        return router.navigate({
          ...options,
          to: `/${lang}${options.to.startsWith('/') ? options.to : `/${options.to}`}`,
        })
      }
      // Otherwise use the original navigate function
      return router.navigate(options)
    },
  }

  return wrappedRouter
}
