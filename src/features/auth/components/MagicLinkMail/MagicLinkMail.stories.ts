import type { Meta, StoryObj } from '@storybook/react'

import { MagicLinkMail } from './MagicLinkMail'

const meta: Meta<typeof MagicLinkMail> = {
  title: 'features/auth/MagicLinkMail',
  component: MagicLinkMail,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Jim Raynor',
    url: 'https://www.war-data.com'
  }
}
