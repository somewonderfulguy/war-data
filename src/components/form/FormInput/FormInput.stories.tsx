import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/shadcn/formControls/form'

import { FormInput } from './FormInput'

/**
 * Component to reduce boilerplate code for form inputs.<br />
 * To prevent `react-hook-form`'s `onChange` pass `onChange` prop and return `false` in it.<br />
 * `onChange={e => false}`<br />
 * To override `onChange` value, return a string in `onChange` prop.<br />
 * `onChange={e => 'new value'}`<br />
 * */
const meta: Meta<typeof FormInput<{ email: string }>> = {
  title: 'components/form/FormInput',
  component: FormInput,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

const FormWrapper: Decorator = () => {
  const form = useForm<{ email: string }>({
    defaultValues: { email: '' }
  })

  return (
    <Form {...form}>
      <form>
        <FormInput<{ email: string }> name="email" />
      </form>
    </Form>
  )
}

export const Default: Story = {
  args: {
    name: 'email',
    placeholder: 'Type here...'
  },
  decorators: [FormWrapper]
}
