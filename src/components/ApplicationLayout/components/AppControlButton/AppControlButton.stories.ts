import type { Meta, StoryObj } from '@storybook/react'

import { AppControlButton } from './AppControlButton'

const meta: Meta = {
  title: 'components/ApplicationLayout/AppControlButton',
  component: AppControlButton
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'BTN'
  }
}
