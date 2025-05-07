import type { Meta, StoryObj } from '@storybook/react'

import { ErrorMessage } from './ErrorMessage'

/** Error message component, used to display error messages in a consistent way. */
const meta: Meta<typeof ErrorMessage> = {
  title: 'components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Something went wrong. Please try again later.'
  }
}
