import type { ComponentProps } from 'react'

import { Button } from '~/components/shadcn/button'

export const AppControlButton = (props: ComponentProps<typeof Button>) => {
  return <Button variant="outline" size="icon" {...props} />
}
