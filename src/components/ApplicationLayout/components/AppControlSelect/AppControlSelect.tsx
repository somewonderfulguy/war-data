import { forwardRef, ReactNode } from 'react'
import { SelectTriggerProps, SelectProps } from '@radix-ui/react-select'

import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'

import styles from './AppControlSelect.module.css'

type AppControlSelectProps = Omit<SelectProps, 'children'> & {
  trigger: ReactNode
  options: { value: string; label: string }[]
}

const AppControlSelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <SelectTrigger
        {...props}
        ref={ref}
        className={`flex h-10 w-10 items-center justify-center p-0 text-primary transition-colors hover:bg-secondary-foreground/[0.05] hover:text-accent-foreground ${styles.buttonDropDown} ${className}`}
      >
        <SelectValue>{children}</SelectValue>
      </SelectTrigger>
    )
  }
)
AppControlSelectTrigger.displayName = 'AppControlSelectTrigger'

const AppControlSelectComponent = forwardRef<HTMLDivElement, AppControlSelectProps>(
  ({ trigger, options, ...props }, ref) => {
    return (
      <Select {...props}>
        {trigger}
        <SelectContent align="center" className="min-w-[100px]" ref={ref}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={`${styles.itemDropDown} ${
                props.value === option.value ? 'bg-secondary font-semibold' : ''
              } flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
)
AppControlSelectComponent.displayName = 'AppControlSelect'

const AppControlSelect = Object.assign(AppControlSelectComponent, { Trigger: AppControlSelectTrigger })

export default AppControlSelect
