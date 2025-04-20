import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from './LoginForm'

const meta: Meta<typeof LoginForm> = {
  title: 'auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
