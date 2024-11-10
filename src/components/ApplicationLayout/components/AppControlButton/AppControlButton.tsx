import { Button, type ButtonProps } from '@/components/ui/button'
import clsx from 'clsx'
import { forwardRef } from 'react'

export default forwardRef<HTMLButtonElement, ButtonProps>(function AppControlButton(props, ref) {
  return (
    <Button
      variant="outline"
      size="icon"
      {...props}
      ref={ref}
      // TODO: do better coloring on hover
      className={clsx(
        'focus-visible:box-shadow-none text-primary hover:bg-secondary-foreground/[0.05] focus:bg-secondary-foreground/[0.05]',
        props.className
      )}
    />
  )
})
