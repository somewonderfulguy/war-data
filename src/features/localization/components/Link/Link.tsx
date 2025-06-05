import { Link as TanStackLink, useParams } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

export const Link = ({ to, ...props }: ComponentProps<typeof TanStackLink>) => {
  const { lang = 'en' } = useParams({ strict: false })

  if (!to || to.startsWith('http')) {
    throw new Error('Invalid link')
  }

  const withSlash = to.startsWith('/') ? to : `/${to}`

  return <TanStackLink to={`/${lang}${withSlash}`} {...props} />
}
