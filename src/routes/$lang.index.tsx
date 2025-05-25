import { createFileRoute, redirect } from '@tanstack/react-router'

// This handles the exact route /$lang (e.g., /en, /pl)
// and redirects to /$lang/perpetua
export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/$lang/perpetua',
      params: { lang: params.lang },
    })
  },
  component: () => null,
})
