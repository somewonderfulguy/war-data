import type { ComponentProps, ReactNode } from 'react'
import { useFormContext, type Path, type UseFormReturn } from 'react-hook-form'

import { cn } from '@/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcn/formControls/form'
import { Input } from '@/components/shadcn/formControls/input'

type Props<TForm extends object> = ComponentProps<'input'> & {
  name: Path<TForm>
  label?: ReactNode
  labelProps?: ComponentProps<typeof FormLabel>
  formItemProps?: ComponentProps<typeof FormItem>
}

export const FormInput = <TForm extends object>({
  label,
  name,
  type = 'text',
  onChange,
  labelProps,
  formItemProps,
  className,
  ...props
}: Props<TForm>) => {
  const form: UseFormReturn<TForm> = useFormContext<TForm>()

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem {...formItemProps}>
          {label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <div className={cn('w-full', className)}>
            <FormControl>
              <Input
                {...props}
                {...field}
                type={type}
                onChange={(e) => {
                  const onChangeResult = onChange?.(e) as unknown as boolean | string | undefined

                  if (onChangeResult === false) return

                  if (typeof onChangeResult === 'string') {
                    field.onChange(onChangeResult)
                    return
                  }

                  field.onChange(e)
                }}
              />
            </FormControl>
            <FormMessage className="mt-0.5" />
          </div>
        </FormItem>
      )}
    />
  )
}
