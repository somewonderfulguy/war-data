import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

/** Component created by shadcn/ui. See more at https://ui.shadcn.com/docs/components/button. */
const meta: Meta<typeof Button> = {
  title: 'shadcn/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      control: { type: 'select' }
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default'
  }
}

/**
 * For default `variant` of button loading spinner is added if `loading === true` and button is disabled.
 * For other variants spinner is not added, though it automatically disables the button anyway.
 * */
export const DefaultLoading: Story = {
  args: {
    children: 'Loading...',
    loading: true
  }
}

/**
 * Story for visual testing that loader works with `asChild` prop.
 */
export const DefaultLoadingAsChild: Story = {
  args: {
    children: <div>As Child</div>,
    asChild: true,
    loading: true
  }
}
