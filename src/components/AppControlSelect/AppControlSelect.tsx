import type { ComponentProps, ReactNode } from 'react'
import { Button } from '~/components/shadcn/formControls/button'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '~/components/shadcn/formControls/select'
import { cn } from '~/utils'

type AppControlSelectProps = Omit<ComponentProps<typeof Select>, 'children'> & {
  trigger: ReactNode
  options: { value: string; label: string }[]
}

const AppControlSelectTrigger = ({
  children,
  className = '',
  ...props
}: ComponentProps<typeof Button>) => (
  <Button
    asChild
    className={cn('h-10 w-10 p-0! [&>svg]:hidden', className)}
    variant="outline"
    {...props}
  >
    <SelectTrigger>
      <SelectValue>{children}</SelectValue>
    </SelectTrigger>
  </Button>
)

const AppControlSelectComponent = ({ trigger, options, ...props }: AppControlSelectProps) => (
  <Select {...props}>
    {trigger}
    <SelectContent align="center" className="min-w-[100px]">
      {options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className={cn(
            'focus:bg-accent focus:text-accent-foreground flex cursor-pointer items-center rounded-sm',
            'px-2 py-1.5 text-sm outline-none disabled:pointer-events-none disabled:opacity-50',
            '[&_span[aria-hidden]]:hidden',
            props.value === option.value && 'bg-secondary font-semibold'
          )}
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)

export const AppControlSelect = Object.assign(AppControlSelectComponent, {
  Trigger: AppControlSelectTrigger
})
