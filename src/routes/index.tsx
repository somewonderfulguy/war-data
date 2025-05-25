import { createFileRoute, redirect } from '@tanstack/react-router'
import { DEFAULT_LOCALE } from '../features/localization/config'

export const Route = createFileRoute('/')({    
  beforeLoad: () => {
    // Redirect to the default locale path with perpetua
    throw redirect({ to: '/$locale/perpetua', params: { locale: DEFAULT_LOCALE } })
  },
  component: App,
})

function App() {
  // This won't be rendered due to the redirect
  return <div>Redirecting...</div>
}
