import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/perpetua' })
  },
  component: App,
})

function App() {
  return null
}
