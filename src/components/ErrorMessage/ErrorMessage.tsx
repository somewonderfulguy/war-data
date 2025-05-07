import { AlertCircle } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { Alert, AlertDescription } from '@/components/shadcn/alert'
import { cn } from '@/utils'

type Props = ComponentProps<typeof Alert> & {
  children: ReactNode
}

export const ErrorMessage = ({ children, className, ...props }: Props) => (
  <Alert
    variant="destructive"
    className={cn('border-destructive/50 bg-destructive/10', className)}
    {...props}
  >
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{children}</AlertDescription>
  </Alert>
)
